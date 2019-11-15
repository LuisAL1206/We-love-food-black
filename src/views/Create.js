import React, { useState } from 'react';
import { useMutation } from 'react-apollo-hooks';
import gql from 'graphql-tag';
import Layout from '../common/Layout';
import Input from '../common/Input'
import useForm from '../hooks/useForm';
import authHOC from '../utils/authHOC';
import { Link } from 'react-router-dom';
import style from './create.css';

const CREATE_POST = gql`
    mutation createPost($data:PostInput!){
        createNewPost(data:$data){
            _id
        }
    }
`;

function Create({ history }) {
    const [sendPost] = useMutation(CREATE_POST);
    const [cover, setCover] = useState('');
    const [coverPreview, setCoverPreview] = useState('');

    const catchCover = event => {
        const reader = new FileReader();
        const file = event.target.files[0];

        reader.onloadend = () => {
            setCover(file);
            setCoverPreview(reader.result);
        }

        reader.readAsDataURL(file);

    }

    const catchData = async (inputs) => {
        const { data, errors } = await sendPost({ variables: { data: { ...inputs, cover } } });
        if (data) history.push('/');
        if (errors) alert(`Errores: ${errors}`);
    }

    const {
        inputs,
        handleSubmit,
        handleInputChange,
    } = useForm(catchData);

    return (<>
        <Layout head="Tu carrito de compras."
            subhead="Aquí estan tus Antojitos" >
            <div classNameNameName="container">
                <div classNameName="row" style={{ background: 'rgba(255, 255, 255, 0.8)' }}>
                    <div classNameName="col-lg-8 col-md-10 mx-auto">
                        <form onSubmit={handleSubmit}>
                        </form>
                    </div>
                </div>
            </div>

        </Layout>
        <div>
            <div className="card mb-3">
                <img src="https://m.lacasadetono.com.mx/wp-content/uploads/2019/07/Enfrijoladas-1.png" className="card-img-top" alt="..." />
                <div className="card-body">
                    <h5 className="card-title" color ="black">Enfrijoladas</h5>
                    <p className="card-text">Ideal para compartir, tres tortillas perfectamente dobladas y rellenas de pollo desmenuzado y bañadas con una salsa de frijol que muchos imitan pero no se acercan al sabor.</p>
                    <p className="card-text"><small className="text-muted">Tortillas, Queso, Frijol, Crema, Pollo</small></p>
                    <button type="button" className="btn btn-success">
                        <Link to='onRoute'>
                            $50
                        </Link>
                    </button>
                    <button type="button" className="btn btn-danger">Borrar</button>
                </div>
            </div>

        </div>
    </>);


}

export default (Create);

/* import React, { Component } from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom';

export className delivery extends Component {
    render() {
        return (
            <div>
                <div className="card mb-3">
                    <img src="https://m.lacasadetono.com.mx/wp-content/uploads/2019/07/Enfrijoladas-1.png" className="card-img-top" alt="..."/>
                 <div className="card-body">
                     <h5 className="card-title">Enfrijoladas</h5>
                     <p className="card-text">Ideal para compartir, tres tortillas perfectamente dobladas y rellenas de pollo desmenuzado y bañadas con una salsa de frijol que muchos imitan pero no se acercan al sabor.</p>
                     <p className="card-text"><small className="text-muted">Tortillas, Queso, Frijol, Crema, Pollo</small></p>
                     <button type="button" className="btn btn-success">
                     <Link to='onRoute'>
                      <p>$50 Comprar</p>
                    </Link>
                     </button>
                      <button type="button" className="btn btn-danger">Borrar</button>
                </div>
                </div>

            </div>
        )
    }
}

export default delivery */
