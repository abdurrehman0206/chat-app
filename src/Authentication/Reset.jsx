import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";
import Loader from "../Components/Loader/Loader";
function Reset() {
  const nav = useNavigate();
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const handleReset = async (e) => {
    setSuccess(false);
    setLoading(true);
    await supabase.auth
      .updateUser({
        password: password,
      })
      .then((res) => {
        console.log(res);
        return res;
      })
      .then(() => {
        setLoading(false);
        setSuccess(true);
        nav("/login");
      })
      .catch((err) => {
        setError(err.message);
      });
  };
  //   const { error, data } = await supabase.auth.resetPasswordForEmail(email, {
  //     options: {
  //       redirectTo: "https://example.com/update-password",
  //     },
  //   });
  return (
    <div className="wrapper center--flexed">
      <div className="auth--container center--flexed">
        <form onSubmit={handleReset}>
          <input
            type="password"
            placeholder="•••••••••"
            onChange={(e) => setPassword(e.target.value)}
          />
          {!loading && <button>Reset</button>}
          {loading && <Loader />}
          {error && <p style={{ textAlign: "center" }}>{error}</p>}
          {success && <p style={{ textAlign: "center" }}>Successful !</p>}
        </form>
      </div>
    </div>
  );
}

export default Reset;
