import React from "react"
import ParentDiv from '../styles/recipeforms'
import video from '../assets/riceVid.mp4'
import NavBar from './navBar'

const RecipeForm = props => {
const {formErrors, formValues, inputChange, postNewRecipe, disabled} = props

const submit = evt => {
    evt.preventDefault()
    const newRecipe = {
      name: formValues.name.trim(),
      source: formValues.source.trim(),
      category: formValues.category,
      imageURL: formValues.imageURL
    }
    postNewRecipe(newRecipe)
  }

  const onInputChange = evt => {
    const { name, value } = evt.target
    inputChange(name, value)
  }

    return(
        <ParentDiv>
            <NavBar/>
                <form onSubmit={submit}>
                    <h2>Add Your Recipe!</h2>
                <div className='errors'>
                    <div id='titleError'>{formErrors.name}</div>
                </div>
                    <label htmlFor='title'>
                        <input
                            type='text'
                            name='name'
                            value={formValues.name}
                            placeholder='Enter name of recipe'
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
                            placeholder='Enter source of recipe'
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
                            placeholder='Enter URL of image'
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

                        <button onSubmit={submit} disabled={disabled} id='submitBtn'>Add Recipe</button>

                </form>
                <video id='videoBG' poster='../src/assets/poster.png' autoPlay muted loop>
                    <source src={video} type='video/mp4'/>
                </video>
         </ParentDiv>
    )
}

export default RecipeForm