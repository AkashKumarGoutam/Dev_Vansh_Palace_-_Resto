import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Footer from "./components/Footer/Footer";
import Navigation from "./components/MobileNavigate/Navigation";

function App() {

  return (
    <>
    <Navigation/>
    <Routes>
      <Route path="/" element={<Home/>}/>
    </Routes>
    <Footer/>
    </>
  )
}

export default App
