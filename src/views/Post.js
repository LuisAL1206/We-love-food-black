import React from 'react';
import { useQuery } from 'react-apollo-hooks';
import gql from 'graphql-tag';
import Layout from '../common/Layout';

const ONE_POST = gql`
    query getOnePost($id:ID!){
        getSinglePost(id:$id){
            title
            content
            cover
            author{
                first_name
                last_name
            }
        }
    }
`;

function Post({match}){
    const {id} = match.params;
    const {
        loading,
        errors,
        data
    } = useQuery(ONE_POST, {
        variables: {
            id
        }
    });
    if(loading) return <h2>Carrgando</h2>
    if(errors) return <h2>{errors}</h2>
    console.log(data);

    return(
        <Layout head={data.getSinglePost.title}
        cover = {
            data.getSinglePost.cover
        }
        subhead={`Escrito por: ${data.getSinglePost.author.first_name} ${data.getSinglePost.author.last_name}`}>
            <div className="container">
				<div className="row">
					<div className="col-md-8 col-lg-10 mx-auto">
						<p>{data.getSinglePost.content}</p>
					</div>
				</div>
			</div>

        </Layout>
    );
}

export default Post;