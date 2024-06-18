import { useState } from 'react';
import { Layout, Menu } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  SnippetsOutlined,
  TeamOutlined,
} from '@ant-design/icons';
import './ResumeContainer.css'

const { Header, Sider, Content } = Layout;

function ResumeContainer() {
    return (
      <Content>
        Resume Builder
      </Content>
    );
  }
  
  export default ResumeContainer;