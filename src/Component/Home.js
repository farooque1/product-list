import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Header'

function Home() {
    const [products, setProducts] = useState([]);
    const [productslist, setProductslist] = useState([]);

    const [colors, setColors] = useState([]);
    const [materials, setMaterials] = useState([]);

    const [featuredpage, setFeaturedpage] = useState([]);
    const [featuredOnly, setFeaturedOnly] = useState(false);


    useEffect(() => {
        axios.get('https://api.sheety.co/af35b536915ec576818d468cf2a6505c/reactjsTest/products', {
            headers: {
                Authorization: 'Bearer Ex9yLyRU7wvyxfblpq5HAhfQqUP1vIyo',
            },
        })
            .then(response => {
                setProducts(response.data.products);
                setProductslist(response.data.products);
                console.log("list of product", response.data.products)
            })
            .catch(error => console.error(error))

        axios.get('https://api.sheety.co/af35b536915ec576818d468cf2a6505c/reactjsTest/colors', {
            headers: {
                Authorization: 'Bearer Ex9yLyRU7wvyxfblpq5HAhfQqUP1vIyo',
            },
        })
            .then(response => { setColors(response.data.colors); console.log("color", response.data.colors) })
            .catch(error => console.error(error));

        axios.get('https://api.sheety.co/af35b536915ec576818d468cf2a6505c/reactjsTest/material', {
            headers: {
                Authorization: 'Bearer Ex9yLyRU7wvyxfblpq5HAhfQqUP1vIyo',
            },
        })
            .then(response => { setMaterials(response.data.material); console.log("material", response.data.material) })
            .catch(error => console.error(error));

        axios.get('https://api.sheety.co/af35b536915ec576818d468cf2a6505c/reactjsTest/featured', {
            headers: {
                Authorization: 'Bearer Ex9yLyRU7wvyxfblpq5HAhfQqUP1vIyo',
            },
        })
            .then(response => {
                const featuredProductIds = response.data.featured.map(product => product.productId);
                setFeaturedpage(featuredProductIds);
                console.log("Feature product", featuredProductIds);
            })
            .catch(error => console.error(error));

    }, []);

    console.log("featuredOnly-----", products);

    const handleAllProducts = () => {
        setProductslist(products);
        setFeaturedOnly(false);
    }

    const handleFeaturedProducts = () => {
        let feature = products.filter(product => featuredpage.includes(product.id))
        setFeaturedOnly(true);
        setProductslist(feature);
    }

    const coloritem = (colorfilter) => {
        let color = products.filter(product => colorfilter === product.colorId);
        setProductslist(color)
    }

    const materialitem = (materialfilter) => {
        let material = products.filter(product => materialfilter === product.materialId);
        setProductslist(material)
    }

    return (
        <div>
            {/* <Navbar /> */}
            <div className='container-fluid py-4'>
                <div className='row'>
                    <div className='col-lg-2 col-md-12'>
                    <nav class="navbar navbar-expand-lg navbar-light bg-light">
                <div class="container-fluid">
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                                                  
                        <div className='sidebar m-3'>
                            <ul style={{ fontSize: '18px', listStyle: 'none', marginLeft: '-47px', fontFamily: 'Arial, Helvetica, sans-serif' }}>

                                <h4>Filter Product</h4>
                                <h4 className='my-3'>Color</h4>
                                {
                                    colors.map((colorid =>
                                        <li className="nav-link current" key={colorid.id} onClick={ () => { coloritem(colorid.id) }}> {colorid.name}</li>
                                    ))
                                }

                                <h4 className='my-3'>Material</h4>
                                {
                                    materials.map((materialid =>
                                        <li className="nav-link current" key={materialid.id} onClick={ () => { materialitem(materialid.id) }}>{materialid.name}</li>
                                    ))
                                }
                            </ul>
                        </div>                        
                        </ul>
                    </div>
                </div>
            </nav>

                      

                    </div>
                    <div className='col-lg-10 col-md-12'>
                        <button type="button" className={`btn ${!featuredOnly ? 'btn-primary' : 'btn-secondary'}`} onClick={handleAllProducts}>All Products</button>
                        <button type="button" className={`btn ${featuredOnly ? 'btn-primary' : 'btn-secondary'}`} onClick={handleFeaturedProducts}>Featured Products</button>
                        <div className="d-flex justify-content-between mb-3">
                            <div className="btn-group" role="group">
                            </div>
                        </div>

                        <div className='row'>
                            {productslist.map(product => {
                                return (
                                    <div className="col-lg-3 col-md-12  mb-4">
                                        <div key={product.id}>
                                            <div class="card text-center p-2">
                                                <img class="card-img-top" src={product.image} alt={product.name} height="300px" />
                                                <div class="card-body justify-content-between text-start">
                                                    <h5 class="card-title ">NAME - {product.name}</h5>
                                                    <h5 class="card-title ">COLOR - {colors.find(color => color.id === product.colorId)?.name}</h5>
                                                    <h5 class="card-title ">MATERIAL - {materials.find(material => material.id === product.materialId)?.name}</h5>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home