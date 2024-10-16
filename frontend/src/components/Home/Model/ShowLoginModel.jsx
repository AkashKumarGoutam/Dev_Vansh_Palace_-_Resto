import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const GetStartModel = ({ closeGetModel }) => {
  const [showAuth, setShowAuth] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  axios.defaults.withCredentials= true


  const validateInputs = () => {
    if (!email || !password || (!showAuth && !name)) {
      alert("Please fill in all fields");
      return false;
    }
    // Basic email format check
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address");
      return false;
    }
    if (password.length < 6) {
      alert("Password must be at least 6 characters long");
      return false;
    }
    return true;
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!validateInputs()) return;

    setLoading(true); // Start loading
    try {
      const res = await axios.post(
        "http://localhost:3001/auth/create_account",
        { name, email, password }
        // { withCredentials: true }
      );
      console.log(res.data);
      alert("Register successful");
      closeGetModel();
      navigate("/");
    } catch (err) {
      console.log(err);
      alert("Error during registration, please try again.");
    } finally {
      setLoading(false); // End loading
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validateInputs()) return;

    setLoading(true); // Start loading
    try {
      const res = await axios.post(
        "http://localhost:3001/auth/login_account",
        { email, password }
        // { withCredentials: true }
      );
      console.log(res.data);
      alert("Login successful");
      navigate("/");
      closeGetModel();
      localStorage.setItem("username", res.data.username);
    } catch (error) {
      console.log(error);
      alert("Error during login, please check your credentials");
    } finally {
      setLoading(false); // End loading
    }
  };

  return (
    <>
      <div className="wrapper-container"></div>
      <div className="flex flex-col justify-center text-gray-900 items-center main-container">
        <div className="flex justify-end items-center w-full p-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="48"
            height="48"
            fill="black"
            onClick={closeGetModel}
            className="cursor-pointer w-8 hover:px-1"
          >
            <line
              x1="18"
              y1="6"
              x2="6"
              y2="18"
              stroke="black"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <line
              x1="6"
              y1="6"
              x2="18"
              y2="18"
              stroke="black"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </div>

        <h1 className="text-lg font-bold">
          <span className="text-black">Deo Vansh</span>
          <span className="text-yellow-400"> Palace</span> &{" "}
          <span className="text-yellow-400">Restaurant</span>
        </h1>

        {showAuth ? (
          <form onSubmit={handleLogin}>
            <h1 className="flex text-xl font-bold underline justify-center">
              Login
            </h1>
            <div className="flex justify-center items-center py-4 gap-4">
              <h1 className="font-semibold text-gray-600">Email Id: </h1>
              <input
                placeholder="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-gray-300 ml-2 px-2 py-3 font-semibold rounded-lg"
              />
            </div>
            <div className="flex justify-center items-center py-4 gap-4">
              <h1 className="font-semibold text-gray-600">Password: </h1>
              <input
                placeholder="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-gray-300 px-2 py-3 font-semibold rounded-lg"
                autoComplete="current-password"
              />
            </div>
            <div className="flex justify-center">
              <button
                type="submit"
                className="bg-blue-800 p-2 rounded-lg text-white"
                disabled={loading}
              >
                {loading ? "Logging in..." : "Login"}
              </button>
            </div>
          </form>
        ) : (
          <form onSubmit={handleRegister}>
            <h1 className="flex text-xl font-bold underline justify-center">
              Create Account
            </h1>
            <div className="flex justify-center items-center py-4 gap-4">
              <h1 className="font-semibold ml-2 text-gray-600">Name: </h1>
              <input
                placeholder="Name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-gray-300 ml-2 px-2 py-3 font-semibold rounded-lg"
              />
            </div>
            <div className="flex justify-center items-center py-4 gap-4">
              <h1 className="font-semibold text-gray-600">Email Id: </h1>
              <input
                placeholder="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-gray-300 ml-2 px-2 py-3 font-semibold rounded-lg"
              />
            </div>
            <div className="flex justify-center items-center py-4 gap-4">
              <h1 className="font-semibold text-gray-600">Password: </h1>
              <input
                placeholder="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-gray-300 px-2 py-3 font-semibold rounded-lg"
              />
            </div>
            <div className="flex justify-center">
              <button
                type="submit"
                className="bg-blue-800 p-2 rounded-lg text-white"
                disabled={loading}
              >
                {loading ? "Registering..." : "Submit"}
              </button>
            </div>
          </form>
        )}

        <button
          onClick={() => setShowAuth(!showAuth)}
          className="text-gray-700 underline py-2 hover:text-blue-800"
        >
          {showAuth ? <h1>Create Account</h1> : <h1>Go to Login</h1>}
        </button>
      </div>
    </>
  );
};

export default GetStartModel;
