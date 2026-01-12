// Componente para apilar elementos verticalmente con espacio entre ellos
import React from 'react';

export default function Stack({ children, gap }) {
  return (
    <div className={`flex flex-col ${gap}`}>
      {children}
    </div>
  );
}

// Uso: <Stack gap="gap-6">...</Stack> para apilar con espacio de 1.5rem entre elementos
// <Stack gap="gap-4">...</Stack> para espacio de 1rem, por ejemplo campos de formulario.
