import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const Face = ({ color = 'purple', size = 80 }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const faceRef = useRef(null);
  const [faceCenter, setFaceCenter] = useState({ x: 0, y: 0 });

  const colorMap = {
    purple: {
      main: '#8B5CF6',
      dark: '#7C3AED',
      light: '#A78BFA'
    },
    black: {
      main: '#1F2937',
      dark: '#111827',
      light: '#374151'
    },
    orange: {
      main: '#FB923C',
      dark: '#F97316',
      light: '#FDBA74'
    },
    yellow: {
      main: '#FDE047',
      dark: '#FACC15',
      light: '#FEF3C7'
    }
  };

  const colors = colorMap[color] || colorMap.purple;

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (faceRef.current) {
        const rect = faceRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        setFaceCenter({ x: centerX, y: centerY });
        setMousePosition({ x: e.clientX, y: e.clientY });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    
    if (faceRef.current) {
      const rect = faceRef.current.getBoundingClientRect();
      setFaceCenter({ x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 });
    }

    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const calculateEyeDirection = () => {
    if (!faceRef.current) return { x: 0, y: 0 };
    
    const deltaX = mousePosition.x - faceCenter.x;
    const deltaY = mousePosition.y - faceCenter.y;
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    
    const maxOffset = 8;
    const normalizedDistance = Math.min(distance / 200, 1);
    
    return {
      x: (deltaX / distance) * maxOffset * normalizedDistance || 0,
      y: (deltaY / distance) * maxOffset * normalizedDistance || 0
    };
  };

  const eyeOffset = calculateEyeDirection();

  const FaceShape = () => {
    switch (color) {
      case 'purple':
        return (
          <g>
            <circle cx="40" cy="40" r="35" fill={colors.main} />
            <rect x="20" y="15" width="40" height="25" rx="12" fill={colors.dark} />
          </g>
        );
      case 'black':
        return (
          <g>
            <rect x="10" y="15" width="60" height="50" rx="25" fill={colors.main} />
            <circle cx="40" cy="35" r="28" fill={colors.dark} />
          </g>
        );
      case 'orange':
        return (
          <g>
            <polygon points="40,10 65,30 65,60 40,70 15,60 15,30" fill={colors.main} />
            <rect x="25" y="25" width="30" height="30" rx="8" fill={colors.dark} />
          </g>
        );
      case 'yellow':
        return (
          <g>
            <ellipse cx="40" cy="40" rx="35" ry="30" fill={colors.main} />
            <rect x="20" y="20" width="40" height="35" rx="15" fill={colors.light} />
          </g>
        );
      default:
        return (
          <g>
            <circle cx="40" cy="40" r="35" fill={colors.main} />
          </g>
        );
    }
  };

  return (
    <div ref={faceRef} className="inline-block">
      <svg 
        width={size} 
        height={size} 
        viewBox="0 0 80 80" 
        className="overflow-visible"
      >
        <FaceShape />
        
        <motion.g
          animate={{
            translateX: eyeOffset.x,
            translateY: eyeOffset.y
          }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          <circle cx="28" cy="35" r="8" fill="white" />
          <circle cx="52" cy="35" r="8" fill="white" />
          <circle cx="28" cy="35" r="4" fill="#1F2937" />
          <circle cx="52" cy="35" r="4" fill="#1F2937" />
        </motion.g>
        
        <path 
          d="M 25 50 Q 40 55 55 50" 
          stroke={colors.dark} 
          strokeWidth="2" 
          fill="none" 
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
};

export default Face;
