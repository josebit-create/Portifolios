import { Outlet } from "react-router-dom";

import Footer from "./components/Footer";
import NavBar from "./components/NavBar";

function App() {
  return (
    <div>
      <NavBar />
      <Outlet />
      <Footer />
    </div>
  );
}

export default App;
