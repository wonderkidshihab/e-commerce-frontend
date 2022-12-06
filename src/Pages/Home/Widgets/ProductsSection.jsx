import React, { useEffect, useState } from "react";
import ApiClient from "../../../Utils/ApiClient";

function ProductsSection() {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const fetchProducts = async () => {
        setLoading(true);
        var response = await ApiClient.get("/products/");
        if (response.status === 200) {
            setProducts(response.data);
        } else {
            setError(response.data);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    if (loading) {
        return <div className="text-center">Loading...</div>;
    }

    if (error) {
        return <div className="text-center">{error}</div>;
    }
    // use tailwindcss for styling 
    // Product Cards
    return (
        <div className="container mx-auto mt-5">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {products.map((product) => (
                    <div className="card w-96 bg-base-100 shadow-xl">
                        <figure className="px-10 pt-10">
                            <img src={product.thumbnail} alt="Shoes" className="rounded-xl" />
                        </figure>
                        <div className="card-body items-center text-center">
                            <h2 className="card-title">{product.name}</h2>
                            <span className="card-subtitle text-gray-500 border border-gray-400 rounded-md px-4 py-1">{product.price}$</span>
                            <p>{product.description.slice(0, 120)}...</p>
                            <div className="card-actions">
                                <button className="btn btn-primary">Buy Now</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ProductsSection;