import { useReadContract } from 'wagmi';
import { SMS_ADDRESS, SMS_ABI } from '../lib/constants';
import { formatEther } from 'viem';

export function Dashboard() {
  const { data: treasuryBalance } = useReadContract({
    address: SMS_ADDRESS,
    abi: SMS_ABI,
    functionName: 'treasuryBalance',
  });

  const { data: students } = useReadContract({
    address: SMS_ADDRESS,
    abi: SMS_ABI,
    functionName: 'getAllStudents',
  });

  const studentCount = (students as any[])?.length || 0;
  const paidStudents = (students as any[])?.filter(s => s.isPaid).length || 0;

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
      
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <dt className="text-sm font-medium text-slate-500 truncate">Treasury Balance</dt>
            <dd className="mt-1 text-3xl font-semibold text-slate-900">
              {treasuryBalance ? formatEther(treasuryBalance as bigint) : '0'} STKN
            </dd>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <dt className="text-sm font-medium text-slate-500 truncate">Total Students</dt>
            <dd className="mt-1 text-3xl font-semibold text-slate-900">
              {studentCount}
            </dd>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <dt className="text-sm font-medium text-slate-500 truncate">Paid Students</dt>
            <dd className="mt-1 text-3xl font-semibold text-slate-900">
              {paidStudents}
            </dd>
          </div>
        </div>
      </div>
    </div>
  );
}
