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
  Menu as MenuIcon,
  MeetingRoom as MeetingRoomIcon,
} from "@mui/icons-material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "@fontsource/roboto/700.css";

const drawerWidth = 240;

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

  // Toggle mobile drawer
  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  // Handle Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  // Drawer Component
  const drawer = (
    <List sx={{ paddingTop: 0 }}>
      <ListItem sx={{ backgroundColor: "#2F3C7E", padding: 2 }}>
        <ListItemText
          primary="Interview Portal"
          sx={{ color: "white", fontWeight: "bold" }}
        />
      </ListItem>
      {navItems.map(({ text, icon, path }) => (
        <ListItem
          key={text}
          disablePadding
          component={Link}
          to={path}
          sx={{ textDecoration: "none", color: "inherit" }}
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
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          backgroundColor: "#2F3C7E",
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Dashboard {location.pathname}
          </Typography>
          <IconButton color="inherit" onClick={handleLogout}>
            <MeetingRoomIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      >
        {/* Mobile Drawer */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>

        {/* Permanent Drawer */}
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: "background.default",
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
};

export default Header;
