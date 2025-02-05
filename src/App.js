import React, { useEffect, useState } from 'react';

function App() {
  const [interacted, setInteracted] = useState(false); // Estado para detectar interacción

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      console.log("Intentando cerrar la ventana...");

      const confirmationMessage = '¿Estás seguro de que quieres cerrar la ventana?';

      event.returnValue = confirmationMessage; 
      return confirmationMessage;
    };

    // Solo agregar el evento si el usuario ya interactuó
    if (interacted) {
      window.addEventListener('beforeunload', handleBeforeUnload);
    }

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [interacted]); // Se actualiza cuando el usuario interactúa

  return (
    <div className="App">
      <h1>Reto de la semana :)</h1>
      <p>Intenta cerrar la ventana o recargar para ver la alerta nativa.</p>
      
      <button onClick={() => setInteracted(true)}>Haz clic aquí</button> {/* Botón de interacción */}
      
      <input
        type="text"
        placeholder="Escribe algo aquí..."
        onChange={() => setInteracted(true)} // Cualquier cambio activa la alerta
        style={{ display: "block", marginTop: "10px", padding: "8px", fontSize: "16px" }}
      />

      <select
        onChange={() => setInteracted(true)} // Cambiar la opción activa la alerta
        style={{ display: "block", marginTop: "10px", padding: "8px", fontSize: "16px" }}
      >
        <option value="">Selecciona una opción</option>
        <option value="opcion1">Opción 1</option>
        <option value="opcion2">Opción 2</option>
        <option value="opcion3">Opción 3</option>
      </select>

    </div>
  );
}

export default App;
