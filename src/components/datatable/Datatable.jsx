import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns, userRows } from "../../datatablesource";
import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  onSnapshot,
} from "firebase/firestore";
import Modal from '../Modal/Modal'
import { db } from "../../firebase";

const Datatable = () => {
  const [data, setData] = useState([]);
  const [student, setStudent] = useState(
    {
      message: "",
      isLoading: false,
    }
  );
  const userId = useRef();
  useEffect(() => {
    // const fetchData = async () => {
    //   let list = [];
    //   try {
    //     const querySnapshot = await getDocs(collection(db, "users"));
    //     querySnapshot.forEach((doc) => {
    //       list.push({ id: doc.id, ...doc.data() });
    //     });
    //     setData(list);
    //     console.log(list);
    //   } catch (err) {
    //     console.log(err);
    //   }
    // };
    // fetchData();

    // LISTEN (REALTIME)
    const unsub = onSnapshot(
      collection(db, "users"),
      (snapShot) => {
        let list = [];
        snapShot.docs.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
        });
        setData(list);
      },
      (error) => {
        console.log(error);
      }
    );

    return () => {
      unsub();
    };
  }, []);
  const handleDialog = async (message, isLoading, nameProduct) => {
    try {
      setStudent({
        message,
        isLoading,
        nameProduct
      })
    } catch (err) {
      console.log(err);
    }
  };
  const handleDelete = async (id) => {
    try {
      // await deleteDoc(doc(db, "users", id));
      handleDialog("Are you sure you want to delete?",true)
      userId.current = id;
      // setData(data.filter((item) => item.id !== id));
    } catch (err) {
      console.log(err);
    }
  };
  const areUSureDelete = async (type) => {
    try {
      if (type) {
        await deleteDoc(doc(db, "users", userId.current));
        setData(data.filter((item) => item.id !== userId.current));
        handleDialog("", false);
      } else {
        handleDialog("", false);
      }
      // setData(data.filter((item) => item.id !== id));
    } catch (err) {
      console.log(err);
    }
  };
  const actionColumn = [
    {
      field: "action",
      headerName: "View/Delete",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link to="/users" style={{ textDecoration: "none" }}>
              <div className="viewButton">View</div>
            </Link>
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row.id)}
            >
              Delete
            </div>
            {
              student.isLoading && (
                <Modal
                  onDialog={areUSureDelete}
                  message={student.message}
                />
              )
            }
          </div>
        );
      },
    },
  ];
  return (
    <div className="datatable">
      <div className="datatableTitle">
        Add New Student
        <Link to="/users/new" className="link">
          Add New
        </Link>
      </div>
      <DataGrid
        className="datagrid"
        rows={data}
        columns={userColumns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
      />
    </div>
  );
};

export default Datatable;
