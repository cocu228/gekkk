import { createRoot } from "react-dom/client";
import { ConfigProvider } from "antd";

import App from "./App";
import "./styles/index.scss";
import "../processes/i18n.config";

declare global {
  interface String {
    capitalize(): string;
  }
}

Object.defineProperty(String.prototype, "capitalize", {
  value: function (this: string): string {
    return this.charAt(0).toUpperCase() + this.slice(1);
  },
  enumerable: false
});

// window.addEventListener('online', updateOnlineStatus);
// window.addEventListener('offline', updateOnlineStatus);

// if (!navigator.onLine) {
//     alert("No internet access")
// }

// function updateOnlineStatus(event) {
//     const condition = navigator.onLine ? "online" : "offline";
//     alert(condition)
// }

createRoot(document.getElementById("root") as HTMLElement).render(
  // <React.StrictMode>
  // <ThemeCustomization>
  <ConfigProvider
    theme={{
      token: {
        fontFamily: "inherit"
      }
    }}
  >
    <App />
  </ConfigProvider>
  // </ThemeCustomization>
  // </React.StrictMode>
);
