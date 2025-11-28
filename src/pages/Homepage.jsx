import { Route, Routes } from "react-router-dom";
import Header from "../components/header";
import ProductPage from "./productpage";
import ProductOverview from "./productoverview";
import CartPage from "./cart";
import CheckoutPage from "./checkoutpage";
import { LandingPage } from "./landingpage";

export default function HomePage(){
    return(
        <div className="w-full h-full bg-primary ">
            <Header/>
            <Routes path="/">
                <Route path="/" element={<LandingPage/>}/>
                <Route path="/products" element={<ProductPage/>}/>
                <Route path="/about" element={<h1>About us</h1>}/>
                <Route path="/contact" element={<h1>Contact</h1>}/>
                <Route path="/overview/:id" element={<ProductOverview/>}/>
                <Route path="/cart" element={<CartPage/>}/>
                <Route path="/checkout" element={<CheckoutPage/>}/>
                <Route path="/*" element={<h1>404 not found</h1>}/>
            </Routes>
        </div>
    )
}