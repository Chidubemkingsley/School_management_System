import React, { useState } from 'react';
import { useReadContract, useWriteContract, useAccount, usePublicClient } from 'wagmi';
import { SMS_ADDRESS, SMS_ABI, TOKEN_ADDRESS, TOKEN_ABI } from '../lib/constants';
import { parseEther } from 'viem';

export function Students() {
  const { address } = useAccount();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [level, setLevel] = useState('1');
  const [wallet, setWallet] = useState('');
  
  const { data: students, refetch: refetchStudents } = useReadContract({
    address: SMS_ADDRESS,
    abi: SMS_ABI,
    functionName: 'getAllStudents',
  });

  const { writeContractAsync: writeSMS } = useWriteContract();
  const { writeContractAsync: writeToken } = useWriteContract();
  const publicClient = usePublicClient();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const hash = await writeSMS({
        address: SMS_ADDRESS,
        abi: SMS_ABI,
        functionName: 'registerStudent',
        args: [name, email, BigInt(level), wallet, false],
      } as any);
      
      if (publicClient) {
        await publicClient.waitForTransactionReceipt({ hash });
      }
      setName('');
      setEmail('');
      setLevel('1');
      setWallet('');
      refetchStudents();
    } catch (error) {
      console.error(error);
    }
  };

  const handlePayTuition = async (studentId: bigint, level: bigint) => {
    try {
      if (!publicClient) return;
      
      const fee = await publicClient.readContract({
        address: SMS_ADDRESS,
        abi: SMS_ABI,
        functionName: 'tuitionFee',
        args: [level],
      } as any) as bigint;
      
      // Step 1: Approve
      const approveHash = await writeToken({
        address: TOKEN_ADDRESS,
        abi: TOKEN_ABI,
        functionName: 'approve',
        args: [SMS_ADDRESS, fee],
      } as any);
      
      if (publicClient) {
        await publicClient.waitForTransactionReceipt({ hash: approveHash });
      }

      // Step 2: Pay
      const payHash = await writeSMS({
        address: SMS_ADDRESS,
        abi: SMS_ABI,
        functionName: 'payTuition',
        args: [studentId],
      } as any);
      
      if (publicClient) {
        await publicClient.waitForTransactionReceipt({ hash: payHash });
      }
      refetchStudents();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="space-y-8">
      <div className="bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg leading-6 font-medium text-slate-900">Register Student</h3>
          <form onSubmit={handleRegister} className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-4">
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-slate-300 rounded-md p-2 border"
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-slate-300 rounded-md p-2 border"
              required
            />
            <input
              type="number"
              placeholder="Level"
              value={level}
              onChange={(e) => setLevel(e.target.value)}
              className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-slate-300 rounded-md p-2 border"
              required
            />
            <input
              type="text"
              placeholder="Wallet Address"
              value={wallet}
              onChange={(e) => setWallet(e.target.value)}
              className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-slate-300 rounded-md p-2 border"
              required
            />
            <button
              type="submit"
              className="sm:col-span-4 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Register
            </button>
          </form>
        </div>
      </div>

      <div className="bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg leading-6 font-medium text-slate-900 mb-4">Students List</h3>
          <div className="flex flex-col">
            <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                <div className="shadow overflow-hidden border-b border-slate-200 sm:rounded-lg">
                  <table className="min-w-full divide-y divide-slate-200">
                    <thead className="bg-slate-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">ID</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Name</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Level</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Status</th>
                        <th scope="col" className="relative px-6 py-3"><span className="sr-only">Actions</span></th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-slate-200">
                      {(students as any[])?.map((student) => (
                        <tr key={student.id.toString()}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">{student.id.toString()}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">{student.name}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">{student.level.toString()}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${student.isPaid ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                              {student.isPaid ? 'Paid' : 'Unpaid'}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            {!student.isPaid && (
                              <button
                                onClick={() => handlePayTuition(student.id, student.level)}
                                className="text-indigo-600 hover:text-indigo-900"
                              >
                                Pay Tuition
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
