import React, { useState, useEffect } from "react";
import {
  Col,
  Row,
  Typography,
  Table,
  Space,
  Collapse,
  Popover,
  Button,
  Input,
  Card,
  List,
  Tooltip,
  Drawer
} from "antd";
import data from "../../data/member_data.json";
import riskData from "../../data/risk_data.json";
import vitals from "../../data/vitals_data.json";
import gaps from "../../data/gaps_data.json";
import suspecteMembersList from "../../data/suspected_member.json";
import chronicData from "../../data/chronic_data.json";
import mmrData from "../../data/mmr_data.json";
import { useParams } from "react-router-dom";
import "./MemberView.css";
import moment from "moment";
import ModalComponent from "./ModalComponent";
import { action_query, riskVariables } from "./constants";
import { riskFactors } from "./riskFactors"
import { riskColor } from "./riskColors"
import RenderContent from "./RenderContent";
import SideDrawer from "./Drawer";
import ConfirmModal from "./ConfirmModal";
import { FilePdfOutlined } from '@ant-design/icons';


const { Panel } = Collapse;

const MemberNewView = () => {
  const params = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const riskDataForMem = riskData?.filter(
    (data) => data?.patient_id?.toString() === params?.id
  );
  let riskTypes = [];
  const riskTypesArr =
    riskDataForMem?.length > 0 ? Object.keys(riskDataForMem[0]) : [];
  riskTypesArr?.map((data) => {
    if (data !== "patient_id") {
      riskTypes.push({
        name: riskVariables?.[data],
        value: Number(riskDataForMem?.[0]?.[data]),
        type: data,
      });
    }
  });
  const getChroniConditions = () => {
    return chronicData.filter(
      (item) => item?.patient_id?.toString() === params?.id
    );
  };

  const [diagnosisData, setDiagnosisData] = useState(
    JSON.parse(localStorage.getItem("diagnosisData"))
  );
  const [medicationData, setMedicationData] = useState(
    JSON.parse(localStorage.getItem("medicationData"))
  );
  const [selectedTag, setSelectedTag] = useState("");
  const [memberData, setMemberData] = useState();
  const [value, setValue] = useState("");
  const [auditorValue, setAuditotValue] = useState("");
  const [open, setOpen] = useState(false);
  const [openSuspectedPopup, setOpenSuspectedPopup] = useState(false);
  const [indexedOpen, setIndexedOpen] = useState(null);
  const [typeOpen, setTypeOpen] = useState(null);
  const [tableKey, setTableKey] = useState("");
  const [selectDate, setSelectDate] = useState(null);
  const [formType, setFormType] = useState("");
  const [filteredMMRData, setFilteredMMRData] = useState([]);
  const [vitalDataSource, setVitalDataSource] = useState([]);
  const [gapsDataSource, setGapsDataSource] = useState([]);
  const [suspectDataSource, setSuspectedDataSource] = useState([]);
  const [evidenceSource, setEvidenceSource] = useState();
  const [emrModal, setEMRModal] = useState(false)
  const [rowData, setRowData] = useState(null)
  const [memberInsightsData, setMemberInsightData] = useState([
    {
      title: "Chronic Conditions",
      data: getChroniConditions(),
    },
    {
      title: "Vitals",
    },
    {
      title: "Gaps",
    },
  ]);
  const [openDrawer, setOpenDrawer] = useState(false);

  const showLargeDrawer = () => {
    setOpenSuspectedPopup(false);
    setIndexedOpen(null);
    setOpenDrawer(true);
  };

  const onClose = () => {
    setOpenDrawer(false);
  };

  const getCHDRisk = () => {
    return (
      <ul className="risk-adjuments-view-ul">
        <li className="risk-adjuments-view-li">
          Smoking. Smoking is a major risk factor for coronary heart disease.
        </li>
        <li className="risk-adjuments-view-li">
          High blood pressure. High blood pressure (hypertension) puts a strain
          on your heart and can lead to CHD.
        </li>
      </ul>
    );
  };
  const getDiabetesRisk = () => {
    return (
      <ul className="risk-adjuments-view-ul">
        <li className="risk-adjuments-view-li">
          Are physically active less than 3 times a week.
        </li>
        <li className="risk-adjuments-view-li">
          Have ever had gestational diabetes (diabetes during pregnancy) or
          given birth to a baby who weighed over 9 pounds.
        </li>
      </ul>
    );
  };
  const getHCCRisk = () => {
    return (
      <ul className="risk-adjuments-view-ul">
        <li className="risk-adjuments-view-li">
          The major known risk factors for HCC are viral (chronic hepatitis B
          and hepatitis C), toxic (alcohol and aflatoxins), metabolic (diabetes
          and non-alcoholic fatty liver disease, hereditary haemochromatosis)
          and immune-related (primary biliary cirrhosis and autoimmune
          hepatitis)
        </li>
      </ul>
    );
  };
  const getHypertensionRisk = () => {
    return (
      <ul className="risk-adjuments-view-ul">
        <li className="risk-adjuments-view-li">
          Elevated Blood Pressure. Elevated blood pressure is blood pressure
          that is slightly higher than normal
        </li>
        <li className="risk-adjuments-view-li">being overweight or obese.</li>
      </ul>
    );
  };

  const [riskDataSourceView, setRiskDataSourceView] = useState([
    {
      title: "CHD Risk",
      data: getCHDRisk(),
    },
    {
      title: "Diabetes Risk",
      data: getDiabetesRisk(),
    },
    {
      title: "HCC Risk",
      data: getHCCRisk(),
    },
    {
      title: "Hypertension Risk",
      data: getHypertensionRisk(),
    },
  ]);

  const dateFormat = "DD/MM/YYYY";

  const resetValues = () => {
    setSelectedTag("");
    setIndexedOpen(null);
    setTypeOpen(null);
    setOpen(false);
    setValue("");
    setAuditotValue("");
    setTableKey("");
    setSelectDate(null);
  };

  const submitData = async () => {
    if (tableKey === "diagnosis") {
      let tableData = diagnosisData;
      tableData[indexedOpen] = {
        ...tableData[indexedOpen],
        dos_add: selectDate,
        action: action_query[selectedTag],
        auditor_notes: auditorValue,
        query_text: value,
      };
      setDiagnosisData([...tableData]);
      localStorage.setItem("diagnosisData", JSON.stringify([...tableData]));
      resetValues();
    } else {
      let tableData = medicationData;
      tableData[indexedOpen] = {
        ...tableData[indexedOpen],
        dos_add: selectDate,
        action: action_query[selectedTag],
        auditor_notes: auditorValue,
        query_text: value,
      };
      setMedicationData([...tableData]);
      localStorage.setItem("medicationData", JSON.stringify([...tableData]));
      resetValues();
    }
  };

  const handleOpenChange = (newOpen) => {
    setOpen(newOpen);
    setSelectedTag("");
    setValue("");
    setAuditotValue("");
    setSelectDate(null);
  };

  const onDateChange = (dates, dateStrings) => {
    setSelectDate(dateStrings);
  };

  const showModal = (type) => {
    setIsModalOpen(true);
    setFormType(type);
  };

  const submitForm = (formData, formType) => {
    if (formType === "medicationExpand") {
      let tableData = medicationData;
      tableData.unshift({
        id: params?.id,
        hicn: tableData[0]?.hicn,
        ndc_no: formData?.ndc_no,
        product_desc: formData?.product_desc,
        ther_shfs: formData?.ther_shfs,
        therapeutic_class: formData?.therpeutic_class,
        raps_1: "",
        raps_2: "",
        raps_3: "",
        action: "",
        dos_add: "",
        auditor_notes: "",
        query_text: "",
      });
      setMedicationData([...tableData]);
      localStorage.setItem("medicationData", JSON.stringify([...tableData]));
      resetValues();
    } else {
      let tableData = diagnosisData;
      tableData.unshift({
        id: params?.id,
        hicn: tableData[0]?.hicn,
        diag_code: formData?.diagnosis,
        diag_description: formData?.diagnosis_desc,
        hcc: formData?.hccv23,
        raps_0: "",
        raps_1: "",
        raps_2: "",
        raps_3: "",
        raps_4: "",
        action: "",
        dos_add: "",
        auditor_notes: "",
        query_text: "",
      });
      setDiagnosisData([...tableData]);
      localStorage.setItem("diagnosisData", JSON.stringify([...tableData]));
      resetValues();
    }
  };

  useEffect(() => {
    const mem = data.filter(
      (memeberInfo) => memeberInfo.id?.toString() === params?.id
    );
    setMemberData(mem?.[0]);
    const dataSrc = suspecteMembersList.filter(
      (memeberInfo) => memeberInfo.patient_id?.toString() === params?.id
    );
    setSuspectedDataSource([...dataSrc]);
  }, []);

  const evidenceContent = () => {
    return (
      <Row style={{ width: "400px" }}>
        <Col span={24}>
          Attending Provider : {evidenceSource?.attendingProvide}
        </Col>
      </Row>
    );
  };

  const popOverTitleRender = (text) => {
    return (
      <Row style={{ width: "400px" }} justify="space-between">
        <Col span={20}>
          {text}
        </Col>
        <Col span={4} style={{ textAlign: "end" }}>
          <FilePdfOutlined onClick={showLargeDrawer} style={{ cursor: "pointer" }} />
        </Col>
      </Row>
    );
  };

  const handleEvidenceChange = (value) => {
    setOpenSuspectedPopup(value);
    setIndexedOpen(null);
  };

  const suspectedColumns = [
    {
      title: "Visit Date",
      dataIndex: "visitDate",
      key: "visitDate",
      ellipsis: true,
    },
    {
      title: "Attending Provider",
      dataIndex: "attendingProvide",
      key: "attendingProvide",
      ellipsis: true,
    },
    {
      title: "Place of Service",
      dataIndex: "place_of_service",
      key: "place_of_service",
      ellipsis: true,
    },
    {
      title: "Diagnosis Code",
      dataIndex: "diagnosis_code",
      key: "diagnosis_code",
      ellipsis: true,
    },
    {
      title: "HCC",
      dataIndex: "hcc",
      key: "hcc",
      ellipsis: true,
    },
    {
      title: "HCC Coefficient",
      dataIndex: "hcc_coefficient",
      key: "hcc_coefficient",
      ellipsis: true,
    },
    {
      title: "Evidence Source",
      dataIndex: "evidence_source",
      key: "evidence_source",
      ellipsis: true,
      render: (text, record, index) => {
        return (
          <Space size="middle">
            <span>
              {indexedOpen === index ? (
                <Popover
                  overlayClassName="customOverlayPopover"
                  content={evidenceContent}
                  title={popOverTitleRender(text)}
                  trigger="click"
                  open={openSuspectedPopup}
                  onOpenChange={handleEvidenceChange}
                >
                  <span
                    style={{ color: "steelblue", cursor: "pointer" }}
                    onClick={() => {
                      setEvidenceSource(record);
                      openPopoverSuspected(
                        index,
                        record,
                        "evidence_source",
                        "suspected"
                      );
                    }}
                  >
                    {record?.evidence_source}
                  </span>
                </Popover>
              ) : (
                <span
                  style={{ color: "steelblue", cursor: "pointer" }}
                  onClick={() => {
                    setEvidenceSource(record);
                    openPopoverSuspected(
                      index,
                      record,
                      "evidence_source",
                      "suspected"
                    );
                  }}
                >
                  {record?.evidence_source}
                </span>
              )}
            </span>
          </Space>
        );
      },
    },
    {
      title: "Reason for Inclusion",
      dataIndex: "reason_for_inclusion",
      key: "reason_for_inclusion",
      ellipsis: true,
    },
    {
      title: "PCP Name",
      dataIndex: "pcp_name",
      key: "pcp_name",
      ellipsis: true,
    },
    {
      title: "Action",
      dataIndex: "pcp_name",
      key: "pcp_name",
      ellipsis: false,
      render: (text, record, index) => {
        return (
          <Button type="primary" onClick={() => {
            setRowData(record)
            setEMRModal(true);
          }}>
            <div>TO EMR</div>
          </Button>
        );
      },
    },
  ];

  const columns = [
    {
      title: "Diagnosis",
      dataIndex: "diag_code",
      key: "diag_code",
      ellipsis: true,
    },
    {
      title: "Diagnosis Description",
      dataIndex: "diag_description",
      key: "diag_description",
      ellipsis: true,
    },
    {
      title: "HCC v28",
      dataIndex: "hcc",
      key: "hcc",
      ellipsis: true,
    },
    {
      title: "2020EDPS",
      dataIndex: "raps_0",
      key: "raps_0",
      ellipsis: true,
      render: (text, record, index) => {
        const date = moment(record?.raps_0, "YYYYMMDD")?.format("YYYY-MM-DD");
        var m = moment(date);
        if (date && date !== "Invalid date" && isNaN(date)) {
          m.set("year", 2020);
        }
        return (
          <Space size="middle">
            <span>
              {record?.raps_0 ? (
                m?.format("YYYY-MM-DD")
              ) : (
                <>
                  {indexedOpen === index &&
                    typeOpen === "raps_0" &&
                    tableKey === "diagnosis" ? (
                    <Popover
                      content={<RenderContent dateFormat={dateFormat} onDateChange={onDateChange} selectedTag={selectedTag} setSelectedTag={setSelectedTag} value={value} setValue={setValue} auditorValue={auditorValue} setAuditotValue={setAuditotValue} submitData={submitData} />}
                      title={text}
                      trigger="click"
                      open={open}
                      onOpenChange={handleOpenChange}
                    >
                      <Button
                        style={{
                          position: "absolute",
                          width: "100%",
                          height: "100%",
                          top: 0,
                          right: 0,
                          border: "none",
                        }}
                        onClick={() =>
                          openPopoverButton(
                            index,
                            record,
                            "raps_0",
                            "diagnosis"
                          )
                        }
                      >
                        BL
                      </Button>
                    </Popover>
                  ) : (
                    <Button
                      style={{
                        position: "absolute",
                        width: "100%",
                        height: "100%",
                        top: 0,
                        right: 0,
                        border: "none",
                      }}
                      onClick={() =>
                        openPopoverButton(index, record, "raps_0", "diagnosis")
                      }
                    >
                      BL
                    </Button>
                  )}
                </>
              )}
            </span>
          </Space>
        );
      },
    },
    {
      title: "2021EDPS",
      dataIndex: "raps_1",
      key: "raps_1",
      ellipsis: true,
      render: (text, record, index) => {
        const date = moment(record?.raps_1, "YYYYMMDD")?.format("YYYY-MM-DD");
        var m = moment(date);
        if (date && date !== "Invalid date" && isNaN(date)) {
          m.set("year", 2021);
        }
        return (
          <Space size="middle">
            <span>
              {record?.raps_1 ? (
                m?.format("YYYY-MM-DD")
              ) : (
                <>
                  {indexedOpen === index &&
                    typeOpen === "raps_1" &&
                    tableKey === "diagnosis" ? (
                    <Popover
                      content={<RenderContent dateFormat={dateFormat} onDateChange={onDateChange} selectedTag={selectedTag} setSelectedTag={setSelectedTag} value={value} setValue={setValue} auditorValue={auditorValue} setAuditotValue={setAuditotValue} submitData={submitData} />}
                      title={text}
                      trigger="click"
                      open={open}
                      onOpenChange={handleOpenChange}
                    >
                      <Button
                        style={{
                          position: "absolute",
                          width: "100%",
                          height: "100%",
                          top: 0,
                          right: 0,
                          border: "none",
                        }}
                        onClick={() =>
                          openPopoverButton(
                            index,
                            record,
                            "raps_1",
                            "diagnosis"
                          )
                        }
                      >
                        BL
                      </Button>
                    </Popover>
                  ) : (
                    <Button
                      style={{
                        position: "absolute",
                        width: "100%",
                        height: "100%",
                        top: 0,
                        right: 0,
                        border: "none",
                      }}
                      onClick={() =>
                        openPopoverButton(index, record, "raps_1", "diagnosis")
                      }
                    >
                      BL
                    </Button>
                  )}
                </>
              )}
            </span>
          </Space>
        );
      },
    },
    {
      title: "2022RAPS",
      dataIndex: "raps_2",
      key: "raps_2",
      ellipsis: true,
      render: (text, record, index) => {
        const date = moment(record?.raps_2, "YYYYMMDD")?.format("YYYY-MM-DD");
        var m = moment(date);
        if (date && date !== "Invalid date" && isNaN(date)) {
          m.set("year", 2022);
        }
        return (
          <Space size="middle">
            <span>
              {record?.raps_2 ? (
                m?.format("YYYY-MM-DD")
              ) : (
                <>
                  {indexedOpen === index &&
                    typeOpen === "raps_2" &&
                    tableKey === "diagnosis" ? (
                    <Popover
                      content={<RenderContent dateFormat={dateFormat} onDateChange={onDateChange} selectedTag={selectedTag} setSelectedTag={setSelectedTag} value={value} setValue={setValue} auditorValue={auditorValue} setAuditotValue={setAuditotValue} submitData={submitData} />}
                      title={text}
                      trigger="click"
                      open={open}
                      onOpenChange={handleOpenChange}
                    >
                      <Button
                        style={{
                          position: "absolute",
                          width: "100%",
                          height: "100%",
                          top: 0,
                          right: 0,
                          border: "none",
                        }}
                        onClick={() =>
                          openPopoverButton(
                            index,
                            record,
                            "raps_2",
                            "diagnosis"
                          )
                        }
                      >
                        BL
                      </Button>
                    </Popover>
                  ) : (
                    <Button
                      style={{
                        position: "absolute",
                        width: "100%",
                        height: "100%",
                        top: 0,
                        right: 0,
                        border: "none",
                      }}
                      onClick={() =>
                        openPopoverButton(index, record, "raps_2", "diagnosis")
                      }
                    >
                      BL
                    </Button>
                  )}
                </>
              )}
            </span>
          </Space>
        );
      },
    },
    {
      title: "2022EDPS",
      dataIndex: "raps_3",
      key: "raps_3",
      ellipsis: true,
      render: (text, record, index) => {
        const date = moment(record?.raps_3, "YYYYMMDD")?.format("YYYY-MM-DD");
        var m = moment(date);
        if (date && date !== "Invalid date" && isNaN(date)) {
          m.set("year", 2022);
        }
        return (
          <Space size="middle">
            <span>
              {record?.raps_3 ? (
                m?.format("YYYY-MM-DD")
              ) : (
                <>
                  {indexedOpen === index &&
                    typeOpen === "raps_3" &&
                    tableKey === "diagnosis" ? (
                    <Popover
                      content={<RenderContent dateFormat={dateFormat} onDateChange={onDateChange} selectedTag={selectedTag} setSelectedTag={setSelectedTag} value={value} setValue={setValue} auditorValue={auditorValue} setAuditotValue={setAuditotValue} submitData={submitData} />}
                      title={text}
                      trigger="click"
                      open={open}
                      onOpenChange={handleOpenChange}
                    >
                      <Button
                        style={{
                          position: "absolute",
                          width: "100%",
                          height: "100%",
                          top: 0,
                          right: 0,
                          border: "none",
                        }}
                        onClick={() =>
                          openPopoverButton(
                            index,
                            record,
                            "raps_3",
                            "diagnosis"
                          )
                        }
                      >
                        BL
                      </Button>
                    </Popover>
                  ) : (
                    <Button
                      style={{
                        position: "absolute",
                        width: "100%",
                        height: "100%",
                        top: 0,
                        right: 0,
                        border: "none",
                      }}
                      onClick={() =>
                        openPopoverButton(index, record, "raps_3", "diagnosis")
                      }
                    >
                      BL
                    </Button>
                  )}
                </>
              )}
            </span>
          </Space>
        );
      },
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      ellipsis: true,
    },
    {
      title: "DOS Add",
      dataIndex: "dos_add",
      key: "dos_add",
      ellipsis: true,
    },
    {
      title: "Auditor Notes",
      dataIndex: "auditor_notes",
      key: "auditor_notes",
      ellipsis: true,
    },
    {
      title: "Query Text",
      dataIndex: "query_text",
      key: "query_text",
      ellipsis: true,
    },
  ];

  const openPopoverButton = (index, record, type, tableKey) => {
    if (open === true) {
      setSelectedTag("");
    } else {
      setIndexedOpen(index);
      setTypeOpen(type);
    }
    setTableKey(tableKey);
    setOpen(!open);
  };

  const openPopoverSuspected = (index, record, type, tableKey) => {
    setIndexedOpen(index);
    setOpenSuspectedPopup(!openSuspectedPopup);
  };

  const filterGapDetails = () => {
    const dataList = gaps.filter((key) => {
      return key?.patient_id?.toString() === params?.id;
    });
    let arr = [];
    if (dataList?.[0]?.last_a1c) {
      arr.push({
        gaps: "A1C",
        lastSeen: dataList?.[0]?.last_a1c,
      });
    }
    if (dataList?.[0]?.last_smoking_cessation) {
      arr.push({
        gaps: "Smoking Cessation",
        lastSeen: dataList?.[0]?.last_smoking_cessation,
      });
    }
    if (dataList?.[0]?.last_foot_exam) {
      arr.push({
        gaps: "Foot Exam",
        lastSeen: dataList?.[0]?.last_foot_exam,
      });
    }
    if (dataList?.[0]?.last_eye_exam) {
      arr.push({
        gaps: "Eye Exam",
        lastSeen: dataList?.[0]?.last_eye_exam,
      });
    }
    if (dataList?.[0]?.last_pcp_appointment) {
      arr.push({
        gaps: "PCP Appointment",
        lastSeen: dataList?.[0]?.last_pcp_appointment,
      });
    }
    if (dataList?.[0]?.last_social_worker_appointment) {
      arr.push({
        gaps: "Social Worker Appointment",
        lastSeen: dataList?.[0]?.last_social_worker_appointment,
      });
    }
    setGapsDataSource(arr);
  };
  const filterVitalDetails = () => {
    const dataList = vitals.filter((key) => {
      return key?.patient_id?.toString() === params?.id;
    });
    let arr = [];
    if (dataList?.[0]?.a1c_value) {
      arr.push({
        vitals: "A1C",
        value: dataList?.[0]?.a1c_value,
        lastSeen: dataList?.[0]?.last_a1c,
      });
    }
    if (dataList?.[0]?.bmi_value) {
      arr.push({
        vitals: "BMI",
        value: dataList?.[0]?.bmi_value,
        lastSeen: dataList?.[0]?.last_bmi,
      });
    }
    if (dataList?.[0]?.ldl_value) {
      arr.push({
        vitals: "LDL",
        value: dataList?.[0]?.ldl_value,
        lastSeen: dataList?.[0]?.last_ldl,
      });
    }
    if (dataList?.[0]?.hdl_value) {
      arr.push({
        vitals: "HDL",
        value: dataList?.[0]?.hdl_value,
        lastSeen: dataList?.[0]?.last_hdl,
      });
    }
    if (dataList?.[0]?.fev_value) {
      arr.push({
        vitals: "FEV",
        value: dataList?.[0]?.fev_value,
        lastSeen: dataList?.[0]?.last_fev,
      });
    }
    if (dataList?.[0]?.systolic_value) {
      arr.push({
        vitals: "Systolic",
        value: dataList?.[0]?.systolic_value,
        lastSeen: dataList?.[0]?.last_systolic,
      });
    }
    if (dataList?.[0]?.diastolic_value) {
      arr.push({
        vitals: "Diastolic",
        value: dataList?.[0]?.diastolic_value,
        lastSeen: dataList?.[0]?.last_diastolic,
      });
    }
    if (dataList?.[0]?.pls_value) {
      arr.push({
        vitals: "Pulse",
        value: dataList?.[0]?.pls_value,
        lastSeen: dataList?.[0]?.last_pls,
      });
    }
    setVitalDataSource(arr);
  };

  const filterMMRDetails = () => {
    const mmrDataList = mmrData?.filter((key) => {
      return key?.patient_id?.toString() === params?.id;
    });
    setFilteredMMRData([
      {
        mmr_des: "Member Months",
        details_2021: mmrDataList?.[0]?.m_months_2021,
        details_2022: mmrDataList?.[0]?.m_months_2022,
        details_2023: mmrDataList?.[0]?.m_months_2023,
      },
      {
        mmr_des: "MMR Risk - Beginning",
        details_2021: mmrDataList?.[0]?.risk_2021_b,
        details_2022: mmrDataList?.[0]?.risk_2022_b,
        details_2023: mmrDataList?.[0]?.risk_2023_b,
      },
      {
        mmr_des: "MMR Risk - Middle",
        details_2021: mmrDataList?.[0]?.risk_2021_m,
        details_2022: mmrDataList?.[0]?.risk_2022_m,
        details_2023: mmrDataList?.[0]?.risk_2023_m,
      },
      {
        mmr_des: "MMR Risk - Final",
        details_2021: mmrDataList?.[0]?.risk_2021_f,
        details_2022: mmrDataList?.[0]?.risk_2022_f,
        details_2023: mmrDataList?.[0]?.risk_2023_f,
      },
      {
        mmr_des: "MMR Preimum",
        details_2021: `$${parseFloat(
          mmrDataList?.[0]?.premium_2021
        ).toLocaleString()}`,
        details_2022: `$${parseFloat(
          mmrDataList?.[0]?.premium_2022
        ).toLocaleString()}`,
        details_2023: `$${parseFloat(
          mmrDataList?.[0]?.premium_2023
        ).toLocaleString()}`,
      },
      {
        mmr_des: "Medical Cost",
        details_2021: `$${parseFloat(
          mmrDataList?.[0]?.medcost_2021
        ).toLocaleString()}`,
        details_2022: `$${parseFloat(
          mmrDataList?.[0]?.medcost_2022
        ).toLocaleString()}`,
        details_2023: `$${parseFloat(
          mmrDataList?.[0]?.medcost_2023
        ).toLocaleString()}`,
      },
      {
        mmr_des: "Pharmacy Cost",
        details_2021: `$${parseFloat(
          mmrDataList?.[0]?.pharma_2021
        ).toLocaleString()}`,
        details_2022: `$${parseFloat(
          mmrDataList?.[0]?.pharma_2022
        ).toLocaleString()}`,
        details_2023: `$${parseFloat(
          mmrDataList?.[0]?.pharma_2023
        ).toLocaleString()}`,
      },
      {
        mmr_des: "Recent Office Vist",
        details_2021: moment(mmrDataList?.[0]?.ovc_2021).format("YYYY-MM-DD"),
        details_2022: moment(mmrDataList?.[0]?.ovc_2022).format("YYYY-MM-DD"),
        details_2023: mmrDataList?.[0]?.ovc_2023
          ? moment(mmrDataList?.[0]?.ovc_2023).format("YYYY-MM-DD")
          : null,
      },
    ]);
  };

  useEffect(() => {
    filterMMRDetails();
    filterVitalDetails();
    filterGapDetails();
  }, []);

  const vitalsColumn = [
    {
      title: "Vital",
      dataIndex: "vitals",
      key: "vitals",
      ellipsis: true,
      width: 150,
      render(text, record) {
        return {
          props: {
            style: { fontWeight: "bold" },
          },
          children: <div>{text}</div>,
        };
      },
    },
    {
      title: "Value",
      dataIndex: "value",
      key: "value",
      ellipsis: true,
      width: 100,
    },
    {
      title: "Last Seen",
      dataIndex: "lastSeen",
      key: "lastSeen",
      ellipsis: true,
      width: 150,
    },
  ];
  const gapsColumn = [
    {
      title: "Gap",
      dataIndex: "gaps",
      key: "gaps",
      ellipsis: true,
      width: 150,
      render(text, record) {
        return {
          props: {
            style: { fontWeight: "bold" },
          },
          children: <div>{text}</div>,
        };
      },
    },
    {
      title: "Last Seen",
      dataIndex: "lastSeen",
      key: "lastSeen",
      ellipsis: true,
      width: 150,
    },
  ];

  const chronicColumns = [
    {
      title: "Chronic Conditions",
      dataIndex: "chronic_desc",
      key: "chronic_desc",
      ellipsis: true,
      width: 150,
      render(text, record) {
        return {
          props: {
            style: { fontWeight: "bold" },
          },
          children: <div>{text}</div>,
        };
      },
    },
    {
      title: "Last Seen",
      dataIndex: "last_seen",
      key: "last_seen",
      ellipsis: true,
      width: 150,
    },
  ];

  const mmrDetailsColumn = [
    {
      title: "MMR Details",
      dataIndex: "mmr_des",
      key: "mmr_des",
      ellipsis: true,
      width: 180,
      render(text, record) {
        return {
          props: {
            style: { fontWeight: "bold" },
          },
          children: <div>{text}</div>,
        };
      },
    },
    {
      title: "2021",
      dataIndex: "details_2021",
      key: "details_2021",
      ellipsis: true,
    },
    {
      title: "2022",
      dataIndex: "details_2022",
      key: "details_2022",
      ellipsis: true,
    },
    {
      title: "2023",
      dataIndex: "details_2023",
      key: "details_2023",
      ellipsis: true,
    },
  ];

  const medicationColumns = [
    {
      title: "NDC No",
      dataIndex: "ndc_no",
      key: "ndc_no",
      ellipsis: true,
    },
    {
      title: "Product Description",
      dataIndex: "product_desc",
      key: "product_desc",
      ellipsis: true,
    },
    {
      title: "Ther ShFS",
      dataIndex: "ther_shfs",
      key: "ther_shfs",
      ellipsis: true,
    },
    {
      title: "Therapeutic Class",
      dataIndex: "therapeutic_class",
      key: "therapeutic_class",
      ellipsis: true,
    },
    {
      title: "Chronic Mapping",
      dataIndex: "med_chronic",
      key: "med_chronic",
      ellipsis: true,
    },
    {
      title: "2021EDPS",
      dataIndex: "raps_1",
      key: "raps_1",
      ellipsis: true,
      render: (text, record, index) => {
        const date = moment(record?.raps_1, "YYYYMMDD")?.format("YYYY-MM-DD");
        var m = moment(date);
        if (date && date !== "Invalid date" && isNaN(date)) {
          m.set("year", 2021);
        }
        return (
          <Space size="middle">
            <span>
              {record?.raps_1 ? (
                m?.format("YYYY-MM-DD")
              ) : (
                <>
                  {indexedOpen === index &&
                    typeOpen === "raps_1" &&
                    tableKey === "medication" ? (
                    <Popover
                      content={<RenderContent dateFormat={dateFormat} onDateChange={onDateChange} selectedTag={selectedTag} setSelectedTag={setSelectedTag} value={value} setValue={setValue} auditorValue={auditorValue} setAuditotValue={setAuditotValue} submitData={submitData} />}
                      title={text}
                      trigger="click"
                      open={open}
                      onOpenChange={handleOpenChange}
                    >
                      <Button
                        style={{
                          position: "absolute",
                          width: "100%",
                          height: "100%",
                          top: 0,
                          right: 0,
                          border: "none",
                        }}
                        onClick={() =>
                          openPopoverButton(
                            index,
                            record,
                            "raps_1",
                            "medication"
                          )
                        }
                      >
                        BL
                      </Button>
                    </Popover>
                  ) : (
                    <Button
                      style={{
                        position: "absolute",
                        width: "100%",
                        height: "100%",
                        top: 0,
                        right: 0,
                        border: "none",
                      }}
                      onClick={() =>
                        openPopoverButton(index, record, "raps_1", "medication")
                      }
                    >
                      BL
                    </Button>
                  )}
                </>
              )}
            </span>
          </Space>
        );
      },
    },
    {
      title: "2022EDPS",
      dataIndex: "raps_2",
      key: "raps_2",
      ellipsis: true,
      render: (text, record, index) => {
        const date = moment(record?.raps_2, "YYYYMMDD")?.format("YYYY-MM-DD");
        var m = moment(date);
        if (date && date !== "Invalid date" && isNaN(date)) {
          m.set("year", 2022);
        }
        return (
          <Space size="middle">
            <span>
              {record?.raps_2 ? (
                m?.format("YYYY-MM-DD")
              ) : (
                <>
                  {indexedOpen === index &&
                    typeOpen === "raps_2" &&
                    tableKey === "medication" ? (
                    <Popover
                      content={<RenderContent dateFormat={dateFormat} onDateChange={onDateChange} selectedTag={selectedTag} setSelectedTag={setSelectedTag} value={value} setValue={setValue} auditorValue={auditorValue} setAuditotValue={setAuditotValue} submitData={submitData} />}
                      title={text}
                      trigger="click"
                      open={open}
                      onOpenChange={handleOpenChange}
                    >
                      <Button
                        style={{
                          position: "absolute",
                          width: "100%",
                          height: "100%",
                          top: 0,
                          right: 0,
                          border: "none",
                        }}
                        onClick={() =>
                          openPopoverButton(
                            index,
                            record,
                            "raps_2",
                            "medication"
                          )
                        }
                      >
                        BL
                      </Button>
                    </Popover>
                  ) : (
                    <Button
                      style={{
                        position: "absolute",
                        width: "100%",
                        height: "100%",
                        top: 0,
                        right: 0,
                        border: "none",
                      }}
                      onClick={() =>
                        openPopoverButton(index, record, "raps_2", "medication")
                      }
                    >
                      BL
                    </Button>
                  )}
                </>
              )}
            </span>
          </Space>
        );
      },
    },
    {
      title: "2022RAPS",
      dataIndex: "raps_3",
      key: "raps_3",
      ellipsis: true,
      render: (text, record, index) => {
        const date = moment(record?.raps_3, "YYYYMMDD")?.format("YYYY-MM-DD");
        var m = moment(date);
        if (date && date !== "Invalid date" && isNaN(date)) {
          m.set("year", 2022);
        }
        return (
          <Space size="middle">
            <span>
              {record?.raps_3 ? (
                m?.format("YYYY-MM-DD")
              ) : (
                <>
                  {indexedOpen === index &&
                    typeOpen === "raps_3" &&
                    tableKey === "medication" ? (
                    <Popover
                      content={<RenderContent dateFormat={dateFormat} onDateChange={onDateChange} selectedTag={selectedTag} setSelectedTag={setSelectedTag} value={value} setValue={setValue} auditorValue={auditorValue} setAuditotValue={setAuditotValue} submitData={submitData} />}
                      title={text}
                      trigger="click"
                      open={open}
                      onOpenChange={handleOpenChange}
                    >
                      <Button
                        style={{
                          position: "absolute",
                          width: "100%",
                          height: "100%",
                          top: 0,
                          right: 0,
                          border: "none",
                        }}
                        onClick={() =>
                          openPopoverButton(
                            index,
                            record,
                            "raps_3",
                            "medication"
                          )
                        }
                      >
                        BL
                      </Button>
                    </Popover>
                  ) : (
                    <Button
                      style={{
                        position: "absolute",
                        width: "100%",
                        height: "100%",
                        top: 0,
                        right: 0,
                        border: "none",
                      }}
                      onClick={() =>
                        openPopoverButton(index, record, "raps_3", "medication")
                      }
                    >
                      BL
                    </Button>
                  )}
                </>
              )}
            </span>
          </Space>
        );
      },
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      ellipsis: true,
    },
    {
      title: "DOS Add",
      dataIndex: "dos_add",
      key: "dos_add",
      ellipsis: true,
    },
    {
      title: "Auditor Notes",
      dataIndex: "auditor_notes",
      key: "auditor_notes",
      ellipsis: true,
    },
    {
      title: "Query Text",
      dataIndex: "query_text",
      key: "query_text",
      ellipsis: true,
    },
  ];

  const handleChange = (pagination, filters, sorter) => { };

  const getAge = (dateString) => {
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  return (
    <>
      <Row>
        <Typography.Title level={2} style={{ float: "left" }}>
          Member Chart Review
        </Typography.Title>
      </Row>
      <Collapse>
        <Panel
          className="panel-backgroud-color"
          key="1"
          header={
            <Row>
              <Col span={6}>
                <Row>
                  <Typography level={4} className="member-data-tab">
                    Name:
                  </Typography>
                  <Typography level={5} className="member-data-content">
                    {memberData?.pat_name}
                  </Typography>
                </Row>
              </Col>
              <Col span={6}>
                <Row>
                  <Typography level={4} className="member-data-tab">
                    DOB:
                  </Typography>
                  <Typography level={5} className="member-data-content">
                    {moment(memberData?.birth_date).format("YYYY-MM-DD")}
                  </Typography>
                </Row>
              </Col>
              <Col span={6}>
                <Row>
                  <Typography level={4} className="member-data-tab">
                    PCP:
                  </Typography>
                  <Typography level={5} className="member-data-content">
                    {memberData?.pcp_prov_name}
                  </Typography>
                </Row>
              </Col>
              <Col span={6}>
                <Row>
                  <Typography level={4} className="member-data-tab">
                    Group:
                  </Typography>
                  <Typography level={5} className="member-data-content">
                    {memberData?.pcp_group}
                  </Typography>
                </Row>
              </Col>
            </Row>
          }
        >
          <Row>
            <Col span={6}>
              <Row>
                <Col span={24}>
                  <Row>
                    <Col span={12}>
                      <Typography.Title
                        level={5}
                        style={{
                          margin: 0,
                          textAlign: "start",
                          fontSize: "12px",
                        }}
                      >
                        HICN
                      </Typography.Title>
                      <Typography.Title
                        level={4}
                        style={{ margin: 0, textAlign: "start" }}
                      >
                        {memberData?.pat_id}
                      </Typography.Title>
                    </Col>
                    <Col span={12}>
                      <Typography.Title
                        level={5}
                        style={{
                          margin: 0,
                          textAlign: "start",
                          fontSize: "12px",
                        }}
                      >
                        GENDER
                      </Typography.Title>
                      <Typography.Title
                        level={4}
                        style={{ margin: 0, textAlign: "start" }}
                      >
                        {memberData?.gender === "M" ? "Male" : "Female"}
                      </Typography.Title>
                    </Col>
                  </Row>
                </Col>
              </Row>
              <Row>
                <Col span={24}>
                  <Row style={{ margin: "15px 0" }}>
                    <Col span={12}>
                      <Typography.Title
                        level={5}
                        style={{
                          margin: 0,
                          textAlign: "start",
                          fontSize: "12px",
                        }}
                      >
                        GAPS
                      </Typography.Title>
                      <Typography.Title
                        level={4}
                        style={{ margin: 0, textAlign: "start" }}
                      >
                        {memberData?.gaps_count}
                      </Typography.Title>
                    </Col>
                    <Col span={12}>
                      <Typography.Title
                        level={5}
                        style={{
                          margin: 0,
                          textAlign: "start",
                          fontSize: "12px",
                        }}
                      >
                        PREMIUM THROUGH
                      </Typography.Title>
                      <Typography.Title
                        level={4}
                        style={{ margin: 0, textAlign: "start" }}
                      >
                        2023-12-12
                      </Typography.Title>
                    </Col>
                  </Row>
                </Col>
              </Row>
              <Row>
                <Col span={24}>
                  <Row style={{ margin: "15px 0" }}>
                    <Col span={12}>
                      <Typography.Title
                        level={5}
                        style={{
                          margin: 0,
                          textAlign: "start",
                          fontSize: "12px",
                        }}
                      >
                        AGE
                      </Typography.Title>
                      <Typography.Title
                        level={4}
                        style={{ margin: 0, textAlign: "start" }}
                      >
                        {getAge(memberData?.birth_date)}
                      </Typography.Title>
                    </Col>
                    <Col span={12}>
                      <Typography.Title
                        level={5}
                        style={{
                          margin: 0,
                          textAlign: "start",
                          fontSize: "10px",
                        }}
                      >
                        CONTRACT
                      </Typography.Title>
                      <Typography.Title
                        level={4}
                        style={{ margin: 0, textAlign: "start" }}
                      >
                        {memberData?.contract}
                      </Typography.Title>
                    </Col>
                  </Row>
                </Col>
              </Row>
              <Row>
                <Col span={16}>
                  <Typography.Title
                    level={5}
                    style={{
                      margin: 0,
                      textAlign: "start",
                      fontSize: "12px",
                    }}
                  >
                    ADDRESS
                  </Typography.Title>
                  <Typography.Title
                    level={4}
                    style={{ margin: 0, textAlign: "start" }}
                  >
                    12124, Main SL, Dallas, TX, 75234.
                  </Typography.Title>
                </Col>
              </Row>
            </Col>
            <Col span={18}>
              <Table
                className="table-striped-rows medication-table mmrDetails"
                bordered
                pagination={{ hideOnSinglePage: true }}
                columns={mmrDetailsColumn}
                dataSource={filteredMMRData}
                onChange={handleChange}
                colorFillAlter="#1677ff"
              />
            </Col>
          </Row>
        </Panel>
        <Panel
          className="customPanelBgColor"
          header={
            <Row className="membersRowDesign">
              {riskTypes.map((type) => {
                return (
                  <Col span={6} style={{ paddingLeft: "15px" }}>
                    <Row align={"middle"}>
                      <Tooltip title={riskFactors(type?.type, type?.value)}>
                        <Row justify="center" align={"middle"}>
                          <div
                            className={`risk-progress-bar ${riskColor(type?.type, type?.value) === "green"
                              ? "minor-risk"
                              : riskColor(type?.type, type?.value) ===
                                "yellow"
                                ? "medium-risk"
                                : riskColor(type?.type, type?.value) === "red"
                                  ? "high-risk"
                                  : "no-risk"
                              }`}
                          ></div>
                          <div
                            className={`risk-progress-bar ${riskColor(type?.type, type?.value) === "yellow"
                              ? "medium-risk"
                              : riskColor(type?.type, type?.value) === "red"
                                ? "high-risk"
                                : "no-risk"
                              }`}
                          ></div>
                          <div
                            className={`risk-progress-bar ${riskColor(type?.type, type?.value) === "red"
                              ? "high-risk"
                              : "no-risk"
                              }`}
                          ></div>
                          <Typography.Title
                            style={{
                              margin: "5px 0",
                              textAlign: "start",
                              fontSize: "14px",
                            }}
                          >
                            {type?.value}%
                          </Typography.Title>
                          <Typography.Title
                            level={5}
                            style={{ margin: "5px 10px", textAlign: "start" }}
                          >
                            {type?.name}
                          </Typography.Title>
                        </Row>
                      </Tooltip>
                    </Row>
                  </Col>
                );
              })}
            </Row>
          }
          key="2"
        >
          <List
            grid={{ gutter: 16, column: 4 }}
            dataSource={riskDataSourceView}
            renderItem={(item) => (
              <List.Item className="list-items chronic-cond">
                <Card title={item.title}>{item.data}</Card>
              </List.Item>
            )}
          />
        </Panel>
        <Panel className="customPanelBgColor" header="Member Insights" key="3">
          <List
            grid={{ gutter: 16, column: 3 }}
            dataSource={memberInsightsData}
            renderItem={(item) => (
              <List.Item className="list-items chronic-cond">
                <Card title={item.title}>
                  {item.title === "Vitals" ? (
                    <Table
                      className="table-striped-rows medication-table"
                      bordered
                      pagination={{ hideOnSinglePage: true }}
                      columns={vitalsColumn}
                      dataSource={vitalDataSource}
                      onChange={handleChange}
                      colorFillAlter="#1677ff"
                    />
                  ) : item.title === "Gaps" ? (
                    <Table
                      className="table-striped-rows medication-table"
                      bordered
                      pagination={{ hideOnSinglePage: true }}
                      columns={gapsColumn}
                      dataSource={gapsDataSource}
                      onChange={handleChange}
                      colorFillAlter="#1677ff"
                    />
                  ) : (
                    <Table
                      className="table-striped-rows medication-table"
                      bordered
                      pagination={{ hideOnSinglePage: true }}
                      columns={chronicColumns}
                      dataSource={item?.data}
                      onChange={handleChange}
                      colorFillAlter="#1677ff"
                    />
                  )}
                </Card>
              </List.Item>
            )}
          />
        </Panel>
        <Panel
          className="customPanelBgColor"
          header="Suspected Conditions"
          key="4"
        >
          <Table
            className="table-striped-rows medication-table"
            bordered
            columns={suspectedColumns}
            dataSource={suspectDataSource}
            onChange={handleChange}
            colorFillAlter="#1677ff"
          />
        </Panel>
        <Panel
          className="customPanelBgColor"
          header="Diagnosis Conditions"
          key="5"
          extra={
            <button
              style={{ cursor: "pointer" }}
              type="primary"
              onClick={() => showModal("diagnosisExpand")}
            >
              + Add Diagnosis
            </button>
          }
        >
          <Table
            className="table-striped-rows medication-table"
            bordered
            columns={columns}
            dataSource={diagnosisData}
            onChange={handleChange}
            colorFillAlter="#1677ff"
          />
        </Panel>
        <Panel
          className="customPanelBgColor"
          header="Medications"
          key="6"
          extra={
            <button
              style={{ cursor: "pointer" }}
              type="primary"
              onClick={() => showModal("medicationExpand")}
            >
              + Add Medication
            </button>
          }
        >
          <Table
            className="table-striped-rows medication-table"
            bordered
            columns={medicationColumns}
            dataSource={medicationData}
            onChange={handleChange}
            colorFillAlter="#1677ff"
          />
        </Panel>
      </Collapse>
      {isModalOpen && (
        <ModalComponent
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          submitForm={submitForm}
          formType={formType}
        />
      )}
      <SideDrawer onClose={onClose} openDrawer={openDrawer} />
      <ConfirmModal open={emrModal} setOpen={setEMRModal} rowData={rowData} />
    </>
  );
};

export default MemberNewView;
