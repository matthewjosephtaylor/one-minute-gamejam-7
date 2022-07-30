import ReactDOM from "react-dom/client";

import React from "react";

export const App = () => {
  const container = document.createElement('div')
  document.body.appendChild(container)
  const root = ReactDOM.createRoot(container);

  root.render(<DancingCube />);
};

export const DancingCube = () => {
  return <div>Hello cube</div>;
};
