import {
  Avatar,
  Badge,
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useState, useEffect, useRef } from "react";
import "./Navbar.css";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import StorefrontIcon from "@mui/icons-material/Storefront";
import SearchIcon from "@mui/icons-material/Search";
import MenuIcon from "@mui/icons-material/Menu";
import { mainCategory } from "../../../data/category/mainCategory";
import CategorySheet from "./CategorySheet";
import DrawerList from "./DrawerList";
import { useNavigate } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useAppDispatch, useAppSelector } from "../../../Redux Toolkit/Store";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

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

const Navbar = () => {
  const [showSheet, setShowSheet] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const theme = useTheme();
  const isLarge = useMediaQuery(theme.breakpoints.up("lg"));
  const dispatch = useAppDispatch();
  const { user, cart, sellers } = useAppSelector((store) => store);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen) => () => setOpen(newOpen);

  const becomeSellerClick = () => {
    if (sellers.profile?.id) {
      navigate("/seller");
    } else {
      navigate("/become-seller");
    }
  };

  return (
    <Box sx={{ zIndex: 2 }} className="sticky top-0 left-0 right-0 bg-white blur-bg bg-opacity-80 magical-navbar">
      <div className="flex items-center justify-between px-5 lg:px-20 h-[70px]">
        <div className="flex items-center gap-9">
          <div className="flex items-center gap-2">
            {!isLarge && (
              <IconButton onClick={toggleDrawer(true)}>
                <MenuIcon className="text-gray-700" sx={{ fontSize: 29 }} />
              </IconButton>
            )}
      <MagicalLogo 
        onClick={() => navigate("/")}
        className="text-xl font-bold transition-all duration-300 magical-logo-text"
      />
          </div>

          {isLarge && (
            <ul className="flex items-center font-medium text-gray-800">
              {mainCategory.map((item, index) => (
                <li
                  key={`${item.categoryId}_${index}`}
                  onMouseEnter={() => {
                    setSelectedCategory(item.categoryId);
                    setShowSheet(true);
                  }}
                  onMouseLeave={() => setShowSheet(false)}
                  className="mainCategory hover:text-[#3f51b5] cursor-pointer hover:border-b-2 h-[70px] px-4 border-[#3f51b5] flex items-center"
                >
                  {item.name}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="flex gap-1 lg:gap-6 items-center">
          <IconButton onClick={() => navigate("/search-products")}>
            <SearchIcon className="text-gray-700" sx={{ fontSize: 29 }} />
          </IconButton>

          {user.user ? (
            <Button onClick={() => navigate("/account/orders")} className="flex items-center gap-2">
              <Avatar
                sx={{ width: 29, height: 29 }}
                src="https://cdn.pixabay.com/photo/2015/04/15/09/28/head-723540_640.jpg"
              />
              <h1 className="font-semibold hidden lg:block">{user.user?.fullName?.split(" ")[0]}</h1>
            </Button>
          ) : (
            <Button variant="contained" startIcon={<AccountCircleIcon sx={{ fontSize: "12px" }} />} onClick={() => navigate("/login")}>
              Login
            </Button>
          )}

          <IconButton onClick={() => navigate("/wishlist")}>
            <FavoriteBorderIcon sx={{ fontSize: 29 }} className="text-gray-700" />
          </IconButton>

          <IconButton onClick={() => navigate("/cart")}>
            <Badge badgeContent={cart.cart?.cartItems.length} color="primary">
              <AddShoppingCartIcon sx={{ fontSize: 29 }} className="text-gray-700" />
            </Badge>
          </IconButton>

          {isLarge && (
            <Button onClick={becomeSellerClick} startIcon={<StorefrontIcon />} variant="outlined">
              Become Seller
            </Button>
          )}
        </div>
      </div>

      <Drawer open={open} onClose={toggleDrawer(false)}>
        <DrawerList toggleDrawer={toggleDrawer} />
      </Drawer>

      {showSheet && selectedCategory && (
        <div onMouseEnter={() => setShowSheet(true)} onMouseLeave={() => setShowSheet(false)} className="categorySheet absolute top-[4.41rem] left-20 right-20">
          <CategorySheet setShowSheet={setShowSheet} selectedCategory={selectedCategory} />
        </div>
      )}
    </Box>
  );
};

export default Navbar;
