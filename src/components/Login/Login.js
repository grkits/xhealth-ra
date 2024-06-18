import bannerImg from "../../assets/login_banner.jpg";
import { Button, Form, Input, Layout } from "antd";
import { Link } from "react-router-dom";
import { Col, Row } from "antd";
import "./Login.css";
const { Content } = Layout;

function Login() {
  const onFinish = (values) => {
    console.log("Success:", values);
    localStorage.setItem("userName", values?.username);
    window.location.assign('/risk-adjustment/dashboard')
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <Content>
      <Row>
        <Col span={13}>
          <img
            className="banner-image-props"
            src={bannerImg}
            alt="banner-logo"
          />
        </Col>
        <Col span={11}>
          <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            className="form-layout"
          >
            <Form.Item
              label="Username"
              name="username"
              rules={[
                { required: true, message: "Please input your username!" },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Link to="/reset-password" className="hyperlink-allignment">
                Reset Password?
              </Link>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </Content>
  );
}

export default Login;
