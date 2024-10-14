import { Field, Form, Formik } from 'formik'
import React from 'react'
import { useSelector, useDispatch } from "react-redux";
import { addData, deleteData, updateData } from "./FeildCrud";


const CrudBtn = () => {
  const dataItem = useSelector((state) => state.feilds.data)
  const initialval = useSelector((state) => state.feilds.initialval)
  console.log("data=>", dataItem);
  const dispatch = useDispatch();

  return (
    <div>
      <h1>Redux CRUD</h1>
      <Formik
        enableReinitialize
        initialValues={initialval}

        onSubmit={(values,{resetForm}) => {
          console.log(values);
          dispatch(addData(values))
          resetForm()

        }}
      >
        <Form>

          Name : <Field
            type="text"
            name="name"
          ></Field>

          Email : <Field
            type="email"
            name="email"
          ></Field>

          Password : <Field
            type="password"
            name="password"
          ></Field>

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
                <button type='button' onClick={() => dispatch(updateData(i))}>EDIT</button>
              </td>
            </tr>
          ))

        }

      </table>


    </div>
  )
}

export default CrudBtn
