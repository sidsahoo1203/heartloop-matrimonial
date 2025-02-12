import { Link } from "react-router-dom";

const Signin = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-white text-2xl font-bold mb-6 text-center">Sign In</h2>
        <form>
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-2 mb-4 rounded-md bg-gray-700 text-white outline-none"
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 mb-4 rounded-md bg-gray-700 text-white outline-none"
          />
          <button className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600">
            Sign In
          </button>
        </form>
        <p className="text-gray-400 text-center mt-4">
          Don't have an account? <Link to="/signup" className="text-blue-400">Sign Up</Link>
        </p>
      </div>
    </div>
  );
};

export default Signin;
