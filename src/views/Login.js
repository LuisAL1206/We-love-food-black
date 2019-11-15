import React from 'react';
import { useMutation } from 'react-apollo-hooks';
import gql from 'graphql-tag';
import Layout from '../common/Layout';
import Input from '../common/Input'
import useForm from '../hooks/useForm';

const LOGIN_MUTATION = gql`

    mutation LOGIN($email: EmailAddress!,$password: String!) {
        login(email: $email, password: $password){
            token
        }
    }

`;

function Login({history}){
    const [sendLogin] = useMutation(LOGIN_MUTATION);

    const catchData = async(inputs) =>{
        // {variables: { email: "", password:""}}
        const {data, errors} = await sendLogin({variables:{...inputs}});
        if (data) {
            const { login } = data;
            localStorage.setItem('blogToken', login.token);
            history.push('/');
        }
        if(errors) alert(`Error con tu login ${errors}`);
    }

     const {
        inputs,
        handleSubmit,
        handleInputChange,
    } = useForm(catchData);

    return(<>
        <Layout head = "Inicia sesión."
        subhead = "Es hora de cumplir tus antojos." >
        <div className="container">
            <div className="row" style={{ background: 'rgba(255, 255, 255, 0.8)'}}>
            <div className="col-lg-8 col-md-10 mx-auto">
                <form onSubmit={handleSubmit}>
                    <Input
                    name="email"
                    label="Email: "
                    type="text"
                    placeholder="Escribe tu email"
                    value={inputs.email}
                    change={handleInputChange}
                    required={true}
                    ></Input>
                    <Input
                    name="password"
                    label="Password: "
                    type="password"
                    placeholder="Escribe tu password"
                    value={inputs.password}
                    change={handleInputChange}
                    required={true}
                    ></Input>
                <div className="clearfix mt-4">
                    <button className="btn btn-primary float-right" type="submit">
                        Entrar 
                        </button>
                </div>
                </form>
            </div>
            </div>
        </div>
        </Layout>
    </>);
}

export default Login;