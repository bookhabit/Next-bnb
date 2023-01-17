import user from "./user";
import Axios  from "axios";

const Data = {user};

const axios = Axios.create({
    baseURL:process.env.NEXT_PUBLIC_API_URL,
})

export default Data;