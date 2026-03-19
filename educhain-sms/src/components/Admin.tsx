import React, { useState } from 'react';
import { Card } from './Card';
import { useWriteContract, useAccount } from 'wagmi';
import { SMS_ADDRESS, SMS_ABI, TOKEN_ADDRESS, TOKEN_ABI } from '../lib/constants';
import { parseEther } from 'viem';
import { Loader2, Settings, ShieldAlert, Coins } from 'lucide-react';

export default function Admin() {
  const { address } = useAccount();
  const [level, setLevel] = useState('1');
  const [newFee, setNewFee] = useState('100');
  const [fundAmount, setFundAmount] = useState('10000');

  const { writeContractAsync, isPending } = useWriteContract();

  const handleUpdateFee = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!address) return alert('Please connect wallet');

    try {
      // @ts-ignore
      await writeContractAsync({
        address: SMS_ADDRESS,
        abi: SMS_ABI,
        functionName: 'setTuitionFee',
        args: [BigInt(level), parseEther(newFee)],
      });
      alert('Tuition fee updated!');
    } catch (error) {
      console.error(error);
      alert('Update failed');
    }
  };

  const handleFundTreasury = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!address) return alert('Please connect wallet');

    try {
      // @ts-ignore
      await writeContractAsync({
        address: TOKEN_ADDRESS,
        abi: TOKEN_ABI,
        functionName: 'transfer',
        args: [SMS_ADDRESS, parseEther(fundAmount)],
      });
      alert('Treasury funded successfully!');
    } catch (error) {
      console.error(error);
      alert('Funding failed');
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-xl bg-rose-500/20 flex items-center justify-center border border-rose-500/30">
          <ShieldAlert className="w-6 h-6 text-rose-400" />
        </div>
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-white">Admin Controls</h2>
          <p className="text-neutral-400 mt-1">System configuration and treasury management.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card delay={0.1} className="border-rose-500/20">
          <div className="flex items-center gap-3 mb-6">
            <Settings className="w-5 h-5 text-rose-400" />
            <h3 className="text-lg font-semibold text-white">Update Tuition Fee</h3>
          </div>
          <form onSubmit={handleUpdateFee} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-neutral-300">Level / Grade</label>
              <input
                required
                type="number"
                min="1"
                value={level}
                onChange={(e) => setLevel(e.target.value)}
                className="w-full bg-neutral-900/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-rose-500"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-neutral-300">New Fee (STKN)</label>
              <input
                required
                type="number"
                min="0"
                step="0.01"
                value={newFee}
                onChange={(e) => setNewFee(e.target.value)}
                className="w-full bg-neutral-900/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-rose-500"
              />
            </div>
            <button
              type="submit"
              disabled={isPending}
              className="w-full flex justify-center items-center gap-2 bg-rose-600 hover:bg-rose-700 text-white px-6 py-3 rounded-xl font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-4"
            >
              {isPending ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Update Fee'}
            </button>
          </form>
        </Card>

        <Card delay={0.2} className="border-amber-500/20">
          <div className="flex items-center gap-3 mb-6">
            <Coins className="w-5 h-5 text-amber-400" />
            <h3 className="text-lg font-semibold text-white">Fund Treasury (Bootstrap)</h3>
          </div>
          <form onSubmit={handleFundTreasury} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-neutral-300">Amount (STKN)</label>
              <input
                required
                type="number"
                min="1"
                step="1"
                value={fundAmount}
                onChange={(e) => setFundAmount(e.target.value)}
                className="w-full bg-neutral-900/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>
            <p className="text-xs text-neutral-500">
              Transfer STKN from your wallet to the SMS contract to enable staff salary payments.
            </p>
            <button
              type="submit"
              disabled={isPending}
              className="w-full flex justify-center items-center gap-2 bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-xl font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-4"
            >
              {isPending ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Transfer Funds'}
            </button>
          </form>
        </Card>
      </div>
    </div>
  );
}
