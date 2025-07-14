import React, { useState } from "react";
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
  useMediaQuery,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CategoryIcon from "@mui/icons-material/Category";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import SpaceDashboardIcon from "@mui/icons-material/SpaceDashboard";
import ControlPointDuplicateIcon from "@mui/icons-material/ControlPointDuplicate";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import SettingsIcon from "@mui/icons-material/Settings";
import Brand from '../assets/brand.png'

const drawerWidth = 240;

const navItems = [
  { text: "Dashboard", icon: <SpaceDashboardIcon />, path: "/Dashboard" },
  { text: "Category", icon: <CategoryIcon />, path: "/Category" },
  { text: "Sub Category", icon: <ControlPointDuplicateIcon />, path: "/Sub" },
  { text: "Q & A", icon: <HelpOutlineIcon />, path: "/Queue" },
];

export default function Header({ children }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("sm"));

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("");
    navigate("/");
  };

  const drawer = (
    <div>
      <List className="!pt-5">
        <ListItem>
          <ListItemText
            primary="Note Craft"
            className="text-2xl font-poppins"
          />
        </ListItem>
        {navItems.map((item) => (
          <ListItem
            key={item.text}
            disablePadding
            component={Link}
            to={item.path}
            onClick={!isDesktop ? handleDrawerToggle : undefined}
            className="no-underline text-inherit"
          >
            <ListItemButton>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <Box className="flex ">
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          backgroundColor: "white",
          color: "black",
          boxShadow: "None",
          borderBottom: "1px solid #ddd",
        }}
        className={isDesktop ? "sm:ml-[240px] sm:w-[calc(100%-240px)]" : ""}
      >
        <Toolbar>
          {!isDesktop && (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              className="mr-2"
            >
              <MenuIcon />
            </IconButton>
          )}
          <Box className="flex !justify-between gap-2 w-full">
            <Box className="flex items-center">
              <img src={Brand} className="h-[35px] w-auto object-contain" alt="Logo" />
              <Typography noWrap className="!text-[22px] flex-grow">
                NoteCraft
              </Typography>
            </Box>
            {/* <Typography variant="h6" noWrap className="flex-grow">
            Dashboard {location.pathname}
          </Typography> */}
            <Box>
              <IconButton onClick={handleLogout} color="inherit">
                <SettingsIcon />
              </IconButton>
              <IconButton onClick={handleLogout} color="inherit">
                <MeetingRoomIcon />
              </IconButton>
              <IconButton onClick={handleLogout} color="inherit">
                <MeetingRoomIcon />
              </IconButton>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Drawer section */}
      <Box component="nav" aria-label="sidebar">
        {isDesktop ? (
          // Permanent drawer on desktop
          <Drawer
            variant="permanent"
            open
            sx={{
              width: drawerWidth,
              flexShrink: 0,
              [`& .MuiDrawer-paper`]: {
                width: drawerWidth,
                boxSizing: "border-box",
              },
            }}
          >
            {drawer}
          </Drawer>
        ) : (
          // Temporary drawer on mobile
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{ keepMounted: true }}
            PaperProps={{
              className: "box-border w-[240px]",
            }}
          >
            {drawer}
          </Drawer>
        )}
      </Box>

      {/* Main content */}
      <Box
        component="main"
        className="flex-grow !bg-gray-100 "
        sx={{
          width: isDesktop ? `calc(100% - ${drawerWidth}px)` : "100%",
        }}
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
}
