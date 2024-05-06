import React from 'react'
import { Link } from 'react-router-dom'

export const Indexx = () => {
  return (
    <div className='jumbo'>
      <h1>PRODUCTS ON DARK STORE</h1>
      <p>DARK STORE CREATED WITH MERN STAK( Mongo, Express, React, and NodeJS)</p>
      <Link to="/products" className='button button-index'>Products</Link>
    </div>
  )
}
