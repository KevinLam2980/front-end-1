import React, { useState, useEffect } from "react"
import * as yup from 'yup'
import newRecipe from '../validation/newRecipe'
import Form from './createPostForm'
import axiosWithAuth from '../util/axiosWithAuth'
import { useHistory } from 'react-router-dom'

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
  const initialDisabled = false


const CreatePost = (props) => {
    const [recipe, setRecipe] = useState([])
    const [formValues, setFormValues] = useState(initialFormValues)
    const [formErrors, setFormErrors] = useState(initialFormErrors) 
    const [disabled, setDisabled] = useState(initialDisabled) 
    const history = useHistory();

const postNewRecipe = newRecipe => {
    axiosWithAuth()
    .post('https://secret-family-recipes-703.herokuapp.com/api/recipes', newRecipe)
      .then(res => {
        setRecipe([res.data, ...recipe])
        setFormValues(initialFormValues)
        const recipeId = res.data.data.id
        history.push(`/ingredients/${recipeId}`)

        console.log(res.data)
      })
      .catch(err => {
        console.log(err)
        debugger
      })
  }

  const inputChange = ( name, value ) => {
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
 
  useEffect(() => {
    newRecipe.isValid(formValues).then(valid => {
      setDisabled(!valid)
    })
  }, [formValues])

    return (
         <div>
             <Form 
             formErrors={formErrors}
             formValues={formValues}
             disabled={disabled}
             inputChange={inputChange}
             postNewRecipe={postNewRecipe}
             />
         </div>
    )
}

export default CreatePost