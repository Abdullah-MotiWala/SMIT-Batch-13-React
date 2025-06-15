import { Button, Table, Tag } from "antd";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Link } from "react-router";
import { DB_Collections, TICKET_PRIORITIES } from "../../lib/constants";
import { db } from "../../lib/firebase";
import { DeleteOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons";

const Ticket = () => {
  const [dataSource, setDataSource] = useState([]);
  const columns = [
    { title: "Name", dataIndex: "name" },
    {
      title: "Priority",
      dataIndex: "priority",
      render: (value) => (
        <Tag
          color={
            value === TICKET_PRIORITIES[0].value
              ? "error"
              : value === TICKET_PRIORITIES[1].value
              ? "warning"
              : "blue"
          }
        >
          {value}
        </Tag>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      // render: (value) => value || "-",
    },
    {
      title: "Assigned To",
      dataIndex: "assignedUser",
      render: (value) => {
        return value?.label || "-";
      },
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      render: (value) => {
        if (value) {
          return value.toDate().toLocaleString();
        }
        return "-";
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
            <Link to={`edit/${id}`}>
              <Button type="text">
                <EditOutlined />
              </Button>
            </Link>
            <Button type="text" onClick={onDelete}>
              <DeleteOutlined />
            </Button>
            <Link to={`view/${id}`}>
              <Button type="text">
                <EyeOutlined />
              </Button>
            </Link>
          </div>
        );
      },
    },
  ];
  const fetchData = async () => {
    const userId = localStorage.getItem("userId");
    const parsedData = [];
    const docRef = collection(db, DB_Collections.TICKETS);
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
      <Link to={"add"}>
        <Button
          style={{ margin: "2px", float: "right" }}
          color="blue"
          variant="solid"
        >
          Add Ticket
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

export default Ticket;
