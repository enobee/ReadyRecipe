import { useEffect } from "react";
import axios from "axios";

// components
import RecipeDetails from "../components/RecipeDetails";
import { useRecipesContext } from "../hooks/useRecipesContext";
import { useAuthContext } from "../hooks/useAuthContext";

const Home = () => {
  const { recipes, dispatch } = useRecipesContext();
  const { user } = useAuthContext();

 
  useEffect(() => {
    const fetchRecipes = async () => {
      const response = await axios.get("http://localhost:3001/apis/recipe/", {
        headers: { Authorization: `Bearer ${user.token}` },
      });

      const json = await response.data;

      if (response.status === 200) {
        dispatch({ type: "SET_RECIPE", payload: json });
      }

    };
    fetchRecipes();
  }, [dispatch, user]);
  

  return (
    <div className="home">
      <div className="recipes">
        {recipes &&
          recipes.map((recipe) => (
            <RecipeDetails recipe={recipe} key={recipe._id} />
          ))}
      </div>
    </div>
  );
};

export default Home;
