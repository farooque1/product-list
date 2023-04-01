import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Header'
import Sidebar from './Sidebar'

function Home() {
    const [products, setProducts] = useState([]);
    const [colors, setColors] = useState([]);
    const [materials, setMaterials] = useState([]);
    const [selectedColor, setSelectedColor] = useState('All');
    const [selectedMaterial, setSelectedMaterial] = useState('All');
    const [featuredOnly, setFeaturedOnly] = useState([]);

    useEffect(() => {
        axios.get('https://api.sheety.co/af35b536915ec576818d468cf2a6505c/reactjsTest/products', {
            headers: {
                Authorization: 'Bearer Ex9yLyRU7wvyxfblpq5HAhfQqUP1vIyo',
            },
        })
            .then(response => { setProducts(response.data.products); console.log("list of product", response.data.products) })
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
                .then(response => { setFeaturedOnly(response.data); console.log("Feature product", response.data) })
                .catch(error => console.error(error));


     }, []);

    // function getFilteredProducts() {
    //     let filteredProducts = products;
    //     if (featuredOnly) {
    //         return products.filter(product => product.featured);
    //     } else {
    //         return products;
    //     }
    // }

    // function getFilteredProducts() {
    //     let filteredProducts = products;

    //     if (selectedColor !== 'All') {
    //         filteredProducts = filteredProducts.filter(product => product.color === selectedColor);
    //     }
    //     if (selectedMaterial !== 'All') {
    //         filteredProducts = filteredProducts.filter(product => product.material === selectedMaterial);
    //     }

    //     return filteredProducts;
    // }

    console.log(colors);
    console.log(materials);
    // const filteredProducts = getFilteredProducts();


    return (
        <div>
            <Navbar />
            <div className='container-fluid py-4'>
                <div className='row'>
                    <div className='col-2'>
                        <Sidebar />
                    </div>
                    
                    <div className='col-10'>
                    <div className='row'>
                    {products.map(product => {
                    return (
                        <div className="col-md-4 mb-3">
                            <div key={product.id}>
                                <div class="card text-center p-2">
                                    <img class="card-img-top" src={product.image} alt={product.name} height="350px" />
                                    <div class="card-body">
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