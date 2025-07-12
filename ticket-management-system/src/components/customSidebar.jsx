import {
  CarryOutOutlined,
  DashboardOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  TeamOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, Typography } from "antd";
import { Content, Header } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import { useState } from "react";
import { useNavigate } from "react-router";

const CustomSidebar = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  return (
    <Layout>
      <Sider collapsible collapsed={collapsed}>
        {/* <div className="demo-logo-vertical" /> */}
        <Typography.Title color="#fff" type="success">
          TMS
        </Typography.Title>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={[
            {
              key: "4",
              icon: <DashboardOutlined />,
              label: "Dashboard",
              onClick: () => {
                navigate("/dashboard");
              },
            },
            {
              key: "1",
              icon: <UserOutlined />,
              label: "User",
              onClick: () => {
                navigate("/user");
              },
            },
            {
              key: "2",
              icon: <CarryOutOutlined />,
              label: "Ticket",
              onClick: () => {
                navigate("/ticket");
              },
            },
            {
              key: "3",
              icon: <TeamOutlined />,
              label: "Organization",
              onClick: () => {
                navigate("/organization");
              },
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, backgroundColor: "#fff", height: "80px" }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            backgroundColor: "grey",
            height: `calc(100vh - 130px)`,
            // minHeight: 280,
            // height: "100vh",
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default CustomSidebar;
