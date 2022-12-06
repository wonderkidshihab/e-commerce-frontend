import axios from "axios";

const ApiClient = axios.create({
    baseURL: "http://127.0.0.1:8000/api/v1",
    headers: {
        "Accept": "application/json",
        "Authorization": localStorage.getItem('token') && `Bearer ${localStorage.getItem("token")}`
    },
});

ApiClient.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response.status === 401) {
            localStorage.removeItem("token");
            window.location.href = "/login";
        }
        return Promise.reject(error);
    }
);

export default ApiClient;