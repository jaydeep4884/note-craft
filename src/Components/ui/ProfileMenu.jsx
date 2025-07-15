import { Avatar, Dropdown } from "antd";
import {
  UserOutlined,
  LogoutOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Link, useNavigate } from "react-router";
import React from "react";

const ProfileMenu = ({ small = false }) => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const items = [
    {
      key: "profile",
      icon: <UserOutlined />,
      label: <Link to="/profile">Profile</Link>,
    },
    {
      key: "settings",
      icon: <SettingOutlined />,
      label: <Link to="/settings">Settings</Link>,
    },
    { type: "divider" },
    {
      key: "logout",
      icon: <LogoutOutlined />,
      danger: true,
      label: <span onClick={handleLogout}>Logout</span>,
    },
  ];

  return (
    <Dropdown menu={{ items }} trigger={["click"]}>
      <Avatar
        className="cursor-pointer"
        size={small ? 32 : 40}
        icon={<UserOutlined />}
        src="https://api.dicebear.com/7.x/miniavs/svg?seed=1"
      />
    </Dropdown>
  );
};

export default ProfileMenu;
