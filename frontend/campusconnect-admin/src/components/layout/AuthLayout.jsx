import React from 'react'
const quotes = [
  "Success is not final, failure is not fatal: It is the courage to continue that counts.",
  "Believe you can and you're halfway there.",

  "Do what you can, with what you have, where you are.",
  "The only way to do great work is to love what you do.",
  "Your limitation—it's only your imagination.",
];

const randomPositions = [
  { top: "10%", left: "10%" },
  { top: "20%", right: "15%" },
  { bottom: "15%", left: "25%" },
  { top: "50%", right: "10%" },
  { bottom: "30%", left: "5%" },
  { top: "70%", right: "25%" },
  { bottom: "10%", left: "50%" },
];

const AuthLayout = ({ children }) => {
  return (
    <div className="flex">
      <div className="w-screen h-screen md:w-1/2 px-12 pt-8 pb-12">
        <h2 className="text-lg font-medium text-black">Vaze Connect</h2>
        {children}
      </div>
      <div className="hidden md:flex w-1/2 h-screen bg-gradient-to-r from-blue-500 to-purple-600 relative overflow-hidden">
        {/* SVG Wave */}
        <svg
          className="absolute bottom-0 left-0 w-full h-40"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
        >
          <path
            fill="white"
            fillOpacity="0.3"
            d="M0,224L48,208C96,192,192,160,288,133.3C384,107,480,85,576,80C672,75,768,85,864,117.3C960,149,1056,203,1152,224C1248,245,1344,235,1392,229.3L1440,224L1440,320L0,320Z"
          ></path>
        </svg>

        {/* Motivational Quotes (Randomly Placed) */}
        {quotes.map((quote, index) => (
          <div
            key={index}
            className="absolute bg-white/20 backdrop-blur-md p-4 rounded-xl shadow-lg text-white text-sm font-semibold animate-fadeIn"
            style={{
              ...randomPositions[index], // Assigns a unique random position
            }}
          >
            {quote}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AuthLayout
