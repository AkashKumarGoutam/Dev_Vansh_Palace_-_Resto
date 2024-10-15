import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Footer from "./components/Footer/Footer";
import Navigation from "./components/MobileNavigate/Navigation";
import BookDate from "./components/book_your_date/BookDate";
//bhumihar
function App() {

  return (
    <>
    <Navigation/>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/book_your_date" element={<BookDate/>}/>
    </Routes>
    <Footer/>
    </>
  )
}

export default App
