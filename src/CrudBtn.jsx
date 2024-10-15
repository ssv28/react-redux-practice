import { Field, Form, Formik } from 'formik'
import React, { useState } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { addData, deleteData, updateData } from "./FeildCrud";
import './App.css';

const CrudBtn = () => {
  const dataItem = useSelector((state) => state.feilds.data);
  console.log(dataItem);
  
  const initialval = useSelector((state) => state.feilds.initialval);
  const dispatch = useDispatch();
  const [editIndex, setEditIndex] = useState(null);

  const editData = (i) => {
    setEditIndex(i);
  }

  return (
    <div className="container">
      <h1>Redux CRUD</h1>
      <Formik
        enableReinitialize
        initialValues={editIndex !== null ? dataItem[editIndex] : initialval}
        onSubmit={(values, { resetForm }) => {
          // console.log(values);
          
          if (editIndex === null) {
            dispatch(addData(values));
          } else {
            dispatch(updateData({ index: editIndex, updateItem: values }));
            setEditIndex(null); // Reset editIndex after updating
          }
          resetForm();
        }}
      >
        <Form>
          <label>Name</label>
          <Field type="text" name="name" className="form-control" placeholder="Enter name" />
          
          <label>Email</label>
          <Field type="email" name="email" className="form-control" placeholder="Enter email" />
          
          <label>Password</label>
          <Field type="password" name="password" className="form-control" placeholder="Enter password" />

          <button type='submit' className="btn btn-primary mt-3">
            {editIndex === null ? 'Add Data' : 'Update Data'}
          </button>
        </Form>
      </Formik>

      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email ID</th>
            <th>Password</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {dataItem.map((item, i) => (
            <tr key={i}>
              <td>{item.name}</td>
              <td>{item.email}</td>
              <td>{item.password}</td>
              <td>
                <button type='button' className="btn btn-delete" onClick={() => dispatch(deleteData(i))}>
                  Delete
                </button>
                <button type='button' className="btn btn-edit" onClick={() => editData(i)}>
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default CrudBtn;
