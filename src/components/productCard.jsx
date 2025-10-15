export default function ProductCard(props) {
  const product = props.product;

  return (
    <div className="w-[300px] h-[420px] bg-primary rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col justify-between group border border-secondary/10">
      {/* Image Section */}
      <div className="relative w-full h-[250px] overflow-hidden rounded-t-2xl">
        <img
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          src={product.images[0]}
          alt={product.name}
        />
        {product.labelledPrice > product.price && (
          <span className="absolute top-3 right-3 bg-accent text-white text-xs font-semibold px-2 py-1 rounded-full shadow-md">
            SALE
          </span>
        )}
      </div>

      {/* Content Section */}
      <div className="flex flex-col px-4 pb-4">
        <h1 className="font-bold text-lg text-secondary mb-1 truncate">
          {product.name}
        </h1>

        {/* Price Display */}
        {product.labelledPrice > product.price ? (
          <div className="flex gap-2 items-center mb-1">
            <p className="text-sm font-semibold text-secondary/50 line-through">
              LKR {product.labelledPrice}
            </p>
            <p className="text-base font-bold text-accent">
              LKR {product.price}
            </p>
          </div>
        ) : (
          <p className="text-base font-bold text-accent mb-1">
            LKR {product.price}
          </p>
        )}

        {/* Product Info */}
        <p className="text-xs font-medium text-secondary/60">
          ID: {product.productID}
        </p>
        <p className="text-xs font-medium text-secondary/60 mb-3">
          {product.category}
        </p>

        {/* Button */}
        <button className="mt-auto w-full h-[36px] border border-accent text-accent font-semibold text-sm rounded-lg transition-all duration-300 hover:bg-accent hover:text-white hover:shadow-md active:scale-95">
          View Cart
        </button>
      </div>
    </div>
  );
}
