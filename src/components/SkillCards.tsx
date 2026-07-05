'use client';

import { motion } from 'framer-motion';

interface Skill {
  name: string;
  level?: number; // 0-100
  icon?: string;
}

interface SkillCategory {
  title: string;
  subtitle: string;
  icon: string;
  color: string;
  colorRgb: string;
  skills: Skill[];
}

const categories: SkillCategory[] = [
  {
    title: 'RF & Wireless',
    subtitle: 'Telecomunicaciones',
    icon: '📡',
    color: '#00ff88',
    colorRgb: '0,255,136',
    skills: [
      { name: 'LoRaWAN / LoRa Mesh', level: 90 },
      { name: 'ISDB-Tb (TV Digital)', level: 80 },
      { name: 'MQTT / BLE', level: 75 },
      { name: 'Análisis de Espectro RF', level: 75 },
    ],
  },
  {
    title: 'Hardware & Embedded',
    subtitle: 'Sistemas Embebidos',
    icon: '🔧',
    color: '#00d4ff',
    colorRgb: '0,212,255',
    skills: [
      { name: 'ESP32 / Arduino', level: 90 },
      { name: 'SPI / I2C / UART', level: 85 },
      { name: 'GPS (NEO-6M)', level: 80 },
      { name: 'Raspberry Pi', level: 75 },
    ],
  },
  {
    title: 'Software & Cloud',
    subtitle: 'Desarrollo e Infraestructura',
    icon: '💻',
    color: '#ff6b00',
    colorRgb: '255,107,0',
    skills: [
      { name: 'Linux / SSH / VPN', level: 85 },
      { name: 'Python', level: 80 },
      { name: 'PostgreSQL / PostGIS', level: 75 },
      { name: 'REST APIs / Git', level: 75 },
    ],
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

export default function SkillCards() {
  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
    >
      {categories.map((cat) => (
        <motion.div
          key={cat.title}
          variants={cardVariants}
          whileHover={{ y: -4 }}
          className="relative bg-dark-card rounded-2xl border border-dark-border overflow-hidden group cursor-default"
          style={{ transition: 'border-color 0.3s' }}
        >
          {/* Hover border glow */}
          <div
            className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
            style={{ boxShadow: `inset 0 0 0 1px ${cat.color}40` }}
          ></div>

          {/* Top accent bar */}
          <div
            className="h-1 w-full"
            style={{ background: `linear-gradient(90deg, ${cat.color}, transparent)` }}
          ></div>

          {/* Corner glow */}
          <div
            className="absolute -top-12 -right-12 w-32 h-32 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
            style={{ background: `radial-gradient(circle, rgba(${cat.colorRgb},0.12) 0%, transparent 70%)` }}
          ></div>

          <div className="p-6">
            {/* Header */}
            <div className="flex items-center gap-3 mb-4">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center text-lg border"
                style={{ background: `rgba(${cat.colorRgb},0.1)`, borderColor: `rgba(${cat.colorRgb},0.3)` }}
              >
                {cat.icon}
              </div>
              <div>
                <div className="font-bold text-text-primary text-sm">{cat.title}</div>
                <div className="font-mono text-xs" style={{ color: cat.color }}>{cat.subtitle}</div>
              </div>
            </div>

            {/* Skills list */}
            <div className="space-y-3">
              {cat.skills.map((skill) => (
                <div key={skill.name}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-text-primary">{skill.name}</span>
                  </div>
                  <div className="h-1 bg-dark-bg rounded-full overflow-hidden">
                    <motion.div
                      className="h-full rounded-full"
                      style={{ background: `linear-gradient(90deg, ${cat.color}, ${cat.color}80)` }}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}
