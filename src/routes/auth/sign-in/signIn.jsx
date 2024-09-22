import React, { useEffect } from "react";
import { Button, Form, Input, Typography } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useSingInRequestMutation } from "../../../redux/api/authApi";
import { useDispatch } from "react-redux";
import { sigIn } from "../../../redux/slices/authSlices";
import { useSearchParams } from "react-router-dom";

const { Title, Text } = Typography;
const Signin = () => {
  const [singInRequest, { data, isSuccess }] = useSingInRequestMutation();
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const navigete = useNavigate();
  const onFinish = (values) => {
    singInRequest(values);
  };
  useEffect(() => {
    if (isSuccess) {
      dispatch(sigIn(data?.payload.accessToken));
      console.log(data?.payload.accessToken);

      navigete(`${searchParams.get("callback-url") ?? "/"}`);
    }
  }, [isSuccess]);
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div>
      {" "}
      <Form
        name="basic"
        layout="vertical"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        {/* <Title level={1}>Sign in</Title> */}
        <Form.Item
          label="Email"
          name="email"
          initialValue={"mirzarakhmanoff@gmail.com"}
          rules={[
            {
              required: true,
              message: "Please input your email!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          initialValue={"Salom123*"}
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item>
          <Button className="w-full" type="primary" htmlType="submit">
            Sign in
          </Button>
        </Form.Item>
        {/* <Text>
          Don't heve an account? <Link to="/auth/sign-up">Sign Up</Link>
        </Text> */}
      </Form>
    </div>
  );
};

export default Signin;
