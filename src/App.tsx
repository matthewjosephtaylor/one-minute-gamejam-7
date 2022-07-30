import ReactDOM from "react-dom/client";

import React from "react";
import { DancingCube } from "./DancingCube";

export const App = () => {
  const container = document.createElement('div')
  document.body.appendChild(container)
  const root = ReactDOM.createRoot(container);

  root.render(<DancingCube />);
};


