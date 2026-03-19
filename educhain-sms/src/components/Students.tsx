import React, { useState, useEffect } from 'react';
import { Card } from './Card';
import { useReadContract, useWriteContract, useAccount } from 'wagmi';
import { useSchool } from '../context/SchoolContext';
import { 
  SMS_ADDRESS, 
  SMS_ABI, 
  TOKEN_ADDRESS, 
  TOKEN_ABI,
  Student,
  PaymentStatus,
  StudentStatus,
  CONTRACT_FUNCTIONS,
  TOKEN_FUNCTIONS 
} from '../lib/constants';
import { formatEther, parseEther } from 'viem';
import { 
  Loader2, 
  CheckCircle2, 
  XCircle, 
  UserPlus, 
  GraduationCap,
  RefreshCw,
  AlertCircle,
  UserMinus,
  UserCheck
} from 'lucide-react';

// Define proper types
interface FormData {
  name: string;
  email: string;
  level: number;
  wallet: `0x${string}`;
  payNow: boolean;
}

export default function Students() {
  const { address } = useAccount();
  const { refreshAll } = useSchool();
  const [isRegistering, setIsRegistering] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    level: 1,
    wallet: '0x',
    payNow: false,
  });

  // Read all students with proper typing
  const { 
    data: allStudents, 
    refetch: refetchStudents,
    isLoading: isLoadingStudents 
  } = useReadContract({
    address: SMS_ADDRESS,
    abi: SMS_ABI,
    functionName: CONTRACT_FUNCTIONS.getAllStudents,
  }) as { data: Student[] | undefined; refetch: () => void; isLoading: boolean };

  // Read tuition fees
  const { data: tuitionFees, refetch: refetchFees } = useReadContract({
    address: SMS_ADDRESS,
    abi: SMS_ABI,
    functionName: 'getAllTuitionFees',
  }) as { data: [bigint, bigint, bigint, bigint] | undefined; refetch: () => void };

  // Get token balance of current user
  const { data: userTokenBalance, refetch: refetchBalance } = useReadContract({
    address: TOKEN_ADDRESS,
    abi: TOKEN_ABI,
    functionName: TOKEN_FUNCTIONS.balanceOf,
    args: [address || '0x'],
  });

  const { writeContractAsync, isPending } = useWriteContract();

  // Refresh data when component mounts
  useEffect(() => {
    refetchStudents();
    refetchFees();
  }, []);

  const getFeeForLevel = (level: number): bigint => {
    if (!tuitionFees) return parseEther('100'); // fallback
    switch(level) {
      case 1: return tuitionFees[0];
      case 2: return tuitionFees[1];
      case 3: return tuitionFees[2];
      case 4: return tuitionFees[3];
      default: return tuitionFees[0];
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!address) return alert('Please connect wallet');

    // Check if user has enough tokens if paying now
    if (formData.payNow) {
      const fee = getFeeForLevel(formData.level);
      if (userTokenBalance && fee > (userTokenBalance as bigint)) {
        return alert('❌ Insufficient STKN balance to pay tuition');
      }
    }

    try {
      // If paying now, approve first
      if (formData.payNow) {
        const fee = getFeeForLevel(formData.level);
        
        // Approve token spending
        await writeContractAsync({
          address: TOKEN_ADDRESS,
          abi: TOKEN_ABI,
          functionName: TOKEN_FUNCTIONS.approve,
          args: [SMS_ADDRESS, fee],
        });
      }

      // Register student
      await writeContractAsync({
        address: SMS_ADDRESS,
        abi: SMS_ABI,
        functionName: CONTRACT_FUNCTIONS.registerStudent,
        args: [
          formData.name,
          formData.email,
          BigInt(formData.level),
          formData.wallet,
          formData.payNow,
        ],
      });

      alert('✅ Student registered successfully!');
      
      // Refresh data
      refetchStudents();
      refetchBalance();
      refreshAll(); // Update Dashboard
      
      // Reset form
      setIsRegistering(false);
      setFormData({ name: '', email: '', level: 1, wallet: '0x', payNow: false });
    } catch (error) {
      console.error('Registration failed:', error);
      alert('❌ Registration failed. Check console for details.');
    }
  };

  const handlePayTuition = async (studentId: bigint, level: number) => {
    try {
      const fee = getFeeForLevel(level);
      
      // Check if user has enough tokens
      if (userTokenBalance && fee > (userTokenBalance as bigint)) {
        return alert('❌ Insufficient STKN balance');
      }

      // Approve token spending
      await writeContractAsync({
        address: TOKEN_ADDRESS,
        abi: TOKEN_ABI,
        functionName: TOKEN_FUNCTIONS.approve,
        args: [SMS_ADDRESS, fee],
      });

      // Pay tuition
      await writeContractAsync({
        address: SMS_ADDRESS,
        abi: SMS_ABI,
        functionName: CONTRACT_FUNCTIONS.payTuition,
        args: [studentId],
      });
      
      alert('✅ Tuition paid successfully!');
      
      // Refresh data
      refetchStudents();
      refetchBalance();
      refreshAll(); // Update Dashboard
    } catch (error) {
      console.error('Payment failed:', error);
      alert('❌ Payment failed. Check console for details.');
    }
  };

  const handleRemoveStudent = async (studentId: bigint) => {
    if (!confirm('Are you sure you want to remove this student?')) return;
    
    try {
      await writeContractAsync({
        address: SMS_ADDRESS,
        abi: SMS_ABI,
        functionName: CONTRACT_FUNCTIONS.removeStudent,
        args: [studentId],
      });
      
      alert('✅ Student removed successfully!');
      refetchStudents();
      refreshAll();
    } catch (error) {
      console.error('Removal failed:', error);
      alert('❌ Removal failed');
    }
  };

  const handleReactivateStudent = async (studentId: bigint) => {
    try {
      await writeContractAsync({
        address: SMS_ADDRESS,
        abi: SMS_ABI,
        functionName: CONTRACT_FUNCTIONS.reactivateStudent,
        args: [studentId],
      });
      
      alert('✅ Student reactivated successfully!');
      refetchStudents();
      refreshAll();
    } catch (error) {
      console.error('Reactivation failed:', error);
      alert('❌ Reactivation failed');
    }
  };

  // Get status badge
  const getStatusBadge = (status: StudentStatus) => {
    switch(status) {
      case StudentStatus.Active:
        return <div className="px-3 py-1 rounded-full text-xs font-medium border bg-emerald-500/10 text-emerald-400 border-emerald-500/20">Active</div>;
      case StudentStatus.Inactive:
        return <div className="px-3 py-1 rounded-full text-xs font-medium border bg-amber-500/10 text-amber-400 border-amber-500/20">Inactive</div>;
      case StudentStatus.Graduated:
        return <div className="px-3 py-1 rounded-full text-xs font-medium border bg-indigo-500/10 text-indigo-400 border-indigo-500/20">Graduated</div>;
      case StudentStatus.Suspended:
        return <div className="px-3 py-1 rounded-full text-xs font-medium border bg-rose-500/10 text-rose-400 border-rose-500/20">Suspended</div>;
      default:
        return <div className="px-3 py-1 rounded-full text-xs font-medium border bg-neutral-500/10 text-neutral-400 border-neutral-500/20">Unknown</div>;
    }
  };

  return (
    <div className="space-y-8">
      {/* Header with refresh button */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-white">Students</h2>
          <p className="text-neutral-400 mt-1">Manage student registrations and tuition.</p>
        </div>
        
        <div className="flex items-center gap-3">
          {/* User balance indicator */}
          {userTokenBalance && (
            <div className="px-4 py-2 bg-indigo-500/10 rounded-lg border border-indigo-500/20">
              <p className="text-xs text-indigo-400">Your Balance</p>
              <p className="text-sm font-bold text-white">{formatEther(userTokenBalance as bigint)} STKN</p>
            </div>
          )}
          
          <button
            onClick={() => setIsRegistering(!isRegistering)}
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl font-medium transition-colors shadow-lg shadow-indigo-500/20"
          >
            {isRegistering ? <XCircle className="w-5 h-5" /> : <UserPlus className="w-5 h-5" />}
            {isRegistering ? 'Cancel' : 'Register Student'}
          </button>
          
          <button
            onClick={() => {
              refetchStudents();
              refetchFees();
              refetchBalance();
            }}
            className="p-2.5 bg-white/5 hover:bg-white/10 rounded-xl border border-white/10 transition-colors"
            title="Refresh data"
          >
            <RefreshCw className="w-5 h-5 text-neutral-400" />
          </button>
        </div>
      </div>

      {/* Registration form */}
      {isRegistering && (
        <Card delay={0.1} className="border-indigo-500/30 bg-indigo-500/5">
          <form onSubmit={handleRegister} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-neutral-300">Full Name</label>
                <input
                  required
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-neutral-900/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="John Doe"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-neutral-300">Email</label>
                <input
                  required
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-neutral-900/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="john@example.com"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-neutral-300">Level / Grade</label>
                <select
                  required
                  value={formData.level}
                  onChange={(e) => setFormData({ ...formData, level: Number(e.target.value) })}
                  className="w-full bg-neutral-900/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="1">Level 100</option>
                  <option value="2">Level 200</option>
                  <option value="3">Level 300</option>
                  <option value="4">Level 400</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-neutral-300">Wallet Address</label>
                <input
                  required
                  type="text"
                  value={formData.wallet}
                  onChange={(e) => setFormData({ ...formData, wallet: e.target.value as `0x${string}` })}
                  className="w-full bg-neutral-900/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="0x..."
                />
              </div>
            </div>

            {/* Show fee amount if paying now */}
            {formData.payNow && tuitionFees && (
              <div className="p-4 bg-indigo-500/10 rounded-xl border border-indigo-500/20">
                <p className="text-sm text-indigo-300">
                  Tuition fee: {formatEther(getFeeForLevel(formData.level))} STKN
                </p>
                {userTokenBalance && getFeeForLevel(formData.level) > (userTokenBalance as bigint) && (
                  <p className="text-xs text-rose-400 flex items-center gap-1 mt-2">
                    <AlertCircle className="w-3 h-3" />
                    Insufficient balance! You have {formatEther(userTokenBalance as bigint)} STKN
                  </p>
                )}
              </div>
            )}

            <div className="flex items-center gap-3 p-4 bg-neutral-900/50 rounded-xl border border-white/5">
              <input
                type="checkbox"
                id="payNow"
                checked={formData.payNow}
                onChange={(e) => setFormData({ ...formData, payNow: e.target.checked })}
                className="w-5 h-5 rounded border-white/10 bg-neutral-800 text-indigo-500 focus:ring-indigo-500"
              />
              <label htmlFor="payNow" className="text-sm font-medium text-neutral-300 cursor-pointer">
                Pay tuition immediately (requires STKN approval)
              </label>
            </div>

            <button
              type="submit"
              disabled={isPending}
              className="w-full flex justify-center items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isPending ? <Loader2 className="w-5 h-5 animate-spin" /> : <CheckCircle2 className="w-5 h-5" />}
              {isPending ? 'Processing...' : 'Complete Registration'}
            </button>
          </form>
        </Card>
      )}

      {/* Students list */}
      <div className="grid grid-cols-1 gap-4">
        {isLoadingStudents ? (
          <Card className="text-center py-12">
            <Loader2 className="w-8 h-8 animate-spin mx-auto text-indigo-500" />
          </Card>
        ) : allStudents && allStudents.length > 0 ? (
          allStudents.map((student: Student, idx: number) => (
            <Card key={idx} delay={0.2 + idx * 0.1} className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-indigo-500/20 flex items-center justify-center border border-indigo-500/30">
                  <GraduationCap className="w-6 h-6 text-indigo-400" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-bold text-white">{student.name}</h3>
                    {getStatusBadge(student.status)}
                  </div>
                  <p className="text-sm text-neutral-400">{student.email} • Level {student.level.toString()}</p>
                  <p className="text-xs text-neutral-500 font-mono mt-1">{student.wallet}</p>
                  {student.paymentTimestamp > 0n && (
                    <p className="text-xs text-neutral-500 mt-1">
                      Last payment: {new Date(Number(student.paymentTimestamp) * 1000).toLocaleDateString()}
                    </p>
                  )}
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className={`px-3 py-1 rounded-full text-xs font-medium border ${
                  student.paymentStatus === PaymentStatus.Paid
                    ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                    : 'bg-rose-500/10 text-rose-400 border-rose-500/20'
                }`}>
                  {student.paymentStatus === PaymentStatus.Paid ? 'Paid' : 'Unpaid'}
                </div>
                
                {student.paymentStatus !== PaymentStatus.Paid && student.status === StudentStatus.Active && (
                  <button
                    onClick={() => handlePayTuition(student.id, Number(student.level))}
                    disabled={isPending}
                    className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg text-sm font-medium transition-colors disabled:opacity-50"
                  >
                    Pay Tuition
                  </button>
                )}
                
                {student.status === StudentStatus.Active && (
                  <button
                    onClick={() => handleRemoveStudent(student.id)}
                    disabled={isPending}
                    className="p-2 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 rounded-lg transition-colors disabled:opacity-50"
                    title="Remove student"
                  >
                    <UserMinus className="w-4 h-4" />
                  </button>
                )}
                
                {student.status === StudentStatus.Inactive && (
                  <button
                    onClick={() => handleReactivateStudent(student.id)}
                    disabled={isPending}
                    className="p-2 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 rounded-lg transition-colors disabled:opacity-50"
                    title="Reactivate student"
                  >
                    <UserCheck className="w-4 h-4" />
                  </button>
                )}
              </div>
            </Card>
          ))
        ) : (
          <Card className="text-center py-12 text-neutral-500">
            <GraduationCap className="w-12 h-12 mx-auto mb-4 opacity-50" />
            No students registered yet. Click "Register Student" to add your first student.
          </Card>
        )}
      </div>
    </div>
  );
}