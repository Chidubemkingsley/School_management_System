import React, { createContext, useContext, useState, useEffect } from 'react';
import { useReadContract } from 'wagmi';
import { SMS_ADDRESS, SMS_ABI, TOKEN_ADDRESS, TOKEN_ABI } from '../lib/constants';

interface SchoolContextType {
  refreshTrigger: number;
  refreshAll: () => void;
  treasuryBalance: any;
  allStudents: any;
  allStaff: any;
  refetchTreasury: () => void;
  refetchStudents: () => void;
  refetchStaff: () => void;
}

const SchoolContext = createContext<SchoolContextType | undefined>(undefined);

export function SchoolProvider({ children }: { children: React.ReactNode }) {
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const { data: treasuryBalance, refetch: refetchTreasury } = useReadContract({
    address: SMS_ADDRESS,
    abi: SMS_ABI,
    functionName: 'treasuryBalance',
  });

  const { data: allStudents, refetch: refetchStudents } = useReadContract({
    address: SMS_ADDRESS,
    abi: SMS_ABI,
    functionName: 'getAllStudents',
  });

  const { data: allStaff, refetch: refetchStaff } = useReadContract({
    address: SMS_ADDRESS,
    abi: SMS_ABI,
    functionName: 'getAllStaff',
  });

  const refreshAll = () => {
    setRefreshTrigger(prev => prev + 1);
    refetchTreasury();
    refetchStudents();
    refetchStaff();
  };

  useEffect(() => {
    refetchTreasury();
    refetchStudents();
    refetchStaff();
  }, [refreshTrigger]);

  return (
    <SchoolContext.Provider value={{
      refreshTrigger,
      refreshAll,
      treasuryBalance,
      allStudents,
      allStaff,
      refetchTreasury,
      refetchStudents,
      refetchStaff,
    }}>
      {children}
    </SchoolContext.Provider>
  );
}

// ✅ THIS MUST BE EXPORTED - make sure this line exists!
export const useSchool = () => {
  const context = useContext(SchoolContext);
  if (!context) throw new Error('useSchool must be used within SchoolProvider');
  return context;
};