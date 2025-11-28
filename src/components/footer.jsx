import { LuFacebook, LuInstagram, LuMail, LuMapPin, LuPhone, LuTwitter } from "react-icons/lu";

export function Footer() {
  return (
    <footer
      id="contact"
      className="bg-secondary text-primary relative overflow-hidden w-full pt-20"
    >
      {/* Accent Background Glow */}
      <div className="absolute inset-0">
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-accent/20 blur-3xl rounded-full opacity-50"></div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-accent/20 blur-3xl rounded-full opacity-40"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">

        {/* Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-16">

          {/* Brand Section */}
          <div>
            <div className="mb-6">
              <div className="text-3xl font-semibold tracking-wide">CRISTAL BEAUTY</div>
              <div className="text-xs tracking-widest text-accent uppercase">Clear</div>
            </div>

            <p className="text-primary/70 leading-relaxed mb-8">
              Premium cosmetic products crafted with nature's finest ingredients for your natural beauty.
            </p>

            {/* Social Icons */}
            <div className="flex gap-4">
              {[LuFacebook, LuInstagram, LuTwitter].map((Icon, index) => (
                <button
                  key={index}
                  className="w-10 h-10 rounded-full bg-primary/10 hover:bg-accent hover:text-secondary 
                  flex items-center justify-center transition-all hover:-translate-y-1 hover:shadow-lg"
                >
                  <Icon size={18} />
                </button>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-6 text-lg font-semibold tracking-wide">Quick Links</h4>
            <ul className="space-y-3">
              {[
                { label: "Home", link: "#home" },
                { label: "Products", link: "#products" },
                { label: "About Us", link: "#about" },
                { label: "Contact", link: "#contact" }
              ].map((item, i) => (
                <li key={i}>
                  <a
                    href={item.link}
                    className="text-primary/70 hover:text-accent transition-colors relative inline-block after:absolute 
                    after:left-0 after:bottom-0 after:h-[1px] after:w-0 after:bg-accent after:transition-all hover:after:w-full"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="mb-6 text-lg font-semibold tracking-wide">Customer Service</h4>
            <ul className="space-y-3">
              {["Shipping Info", "Returns", "FAQ", "Terms & Conditions"].map((item, i) => (
                <li key={i}>
                  <a
                    href="#"
                    className="text-primary/70 hover:text-accent transition-colors relative inline-block after:absolute 
                    after:left-0 after:bottom-0 after:h-[1px] after:w-0 after:bg-accent after:transition-all hover:after:w-full"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="mb-6 text-lg font-semibold tracking-wide">Contact Us</h4>
            <ul className="space-y-5">
              <li className="flex items-start gap-4">
                <LuMapPin size={22} className="text-accent mt-1 flex-shrink-0" />
                <span className="text-primary/70 leading-relaxed">
                  123 Beauty Street, New York, NY 10001
                </span>
              </li>
              <li className="flex items-center gap-4">
                <LuPhone size={22} className="text-accent flex-shrink-0" />
                <span className="text-primary/70">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center gap-4">
                <LuMail size={22} className="text-accent flex-shrink-0" />
                <span className="text-primary/70">hello@cristalbeauty.com</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-primary/20 pt-8 pb-10 text-center">
          <p className="text-primary/60 text-sm tracking-wide">
            © 2025 Cristal Beauty Clear. All rights reserved. Made with love for natural beauty.
          </p>
        </div>

      </div>
    </footer>
  );
}
