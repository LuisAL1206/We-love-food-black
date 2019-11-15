import React, {useState} from 'react';
import { useMutation, useQuery } from 'react-apollo-hooks';
import gql from 'graphql-tag';
import Layout from '../common/Layout';
import Input from '../common/Input' 
import useForm from '../hooks/useForm';
import authHOC from '../utils/authHOC';

const UPDATE_POST = gql `
    mutation updatePost($id: ID!, $data: PostUpdateInput!) {
        updateOnePost(id:$id ,data: $data) {
            _id
        }
    }
`;

const GET_POST = gql `
    query getOnePost($id:ID!){
        getSinglePost(id:$id){
            title
            content
            cover
        }
    }
`;


function Update({match, history}){
    const [sendPost] = useMutation(UPDATE_POST);
    const [cover, setCover] = useState('');
    const [coverPreview, setCoverPreview] = useState('');
    
    const query = useQuery(GET_POST, {
        variables: {
            id: match.params.id
        }
    });

    const catchCover = event => {
    const reader = new FileReader();
    const file = event.target.files[0];

    reader.onloadend = () =>{
        setCover(file);
        setCoverPreview(reader.result);
    } 

    reader.readAsDataURL(file);

    }

    const catchData = async (inputs) => {
        delete inputs.cover;
        const newData = cover ? { ...inputs, cover}: {...inputs}
        const {
            data,
            errors
        } = await sendPost({
                    variables: {
                        id: match.params.id,
                        data: newData,
                    }
                });
        if(data) history.push('/');
        if (errors) alert(`Errores: ${errors}`);
    }

    const {
        inputs,
        handleSubmit,
        handleInputChange,
    } = useForm(catchData, query.data);

    if(query.loading) return <h2>Carrgando...</h2>

        return(<>
      <div>
                <img src="https://cdn4.vectorstock.com/i/1000x1000/25/23/route-dashboard-city-street-map-navigation-town-vector-23292523.jpg" alt=""/>
            </div>
    </>);
}

export default authHOC(Update);

/*
import React, { Component } from 'react'

export class enRuta extends Component {
    render() {
        return (
            <div>
                <img src="https://cdn4.vectorstock.com/i/1000x1000/25/23/route-dashboard-city-street-map-navigation-town-vector-23292523.jpg" alt=""/>
            </div>
        )
    }
}

export default enRuta */
