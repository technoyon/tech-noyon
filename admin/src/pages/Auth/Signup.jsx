import { useState } from "react";
import "./Auth.css";
import "../../components/LoginPopup/LoginPopup.css";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../../firebase";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Signup = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({ name: "", email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false); // ✅ added

  const onChange = (e) =>
    setData((d) => ({ ...d, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // ✅ start loading
    try {
      const cred = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      if (data.name) {
        await updateProfile(cred.user, { displayName: data.name });
      }
      navigate("/add");
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false); // ✅ stop loading
    }
  };

  return (
    <div className="auth-page">
      <div className="login-popup">
        <form onSubmit={onSubmit} className="login-popup-container">
          <div className="login-popup-title">
            <h2>Sign Up</h2>
            <div style={{ width: 16 }} />
          </div>

          <div className="login-popup-inputs">
            <input
              name="name"
              onChange={onChange}
              value={data.name}
              type="text"
              placeholder="Your name"
              required
            />
            <input
              name="email"
              onChange={onChange}
              value={data.email}
              type="email"
              placeholder="Your email"
              required
            />

            <div className="password-input-wrapper">
              <input
                name="password"
                onChange={onChange}
                value={data.password}
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                required
              />
              <span
                className="password-toggle-icon"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </div>

          {/* ✅ Button Updated */}
          <button type="submit" disabled={loading}>
            {loading ? "Processing..." : "Create account"}
          </button>

          <p>
            Already have an account?{" "}
            <span>
              <Link to="/login">Login here</Link>
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
