import { Button, Table } from "antd";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Link } from "react-router";
import { DB_Collections } from "../../lib/constants";
import { db } from "../../lib/firebase";
import { DeleteOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons";

const Organzation = () => {
  // const [currentPage, setCurrentPage] = useState(1);
  const [dataSource, setDataSource] = useState([]);
  const columns = [
    { title: "Name", dataIndex: "name" },
    { title: "Contact", dataIndex: "contact" },
    {
      title: "NTN No.",
      dataIndex: "ntn",
      render: (value) => value || "-",
    },
    {
      title: "Location",
      dataIndex: "location",
      render: (value, record) => {
        console.log(value, record);
        return value.replaceAll(" ", ", ");
      },
    },
    {
      title: "Actions",
      dataIndex: "action",
      render: (_, record) => {
        const { id } = record;
        const onDelete = () => {
          alert(id);
        };
        return (
          <div>
            <Button type="text">
              <EditOutlined />
            </Button>
            <Button type="text" onClick={onDelete}>
              <DeleteOutlined />
            </Button>
            <Button type="text">
              <EyeOutlined />
            </Button>
          </div>
        );
      },
    },
  ];
  const fetchData = async () => {
    const userId = localStorage.getItem("userId");
    const parsedData = [];
    const docRef = collection(db, DB_Collections.ORGANIZATIONS);
    const customQuery = where("userId", "==", userId);
    const qRef = query(docRef, customQuery);
    const querySnapshot = await getDocs(qRef);
    querySnapshot.forEach((doc) => {
      const data = { id: doc.id, ...doc.data() };
      parsedData.push(data);
    });
    console.log(parsedData);
    setDataSource(parsedData);
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div>
      <Link to={"form"}>
        <Button
          style={{ margin: "2px", float: "right" }}
          color="blue"
          variant="solid"
        >
          Add Organization
        </Button>
      </Link>
      <Table
        columns={columns}
        dataSource={dataSource}
        pagination={{
          position: ["bottomCenter"],
          pageSize: 5,
          // current: currentPage,
          // onChange: function () {
          //   alert("page changed");
          //   setCurrentPage((pre) => ++pre);
          // },
        }}
      />
    </div>
  );
};

export default Organzation;
