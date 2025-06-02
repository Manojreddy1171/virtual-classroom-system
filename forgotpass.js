import React, { useState } from "react";
import { toast } from "react-toastify";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      toast.error("Please enter your email");
      return;
    }

    // Basic email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    setLoading(true);

    try {
      // Simulate API call for forgot password
      // Replace with your real API call here:
      await new Promise((res) => setTimeout(res, 1500));

      toast.success("Password reset link sent to your email");
      setEmail("");
    } catch (error) {
      toast.error("Failed to send reset link. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="forgot-password-container" style={{ maxWidth: 400, margin: "50px auto", padding: 20, border: "1px solid #ddd", borderRadius: 8 }}>
      <h2>Forgot Password</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email" style={{ display: "block", marginBottom: 8 }}>
          Enter your email address
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          style={{ width: "100%", padding: 8, marginBottom: 12, borderRadius: 4, border: "1px solid #ccc" }}
          disabled={loading}
        />
        <button
          type="submit"
          disabled={loading}
          style={{
            width: "100%",
            padding: 10,
            backgroundColor: loading ? "#999" : "#007BFF",
            color: "white",
            border: "none",
            borderRadius: 4,
            cursor: loading ? "not-allowed" : "pointer",
          }}
        >
          {loading ? "Sending..." : "Send Reset Link"}
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;
