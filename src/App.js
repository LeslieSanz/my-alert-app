import React, { useEffect, useState } from "react";
import './App.css'; // Importa el archivo CSS para los estilos.

function App() {
  const [interacted, setInteracted] = useState(false);

  useEffect(() => {
    // Pequeño truco: Forzar que la pestaña pierda y recupere el foco
    const simulateFocus = () => {
      // Cambia el fondo de la ventana para que sea visible cuando pierda el foco
      document.body.classList.add("blurred");  // Aplica la clase para el fondo desvanecido

      setTimeout(() => {
        window.focus(); // Luego lo recupera
        setInteracted(true);
        document.body.classList.remove("blurred"); // Restaura el fondo cuando se recupera el foco
      }, 1000); // El foco vuelve después de 1 segundo
    };

    // Ejecuta la simulación después de 2 segundos
    const timer = setTimeout(simulateFocus, 2000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      console.log("Intentando cerrar la ventana...");
      const confirmationMessage = "¿Estás seguro de que quieres cerrar la ventana?";
      event.returnValue = confirmationMessage;
      return confirmationMessage;
    };

    if (interacted) {
      window.addEventListener("beforeunload", handleBeforeUnload);
    }

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [interacted]);

  return (
    <div className="App">
      <h1>Reto de la semana :)</h1>
      <p>Intenta cerrar la ventana o recargar para ver la alerta nativa.</p>
      
      <button onClick={() => setInteracted(true)}>Haz clic aquí</button>

      <input
        type="text"
        placeholder="Escribe algo aquí..."
        onChange={() => setInteracted(true)}
        style={{ display: "block", marginTop: "10px", padding: "8px", fontSize: "16px" }}
      />

      <select
        onChange={() => setInteracted(true)}
        style={{ display: "block", marginTop: "10px", padding: "8px", fontSize: "16px" }}
      >
        <option value="">Selecciona una opción</option>
        <option value="opcion1">Opción 1</option>
        <option value="opcion2">Opción 2</option>
        <option value="opcion3">Opción 3</option>
      </select>

      {/* Contenido adicional para habilitar la barra de desplazamiento */}
      <div style={{ height: "1500px", marginTop: "30px" }}>
        <p>Desplázate hacia abajo para ver más contenido.</p>
      </div>
    </div>
  );
}

export default App;
