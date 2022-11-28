// Use tailwind css

import { useNavigate } from "react-router-dom";

function NavBar() {
    const navigate = useNavigate();
    const logOut = async () => {
        localStorage.clear();
        navigate("/");
    }
    return (
        <div className="navbar bg-base-100">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                        <li><a href="#s">Item 1</a></li>
                        <li tabIndex={0}>
                            <a className="justify-between" href="#f">
                                Parent
                                <svg className="fill-current" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z" /></svg>
                            </a>
                            <ul className="p-2">
                                <li><a href="#s">Submenu 1</a></li>
                                <li><a href="#s">Submenu 2</a></li>
                            </ul>
                        </li>
                        <li><a href="#s">Item 3</a></li>
                    </ul>
                </div>
                <a className="btn btn-ghost normal-case text-xl" href="/">E-Commerce</a>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal p-0">
                    <li><a href="/categories">Categories</a></li>
                    <li tabIndex={0}>
                        <a href="#s">
                            Parent
                            <svg className="fill-current" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" /></svg>
                        </a>
                        <ul className="p-2">
                            <li><a href="#s">Submenu 1</a></li>
                            <li><a href="#s">Submenu 2</a></li>
                        </ul>
                    </li>
                    <li><a href="#s">Item 3</a></li>
                </ul>
            </div>
            <div className="navbar-end">
                {
                    localStorage.getItem("token") ? (
                        <div className="dropdown dropdown-end">
                            <div tabIndex={0} className="m-2 btn btn-ghost">
                                <div className="avatar placeholder">
                                    <div className="bg-neutral-focus text-neutral-content rounded-full w-10">
                                        <span className="text-3xl">
                                            {localStorage.getItem("username")?.charAt(0).toUpperCase()}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <ul tabIndex={0} className="p-2 shadow menu dropdown-content bg-base-100 rounded-box w-52">
                                <li><a href="#s">Profile</a></li>
                                <li><a href="#s">Settings</a></li>
                                <li><button onClick={logOut}>Logout</button></li>
                            </ul>
                        </div>
                    ) : (
                        <a className="btn mr-2" href="/login">Login</a>
                    )
                }
                {
                    localStorage.getItem("token") ? (
                        <></>
                    ) : (
                        <a className="btn btn-primary" href="/register">Sign Up</a>
                    )
                }
            </div>
        </div>

    );
}

export default NavBar;