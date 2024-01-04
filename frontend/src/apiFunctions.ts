import axios from "axios";
import { RegisterForm } from "./screens/RegisterPage";

const baseUrl = import.meta.env.VITE_SERVER_BASE_URL;

const register = (formData: RegisterForm) => {
    axios.post(`${baseUrl}/api/auth/register`, formData, {withCredentials: true}).then((res) => {
        return res.data;
    }).catch((error) => {
        return error;
    })
}


export {register};