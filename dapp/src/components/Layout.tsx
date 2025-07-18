import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/contexts/ThemeContext";
import {
  Moon,
  Sun,
  Wallet,
  BarChart3,
  ArrowLeftRight,
  Grid,
  Coins,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { path: "/", label: "Portfolio", icon: BarChart3 },
    { path: "/swap", label: "Swap", icon: ArrowLeftRight },
    { path: "/bridge", label: "Bridge", icon: Grid },
    { path: "/defi", label: "DeFi", icon: Coins },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-amber-900/20">
      <header
        className="sticky top-0 z-50 backdrop-blur-sm"
        style={{
          background:
            "linear-gradient(180deg, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.85) 100%)",
          borderBottom: "2px solid rgba(255, 215, 0, 0.3)",
          boxShadow: "0 4px 20px rgba(255, 215, 0, 0.1)",
        }}
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <img
                src="/hermes_shoe.png"
                alt="Hermes Logo"
                className="z-10 w-12 h-12"
                style={{
                  filter: "drop-shadow(0 0 10px rgba(255, 215, 0, 0.6))",
                }}
              />
              <h1
                className="text-2xl font-light tracking-wider"
                style={{
                  fontFamily: "serif",
                  background:
                    "linear-gradient(45deg, #FFD700, #FFA500, #FFD700)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  textShadow: "0 0 10px rgba(255, 215, 0, 0.5)",
                  letterSpacing: "0.15em",
                }}
              >
                HERMES
              </h1>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 relative ${
                      isActive
                        ? "text-amber-400 shadow-lg"
                        : "text-amber-200/70 hover:text-amber-300"
                    }`}
                    style={{
                      fontFamily: "serif",
                      background: isActive
                        ? "linear-gradient(135deg, rgba(255, 215, 0, 0.2), rgba(255, 165, 0, 0.1))"
                        : "transparent",
                      border: isActive
                        ? "1px solid rgba(255, 215, 0, 0.3)"
                        : "1px solid transparent",
                      boxShadow: isActive
                        ? "0 0 15px rgba(255, 215, 0, 0.2), inset 0 0 15px rgba(255, 215, 0, 0.1)"
                        : "none",
                    }}
                  >
                    <Icon size={16} />
                    <span className="font-medium tracking-wide">
                      {item.label}
                    </span>
                    {isActive && (
                      <div
                        className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1/2 h-0.5"
                        style={{
                          background:
                            "linear-gradient(90deg, transparent, #FFD700, transparent)",
                        }}
                      />
                    )}
                  </Link>
                );
              })}
            </nav>

            <div className="flex items-center space-x-3">
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                className="transition-all duration-300 text-amber-200/70 hover:text-amber-300 hover:bg-amber-400/10"
                style={{
                  border: "1px solid rgba(255, 215, 0, 0.2)",
                  borderRadius: "8px",
                }}
              >
                {theme === "dark" ? (
                  <Sun className="h-5 w-5" />
                ) : (
                  <Moon className="h-5 w-5" />
                )}
              </Button>

              <Button
                className="hidden sm:flex px-6 py-2 font-medium tracking-wide transition-all duration-300"
                style={{
                  fontFamily: "serif",
                  background: "linear-gradient(135deg, #FFD700, #FFA500)",
                  border: "1px solid rgba(255, 215, 0, 0.5)",
                  color: "#000",
                  textShadow: "0 1px 2px rgba(0,0,0,0.2)",
                  boxShadow:
                    "0 4px 15px rgba(255, 215, 0, 0.3), inset 0 1px 0 rgba(255,255,255,0.2)",
                  borderRadius: "8px",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background =
                    "linear-gradient(135deg, #FFA500, #FFD700)";
                  e.currentTarget.style.boxShadow =
                    "0 6px 20px rgba(255, 215, 0, 0.4), inset 0 1px 0 rgba(255,255,255,0.3)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background =
                    "linear-gradient(135deg, #FFD700, #FFA500)";
                  e.currentTarget.style.boxShadow =
                    "0 4px 15px rgba(255, 215, 0, 0.3), inset 0 1px 0 rgba(255,255,255,0.2)";
                }}
              >
                <Wallet className="mr-2 h-4 w-4" />
                Connect Wallet
              </Button>

              {/* Mobile menu button */}
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden text-amber-200/70 hover:text-amber-300 hover:bg-amber-400/10"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                style={{
                  border: "1px solid rgba(255, 215, 0, 0.2)",
                  borderRadius: "8px",
                }}
              >
                {isMobileMenuOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <div
              className="md:hidden mt-4 pb-4 pt-4"
              style={{
                borderTop: "1px solid rgba(255, 215, 0, 0.3)",
              }}
            >
              <nav className="flex flex-col space-y-2">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = location.pathname === item.path;
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300 ${
                        isActive
                          ? "text-amber-400"
                          : "text-amber-200/70 hover:text-amber-300"
                      }`}
                      style={{
                        fontFamily: "serif",
                        background: isActive
                          ? "linear-gradient(135deg, rgba(255, 215, 0, 0.2), rgba(255, 165, 0, 0.1))"
                          : "transparent",
                        border: isActive
                          ? "1px solid rgba(255, 215, 0, 0.3)"
                          : "1px solid transparent",
                        boxShadow: isActive
                          ? "0 0 15px rgba(255, 215, 0, 0.2)"
                          : "none",
                      }}
                    >
                      <Icon size={18} />
                      <span className="font-medium tracking-wide">
                        {item.label}
                      </span>
                    </Link>
                  );
                })}
              </nav>

              {/* Greek decorative divider */}
              <div className="flex justify-center items-center space-x-4 my-4">
                <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-amber-400 to-transparent"></div>
                <div className="text-amber-400 text-lg">⚡</div>
                <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-amber-400 to-transparent"></div>
              </div>

              <Button
                className="w-full mt-4 py-3 font-medium tracking-wide"
                style={{
                  fontFamily: "serif",
                  background: "linear-gradient(135deg, #FFD700, #FFA500)",
                  border: "1px solid rgba(255, 215, 0, 0.5)",
                  color: "#000",
                  textShadow: "0 1px 2px rgba(0,0,0,0.2)",
                  boxShadow: "0 4px 15px rgba(255, 215, 0, 0.3)",
                  borderRadius: "8px",
                }}
              >
                <Wallet className="mr-2 h-4 w-4" />
                Connect Wallet
              </Button>
            </div>
          )}
        </div>
      </header>

      <main className="w-screen">{children}</main>
    </div>
  );
};

export default Layout;
