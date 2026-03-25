import { Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Header from "../components/header";
import ProductPage from "./productpage";
import ProductOverview from "./productoverview";
import CartPage from "./cart";
import CheckoutPage from "./checkoutpage";
import { LandingPage } from "./landingpage";

export default function HomePage(){
    const location = useLocation();

    useEffect(() => {
        if (!location.hash) return;

        const id = location.hash.replace("#", "");
        const element = document.getElementById(id);

        if (element) {
            // Delay ensures section exists after route render before attempting scroll.
            setTimeout(() => {
                element.scrollIntoView({ behavior: "smooth", block: "start" });
            }, 50);
        }
    }, [location.pathname, location.hash]);

    return(
        <div className="w-full h-full bg-primary pt-[100px]">
            <Header/>
            <Routes path="/">
                <Route path="/" element={<LandingPage/>}/>
                <Route path="/products" element={<ProductPage/>}/>
                <Route path="/overview/:id" element={<ProductOverview/>}/>
                <Route path="/cart" element={<CartPage/>}/>
                <Route path="/checkout" element={<CheckoutPage/>}/>
                <Route path="/*" element={<h1>404 not found</h1>}/>
            </Routes>
        </div>
    )
}