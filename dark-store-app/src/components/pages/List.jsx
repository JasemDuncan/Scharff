import React from 'react'
import { Link } from 'react-router-dom'
import { Global } from '../../helpers/Global'
import { Request } from '../../helpers/Request'

export const List = ({products, setProducts}) => {

    const deleteProduct = async(id) => {
        let {data} = await Request(Global.url+"products/"+id, "DELETE")
        
        if(data.status == "Success"){
            let freshProducts = products.filter( product => product._id !== id)
            setProducts(freshProducts);
        }
    }
    return (
        products.map(product => {
            return (
                <article key={product._id} className="product-item">
                    <div className="mask">
                        { product.image !="default.png" && <img src={Global.url+"image/"+product.image}/>}
                        { product.image =="default.png" && <img src="https://scontent.fcuz2-1.fna.fbcdn.net/v/t1.6435-9/121418724_113355490541321_6659374567389540742_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=5f2048&_nc_ohc=pa5X552vz5QQ7kNvgHaFZ-W&_nc_ht=scontent.fcuz2-1.fna&oh=00_AfDaTJcapiKIfD70zkaUxlUfRkXM9mQKJEgqUpqpaej5eQ&oe=66600149" /> }                        
                    </div>
                    <div className="data">
                        <h3 className="title"><Link to={"/product/"+product._id}>{product.name}</Link></h3>
                        <p className="description" >{product.description}</p>

                        <Link to={"/edit/"+product._id} className="edit">Edit</Link>
                        <button className="delete" onClick={()=>{
                            deleteProduct(product._id)
                        }}>Delete</button>
                    </div>
                </article>
            )
        })
    )
}
