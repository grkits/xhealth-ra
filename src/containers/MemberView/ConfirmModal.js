import React, { useState } from 'react';
import { Button, Modal, Row, Typography } from 'antd';
import { DownloadOutlined, CheckCircleFilled } from '@ant-design/icons';


const ConfirmModal = ({ open, setOpen, rowData }) => {

    const handleOk = () => {
        setOpen(false);
    };
    const handleCancel = () => {
        setOpen(false);
    };

    const DownloadJSON = () => {
        const dataStr =
            'data:application/json;charset=utf-8,' +
            encodeURIComponent(JSON.stringify(rowData));
        const download = document.createElement('a');
        download.setAttribute('href', dataStr);
        download.setAttribute('download', rowData?.patient_id + '.json');
        document.body.appendChild(download);
        download.click();
        download.remove();
        setOpen(false);
    };

    return (
        <>
            <Modal
                open={open}
                title={<><CheckCircleFilled style={{color: "#52c41a"}} /><span style={{ paddingLeft: "10px", color: "#52c41a" }} level={5}>Sent to EMR Successfully</span></>}
                onOk={handleOk}
                onCancel={handleCancel}
                footer={false}
            >
                    <Button type="primary" onClick={() => DownloadJSON()} shape="round" icon={<DownloadOutlined />} size={"large"}>
                        Export Data
                    </Button>
            </Modal>
        </>
    );
};
export default ConfirmModal;