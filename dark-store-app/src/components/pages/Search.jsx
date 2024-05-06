import React from "react";
import { useState, useEffect } from "react"
import { useParams } from "react-router-dom";
import { Global } from "../../helpers/Global";
import { Request } from "../../helpers/Request";
import { List } from "./List";

export const Search = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const params = useParams();    

    useEffect(() => {
        listProducts();
    }, []);

    useEffect(() => {
        listProducts();
    }, [params]);

    const listProducts = async () => {    

        const {data, loading} = await Request( Global.url + "search/"+params.search, "GET");

        if (data.status == "Success") {
            setProducts(data.products);
        } else {
            setProducts([]);
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