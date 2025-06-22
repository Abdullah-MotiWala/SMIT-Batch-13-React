import { Form, Input, Button, Row, Col } from "antd";
import "./login.css";
import { useNavigate } from "react-router";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../lib/firebase";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../store/slices/user";
import loadingHOC from "../../components/loadingHOC";
import { useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { DB_Collections } from "../../lib/constants";

const Login = () => {
  const { userId } = useSelector((state) => state.user);
  const [isLoading, setIsLoading] = useState(false);
  console.log(userId, "===userIdInLogin");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onFinish = async ({ email, password }) => {
    try {
      setIsLoading(true);
      const res = await signInWithEmailAndPassword(auth, email, password);
      const docRef = doc(db, DB_Collections.USERS, res.user.uid);
      const docSnapShot = await getDoc(docRef);
      console.log(docSnapShot, docSnapShot.data());
      dispatch(loginUser(res.user.uid));
      navigate("/dashboard");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="wrapper">
      <Form
        className="login-form"
        onFinish={onFinish}
        validateMessages={{ required: "Please fill this '${name}'" }}
        labelCol={{ span: 4 }}
        labelAlign="left"
      >
        <Row gutter={6}>
          <Col sm={24}>
            <Form.Item
              label="Email"
              name={"email"}
              rules={[
                {
                  required: true,
                  message: "Email is required",
                  whitespace: true,
                },
                {
                  type: "email",
                  message: "Enter a valid email",
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col sm={24}>
            <Form.Item
              label="Password"
              name={"password"}
              type={"password"}
              rules={[
                {
                  required: true,
                  message: "Password is required",
                },
              ]}
            >
              <Input.Password />
            </Form.Item>
          </Col>
          <Col md={12} sm={24} offset={12}>
            <Form.Item style={{ textAlign: "right" }}>
              {loadingHOC(
                <Button type="primary" htmlType="submit" ali>
                  Submit
                </Button>,
                isLoading
              )}
              {/*  */}
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default Login;
