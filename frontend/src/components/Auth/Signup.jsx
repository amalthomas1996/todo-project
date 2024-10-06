import React, { useState } from "react";
import axios from "axios";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [touched, setTouched] = useState({
    username: false,
    email: false,
    password: false,
    confirmPassword: false,
  });

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Set touched to true to show validation messages
    setTouched({
      username: true,
      email: true,
      password: true,
      confirmPassword: true,
    });

    // Input validations
    if (!username || !email || !password || !confirmPassword) {
      setError("All fields are required.");
      return;
    }
    if (!validateEmail(email)) {
      setError("Invalid email format.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/register",
        {
          username,
          email,
          password,
        }
      );
      setSuccess("Signup successful! You can now log in.");
      setUsername("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      window.location.href = "/Login";
    } catch (error) {
      setError(error.response?.data?.message || "Signup failed.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-sm w-full">
        <h2 className="text-3xl font-semibold text-center text-gray-700 mb-6">
          Signup
        </h2>

        {/* Alert Messages */}
        {error && (
          <div className="bg-red-100 text-red-700 border border-red-400 rounded-lg p-2 mb-4 text-center">
            {error}
          </div>
        )}
        {success && (
          <div className="bg-green-100 text-green-700 border border-green-400 rounded-lg p-2 mb-4 text-center">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onBlur={() => setTouched((prev) => ({ ...prev, username: true }))}
              className={`border ${
                username || !touched.username
                  ? "border-gray-300"
                  : "border-red-500"
              } rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200`}
              required
            />
            {!username && touched.username && (
              <p className="text-red-500 text-sm mt-1">Username is required.</p>
            )}
          </div>
          <div className="mb-4">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={() => setTouched((prev) => ({ ...prev, email: true }))}
              className={`border ${
                validateEmail(email) || !touched.email
                  ? "border-gray-300"
                  : "border-red-500"
              } rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200`}
              required
            />
            {!validateEmail(email) && email && touched.email && (
              <p className="text-red-500 text-sm mt-1">Invalid email format.</p>
            )}
          </div>
          <div className="mb-4">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onBlur={() => setTouched((prev) => ({ ...prev, password: true }))}
              className={`border ${
                password.length >= 6 || !touched.password
                  ? "border-gray-300"
                  : "border-red-500"
              } rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200`}
              required
            />
            {password.length < 6 && password && touched.password && (
              <p className="text-red-500 text-sm mt-1">
                Password must be at least 6 characters long.
              </p>
            )}
          </div>
          <div className="mb-6">
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              onBlur={() =>
                setTouched((prev) => ({ ...prev, confirmPassword: true }))
              }
              className={`border ${
                password === confirmPassword || !touched.confirmPassword
                  ? "border-gray-300"
                  : "border-red-500"
              } rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200`}
              required
            />
            {password !== confirmPassword &&
              confirmPassword &&
              touched.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">
                  Passwords do not match.
                </p>
              )}
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-lg w-full hover:bg-blue-600 transition duration-200"
          >
            Signup
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
