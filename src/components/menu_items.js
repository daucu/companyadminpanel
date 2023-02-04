// icons
import AutoAwesomeMosaicTwoToneIcon from "@mui/icons-material/AutoAwesomeMosaicTwoTone";
import ShoppingCartCheckoutTwoToneIcon from "@mui/icons-material/ShoppingCartCheckoutTwoTone";
import ShoppingBagTwoToneIcon from "@mui/icons-material/ShoppingBagTwoTone";
import CategoryTwoToneIcon from "@mui/icons-material/CategoryTwoTone";
import PeopleTwoToneIcon from "@mui/icons-material/PeopleTwoTone";
import SupportAgentTwoToneIcon from "@mui/icons-material/SupportAgentTwoTone";
import DescriptionTwoToneIcon from "@mui/icons-material/DescriptionTwoTone";
import PostAddTwoToneIcon from "@mui/icons-material/PostAddTwoTone";
import SettingsTwoToneIcon from "@mui/icons-material/SettingsTwoTone";
import CopyAllTwoToneIcon from "@mui/icons-material/CopyAllTwoTone";
import SdStorageTwoToneIcon from "@mui/icons-material/SdStorageTwoTone";
import InfoTwoToneIcon from "@mui/icons-material/InfoTwoTone";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import MiscellaneousServicesIcon from "@mui/icons-material/MiscellaneousServices";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import ApartmentIcon from "@mui/icons-material/Apartment";
import PaymentsIcon from "@mui/icons-material/Payments";
import StyleIcon from "@mui/icons-material/Style";
import ClassIcon from "@mui/icons-material/Class";
import SearchIcon from "@mui/icons-material/Search";
import GridOnIcon from "@mui/icons-material/GridOn";
import CollectionsBookmarkIcon from "@mui/icons-material/CollectionsBookmark";

import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
const menu_items = [
  {
    id: "1",
    name: "Dashboard",
    icon: <AutoAwesomeMosaicTwoToneIcon />,
    url: "/admin",
  },
  {
    id: "2",
    name: "Categories",
    icon: <CategoryTwoToneIcon />,
    url: "/admin/categories",
  },
  // {
  //   id: "3",
  //   name: "Blogs & Posts",
  //   icon: <PostAddTwoToneIcon />,
  //   url: "/admin/posts",
  // },
  {
    id: "3",
    name: "Add Products",
    icon: <PostAddTwoToneIcon />,
    url: "/admin/new-product",
  },
  {
    id: "4",
    name: "View Products",
    icon: <ShoppingBagTwoToneIcon />,
    url: "/admin/products",
  },
  {
    id: "5",
    name: "Auctions & Bids",
    icon: <CopyAllTwoToneIcon />,
    url: "/admin/auctions",
  },

  {
    id: "6",
    name: "Withdraw",
    icon: <AccountBalanceIcon />,
    url: "/admin/withdraw",
  },
  // {
  //   id: "7",
  //   name: "Services Management",
  //   icon: <MiscellaneousServicesIcon />,
  //   url: "/admin/services",
  // },
  // {
  //   id: "8",
  //   name: "Offers Management",
  //   icon: <LocalOfferIcon />,
  //   url: "/admin/offers",
  // },
  // {
  //   id: "9",
  //   name: "Companies Management",
  //   icon: <ApartmentIcon />,
  //   url: "/admin/companies",
  // },
  // {
  //   id: "10",
  //   name: "Commission Management",
  //   icon: <PaymentsIcon />,
  //   url: "/admin/commission",
  // },
  // {
  //   id: "11",
  //   name: "Tags Management",
  //   icon: <StyleIcon />,
  //   url: "/admin/tags",
  // },
  // {
  //   id: "12",
  //   name: "Classifications Management",
  //   icon: <ClassIcon />,
  //   url: "/admin/classifications",
  // },
  // {
  //   id: "13",
  //   name: "Search Management",
  //   icon: <SearchIcon />,
  //   url: "/admin/search",
  // },
  // {
  //   id: "14",
  //   name: "Bids",
  //   icon: <ShoppingCartCheckoutTwoToneIcon />,
  //   url: "/admin/orders",
  // },
  {
    id: "15",
    name: "Upload Files & Media",
    icon: <SdStorageTwoToneIcon />,
    url: "/admin/media",
  },
  {
    id: "16",
    name: "View Files & Media",
    icon: <CollectionsBookmarkIcon />,
    url: "/admin/viewmedia",
  },
  // {
  //   id: "17",
  //   name: "Invoice Management",
  //   icon: <DescriptionTwoToneIcon />,
  //   url: "/admin/invoice",
  // },
  // {
  //   id: "18",
  //   name: "Users & Vendors",
  //   icon: <PeopleTwoToneIcon />,
  //   url: "/admin/users",
  // },
  // {
  //   id: "19",
  //   name: "Settings",
  //   icon: <SettingsTwoToneIcon />,
  //   url: "/admin/settings",
  // },
  // {
  //   id: "20",
  //   name: "System Info",
  //   icon: <InfoTwoToneIcon />,
  //   url: "/admin/info",
  // },
];

export default menu_items;
