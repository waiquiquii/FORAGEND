export const register = () => {
  if ("serviceWorker" in navigator && process.env.NODE_ENV === "production") {
    window.addEventListener("load", () => {
      navigator.serviceWorker
        .register("/sw.js")
        .then((reg) => {
          console.log("SW registrado:", reg.scope);
          reg.update(); // Forzar actualización
        })
        .catch((err) => console.error("Error SW:", err));
    });
  }
};
