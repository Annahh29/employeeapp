"use client";

import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, message } from "antd";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useAuthActions, useAuthState } from "../../Provider/auth";
import styles from "../login/styles.module.css";
import { useRouter } from "next/navigation";
import { FaUserCircle } from "react-icons/fa";
import { Credentials } from "./../../Provider/auth/interface";

const Login = () => {
  const { login } = useAuthActions();
  let authToken: string | null;
  const [userNameOrEmailAddress, setUsername] = useState("");
  const [credentials, setCredentials] = useState<Credentials>({
    userNameOrEmailAddress: "",
    password: "",
  });
  const [password, setPassword] = useState("");
  const { push } = useRouter();

  const onFinish = async (values: Credentials) => {
    console.log("Received values of form: ", values);

    try {
      await login(credentials);
      authToken = localStorage.getItem("authToken");
      console.log("authToken", authToken);
      if (authToken) {
        message.success("Login successful");
        push("/EmployeeList");
      } else {
        message.error("Wrong password or username");
      }
    } catch (error) {
      message.error("An error occurred while logging in");
    }
  };

  return (
    <Form
      name="normal_login"
      className={styles.loginForm}
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish} // Handle form submission
    >
      <Form.Item
        name="username"
        rules={[
          {
            required: true,
            message: "Please input your Username!",
          },
        ]}
      >
        <Input
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder="Username"
          onChange={(e) =>
            setCredentials({
              ...credentials,
              userNameOrEmailAddress: e.target.value,
            })
          }
        />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: "Please input your Password!",
          },
        ]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
          onChange={(e) =>
            setCredentials({ ...credentials, password: e.target.value })
          }
        />
      </Form.Item>
      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          className={styles.loginFormButton}
        >
          Sign in
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Login;
