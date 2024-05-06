import React, { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useForm } from "../../hooks/useForm";
import { Request } from "../../helpers/Request";
import { Global } from "../../helpers/Global";

export const Edit = () => {
    const { form, sent, updated } = useForm({});
    const [result, setResult] = useState("no_sent");
    const [product, setProduct] = useState({});
    const params = useParams();

    useEffect(() => {
        listProduct();
    }, [])

    const listProduct = async () => {
        const { data } = await Request(Global.url + "products/" + params.id, "GET");

        if (data.status == "Success") {
            setProduct(data.product);
        }

    }

    const editProduct = async (e) => {
        e.preventDefault();
        let newProduct = form;
        //save
        const { data, loaded } = await Request(Global.url + "products/" + params.id, "PUT", newProduct);

        if (data.status == "Success") {
            setResult("Saved");

        } else {
            setResult("Error");
        }

        //upload iamge
        const fileInput = document.querySelector("#file")

        if (fileInput.files[0]) {
   
            const formData = new FormData();
            formData.append('file', fileInput.files[0]);

            const imageUpload = await Request(Global.url + "upload_image/" + params.id, "POST", formData, true);

            if (imageUpload.data.status == "Success") {
                setResult("Saved");

            } else {
                setResult("Error");
            }
        } else {
            setResult("Saved");
        }
    }

    return (
        <div className="jumbo">
            <h1>Edit Product</h1>
            <p>Form to edit product: {product.name}</p>
            
            <strong>{result == "Saved" ? "Product saved" : ""}</strong>
            <strong>{result == "Error" ? "Wrong input " : ""}</strong>
            {
                //Mount form
                <form className="form" onSubmit={editProduct}>
                    <div className="form-group">
                        <label htmlFor="name" >Name</label>
                        <input type="text" name="name" onChange={updated} defaultValue={product.name} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="description" >Description</label>
                        <textarea type="text" name="description" onChange={updated} defaultValue={product.description} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="file" >Image</label>
                        <div className="mask">
                            {product.image != "default.png" && <img src={Global.url + "image/" + product.image} />}
                            {product.image == "default.png" && <img src="https://scontent.fcuz2-1.fna.fbcdn.net/v/t1.6435-9/121418724_113355490541321_6659374567389540742_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=5f2048&_nc_ohc=pa5X552vz5QQ7kNvgHaFZ-W&_nc_ht=scontent.fcuz2-1.fna&oh=00_AfDaTJcapiKIfD70zkaUxlUfRkXM9mQKJEgqUpqpaej5eQ&oe=66600149" />}
                        </div>
                        <input type="file" name="file" id="file" onChange={updated} />
                    </div>

                    <input type="submit" value="Save" className="btn btn-success" />

                </form>

            }
        </div>
    )
}