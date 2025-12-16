// Componente para apilar elementos verticalmente con espacio entre ellos
import React from 'react';

export default function Stack({ children }) {
  return (
    <div className="flex flex-col gap-10">
      {children}
    </div>
  );
}
