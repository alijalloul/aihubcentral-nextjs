import React from 'react'

import "./Loader.css";

const Loader = ( {stylingT} ) => {
  return (
    <div className={`lds-ring ${stylingT}`}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
    </div>
  )
}

export default Loader