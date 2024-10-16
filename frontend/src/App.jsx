import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Footer from "./components/Footer/Footer";
import Navigation from "./components/MobileNavigate/Navigation";
import BookDate from "./components/book_your_date/BookDate";
import ProtectedRoutes from "./components/protectedRoutes/ProtectedRoutes";
//bhumihar
function App() {

  return (
    <>
    <Navigation/>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/book_your_date" element={<ProtectedRoutes><BookDate/></ProtectedRoutes>}/>
    </Routes>
    <Footer/>
    </>
  )
}

export default App
