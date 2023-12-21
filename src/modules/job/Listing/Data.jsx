import React from "react";

import { Avatar, List, Space, Menu, Layout, theme } from "antd";
import {
  LikeOutlined,
  MessageOutlined,
  StarOutlined,
  UserOutlined,
  LaptopOutlined,
  NotificationOutlined,
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { Content } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";

const data = Array.from({
  length: 23,
}).map((_, i) => ({
  href: "https://ant.design",
  title: `ant design part ${i}`,
  avatar: `https://xsgames.co/randomusers/avatar.php?g=pixel&key=${i}`,
  description:
    "Ant Design, a design language for background applications, is refined by Ant UED Team.",
  content:
    "We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.",
}));

const IconText = ({ icon, text }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);

const items2 = [UserOutlined, LaptopOutlined, NotificationOutlined].map(
  (icon, index) => {
    const key = String(index + 1);

    return {
      key: `sub${key}`,
      icon: React.createElement(icon),
      label: `subnav ${key}`,

      children: new Array(4).fill(null).map((_, j) => {
        const subKey = index * 4 + j + 1;
        return {
          key: subKey,
          label: `option${subKey}`,
        };
      }),
    };
  }
);

const ListingData = () => {
  // const [filter, setFilter] = useState({});

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  // const handleFilterClick = (filterType) => {
  //   setFilter(filterType);
  // };

  const iconStyle = {
    fontSize: "22px",
    color: "#1e5fd6",
    background: "#f0f0f0",
    padding: "8px",
    borderRadius: "4px",
    margin: "8px",
  };

  return (
    <div>
      <Content style={{ padding: "0 0" }}>
        <Layout style={{ padding: "24px 0", background: colorBgContainer }}>
          <Sider style={{ background: colorBgContainer }} width={200}>
            <Menu mode="inline" style={{ height: "100%" }} items={items2} />
          </Sider>
          <Content style={{ padding: "0 24px", minHeight: 280 }}>
            <List
              itemLayout="vertical"
              size="small"
              pagination={{
                onChange: (page) => {
                  console.log(page);
                },
                pageSize: 5,
              }}
              dataSource={data}
              renderItem={(item) => (
                <List.Item
                  key={item.title}
                  actions={[
                    <IconText
                      icon={StarOutlined}
                      text="156"
                      key="list-vertical-star-o"
                    />,
                    <IconText
                      icon={LikeOutlined}
                      text="156"
                      key="list-vertical-like-o"
                    />,
                    <IconText
                      icon={MessageOutlined}
                      text="2"
                      key="list-vertical-message"
                    />,
                  ]}
                  extra={
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      <EyeOutlined style={iconStyle} />
                      <EditOutlined style={iconStyle} />
                      <DeleteOutlined style={iconStyle} />
                    </div>
                  }
                >
                  <List.Item.Meta
                    avatar={<Avatar src={item.avatar} />}
                    title={<a href={item.href}>{item.title}</a>}
                    description={item.description}
                  />
                  {item.content}
                </List.Item>
              )}
            />
          </Content>
        </Layout>
      </Content>
    </div>
  );
};

export default ListingData;
