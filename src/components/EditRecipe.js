import React, {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import * as yup from 'yup'
import newRecipe from '../validation/newRecipe'
import EditRecipeForm from './EditRecipeForm'
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

  const initialDisabled = true


const EditRecipe = (props) => {

    
    const [recipe, setRecipe] = useState([])
    const [formValues, setFormValues] = useState(initialFormValues)
    const [formErrors, setFormErrors] = useState(initialFormErrors) 
    const [disabled, setDisabled] = useState(initialDisabled)
    const params = useParams()
    const id = params.id


const postNewRecipe = (id) => {
    axiosWithAuth()
    .put(`/recipes/${id}`)
      .then(res => {
        setRecipe([res.data, ...recipe])
        setFormValues('')
      })
      .catch(err => {
        console.log(err)
      })
  }

  useEffect(() => {
    axiosWithAuth()
    .get(`/recipes/${id}`)
    .then(res => {
        setFormValues(res.data.data)
  })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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
         <div>
             <EditRecipeForm 
             formErrors={formErrors}
             formValues={formValues}
             initialFormValues={recipe}
             onChange={onInputChange}
             disabled={disabled}
             postNewRecipe={postNewRecipe}
             />
             
         </div>
    )
}

export default EditRecipe