import { Form, Input, Button, Row, Col } from "antd";
import { useNavigate } from "react-router";
import { db } from "../../lib/firebase";
import { addDoc, collection } from "firebase/firestore";
import { DB_Collections } from "../../lib/constants";
import Swal from "sweetalert2";

const OrganizationForm = () => {
  const navigate = useNavigate();

  const saveOrganizationDetails = async (organizationDetails, userId) => {
    const organizationDetailsPayload = { userId, ...organizationDetails };
    const collectionRef = collection(db, DB_Collections.ORGANIZATIONS);
    console.log(collectionRef);
    await addDoc(collectionRef, organizationDetailsPayload);
  };

  const getUserConfirmation = async () => {
    const result = await Swal.fire({
      title: "Confirmation",
      text: "Are You Sure, You want to add organization",
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
        await saveOrganizationDetails(data, userId);
        navigate("/organization");
      }
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
              label="Location"
              name={"location"}
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col sm={24}>
            <Form.Item
              label="NTN No."
              name={"ntn"}
              type="number"
              rules={[
                {
                  required: true,
                },
                // {
                //   type: "number",
                // },
              ]}
            >
              <Input type="number" />
            </Form.Item>
          </Col>
          <Col sm={24}>
            <Form.Item
              label="Contact No."
              name={"contact"}
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input type="number" />
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

export default OrganizationForm;
