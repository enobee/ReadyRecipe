import { useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
// components
import RecipeDetails from "../components/RecipeDetails";
import { useRecipesContext } from "../hooks/useRecipesContext";
import { useAuthContext } from "../hooks/useAuthContext";



const Home = () => {
  const { recipes, dispatch } = useRecipesContext();
  const { user } = useAuthContext();
  const domain = process.env.REACT_APP_DOMAIN;

 
  useEffect(() => {
    const fetchRecipes = async () => {
      const response = await axios.get(
         `${domain}/apis/recipe/`,
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      );

      const json = await response.data;

      if (response.status === 200) {
        dispatch({ type: "SET_RECIPE", payload: json });
      }

    };
    fetchRecipes();
  }, [dispatch, user, domain]);
  

  return (
    <div className="home">
      {!recipes?.length ? (
        <div className="flex min-h-screen items-center justify-center">
          <div className="flex items-center justify-center flex-col">
            <p className="text-[30px] font-semibold mb-2">Found that AmaZing Recipe? Head on to</p>
            <Link className="bg-red-400 p-2 font-[700] " to="/recipe">
              Create Recipe
            </Link>
          </div>
        </div>
      ) : null}
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
