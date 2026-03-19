import { Card } from './Card';
import { useReadContract, useAccount } from 'wagmi';
import { SMS_ADDRESS, SMS_ABI, TOKEN_ADDRESS, TOKEN_ABI } from '../lib/constants';
import { formatEther } from 'viem';
import { Wallet, Users, UserCog, Coins } from 'lucide-react';

export default function Dashboard() {
  const { address } = useAccount();

  const { data: treasuryBalance } = useReadContract({
    address: SMS_ADDRESS,
    abi: SMS_ABI,
    functionName: 'treasuryBalance',
  });

  const { data: allStudents } = useReadContract({
    address: SMS_ADDRESS,
    abi: SMS_ABI,
    functionName: 'getAllStudents',
  });

  const { data: myTokenBalance } = useReadContract({
    address: TOKEN_ADDRESS,
    abi: TOKEN_ABI,
    functionName: 'balanceOf',
    args: address ? [address] : undefined,
    query: { enabled: !!address },
  });

  const stats = [
    {
      title: 'Treasury Balance',
      value: treasuryBalance ? `${formatEther(treasuryBalance as bigint)} STKN` : '0 STKN',
      icon: Wallet,
      color: 'text-emerald-400',
      bg: 'bg-emerald-400/10',
    },
    {
      title: 'Total Students',
      value: allStudents ? (allStudents as any[]).length.toString() : '0',
      icon: Users,
      color: 'text-indigo-400',
      bg: 'bg-indigo-400/10',
    },
    {
      title: 'Active Staff',
      value: 'N/A', // Assuming we don't have getAllStaff in ABI
      icon: UserCog,
      color: 'text-amber-400',
      bg: 'bg-amber-400/10',
    },
    {
      title: 'My STKN Balance',
      value: myTokenBalance ? `${formatEther(myTokenBalance as bigint)} STKN` : '0 STKN',
      icon: Coins,
      color: 'text-rose-400',
      bg: 'bg-rose-400/10',
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-white">Dashboard</h2>
        <p className="text-neutral-400 mt-1">Overview of your school management system.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <Card key={i} delay={i * 0.1} className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div className={`p-3 rounded-xl ${stat.bg}`}>
                  <Icon className={`w-6 h-6 ${stat.color}`} />
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-neutral-400">{stat.title}</p>
                <p className="text-2xl font-bold text-white mt-1">{stat.value}</p>
              </div>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card delay={0.4} className="min-h-[300px]">
          <h3 className="text-lg font-semibold text-white mb-4">Recent Activity</h3>
          <div className="flex items-center justify-center h-48 text-neutral-500">
            No recent activity found.
          </div>
        </Card>
        <Card delay={0.5} className="min-h-[300px]">
          <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
          <div className="flex flex-col gap-3">
            <button className="w-full py-3 px-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-left font-medium transition-colors">
              Register New Student
            </button>
            <button className="w-full py-3 px-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-left font-medium transition-colors">
              Pay Staff Salaries
            </button>
            <button className="w-full py-3 px-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-left font-medium transition-colors">
              Update Tuition Fees
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
}
