'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const experiences = [
  {
    id: 0,
    title: 'Configuración y Diagnóstico en Terreno',
    icon: '📻',
    color: '#00d4ff',
    tags: ['ISDB-Tb', 'Diagnóstico RF', 'SNR/MER/BER'],
    description:
      'Configuración y diagnóstico en terreno de equipos de transmisión de TV digital bajo estándar ISDB-Tb. Análisis de calidad de señal con analizadores de espectro.',
  },
  {
    id: 1,
    title: 'Infraestructura de Red para Acceso Remoto',
    icon: '🔒',
    color: '#00ff88',
    tags: ['VPN / VLAN', 'Firewall', 'SSH'],
    description:
      'Diseño de red dedicada con VPNs, VLANs y firewall para acceso remoto seguro a equipos de transmisión distribuidos geográficamente.',
  },
  {
    id: 2,
    title: 'Mantenimiento de Sistemas de Alta Potencia',
    icon: '⚡',
    color: '#ff6b00',
    tags: ['Amplificadores RF', 'Guías de onda', 'VSWR'],
    description:
      'Mantenimiento preventivo y correctivo de amplificadores de potencia, sistemas de enfriamiento y líneas de transmisión en torres de radiodifusión.',
  },
];

export default function ExperienceTimeline() {
  const [openId, setOpenId] = useState<number | null>(0);

  return (
    <div className="relative">
      {/* Vertical line */}
      <div className="absolute left-4 top-0 bottom-0 w-px bg-gradient-to-b from-electric-blue via-neon-green to-signal-orange opacity-30 hidden sm:block"></div>

      <div className="space-y-3">
        {experiences.map((exp) => {
          const isOpen = openId === exp.id;
          return (
            <div key={exp.id} className="relative sm:pl-12">
              {/* Timeline node */}
              <div
                className="absolute left-0 top-4 w-8 h-8 rounded-full border-2 items-center justify-center text-sm hidden sm:flex transition-all duration-300"
                style={{
                  borderColor: isOpen ? exp.color : '#1e1e2e',
                  background: isOpen ? exp.color + '20' : '#16161f',
                  boxShadow: isOpen ? `0 0 12px ${exp.color}40` : 'none',
                }}
              >
                {exp.icon}
              </div>

              {/* Accordion Header */}
              <button
                onClick={() => setOpenId(isOpen ? null : exp.id)}
                className="w-full text-left p-4 rounded-xl border transition-all duration-300 group"
                style={{
                  background: isOpen ? '#16161f' : 'transparent',
                  borderColor: isOpen ? exp.color + '40' : '#1e1e2e',
                }}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <span className="text-xl sm:hidden">{exp.icon}</span>
                    <div>
                      <div className="font-semibold text-text-primary text-sm sm:text-base group-hover:text-white transition-colors">
                        {exp.title}
                      </div>
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {exp.tags.map(tag => (
                          <span
                            key={tag}
                            className="text-xs px-2 py-0.5 rounded-full font-mono border"
                            style={{
                              color: exp.color,
                              borderColor: exp.color + '30',
                              background: exp.color + '10',
                            }}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="text-text-muted flex-shrink-0 mt-1"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </motion.div>
                </div>
              </button>

              {/* Accordion Body */}
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="overflow-hidden"
                  >
                    <div className="px-4 pb-4 pt-2">
                      <p className="text-text-muted text-sm leading-relaxed">
                        {exp.description}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}
