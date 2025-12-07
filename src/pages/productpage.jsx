import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Loading from "../components/loader";
import ProductCard from "../components/productCard";

export default function ProductPage() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isLoading) {
      axios
        .get(import.meta.env.VITE_API_URL + "/api/products")
        .then((response) => {
          setProducts(response.data);
          setIsLoading(false);
        })
        .catch((error) => {
          console.log("Error Fletching Product" + error);
          setIsLoading(false);
          toast.error("Failed to load products");
        });
    }
  }, [isLoading]);

  return (
    <div className="w-full min-h-[calc(100%-100px)] bg-primary">

      {/* Search Bar Section */}
      <div className="w-full h-[100px] flex justify-center items-center">

        <div className="relative w-[50%]">
          <input
            type="text"
            placeholder="Search for products..."
            className="
              w-full h-[48px] px-14 rounded-full
              bg-white/60 backdrop-blur-md
              border border-accent/40
              text-secondary placeholder-secondary/50
              shadow-md hover:shadow-lg
              focus:ring-2 focus:ring-accent/70 focus:border-accent
              transition-all duration-300
              outline-none
            "
            onChange={async (e) => {
              try {
                if (e.target.value == "") {
                  setIsLoading(true);
                } else {
                  const searchResult = await axios.get(
                    import.meta.env.VITE_API_URL +
                      "/api/products/search/" +
                      e.target.value
                  );
                  setProducts(searchResult.data);
                }
              } catch (error) {}
            }}
          />

          {/* Search Icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-6 h-6 text-accent absolute left-5 top-1/2 -translate-y-1/2 pointer-events-none"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-4.35-4.35m0 0A7 7 0 103 10a7 7 0 0013.65 6.65z"
            />
          </svg>
        </div>
      </div>

      {/* Product List */}
      {isLoading ? (
        <Loading />
      ) : (
        <div className="w-full h-full flex p-[10px] gap-[20px] flex-wrap justify-center items-center">
          {products.map((item) => {
            return <ProductCard key={item.productID} product={item} />;
          })}
        </div>
      )}
    </div>
  );
}
