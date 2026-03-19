import React, { useState, useEffect } from 'react';
import { Card } from './Card';
import { useReadContract, useWriteContract, useAccount } from 'wagmi';
import { useSchool } from '../context/SchoolContext';
import { 
  SMS_ADDRESS, 
  SMS_ABI, 
  TOKEN_ADDRESS, 
  TOKEN_ABI,
  CONTRACT_FUNCTIONS,
  TOKEN_FUNCTIONS,
  StudentLevel 
} from '../lib/constants';
import { parseEther, formatEther } from 'viem';
import { Loader2, Settings, ShieldAlert, Coins, AlertCircle, RefreshCw } from 'lucide-react';

export default function Admin() {
  const { address } = useAccount();
  const [level, setLevel] = useState('0'); // Use 0-based (Level100)
  const [newFee, setNewFee] = useState('');
  const [fundAmount, setFundAmount] = useState('');

  // Use School Context for global refresh
  const { refreshAll } = useSchool();

  // Check if current user is admin
  const { data: adminAddress, isLoading: loadingAdmin } = useReadContract({
    address: SMS_ADDRESS,
    abi: SMS_ABI,
    functionName: 'admin',
  });

  // Get current fees
  const { data: currentFees, refetch: refetchFees } = useReadContract({
    address: SMS_ADDRESS,
    abi: SMS_ABI,
    functionName: 'getAllTuitionFees',
  }) as { data: [bigint, bigint, bigint, bigint] | undefined; refetch: () => void };

  // Get token balance of admin
  const { data: tokenBalance, refetch: refetchTokenBalance } = useReadContract({
    address: TOKEN_ADDRESS,
    abi: TOKEN_ABI,
    functionName: TOKEN_FUNCTIONS.balanceOf,
    args: [address || '0x'],
  });

  // Get treasury balance
  const { data: treasuryBalance, refetch: refetchTreasury } = useReadContract({
    address: SMS_ADDRESS,
    abi: SMS_ABI,
    functionName: 'treasuryBalance',
  });

  const { writeContractAsync, isPending } = useWriteContract();

  const isAdmin = adminAddress?.toLowerCase() === address?.toLowerCase();

  // Warn if not admin
  useEffect(() => {
    if (address && !isAdmin && adminAddress && !loadingAdmin) {
      alert('⚠️ You are not the admin! Only admin can perform these actions.');
    }
  }, [address, isAdmin, adminAddress, loadingAdmin]);

  // Refresh token balance when address changes
  useEffect(() => {
    if (address) {
      refetchTokenBalance();
    }
  }, [address, refetchTokenBalance]);

  const handleUpdateFee = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!address) return alert('Please connect wallet');
    if (!isAdmin) return alert('Only admin can update fees');

    try {
      // Convert level to number and validate
      const levelNum = Number(level);
      if (levelNum < 0 || levelNum > 3) {
        return alert('Level must be between 100 and 400');
      }
    
      // @ts-ignore
      await writeContractAsync({
        address: SMS_ADDRESS,
        abi: SMS_ABI,
        functionName: CONTRACT_FUNCTIONS.setTuitionFee,
        args: [BigInt(levelNum), parseEther(newFee)],
      });
      
      alert('✅ Tuition fee updated successfully!');
      
      // Refresh local data
      refetchFees();
      refetchTreasury();
      
      // Trigger global refresh for Dashboard
      refreshAll();
      
      setNewFee(''); // Clear input
    } catch (error) {
      console.error('Update failed:', error);
      alert('❌ Update failed. Check console for details.');
    }
  };

  const handleFundTreasury = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!address) return alert('Please connect wallet');
    
    const amount = parseEther(fundAmount);
    
    // Check if user has enough tokens
    if (tokenBalance && amount > (tokenBalance as bigint)) {
      return alert('❌ Insufficient STKN balance');
    }

    try {
      // Transfer tokens to SMS contract
      // @ts-ignore
      await writeContractAsync({
        address: TOKEN_ADDRESS,
        abi: TOKEN_ABI,
        functionName: TOKEN_FUNCTIONS.transfer,
        args: [SMS_ADDRESS, amount],
      });
      
      alert('✅ Treasury funded successfully!');
      
      // Refresh local data
      refetchTreasury();
      refetchTokenBalance();
      
      // Trigger global refresh for Dashboard
      refreshAll();
      
      setFundAmount(''); // Clear input
    } catch (error) {
      console.error('Funding failed:', error);
      alert('❌ Funding failed. Make sure you have enough STKN and try again.');
    }
  };

  // Helper to get level name
  const getLevelName = (levelNum: number): string => {
    const levels = ['Level 100', 'Level 200', 'Level 300', 'Level 400'];
    return levels[levelNum] || `Level ${(levelNum + 1) * 100}`;
  };

  return (
    <div className="space-y-8">
      {/* Header with admin status and refresh button */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-rose-500/20 flex items-center justify-center border border-rose-500/30">
            <ShieldAlert className="w-6 h-6 text-rose-400" />
          </div>
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-white">Admin Controls</h2>
            <p className="text-neutral-400 mt-1">System configuration and treasury management.</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          {/* Admin status badge */}
          {address && (
            <div className={`px-4 py-2 rounded-lg text-sm font-medium ${
              isAdmin 
                ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
            }`}>
              {isAdmin ? '✅ Admin Access' : '⚠️ View Only'}
            </div>
          )}
          
          {/* Manual refresh button */}
          <button
            onClick={refreshAll}
            className="p-2 bg-white/5 hover:bg-white/10 rounded-lg border border-white/10 transition-colors"
            title="Refresh all data"
          >
            <RefreshCw className="w-4 h-4 text-neutral-400" />
          </button>
        </div>
      </div>

      {/* Treasury Balance Card */}
      <Card delay={0.05} className="bg-gradient-to-br from-amber-500/10 to-amber-600/5 border-amber-500/20">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Coins className="w-6 h-6 text-amber-400" />
            <div>
              <p className="text-sm text-neutral-400">Treasury Balance</p>
              <p className="text-2xl font-bold text-white">
                {treasuryBalance ? formatEther(treasuryBalance as bigint) : '0'} STKN
              </p>
            </div>
          </div>
          {tokenBalance && (
            <div className="text-right">
              <p className="text-xs text-neutral-500">Your Balance</p>
              <p className="text-sm text-neutral-300">{formatEther(tokenBalance as bigint)} STKN</p>
            </div>
          )}
        </div>
      </Card>

      {/* Current Fees Display */}
      {currentFees && (
        <Card delay={0.08} className="border-white/5">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <Settings className="w-5 h-5 text-indigo-400" />
            Current Tuition Fees
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {currentFees.map((fee, index) => (
              <div key={index} className="bg-neutral-900/50 rounded-lg p-3 border border-white/5">
                <p className="text-xs text-neutral-500">{getLevelName(index)}</p>
                <p className="text-lg font-bold text-white">{formatEther(fee)} STKN</p>
              </div>
            ))}
          </div>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Update Fee Card */}
        <Card delay={0.1} className={`border-rose-500/20 ${!isAdmin ? 'opacity-75' : ''}`}>
          <div className="flex items-center gap-3 mb-6">
            <Settings className="w-5 h-5 text-rose-400" />
            <h3 className="text-lg font-semibold text-white">Update Tuition Fee</h3>
          </div>
          
          {!isAdmin && address && (
            <div className="mb-4 p-3 bg-rose-500/10 rounded-lg flex items-center gap-2 text-sm text-rose-400 border border-rose-500/20">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>Only admin can update fees</span>
            </div>
          )}

          <form onSubmit={handleUpdateFee} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-neutral-300">Level</label>
              <select
                required
                value={level}
                onChange={(e) => setLevel(e.target.value)}
                className="w-full bg-neutral-900/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-rose-500"
                disabled={!isAdmin}
              >
                <option value="0">Level 100</option>
                <option value="1">Level 200</option>
                <option value="2">Level 300</option>
                <option value="3">Level 400</option>
              </select>
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
                placeholder="e.g., 100"
                className="w-full bg-neutral-900/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-rose-500"
                disabled={!isAdmin}
              />
            </div>

            {currentFees && level && (
              <p className="text-xs text-neutral-500">
                Current fee: {formatEther(currentFees[Number(level)])} STKN
              </p>
            )}

            <button
              type="submit"
              disabled={isPending || !isAdmin || !newFee}
              className="w-full flex justify-center items-center gap-2 bg-rose-600 hover:bg-rose-700 text-white px-6 py-3 rounded-xl font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-4"
            >
              {isPending ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Update Fee'}
            </button>
          </form>
        </Card>

        {/* Fund Treasury Card */}
        <Card delay={0.2} className="border-amber-500/20">
          <div className="flex items-center gap-3 mb-6">
            <Coins className="w-5 h-5 text-amber-400" />
            <h3 className="text-lg font-semibold text-white">Fund Treasury</h3>
          </div>

          {tokenBalance && (
            <div className="mb-4 p-3 bg-neutral-900/50 rounded-lg">
              <p className="text-sm text-neutral-400">
                Your balance: <span className="text-white font-mono">{formatEther(tokenBalance as bigint)} STKN</span>
              </p>
            </div>
          )}

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
                placeholder="e.g., 10000"
                className="w-full bg-neutral-900/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>

            <p className="text-xs text-neutral-500 flex items-center gap-1">
              <AlertCircle className="w-3 h-3" />
              Transfer STKN from your wallet to the SMS contract to enable staff salary payments.
            </p>

            <button
              type="submit"
              disabled={isPending || !fundAmount || (tokenBalance && parseEther(fundAmount) > (tokenBalance as bigint))}
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