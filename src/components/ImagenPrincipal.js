import React from 'react';
import '../styles/ImagenPrincipal.css'; // Corrige la ruta del archivo CSS

const ImagenPrincipal = () => {
    return (
        <div className="imagen-principal-container">
            <img src='/logocorazon.png' alt="Imagen Principal" className="imagen-principal" />
        </div>
    );
};

export default ImagenPrincipal;