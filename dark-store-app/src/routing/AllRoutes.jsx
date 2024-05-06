import React from "react";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";

import { Products } from "../components/pages/Products";
import { Create } from "../components/pages/Create";
import { Header } from "../components/layout/Header";
import { Nav } from "../components/layout/Nav";
import { Sidebar } from "../components/layout/Sidebar";
import { Footer } from "../components/layout/Footer";
import { Search } from "../components/pages/Search";
import { Product } from "../components/pages/Product";
import { Edit } from "../components/pages/Edit";
import { Indexx } from "../components/pages/Indexx";


export const AllRoutes = () => {
    return (
        <BrowserRouter>
            {/*LAYOUT*/}
            <Header />
            <Nav />
            {/*Main content and routes*/}
            <section id="content" className="content">
                <Routes>
                    <Route path="/" element={<Indexx />} />
                    <Route path="/index" element={<Indexx />} />
                    <Route path="/products" element={<Products />} />
                    <Route path="/create-product" element={<Create />} />
                    <Route path="/search/:search" element={<Search />} />
                    <Route path="/product/:id" element={<Product />} />
                    <Route path="/edit/:id" element={<Edit />} />

                    <Route path="*" element = {
                        <div className="jumbo">
                            <h1>ERROR 404</h1>
                        </div>
                    } />

                </Routes>
            </section>
            <Sidebar />
            <Footer />
        </BrowserRouter>
    )
}