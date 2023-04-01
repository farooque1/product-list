import axios from 'axios';
import React, { useEffect, useState } from 'react'

function Sidebar(colors,materials,coloritem,materialitem) {
  // const [colors, setColors] = useState([]);
  // const [materials, setMaterials] = useState([]);

  // useEffect(() => {
  //   axios.get('https://api.sheety.co/af35b536915ec576818d468cf2a6505c/reactjsTest/colors', {
  //     headers: {
  //       Authorization: 'Bearer Ex9yLyRU7wvyxfblpq5HAhfQqUP1vIyo',
  //     },
  //   })
  //     .then(response => { setColors(response.data.colors); console.log("color", response.data.colors) })
  //     .catch(error => console.error(error));

  //   axios.get('https://api.sheety.co/af35b536915ec576818d468cf2a6505c/reactjsTest/material', {
  //     headers: {
  //       Authorization: 'Bearer Ex9yLyRU7wvyxfblpq5HAhfQqUP1vIyo',
  //     },
  //   })
  //     .then(response => { setMaterials(response.data.material); console.log("material", response.data.material) })
  //     .catch(error => console.error(error));

  // }, []);

  return (
    <div>
      <div className='sidebar m-3'>
        <ul style={{ fontSize: '18px', listStyle: 'none', marginLeft: '-47px', fontFamily: 'Arial, Helvetica, sans-serif' }}>

          <h4>Filter Product</h4>
          <h4 className='my-3'>Color</h4>
          {
            colors.map((colorid =>
              <li className="nav-link current" key={colorid.id} onClick={() => { coloritem(colorid.id) }}> {colorid.name}</li>
            ))
          }

          <h4 className='my-3'>Material</h4>
          {
            materials.map((materialid =>
              <li className="nav-link current" key={materialid.id} onClick={() => { materialitem(materialid.id) }}>{materialid.name}</li>
            ))
          }
        </ul>
      </div>

    </div>
  )
}

export default Sidebar