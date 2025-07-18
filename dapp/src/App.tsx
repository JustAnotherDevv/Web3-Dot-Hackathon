import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/contexts/ThemeContext";
import Layout from "@/components/Layout";
import Portfolio from "@/pages/Portfolio";
import Swap from "@/pages/Swap";
import Bridge from "@/pages/Bridge";
import DeFi from "@/pages/DeFi";
import Landing from "./pages/Landing";
import Debug from "./pages/Debug";
import "./App.css";

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/debug" element={<Debug />} />
            {/* <Route path="/" element={<Portfolio />} /> */}
            <Route path="/swap" element={<Swap />} />
            <Route path="/bridge" element={<Bridge />} />
            <Route path="/defi" element={<DeFi />} />
          </Routes>
        </Layout>
      </Router>
    </ThemeProvider>
  );
}

export default App;
