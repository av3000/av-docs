# Ant Design

Ant Design is a comprehensive design system and UI component library for enterprise-level products, created by Alibaba's Ant Group. It provides a set of high-quality React components that implement the Ant Design language, along with adaptations for Angular, Vue, and other frameworks.

## Overview

Ant Design (often shortened to "antd") was publicly released in 2015 and has since become one of the most popular UI libraries in the React ecosystem. It offers a complete enterprise-focused design system with consistent principles, patterns, and practices.

### Key Features

- **Enterprise-Ready**: Designed for business applications and admin interfaces
- **Complete Component Set**: 60+ high-quality React components
- **Design Consistency**: Follows detailed design principles and specifications
- **Internationalization**: Built-in locale support for dozens of languages
- **Accessible**: WAI-ARIA compliant components
- **Customizable Theming**: Theme customization with Less variables
- **TypeScript Support**: Written in TypeScript with complete type definitions
- **Ecosystem**: Rich ecosystem of extensions and related projects
- **Active Development**: Frequent updates and improvements

## Installation and Setup

### Ant Design for React

```bash
# Using npm
npm install antd

# Using yarn
yarn add antd
```

Basic usage:

```jsx
import React from "react";
import { Button, DatePicker } from "antd";
import "antd/dist/reset.css"; // Import styles (v5)
// or import 'antd/dist/antd.css'; // for v4

const App = () => (
  <div>
    <Button type="primary">Button</Button>
    <DatePicker />
  </div>
);

export default App;
```

### Ant Design for Angular (NG-ZORRO)

```bash
ng add ng-zorro-antd
```

Basic usage:

```typescript
// app.module.ts
import { NgModule } from "@angular/core";
import { NzButtonModule } from "ng-zorro-antd/button";
import { NzDatePickerModule } from "ng-zorro-antd/date-picker";

@NgModule({
  imports: [NzButtonModule, NzDatePickerModule],
})
export class AppModule {}
```

```html
<!-- component.html -->
<button nz-button nzType="primary">Button</button>
<nz-date-picker></nz-date-picker>
```

### Ant Design for Vue (Ant Design Vue)

```bash
# Using npm
npm install ant-design-vue

# Using yarn
yarn add ant-design-vue
```

Basic usage:

```vue
<template>
  <div>
    <a-button type="primary">Button</a-button>
    <a-date-picker />
  </div>
</template>

<script>
import { Button, DatePicker } from "ant-design-vue";

export default {
  components: {
    AButton: Button,
    ADatePicker: DatePicker,
  },
};
</script>
```

## Core Components

### Layout Components

Ant Design provides a flexible 24-column grid system:

```jsx
import { Row, Col } from "antd";

const App = () => (
  <div>
    <Row>
      <Col span={12}>col-12</Col>
      <Col span={12}>col-12</Col>
    </Row>
    <Row>
      <Col span={8}>col-8</Col>
      <Col span={8}>col-8</Col>
      <Col span={8}>col-8</Col>
    </Row>
    <Row>
      <Col span={6}>col-6</Col>
      <Col span={6}>col-6</Col>
      <Col span={6}>col-6</Col>
      <Col span={6}>col-6</Col>
    </Row>
  </div>
);
```

Responsive grid:

```jsx
<Row>
  <Col xs={24} sm={12} md={8} lg={6} xl={4}>
    Responsive Column
  </Col>
</Row>
```

Layout components for page structure:

```jsx
import { Layout, Menu } from "antd";
const { Header, Content, Footer, Sider } = Layout;

const App = () => (
  <Layout>
    <Header>
      <div className="logo" />
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["1"]}>
        <Menu.Item key="1">Home</Menu.Item>
        <Menu.Item key="2">About</Menu.Item>
        <Menu.Item key="3">Contact</Menu.Item>
      </Menu>
    </Header>
    <Content style={{ padding: "0 50px" }}>
      <div className="site-layout-content">Content</div>
    </Content>
    <Footer style={{ textAlign: "center" }}>Ant Design ©2023</Footer>
  </Layout>
);
```

### General Components

Buttons:

```jsx
import { Button } from "antd";

const App = () => (
  <div>
    <Button type="primary">Primary Button</Button>
    <Button>Default Button</Button>
    <Button type="dashed">Dashed Button</Button>
    <Button type="text">Text Button</Button>
    <Button type="link">Link Button</Button>

    <Button type="primary" danger>
      Danger
    </Button>
    <Button type="primary" shape="circle" icon={<SearchOutlined />} />
    <Button type="primary" loading>
      Loading
    </Button>
  </div>
);
```

Typography:

```jsx
import { Typography } from "antd";
const { Title, Paragraph, Text, Link } = Typography;

const App = () => (
  <Typography>
    <Title>Introduction to Ant Design</Title>
    <Paragraph>
      Ant Design is a design system for enterprise-level products...
    </Paragraph>
    <Title level={2}>Getting Started</Title>
    <Paragraph>
      To use Ant Design, you need to install it first:
      <Text code>npm install antd</Text>
    </Paragraph>
    <Paragraph>
      <Text strong>Ant Design</Text> is available on{" "}
      <Link href="https://github.com/ant-design/ant-design" target="_blank">
        GitHub
      </Link>
    </Paragraph>
  </Typography>
);
```

### Data Entry Components

Forms:

```jsx
import { Form, Input, Button, Checkbox } from "antd";

const App = () => {
  const onFinish = (values) => {
    console.log("Success:", values);
  };

  return (
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      autoComplete="off"
    >
      <Form.Item
        label="Username"
        name="username"
        rules={[{ required: true, message: "Please input your username!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: "Please input your password!" }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="remember"
        valuePropName="checked"
        wrapperCol={{ offset: 8, span: 16 }}
      >
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};
```

Date pickers:

```jsx
import { DatePicker, Space } from "antd";
const { RangePicker } = DatePicker;

const App = () => (
  <Space direction="vertical" size={12}>
    <DatePicker />
    <DatePicker picker="week" />
    <DatePicker picker="month" />
    <DatePicker picker="quarter" />
    <DatePicker picker="year" />
    <RangePicker />
  </Space>
);
```

Selects:

```jsx
import { Select } from 'antd';
const { Option } = Select;

const App = () => (
  <div>
    <Select defaultValue="lucy" style={{ width: 120 }}>
      <Option value="jack">Jack</Option>
      <Option value="lucy">Lucy</Option>
      <Option value="disabled" disabled>
        Disabled
      </Option>
      <Option value="yiminghe">Yiminghe</Option>
    </Select>

    <Select mode="multiple" placeholder="
```
