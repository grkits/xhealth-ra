import React from 'react';
import {
    Col,
    Row,
    Typography,
    Tag,
    Input,
    DatePicker
} from "antd";

const { TextArea } = Input;

const RenderContent = ({ dateFormat, onDateChange, selectedTag, setSelectedTag, value, setValue, auditorValue, setAuditotValue, submitData }) => {
    return (
        <>
            <Row>
                <Col span={4} style={{ margin: "5px 0" }}>
                    <Typography.Title level={4} style={{ margin: 0, color: "#FFFFFF" }}>
                        DOS :{" "}
                    </Typography.Title>
                </Col>
                <Col span={10} style={{ margin: "5px 0" }}>
                    <DatePicker
                        format={dateFormat}
                        allowClear
                        onChange={(date, dateString) => onDateChange(date, dateString, 1)}
                    />
                </Col>
            </Row>
            <Row style={{ margin: "10px 0px" }}>
                <Tag
                    style={{
                        background:
                            selectedTag === "audited_gaps" ? "#FFFFFF" : "transparent",
                        color: selectedTag === "audited_gaps" ? "#282c34" : "#FFFFFF",
                    }}
                    onClick={() => setSelectedTag("audited_gaps")}
                >
                    Audited no gaps found
                </Tag>
                <Tag
                    style={{
                        background:
                            selectedTag === "support_raps" ? "#FFFFFF" : "transparent",
                        color: selectedTag === "support_raps" ? "#282c34" : "#FFFFFF",
                    }}
                    onClick={() => setSelectedTag("support_raps")}
                >
                    Support found for RAPS submission
                </Tag>
            </Row>
            <Row style={{ margin: "10px 0px" }}>
                <Tag
                    style={{
                        background:
                            selectedTag === "query_needed" ? "#FFFFFF" : "transparent",
                        color: selectedTag === "query_needed" ? "#282c34" : "#FFFFFF",
                    }}
                    onClick={() => setSelectedTag("query_needed")}
                >
                    Query Needed
                </Tag>
                <Tag
                    style={{
                        background:
                            selectedTag === "query_sent" ? "#FFFFFF" : "transparent",
                        color: selectedTag === "query_sent" ? "#282c34" : "#FFFFFF",
                    }}
                    onClick={() => setSelectedTag("query_sent")}
                >
                    Query Sent
                </Tag>
                <Tag
                    style={{
                        background:
                            selectedTag === "query_approved" ? "#FFFFFF" : "transparent",
                        color: selectedTag === "query_approved" ? "#282c34" : "#FFFFFF",
                    }}
                    onClick={() => setSelectedTag("query_approved")}
                >
                    Query Approved
                </Tag>
            </Row>
            <Row style={{ margin: "10px 0px" }}>
                <Tag
                    style={{
                        background:
                            selectedTag === "query_denied" ? "#FFFFFF" : "transparent",
                        color: selectedTag === "query_denied" ? "#282c34" : "#FFFFFF",
                    }}
                    onClick={() => setSelectedTag("query_denied")}
                >
                    Query Denied
                </Tag>
                <Tag
                    style={{
                        background:
                            selectedTag === "query_cancelled" ? "#FFFFFF" : "transparent",
                        color: selectedTag === "query_cancelled" ? "#282c34" : "#FFFFFF",
                    }}
                    onClick={() => setSelectedTag("query_cancelled")}
                >
                    Query Cancelled
                </Tag>
                <Tag
                    style={{
                        background:
                            selectedTag === "disregard_entry" ? "#FFFFFF" : "transparent",
                        color: selectedTag === "disregard_entry" ? "#282c34" : "#FFFFFF",
                    }}
                    onClick={() => setSelectedTag("disregard_entry")}
                >
                    Disregard Entry
                </Tag>
            </Row>
            {selectedTag !== "" && (
                <>
                    <Row style={{ margin: "10px 0" }}>
                        <Col span={12} style={{ paddingRight: "10px" }}>
                            <TextArea
                                value={value}
                                onChange={(e) => setValue(e.target.value)}
                                placeholder="Query Note"
                                autoSize={{ minRows: 3, maxRows: 5 }}
                            />
                        </Col>
                        <Col span={12}>
                            <TextArea
                                value={auditorValue}
                                onChange={(e) => setAuditotValue(e.target.value)}
                                placeholder="Auditor Note"
                                autoSize={{ minRows: 3, maxRows: 5 }}
                            />
                        </Col>
                    </Row>
                    <Row justify={"center"}>
                        <button style={{ cursor: "pointer" }} onClick={submitData}>
                            Submit
                        </button>
                    </Row>
                </>
            )}
        </>
    );
};
export default RenderContent;