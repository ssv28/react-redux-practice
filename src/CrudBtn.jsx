import { Field, Form, Formik } from 'formik'
import React, {useState} from 'react'
import { useSelector, useDispatch } from "react-redux";
import { addData, deleteData, updateData } from "./FeildCrud";


const CrudBtn = () => {
  const dataItem = useSelector((state) => state.feilds.data)
  const initialval = useSelector((state) => state.feilds.initialval)
  // console.log("data=>", dataItem);
  const dispatch = useDispatch();
  const [editIndex, setEditIndex] = useState(null);

  const editData = (i) => {
    setEditIndex(i);
  }

  return (
    <div>
      <h1>Redux CRUD</h1>
      <Formik
        enableReinitialize
        initialValues={editIndex !== null ? dataItem[editIndex] : initialval}

        onSubmit={(values,{resetForm}) => {
          console.log(values);
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

          Name : <Field
            type="text"
            name="name"
          ></Field><br/>

          Email : <Field
            type="email"
            name="email"
          ></Field><br/>

          Password : <Field
            type="password"
            name="password"
          ></Field><br/><br/>

          <button type='submit'>SUBMIT</button>


        </Form>
      </Formik>


      <br />

      <table border={1}>
        <tr>
          <th>Name</th>
          <th>Email ID</th>
          <th>Password</th>
          <th>Action</th>
        </tr>

        {
          dataItem.map((item, i) => (
            <tr key={i}>
              <td>{item.name}</td>
              <td>{item.email}</td>
              <td>{item.password}</td>
              <td>
                <button type='button' onClick={() => dispatch(deleteData(i))}>DELETE</button>&nbsp;
                <button type='button' onClick={() => editData(i)}>EDIT</button>
              </td>
            </tr>
          ))

        }

      </table>


    </div>
  )
}

export default CrudBtn


