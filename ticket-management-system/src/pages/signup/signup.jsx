import { Form, Input, Button, Row, Col } from "antd";
import "./signup.css";
import { PAKISTAN_CNIC_PATTERN, PASSWORD_PATTERN } from "../../lib/regex";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../lib/firebase";
import { addDoc, collection } from "firebase/firestore";
import { DB_Collections, USER_Roles } from "../../lib/constants";
import { useEffect } from "react";
import useLoginRedirect from "../../hooks/useLoginRedirect";

const Signup = () => {
  const navigate = useNavigate();

  const saveUserDetails = async (userDetails, userId) => {
    const userDetailsPayload = { userId, ...userDetails };
    const collectionRef = collection(db, DB_Collections.USERS);
    console.log(collectionRef);
    await addDoc(collectionRef, userDetailsPayload);
  };

  const saveUserAndGetId = async (email, password) => {
    const response = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    return response.user.uid;
  };

  const getUserConfirmation = async () => {
    const result = await Swal.fire({
      title: "Confirmation",
      text: "Are You Sure, You want to sign up",
      showCancelButton: true,
      confirmButtonText: "Sure",
    });

    return result.isConfirmed;
  };

  const onFinish = async (data) => {
    const { email, password, ...userDetails } = data;
    try {
      const isUserConfirmed = await getUserConfirmation();
      if (isUserConfirmed) {
        const userId = await saveUserAndGetId(email, password);
        await saveUserDetails(
          { ...userDetails, role: USER_Roles.ADMIN },
          userId
        );
        navigate("/dashboard");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="wrapper">
      <Form
        className="signup-form"
        onFinish={onFinish}
        validateMessages={{ required: "Please fill this '${name}'" }}
        labelCol={{ span: 4 }}
        labelAlign="left"
        // labelWrap={true}
        // layout="vertical"

        // colon={false}
        // initialValues={initialValues}
        // disabled={true}
        // size="large"
      >
        <Row gutter={6}>
          <Col md={12} sm={24}>
            <Form.Item
              //   colon={false}
              //   extra={<p>Pakistan</p>}
              //   help={<p>Pakistan</p>}
              label="Full Name"
              name={"fullName"}
              rules={[
                {
                  required: true,
                  // message: "Full name is required",
                  whitespace: true,
                },
                // {
                //   min: 3,
                //   message: "Full name must be greater than 3",
                //   //   warningOnly: true,
                // },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col md={12} sm={24}>
            <Form.Item
              label="Username"
              name={"username"}
              rules={[
                {
                  required: true,
                  // message: "Email is required",
                  whitespace: true,
                },
                {
                  min: 3,
                  message: "Must be greater than or equal to 3 char",
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col md={12} sm={24}>
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
          <Col md={12} sm={24}>
            <Form.Item
              label="Phone No."
              name={"phone"}
              rules={[
                {
                  min: 11,
                  message: "Enter valid mobile",
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col md={12} sm={24}>
            <Form.Item
              label="CNIC"
              name={"cnic"}
              rules={[
                {
                  required: true,
                  message: "CNIC is required",
                },
                {
                  pattern: PAKISTAN_CNIC_PATTERN,
                  message: "Please enter valid cnic",
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col md={12} sm={24}>
            <Form.Item
              label="Password"
              name={"password"}
              type={"password"}
              rules={[
                {
                  required: true,
                  message: "Password is required",
                },
                {
                  pattern: PASSWORD_PATTERN,
                  message:
                    "Password must be 8+ chars, include uppercase, lowercase, number & special char.",
                },
              ]}
            >
              <Input.Password />
            </Form.Item>
          </Col>
          <Col md={12} sm={24} offset={12}>
            <Form.Item style={{ textAlign: "right" }}>
              <Button type="primary" htmlType="submit" ali>
                Submit
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default Signup;
