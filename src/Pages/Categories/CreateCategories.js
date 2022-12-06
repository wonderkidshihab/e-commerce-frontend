import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ApiClient from "../../Utils/ApiClient";
import NavBar from "../../Widgets/Navbar";
// [
//   {
//     "id": 1,
//     "name": "SmartPhone",
//     "description": "All the smartphones will be here",
//     "created_at": "2022-11-28T00:14:52.878497Z",
//     "updated_at": "2022-11-28T00:19:24.410281Z",
//     "icon": null,
//     "sub_category": null
//   }
// ]
function CreateCategories() {
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const createCategory = async (e) => {
        e.preventDefault();
        // var response = await ApiClient.post("/categories/", {
        //     name: e.target.name.value,
        //     description: e.target.description.value,
        //     icon: e.target.icon.value,
        //     sub_category: e.target.sub_category.value
        // });
        var reponse = await fetch("http://127.0.0.1:8000/api/v1/categories/", {
            method: "POST",
            headers: {
                "Authorization": localStorage.getItem('token') && `Bearer ${localStorage.getItem("token")}`,
                // "content_type":'multipart/form-data', 'boundary':'----WebKitFormBoundary7MA4YWxkTrZu0gW'
                "Content-Type": "multipart/form-data",
                "Accept": "application/json",

            },
            body: {
                name: e.target.name.value,
                description: e.target.description.value,
                icon: e.target.icon.value,
                sub_category: e.target.sub_category.value
            }
        });
        if (reponse.status === 201) {
            navigate("/categories");
        } else {
            setError(reponse.body.data.toString());
        }
    }
    return (
        <>
            <NavBar />
            {
                error && <div className="alert alert-error">{error}</div>
            }
            <div className="card mx-auto w-11/12">
                <div className="card-body">
                    <form onSubmit={createCategory}>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input name="name" type="text" className="input input-bordered" placeholder="Name" />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Description</span>
                            </label>
                            <textarea name="description" type="text" className="input input-bordered max-h-96 h-32" placeholder="Description" />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Icon</span>
                            </label>
                            <input name="icon" type="file" className="input input-bordered" placeholder="Icon" />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Sub Category</span>
                            </label>
                            <input name="sub_category" type="text" className="input input-bordered" placeholder="Sub Category" />
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn btn-primary" type="submit">Create</button>
                        </div>
                    </form>
                </div>
            </div>

        </>
    );
}

export default CreateCategories;