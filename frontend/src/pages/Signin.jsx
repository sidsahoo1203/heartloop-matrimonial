import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useLoginUserMutation } from "../features/api/authApi";
import { Loader2 } from "lucide-react"
import { toast } from "react-toastify";
import { UserContext } from "../../context/user.context";

const Signin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [usernameOrEmail, setUsernameOrEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loginUser, { data, error, isLoading, isSuccess }] = useLoginUserMutation();

  const { setUser } = useContext(UserContext);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
  if (usernameOrEmail && password) {
    loginUser({ usernameOrEmail, password });
  } else {
    toast.error("Username or email and password are required");
  }
  }

  const navigate = useNavigate();

  useEffect(() => {
    if(isSuccess) {
      toast.success("User logged in successfully");
      setUser(data.user)
      navigate("/");
    }
    if(error) {
      toast.error(error?.data?.message);
    }
  }, [isLoading, isSuccess, error])

  return (
    // <div className="flex justify-center items-center min-h-screen bg-black/100">
    //   <div className="bg-gray-900 p-8 rounded-lg shadow-lg w-98">
    //     <h2 className="text-white text-2xl font-bold mb-6 text-center">Sign In</h2>
    //     <form>
    //       <input
    //         type="text"
    //         placeholder="Username or Email"
    //         className="w-full px-4 py-2 mb-4 rounded-md bg-gray-700 text-white outline-none"
    //         name="usernameOrEmail"
    //         value={usernameOrEmail}
    //         onChange={(e) => setUsernameOrEmail(e.target.value)}
    //       />
    //       <div className="relative">
    //         <input
    //           type={showPassword ? "text" : "password"}
    //           placeholder="Password"
    //           className="w-full px-4 py-2 mb-4 rounded-md bg-gray-700 text-white outline-none"
    //           name="password"
    //           value={password}
    //           onChange={(e) => setPassword(e.target.value)}
    //         />
    //         <button
    //           type="button"
    //           onClick={togglePasswordVisibility}
    //           className="absolute right-2 top-2 text-gray-400"
    //         >
    //           <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
    //         </button>
    //       </div>
    //       <button
    //         className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
    //         disabled={isLoading}
    //         onClick={handleLogin}
    //       >
    //         {
    //           isLoading ? (
    //             <>
    //               <Loader2 className="mr-2 h-4 w-4 animate-spin" />Please wait...
    //             </>
    //           ) : "Login"
    //         }
    //       </button>
    //     </form>
    //     <p className="text-gray-400 text-center mt-4">
    //       Don't have an account? <Link to="/signup" className="text-blue-400">Sign Up</Link>
    //     </p>
    //   </div>
    // </div>
    <div className="flex justify-center items-center min-h-screen bg-black/100 px-4 sm:px-6 lg:px-8">
      <div className="bg-gray-900 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-white text-2xl font-bold mb-6 text-center">Sign In</h2>
        <form>
          <input
            type="text"
            placeholder="Username or Email"
            className="w-full px-4 py-2 mb-4 rounded-md bg-gray-700 text-white outline-none"
            name="usernameOrEmail"
            value={usernameOrEmail}
            onChange={(e) => setUsernameOrEmail(e.target.value)}
          />
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="w-full px-4 py-2 mb-4 rounded-md bg-gray-700 text-white outline-none"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-2 top-2 text-gray-400"
            >
              <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
            </button>
          </div>
          <button
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
            disabled={isLoading}
            onClick={handleLogin}
          >
            {
              isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />Please wait...
                </>
              ) : "Login"
            }
          </button>
        </form>
        <p className="text-gray-400 text-center mt-4 text-sm">
          Don't have an account? <Link to="/signup" className="text-blue-400">Sign Up</Link>
        </p>
      </div>
    </div>
  );
};

export default Signin;