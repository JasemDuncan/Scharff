import React from 'react'
import { NavLink } from 'react-router-dom'

export const Nav = () => {
  return (
    <nav className="nav">
      <ul>
        <li><NavLink to="/index">Home</NavLink></li>
        <li><NavLink to="/products">Products</NavLink></li>
        <li><NavLink to="/create-product">Create </NavLink></li>
      </ul>
    </nav>
  )
}
