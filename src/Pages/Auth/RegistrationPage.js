// use tailwindcss

import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ApiClient from "../../Utils/ApiClient";
import NavBar from "../../Widgets/Navbar";

function RegistrationPage() {
    const navigate = useNavigate();
    const params = useParams();
    const [error, setError] = useState(null);
    const login = async (e) => {
        e.preventDefault();
        try {
            const response = await ApiClient.post("/auth/users/", {
                username: e.target.username.value,
                email: e.target.email.value,
                password: e.target.password.value,
            });
            if (response.status === 201) {
                var loginResponse = await ApiClient.post("/auth/login/", {
                    username: e.target.username.value,
                    password: e.target.password.value,
                });
                if (loginResponse.status === 200) {
                    localStorage.setItem("token", loginResponse.data.access);
                    localStorage.setItem("refresh", loginResponse.data.refresh);
                }
                if (params.next) {
                    navigate(params.next);
                } else {
                    navigate("/");
                }
            } else {
                setError("Invalid username or password");
            }
        } catch (error) {
            console.log(error);
            setError(error.response.data ?? error.message);
        }

    };



    return (
        <>
            <NavBar />
            <div className="flex items-center justify-center h-screen">
                <div className="card w-96 bg-base-100 shadow-xl p-5 flex items-center">
                    <form onSubmit={login} className="flex flex-col gap-4 w-full">
                        <h1 className="text-4xl font-bold">Sign Up</h1>
                        <p className="">Please enter your username, email & password to Sign Up.</p>
                        <input type="text" placeholder="Username" className="input w-full max-w-xs input-bordered" name="username" />
                        {
                            error?.username && <p className="text-red-500">{error.username}</p>

                        }
                        <input type="text" placeholder="Email" className="input w-full max-w-xs input-bordered" name="email" />
                        {
                            error?.email && <p className="text-red-500">{error.email}</p>

                        }
                        <input type="password" placeholder="Password" className="input w-full max-w-xs input-bordered" name="password" />
                        {
                            error?.password && <p className="text-red-500">{error.password}</p>
                        }
                        {
                            error && (
                                <div className="text-red-500 ">
                                    {error.detail ?? error.message}
                                </div>
                            )
                        }
                        <button className="btn btn-primary w-full max-w-xs" type="submit">Sign Up</button>
                    </form>
                </div>
            </div>
        </>

    );
}

export default RegistrationPage;