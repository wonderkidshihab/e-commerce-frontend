import { useQuery } from "react-query";
import ApiClient from "../../Utils/ApiClient";
import NavBar from "../../Widgets/Navbar";

function CategoriesPage() {
    const fetchCategories = async () => {
        var response = await ApiClient.get("/categories/");
        if (response.status === 200) {
            return response.data;
        }
    }
    const { data, loading, error } = useQuery('categories', fetchCategories);


    return (
        <>
            <NavBar />
            {

                loading ? <div>Loading...</div> :
                    error ? <div>{error.response.detail}</div> :

                        <div className="container mx-auto">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {data?.map((category) => (
                                    // [{ "id": 1, "name": "SmartPhone", "description": "All the smartphones will be here", "created_at": "2022-11-28T00:14:52.878497Z", "updated_at": "2022-11-28T00:19:24.410281Z", "icon": null, "sub_category": null }]

                                    <div className="card w-96 bg-base-100 shadow-xl">
                                        <figure className="px-10 pt-10">
                                            <img src={category.icon} alt="Shoes" className="rounded-xl" />
                                        </figure>
                                        <div className="card-body items-center text-center">
                                            <h2 className="card-title">{category.name}</h2>
                                            <p>{category.description}</p>
                                            <div className="card-actions">
                                                <button className="btn btn-primary">View Products</button>
                                            </div>
                                        </div>
                                    </div>

                                ))}
                            </div>
                        </div>
            }
        </>
    );
}

export default CategoriesPage;