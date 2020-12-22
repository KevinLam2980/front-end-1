import React, { useState} from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { RecipeContext } from "./contexts/Context";
import './index.css'
import Login from "./components/Login";
import Register from "./components/Register";
import Recipes from "./components/Recipes";
import RecipeForm from "./components/createPost";
import InstructionsForm from "./components/addInstructionsForm";
import IngredientsForm from "./components/addIngredientsForm";
import RecipePage from "./components/RecipePage";
import EditRecipe from "./components/EditRecipe";
import SignIn from './components/SignIn'
import SignUp from './components/SignUp'

function App() {
	const [recipes, addRecipes] = useState([]);
	const [searchValue, setSearchValue] = useState("");

	return (
		<Router>
			<div className="App">
				<Route exact path="/" component={Register} className="RegisterComponent" />

				<RecipeContext.Provider value={{ recipes, addRecipes, searchValue, setSearchValue }}>
					<Route exact path="/login" component={Login} />
					<Route exact path="/recipes" component={Recipes} />
					<Route exact path="/create" component={RecipeForm} />
					<Route exact path="/instructions/:id" component={InstructionsForm} />
					<Route exact path="/ingredients/:id" component={IngredientsForm} />
					<Route exact path="/signin" component={SignIn}/>
					<Route exact path="/signup" component={SignUp}/>
					<Route path="/recipe/:id" component={RecipePage} />
					<Route path="/editRecipe/:id" component={EditRecipe} />
				</RecipeContext.Provider>
			</div>
		</Router>
	);
}

export default App;
