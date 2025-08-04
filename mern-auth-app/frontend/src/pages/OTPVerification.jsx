import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import Button from "../components/Button";
import Input from "../components/Input";

const OTPVerification = () => {
  const { verifyOTP } = useContext(AuthContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", code: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await verifyOTP(formData.email, formData.code);
      navigate("/signin");
    } catch (err) {
      setError(err.response?.data?.error || "OTP verification failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Verify OTP</h2>
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
              type="text"
              name="code"
              value={formData.code}
              onChange={handleChange}
              placeholder="Enter 6-digit OTP"
            />
          </div>
          <Button type="submit" className="w-full">
            Verify OTP
          </Button>
        </form>
      </div>
    </div>
  );
};

export default OTPVerification;
