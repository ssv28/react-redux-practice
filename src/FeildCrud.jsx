import { createSlice } from "@reduxjs/toolkit";

export const FeildCrud = createSlice({
    name: "feilds",
    initialState: {
        data: [],
        initialval: {
            name: "",
            email: "",
            password: ""
        },
       

    },

    reducers: {
        addData: (state, action) => {
            console.log("add data => ", action.payload);
            state.data.push(action.payload)
        },

        deleteData: (state, action) => {
            console.log("delete data => ", action.payload);
            state.data.splice(action.payload, 1)
        },

        updateData: (state, action,initialval) => {
            console.log("update data => ", action.payload);
            const { index, updateItem } = action.payload;
            state.data.splice(index, 1, updateItem);


        }


    }
})

export default FeildCrud.reducer
export const { addData, deleteData, updateData } = FeildCrud.actions

