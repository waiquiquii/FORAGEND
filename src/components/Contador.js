import { useState, useEffect } from "react";

function App() {
  const [contador, setContador] = useState(0);
  const [contadorTexto, setContadorTexto] = useState("cero");

  useEffect(() => {
    console.log("Contador actualizado:", contador);
    setContadorTexto(numeroALetras(contador)); // Convertir número a texto

    return () => {
      console.log("Cleanup: Contador cambió");
    };
  }, [contador]);

  return (
    <div>
      <h1>Contador: {contadorTexto}</h1>
      <button onClick={() => setContador(contador + 1)}>Incrementar</button>
    </div>
  );
}

export default App;
