import React, {useEffect, useState} from 'react'
import {useParams, useHistory, Link} from 'react-router-dom'
import axiosWithAuth from '../util/axiosWithAuth'
import Styled from  'styled-components'
import NavBar from './navBar'
import video from '../assets/riceVid.mp4'

const RecipesDiv = Styled.div`
width: 100%;
height: 100vh;
#videoBG {
            position: fixed;
            z-index: -1;
            height: 100vh;
            width: 100%;
            /* top: 0;
            right: 0 !important;
            left: 0 !important; */
            padding: none;
            overflow-x: hidden;
            background-repeat: no-repeat;
            /* background-size: cover; */
            margin: 0;
            padding: 0;
        }
`

const RecipeSoloDiv = Styled.div`
    max-width: 500px;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 45%;
    min-width: 350px;
    max-width: 500px;
    margin: 2rem auto;
    border-radius: 20px;
    background-color: rgba(74, 198, 215, 0.9);
    box-sizing: border-box;
    box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.25);
    font-family: Poppins;
    font-size: 3.5rem;
    img{
        width:100%;
        border-radius: 20px;
        min-height: 250px;
        max-height: 400px;
    }
    button, a{
        background-color: #68BBB8;
        box-shadow: 4px 4px 0px #FF91BB;      
        box-sizing: border-box;
        border: 2px solid #FF91BB;
        border-radius: 15px;
        width: 65%;
        height: 40px;
        color: white;
        margin: 2% 0;
        font-family: Poppins;
        text-transform: uppercase;
        font-size: 2rem;
        text-align: center;
    }
    button:focus, a:focus{
        outline: none;
    }
    button:hover, a:hover{
        transform: scale(1.1);
    }
  #delete{
    background-color: #E81B23;
    box-shadow: 4px 4px 0px #FFD95C;
    border: 2px solid #FFD95C;
    margin-bottom: 2rem;
  }
  a{
    display: flex;
    align-items: center;
    justify-content: center;
  }
`

const RecipePage = () => {
  const [ingredients, setIngredients] = useState([])
  const [recipe, setRecipe] = useState([])
  const [instructions, setInstructions] = useState([])
  const params = useParams()
  const history = useHistory()
  const id = params.id

  useEffect(() => {
    console.log("this is working")
    axiosWithAuth()
    .get(`/recipes/${id}/ingredients`)
    .then(res => {
      console.log(res)
      setIngredients(res.data.data)
      axiosWithAuth()
      .get(`/recipes/${id}/instructions`)
      .then(res => {
        console.log(res)
        setInstructions(res.data.data)
      })
      axiosWithAuth()
      .get(`/recipes/${id}`)
      .then(res => {
        console.log(res)
        setRecipe(res.data.data)
      })
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const deleteRecipe = (id) => {
    axiosWithAuth()
    .delete(`/recipes/${id}`)
    .then((res) => {
      history.push('/recipes')
    })
  }

  return (
    <RecipesDiv>
    <NavBar />
    <RecipeSoloDiv>
      <div id='image-container'>
        <img alt="recipe pic" src={recipe.imageURL} />
      </div>
      <div>{recipe.name} </div>
      <div>Category: {recipe.category}</div>
      <div>Source: {recipe.source}</div>
      <ul>{ingredients.map(ingredient => <li>{ingredient.ingredient}</li>)}</ul>
      <ol>{instructions.map(instruction => <li>{instruction.instruction}</li>)}</ol>
      <Link to={`/editRecipe/${recipe.id}`}>Edit Recipe</Link>
      <button id='delete' onClick={() => deleteRecipe(recipe.id)}>Delete Recipe</button>
    </RecipeSoloDiv>
      <video id='videoBG' poster='../src/assets/poster.png' autoPlay muted loop>
        <source src={video} type='video/mp4'/>
      </video>
    </RecipesDiv>
  )

}

export default RecipePage