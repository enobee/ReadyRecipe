import {Link} from "react-router-dom"

const Footer = () => {
  return (
    <footer className="bg-gray-400 h-[200px] text-white pl-2">
      <Link to="/">
          <h1 className="text-[28px] font-[500] tracking-[2px]">ReadyRecipes</h1>
        </Link>
        <ul>
          <li>Homepage</li>
          <li>Recipes</li>
          <li>Cart</li>
          <li>Book Now</li>
        </ul>

      <p className="text-center">© {new Date().getFullYear()} ready recipes. All rights reserved.</p>
    </footer>
  );
};

export default Footer;