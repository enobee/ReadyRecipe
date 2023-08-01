import { useState } from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";

import { useRecipesContext } from "../hooks/useRecipesContext";
import { useAuthContext } from "../hooks/useAuthContext";
import "../index.css";

const CreateRecipe = () => {
  const { user } = useAuthContext();
  const { dispatch } = useRecipesContext();
  const [recipe, setRecipe] = useState({
    name: "",
    ingredients: [],
    instructions: "",
    cookingTime: 0,
  });
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);
  const navigate = useNavigate()

  const handleChange = (event) => {
    const { name, value } = event.target;
    setRecipe({ ...recipe, [name]: value });
  };

  const handleIngredientChange = (event, index) => {
    const { value } = event.target;
    const ingredients = [...recipe.ingredients];
    ingredients[index] = value;
    setRecipe({ ...recipe, ingredients });
  };

  const handleAddIngredient = () => {
    const ingredients = [...recipe.ingredients, ""];
    setRecipe({ ...recipe, ingredients });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

     if (!user) {
       setError("You must be logged in");
       return;
     }

    const response = await axios.post(
      "http://localhost:3001/apis/recipe",
      { ...recipe },
      {
        headers: {'Authorization': `Bearer ${user.token}`}});
      

    const json = response.data;

    if (response.status !== 200) {
      setError(json.error);
      setEmptyFields(json.emptyFields);
    }
    if (response.status === 200) {
      setError(null);
      setEmptyFields([]);
      setRecipe({
        name: "",
        ingredients: [],
        instructions: "",
        cookingTime: 0,
      });
      dispatch({ type: "CREATE_RECIPE", payload: json });
    }

    alert("Recipe Created");
    navigate("/");
  };

  return (
    <div className="create-recipe-container">
      <div className="create-recipe">
        <h2 className="text-[24px] font-[700]">Create Recipe</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={recipe.name}
            onChange={handleChange}
            className={emptyFields.includes("name") ? "error" : "outline-0 border"}
            required
          />

          <label htmlFor="ingredients">Ingredients</label>
          {recipe.ingredients.map((ingredient, index) => (
            <input
              key={index}
              type="text"
              name="ingredients"
              value={ingredient}
              onChange={(event) => handleIngredientChange(event, index)}
              className={emptyFields.includes("ingredient") ? "error" : "outline-0 border"}
              required
            />
          ))}
          <button type="" className="bg-teal-500 text-white p-2 my-2" onClick={handleAddIngredient}>
            Add Ingredient
          </button>
          <label htmlFor="instructions">Instructions</label>
          <textarea
            id="instructions"
            name="instructions"
            value={recipe.instructions}
            onChange={handleChange}
            className={emptyFields.includes("instruction") ? "error" : "outline-0 border"}
            required
          ></textarea>

          <label htmlFor="cookingTime">Cooking Time (minutes)</label>
          <input
            type="number"
            id="cookingTime"
            name="cookingTime"
            value={recipe.cookingTime}
            onChange={handleChange}
            className={emptyFields.includes("cookingTime") ? "error" : "outline-0 border"}
            required
          />
          <button type="submit" className="bg-teal-500 text-white p-2 font-[500]">Create Recipe</button>
        </form>
        {error && <div className="error">{error}</div>}
      </div>
    </div>
  );
};
export default CreateRecipe;
