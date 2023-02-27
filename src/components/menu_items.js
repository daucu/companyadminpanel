// icons
import ElectricalServicesTwoToneIcon from "@mui/icons-material/ElectricalServicesTwoTone";
import StarBorderPurple500TwoToneIcon from "@mui/icons-material/StarBorderPurple500TwoTone";
import AccountBalanceTwoToneIcon from "@mui/icons-material/AccountBalanceTwoTone";
import ShowChartTwoToneIcon from "@mui/icons-material/ShowChartTwoTone";
import PhonelinkSetupTwoToneIcon from "@mui/icons-material/PhonelinkSetupTwoTone";
import AddCardTwoToneIcon from "@mui/icons-material/AddCardTwoTone";
import PriceChangeIcon from "@mui/icons-material/PriceChange";
import SearchIcon from '@mui/icons-material/Search';
import {
  AccountCircleOutlined,
  ContactPhoneOutlined,
  DashboardOutlined,
  FaceRetouchingOffOutlined,
  GavelOutlined,
  HandshakeOutlined,
  Inventory2Outlined,
  LoyaltyOutlined,
  PermMediaOutlined,
  ProductionQuantityLimitsOutlined,
  SdCardOutlined,
  SettingsOutlined,
  TipsAndUpdatesOutlined,
  WalletOutlined,
  WorkOutlineOutlined,
} from "@mui/icons-material";

