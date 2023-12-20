import React from 'react';
import { Card, Typography, Avatar } from 'antd';

const { Title, Text } = Typography;

const JobCard = ({ title, company, salary, postedDate, description, location }) => {
  return (
    <Card
      style={{ width: 300, marginBottom: 16 }}
      cover={<img alt="example" src="https://via.placeholder.com/300" />}
      actions={[
        <Avatar icon type="heart" key="heart" />,
        <Avatar icon type="shopping-cart" key="shopping-cart" />,
      ]}
    >
      <Title level={4} ellipsis={{ rows: 2 }}>
        {title}
      </Title>
      <Text strong>{company}</Text>
      <br />
      <Text strong>Salary: </Text>
      <Text>{salary}</Text>
      <br />
      <Text strong>Posted Date: </Text>
      <Text>{postedDate}</Text>
      <br />
      <Text strong>Description: </Text>
      <Text ellipsis={{ rows: 3 }}>{description}</Text>
      <br />
      <Text strong>Location: </Text>
      <Text>{location}</Text>
    </Card>
  );
};

export default JobCard;
