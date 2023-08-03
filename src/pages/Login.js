import { useState } from "react";
import { useLogin } from "../hooks/useLogin";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const { login, error, isLoading } = useLogin();

  const handleShow = () => {
    setShow(!show)
  }
  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await login(email, password);

    console.log(response);
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center">
      <form
        className="login w-[80%] flex flex-col gap-7 bg-white p-3 shadow-xl"
        onSubmit={handleSubmit}
      >
        <h3 className="text-center text-[30px]">Log In</h3>
        <div className="flex flex-col">
          <label>Email address:</label>
          <input
            type="email"
            className="border outline-0 p-2 rounded-lg"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>
        <div className="flex flex-col relative">
          <label>Password:</label>
          <div className="flex w-full items-center justify-center gap-7 border rounded-lg">
          <input
            type={show ? "text" : "password"}
            className="outline-0 p-2 flex-1"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
      
          />
          <div onClick={handleShow} className="px-4 cursor-pointer">{show ? "hide" : "show"}</div>
          </div>
          <span className="italic text-gray-500">
            Please make use of an uppercase letter, lowercase letter, number and
            symbol for the password
          </span>
        </div>

        <button
          disabled={isLoading}
          className="bg-teal-500 text-white font-[500] px-4 py-2 rounded-xl"
          type="submit"
        >
          Log in
        </button>
        {error && <div className="error">{error}</div>}
      </form>
    </div>
  );
};

export default Login;
