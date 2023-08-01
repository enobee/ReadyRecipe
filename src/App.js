import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import CreateRecipe from "./pages/CreateRecipe";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function App() {
  const { user } = useAuthContext();
  console.log({userfromapp: user})
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="pages min-h-screen">
          <Routes>
            <Route
              path="/"
              element={user ? <Home /> : <Navigate to="/login" />}
            />
            <Route
              path="/recipe"
              element={user ? <CreateRecipe /> : <Navigate to="/login" />}
            />
            <Route
              path="/login"
              element={!user ? <Login /> : <Navigate to="/" />}
            />
            <Route
              path="/signup"
              element={!user ? <Signup /> : <Navigate to="/" />}
            />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
