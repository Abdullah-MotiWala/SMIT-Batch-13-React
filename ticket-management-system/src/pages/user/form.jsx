import { Form, Input, Button, Row, Col, Select } from "antd";
import "./user.css";
import { PAKISTAN_CNIC_PATTERN, PASSWORD_PATTERN } from "../../lib/regex";
import Swal from "sweetalert2";
import { useNavigate, useSearchParams } from "react-router";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../lib/firebase";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { DB_Collections, USER_Roles } from "../../lib/constants";
import { useEffect, useState } from "react";

const UserForm = () => {
  let [search, setSearch] = useSearchParams();

  console.log(search.get("id"), search.get("view"), "===search");
  const navigate = useNavigate();
  const [organizations, setOrganizations] = useState();

  const saveUserDetails = async (userDetails, userId) => {
    const userDetailsPayload = { userId, ...userDetails };
    const docRef = doc(db, DB_Collections.USERS, userId);
    await setDoc(docRef, userDetailsPayload);
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
      text: "Are You Sure, You want to add user",
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
        const createdBy = localStorage.getItem("userId");
        await saveUserDetails(
          { ...userDetails, createdBy, role: USER_Roles.EMPLOYEE },
          userId
        );
        navigate("/user");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const fetchOrganizationData = async () => {
    const userId = localStorage.getItem("userId");
    const parsedData = [];

    const collectionRef = collection(db, DB_Collections.ORGANIZATIONS);
    const customQuery = where("userId", "==", userId);
    const qRef = query(collectionRef, customQuery);
    const querySnapshot = await getDocs(qRef);
    querySnapshot.forEach((doc) => {
      const { name: label } = doc.data();
      const value = doc.id;
      const data = { label, value };
      parsedData.push(data);
    });
    setOrganizations(parsedData);
  };

  useEffect(() => {
    fetchOrganizationData();
  }, []);
  return (
    <div className="wrapper">
      <Form
        className="user-form"
        onFinish={onFinish}
        validateMessages={{ required: "Please fill this '${name}'" }}
        // disabled
        labelCol={{ span: 4 }}
        labelAlign="left"
        // initialValues={{ fullName: "abc" }}
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
          {/* <Col md={12} sm={24}>
            <Form.Item
              label="Organization"
              name={"organizationId"}
              rules={[
                {
                  required: true,
                  message: "Organization is required",
                },
              ]}
            >
              <Select showSearch options={organizations} />
            </Form.Item>
          </Col> */}
          <Col md={12} sm={24} offset={12}>
            <Form.Item style={{ textAlign: "right" }}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default UserForm;
