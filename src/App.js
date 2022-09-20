import Authentication from "./Authentication/Authentication";
import Login from "./Authentication/Login";
import { useContext } from "react";
import { UserContext } from "./context/UserContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Account from "./pages/Account";
import Navbar from "./Components/Navbar";
import Reset from "./Authentication/Reset";
function App() {
  const { session } = useContext(UserContext);
  const ProtectedRoute = ({ children }) => {
    if (session) {
      return children;
    } else {
      return <Login />;
    }
  };

  return (
    <div className="main--container">
      <Router>
        {session && <Navbar />}
        <Routes>
          <Route
            index
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/account"
            element={
              <ProtectedRoute>
                <Account />
              </ProtectedRoute>
            }
          />
          <Route path="/register" element={<Authentication />} />
          <Route path="/login" element={<Login />} />
          <Route path="/reset" element={<Reset />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
