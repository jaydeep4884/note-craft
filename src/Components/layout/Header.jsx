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
import {
  Menu as MenuIcon,
  AppsRounded as AppsRoundedIcon,
  RefreshRounded as RefreshRoundedIcon,
  Search as SearchIcon,
} from "@mui/icons-material";
import {
  LightbulbOutlined,
  NotificationsNoneOutlined,
  EditOutlined,
  ArchiveOutlined,
  DeleteOutlineOutlined,
} from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import { Input } from "antd";
import Brand from "../assets/brand.png";
import ProfileMenu from "../ui/ProfileMenu";
import { AnimatePresence, motion } from "framer-motion";

const drawerWidth = 240;

const navItems = [
  { text: "Notes", icon: <LightbulbOutlined />, path: "/notes" },
  {
    text: "Reminders",
    icon: <NotificationsNoneOutlined />,
    path: "/reminders",
  },
  { text: "Edit labels", icon: <EditOutlined />, path: "/labels" },
  { text: "Archive", icon: <ArchiveOutlined />, path: "/archive" },
  { text: "Trash", icon: <DeleteOutlineOutlined />, path: "/trash" },
];

export default function Header({ children }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchVisible, setSearchVisible] = useState(false);
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("sm"));
  // const navigate = useNavigate();

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  const drawer = (
    <Box className="pt-3  w-full">
      {/* === Brand/Header Section === */}
      <Box className="sm:mb-12 mb-6"></Box>

      {/* === Navigation Links === */}
      <List className="space-y-1">
        {navItems.map(({ text, icon, path }) => (
          <ListItem
            key={text}
            disablePadding
            component={Link}
            to={path}
            onClick={!isDesktop ? handleDrawerToggle : undefined}
            className="no-underline text-inherit"
          >
            <ListItemButton className="rounded-md px-3 py-2 hover:bg-gray-100 group transition-all">
              <ListItemIcon className="text-gray-600 min-w-[36px]">
                {icon}
              </ListItemIcon>
              <ListItemText
                primary={text}
                primaryTypographyProps={{
                  className:
                    "text-sm text-gray-800 font-medium group-hover:text-black",
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box className="flex">
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          backgroundColor: "white",
          color: "black",
          borderBottom: "1px solid #ddd",
          boxShadow: "none",
        }}
        className={isDesktop ? "sm:ml-[240px] sm:w-[calc(100%-240px)]" : ""}
      >
        <Toolbar className="w-full px-4 sm:px-6">
          <Box className="flex justify-between items-center w-full gap-4">
            {/* Left: Logo + Menu Toggle for mobile */}
            <Box className="flex items-center gap-2">
              {!isDesktop && (
                <IconButton edge="start" onClick={handleDrawerToggle}>
                  <MenuIcon fontSize="small" />
                </IconButton>
              )}
              <img src={Brand} alt="Logo" className="h-8 w-auto" />
              <Typography className="text-lg sm:text-xl text-[#5f6368] font-medium hidden sm:inline">
                NoteCraft
              </Typography>
            </Box>

            {/* Center: Search bar on desktop */}
            {isDesktop && (
              <Box className="flex-1 mx-6 max-w-2xl w-full">
                <Input
                  prefix={<SearchIcon className="text-gray-500" />}
                  placeholder="Search"
                  size="large"
                  className="w-full bg-gray-100 rounded-full px-3"
                  style={{ border: "none" }}
                />
              </Box>
            )}

            {/* Right: Action Icons (both mobile and desktop) */}
            <Box className="flex items-center gap-2">
              {!isDesktop && (
                <IconButton onClick={() => setSearchVisible(true)}>
                  <SearchIcon fontSize="small" />
                </IconButton>
              )}
              <IconButton onClick={() => window.location.reload()}>
                <RefreshRoundedIcon fontSize="small" />
              </IconButton>
              <IconButton>
                <AppsRoundedIcon fontSize="small" />
              </IconButton>
              <ProfileMenu small={true} />
            </Box>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Drawer */}
      <Box component="nav">
        <Drawer
          variant={isDesktop ? "permanent" : "temporary"}
          open={isDesktop || mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          PaperProps={{
            className: `w-[240px] box-border border-r border-gray-200 sm:pl-4 pl-0 bg-white ${
              !isDesktop ? "pt-5" : ""
            }`,
          }}
        >
          {drawer}
        </Drawer>
      </Box>

      {/* Main Content */}
      <Box
        component="main"
        className="flex-grow bg-gray-100 text-black"
        sx={{ width: isDesktop ? `calc(100% - ${drawerWidth}px)` : "100%" }}
      >
        <Toolbar />
        {children}
      </Box>

      {/* Animated Search Modal */}
      <AnimatePresence>
        {searchVisible && (
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[1300] flex items-start justify-center p-4"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.3 }}
            onClick={() => setSearchVisible(false)}
          >
            <motion.div
              className="bg-white rounded-lg p-4 w-full max-w-lg shadow-lg"
              onClick={(e) => e.stopPropagation()}
            >
              <Input.Search
                placeholder="Search..."
                size="large"
                className="w-full"
                autoFocus
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Box>
  );
}
