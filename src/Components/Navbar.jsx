import React from "react";
import { NavLink } from "react-router-dom";
import { supabase } from "../supabaseClient";
function Navbar() {
  return (
    <div className="navbar--container center--flexed">
      <ul>
        <NavLink to="/" className={(state) => (state.isActive ? "active" : "")}>
          <li>Home</li>
        </NavLink>
        <NavLink
          to="/account"
          className={(state) => (state.isActive ? "active" : "")}
        >
          <li>My Account</li>
        </NavLink>
        <NavLink
          className={(state) => (state.isActive ? "active" : "")}
          to="/login"
          onClick={() => supabase.auth.signOut()}
        >
          <li>Logout</li>
        </NavLink>
      </ul>
    </div>
  );
}

export default Navbar;
