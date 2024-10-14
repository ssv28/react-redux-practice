import { configureStore } from "@reduxjs/toolkit"
import FeildCrud from "./FeildCrud"

export default configureStore({
    reducer: {
        feilds: FeildCrud
    }
}) 