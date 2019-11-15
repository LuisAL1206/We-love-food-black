import React, { useState, useEffect } from "react";
import image from '../img/comida-mexicana.png';

function Head(props) {
    const [title, setTitle] = useState(props.title);//parametro por default
    const [subheading, setSubheading] = useState(props.subheading);
    const cover = props.cover ? props.cover : image;
    return (
        <>
            <header className="masthead" style={{backgroundImage: `url('${cover}')`}}>
                <div className="overlay"></div>
                <div className="container">
                <div className="row">
                    <div className="col-lg-8 col-md-10 mx-auto">
                    <div className="site-heading">
                        <h1>{title}</h1>
                        <span className="subheading">{subheading}</span>
                    </div>
                    </div>
                </div>
                </div>
            </header> 
        </>
    );
}
export default Head;