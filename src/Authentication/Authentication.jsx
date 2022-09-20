import React, { useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../supabaseClient";
import Loader from "../Components/Loader/Loader";

function Authentication() {
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
      const { error: registerError } = await supabase.auth.signUp({
        email,
        password,
      });
      if (registerError) {
        throw registerError;
      } else {
        setSuccess(true);
      }
    } catch (registerError) {
      setError(registerError.message);
    } finally {
      setLoading(false);
    }
  };
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
          {!loading && <button>Sign Up</button>}
          {loading && <Loader />}
          <p>
            Already have an account ? <Link to="/login">Sign In</Link>
          </p>
          {error && <p style={{ textAlign: "center" }}>{error}</p>}
          {success && <p style={{ textAlign: "center" }}>Successful !</p>}
        </form>
      </div>
    </div>
  );
}

export default Authentication;
