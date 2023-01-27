import {
  NotificationAddOutlined,
  Person2Outlined,
  FileOpenOutlined,
} from "@mui/icons-material";

import DocumentationPage from "../pages/MyDocuments";
import MyProfile from "../pages/MyProfile";
import MyNotification from "../pages/MyNotification";

const appRoutes = [
  {
    index: true,
    element: <MyProfile />,
    state: "profile",
  },

  {
    path: "profile",
    element: <MyProfile />,
    state: "profile",
    sidebarProps: {
      displayText: "ProfilePage",
      icon: <Person2Outlined />,
    },
  },
  {
    path: "documentation",
    element: <DocumentationPage />,
    state: "documentation",
    sidebarProps: {
      displayText: "Documentation",
      icon: <FileOpenOutlined />,
    },
  },
  {
    path: "notification",
    element: <MyNotification />,
    state: "notification",
    sidebarProps: {
      displayText: "Notification",
      icon: <NotificationAddOutlined />,
    },
  },
];

export default appRoutes;
