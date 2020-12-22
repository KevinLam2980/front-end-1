import React, {useRef, useEffect} from "react";
import Styled from "styled-components";
import {TweenMax, TimelineLite, Power3} from 'gsap'

const RecipeDiv = Styled.div`
    visibility: hidden;
    &:hover {transform: scale(1.1);
    border: 3px solid #FF91BB;
    transition: 0.3s;}
    max-width: 500px;
    display: flex
    flex-direction: column;
    align-items: center;
    width: 325px;
    /* min-width: 250px;
    max-width: 250px; */
    margin: 3rem 0 0;
    border-radius: 20px;
    background-color: rgba(74, 198, 215, 0.7);
    box-sizing: border-box;
    box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.25);
    font-family: 'Merienda-Regular';
    font-size: 2.5rem;
    text-align: center;
    color: black;
    height: 350px;
    img{
        width:100%;
        border-radius: 20px;
        height: 200px
    }
    h2{
        padding: 0 1rem;
    }
    p{
        padding: 0 1rem;
    }
`;



const RecipeCard = (props) => {
    let app = useRef(null) 
    
    let tl = new TimelineLite()
    
    useEffect(() => {
        TweenMax.to(app, 0, {css: {visibility: 'visible'}})
        tl.from(app, 1.2, {y: 1280, ease: Power3.easeOut})
        .from(app, 2, {rotate:15, ease: Power3.easeOut}, .3)
        .from(app, 2, {scale:1.1, ease: Power3.easeOut}, .3)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
	const { recipe } = props;
	return (
		<RecipeDiv ref={el => app = el}>
			<div id="image-container">
				<img alt="recipe pic" src={recipe.imageURL}/>
			</div>
			<h2>{recipe.name} </h2>
			<p>Category: {recipe.category}</p>
			<p>Source: {recipe.source}</p>
		</RecipeDiv>
	);
};

export default RecipeCard;
