import React from "react";
import { useState } from "react";
import { useForm } from "../../hooks/useForm";
import { Request } from "../../helpers/Request";
import { Global } from "../../helpers/Global";

export const Create =()=>{
    const {form, sent, updated } = useForm({});
    const [result , setResult] = useState("no_sent");
    
    const saveProduct = async (e) => {
        e.preventDefault();        
        let newProduct = form;        
        //save
        const  {data, loaded}= await Request(Global.url+"products","POST", newProduct );

        if(data.status == "Success"){
            setResult("Saved");

        } else {
            setResult("Error");
        }     

        //upload iamge
        const fileInput = document.querySelector("#file")  

        if(data.status == "Success" && fileInput.files[0] ){   
            const formData = new FormData();

            formData.append('file',fileInput.files[0]);

            const imageUpload= await Request(Global.url+"upload_image/"+data.product._id,"POST", formData, true);

            if(imageUpload.data.status== "Success"){
                setResult("Saved");
            } else {
                setResult("Error");
            }            
        }else {
            setResult("Saved");
        }       
    }

    return (
        <div className="jumbo">
            <h1>Create Product</h1>
            <p>Form to create product</p>
            <strong>{result == "Saved"? "Product saved": ""}</strong>
            <strong>{result == "Error"? "Wrong input ": ""}</strong>
            {

                <form className="form" onSubmit={saveProduct}>
                    <div className="form-group">
                        <label htmlFor="name" >Name</label>
                        <input type="text" name = "name" onChange={updated}  />
                    </div>  
                    <div className="form-group">
                        <label htmlFor="description" >Description</label>
                        <textarea type="text" name = "description"  onChange={updated} />
                    </div>  
                    <div className="form-group">
                        <label htmlFor="file" >Image</label>
                        <input type="file" name="file"  id="file"/>
                    </div>  
                    
                    <input type="submit" value="Save" className="btn btn-success" />

                </form>

            }
        </div>
    )
}