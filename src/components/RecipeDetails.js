import axios from 'axios';
import formatDistanceToNow from "date-fns/formatDistanceToNow";

import { useRecipesContext } from "../hooks/useRecipesContext";
import { useAuthContext } from "../hooks/useAuthContext";
import "../index.css"

const RecipeDetails = ({ recipe }) => {

  const { user } = useAuthContext();
  const { dispatch } = useRecipesContext();

  const handleClick = async () => {

    if (!user) {
      setError("You must be logged in");
      return;
    }
    const response = await axios.delete(`http://localhost:3001/apis/recipe/${recipe._id}`, {
        headers: {'Authorization': `Bearer ${user.token}`}}); 
    console.log(response)
    const json = await response.data

    if (response.status === 200) {
      dispatch({type: 'DELETE_RECIPE', payload: json})
    }
  }
    return (
      <div className="card">
        <div className="recipe-details">
          <h4>Recipe Name: {recipe.name}</h4>
          <p>
            <strong>Ingredients:</strong>
          </p>
          <ul>
            {recipe.ingredients.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>

          <p>
            <strong>Instructions: </strong>
            {recipe.instructions}
          </p>
          <p>
            <strong>Cooking Time (minutes): </strong>
            {recipe.cookingTime}
          </p>
          <p>
            {formatDistanceToNow(new Date(recipe.createdAt), {
              addSuffix: true,
            })}
          </p>
          <span className="material-symbols-outlined" onClick={handleClick}>
            delete
          </span>
        </div>
      </div>
    );
}


export default RecipeDetails;
