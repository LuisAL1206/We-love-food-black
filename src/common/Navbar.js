import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import authenticate from '../utils/authenticate';

class Navbar extends Component{
    constructor(props){
        super(props);
        this.state = {
            title: props.title, //<Navbar title="Lo que sea">
        }
    }

    componentDidMount(){
        /**
         * Se ejecuta despues de pintarse.
         * 
         * llamadas a las API
         * Cualquier acción side effect.
         */
    }

    componentDidUpdate(prevProps, prevState){
        //Se ejecuta cada vez que recibe nuevos props o se actualiza el estado
        //Actualizar el estado según un cambio en el componente.
    }

    render() {
        const { isAuthenticated, payload } = authenticate();
        return(
            <>
            <nav className="navbar navbar-expand-lg navbar-light fixed-top" id="mainNav">
                <div className="container">
                {this.state.title}
                <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                    Menu
                    <i className="fas fa-bars"></i>
                </button>
                <div className="collapse navbar-collapse" id="navbarResponsive">
                    <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                        <Link className="nav-link" to="/">Menú</Link>
                    </li>
                { isAuthenticated ? (
                    <>
                        <li className="nav-item">
                        <Link className="nav-link" to="/me">Hola {payload.first_name}!</Link>
                        </li>
                        <li className="nav-item">
                        <Link className="nav-link" to="/create">Arma tu pedido</Link>
                        </li>
                        <li className="nav-item">
                        <Link className="nav-link" to="/logout">Cerrar sesión</Link>
                        </li>
                    </>
                ) : (
                    <>
                    <li className="nav-item">
                        <Link className="nav-link" to="/login">Inica Sesión</Link>
                        </li>
                        <li className="nav-item">
                        <Link className="nav-link" to="/signup">Regístrate</Link>
                        </li>
                </>
                )
                
                }
                    </ul>
                </div>
                </div>
            </nav>
            </>
        );
    };
}

export default Navbar; //ES6 Babel
//module.exports = Navbar; ES5 Common Js