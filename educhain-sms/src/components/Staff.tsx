import React, { useState } from 'react';
import { Card } from './Card';
import { useWriteContract, useAccount } from 'wagmi';
import { SMS_ADDRESS, SMS_ABI } from '../lib/constants';
import { parseEther } from 'viem';
import { Loader2, UserPlus, CheckCircle2, XCircle, Briefcase } from 'lucide-react';

export default function Staff() {
  const { address } = useAccount();
  const [isRegistering, setIsRegistering] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: '',
    wallet: '',
    salary: '1000',
  });

  const { writeContractAsync, isPending } = useWriteContract();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!address) return alert('Please connect wallet');

    try {
      // @ts-ignore
      await writeContractAsync({
        address: SMS_ADDRESS,
        abi: SMS_ABI,
        functionName: 'registerStaff',
        args: [
          formData.name,
          formData.email,
          formData.role,
          formData.wallet as `0x${string}`,
          parseEther(formData.salary),
        ],
      });

      alert('Staff registered successfully!');
      setIsRegistering(false);
    } catch (error) {
      console.error(error);
      alert('Registration failed');
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-white">Staff</h2>
          <p className="text-neutral-400 mt-1">Manage staff registrations and salaries.</p>
        </div>
        <button
          onClick={() => setIsRegistering(!isRegistering)}
          className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-xl font-medium transition-colors shadow-lg shadow-emerald-500/20"
        >
          {isRegistering ? <XCircle className="w-5 h-5" /> : <UserPlus className="w-5 h-5" />}
          {isRegistering ? 'Cancel' : 'Register Staff'}
        </button>
      </div>

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
                <input
                  required
                  type="text"
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  className="w-full bg-neutral-900/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  placeholder="Teacher"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-neutral-300">Wallet Address</label>
                <input
                  required
                  type="text"
                  value={formData.wallet}
                  onChange={(e) => setFormData({ ...formData, wallet: e.target.value })}
                  className="w-full bg-neutral-900/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  placeholder="0x..."
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-medium text-neutral-300">Salary (STKN)</label>
                <input
                  required
                  type="number"
                  min="0"
                  step="0.01"
                  value={formData.salary}
                  onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
                  className="w-full bg-neutral-900/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
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

      <div className="grid grid-cols-1 gap-4">
        {/* Placeholder for staff list since we don't have getAllStaff in ABI */}
        <Card delay={0.2} className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center border border-emerald-500/30">
              <Briefcase className="w-6 h-6 text-emerald-400" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Alice Johnson</h3>
              <p className="text-sm text-neutral-400">alice@example.com • Principal</p>
              <p className="text-xs text-neutral-500 font-mono mt-1">0x1234...5678</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="px-3 py-1 rounded-full text-xs font-medium border bg-emerald-500/10 text-emerald-400 border-emerald-500/20">
              Active
            </div>
            <button
              disabled={isPending}
              className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg text-sm font-medium transition-colors"
            >
              Pay Salary
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
}
