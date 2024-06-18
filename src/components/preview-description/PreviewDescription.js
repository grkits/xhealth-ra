import { useState } from 'react';
import { Layout, Divider, Col, Row } from 'antd';
import './PreviewDescription.css'

const { Content } = Layout;

const DescriptionItem = ({ title, content }) => (
  <div>
    <p>{title}:</p>
    {content}
  </div>
);

const PreviewDescription = ({item}) => {
  
    return (
      <div className="">
          <h1 style={{ marginBottom: 12 }}><strong>{item.mainTitle}</strong></h1>
          {item.subTitle && 
            <h3>{item.subTitle}</h3>
          }
          {item.details && item.details.length && item.details.map(detail => (
            <Row glutter={24} style={{paddingTop: 15}}>
              <Col span={24}>
                  <h2>{detail.title}</h2>
                  <div dangerouslySetInnerHTML={{ __html: detail.detail }}></div>
              </Col>
            </Row>
          ))}
      </div>
    );
}

export default PreviewDescription;