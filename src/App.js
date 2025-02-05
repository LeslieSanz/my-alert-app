import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [showModal, setShowModal] = useState(false); // Controla la visibilidad del modal
  const [isClosing, setIsClosing] = useState(false); // Para saber si el usuario está intentando cerrar la ventana

  
  useEffect(() => {
    const handleBeforeUnload = (event) => {
      if (!isClosing) { 
        event.preventDefault();
        setShowModal(true);
      }
    };

    // Agregar el listener para el evento beforeunload
    window.addEventListener('beforeunload', handleBeforeUnload);

    // Limpiar el listener cuando el componente se desmonte
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [isClosing]); // Actualizar el estado de cierre

  // Cerrar el modal
  const handleCloseModal = () => {
    setShowModal(false); 
  };

  // Confirmar el cierre de la ventana
  const handleConfirmClose = () => {
    setIsClosing(true); // Marcar que el usuario está confirmando el cierre
    window.location.replace('about:blank');
  };

  return (
    <div className="App">
      <h1>Reto de la semana :)</h1>

      {/* Modal emergente */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>¿Estás seguro de que quieres cerrar la ventana?</h2>
            <button onClick={handleConfirmClose}>Sí, cerrar</button>
            <button onClick={handleCloseModal}>No, cancelar</button>
          </div>
        </div>
      )}

      <p>¡Haz algo aquí y luego intenta cerrar la ventana para ver el modal emergente!</p>
    </div>
  );
}

export default App;
