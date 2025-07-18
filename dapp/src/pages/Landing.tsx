import React, { useState, useEffect } from "react";

const Landing: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Delay the text visibility for a longer unblur animation
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 500); // 500ms delay before starting the unblur

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative w-full h-screen min-h-screen">
      {/* Main Hero Content */}
      <div className="relative w-full h-full bg-black">
        {/* Background Image - Fixed to cover full viewport */}
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          <img
            src="/sky.png"
            alt="AI Crypto Visualization"
            className="z-10 w-full h-full object-cover"
          />
          {/* Dark overlay with golden tint */}
          <div className="absolute inset-0 bg-gradient-to-b from-amber-900/20 via-black/30 to-black/50 z-20"></div>
          {/* Gradient fade overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black z-30"></div>
        </div>

        {/* Floating Cloud Background */}
        <div className="absolute inset-0 z-15 flex items-center justify-center">
          <img
            src="/cloud1.png"
            alt="Cloud"
            className="w-96 h-96 sm:w-[500px] sm:h-[500px] md:w-[600px] md:h-[600px] object-contain opacity-20"
            style={{
              filter: "blur(2px)",
              animation: "cloudFloat 12s ease-in-out infinite",
            }}
          />
        </div>

        {/* Floating Hermes Image - Positioned in upper half */}
        <div
          className="absolute inset-0 z-25 flex items-center justify-center"
          style={{ marginTop: "-10vh" }}
        >
          <div className="relative">
            <img
              src="/hermes.png"
              alt="Hermes"
              className="w-80 h-80 sm:w-96 sm:h-96 md:w-[500px] md:h-[500px] object-contain opacity-90"
              style={{
                filter:
                  "drop-shadow(0 0 30px rgba(255, 215, 0, 0.6)) drop-shadow(0 0 60px rgba(255, 215, 0, 0.3))",
                animation: "float 6s ease-in-out infinite",
              }}
            />
            {/* Golden aura effect */}
            <div
              className="absolute inset-0 rounded-full opacity-30"
              style={{
                background:
                  "radial-gradient(circle, rgba(255, 215, 0, 0.3) 0%, rgba(255, 215, 0, 0.1) 40%, transparent 70%)",
                animation: "pulse 3s ease-in-out infinite alternate",
              }}
            />
          </div>
        </div>

        {/* Typography overlaid on top - Fixed at bottom of viewport */}
        <div className="absolute bottom-0 left-0 right-0 z-30 pb-6 sm:pb-8 md:pb-10">
          <div className="text-center px-4 md:px-0">
            <h1
              className="text-4xl sm:text-5xl md:text-6xl font-light tracking-widest leading-tight mb-4 opacity-75"
              style={{
                fontFamily: "serif",
                textShadow:
                  "0 0 20px rgba(255, 215, 0, 0.8), 0 0 40px rgba(255, 215, 0, 0.4)",
                background: "linear-gradient(45deg, #FFD700, #FFA500, #FFD700)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                letterSpacing: "0.2em",
              }}
            >
              HERMES
            </h1>

            {/* Greek decorative elements */}
            <div className="flex justify-center items-center space-x-6 mt-3">
              <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-amber-400 to-transparent"></div>
              <div className="text-amber-400 text-xl">⚡</div>
              <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-amber-400 to-transparent"></div>
            </div>

            {/* Subtitle with Greek mythology reference */}
            <p
              className="text-base sm:text-lg md:text-xl font-light tracking-wide mt-4 opacity-80"
              style={{
                fontFamily: "serif",
                color: "#D4AF37",
                textShadow: "0 0 10px rgba(212, 175, 55, 0.5)",
              }}
            >
              Messenger of the Gods
            </p>
          </div>
        </div>

        {/* Greek border pattern */}
        <div className="absolute bottom-0 left-0 right-0 h-2 z-40">
          <div
            className="w-full h-full opacity-60"
            style={{
              background:
                "repeating-linear-gradient(90deg, #FFD700 0px, #FFD700 20px, #FFA500 20px, #FFA500 40px)",
            }}
          />
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          25% {
            transform: translateY(-10px) rotate(1deg);
          }
          50% {
            transform: translateY(-5px) rotate(0deg);
          }
          75% {
            transform: translateY(-15px) rotate(-1deg);
          }
        }

        @keyframes cloudFloat {
          0%,
          100% {
            transform: translateX(-50px) translateY(0px) rotate(0deg);
          }
          25% {
            transform: translateX(-30px) translateY(-20px) rotate(0.5deg);
          }
          50% {
            transform: translateX(-10px) translateY(-10px) rotate(0deg);
          }
          75% {
            transform: translateX(-40px) translateY(-30px) rotate(-0.5deg);
          }
        }

        @keyframes pulse {
          0% {
            opacity: 0.2;
            transform: scale(0.95);
          }
          100% {
            opacity: 0.4;
            transform: scale(1.05);
          }
        }
      `}</style>
    </div>
  );
};

export default Landing;
