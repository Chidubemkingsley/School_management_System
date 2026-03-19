export const SMS_ADDRESS = "0x4a993f6ece900db22623527164e98e840347cdc9";
export const TOKEN_ADDRESS = "0xf5a26112692c023cab3a72ac082f473e32eda3c6";

export const SMS_ABI = [
  {
    "inputs": [
      {"internalType": "string", "name": "name", "type": "string"},
      {"internalType": "string", "name": "email", "type": "string"},
      {"internalType": "uint256", "name": "level", "type": "uint256"},
      {"internalType": "address", "name": "wallet", "type": "address"},
      {"internalType": "bool", "name": "payNow", "type": "bool"}
    ],
    "name": "registerStudent",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "uint256", "name": "studentId", "type": "uint256"}],
    "name": "payTuition",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "uint256", "name": "studentId", "type": "uint256"}],
    "name": "getStudent",
    "outputs": [
      {
        "components": [
          {"internalType": "uint256", "name": "id", "type": "uint256"},
          {"internalType": "string", "name": "name", "type": "string"},
          {"internalType": "string", "name": "email", "type": "string"},
          {"internalType": "uint256", "name": "level", "type": "uint256"},
          {"internalType": "address", "name": "wallet", "type": "address"},
          {"internalType": "bool", "name": "isPaid", "type": "bool"},
          {"internalType": "bool", "name": "isActive", "type": "bool"}
        ],
        "internalType": "struct SchoolManagementSystem.Student",
        "name": "",
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getAllStudents",
    "outputs": [
      {
        "components": [
          {"internalType": "uint256", "name": "id", "type": "uint256"},
          {"internalType": "string", "name": "name", "type": "string"},
          {"internalType": "string", "name": "email", "type": "string"},
          {"internalType": "uint256", "name": "level", "type": "uint256"},
          {"internalType": "address", "name": "wallet", "type": "address"},
          {"internalType": "bool", "name": "isPaid", "type": "bool"},
          {"internalType": "bool", "name": "isActive", "type": "bool"}
        ],
        "internalType": "struct SchoolManagementSystem.Student[]",
        "name": "",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {"internalType": "string", "name": "name", "type": "string"},
      {"internalType": "string", "name": "email", "type": "string"},
      {"internalType": "string", "name": "role", "type": "string"},
      {"internalType": "address", "name": "wallet", "type": "address"},
      {"internalType": "uint256", "name": "salary", "type": "uint256"}
    ],
    "name": "registerStaff",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "uint256", "name": "staffId", "type": "uint256"}],
    "name": "payStaff",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "uint256", "name": "staffId", "type": "uint256"}],
    "name": "suspendStaff",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "uint256", "name": "staffId", "type": "uint256"}],
    "name": "activateStaff",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {"internalType": "uint256", "name": "level", "type": "uint256"},
      {"internalType": "uint256", "name": "newFee", "type": "uint256"}
    ],
    "name": "setTuitionFee",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "treasuryBalance",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "uint256", "name": "level", "type": "uint256"}],
    "name": "tuitionFee",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "uint256", "name": "studentId", "type": "uint256"}],
    "name": "removeStudent",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "uint256", "name": "studentId", "type": "uint256"}],
    "name": "reactivateStudent",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "owner",
    "outputs": [{"internalType": "address", "name": "", "type": "address"}],
    "stateMutability": "view",
    "type": "function"
  }
] as const;

export const TOKEN_ABI = [
  {
    "inputs": [
      {"internalType": "address", "name": "spender", "type": "address"},
      {"internalType": "uint256", "name": "amount", "type": "uint256"}
    ],
    "name": "approve",
    "outputs": [{"internalType": "bool", "name": "", "type": "bool"}],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {"internalType": "address", "name": "owner", "type": "address"},
      {"internalType": "address", "name": "spender", "type": "address"}
    ],
    "name": "allowance",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {"internalType": "address", "name": "to", "type": "address"},
      {"internalType": "uint256", "name": "amount", "type": "uint256"}
    ],
    "name": "transfer",
    "outputs": [{"internalType": "bool", "name": "", "type": "bool"}],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "address", "name": "account", "type": "address"}],
    "name": "balanceOf",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  }
] as const;

