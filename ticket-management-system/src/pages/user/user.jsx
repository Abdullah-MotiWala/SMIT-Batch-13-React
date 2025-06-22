import { Button, Table } from "antd";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { DB_Collections } from "../../lib/constants";
import { db } from "../../lib/firebase";
import { DeleteOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";

const User = () => {
  const { userId } = useSelector((state) => state.user);
  const [dataSource, setDataSource] = useState([]);
  const navigate = useNavigate();
  const columns = [
    {
      title: "Name",
      dataIndex: "fullName",
    },
    { title: "Phone No", dataIndex: "phone" },
    {
      title: "CNIC",
      dataIndex: "cnic",
    },
    {
      title: "Actions",
      dataIndex: "action",
      render: (_, record) => {
        const { id, fullName } = record;
        const onDelete = async () => {
          const result = await Swal.fire({
            title: "Confirmation",
            text: `Are You Sure, You want to delete ${fullName}`,
            showCancelButton: true,
            confirmButtonText: "Sure",
          });

          if (result.isConfirmed) deleteRecord(id);
        };
        const onView = () => {
          viewRecord(id);
        };
        return (
          <div>
            <Button type="text">
              <EditOutlined />
            </Button>
            <Button type="text" onClick={onDelete}>
              <DeleteOutlined />
            </Button>
            <Button type="text" onClick={onView}>
              <EyeOutlined />
            </Button>
          </div>
        );
      },
    },
  ];
  const fetchData = async () => {
    const parsedData = [];

    const collectionRef = collection(db, DB_Collections.USERS);
    const customQuery = where("createdBy", "==", userId);
    const qRef = query(collectionRef, customQuery);
    const querySnapshot = await getDocs(qRef);

    querySnapshot.forEach((doc) => {
      const data = { id: doc.id, ...doc.data() };
      parsedData.push(data);
    });

    setDataSource(parsedData);
  };

  const deleteRecord = async (id) => {
    const docRef = doc(db, DB_Collections.USERS, id);
    await deleteDoc(docRef);
  };

  const viewRecord = (id) => {
    navigate(`form?view=true&id=${id}`);
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
          Add User
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

export default User;
