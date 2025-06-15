import { Form, Input, Button, Row, Col } from "antd";
import { useNavigate, useParams } from "react-router";
import { db } from "../../lib/firebase";
import { addDoc, collection, getDoc, doc, updateDoc } from "firebase/firestore";
import { DB_Collections } from "../../lib/constants";
import Swal from "sweetalert2";
import { useEffect } from "react";

const Edit = () => {
  const { id } = useParams();
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const docRef = doc(db, DB_Collections.ORGANIZATIONS, id);
      const docSnapShot = await getDoc(docRef);
      console.log(docSnapShot);
      const data = docSnapShot.data();
      form.setFieldsValue(data);
    } catch (e) {
      console.log(e);
    }
  };

  const onFinish = async (value) => {
    const docRef = doc(db, DB_Collections.ORGANIZATIONS, id);
    updateDoc(docRef, value);
    navigate("/organization");
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="wrapper">
      <Form
        form={form}
        onFinish={onFinish}
        className="login-form"
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

export default Edit;
