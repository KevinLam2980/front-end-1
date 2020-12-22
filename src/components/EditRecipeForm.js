import React, {useEffect, useState} from 'react'
import {useParams, useHistory} from 'react-router-dom'
import ParentDiv from '../styles/recipeforms'
import * as yup from 'yup'
import newRecipe from '../validation/newRecipe'
import video from '../assets/riceVid.mp4'
import NavBar from './navBar'
import axiosWithAuth from '../util/axiosWithAuth'

const initialFormValues = {
  name: '',
  source: '',
  category: '',
  imageURL: ''
}

const initialFormErrors = {
  name: '',
  source: '',
  category: '',
  imageURL: ''
}

const EditRecipeForm = props => {
  const [formValues, setFormValues] = useState(initialFormValues)
  const [recipe, setRecipe] = useState([])
  const params = useParams()
  const id = params.id
  const [formErrors, setFormErrors] = useState(initialFormErrors) 
  const history = useHistory()


  const goHome = () => {
    history.push('/recipes')
  }

  useEffect(() => {
    axiosWithAuth()
    .get(`/recipes/${id}`)
    .then(res => {
        setFormValues(res.data.data)
  })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const postNewRecipe = () => {
    axiosWithAuth()
    .put(`/recipes/${id}`, formValues)
      .then(res => {
        setRecipe([res.data, ...recipe])
        setFormValues('')
        console.log(res.data)
      })
      .catch(err => {
        console.log(err)
        debugger
      })
  }

  const submit = evt => {
    evt.preventDefault()
    const newRecipe = {
      name: formValues.name.trim(),
      source: formValues.source.trim(),
      category: formValues.category.trim(),
      imageURL: formValues.imageURL
    }
    postNewRecipe(newRecipe)
  }

  const onInputChange = (event) => {
    const {name} = event.target
    const {value} = event.target
    yup
      .reach(newRecipe, name)
      .validate(value)
      .then(valid => {
        setFormErrors({
          ...formErrors,
          [name]: "",
        })
      })
      .catch(err => {
        setFormErrors({
          ...formErrors,
          [name]: err.errors[0],
        })
      })
    setFormValues({
      ...formValues,
      [name]: value 
    })
  }

  return (
    <ParentDiv>
            <NavBar/>
                <form onSubmit={submit}>
                    <h2>Edit Your Recipe!</h2>
                <div className='errors'>
                    <div id='titleError'>{formErrors.name}</div>
                </div>
                    <label htmlFor='title'>
                        <input
                            type='text'
                            name='name'
                            value={formValues.name}
                            onChange={onInputChange}
                        ></input>
                    </label>
                    <div className='errors'>
                    <div id='titleError'>{formErrors.source}</div>
                </div>
                    <label htmlFor='source'>
                        <input
                            type='text'
                            name='source'
                            value={formValues.source}
                            placeholder={recipe.source}
                            onChange={onInputChange}
                        ></input>
                    </label>
                    <div className='errors'>
                    <div id='titleError'>{formErrors.imageURL}</div>
                </div>
                    <label htmlFor='imgSRC'>
                        <input
                            type='text'
                            name='imageURL'
                            value={formValues.imageURL}
                            placeholder={recipe.imageURL}
                            onChange={onInputChange}
                        ></input>
                    </label>
                    <div className='errors'>
                    <div id='titleError'>{formErrors.category}</div>
                </div>
                    <label htmlFor='category'>
                        <select
                            onChange={onInputChange}
                            value={formValues.category}
                            name='category'
                        >
                            <option value='' >Food category</option>
                            <option value='Pizza' >Pizza</option>
                            <option value='Sandwich' >Sandwich</option>
                            <option value='Pasta' >Pasta</option>
                            <option value='Rice' >Rice</option>
                            <option value='Meat' >Meat</option>
                            <option value='Vegan' >Vegan</option>
                            <option value='Festive' >Festive</option>
                            <option value='Breakfast' >Breakfast</option>
                            <option value='Lunch' >Lunch</option>
                            <option value='Dinner' >Dinner</option>
                            <option value='Snack' >Snack</option>
                        </select>
                    </label>

                    <button onSubmit={submit} id='submitBtn'>Update Recipe</button>
                    <button onClick={goHome} id='submitBtn'>Return to Recipes</button>

                </form>
      <video id='videoBG' poster='../src/assets/poster.png' autoPlay muted loop>
        <source src={video} type='video/mp4'/>
      </video>
    </ParentDiv>
  )

}
export default EditRecipeForm