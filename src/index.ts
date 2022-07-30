import { App } from "./App";

(() => {
  try {
    App();
  } catch (reason) {
    console.log(reason);
  }
})();
