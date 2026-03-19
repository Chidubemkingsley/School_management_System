import { Card } from './Card';
import { useAccount } from 'wagmi';
import { useSchool } from '../context/SchoolContext';
import { formatEther } from 'viem';
import { Wallet, Users, UserCog, Coins, RefreshCw, GraduationCap } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Dashboard() {
  const { address } = useAccount();
  const { 
    treasuryBalance, 
    allStudents, 
    allStaff,
    refreshAll 
  } = useSchool();
  
  const [refreshKey, setRefreshKey] = useState(0);

  // Auto-refresh every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setRefreshKey(prev => prev + 1);
      refreshAll();
    }, 30000);
    return () => clearInterval(interval);
  }, [refreshAll]);

  // Manual refresh function
  const handleRefresh = () => {
    setRefreshKey(prev => prev + 1);
    refreshAll();
  };

  // Get active staff count (filter by status)
  const activeStaffCount = allStaff 
    ? (allStaff as any[]).filter((s: any) => s.status === 0).length 
    : 0;

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
      value: activeStaffCount.toString(),
      icon: UserCog,
      color: 'text-amber-400',
      bg: 'bg-amber-400/10',
    },
    {
      title: 'Connected Wallet',
      value: address ? `${address.slice(0, 6)}...${address.slice(-4)}` : 'Not Connected',
      icon: Coins,
      color: 'text-rose-400',
      bg: 'bg-rose-400/10',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header with refresh button */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-white">Dashboard</h2>
          <p className="text-neutral-400 mt-1">Overview of your school management system.</p>
        </div>
        <button
          onClick={handleRefresh}
          className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 rounded-xl text-sm font-medium transition-colors border border-white/10"
        >
          <RefreshCw className={`w-4 h-4 ${refreshKey > 0 ? 'animate-spin' : ''}`} />
          Refresh
        </button>
      </div>

      {/* Stats Grid */}
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
        {/* Recent Activity */}
        <Card delay={0.4} className="min-h-[300px]">
          <h3 className="text-lg font-semibold text-white mb-4">Recent Activity</h3>
          {allStudents && (allStudents as any[]).length > 0 ? (
            <div className="space-y-3">
              {(allStudents as any[]).slice(-3).reverse().map((student: any, idx: number) => (
                <div key={idx} className="flex items-center gap-3 p-3 bg-white/5 rounded-lg">
                  <GraduationCap className="w-4 h-4 text-indigo-400" />
                  <div className="flex-1">
                    <p className="text-sm text-white">{student.name} registered</p>
                    <p className="text-xs text-neutral-500">
                      {student.registeredAt ? new Date(Number(student.registeredAt) * 1000).toLocaleDateString() : 'Recently'}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center h-48 text-neutral-500">
              No recent activity found.
            </div>
          )}
        </Card>

        {/* Quick Actions */}
        <Card delay={0.5} className="min-h-[300px]">
          <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
          <div className="flex flex-col gap-3">
            <button 
              onClick={() => window.location.href = '/students'}
              className="w-full py-3 px-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-left font-medium transition-colors flex items-center gap-3"
            >
              <Users className="w-5 h-5 text-indigo-400" />
              Register New Student
            </button>
            <button 
              onClick={() => window.location.href = '/staff'}
              className="w-full py-3 px-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-left font-medium transition-colors flex items-center gap-3"
            >
              <UserCog className="w-5 h-5 text-amber-400" />
              Pay Staff Salaries
            </button>
            <button 
              onClick={() => window.location.href = '/admin'}
              className="w-full py-3 px-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-left font-medium transition-colors flex items-center gap-3"
            >
              <Wallet className="w-5 h-5 text-rose-400" />
              Update Tuition Fees
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
}