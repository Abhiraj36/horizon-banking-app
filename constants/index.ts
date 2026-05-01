export const sidebarLinks = [
  {
    imgURL: "/icons/home.svg",
    route: "/",
    label: "Home",
  },
  {
    imgURL: "/icons/dollar-circle.svg",
    route: "/my-banks",
    label: "My Banks",
  },
  {
    imgURL: "/icons/transaction.svg",
    route: "/transaction-history",
    label: "Transaction History",
  },
  {
    imgURL: "/icons/money-send.svg",
    route: "/payment-transfer",
    label: "Transfer Funds",
  },
];

// good_user / good_password - Bank of America
export const TEST_USER_ID = "6627ed3d00267aa6fa3e";

// custom_user -> Chase Bank
// export const TEST_ACCESS_TOKEN =
//   "access-sandbox-da44dac8-7d31-4f66-ab36-2238d63a3017";

// custom_user -> Chase Bank
export const TEST_ACCESS_TOKEN =
  "access-sandbox-229476cf-25bc-46d2-9ed5-fba9df7a5d63";

export const ITEMS = [
  {
    id: "6624c02e00367128945e", // appwrite item Id
    accessToken: "access-sandbox-83fd9200-0165-4ef8-afde-65744b9d1548",
    itemId: "VPMQJKG5vASvpX8B6JK3HmXkZlAyplhW3r9xm",
    userId: "6627ed3d00267aa6fa3e",
    accountId: "X7LMJkE5vnskJBxwPeXaUWDBxAyZXwi9DNEWJ",
  },
  {
    id: "6627f07b00348f242ea9", // appwrite item Id
    accessToken: "access-sandbox-74d49e15-fc3b-4d10-a5e7-be4ddae05b30",
    itemId: "Wv7P6vNXRXiMkoKWPzeZS9Zm5JGWdXulLRNBq",
    userId: "6627ed3d00267aa6fa3e",
    accountId: "x1GQb1lDrDHWX4BwkqQbI4qpQP1lL6tJ3VVo9",
  },
];

export const topCategoryStyles = {
  "Food and Drink": {
    bg: "bg-blue-25",
    circleBg: "bg-blue-100",
    text: {
      main: "text-blue-900",
      count: "text-blue-700",
    },
    progress: {
      bg: "bg-blue-100",
      indicator: "bg-blue-700",
    },
    icon: "/icons/a-coffee.svg",
  },
  Travel: {
    bg: "bg-success-25",
    circleBg: "bg-success-100",
    text: {
      main: "text-success-900",
      count: "text-success-700",
    },
    progress: {
      bg: "bg-success-100",
      indicator: "bg-success-700",
    },
    icon: "/icons/coins.svg",
  },
  Payment: {
    bg: "bg-green-50",
    circleBg: "bg-green-100",
    text: {
      main: "text-green-900",
      count: "text-green-700",
    },
    progress: {
      bg: "bg-green-100",
      indicator: "bg-green-700",
    },
    icon: "/icons/dollar-circle.svg",
  },
  Transfer: {
    bg: "bg-yellow-50",
    circleBg: "bg-yellow-100",
    text: {
      main: "text-yellow-900",
      count: "text-yellow-700",
    },
    progress: {
      bg: "bg-yellow-100",
      indicator: "bg-yellow-700",
    },
    icon: "/icons/bank-transfer.svg",
  },
  Recreation: {
    bg: "bg-red-50",
    circleBg: "bg-red-100",
    text: {
      main: "text-red-900",
      count: "text-red-700",
    },
    progress: {
      bg: "bg-red-100",
      indicator: "bg-red-700",
    },
    icon: "/icons/monitor.svg",
  },
  Service: {
    bg: "bg-purple-50",
    circleBg: "bg-purple-100",
    text: {
      main: "text-purple-900",
      count: "text-purple-700",
    },
    progress: {
      bg: "bg-purple-100",
      indicator: "bg-purple-700",
    },
    icon: "/icons/credit-card.svg",
  },
  Shops: {
    bg: "bg-pink-25",
    circleBg: "bg-pink-100",
    text: {
      main: "text-pink-900",
      count: "text-pink-700",
    },
    progress: {
      bg: "bg-pink-100",
      indicator: "bg-pink-700",
    },
    icon: "/icons/shopping-bag.svg",
  },
  "Bank Fees": {
    bg: "bg-orange-50",
    circleBg: "bg-orange-100",
    text: {
      main: "text-orange-900",
      count: "text-orange-700",
    },
    progress: {
      bg: "bg-orange-100",
      indicator: "bg-orange-700",
    },
    icon: "/icons/dollar.svg",
  },
  Healthcare: {
    bg: "bg-teal-50",
    circleBg: "bg-teal-100",
    text: {
      main: "text-teal-900",
      count: "text-teal-700",
    },
    progress: {
      bg: "bg-teal-100",
      indicator: "bg-teal-700",
    },
    icon: "/icons/fresh-fv.svg",
  },
  Community: {
    bg: "bg-indigo-50",
    circleBg: "bg-indigo-100",
    text: {
      main: "text-indigo-900",
      count: "text-indigo-700",
    },
    progress: {
      bg: "bg-indigo-100",
      indicator: "bg-indigo-700",
    },
    icon: "/icons/home.svg",
  },
  default: {
    bg: "bg-gray-25",
    circleBg: "bg-gray-200",
    text: {
      main: "text-gray-900",
      count: "text-gray-700",
    },
    progress: {
      bg: "bg-gray-200",
      indicator: "bg-gray-700",
    },
    icon: "/icons/shopping-bag.svg",
  },
};

export const transactionCategoryStyles = {
  "Food and Drink": {
    borderColor: "border-pink-600",
    backgroundColor: "bg-pink-500",
    textColor: "text-pink-700",
    chipBackgroundColor: "bg-inherit",
  },
  Payment: {
    borderColor: "border-success-600",
    backgroundColor: "bg-green-600",
    textColor: "text-success-700",
    chipBackgroundColor: "bg-inherit",
  },
  "Bank Fees": {
    borderColor: "border-success-600",
    backgroundColor: "bg-green-600",
    textColor: "text-success-700",
    chipBackgroundColor: "bg-inherit",
  },
  Transfer: {
    borderColor: "border-red-700",
    backgroundColor: "bg-red-700",
    textColor: "text-red-700",
    chipBackgroundColor: "bg-inherit",
  },
  Processing: {
    borderColor: "border-[#F2F4F7]",
    backgroundColor: "bg-gray-500",
    textColor: "text-[#344054]",
    chipBackgroundColor: "bg-[#F2F4F7]",
  },
  Success: {
    borderColor: "border-[#12B76A]",
    backgroundColor: "bg-[#12B76A]",
    textColor: "text-[#027A48]",
    chipBackgroundColor: "bg-[#ECFDF3]",
  },
  default: {
    borderColor: "",
    backgroundColor: "bg-blue-500",
    textColor: "text-blue-700",
    chipBackgroundColor: "bg-inherit",
  },
};
