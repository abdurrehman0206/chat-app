import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";
import Loader from "../Components/Loader/Loader";
function Login() {
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(null);
      const { error: loginError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (loginError) {
        throw loginError;
      } else {
        nav("/");
        setSuccess(true);
      }
    } catch (loginError) {
      setError(loginError.message);
    } finally {
      setLoading(false);
    }
  };
  // const sendLink = async (e) => {
  //   const { error, data } = await supabase.auth.resetPasswordForEmail(email, {
  //     options: {
  //       redirectTo: "https://localhost:3000/reset/",
  //     },
  //   });
  //   console.log(error, data);
  // };
  return (
    <div className="wrapper center--flexed">
      <div className="auth--container center--flexed">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="janedoe@email.com"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="•••••••••"
            onChange={(e) => setPassword(e.target.value)}
          />
          {!loading && <button>Sign In</button>}
          {/* <Link to="/reset" onClick={sendLink}>
            Reset Password
          </Link> */}
          {loading && <Loader />}
          <p>
            Don't have an account ? <Link to="/register">Sign Up</Link>
          </p>
          {error && <p style={{ textAlign: "center" }}>{error}</p>}
          {success && <p style={{ textAlign: "center" }}>Successful !</p>}
        </form>
      </div>
    </div>
  );
}

export default Login;
