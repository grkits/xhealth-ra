import React from 'react';
import { Button, Drawer, Space } from 'antd';

const SideDrawer = ({ onClose, openDrawer }) => {
    return (
        <Drawer
            title={`Drawer`}
            placement="right"
            size={"medium"}
            onClose={onClose}
            open={openDrawer}
            extra={
                <Space>
                    <Button onClick={onClose}>Cancel</Button>
                    <Button type="primary" onClick={onClose}>
                        OK
                    </Button>
                </Space>
            }
        >
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
        </Drawer>
    );
};
export default SideDrawer;