import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";

function App() {
  return (
    <>
      {/* <Navbar /> */}
      <Routes>
        <Route index path="/" element={<Home />} />
        {/* <Route path="about" element={<About />} />
        <Route path="models" element={<Models />} />
        <Route path="testimonials" element={<TestimonialsPage />} />
        <Route path="team" element={<Team />} />
        <Route path="contact" element={<Contact />} /> */}
      </Routes>
    </>
  );
}

export default App;
