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

const categoriesEs: SkillCategory[] = [
  {
    title: 'Lenguajes Base',
    subtitle: 'POO & Estructuras de Datos',
    icon: '💻',
    color: '#00d4ff',
    colorRgb: '0,212,255',
    skills: [
      { name: 'C++ (Avanzado)', level: 90 },
      { name: 'Java', level: 85 },
      { name: 'Python', level: 85 },
      { name: 'HTML5 / CSS3', level: 80 },
    ],
  },
  {
    title: 'Infraestructura & SysAdmin',
    subtitle: 'Virtualización y Redes',
    icon: '🐧',
    color: '#00ff88',
    colorRgb: '0,255,136',
    skills: [
      { name: 'Linux (CLI, Bash)', level: 90 },
      { name: 'Proxmox VE', level: 85 },
      { name: 'Redes (VLAN/VPN)', level: 80 },
      { name: 'SSH / Seguridad', level: 85 },
    ],
  },
  {
    title: 'Backend & Datos',
    subtitle: 'Servicios Web',
    icon: '🗄️',
    color: '#a855f7',
    colorRgb: '168,85,247',
    skills: [
      { name: 'Node.js / Express', level: 80 },
      { name: 'PostgreSQL', level: 75 },
      { name: 'MongoDB', level: 75 },
      { name: 'REST APIs', level: 80 },
    ],
  },
];

const categoriesEn: SkillCategory[] = [
  {
    title: 'Core Languages',
    subtitle: 'OOP & Data Structures',
    icon: '💻',
    color: '#00d4ff',
    colorRgb: '0,212,255',
    skills: [
      { name: 'C++ (Advanced)', level: 90 },
      { name: 'Java', level: 85 },
      { name: 'Python', level: 85 },
      { name: 'HTML5 / CSS3', level: 80 },
    ],
  },
  {
    title: 'Infrastructure & SysAdmin',
    subtitle: 'Virtualization & Networks',
    icon: '🐧',
    color: '#00ff88',
    colorRgb: '0,255,136',
    skills: [
      { name: 'Linux (CLI, Bash)', level: 90 },
      { name: 'Proxmox VE', level: 85 },
      { name: 'Networks (VLAN/VPN)', level: 80 },
      { name: 'SSH / Security', level: 85 },
    ],
  },
  {
    title: 'Backend & Data',
    subtitle: 'Web Services',
    icon: '🗄️',
    color: '#a855f7',
    colorRgb: '168,85,247',
    skills: [
      { name: 'Node.js / Express', level: 80 },
      { name: 'PostgreSQL', level: 75 },
      { name: 'MongoDB', level: 75 },
      { name: 'REST APIs', level: 80 },
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

export default function SkillCards({ lang = 'es' }: { lang?: 'es' | 'en' }) {
  const categories = lang === 'en' ? categoriesEn : categoriesEs;

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
            <div className="flex flex-wrap gap-2 mt-2">
              {cat.skills.map((skill, index) => (
                <motion.span
                  key={skill.name}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="text-xs font-medium px-3 py-1.5 rounded-full border bg-dark-bg/50 text-text-muted hover:text-text-primary cursor-default"
                  style={{
                    borderColor: `rgba(${cat.colorRgb}, 0.15)`,
                  }}
                  whileHover={{ 
                    borderColor: `rgba(${cat.colorRgb}, 0.5)`,
                    backgroundColor: `rgba(${cat.colorRgb}, 0.05)`,
                    y: -2
                  }}
                >
                  {skill.name}
                </motion.span>
              ))}
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}
