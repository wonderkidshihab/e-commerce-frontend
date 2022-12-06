import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import ApiClient from "../../Utils/ApiClient";
import NavBar from "../../Widgets/Navbar";

function CategoriesPage() {
    const navigate = useNavigate();
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
            <div className="alert alert-success shadow-lg w-11/12 mx-auto">
                <div className="">
                    <span>
                        Create a new category
                    </span>
                </div>
                <div className="flex justify-between">
                    <button className="btn " onClick={()=>{navigate('/categories/create')}}>Create</button>
                </div>
            </div>
            {

                loading ? <div>Loading...</div> :
                    error ? <div>{error.response.detail}</div> :

                        <div className="container mx-auto">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {
                                    data?.map(
                                        (category) => (

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

                                        )
                                    )
                                }
                            </div>
                        </div>
            }
        </>
    );
}

export default CategoriesPage;