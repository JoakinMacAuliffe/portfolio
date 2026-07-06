import React, { useState, useEffect } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';

// Configurar el worker desde un CDN para evitar problemas de build/SSR (unpkg)
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

export default function ResumeViewer({ lang = 'es' }: { lang?: 'es' | 'en' }) {
  const isEn = lang === 'en';
  const [width, setWidth] = useState(1200);
  const [numPages, setNumPages] = useState<number | null>(null);

  useEffect(() => {
    // Asegurarse de que window exista (Client-side)
    if (typeof window !== 'undefined') {
      const handleResize = () => {
        setWidth(window.innerWidth);
      };
      
      // Llamar al inicio para setear el ancho actual
      handleResize();
      
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  // Calcular la escala de forma responsiva basándonos en el ancho de la ventana
  // (Valores similares a la referencia solicitada)
  const scale = width > 786 ? 1.5 : width > 500 ? 1.0 : 0.6;

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
  }

  return (
    <div className="flex flex-col items-center justify-center w-full relative z-10" data-aos="fade-up">
      {/* Resplandor sutil trasero (reducido) */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-signal-orange/10 via-electric-blue/10 to-signal-orange/10 rounded-xl blur-md opacity-40 pointer-events-none"></div>
      
      {/* Contenedor principal con estilo dark, border-gray-800 y sombra intensa */}
      <div className="bg-transparent border border-gray-800 shadow-2xl rounded-xl overflow-hidden backdrop-blur-sm p-2 relative">
        <Document 
          file="/cv.pdf" 
          onLoadSuccess={onDocumentLoadSuccess}
          loading={
            <div className="flex flex-col items-center justify-center p-12 h-[800px] w-[800px] max-w-full">
              <div className="w-12 h-12 rounded-full border-2 border-t-signal-orange border-r-signal-orange border-b-transparent border-l-transparent animate-spin mb-4"></div>
              <p className="text-text-muted font-mono text-sm">{isEn ? "Loading PDF document..." : "Cargando documento PDF..."}</p>
            </div>
          }
          className="flex flex-col items-center justify-center"
        >
          {Array.from(new Array(numPages || 1), (el, index) => (
            <Page
              key={`page_${index + 1}`}
              pageNumber={index + 1}
              scale={scale}
              renderTextLayer={false}
              renderAnnotationLayer={false}
              className="mb-4 last:mb-0 shadow-lg"
            />
          ))}
        </Document>
      </div>
    </div>
  );
}
