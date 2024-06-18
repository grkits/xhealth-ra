import { useState } from 'react';
import { Layout, Menu, Col, Row } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  SnippetsOutlined,
  TeamOutlined,
} from '@ant-design/icons';
import './JobOpenings.css';
import PreviewDrawer from '../../components/preview-drawer/PreviewDrawer'

const { Header, Sider, Content } = Layout;

function JobOpeningsContainer() {
    return (
      <Content>
        <Row glutter={24}>
          <Col span={8}>
            <div style={{textAlign: 'left'}}>
              <PreviewDrawer />
            </div>
          </Col>
        </Row>
      </Content>
    );
  }
  
  export default JobOpeningsContainer;