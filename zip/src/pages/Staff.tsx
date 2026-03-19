import React, { useState } from 'react';
import { useWriteContract, usePublicClient } from 'wagmi';
import { SMS_ADDRESS, SMS_ABI } from '../lib/constants';
import { parseEther } from 'viem';

export function Staff() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('Teacher');
  const [wallet, setWallet] = useState('');
  const [salary, setSalary] = useState('1000');
  const [staffIdToPay, setStaffIdToPay] = useState('');
  const [staffIdToSuspend, setStaffIdToSuspend] = useState('');
  const [staffIdToActivate, setStaffIdToActivate] = useState('');

  const { writeContractAsync } = useWriteContract();
  const publicClient = usePublicClient();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const hash = await writeContractAsync({
        address: SMS_ADDRESS,
        abi: SMS_ABI,
        functionName: 'registerStaff',
        args: [name, email, role, wallet, parseEther(salary)],
      } as any);
      if (publicClient) {
        await publicClient.waitForTransactionReceipt({ hash });
      }
      // Reset form or show success message
      setName('');
      setEmail('');
      setWallet('');
    } catch (error) {
      console.error(error);
    }
  };

  const handlePayStaff = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const hash = await writeContractAsync({
        address: SMS_ADDRESS,
        abi: SMS_ABI,
        functionName: 'payStaff',
        args: [BigInt(staffIdToPay)],
      } as any);
      if (publicClient) {
        await publicClient.waitForTransactionReceipt({ hash });
      }
      setStaffIdToPay('');
    } catch (error) {
      console.error(error);
    }
  };

  const handleSuspendStaff = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const hash = await writeContractAsync({
        address: SMS_ADDRESS,
        abi: SMS_ABI,
        functionName: 'suspendStaff',
        args: [BigInt(staffIdToSuspend)],
      } as any);
      if (publicClient) {
        await publicClient.waitForTransactionReceipt({ hash });
      }
      setStaffIdToSuspend('');
    } catch (error) {
      console.error(error);
    }
  };

  const handleActivateStaff = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const hash = await writeContractAsync({
        address: SMS_ADDRESS,
        abi: SMS_ABI,
        functionName: 'activateStaff',
        args: [BigInt(staffIdToActivate)],
      } as any);
      if (publicClient) {
        await publicClient.waitForTransactionReceipt({ hash });
      }
      setStaffIdToActivate('');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="space-y-8">
      <div className="bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg leading-6 font-medium text-slate-900">Register Staff</h3>
          <form onSubmit={handleRegister} className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-5">
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
              type="text"
              placeholder="Role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
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
            <input
              type="number"
              placeholder="Salary (STKN)"
              value={salary}
              onChange={(e) => setSalary(e.target.value)}
              className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-slate-300 rounded-md p-2 border"
              required
            />
            <button
              type="submit"
              className="sm:col-span-5 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Register Staff
            </button>
          </form>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
        <div className="bg-white shadow sm:rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg leading-6 font-medium text-slate-900">Pay Staff</h3>
            <form onSubmit={handlePayStaff} className="mt-5 flex space-x-3">
              <input
                type="number"
                placeholder="Staff ID"
                value={staffIdToPay}
                onChange={(e) => setStaffIdToPay(e.target.value)}
                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-slate-300 rounded-md p-2 border"
                required
              />
              <button
                type="submit"
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                Pay
              </button>
            </form>
          </div>
        </div>

        <div className="bg-white shadow sm:rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg leading-6 font-medium text-slate-900">Suspend Staff</h3>
            <form onSubmit={handleSuspendStaff} className="mt-5 flex space-x-3">
              <input
                type="number"
                placeholder="Staff ID"
                value={staffIdToSuspend}
                onChange={(e) => setStaffIdToSuspend(e.target.value)}
                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-slate-300 rounded-md p-2 border"
                required
              />
              <button
                type="submit"
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                Suspend
              </button>
            </form>
          </div>
        </div>

        <div className="bg-white shadow sm:rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg leading-6 font-medium text-slate-900">Activate Staff</h3>
            <form onSubmit={handleActivateStaff} className="mt-5 flex space-x-3">
              <input
                type="number"
                placeholder="Staff ID"
                value={staffIdToActivate}
                onChange={(e) => setStaffIdToActivate(e.target.value)}
                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-slate-300 rounded-md p-2 border"
                required
              />
              <button
                type="submit"
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Activate
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
