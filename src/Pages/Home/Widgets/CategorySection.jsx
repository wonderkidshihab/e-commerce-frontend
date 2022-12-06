// use tailwindcss for styling
import { useEffect, useState } from "react";
import ApiClient from "../../../Utils/ApiClient";
function CategorySection() {
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const fetchCategories = async () => {
        setLoading(true);
        var response = await ApiClient.get("/categories/");
        if (response.status === 200) {
            setCategories(response.data);
        } else {
            setError(response.data);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    if (loading) {
        return <div className="text-center">Loading...</div>;
    }

    if (error) {
        return <div className="text-center">{error}</div>;
    }




    return (
        <div className="container mx-auto">
            <div className="flex flex-wrap ">
                {categories.map((category) => (
                    <div className="m-1">
                        <div className="flex items-center justify-center bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
                            {category.name}
                        </div>
                    </div>

                ))}
            </div>
        </div>
    );
}

export default CategorySection;