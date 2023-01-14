import "swiper/css";
import "swiper/css/navigation";
import {Routes, Route} from "react-router-dom"
import Home from "./pages/Home"
import Product from "./pages/Product"
import Footer from "./components/Footer";
import MainHeadNav from "./components/main/MainHeadNav";
import SingleProduct from "./pages/SingleProduct";
import Category from "./pages/Category";
import About from "./pages/About";
import Adminpanel from "./pages/Adminpanel"

function App() {

  if (window.location.pathname == "/admin/adminpanel") {
    return <Adminpanel />
  } else {
    return (
      <div className="App max-w-10 text-sm divide-y xl:max-w-10 sm:maxa-w-none sm:text-xs xl:text-sm">
        <div className="max-w-screen-lg m-auto">
          <MainHeadNav/>
        </div>
        
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/products" element={<Product/>} />
          <Route path="/singleproduct" element={<SingleProduct/>} />
          <Route path="/category" element={<Category/>} />
          <Route path="/about" element={<About/>} />
        </Routes>

        <Footer/>
      </div>
    );
  }
}

export default App;