import { useState } from 'react'
import { Layout, Drawer, List, Avatar, Divider, Col, Row } from 'antd'
import './PreviewDrawer.css'
import PreviewDescription from '../preview-description/PreviewDescription'
import data from '../../static/content/jobs-data.json'

const { Content } = Layout

function PreviewDrawer() {
  const [visible, setVisible] = useState(false)
  const [sourceData, setSourceData] = useState(data)
  const [selectedItem, setSelectedItem] = useState({})

  function showDrawer(value, item) {
    setSelectedItem(item)
    setVisible(value)
  }

  function hideDrawer(value) {
    setVisible(value)
  }

  return (
    <>
        <h1>{sourceData.title}</h1>
        <div className='preview-drawer-container'>
        <List
            dataSource={sourceData.data}
            //bordered
            renderItem={(item) => (
            <List.Item style={{padding: 15}}
                key={item.id}
                actions={[
                <a onClick={() => showDrawer(true, item)} key={`a-${item.id}`}>
                    {sourceData.btnText}
                </a>
                ]}
            >
                <List.Item.Meta
                avatar={
                    <Avatar src={item.avatar} />
                }
                title={item.mainTitle}
                description={item.subTitle}
                />
            </List.Item>
            )}
        />
        <Drawer
            width={640}
            placement='right'
            closable={false}
            onClose={() => hideDrawer(false)}
            visible={visible}
        >
            <PreviewDescription item={selectedItem} />
        </Drawer>
        </div>
    </>
  )
}

export default PreviewDrawer
