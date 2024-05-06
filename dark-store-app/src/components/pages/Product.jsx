import React from "react";
import { useState, useEffect } from "react"
import { useParams } from "react-router-dom";
import { Global } from "../../helpers/Global";
import { Request } from "../../helpers/Request";
import { List } from "./List";

export const Product = () => {
    const [product, setProduct] = useState({});
    const [loading, setLoading] = useState(true);
    const params = useParams();

    useEffect(() => {
        listProduct();
    }, [])

    const listProduct = async () => {
        const { data, loading } = await Request(Global.url + "products/" + params.id, "GET");

        if (data.status == "Success") {
            setProduct(data.product);
        }
        setLoading(false);
    }

    return (
        <div className="jumbo" >
            {loading ? "Loading ..." :

                (
                    <>
                        <div className="mask">
                            {product.image != "default.png" && <img src={Global.url + "image/" + product.image} />}
                            {product.image == "default.png" && <img src="https://scontent.fcuz2-1.fna.fbcdn.net/v/t1.6435-9/121418724_113355490541321_6659374567389540742_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=5f2048&_nc_ohc=pa5X552vz5QQ7kNvgHaFZ-W&_nc_ht=scontent.fcuz2-1.fna&oh=00_AfDaTJcapiKIfD70zkaUxlUfRkXM9mQKJEgqUpqpaej5eQ&oe=66600149" />}
                        </div>
                        <h1>{product.name}</h1>
                        <span>{product.date}</span>
                        <p>{product.description}</p>
                    </>
                )
            }

        </div>
    )
}