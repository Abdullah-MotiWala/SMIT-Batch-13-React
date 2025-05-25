import { Form, Input, Button } from "antd";
import "./signup.css";
import { PAKISTAN_CNIC_PATTERN, PASSWORD_PATTERN } from "../../lib/regex";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";

const Signup = () => {
  const navigate = useNavigate();

  const onFinish = async (data) => {
    console.log(data, "===data");
    const result = await Swal.fire({
      title: "Success",
      text: "You have signedup successfully",
      icon: "success",
    });
    if (result.isConfirmed) {
      navigate("/dashboard");
    }
    console.log(result, "===resul");
  };
  return (
    <div className="wrapper">
      <Form
        className="signup-form"
        onFinish={onFinish}
        // colon={false}
        // initialValues={initialValues}
        // disabled={true}
        // size="large"
      >
        <Form.Item
          //   colon={false}
          //   extra={<p>Pakistan</p>}
          //   help={<p>Pakistan</p>}
          label="Full Name"
          name={"fullName"}
          rules={[
            {
              required: true,
              message: "Full name is required",
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
        <Form.Item
          label="Username"
          name={"username"}
          rules={[
            {
              required: true,
              message: "Email is required",
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

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Signup;
