import React, { createContext, useState } from "react";

const contexts = createContext();

function Context({ children }) {
  const [mode, setMode] = useState(localStorage.theme);

  return (
    <contexts.Provider value={{ mode, setMode }}>{children}</contexts.Provider>
  );
}

export { contexts, Context };
