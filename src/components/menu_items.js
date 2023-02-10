// icons

import SdStorageTwoToneIcon from "@mui/icons-material/SdStorageTwoTone";

import AccountBoxIcon from "@mui/icons-material/AccountBox";
import ElectricalServicesTwoToneIcon from "@mui/icons-material/ElectricalServicesTwoTone";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import LoyaltyTwoToneIcon from "@mui/icons-material/LoyaltyTwoTone";
import AddBusinessTwoToneIcon from "@mui/icons-material/AddBusinessTwoTone";
import ContactPhoneTwoToneIcon from "@mui/icons-material/ContactPhoneTwoTone";
import PermMediaTwoToneIcon from "@mui/icons-material/PermMediaTwoTone";
import GavelTwoToneIcon from "@mui/icons-material/GavelTwoTone";
import DashboardTwoToneIcon from "@mui/icons-material/DashboardTwoTone";
import TipsAndUpdatesTwoToneIcon from "@mui/icons-material/TipsAndUpdatesTwoTone";
import StarBorderPurple500TwoToneIcon from "@mui/icons-material/StarBorderPurple500TwoTone";
import WalletTwoToneIcon from "@mui/icons-material/WalletTwoTone";
import AccountBalanceTwoToneIcon from "@mui/icons-material/AccountBalanceTwoTone";
import HandshakeTwoToneIcon from "@mui/icons-material/HandshakeTwoTone";
import FeaturedVideoTwoToneIcon from "@mui/icons-material/FeaturedVideoTwoTone";
import ShowChartTwoToneIcon from "@mui/icons-material/ShowChartTwoTone";
import PhonelinkSetupTwoToneIcon from "@mui/icons-material/PhonelinkSetupTwoTone";
import WorkTwoToneIcon from "@mui/icons-material/WorkTwoTone";
import SettingsSuggestTwoToneIcon from "@mui/icons-material/SettingsSuggestTwoTone";
import AddCardTwoToneIcon from "@mui/icons-material/AddCardTwoTone";
const menu_items = [
  {
    name: "Profile",
    icon: <AccountBoxIcon />,
    url: "/admin/profile",
  },
  {
    name: "Tags",
    icon: <LoyaltyTwoToneIcon />,
    url: "/admin/tags",
  },
  {
    name: "Work",
    header: true,
  },
  {
    name: "Products",
    icon: <AddBusinessTwoToneIcon />,
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
    icon: <ContactPhoneTwoToneIcon />,
    url: "/admin/contract",
  },
  {
    name: "Media",
    icon: <PermMediaTwoToneIcon />,
    url: "/admin/viewmedia",
  },

  {
    name: "Auctions",
    header: true,
  },
  {
    name: "Auction",
    icon: <GavelTwoToneIcon />,
    url: "/admin/auctions",
  },
  {
    name: "Report",
    header: true,
  },
  {
    name: "Dashboard",
    icon: <DashboardTwoToneIcon />,
    url: "/admin",
  },
  {
    name: "Deals",
    icon: <TipsAndUpdatesTwoToneIcon />,
    url: "/admin/deals",
  },

  {
    name: "Offers",
    icon: <StarBorderPurple500TwoToneIcon />,
    url: "/admin/offers",
  },
  {
    name: "Wallet",
    header: true,
  },
  {
    name: "Wallets",
    icon: <WalletTwoToneIcon />,
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
    icon: <HandshakeTwoToneIcon />,
    url: "/admin/loyalitypoints",
  },
  {
    name: "Ads",
    icon: <FeaturedVideoTwoToneIcon />,
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
    icon: <WorkTwoToneIcon />,
    url: "/admin/jobs",
  },
  {
    name: "Complaints",
    icon: <SdStorageTwoToneIcon />,
    url: "/admin/compliance",
  },
  {
    name: "ChatBot Settings ",
    icon: <PhonelinkSetupTwoToneIcon />,
    url: "/admin/chatbotservice",
  },
  {
    name: "Settings ",
    icon: <SettingsSuggestTwoToneIcon />,
    url: "/admin/settings",
  },
];

export default menu_items;
