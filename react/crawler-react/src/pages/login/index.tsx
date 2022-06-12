import { Button, Form, Input } from "antd";
import React, { useState } from "react";
import { Navigate } from "react-router";
import "./style.css";
import request from "../../request";
import qs from "qs";

const Login: React.FC = () => {
  const [isLogin, setIsLogin] = useState<boolean>(false);

  const onFinish = (values: { username: string; password: string }) => {
    request
      .post(
        "/login",
        qs.stringify({
          password: values.password,
        }),
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      )
      .then((res) => {
        if (res.data) {
          setIsLogin(res.data);
        }
      });
  };

  if (isLogin) {
    return <Navigate to={"/"} />;
  }

  return (
    <div className="login-page">
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
