import React from "react";
import { AuthProvider } from "./context/AuthContext";
import Routes from "./Routes";

function App() {
  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
  );
}

export default App;
