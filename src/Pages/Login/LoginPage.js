// use tailwindcss

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ApiClient from "../../Utils/ApiClient";

function LoginPage() {
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const login = async (e) => {
        e.preventDefault();
        try {
            const response = await ApiClient.post("/auth/login/", {
                username: e.target.username.value,
                password: e.target.password.value,
            });
            if (response.status === 200) {
                localStorage.setItem("token", response.data.access);
                navigate("/");
            } else {
                setError("Invalid username or password");
            }
        } catch (error) {
            console.log(error);
            setError(error.response.data.detail ?? error.message);
        }

    };



    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col my-2">
                <form onSubmit={login}>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" >
                            Username
                        </label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Username" name="username" />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" >
                            Password
                        </label>
                        <input className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="******************" name="password" />
                    </div>
                    <div className="flex items-center justify-between">
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit" >
                            Sign In
                        </button>
                        <a className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800 px-2" href="s">
                            Forgot Password?
                        </a>
                    </div>
                </form>
                {
                    error && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mt-5">
                            <strong className="font-bold">Error! </strong>
                            <span className="block sm:inline">{error}</span>
                        </div>
                    )
                }
            </div>
            <p className="text-center text-gray-500 text-xs">
                &copy;2022 SHIHAB UDDIN. All rights reserved.
            </p>
        </div>

    );
}

export default LoginPage;