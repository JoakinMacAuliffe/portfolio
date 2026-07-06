'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type TabKey = 'topology' | 'hardware';

function TopologyTab({ lang }: { lang: 'es' | 'en' }) {
  const isEn = lang === 'en';
  const nodes = [
    { id: 'senderista', label: isEn ? 'Hiker' : 'Senderista', sublabel: 'ESP32 + GPS', color: '#00ff88', x: 8, y: 50 },
    { id: 'rep1', label: isEn ? 'Repeater A' : 'Repetidor A', sublabel: 'LoRa Node', color: '#00d4ff', x: 30, y: 25 },
    { id: 'rep2', label: isEn ? 'Repeater B' : 'Repetidor B', sublabel: 'LoRa Node', color: '#00d4ff', x: 30, y: 75 },
    { id: 'gateway', label: 'Gateway', sublabel: 'LoRa/WiFi', color: '#ff6b00', x: 55, y: 50 },
    { id: 'server', label: isEn ? 'Server + API' : 'Servidor + API', sublabel: 'PostgreSQL/PostGIS', color: '#a78bfa', x: 78, y: 50 },
    { id: 'web', label: isEn ? 'Web Platform' : 'Plataforma Web', sublabel: isEn ? 'Visualization' : 'Visualización', color: '#f472b6', x: 97, y: 50 },
  ];

  const links = [
    { from: 'senderista', to: 'rep1', label: 'LoRa Mesh' },
    { from: 'senderista', to: 'rep2', label: 'LoRa Mesh' },
    { from: 'rep1', to: 'gateway', label: 'LoRa' },
    { from: 'rep2', to: 'gateway', label: 'LoRa' },
    { from: 'gateway', to: 'server', label: 'WiFi/4G' },
    { from: 'server', to: 'web', label: 'REST API' },
  ];

  const getNode = (id: string) => nodes.find(n => n.id === id)!;

  return (
    <div className="space-y-6">
      <p className="text-text-muted text-sm leading-relaxed font-mono">
        <span className="text-neon-green">$</span> {isEn ? 'Autonomous mesh network architecture — independent of commercial cellular networks' : 'Arquitectura de red mesh autónoma — sin dependencia de red celular comercial'}
      </p>

      {/* SVG Topology Diagram */}
      <div className="relative bg-dark-bg rounded-xl border border-dark-border p-3 sm:p-4 overflow-hidden" style={{ minHeight: '180px' }}>
        <div className="absolute inset-0 grid-overlay opacity-30 rounded-xl"></div>
        <svg
          viewBox="0 0 100 100"
          className="w-full relative z-10"
          style={{ height: '150px' }}
          preserveAspectRatio="xMidYMid meet"
        >
          {/* Links */}
          {links.map((link, i) => {
            const from = getNode(link.from);
            const to = getNode(link.to);
            return (
              <g key={i}>
                <line
                  x1={`${from.x}%`} y1={`${from.y}%`}
                  x2={`${to.x}%`} y2={`${to.y}%`}
                  stroke="rgba(0,255,136,0.25)"
                  strokeWidth="0.5"
                  strokeDasharray="2,2"
                />
                {/* Animated packet dot */}
                <circle r="0.8" fill="#00ff88" opacity="0.9">
                  <animateMotion
                    dur={`${2 + i * 0.4}s`}
                    repeatCount="indefinite"
                    path={`M ${from.x} ${from.y} L ${to.x} ${to.y}`}
                  />
                </circle>
              </g>
            );
          })}

          {/* Nodes */}
          {nodes.map((node) => (
            <g key={node.id}>
              <circle
                cx={`${node.x}%`}
                cy={`${node.y}%`}
                r="3.5"
                fill={node.color}
                opacity="0.9"
              >
                <animate attributeName="r" values="3;4;3" dur="2s" repeatCount="indefinite" />
              </circle>
              <circle cx={`${node.x}%`} cy={`${node.y}%`} r="1.2" fill="white" opacity="0.9" />
            </g>
          ))}
        </svg>

        {/* Legend */}
        <div className="flex flex-wrap gap-4 justify-center mt-2 relative z-10">
          {nodes.map(node => (
            <div key={node.id} className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: node.color }}></div>
              <div>
                <span className="text-xs text-text-primary font-medium">{node.label}</span>
                <span className="text-xs text-text-muted ml-1 hidden sm:inline">· {node.sublabel}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Protocol Stack */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {[
          { proto: 'LoRa SX1276', layer: 'PHY Layer', detail: 'Sub-GHz, 20dBm, Spread. Factor 7-12', color: 'neon' },
          { proto: 'Mesh Protocol', layer: 'NET Layer', detail: isEn ? 'Dynamic multi-hop routing' : 'Enrutamiento dinámico multi-salto', color: 'blue' },
          { proto: 'MQTT / REST', layer: 'APP Layer', detail: isEn ? 'PostGIS for geospatial tracking' : 'PostGIS para tracking geoespacial', color: 'orange' },
        ].map(({ proto, layer, detail, color }) => (
          <div key={proto} className="bg-dark-bg border border-dark-border rounded-lg p-3">
            <div className={`text-xs font-mono mb-1 ${color === 'neon' ? 'text-neon-green' : color === 'blue' ? 'text-electric-blue' : 'text-signal-orange'}`}>
              {layer}
            </div>
            <div className="text-sm font-semibold text-text-primary">{proto}</div>
            <div className="text-xs text-text-muted mt-1">{detail}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function HardwareTab({ lang }: { lang: 'es' | 'en' }) {
  const isEn = lang === 'en';
  const components = [
    {
      name: 'ESP32 MCU',
      role: isEn ? 'Main Microcontroller' : 'Microcontrolador Principal',
      proto: 'WiFi + BLE',
      detail: isEn ? 'Xtensa dual-core 240MHz, 520KB SRAM. Manages all peripherals and comms stack.' : 'Xtensa dual-core 240MHz, 520KB SRAM. Gestiona todos los periféricos y la pila de comunicaciones.',
      color: '#00ff88',
      icon: '⚡',
    },
    {
      name: 'LoRa SX1276',
      role: isEn ? 'Long Range Radio' : 'Radio de Largo Alcance',
      proto: 'SPI',
      detail: isEn ? 'RYLR998 Module. Range >5km open field. Sub-GHz (915MHz). Ultra-low sleep power.' : 'Módulo RYLR998. Rango >5km en campo abierto. Sub-GHz (915MHz). Consumo ultra-bajo en sleep.',
      color: '#00d4ff',
      icon: '📡',
    },
    {
      name: 'GPS NEO-6M',
      role: isEn ? 'Global Tracking' : 'Localización Global',
      proto: 'UART',
      detail: isEn ? '2.5m CEP precision. Fix <1s (hot start). NMEA 0183 protocol. 50 tracking channels.' : 'Precisión 2.5m CEP. Fix en <1s (hot start). Protocolo NMEA 0183. 50 canales de seguimiento.',
      color: '#a78bfa',
      icon: '🛰️',
    },
    {
      name: 'MPU6050',
      role: 'IMU 6-DOF',
      proto: 'I2C',
      detail: isEn ? 'Accelerometer + gyroscope. Fall & activity detection. Reduces transmissions while at rest.' : 'Acelerómetro + giroscopio. Detección de caídas y actividad. Reduce transmisiones en reposo.',
      color: '#f472b6',
      icon: '🔄',
    },
    {
      name: 'QMC5883P',
      role: isEn ? 'Digital Compass' : 'Brújula Digital',
      proto: 'I2C',
      detail: isEn ? '3-axis magnetometer. Heading orientation for offline directional navigation.' : 'Magnetómetro 3 ejes. Orientación de heading para navegación direccional offline.',
      color: '#fbbf24',
      icon: '🧭',
    },
  ];

  const protocols = [
    { name: 'SPI', usage: 'LoRa SX1276', speed: '10 MHz', pins: 'MOSI/MISO/CLK/CS', color: '#00d4ff' },
    { name: 'I2C', usage: 'MPU6050 + QMC5883P', speed: '400 kHz', pins: 'SDA/SCL', color: '#00ff88' },
    { name: 'UART', usage: 'GPS NEO-6M', speed: '9600 bps', pins: 'TX/RX', color: '#ff6b00' },
    { name: 'WiFi/BLE', usage: 'Gateway upload', speed: '802.11 b/g/n', pins: 'Interno', color: '#a78bfa' },
  ];

  return (
    <div className="space-y-6">
      <p className="text-text-muted text-sm font-mono">
        <span className="text-neon-green">$</span> lspci -v | grep "{isEn ? 'Hiker Node' : 'Nodo Senderista'}" — {isEn ? 'Embedded hardware of the portable device' : 'Hardware embebido del dispositivo portátil'}
      </p>

      {/* Component Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {components.map(comp => (
          <motion.div
            key={comp.name}
            whileHover={{ scale: 1.02, borderColor: comp.color + '60' }}
            className="bg-dark-bg rounded-xl border border-dark-border p-4 cursor-default"
            style={{ transition: 'border-color 0.3s' }}
          >
            <div className="flex items-start justify-between mb-2">
              <span className="text-2xl">{comp.icon}</span>
              <span
                className="text-xs font-mono px-2 py-0.5 rounded-full border"
                style={{ color: comp.color, borderColor: comp.color + '40', background: comp.color + '10' }}
              >
                {comp.proto}
              </span>
            </div>
            <div className="font-mono font-bold text-sm mb-0.5" style={{ color: comp.color }}>{comp.name}</div>
            <div className="text-xs text-text-muted mb-2">{comp.role}</div>
            <p className="text-xs text-text-accent leading-relaxed">{comp.detail}</p>
          </motion.div>
        ))}
      </div>

      {/* Protocol Bus Table */}
      <div className="bg-dark-bg rounded-xl border border-dark-border overflow-hidden">
        <div className="px-4 py-2 border-b border-dark-border">
          <span className="terminal-text text-xs">// {isEn ? 'Hardware communication bus' : 'Bus de comunicación entre componentes'}</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="text-text-muted border-b border-dark-border">
                <th className="text-left px-4 py-2 font-mono">Protocolo</th>
                <th className="text-left px-4 py-2 font-mono">Dispositivo</th>
                <th className="text-left px-4 py-2 font-mono hidden sm:table-cell">Velocidad</th>
                <th className="text-left px-4 py-2 font-mono hidden md:table-cell">Pines</th>
              </tr>
            </thead>
            <tbody>
              {protocols.map(p => (
                <tr key={p.name} className="border-b border-dark-border/50 hover:bg-dark-surface/50 transition-colors">
                  <td className="px-4 py-2">
                    <span className="font-mono font-bold" style={{ color: p.color }}>{p.name}</span>
                  </td>
                  <td className="px-4 py-2 text-text-primary">{p.usage}</td>
                  <td className="px-4 py-2 text-text-muted hidden sm:table-cell">{p.speed}</td>
                  <td className="px-4 py-2 text-text-muted hidden md:table-cell font-mono">{p.pins}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default function Back2HomeTabs({ lang = 'es' }: { lang?: 'es' | 'en' }) {
  const [activeTab, setActiveTab] = useState<TabKey>('topology');
  const isEn = lang === 'en';

  const tabs: { key: TabKey; label: string; icon: string }[] = [
    { key: 'topology', label: isEn ? 'Network Topology' : 'Topología de Red', icon: '📡' },
    { key: 'hardware', label: 'Hardware & Edge', icon: '🔧' },
  ];

  return (
    <div className="mt-8">
      {/* Tab Controls */}
      <div className="flex gap-1 p-1 bg-dark-bg rounded-xl border border-dark-border mb-6 w-full sm:w-fit">
        {tabs.map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`relative flex items-center justify-center gap-1.5 sm:gap-2 flex-1 sm:flex-none px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-mono transition-all duration-300 ${
              activeTab === tab.key
                ? 'text-dark-bg font-semibold'
                : 'text-text-muted hover:text-text-primary'
            }`}
          >
            {activeTab === tab.key && (
              <motion.div
                layoutId="tab-bg"
                className="absolute inset-0 bg-neon-green rounded-lg"
                transition={{ type: 'spring', bounce: 0.2, duration: 0.4 }}
              />
            )}
            <span className="relative z-10">{tab.icon}</span>
            <span className="relative z-10">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.25 }}
        >
          {activeTab === 'topology' ? <TopologyTab lang={lang} /> : <HardwareTab lang={lang} />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
