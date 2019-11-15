/* import React from "react"; */
/* import { Link } from 'react-router-dom'; */
import { useMutation } from 'react-apollo-hooks';
import gql from 'graphql-tag';
import React, { Component } from 'react';
import axios from 'axios';
import './carta.css';
import { Link } from 'react-router-dom/cjs/react-router-dom';

/* const DELETE_POST = gql`

  mutation deletePost($id:ID!){
    deleteOnePost(id:$id)
  }

`;

function PostCard({title, author, id, edit, remove}) {
  const [deletePost] = useMutation(DELETE_POST);


    return (
        <>
        <div className="post-preview">
          <Link to={`/post/${id}`}>
            < h2 className= "post-title" >
              {title}
            </h2>
          </Link>
          < p className= "post-meta" > Picante
            <Link to="#">{author}</Link> 
          </p>
          <p>
            {
              edit ? <Link to={`/update/${id}`}>Agregar</Link>: <></>
            } 
            {
              remove ? <button onClick={
                () => {

                    deletePost({variables:{id}}).then(()=>{
                      window.location.reload();
                    })
                  
                }
              }>Borrar post </button>
              : <></>
            }           
          </p>
        </div>
        </>
    );
}

export default PostCard; */



export class FoodCardOrder extends Component {

  state = {
    platillos: [],
    searchValue: ""
  }

  componentDidMount() {
    this.getPlatillos()

  }

  getPlatillos() {
    axios.get(`https://tamales-server.herokuapp.com/all/food`)
      .then(response => {
        this.setState({
          platillos: response.data,
        })
      })
      .catch(err => console.log(err))
  }

  borrarPlatillo(id) {
    axios.put(`https://tamales-server.herokuapp.com/update/food${id}`)
      .then(res => {
        this.getPlatillos()
      })
      .catch(err => console.log(err))
  }

  buscaPlatilos = (e) => {
    this.setState({
      searchValue: e.target.value.toLowerCase()
    })
  }


  /*  function myFunction() {
       <div class="alert alert-warning alert-dismissible fade show" role="alert">
       <strong>Tu platillo se ah Añadido a tu Carrito de Compra</strong> Si deseas Ordenar solo eso dirigete a tu Carrito 
       <button type="button" class="close" data-dismiss="alert" aria-label="Close">
         <span aria-hidden="true">&times;</span>
       </button>
     </div>
   } */

  renderPlatillos = () => {
    return this.state.platillos.map(platillo => {
      if (platillo.platillo.toLowerCase().startsWith(this.state.searchValue)) {
        return (
          <div className="card" >
            <img src={platillo.img_platillo} style={{ width: '100%' }} className="imgprro card-img-top" alt="Platillo Recomendado" />
            <div className="card-body">
              <h5 className="card-title">{platillo.platillo}</h5>
              <h5 className="card-text">{platillo.picante}</h5>
              <img className="logoRest" src={platillo.restaurante} alt="restaurante" />
              <p className="card-text">{platillo.descripcion}</p>
              <div>
                <button type="button" class="btn btn-outline-success"><Link className="nav-link" to="/create">Carrito</Link></button>
              </div>
            </div>
          </div>
        )
      }
    })

  }

  render() {
    return (
      <div className='card-container'>
        <div className="input-group mb-3">
          <input type="text" className="form-control" placeholder="¿De que tienes antojo?" onChange={this.buscaPlatilos} />
        </div>
        {
          this.renderPlatillos()
        }
      </div>
    )

  }
}

export default FoodCardOrder