import { Form, Input, Button, Row, Col, Select } from "antd";
import { useNavigate } from "react-router";
import { db } from "../../lib/firebase";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import {
  DB_Collections,
  TICKET_PRIORITIES,
  TICKET_STATUSES,
} from "../../lib/constants";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";

const AddForm = () => {
  const navigate = useNavigate();
  const [fetchedUsers, setFetchedUsers] = useState([]);

  const saveTicketDetails = async (ticketDetails, userId) => {
    const ticketDetailsPayload = { userId, ...ticketDetails };
    const collectionRef = collection(db, DB_Collections.TICKETS);
    await addDoc(collectionRef, ticketDetailsPayload);
  };

  const getUserConfirmation = async () => {
    const result = await Swal.fire({
      title: "Confirmation",
      text: "Are You Sure, You want to add ticket",
      showCancelButton: true,
      confirmButtonText: "Sure",
    });

    return result.isConfirmed;
  };

  const onFinish = async (data) => {
    try {
      const isUserConfirmed = await getUserConfirmation();
      if (isUserConfirmed) {
        const userId = localStorage.getItem("userId");
        const assignedUser = fetchedUsers.find(
          (u) => u.value === data.assignedTo
        );
        const payload = { ...data, assignedUser, createdAt: new Date() };
        await saveTicketDetails(payload, userId);
        navigate("/ticket");
      }
    } catch (err) {
      console.log(err);
    }
  };
  const fetchData = async () => {
    const userId = localStorage.getItem("userId");
    const parsedData = [];

    const collectionRef = collection(db, DB_Collections.USERS);
    const customQuery = where("createdBy", "==", userId);
    const qRef = query(collectionRef, customQuery);
    const querySnapshot = await getDocs(qRef);

    querySnapshot.forEach((doc) => {
      const { fullName: label } = doc.data();
      const value = doc.id;
      const data = { value, label };
      parsedData.push(data);
    });

    setFetchedUsers(parsedData);
  };

  useEffect(() => {
    fetchData();
  }, []);
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
              label="Name"
              name={"name"}
              rules={[
                {
                  required: true,
                  whitespace: true,
                },
                {
                  min: 2,
                },
                {
                  max: 25,
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col sm={24}>
            <Form.Item
              label="Priority"
              name={"priority"}
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Select options={TICKET_PRIORITIES} />
            </Form.Item>
          </Col>
          <Col sm={24}>
            <Form.Item
              label="Status"
              name={"status"}
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Select options={TICKET_STATUSES} />
            </Form.Item>
          </Col>
          <Col sm={24}>
            <Form.Item
              label="Assigned To"
              name={"assignedTo"}
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Select options={fetchedUsers} />
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

export default AddForm;
