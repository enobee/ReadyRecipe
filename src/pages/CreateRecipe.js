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
  const domain = process.env.REACT_APP_DOMAIN;

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
    console.log("handleAddIngredients");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("handleSubmit");

     if (!user) {
       setError("You must be logged in");
       return;
     }
     try{
       const response = await axios.post(`${domain}/apis/recipe`,
         { ...recipe },
         {
           headers: { Authorization: `Bearer ${user.token}` },
         }
         );
         const json = response.data;
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

     }catch(error){
       setError(error.response.data.error);
       console.log({ createError: error });
        setEmptyFields(error.response.data.emptyFields);
     }
      
  };

  return (
    <div className="flex w-full items-center justify-center p-9 min-h-screen">
      <div className="p-4 w-[80%] md:w-[40%]">
        <h2 className="text-[24px] font-[700] text-center">Create Recipe</h2>
        <form onSubmit={handleSubmit} className="p-3 bg-white shadow-xl">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={recipe.name}
            onChange={handleChange}
            className={
              emptyFields.includes("name")
                ? "error"
                : "outline-0 border w-full rounded-lg pl-2 py-2"
            }
          />

          <label htmlFor="ingredients">Ingredients</label>
          {recipe.ingredients.map((ingredient, index) => (
            <input
              key={index}
              type="text"
              name="ingredients"
              value={ingredient}
              onChange={(event) => handleIngredientChange(event, index)}
              className={
                emptyFields.includes("ingredient")
                  ? "error"
                  : "outline-0 border w-full my-2 rounded-lg pl-2 py-2"
              }
            />
          ))}
          <div
            className="bg-teal-500 text-white p-2 my-2 w-[130px] text-center"
            onClick={() => handleAddIngredient()}
          >
            Add Ingredient
          </div>
          <label htmlFor="instructions">Instructions</label>
          <textarea
            id="instructions"
            name="instructions"
            value={recipe.instructions}
            onChange={handleChange}
            className={
              emptyFields.includes("instructions")
                ? "error"
                : "outline-0 border w-full rounded-lg pl-2 py-2"
            }
          ></textarea>

          <label htmlFor="cookingTime">Cooking Time (minutes)</label>
          <input
            type="number"
            id="cookingTime"
            name="cookingTime"
            value={recipe.cookingTime}
            onChange={handleChange}
            className={
              emptyFields.includes("cookingTime")
                ? "error"
                : "outline-0 border w-full rounded-lg pl-2 py-2"
            }
          />
          <div className="flex justify">
            <button
              type="submit"
              className="bg-teal-500 text-white p-2 font-[500] "
            >
              Create Recipe
            </button>
          </div>
        </form>
        {error && <div className="error">{error}</div>}
      </div>
    </div>
  );
};
export default CreateRecipe;
