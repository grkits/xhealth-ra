import React from 'react';
import { Modal } from 'antd';
import { CheckCircleFilled } from '@ant-design/icons';
import '@react-pdf-viewer/core/lib/styles/index.css';

const PDFView = ({ open, setOpen, rowData }) => {

    const handleCancel = () => {
        setOpen(false);
    };


    return (
        <>
            <Modal width={800} height={200}
                open={open}
                onCancel={handleCancel}
                title={<><CheckCircleFilled style={{ color: "#52c41a" }} /><span style={{ paddingLeft: "10px", color: "#52c41a" }} level={5}>Lab Results</span></>}
                footer={false}
            >
                <object data="https://black-linda-5.tiiny.site/" type='application/pdf' width={"100%"} height={"300px"}>
                </object>
            </Modal>
        </>
    );
};
export default PDFView;