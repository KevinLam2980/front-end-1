import React, {useEffect, useContext} from 'react'
import axiosWithAuth from '../util/axiosWithAuth'
import {RecipeContext} from '../contexts/Context'
import NavBar from './navBar'
import Recipe from './recipeCard'
import Styled from  'styled-components'
import video from '../assets/strawberryVid.mp4'

const RecipesDiv = Styled.div`
display: flex;
flex-wrap: wrap;
justify-content: space-between;
margin: 0 auto 2rem;
max-width: 1100px;
padding: 0 2rem;
#videoBG {
            position: absolute;
            z-index: -1;
            min-height: 50%;
            max-height:100%;
            min-width: 100%;
            /* max-width:100%; */
            /* top: 0; */
            bottom: 0;
            right: 0;
            /* left: 0; */
            padding: none;
            overflow-x: hidden;
            background-repeat: no-repeat;
            background-size: cover;
            /* background-position: center; */
        }
`

const Recipes = () => {

  const {recipes, addRecipes} = useContext(RecipeContext)

  useEffect(() => {
    axiosWithAuth()
    .get('/recipes')
    .then(res => {
      addRecipes(res.data.data)
    })
  }, [addRecipes])

    return (
      <div>
        <NavBar/>
        <RecipesDiv>
          {
          recipes.map(recipe => {
          return <Recipe recipe={recipe}/>
          })
          }
          <video id='videoBG' poster='../src/assets/strawberry.png' autoPlay muted loop>
            <source src={video} type='video/mp4'/>
          </video>
        </RecipesDiv>
    
      </div>
    )
}

export default Recipes