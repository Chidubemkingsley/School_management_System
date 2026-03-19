import { useState } from 'react';
import { useReadContract, useWriteContract, useAccount, usePublicClient } from 'wagmi';
import { SMS_ADDRESS, SMS_ABI, TOKEN_ADDRESS, TOKEN_ABI } from '../lib/constants';
import { parseEther, formatEther } from 'viem';

export function Payments() {
  const { address } = useAccount();
  const [studentId, setStudentId] = useState('');

  const { data: student } = useReadContract({
    address: SMS_ADDRESS,
    abi: SMS_ABI,
    functionName: 'getStudent',
    args: [BigInt(studentId || '0')],
  });

  const { data: tuitionFee } = useReadContract({
    address: SMS_ADDRESS,
    abi: SMS_ABI,
    functionName: 'tuitionFee',
    args: [student ? (student as any).level : BigInt(0)],
  });

  const fee = tuitionFee ? formatEther(tuitionFee as bigint) : '0';

  const { data: allowance, refetch: refetchAllowance } = useReadContract({
    address: TOKEN_ADDRESS,
    abi: TOKEN_ABI,
    functionName: 'allowance',
    args: [address, SMS_ADDRESS],
  });

  const { writeContractAsync: writeToken } = useWriteContract();
  const { writeContractAsync: writeSMS } = useWriteContract();
  const publicClient = usePublicClient();

  const handleApprove = async () => {
    try {
      const hash = await writeToken({
        address: TOKEN_ADDRESS,
        abi: TOKEN_ABI,
        functionName: 'approve',
        args: [SMS_ADDRESS, parseEther(fee)],
      } as any);
      
      if (publicClient) {
        await publicClient.waitForTransactionReceipt({ hash });
      }
      setStudentId('');
      refetchAllowance();
    } catch (error) {
      console.error(error);
    }
  };

  const handlePay = async () => {
    try {
      const hash = await writeSMS({
        address: SMS_ADDRESS,
        abi: SMS_ABI,
        functionName: 'payTuition',
        args: [BigInt(studentId)],
      } as any);
      
      if (publicClient) {
        await publicClient.waitForTransactionReceipt({ hash });
      }
      setStudentId('');
    } catch (error) {
      console.error(error);
    }
  };

  const needsApproval = allowance === undefined || (allowance as bigint) < parseEther(fee);

  return (
    <div className="space-y-8">
      <div className="bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg leading-6 font-medium text-slate-900">Pay Tuition</h3>
          <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <input
              type="number"
              placeholder="Student ID"
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
              className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-slate-300 rounded-md p-2 border"
              required
            />
            <input
              type="text"
              placeholder="Fee Amount (STKN)"
              value={fee}
              disabled
              className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-slate-300 rounded-md p-2 border bg-slate-100"
            />
            
            {needsApproval ? (
              <button
                onClick={handleApprove}
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Approve {fee} STKN
              </button>
            ) : (
              <button
                onClick={handlePay}
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                Pay Tuition
              </button>
            )}
          </div>
          <div className="mt-4 text-sm text-slate-500">
            Current Allowance: {allowance ? formatEther(allowance as bigint) : '0'} STKN
          </div>
        </div>
      </div>
    </div>
  );
}
