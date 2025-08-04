import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import Button from "../components/Button";
import Input from "../components/Input";

const SignUp = () => {
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(formData.email, formData.password);
      navigate("/verify-otp");
    } catch (err) {
      setError(err.response?.data?.error || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <Input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
            />
          </div>
          <div className="mb-6">
            <Input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
            />
          </div>
          <Button type="submit" className="w-full">
            Sign Up
          </Button>
        </form>
        <div className="mt-4 flex flex-col space-y-2">
          <a
            href={`${import.meta.env.VITE_API_URL}/api/auth/google`}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 text-center"
          >
            Sign up with Google
          </a>
          <a
            href={`${import.meta.env.VITE_API_URL}/api/auth/github`}
            className="px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-900 text-center"
          >
            Sign up with GitHub
          </a>
          <a
            href={`${import.meta.env.VITE_API_URL}/api/auth/facebook`}
            className="px-4 py-2 bg-blue-800 text-white rounded-md hover:bg-blue-900 text-center"
          >
            Sign up with Facebook
          </a>
          <a
            href={`${import.meta.env.VITE_API_URL}/api/auth/apple`}
            className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 text-center"
          >
            Sign up with Apple
          </a>
        </div>
        <p className="mt-4 text-center">
          Already have an account?{" "}
          <a href="/signin" className="text-blue-600 hover:underline">
            Sign In
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
