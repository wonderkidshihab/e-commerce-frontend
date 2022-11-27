import axios from "axios";

const ApiClient = axios.create({
    baseURL: "http://127.0.0.1:8000/api/v1",
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": localStorage.getItem('token') && `Bearer ${localStorage.getItem("token")}`
    },
});

export default ApiClient;