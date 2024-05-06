import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

export const Sidebar = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const doSearch = (e) => {
    e.preventDefault();
    let mySearch= e.target.search_field.value;
    navigate("/search/"+mySearch, {repalce: true});
  } 
  return (
    <aside className='lateral'>
      <div className='search'>
        <h3 className='title'>Search</h3>
        <form onSubmit={doSearch}>
          <input type="text" name="search_field" placeholder='product name or description ...'/>
          <input type="submit" id="search" value="Search"/>
        </form>
      </div>
    </aside>
  )
}
