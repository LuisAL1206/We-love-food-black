import React from 'react';
import PostCard from '../components/PostCard';
import { useQuery } from 'react-apollo-hooks';
import gql from 'graphql-tag';

const QUERY_POSTS = gql `

    query GETPOST{
        getPosts {
            _id,
            title,
            author{
                first_name
            }
        }
    }

`;

function Feed() {

    const { loading, errors, data } = useQuery(QUERY_POSTS);
    console.log(loading, errors, data);
    return (
          <div className="container">
                 {
                        loading ? <>
                            <h3>Cargando...</h3>
                        </>  
                        :
                        <>
                            {data.getPosts ? 
                            data.getPosts.map( post => (
                                <PostCard title={post.title} edit author={post.author.first_name}
                                id={post._id} key={post._id}/>
                            ))
                            :
                            (<h2>No hay alimentos en tu carrito.</h2>)
                            }
                        </> 
                    }
            < div className = "row" >
                < div className = "col-lg-12 col-md-3 mx-auto" >
                 
            </div>
            <div className="clearfix">
                <a className="btn btn-primary float-right" href="create">
                    Carrito &rarr;</a>
            </div>
        </div>
    </div>
    );
}

export default Feed;