import React from "react";
import { useState, useEffect } from "react"
import { Global } from "../../helpers/Global";
import { Request } from "../../helpers/Request";
import { List } from "./List";

export const Products = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        listProducts();
    }, [])

    const listProducts = async () => {        
        const {data, loading} = await Request( Global.url + "products", "GET");

        if (data.status == "Success") {
            setProducts(data.products);            
        }
        setLoading(false);
    }

    return (
        <>
            {loading ? "Loading ..." : 
                products.length >= 1 ?  
                    <List products = {products} setProducts={setProducts} /> 
                    :  
                    <h1>No products to list</h1> 
            }
        </>
    )
}