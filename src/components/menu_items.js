// icons
import ElectricalServicesTwoToneIcon from "@mui/icons-material/ElectricalServicesTwoTone";
import StarBorderPurple500TwoToneIcon from "@mui/icons-material/StarBorderPurple500TwoTone";
import AccountBalanceTwoToneIcon from "@mui/icons-material/AccountBalanceTwoTone";
import ShowChartTwoToneIcon from "@mui/icons-material/ShowChartTwoTone";
import PhonelinkSetupTwoToneIcon from "@mui/icons-material/PhonelinkSetupTwoTone";
import AddCardTwoToneIcon from "@mui/icons-material/AddCardTwoTone";
import PriceChangeIcon from '@mui/icons-material/PriceChange';
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
    name: "Profile",
    icon: <AccountCircleOutlined />,
    url: "/admin/profile",
  },
  {
    name: "Tags",
    icon: <LoyaltyOutlined />,
    url: "/admin/tags",
  },
  {
    name: "Work",
    header: true,
  },
  {
    name: "Products",
    icon: <Inventory2Outlined />,
    url: "/admin/products",
  },
  {
    name: "Add Products",
    icon: <AddCardTwoToneIcon />,
    url: "/admin/new-product",
  },

  {
    name: "Services",
    icon: <ElectricalServicesTwoToneIcon />,
    url: "/admin/pservices",
  },
  {
    name: "Contract",
    icon: <ContactPhoneOutlined />,
    url: "/admin/contract",
  },
  {
    name: "Media",
    icon: <PermMediaOutlined />,
    url: "/admin/viewmedia",
  },

  {
    name: "Auctions",
    header: true,
  },
  {
    name: "Auction",
    icon: <GavelOutlined />,
    url: "/admin/auctions",
  },
  {
    name: "Bid",
    icon: <PriceChangeIcon />,
    url: "/admin/bids",
  },
  {
    name: "Report",
    header: true,
  },
  {
    name: "Dashboard",
    icon: <DashboardOutlined />,
    url: "/admin",
  },
  {
    name: "Deals",
    icon: <TipsAndUpdatesOutlined />,
    url: "/admin/deals",
  },

  {
    name: "Offers",
    icon: <StarBorderPurple500TwoToneIcon />,
    url: "/admin/offer",
  },
  {
    name: "Wallet",
    header: true,
  },
  {
    name: "Wallets",
    icon: <WalletOutlined />,
    url: "/admin/wallets",
  },
  {
    name: "Bank Accounts",
    icon: <AccountBalanceTwoToneIcon />,
    url: "/admin/bankaccounts",
  },
  {
    name: "Loyality Points",
    header: true,
  },
  {
    name: "Points",
    icon: <HandshakeOutlined />,
    url: "/admin/loyalitypoints",
  },
  {
    name: "Ads",
    icon: <FaceRetouchingOffOutlined />,
    url: "/admin/ads",
  },
  {
    name: "Others",
    header: true,
  },
  {
    name: "Traders",
    icon: <ShowChartTwoToneIcon />,
    url: "/admin/traders",
  },
  {
    name: "Jobs",
    icon: <WorkOutlineOutlined />,
    url: "/admin/jobs",
  },
  {
    name: "Complaints",
    icon: <SdCardOutlined />,
    url: "/admin/complaints",
  },
  {
    name: "ChatBot Settings ",
    icon: <PhonelinkSetupTwoToneIcon />,
    url: "/admin/chatbotservice",
  },
  {
    name: "Settings ",
    icon: <SettingsOutlined />,
    url: "/admin/settings",
  },
];

export default menu_items;
