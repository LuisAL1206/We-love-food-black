import React from 'react';
import {useQuery} from 'react-apollo-hooks';
import gql from 'graphql-tag';
import Layout from '../common/Layout';
import PostCard from '../components/PostCard';
import authHOC from '../utils/authHOC';

const PROFILE = gql`

    {
        me{
            first_name
            last_name
            posts{
                _id
                title,
                is_active
            }
        }
    } 

`;

function Me(){
    const {data, loading, errors} = useQuery(PROFILE);
    console.log(data);
    if (loading) return <h2>Carrgando...</h2>;
    if (errors) return <h3>Errores al cargar.</h3>;

    return(
        <Layout
            head={`${data.me.first_name} ${data.me.last_name}`}
            subhead="Mi perfil"
        >
            <div className="container">
                <div className="row">
                <div className="col-lg-8 col-md-10 mx-auto">
                    {
                        data.me.posts.filter(post => post.is_active).map( post =>
                            <PostCard
                            title={post.title}
                            author={data.me.first_name}
                            id={post._id}
                            key={post._id}
                            edit
                            remove
                            />
                        )
                    }
                </div>
                </div>
            </div>
        </Layout>
    );
}

export default Me;
