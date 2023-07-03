import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Update from "./pages/Update";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/update/:id" element={<Update />} />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
