import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";

const Navbar = () => {
  const { logout } = useLogout();
  const { user } = useAuthContext();
  console.log(user)

   const handleClick = () => {
     logout();
   };

  return (
      <div className="h-[90px] shadow-lg flex items-center justify-between px-2  text-white bg-teal-500">
        <Link to="/">
          <h1 className="text-[28px] font-[500] tracking-[2px]">ReadyRecipes</h1>
        </Link>
        <nav className="">
          {user && (
            <div className="flex gap-3 items-center">
              <Link className="bg-red-400 p-2 font-[500]" to="/recipe">Create Recipe</Link>
              <span>{user.email}</span>
              <button className="border border-white p-2 rounded-xl" onClick={handleClick}>Log out</button>
            </div>
          )}

        </nav>
          {!user && (
          <div className="">
            <div className="flex items-center justify-center gap-2">
              <Link className="bg-red-400 p-2 rounded-xl font-[500]" to="/login">Login</Link>
              <Link className="border border-white p-2 rounded-xl" to="/signup">Signup</Link>
            </div>
          </div>
          )}

      </div>
  );
};

export default Navbar;