const menu_items = [
  {
    name:
      localStorage.getItem("language") === "arabic"
        ? "لوحة القيادة"
        : "Dashboard",
    icon: <AccountCircleOutlined />,
    url: "/admin/profile",
  },
  {
    name: localStorage.getItem("language") === "arabic" ? "العلامات" : "Tags",
    icon: <LoyaltyOutlined />,
    url: "/admin/tags",
  },
  // {
  //   name: localStorage.getItem("language") === "arabic" ? "عمل" : "Search",
  //   header: true,
  // },
  // {
  //   name: localStorage.getItem("language") === "arabic" ? "منتجات" : "Search Here",
  //   icon: <SearchIcon />,
  //   url: "/admin/products",
  // },
  {
    name: localStorage.getItem("language") === "arabic" ? "عمل" : "Work",
    header: true,
  },
  {
    name: localStorage.getItem("language") === "arabic" ? "منتجات" : "Products",
    icon: <Inventory2Outlined />,
    url: "/admin/products",
  },
  {
    name:
      localStorage.getItem("language") === "arabic"
        ? "أضف المنتجات"
        : "Add Products",
    icon: <AddCardTwoToneIcon />,
    url: "/admin/new-product",
  },

  {
    name: localStorage.getItem("language") === "arabic" ? "خدمات" : "Services",
    icon: <ElectricalServicesTwoToneIcon />,
    url: "/admin/pservices",
  },
  {
    name: localStorage.getItem("language") === "arabic" ? "عقد" : "Contract",
    icon: <ContactPhoneOutlined />,
    url: "/admin/contract",
  },
  {
    name: localStorage.getItem("language") === "arabic" ? "وسائط" : "Media",
    icon: <PermMediaOutlined />,
    url: "/admin/viewmedia",
  },

  {
    name:
      localStorage.getItem("language") === "arabic" ? "المزادات" : "Auctions",
    header: true,
  },
  {
    name:
      localStorage.getItem("language") === "arabic" ? "مزاد علني" : "Auction",
    icon: <GavelOutlined />,
    url: "/admin/auctions",
  },
  {
    name: localStorage.getItem("language") === "arabic" ? "مُنَاقَصَة" : "Bid",
    icon: <PriceChangeIcon />,
    url: "/admin/bids",
  },
  {
    name: localStorage.getItem("language") === "arabic" ? "تقرير" : "Report",
    header: true,
  },
  {
    name:
      localStorage.getItem("language") === "arabic"
        ? "لوحة القيادة"
        : "Dashboard",
    icon: <DashboardOutlined />,
    url: "/admin",
  },
  {
    name: localStorage.getItem("language") === "arabic" ? "صفقات" : "Deals",
    icon: <TipsAndUpdatesOutlined />,
    url: "/admin/deals",
  },

  {
    name: localStorage.getItem("language") === "arabic" ? "عروض" : "Offers",
    icon: <StarBorderPurple500TwoToneIcon />,
    url: "/admin/offer",
  },
  {
    name: localStorage.getItem("language") === "arabic" ? "محفظة" : "Wallet",
    header: true,
  },
  {
    name: localStorage.getItem("language") === "arabic" ? "محافظ" : "Wallets",
    icon: <WalletOutlined />,
    url: "/admin/wallets",
  },
  {
    name:
      localStorage.getItem("language") === "arabic"
        ? "حسابات بنكية"
        : "Bank Accounts",
    icon: <AccountBalanceTwoToneIcon />,
    url: "/admin/bankaccounts",
  },
  {
    name:
      localStorage.getItem("language") === "arabic"
        ? "نقاط الولاء"
        : "Loyality Points",
    header: true,
  },
  {
    name: localStorage.getItem("language") === "arabic" ? "نقاط" : "Points",
    icon: <HandshakeOutlined />,
    url: "/admin/loyalitypoints",
  },
  {
    name: localStorage.getItem("language") === "arabic" ? "إعلانات" : "Ads",
    icon: <FaceRetouchingOffOutlined />,
    url: "/admin/ads",
  },
  {
    name: localStorage.getItem("language") === "arabic" ? "آحرون" : "Others",
    header: true,
  },
  {
    name: localStorage.getItem("language") === "arabic" ? "التجار" : "Traders",
    icon: <ShowChartTwoToneIcon />,
    url: "/admin/traders",
  },
  {
    name: localStorage.getItem("language") === "arabic" ? "وظائف" : "Jobs",
    icon: <WorkOutlineOutlined />,
    url: "/admin/jobs",
  },
  {
    name:
      localStorage.getItem("language") === "arabic" ? "شكاوي" : "Complaints",
    icon: <SdCardOutlined />,
    url: "/admin/complaints",
  },
  {
    name:
      localStorage.getItem("language") === "arabic"
        ? "إعداد روبوت الدردشة"
        : "ChatBot Settings",
    icon: <PhonelinkSetupTwoToneIcon />,
    url: "/admin/chatbotservice",
  },
  {
    name:
      localStorage.getItem("language") === "arabic" ? "إعدادات" : "Settings",
    icon: <SettingsOutlined />,
    url: "/admin/settings",
  },
];
// const menu_items = [
//   {
//     name: "Dashboard",
//     icon: <AccountCircleOutlined />,
//     url: "/admin/profile",
//     arabic:  "لوحة القيادة",
//     english: "Dashboard",
//     hindi: "डैशबोर्ड"
//   },
//   // {
//   //   name: localStorage.getItem("language") === "arabic" ? "العلامات" : "Tags",
//   //   icon: <LoyaltyOutlined />,
//   //   url: "/admin/tags",
//   // },
//   // {
//   //   name: localStorage.getItem("language") === "arabic" ? "عمل" : "Work",
//   //   header: true,
//   // },
//   // {
//   //   name: localStorage.getItem("language") === "arabic" ? "منتجات" : "Products",
//   //   icon: <Inventory2Outlined />,
//   //   url: "/admin/products",
//   // },
//   // {
//   //   name:  localStorage.getItem("language") === "arabic" ? "أضف المنتجات" : "Add Products",
//   //   icon: <AddCardTwoToneIcon />,
//   //   url: "/admin/new-product",
//   // },

//   // {
//   //   name:  localStorage.getItem("language") === "arabic" ? "خدمات" : "Services",
//   //   icon: <ElectricalServicesTwoToneIcon />,
//   //   url: "/admin/pservices",
//   // },
//   // {
//   //   name:  localStorage.getItem("language") === "arabic" ? "عقد" : "Contract",
//   //   icon: <ContactPhoneOutlined />,
//   //   url: "/admin/contract",
//   // },
//   // {
//   //   name:  localStorage.getItem("language") === "arabic" ? "وسائط" : "Media",
//   //   icon: <PermMediaOutlined />,
//   //   url: "/admin/viewmedia",
//   // },

