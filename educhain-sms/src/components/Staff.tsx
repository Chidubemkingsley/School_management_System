import React, { useState, useEffect } from 'react';
import { Card } from './Card';
import { useReadContract, useWriteContract, useAccount } from 'wagmi';
import { useSchool } from '../context/SchoolContext';
import { 
  SMS_ADDRESS, 
  SMS_ABI, 
  TOKEN_ADDRESS, 
  TOKEN_ABI,
  Staff as StaffType,  // Renamed import
  StaffRole,
  StaffStatus,
  CONTRACT_FUNCTIONS,
  TOKEN_FUNCTIONS 
} from '../lib/constants';
import { parseEther, formatEther } from 'viem';
import { 
  Loader2, 
  UserPlus, 
  CheckCircle2, 
  XCircle, 
  Briefcase, 
  RefreshCw,
  AlertCircle,
  DollarSign,
  Ban,
  UserCheck 
} from 'lucide-react';

interface FormData {
  name: string;
  email: string;
  role: StaffRole;
  wallet: `0x${string}`;
  salary: string;
}

export default function Staff() {
  const { address } = useAccount();
  const { refreshAll } = useSchool();
  const [isRegistering, setIsRegistering] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState<StaffType | null>(null);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    role: StaffRole.Teacher,
    wallet: '0x',
    salary: '1000',
  });

  // Get treasury balance to check if enough funds
  const { data: treasuryBalance, refetch: refetchTreasury } = useReadContract({
    address: SMS_ADDRESS,
    abi: SMS_ABI,
    functionName: 'treasuryBalance',
  });

  // Get all staff with proper typing
  const { 
    data: allStaff, 
    refetch: refetchStaff,
    isLoading: isLoadingStaff 
  } = useReadContract({
    address: SMS_ADDRESS,
    abi: SMS_ABI,
    functionName: 'getAllStaff',
  }) as { data: StaffType[] | undefined; refetch: () => void; isLoading: boolean };

  const { writeContractAsync, isPending } = useWriteContract();

  // Refresh staff list when component mounts
  useEffect(() => {
    refetchStaff();
  }, []);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!address) return alert('Please connect wallet');

    try {
      // Register staff
      // @ts-ignore
      await writeContractAsync({
        address: SMS_ADDRESS,
        abi: SMS_ABI,
        functionName: CONTRACT_FUNCTIONS.registerStaff,
        args: [
          formData.name,
          formData.email,
          formData.role,
          formData.wallet,
          parseEther(formData.salary),
        ],
      });

      alert('✅ Staff registered successfully!');
      
      // Refresh data
      refetchStaff();
      refreshAll(); // Update Dashboard
      
      // Reset form
      setIsRegistering(false);
      setFormData({
        name: '',
        email: '',
        role: StaffRole.Teacher,
        wallet: '0x',
        salary: '1000',
      });
    } catch (error) {
      console.error('Registration failed:', error);
      alert('❌ Registration failed. Check console for details.');
    }
  };

  const handlePaySalary = async (staffId: bigint, salary: bigint) => {
    try {
      // Check if treasury has enough funds
      if (treasuryBalance && salary > (treasuryBalance as bigint)) {
        return alert('❌ Insufficient treasury balance');
      }

      // Pay salary
      // @ts-ignore
      await writeContractAsync({
        address: SMS_ADDRESS,
        abi: SMS_ABI,
        functionName: CONTRACT_FUNCTIONS.payStaff,
        args: [staffId],
      });
      
      alert('✅ Salary paid successfully!');
      
      // Refresh data
      refetchStaff();
      refetchTreasury();
      refreshAll(); // Update Dashboard
    } catch (error) {
      console.error('Payment failed:', error);
      alert('❌ Payment failed. Check console for details.');
    }
  };

  const handleSuspendStaff = async (staffId: bigint) => {
    try {
      // @ts-ignore
      await writeContractAsync({
        address: SMS_ADDRESS,
        abi: SMS_ABI,
        functionName: CONTRACT_FUNCTIONS.suspendStaff,
        args: [staffId],
      });
      
      alert('✅ Staff suspended successfully!');
      refetchStaff();
      refreshAll();
    } catch (error) {
      console.error('Suspension failed:', error);
      alert('❌ Suspension failed');
    }
  };

  const handleActivateStaff = async (staffId: bigint) => {
    try {
      // @ts-ignore
      await writeContractAsync({
        address: SMS_ADDRESS,
        abi: SMS_ABI,
        functionName: CONTRACT_FUNCTIONS.activateStaff,
        args: [staffId],
      });
      
      alert('✅ Staff activated successfully!');
      refetchStaff();
      refreshAll();
    } catch (error) {
      console.error('Activation failed:', error);
      alert('❌ Activation failed');
    }
  };

  // Helper to get role name
  const getRoleName = (role: StaffRole): string => {
    const roles = ['Teacher', 'Administrator', 'Accountant', 'Librarian', 'Cleaner', 'Security'];
    return roles[role] || 'Unknown';
  };

  // Helper to get status badge
  const getStatusBadge = (status: StaffStatus) => {
    switch(status) {
      case StaffStatus.Active:
        return <div className="px-3 py-1 rounded-full text-xs font-medium border bg-emerald-500/10 text-emerald-400 border-emerald-500/20">Active</div>;
      case StaffStatus.Suspended:
        return <div className="px-3 py-1 rounded-full text-xs font-medium border bg-rose-500/10 text-rose-400 border-rose-500/20">Suspended</div>;
      case StaffStatus.Resigned:
        return <div className="px-3 py-1 rounded-full text-xs font-medium border bg-amber-500/10 text-amber-400 border-amber-500/20">Resigned</div>;
      case StaffStatus.Terminated:
        return <div className="px-3 py-1 rounded-full text-xs font-medium border bg-neutral-500/10 text-neutral-400 border-neutral-500/20">Terminated</div>;
      default:
        return <div className="px-3 py-1 rounded-full text-xs font-medium border bg-neutral-500/10 text-neutral-400 border-neutral-500/20">Unknown</div>;
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-white">Staff</h2>
          <p className="text-neutral-400 mt-1">Manage staff registrations and salaries.</p>
        </div>
        
        <div className="flex items-center gap-3">
          {/* Treasury balance indicator */}
          {treasuryBalance && (
            <div className="px-4 py-2 bg-amber-500/10 rounded-lg border border-amber-500/20">
              <p className="text-xs text-amber-400">Treasury</p>
              <p className="text-sm font-bold text-white">{formatEther(treasuryBalance as bigint)} STKN</p>
            </div>
          )}
          
          <button
            onClick={() => setIsRegistering(!isRegistering)}
            className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-xl font-medium transition-colors shadow-lg shadow-emerald-500/20"
          >
            {isRegistering ? <XCircle className="w-5 h-5" /> : <UserPlus className="w-5 h-5" />}
            {isRegistering ? 'Cancel' : 'Register Staff'}
          </button>
          
          <button
            onClick={() => refetchStaff()}
            className="p-2.5 bg-white/5 hover:bg-white/10 rounded-xl border border-white/10 transition-colors"
            title="Refresh staff list"
          >
            <RefreshCw className="w-5 h-5 text-neutral-400" />
          </button>
        </div>
      </div>

      {/* Registration Form */}
      {isRegistering && (
        <Card delay={0.1} className="border-emerald-500/30 bg-emerald-500/5">
          <form onSubmit={handleRegister} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-neutral-300">Full Name</label>
                <input
                  required
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-neutral-900/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  placeholder="Jane Smith"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-neutral-300">Email</label>
                <input
                  required
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-neutral-900/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  placeholder="jane@example.com"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-neutral-300">Role</label>
                <select
                  required
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: Number(e.target.value) as StaffRole })}
                  className="w-full bg-neutral-900/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option value={StaffRole.Teacher}>Teacher</option>
                  <option value={StaffRole.Administrator}>Administrator</option>
                  <option value={StaffRole.Accountant}>Accountant</option>
                  <option value={StaffRole.Librarian}>Librarian</option>
                  <option value={StaffRole.Cleaner}>Cleaner</option>
                  <option value={StaffRole.Security}>Security</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-neutral-300">Wallet Address</label>
                <input
                  required
                  type="text"
                  value={formData.wallet}
                  onChange={(e) => setFormData({ ...formData, wallet: e.target.value as `0x${string}` })}
                  className="w-full bg-neutral-900/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  placeholder="0x..."
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-medium text-neutral-300">Monthly Salary (STKN)</label>
                <input
                  required
                  type="number"
                  min="0"
                  step="0.01"
                  value={formData.salary}
                  onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
                  className="w-full bg-neutral-900/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
                {treasuryBalance && parseEther(formData.salary) > (treasuryBalance as bigint) && (
                  <p className="text-xs text-rose-400 flex items-center gap-1 mt-1">
                    <AlertCircle className="w-3 h-3" />
                    Warning: Salary exceeds current treasury balance
                  </p>
                )}
              </div>
            </div>

            <button
              type="submit"
              disabled={isPending}
              className="w-full flex justify-center items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-xl font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isPending ? <Loader2 className="w-5 h-5 animate-spin" /> : <CheckCircle2 className="w-5 h-5" />}
              {isPending ? 'Processing...' : 'Complete Registration'}
            </button>
          </form>
        </Card>
      )}

      {/* Staff List */}
      <div className="grid grid-cols-1 gap-4">
        {isLoadingStaff ? (
          <Card className="text-center py-12">
            <Loader2 className="w-8 h-8 animate-spin mx-auto text-emerald-500" />
          </Card>
        ) : allStaff && allStaff.length > 0 ? (
          allStaff.map((staff: StaffType, idx: number) => (
            <Card key={idx} delay={0.2 + idx * 0.1} className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center border border-emerald-500/30">
                  <Briefcase className="w-6 h-6 text-emerald-400" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">{staff.name}</h3>
                  <p className="text-sm text-neutral-400">
                    {staff.email} • {getRoleName(staff.role)}
                  </p>
                  <p className="text-xs text-neutral-500 font-mono mt-1">{staff.wallet}</p>
                  <p className="text-xs text-emerald-400 mt-1">
                    Salary: {formatEther(staff.salary)} STKN/month
                  </p>
                  {staff.lastPaidAt > 0n && (
                    <p className="text-xs text-neutral-500">
                      Last paid: {new Date(Number(staff.lastPaidAt) * 1000).toLocaleDateString()}
                    </p>
                  )}
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                {getStatusBadge(staff.status)}
                
                {staff.status === StaffStatus.Active && (
                  <>
                    <button
                      onClick={() => handlePaySalary(staff.id, staff.salary)}
                      disabled={isPending || (treasuryBalance && staff.salary > (treasuryBalance as bigint))}
                      className="px-4 py-2 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 rounded-lg text-sm font-medium transition-colors disabled:opacity-50 flex items-center gap-2"
                      title="Pay monthly salary"
                    >
                      <DollarSign className="w-4 h-4" />
                      Pay Salary
                    </button>
                    <button
                      onClick={() => handleSuspendStaff(staff.id)}
                      disabled={isPending}
                      className="px-4 py-2 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 rounded-lg text-sm font-medium transition-colors disabled:opacity-50"
                      title="Suspend staff"
                    >
                      <Ban className="w-4 h-4" />
                    </button>
                  </>
                )}
                
                {staff.status === StaffStatus.Suspended && (
                  <button
                    onClick={() => handleActivateStaff(staff.id)}
                    disabled={isPending}
                    className="px-4 py-2 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 rounded-lg text-sm font-medium transition-colors disabled:opacity-50 flex items-center gap-2"
                    title="Activate staff"
                  >
                    <UserCheck className="w-4 h-4" />
                    Activate
                  </button>
                )}
              </div>
            </Card>
          ))
        ) : (
          <Card className="text-center py-12 text-neutral-500">
            <Briefcase className="w-12 h-12 mx-auto mb-4 opacity-50" />
            No staff registered yet. Click "Register Staff" to add your first staff member.
          </Card>
        )}
      </div>
    </div>
  );
}