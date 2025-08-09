import React, { useEffect, useRef } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import { Drawer, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import './MagicalNavbar.css'; // Import the CSS file

const MagicalLogo = ({ onClick, className }) => {
  const logoRef = useRef(null);

  useEffect(() => {
    const logo = logoRef.current;
    if (!logo) return;

    // Sparkle color classes array
    const sparkleClasses = [
      'sparkle-red',
      'sparkle-cyan', 
      'sparkle-blue',
      'sparkle-green',
      'sparkle-yellow',
      'sparkle-purple',
      'sparkle-white'
    ];

    // Create sparkling particles around logo
    const createSparkle = () => {
      const sparkle = document.createElement('div');
      const randomClass = sparkleClasses[Math.floor(Math.random() * sparkleClasses.length)];
      
      sparkle.className = `sparkle-particle ${randomClass}`;
      sparkle.style.width = Math.random() * 4 + 2 + 'px';
      sparkle.style.height = sparkle.style.width;
      sparkle.style.left = Math.random() * 100 + '%';
      sparkle.style.top = Math.random() * 100 + '%';
      
      logo.appendChild(sparkle);
      
      setTimeout(() => {
        if (sparkle.parentNode) sparkle.remove();
      }, 2000);
    };

    // Create sparkles continuously
    const sparkleInterval = setInterval(createSparkle, 300);

    // Mouse hover effect - create burst of sparkles
    const handleMouseEnter = () => {
      for (let i = 0; i < 5; i++) {
        setTimeout(createSparkle, i * 100);
      }
    };

    logo.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      clearInterval(sparkleInterval);
      logo.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, []);

  return (
    <div 
      ref={logoRef}
      onClick={onClick}
      className={`relative overflow-visible cursor-pointer select-none magical-logo-container ${className}`}
    >
      <h1 className="text-3xl font-bold transition-all duration-300 magical-logo-text">Emart</h1>
      
      {/* Magical aura effect */}
      <div className="absolute inset-0 rounded-lg opacity-20 -z-10 magical-aura" />
    </div>
  );
};

const Navbar = ({ DrawerList }) => {
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  return (
    <div className='h-[10vh] flex items-center px-5 magical-navbar'>
      <div className='flex items-center gap-3'>
        <IconButton 
          onClick={toggleDrawer(true)} 
          color='primary'
          className="transition-all duration-300 hover:scale-110 magical-menu-button"
        >
          <MenuIcon color='primary' />
        </IconButton>

        <MagicalLogo 
          onClick={() => navigate("/")} 
          className=""
        />
      </div>

      <Drawer open={open} onClose={toggleDrawer(false)}>
        <DrawerList toggleDrawer={toggleDrawer} />
      </Drawer>
    </div>
  );
};

export default Navbar;