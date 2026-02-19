import { useState } from "react";
import "./Auth.css";
import "../../components/LoginPopup/LoginPopup.css";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false); // ✅ added

  const onChange = (e) =>
    setData((d) => ({ ...d, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // ✅ start loading
    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
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
            <h2>Login</h2>
            <div style={{ width: 16 }} />
          </div>

          <div className="login-popup-inputs">
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
            {loading ? "Processing..." : "Login"}
          </button>

          <p>
            New here?{" "}
            <span>
              <Link to="/signup">Create account</Link>
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
