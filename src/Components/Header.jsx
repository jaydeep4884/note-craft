import * as React from "react";
import {
  AppBar,
  Box,
  CssBaseline,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import {
  SpaceDashboard as DashboardIcon,
  Category as CategoryIcon,
  ControlPointDuplicate as SubCategoryIcon,
  HelpOutline as HelpIcon,
  MeetingRoom as MeetingRoomIcon,
} from "@mui/icons-material";
import { Link, useLocation, useNavigate } from "react-router-dom";

const navItems = [
  { text: "Dashboard", icon: <DashboardIcon />, path: "/Dashboard" },
  { text: "Category", icon: <CategoryIcon />, path: "/Category" },
  { text: "Sub Category", icon: <SubCategoryIcon />, path: "/Sub" },
  { text: "Q & A", icon: <HelpIcon />, path: "/Queue" },
];

const Header = ({ children }) => {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const drawer = (
    <List className="pt-0">
      <ListItem className="text-black p-5">
        <ListItemText
          primary="Interview Portal"
          className="!text-black !font-bold"
        />
      </ListItem>
      {navItems.map(({ text, icon, path }) => (
        <ListItem
          key={text}
          disablePadding
          component={Link}
          to={path}
          className={`no-underline text-inherit ${
            location.pathname === path ? "!bg-gray-200" : ""
          }`}
          onClick={handleDrawerToggle}
        >
          <ListItemButton>
            <ListItemIcon>{icon}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );

  return (
    <Box className="flex">
      <CssBaseline />
      <AppBar
        position="fixed"
        className="w-[calc(100%-240px)] !ml-[240px] !bg-white !text-black !shadow-md"
      >
        <Toolbar className="flex justify-between">
          <Typography variant="h6" className="text-black font-semibold">
            Interview Portal -{" "}
            {location.pathname === "/"
              ? "Dashboard"
              : location.pathname.replace("/", "")}
          </Typography>
          <IconButton color="inherit" onClick={handleLogout}>
            <MeetingRoomIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Box component="nav" className="w-[240px] flex-shrink-0">
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          className="block sm:hidden [&_.MuiDrawer-paper]:w-[240px]"
        >
          {drawer}
        </Drawer>

        <Drawer
          variant="permanent"
          className="hidden sm:block [&_.MuiDrawer-paper]:w-[240px]"
          open
        >
          {drawer}
        </Drawer>
      </Box>

      <Box
        component="main"
        className="flex-grow bg-gray-100 p-5 w-[calc(100%-240px)]"
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
};

export default Header;
