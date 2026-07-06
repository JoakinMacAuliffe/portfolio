'use client';

import { useEffect, useRef } from 'react';

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  pulse: number;
  pulseSpeed: number;
  type: 'gateway' | 'repeater' | 'node';
}

interface Packet {
  fromNode: number;
  toNode: number;
  progress: number;
  speed: number;
  color: string;
}

export default function NodeCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const animFrameRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = canvas.offsetWidth;
    let height = canvas.offsetHeight;
    canvas.width = width;
    canvas.height = height;

    // Create nodes — fewer on mobile for performance
    const isMobile = width < 640;
    const nodeCount = Math.floor((width * height) / (isMobile ? 30000 : 18000));
    const nodes: Node[] = [];

    const types: Node['type'][] = ['gateway', 'repeater', 'repeater', 'node', 'node', 'node'];
    for (let i = 0; i < Math.max(nodeCount, isMobile ? 8 : 15); i++) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        radius: i === 0 ? 6 : Math.random() * 2 + 2,
        pulse: Math.random() * Math.PI * 2,
        pulseSpeed: 0.02 + Math.random() * 0.01,
        type: types[i % types.length],
      });
    }

    // Packets traveling between nodes
    const packets: Packet[] = [];
    const colors = ['#00ff88', '#00d4ff', '#ff6b00'];

    const spawnPacket = () => {
      const from = Math.floor(Math.random() * nodes.length);
      let to = Math.floor(Math.random() * nodes.length);
      while (to === from) to = Math.floor(Math.random() * nodes.length);
      const dist = Math.hypot(nodes[from].x - nodes[to].x, nodes[from].y - nodes[to].y);
      if (dist < 250) {
        packets.push({
          fromNode: from,
          toNode: to,
          progress: 0,
          speed: 0.008 + Math.random() * 0.006,
          color: colors[Math.floor(Math.random() * colors.length)],
        });
      }
    };

    let packetTimer = 0;
    const MAX_DISTANCE = 180;

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // Background subtle radial
      const grd = ctx.createRadialGradient(width / 2, height / 2, 0, width / 2, height / 2, Math.max(width, height) * 0.7);
      grd.addColorStop(0, 'rgba(0,212,255,0.04)');
      grd.addColorStop(1, 'transparent');
      ctx.fillStyle = grd;
      ctx.fillRect(0, 0, width, height);

      // Mouse repulsion
      nodes.forEach(node => {
        const dx = node.x - mouseRef.current.x;
        const dy = node.y - mouseRef.current.y;
        const dist = Math.hypot(dx, dy);
        if (dist < 120) {
          const force = (120 - dist) / 120;
          node.vx += (dx / dist) * force * 0.4;
          node.vy += (dy / dist) * force * 0.4;
        }
        // Speed limit
        const speed = Math.hypot(node.vx, node.vy);
        if (speed > 1.5) {
          node.vx = (node.vx / speed) * 1.5;
          node.vy = (node.vy / speed) * 1.5;
        }

        node.x += node.vx;
        node.y += node.vy;

        // Friction
        node.vx *= 0.98;
        node.vy *= 0.98;

        // Bounce
        if (node.x < 0 || node.x > width) node.vx *= -1;
        if (node.y < 0 || node.y > height) node.vy *= -1;
        node.x = Math.max(0, Math.min(width, node.x));
        node.y = Math.max(0, Math.min(height, node.y));

        node.pulse += node.pulseSpeed;
      });

      // Draw connections
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.hypot(dx, dy);
          if (dist < MAX_DISTANCE) {
            const opacity = (1 - dist / MAX_DISTANCE) * 0.35;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `rgba(0,255,136,${opacity})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      // Spawn and draw packets
      packetTimer++;
      if (packetTimer % 40 === 0 && packets.length < 12) {
        spawnPacket();
      }

      packets.forEach((pkt, idx) => {
        pkt.progress += pkt.speed;
        if (pkt.progress >= 1) {
          packets.splice(idx, 1);
          return;
        }
        const from = nodes[pkt.fromNode];
        const to = nodes[pkt.toNode];
        const px = from.x + (to.x - from.x) * pkt.progress;
        const py = from.y + (to.y - from.y) * pkt.progress;

        ctx.beginPath();
        ctx.arc(px, py, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = pkt.color;
        ctx.shadowBlur = 8;
        ctx.shadowColor = pkt.color;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      // Draw nodes
      nodes.forEach((node, i) => {
        const pulseScale = 1 + Math.sin(node.pulse) * 0.15;
        const isGateway = node.type === 'gateway';
        const isRepeater = node.type === 'repeater';

        const nodeColor = isGateway ? '#ff6b00' : isRepeater ? '#00d4ff' : '#00ff88';
        const r = node.radius * pulseScale;

        // Outer glow ring
        const glowAlpha = 0.15 + Math.sin(node.pulse) * 0.05;
        ctx.beginPath();
        ctx.arc(node.x, node.y, r * 3, 0, Math.PI * 2);
        ctx.fillStyle = nodeColor.replace(')', `,${glowAlpha})`).replace('rgb', 'rgba').replace('#', 'rgba(');

        // Simpler approach:
        if (isGateway) {
          ctx.fillStyle = `rgba(255,107,0,${glowAlpha})`;
        } else if (isRepeater) {
          ctx.fillStyle = `rgba(0,212,255,${glowAlpha})`;
        } else {
          ctx.fillStyle = `rgba(0,255,136,${glowAlpha})`;
        }
        ctx.fill();

        // Core node
        ctx.beginPath();
        ctx.arc(node.x, node.y, r, 0, Math.PI * 2);
        ctx.fillStyle = nodeColor;
        ctx.shadowBlur = 12;
        ctx.shadowColor = nodeColor;
        ctx.fill();
        ctx.shadowBlur = 0;

        // Inner bright dot
        ctx.beginPath();
        ctx.arc(node.x, node.y, r * 0.4, 0, Math.PI * 2);
        ctx.fillStyle = '#ffffff';
        ctx.fill();

        // Label for special nodes
        if (isGateway) {
          ctx.font = '9px JetBrains Mono, monospace';
          ctx.fillStyle = 'rgba(255,107,0,0.8)';
          ctx.fillText('GW', node.x + r + 4, node.y + 3);
        }
      });

      animFrameRef.current = requestAnimationFrame(draw);
    };

    draw();

    // Mouse tracking
    const handleMouse = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    const handleMouseLeave = () => {
      mouseRef.current = { x: -1000, y: -1000 };
    };
    // Touch support
    const handleTouch = (e: TouchEvent) => {
      const rect = canvas.getBoundingClientRect();
      const touch = e.touches[0];
      if (touch) {
        mouseRef.current = { x: touch.clientX - rect.left, y: touch.clientY - rect.top };
      }
    };
    const handleTouchEnd = () => {
      mouseRef.current = { x: -1000, y: -1000 };
    };

    canvas.addEventListener('mousemove', handleMouse);
    canvas.addEventListener('mouseleave', handleMouseLeave);
    canvas.addEventListener('touchmove', handleTouch, { passive: true });
    canvas.addEventListener('touchend', handleTouchEnd);

    // Resize
    const handleResize = () => {
      width = canvas.offsetWidth;
      height = canvas.offsetHeight;
      canvas.width = width;
      canvas.height = height;
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      canvas.removeEventListener('mousemove', handleMouse);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      canvas.removeEventListener('touchmove', handleTouch);
      canvas.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full opacity-70"
      style={{ cursor: 'crosshair' }}
      aria-hidden="true"
    />
  );
}
