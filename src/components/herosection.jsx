import { FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export function HeroSection() {
    const navigate = useNavigate();
  return (
    <section className="w-full px-[100px] py-10 flex items-center justify-between gap-10 relative">

      {/* Left Content */}
      <div className="w-1/2 space-y-10">
        
        <div className="inline-block px-5 py-2 bg-accent/10 rounded-full shadow-sm">
          <span className="text-accent tracking-widest text-sm font-medium">
            Natural Beauty, Crystal Clear Results
          </span>
        </div>

        <h1 className="text-[3.7rem] leading-tight font-semibold text-secondary">
          Unveil Your
          <span className="block text-accent drop-shadow-sm">
            Natural Radiance
          </span>
        </h1>

        <p className="text-lg text-secondary/70 max-w-md leading-relaxed">
          Discover our premium collection of cosmetic products crafted with the 
          finest natural ingredients. Experience beauty that's pure, effective, 
          and transformative.
        </p>

        {/* Buttons */}
        <div className="flex flex-wrap gap-5 pt-4">
          <button className="px-8 py-4 bg-accent text-white rounded-full hover:bg-accent/80 transition-all flex items-center gap-2 shadow-lg hover:shadow-xl text-sm tracking-wide"
          onClick={() => {navigate("/products")}}>
            Shop Now
            <FaArrowRight size={18} />
          </button>

          <button className="px-8 py-4 border border-secondary text-secondary rounded-full hover:bg-secondary hover:text-primary transition-all shadow-sm text-sm tracking-wide">
            Learn More
          </button>
        </div>

        {/* Stats */}
        <div className="flex gap-10 pt-10">
          <div>
            <div className="text-4xl font-semibold text-accent">10k+</div>
            <div className="text-sm text-secondary/60">Happy Customers</div>
          </div>
          <div>
            <div className="text-4xl font-semibold text-accent">100%</div>
            <div className="text-sm text-secondary/60">Natural</div>
          </div>
          <div>
            <div className="text-4xl font-semibold text-accent">50+</div>
            <div className="text-sm text-secondary/60">Products</div>
          </div>
        </div>

      </div>

      {/* Right Image */}
      <div className="w-1/2 relative flex justify-center">
        
        {/* Soft Glow */}
        <div className="absolute -inset-10 bg-accent/20 rounded-full blur-3xl opacity-70"></div>

        <img
          src="https://images.unsplash.com/photo-1596483508853-6f6716db0062?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMGJlYXV0aWZ1bCUyMHNraW58ZW58MXx8fHwxNzY0MjM5MjQ0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
          alt="Beautiful woman with clear skin"
          className="relative rounded-3xl shadow-2xl w-[90%] h-[550px] object-cover ring-4 ring-primary/40"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-transparent rounded-3xl pointer-events-none"></div>
      </div>
    </section>
  );
}
