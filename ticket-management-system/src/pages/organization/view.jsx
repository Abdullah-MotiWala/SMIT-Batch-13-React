import { Form, Input, Row, Col } from "antd";
import { useParams } from "react-router";
import { db } from "../../lib/firebase";
import { getDoc, doc } from "firebase/firestore";
import { DB_Collections } from "../../lib/constants";
import { useEffect } from "react";

const View = () => {
  const { id } = useParams();
  const [form] = Form.useForm();

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

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="wrapper">
      <Form
        // form={form}
        disabled
        className="login-form"
        validateMessages={{ required: "Please fill this '${name}'" }}
        labelCol={{ span: 4 }}
        labelAlign="left"
      >
        <Row gutter={6}>
          <Col sm={24}>
            <Form.Item label="Name" name={"name"}>
              <Input />
            </Form.Item>
          </Col>
          <Col sm={24}>
            <Form.Item label="Location" name={"location"}>
              <Input />
            </Form.Item>
          </Col>
          <Col sm={24}>
            <Form.Item label="NTN No." name={"ntn"} type="number">
              <Input type="number" />
            </Form.Item>
          </Col>
          <Col sm={24}>
            <Form.Item label="Contact No." name={"contact"}>
              <Input type="number" />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default View;
