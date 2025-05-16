import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { createTheme } from "@mui/material/styles";
import { AppProvider } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { useNavigate, useLocation, Routes, Route } from "react-router-dom";

import TipsIcon from "@mui/icons-material/TipsAndUpdatesOutlined";
import NotificationsIcon from "@mui/icons-material/NotificationsActiveOutlined";
import EditIcon from "@mui/icons-material/EditOutlined";
import ArchiveIcon from "@mui/icons-material/ArchiveOutlined";
import DeleteIcon from "@mui/icons-material/DeleteSweepOutlined";

// Content component
function DemoPageContent({ title }) {
  return (
    <Box className="p-4 flex flex-col items-center text-center">
      <Typography variant="h6">{title}</Typography>
    </Box>
  );
}

function Dashboard() {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { segment: "notes", title: "Notes", icon: <TipsIcon /> },
    { segment: "reminder", title: "Reminder", icon: <NotificationsIcon /> },
    { segment: "edit-label", title: "Edit Label", icon: <EditIcon /> },
    { segment: "archived", title: "Archived", icon: <ArchiveIcon /> },
    { segment: "trash", title: "Trash", icon: <DeleteIcon /> },
  ];

  const navigation = navItems.map((item) => ({
    ...item,
    onClick: () => navigate(`/${item.segment}`),
    className:
      location.pathname === `/${item.segment}`
        ? "bg-[#FEEFC3] text-black"
        : "hover:bg-gray-100",
  }));

  return (
    <AppProvider navigation={navigation} theme={demoTheme}>
      <DashboardLayout>
        <Routes>
          {navItems.map((item) => (
            <Route
              key={item.segment}
              path={item.segment}
              element={<DemoPageContent title={item.title} />}
            />
          ))}
        </Routes>
      </DashboardLayout>
    </AppProvider>
  );
}

export default Dashboard;

// Theme setup
const demoTheme = createTheme({
  cssVariables: {
    colorSchemeSelector: "data-toolpad-color-scheme",
  },
  colorSchemes: { light: true, dark: true },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
});