//   // {
//   //   name:  localStorage.getItem("language") === "arabic" ? "المزادات" : "Auctions",
//   //   header: true,
//   // },
//   // {
//   //   name: localStorage.getItem("language") === "arabic" ? "مزاد علني" : "Auction",
//   //   icon: <GavelOutlined />,
//   //   url: "/admin/auctions",
//   // },
//   // {
//   //   name:  localStorage.getItem("language") === "arabic" ? "مُنَاقَصَة" : "Bid",
//   //   icon: <PriceChangeIcon />,
//   //   url: "/admin/bids",
//   // },
//   // {
//   //   name:  localStorage.getItem("language") === "arabic" ? "تقرير" : "Report",
//   //   header: true,
//   // },
//   // {
//   //   name:  localStorage.getItem("language") === "arabic" ? "لوحة القيادة" : "Dashboard",
//   //   icon: <DashboardOutlined />,
//   //   url: "/admin",
//   // },
//   // {
//   //   name:  localStorage.getItem("language") === "arabic" ? "صفقات" : "Users",
//   //   icon: <TipsAndUpdatesOutlined />,
//   //   url: "/admin/deals",
//   // },

//   // {
//   //   name:  localStorage.getItem("language") === "arabic" ? "عروض" : "Users",
//   //   icon: <StarBorderPurple500TwoToneIcon />,
//   //   url: "/admin/offer",
//   // },
//   // {
//   //   name:  localStorage.getItem("language") === "arabic" ? "محفظة" : "Wallet",
//   //   header: true,
//   // },
//   // {
//   //   name:  localStorage.getItem("language") === "arabic" ? "محافظ" : "Users",
//   //   icon: <WalletOutlined />,
//   //   url: "/admin/wallets",
//   // },
//   // {
//   //   name:   localStorage.getItem("language") === "arabic" ? "حسابات بنكية" : "Bank Accounts",
//   //   icon: <AccountBalanceTwoToneIcon />,
//   //   url: "/admin/bankaccounts",
//   // },
//   // {
//   //   name:  localStorage.getItem("language") === "arabic" ? "نقاط الولاء" : "Loyality Points",
//   //   header: true,
//   // },
//   // {
//   //   name:  localStorage.getItem("language") === "arabic" ? "نقاط" : "Points",
//   //   icon: <HandshakeOutlined />,
//   //   url: "/admin/loyalitypoints",
//   // },
//   // {
//   //   name:  localStorage.getItem("language") === "arabic" ? "إعلانات" : "Ads",
//   //   icon: <FaceRetouchingOffOutlined />,
//   //   url: "/admin/ads",
//   // },
//   // {
//   //   name:  localStorage.getItem("language") === "arabic" ? "آحرون" : "Others",
//   //   header: true,
//   // },
//   // {
//   //   name:  localStorage.getItem("language") === "arabic" ? "التجار" : "Traders",
//   //   icon: <ShowChartTwoToneIcon />,
//   //   url: "/admin/traders",
//   // },
//   // {
//   //   name:  localStorage.getItem("language") === "arabic" ? "وظائف" : "Jobs",
//   //   icon: <WorkOutlineOutlined />,
//   //   url: "/admin/jobs",
//   // },
//   // {
//   //   name:  localStorage.getItem("language") === "arabic" ? "شكاوي" : "Complaints",
//   //   icon: <SdCardOutlined />,
//   //   url: "/admin/complaints",
//   // },
//   // {
//   //   name:  localStorage.getItem("language") === "arabic" ? "إعداد روبوت الدردشة" : "ChatBot Settings",
//   //   icon: <PhonelinkSetupTwoToneIcon />,
//   //   url: "/admin/chatbotservice",
//   // },
//   {
//     name: "Settings",
//     icon: <SettingsOutlined />,
//     url: "/admin/settings",
//     arabic: "إعدادات",
//     english: "Settings",
//     hindi: "सेटिंग्स",
//   },
// ];

export default menu_items;
