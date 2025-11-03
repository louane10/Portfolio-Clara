import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./app.scss";
import About from "./Components/About/About";
import Contact from "./Components/Contact/Contact";
import Navbar from "./Components/Navbar/Navbar";
import Gallery from "./Components/Gallery/Gallery";
import Hero from "./Components/Hero/Hero";
import Projects from "./Components/Gallery/Projects";
import GalleryAll from "./Components/Gallery/GalleryAll";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <section>
                <Navbar />
                <Hero />
                <About />
                <Projects />
                <Contact />
              </section>
            </>
          }
        />

        <Route path="/galerie/:category" element={<Gallery />} />
        <Route
          path="/univers"
          element={
            <>
              <GalleryAll />
            </>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
