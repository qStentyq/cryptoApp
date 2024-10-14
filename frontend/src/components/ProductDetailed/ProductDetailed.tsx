import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { storageResponse } from "../Store";
import "./ProductDetailed.scss";
import "../Product.scss";

function ProductDetail() {
    const [localData, setLocalData] = useState<storageResponse[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const data = await fetch("http://localhost:8000/products/");
            const json = await data.json();
            setLocalData(json);
        };

        fetchData().catch(console.error);
    }, []);

    const { productId } = useParams();
    const thisProduct = localData.find((prod) => prod.id === productId);

    return (
        <div>
            {thisProduct ? (
                <div className='product__container'>
                    <h1>{thisProduct.name}</h1>
                    <p>Price: ${thisProduct.price}</p>
                    <p>{thisProduct.description}</p>
                    <Link to='/store'>
                        {" "}
                        <button className=' button-44 button-45 return__button'>return to store</button>
                    </Link>
                </div>
            ) : (
                "Product not found"
            )}
        </div>
    );
}

export default ProductDetail;
