import React, { useState } from 'react';
import { Card } from './Card';
import { useReadContract, useWriteContract, useAccount, useWaitForTransactionReceipt } from 'wagmi';
import { SMS_ADDRESS, SMS_ABI, TOKEN_ADDRESS, TOKEN_ABI } from '../lib/constants';
import { formatEther, parseEther } from 'viem';
import { Loader2, Plus, CheckCircle2, XCircle, UserPlus, GraduationCap } from 'lucide-react';

export default function Students() {
  const { address } = useAccount();
  const [isRegistering, setIsRegistering] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    level: '1',
    wallet: '',
    payNow: false,
  });

  const { data: allStudents, refetch } = useReadContract({
    address: SMS_ADDRESS,
    abi: SMS_ABI,
    functionName: 'getAllStudents',
  });

  const { writeContractAsync, isPending } = useWriteContract();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!address) return alert('Please connect wallet');

    try {
      if (formData.payNow) {
        // We need to fetch tuition fee for this level
        // For simplicity, let's assume it's 100 STKN, but ideally we'd read it from contract
        const fee = parseEther('100'); // Mock fee

        // Approve
        // @ts-ignore
        const approveTx = await writeContractAsync({
          address: TOKEN_ADDRESS,
          abi: TOKEN_ABI,
          functionName: 'approve',
          args: [SMS_ADDRESS, fee],
        });
        // Wait for approval (simplified)
      }

      // @ts-ignore
      await writeContractAsync({
        address: SMS_ADDRESS,
        abi: SMS_ABI,
        functionName: 'registerStudent',
        args: [
          formData.name,
          formData.email,
          BigInt(formData.level),
          formData.wallet as `0x${string}`,
          formData.payNow,
        ],
      });

      alert('Student registered successfully!');
      setIsRegistering(false);
      refetch();
    } catch (error) {
      console.error(error);
      alert('Registration failed');
    }
  };

  const handlePayTuition = async (studentId: bigint) => {
    try {
      const fee = parseEther('100'); // Mock fee
      // @ts-ignore
      await writeContractAsync({
        address: TOKEN_ADDRESS,
        abi: TOKEN_ABI,
        functionName: 'approve',
        args: [SMS_ADDRESS, fee],
      });

      // @ts-ignore
      await writeContractAsync({
        address: SMS_ADDRESS,
        abi: SMS_ABI,
        functionName: 'payTuition',
        args: [studentId],
      });
      alert('Tuition paid!');
      refetch();
    } catch (error) {
      console.error(error);
      alert('Payment failed');
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-white">Students</h2>
          <p className="text-neutral-400 mt-1">Manage student registrations and tuition.</p>
        </div>
        <button
          onClick={() => setIsRegistering(!isRegistering)}
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl font-medium transition-colors shadow-lg shadow-indigo-500/20"
        >
          {isRegistering ? <XCircle className="w-5 h-5" /> : <UserPlus className="w-5 h-5" />}
          {isRegistering ? 'Cancel' : 'Register Student'}
        </button>
      </div>

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
                <input
                  required
                  type="number"
                  min="1"
                  value={formData.level}
                  onChange={(e) => setFormData({ ...formData, level: e.target.value })}
                  className="w-full bg-neutral-900/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-neutral-300">Wallet Address</label>
                <input
                  required
                  type="text"
                  value={formData.wallet}
                  onChange={(e) => setFormData({ ...formData, wallet: e.target.value })}
                  className="w-full bg-neutral-900/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="0x..."
                />
              </div>
            </div>

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

      <div className="grid grid-cols-1 gap-4">
        {allStudents && (allStudents as any[]).length > 0 ? (
          (allStudents as any[]).map((student: any, idx: number) => (
            <Card key={idx} delay={0.2 + idx * 0.1} className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-indigo-500/20 flex items-center justify-center border border-indigo-500/30">
                  <GraduationCap className="w-6 h-6 text-indigo-400" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">{student.name}</h3>
                  <p className="text-sm text-neutral-400">{student.email} • Level {student.level.toString()}</p>
                  <p className="text-xs text-neutral-500 font-mono mt-1">{student.wallet}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className={`px-3 py-1 rounded-full text-xs font-medium border ${
                  student.paymentStatus === 1 // Assuming 1 is Paid
                    ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                    : 'bg-rose-500/10 text-rose-400 border-rose-500/20'
                }`}>
                  {student.paymentStatus === 1 ? 'Paid' : 'Unpaid'}
                </div>
                {student.paymentStatus !== 1 && (
                  <button
                    onClick={() => handlePayTuition(student.id)}
                    disabled={isPending}
                    className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg text-sm font-medium transition-colors"
                  >
                    Pay Tuition
                  </button>
                )}
              </div>
            </Card>
          ))
        ) : (
          <Card className="text-center py-12 text-neutral-500">
            No students registered yet.
          </Card>
        )}
      </div>
    </div>
  );
}
