import {
  LuBadgeCheck,
  LuBookmark,
  LuLayoutDashboard,
  LuLogOut,
  LuPenTool,
  LuVote,
  LuUserPlus,
  LuSettings2,
  LuChartBar,
} from "react-icons/lu";
import { MdOutlineReportProblem } from "react-icons/md";
import { CiCircleMore } from "react-icons/ci";
export const SIDE_MENU_DATA = [
  {
    id: "01",
    label: "Dashboard",
    icon: LuLayoutDashboard,
    path: "/dashboard",
  },
  {
    id: "02",
    label: "Create Poll",
    icon: LuVote,
    path: "/create-poll",
  },
  {
    id: "04",
    label: "Add User",
    icon: LuUserPlus,
    path: "/add-user",
  },
  {
    id: "04",
    label: "User Control",
    icon: LuSettings2,
    path: "/user-control",
  },
  {
    id: "05",
    label: "Report",
    icon: MdOutlineReportProblem,
    path: "/report",
  },
  {
    id: "06",
    label: "Analytics",
    icon: LuChartBar,
    path: "/analytics",
  },
  {
    id: "07",
    label: "More",
    icon: CiCircleMore,
    path: "/more",
  },
  {
    id: "08",
    label: "Logout",
    icon: LuLogOut,
    path: "logout",
  },
];

export const POLL_TYPE = [
  { id: "01", label: "Yes/No", value: "yes/no" },
  { id: "02", label: "Single Choice", value: "single-choice" },
  { id: "03", label: "Rating", value: "rating" },
  { id: "04", label: "Image Based", value: "image-based" },
  { id: "05", label: "Open Ended", value: "open-ended" },
];
