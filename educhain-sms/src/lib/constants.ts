

// Contract Addresses
export const SMS_ADDRESS = "0x4a993f6ece900db22623527164e98e840347cdc9";
export const TOKEN_ADDRESS = "0xf5a26112692c023cab3a72ac082f473e32eda3c6";

// ==================== SCHOOL MANAGEMENT SYSTEM ABI ====================
export const SMS_ABI = [
  {
    "type": "constructor",
    "inputs": [
      {
        "name": "_token",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "fee100",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "fee200",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "fee300",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "fee400",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "activateStaff",
    "inputs": [
      {
        "name": "staffId",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "admin",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "address",
        "internalType": "address"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "getAllStaff",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "tuple[]",
        "internalType": "struct SchoolManagementSystem.Staff[]",
        "components": [
          {
            "name": "id",
            "type": "uint256",
            "internalType": "uint256"
          },
          {
            "name": "name",
            "type": "string",
            "internalType": "string"
          },
          {
            "name": "email",
            "type": "string",
            "internalType": "string"
          },
          {
            "name": "role",
            "type": "uint8",
            "internalType": "enum SchoolManagementSystem.StaffRole"
          },
          {
            "name": "wallet",
            "type": "address",
            "internalType": "address"
          },
          {
            "name": "salary",
            "type": "uint256",
            "internalType": "uint256"
          },
          {
            "name": "lastPaidAt",
            "type": "uint256",
            "internalType": "uint256"
          },
          {
            "name": "registeredAt",
            "type": "uint256",
            "internalType": "uint256"
          },
          {
            "name": "status",
            "type": "uint8",
            "internalType": "enum SchoolManagementSystem.StaffStatus"
          },
          {
            "name": "exists",
            "type": "bool",
            "internalType": "bool"
          }
        ]
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "getAllStudents",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "tuple[]",
        "internalType": "struct SchoolManagementSystem.Student[]",
        "components": [
          {
            "name": "id",
            "type": "uint256",
            "internalType": "uint256"
          },
          {
            "name": "name",
            "type": "string",
            "internalType": "string"
          },
          {
            "name": "email",
            "type": "string",
            "internalType": "string"
          },
          {
            "name": "level",
            "type": "uint8",
            "internalType": "enum SchoolManagementSystem.Level"
          },
          {
            "name": "wallet",
            "type": "address",
            "internalType": "address"
          },
          {
            "name": "paymentStatus",
            "type": "uint8",
            "internalType": "enum SchoolManagementSystem.PaymentStatus"
          },
          {
            "name": "paymentTimestamp",
            "type": "uint256",
            "internalType": "uint256"
          },
          {
            "name": "registeredAt",
            "type": "uint256",
            "internalType": "uint256"
          },
          {
            "name": "status",
            "type": "uint8",
            "internalType": "enum SchoolManagementSystem.StudentStatus"
          },
          {
            "name": "exists",
            "type": "bool",
            "internalType": "bool"
          }
        ]
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "getAllTuitionFees",
    "inputs": [],
    "outputs": [
      {
        "name": "fee100",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "fee200",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "fee300",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "fee400",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "getStaff",
    "inputs": [
      {
        "name": "staffId",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "tuple",
        "internalType": "struct SchoolManagementSystem.Staff",
        "components": [
          {
            "name": "id",
            "type": "uint256",
            "internalType": "uint256"
          },
          {
            "name": "name",
            "type": "string",
            "internalType": "string"
          },
          {
            "name": "email",
            "type": "string",
            "internalType": "string"
          },
          {
            "name": "role",
            "type": "uint8",
            "internalType": "enum SchoolManagementSystem.StaffRole"
          },
          {
            "name": "wallet",
            "type": "address",
            "internalType": "address"
          },
          {
            "name": "salary",
            "type": "uint256",
            "internalType": "uint256"
          },
          {
            "name": "lastPaidAt",
            "type": "uint256",
            "internalType": "uint256"
          },
          {
            "name": "registeredAt",
            "type": "uint256",
            "internalType": "uint256"
          },
          {
            "name": "status",
            "type": "uint8",
            "internalType": "enum SchoolManagementSystem.StaffStatus"
          },
          {
            "name": "exists",
            "type": "bool",
            "internalType": "bool"
          }
        ]
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "getStaffByWallet",
    "inputs": [
      {
        "name": "wallet",
        "type": "address",
        "internalType": "address"
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "tuple",
        "internalType": "struct SchoolManagementSystem.Staff",
        "components": [
          {
            "name": "id",
            "type": "uint256",
            "internalType": "uint256"
          },
          {
            "name": "name",
            "type": "string",
            "internalType": "string"
          },
          {
            "name": "email",
            "type": "string",
            "internalType": "string"
          },
          {
            "name": "role",
            "type": "uint8",
            "internalType": "enum SchoolManagementSystem.StaffRole"
          },
          {
            "name": "wallet",
            "type": "address",
            "internalType": "address"
          },
          {
            "name": "salary",
            "type": "uint256",
            "internalType": "uint256"
          },
          {
            "name": "lastPaidAt",
            "type": "uint256",
            "internalType": "uint256"
          },
          {
            "name": "registeredAt",
            "type": "uint256",
            "internalType": "uint256"
          },
          {
            "name": "status",
            "type": "uint8",
            "internalType": "enum SchoolManagementSystem.StaffStatus"
          },
          {
            "name": "exists",
            "type": "bool",
            "internalType": "bool"
          }
        ]
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "getStudent",
    "inputs": [
      {
        "name": "studentId",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "tuple",
        "internalType": "struct SchoolManagementSystem.Student",
        "components": [
          {
            "name": "id",
            "type": "uint256",
            "internalType": "uint256"
          },
          {
            "name": "name",
            "type": "string",
            "internalType": "string"
          },
          {
            "name": "email",
            "type": "string",
            "internalType": "string"
          },
          {
            "name": "level",
            "type": "uint8",
            "internalType": "enum SchoolManagementSystem.Level"
          },
          {
            "name": "wallet",
            "type": "address",
            "internalType": "address"
          },
          {
            "name": "paymentStatus",
            "type": "uint8",
            "internalType": "enum SchoolManagementSystem.PaymentStatus"
          },
          {
            "name": "paymentTimestamp",
            "type": "uint256",
            "internalType": "uint256"
          },
          {
            "name": "registeredAt",
            "type": "uint256",
            "internalType": "uint256"
          },
          {
            "name": "status",
            "type": "uint8",
            "internalType": "enum SchoolManagementSystem.StudentStatus"
          },
          {
            "name": "exists",
            "type": "bool",
            "internalType": "bool"
          }
        ]
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "getStudentByWallet",
    "inputs": [
      {
        "name": "wallet",
        "type": "address",
        "internalType": "address"
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "tuple",
        "internalType": "struct SchoolManagementSystem.Student",
        "components": [
          {
            "name": "id",
            "type": "uint256",
            "internalType": "uint256"
          },
          {
            "name": "name",
            "type": "string",
            "internalType": "string"
          },
          {
            "name": "email",
            "type": "string",
            "internalType": "string"
          },
          {
            "name": "level",
            "type": "uint8",
            "internalType": "enum SchoolManagementSystem.Level"
          },
          {
            "name": "wallet",
            "type": "address",
            "internalType": "address"
          },
          {
            "name": "paymentStatus",
            "type": "uint8",
            "internalType": "enum SchoolManagementSystem.PaymentStatus"
          },
          {
            "name": "paymentTimestamp",
            "type": "uint256",
            "internalType": "uint256"
          },
          {
            "name": "registeredAt",
            "type": "uint256",
            "internalType": "uint256"
          },
          {
            "name": "status",
            "type": "uint8",
            "internalType": "enum SchoolManagementSystem.StudentStatus"
          },
          {
            "name": "exists",
            "type": "bool",
            "internalType": "bool"
          }
        ]
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "payStaff",
    "inputs": [
      {
        "name": "staffId",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "payTuition",
    "inputs": [
      {
        "name": "studentId",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "reactivateStudent",
    "inputs": [
      {
        "name": "studentId",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "registerStaff",
    "inputs": [
      {
        "name": "name",
        "type": "string",
        "internalType": "string"
      },
      {
        "name": "email",
        "type": "string",
        "internalType": "string"
      },
      {
        "name": "role",
        "type": "uint8",
        "internalType": "enum SchoolManagementSystem.StaffRole"
      },
      {
        "name": "wallet",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "salary",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "outputs": [
      {
        "name": "staffId",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "registerStudent",
    "inputs": [
      {
        "name": "name",
        "type": "string",
        "internalType": "string"
      },
      {
        "name": "email",
        "type": "string",
        "internalType": "string"
      },
      {
        "name": "level",
        "type": "uint8",
        "internalType": "enum SchoolManagementSystem.Level"
      },
      {
        "name": "wallet",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "payNow",
        "type": "bool",
        "internalType": "bool"
      }
    ],
    "outputs": [
      {
        "name": "studentId",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "removeStudent",
    "inputs": [
      {
        "name": "studentId",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "setTuitionFee",
    "inputs": [
      {
        "name": "level",
        "type": "uint8",
        "internalType": "enum SchoolManagementSystem.Level"
      },
      {
        "name": "newFee",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "suspendStaff",
    "inputs": [
      {
        "name": "staffId",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "token",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "address",
        "internalType": "contract SchoolToken"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "totalStaff",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "totalStudents",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "transferAdmin",
    "inputs": [
      {
        "name": "newAdmin",
        "type": "address",
        "internalType": "address"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "treasuryBalance",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "tuitionFee",
    "inputs": [
      {
        "name": "",
        "type": "uint8",
        "internalType": "enum SchoolManagementSystem.Level"
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "event",
    "name": "SalaryPaid",
    "inputs": [
      {
        "name": "staffId",
        "type": "uint256",
        "indexed": true,
        "internalType": "uint256"
      },
      {
        "name": "wallet",
        "type": "address",
        "indexed": true,
        "internalType": "address"
      },
      {
        "name": "amount",
        "type": "uint256",
        "indexed": false,
        "internalType": "uint256"
      },
      {
        "name": "timestamp",
        "type": "uint256",
        "indexed": false,
        "internalType": "uint256"
      }
    ],
    "anonymous": false
  },
  {
    "type": "event",
    "name": "StaffActivated",
    "inputs": [
      {
        "name": "id",
        "type": "uint256",
        "indexed": true,
        "internalType": "uint256"
      },
      {
        "name": "name",
        "type": "string",
        "indexed": false,
        "internalType": "string"
      },
      {
        "name": "role",
        "type": "uint8",
        "indexed": false,
        "internalType": "enum SchoolManagementSystem.StaffRole"
      }
    ],
    "anonymous": false
  },
  {
    "type": "event",
    "name": "StaffRegistered",
    "inputs": [
      {
        "name": "id",
        "type": "uint256",
        "indexed": true,
        "internalType": "uint256"
      },
      {
        "name": "name",
        "type": "string",
        "indexed": false,
        "internalType": "string"
      },
      {
        "name": "role",
        "type": "uint8",
        "indexed": false,
        "internalType": "enum SchoolManagementSystem.StaffRole"
      },
      {
        "name": "wallet",
        "type": "address",
        "indexed": false,
        "internalType": "address"
      }
    ],
    "anonymous": false
  },
  {
    "type": "event",
    "name": "StaffSuspended",
    "inputs": [
      {
        "name": "id",
        "type": "uint256",
        "indexed": true,
        "internalType": "uint256"
      },
      {
        "name": "name",
        "type": "string",
        "indexed": false,
        "internalType": "string"
      },
      {
        "name": "role",
        "type": "uint8",
        "indexed": false,
        "internalType": "enum SchoolManagementSystem.StaffRole"
      }
    ],
    "anonymous": false
  },
  {
    "type": "event",
    "name": "StudentRegistered",
    "inputs": [
      {
        "name": "id",
        "type": "uint256",
        "indexed": true,
        "internalType": "uint256"
      },
      {
        "name": "name",
        "type": "string",
        "indexed": false,
        "internalType": "string"
      },
      {
        "name": "level",
        "type": "uint8",
        "indexed": false,
        "internalType": "enum SchoolManagementSystem.Level"
      },
      {
        "name": "wallet",
        "type": "address",
        "indexed": false,
        "internalType": "address"
      }
    ],
    "anonymous": false
  },
  {
    "type": "event",
    "name": "StudentRemoved",
    "inputs": [
      {
        "name": "id",
        "type": "uint256",
        "indexed": true,
        "internalType": "uint256"
      },
      {
        "name": "name",
        "type": "string",
        "indexed": false,
        "internalType": "string"
      },
      {
        "name": "wallet",
        "type": "address",
        "indexed": false,
        "internalType": "address"
      }
    ],
    "anonymous": false
  },
  {
    "type": "event",
    "name": "TuitionFeeUpdated",
    "inputs": [
      {
        "name": "level",
        "type": "uint8",
        "indexed": false,
        "internalType": "enum SchoolManagementSystem.Level"
      },
      {
        "name": "newFee",
        "type": "uint256",
        "indexed": false,
        "internalType": "uint256"
      }
    ],
    "anonymous": false
  },
  {
    "type": "event",
    "name": "TuitionPaid",
    "inputs": [
      {
        "name": "studentId",
        "type": "uint256",
        "indexed": true,
        "internalType": "uint256"
      },
      {
        "name": "amount",
        "type": "uint256",
        "indexed": false,
        "internalType": "uint256"
      },
      {
        "name": "timestamp",
        "type": "uint256",
        "indexed": false,
        "internalType": "uint256"
      }
    ],
    "anonymous": false
  }
] as const;

// ==================== SCHOOL TOKEN ABI ====================
export const TOKEN_ABI = [
  {
    "type": "constructor",
    "inputs": [
      {
        "name": "initialSupply",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "allowance",
    "inputs": [
      {
        "name": "_owner",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "spender",
        "type": "address",
        "internalType": "address"
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "approve",
    "inputs": [
      {
        "name": "spender",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "amount",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "bool",
        "internalType": "bool"
      }
    ],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "balanceOf",
    "inputs": [
      {
        "name": "account",
        "type": "address",
        "internalType": "address"
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "decimals",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "uint8",
        "internalType": "uint8"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "mint",
    "inputs": [
      {
        "name": "to",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "amount",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "name",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "string",
        "internalType": "string"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "owner",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "address",
        "internalType": "address"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "symbol",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "string",
        "internalType": "string"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "totalSupply",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "transfer",
    "inputs": [
      {
        "name": "to",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "amount",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "bool",
        "internalType": "bool"
      }
    ],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "transferFrom",
    "inputs": [
      {
        "name": "from",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "to",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "amount",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "bool",
        "internalType": "bool"
      }
    ],
    "stateMutability": "nonpayable"
  },
  {
    "type": "event",
    "name": "Approval",
    "inputs": [
      {
        "name": "owner",
        "type": "address",
        "indexed": true,
        "internalType": "address"
      },
      {
        "name": "spender",
        "type": "address",
        "indexed": true,
        "internalType": "address"
      },
      {
        "name": "value",
        "type": "uint256",
        "indexed": false,
        "internalType": "uint256"
      }
    ],
    "anonymous": false
  },
  {
    "type": "event",
    "name": "Transfer",
    "inputs": [
      {
        "name": "from",
        "type": "address",
        "indexed": true,
        "internalType": "address"
      },
      {
        "name": "to",
        "type": "address",
        "indexed": true,
        "internalType": "address"
      },
      {
        "name": "value",
        "type": "uint256",
        "indexed": false,
        "internalType": "uint256"
      }
    ],
    "anonymous": false
  }
] as const;

// ==================== HELPER OBJECTS ====================
export const CONTRACTS = {
  schoolManagement: {
    address: SMS_ADDRESS,
    abi: SMS_ABI,
    name: "SchoolManagementSystem"
  },
  token: {
    address: TOKEN_ADDRESS,
    abi: TOKEN_ABI,
    name: "SchoolToken"
  }
} as const;

// Contract function categories for easier reference
export const CONTRACT_FUNCTIONS = {
  // Student management
  registerStudent: "registerStudent",
  getStudent: "getStudent",
  getAllStudents: "getAllStudents",
  getStudentByWallet: "getStudentByWallet",
  payTuition: "payTuition",
  removeStudent: "removeStudent",
  reactivateStudent: "reactivateStudent",
  
  // Staff management
  registerStaff: "registerStaff",
  getStaff: "getStaff",
  getAllStaff: "getAllStaff",
  getStaffByWallet: "getStaffByWallet",
  payStaff: "payStaff",
  suspendStaff: "suspendStaff",
  activateStaff: "activateStaff",
  
  // Admin functions
  setTuitionFee: "setTuitionFee",
  transferAdmin: "transferAdmin",
  
  // View functions
  treasuryBalance: "treasuryBalance",
  totalStudents: "totalStudents",
  totalStaff: "totalStaff",
  getAllTuitionFees: "getAllTuitionFees"
} as const;

// Token function categories
export const TOKEN_FUNCTIONS = {
  balanceOf: "balanceOf",
  transfer: "transfer",
  approve: "approve",
  allowance: "allowance",
  transferFrom: "transferFrom",
  mint: "mint",
  name: "name",
  symbol: "symbol",
  decimals: "decimals",
  totalSupply: "totalSupply",
  owner: "owner"
} as const;

// ==================== ENUMS (from your contract) ====================
export enum StudentLevel {
  Level100 = 0,
  Level200 = 1,
  Level300 = 2,
  Level400 = 3
}

export enum PaymentStatus {
  Unpaid = 0,
  Paid = 1,
  Partial = 2,
  Scholarship = 3
}

export enum StudentStatus {
  Active = 0,
  Inactive = 1,
  Graduated = 2,
  Suspended = 3
}

export enum StaffRole {
  Teacher = 0,
  Administrator = 1,
  Accountant = 2,
  Librarian = 3,
  Cleaner = 4,
  Security = 5
}

export enum StaffStatus {
  Active = 0,
  Suspended = 1,
  Resigned = 2,
  Terminated = 3
}

// ==================== TYPE DEFINITIONS ====================
export interface Student {
  id: bigint;
  name: string;
  email: string;
  level: StudentLevel;
  wallet: string;
  paymentStatus: PaymentStatus;
  paymentTimestamp: bigint;
  registeredAt: bigint;
  status: StudentStatus;
  exists: boolean;
}

export interface Staff {
  id: bigint;
  name: string;
  email: string;
  role: StaffRole;
  wallet: string;
  salary: bigint;
  lastPaidAt: bigint;
  registeredAt: bigint;
  status: StaffStatus;
  exists: boolean;
}

