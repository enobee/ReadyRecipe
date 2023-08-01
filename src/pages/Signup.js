import { useState } from "react";
import { useSignup } from "../hooks/useSignup";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signup, error, isLoading } = useSignup();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await signup(email, password)
  }

  return (
    <div className="w-full min-h-screen flex items-center justify-center">
    <form className="login w-[80%] flex flex-col gap-7 bg-white p-3 shadow-xl" onSubmit={handleSubmit}>
      <h3 className="text-center text-[30px]">Sign Up</h3>
      <div className="flex flex-col">
      <label>Email address:</label>
      <input
        type="email"
        className="border outline-0 p-2 rounded-lg"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />

      </div>
      <div className="flex flex-col">
      <label>Password:</label>
      <input
        type="password"
        className="border outline-0 p-2 rounded-lg"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />

      </div>

      <button disabled={isLoading} className="bg-teal-500 text-white font-[500] px-4 py-2 rounded-xl" type="submit">Sign Up</button>
      {/* {error && <div className="error">{error}</div>} */}
    </form>

    </div>
  );
  
};

export default Signup;
