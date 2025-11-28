export function AboutSection() {
  return (
    <section
      id="about"
      className="py-24 bg-transparent relative overflow-hidden w-full"
    >
      {/* Soft Accent Glow to Blend with bg-primary */}
      <div className="absolute -top-20 -left-10 w-96 h-96 bg-accent/10 blur-3xl rounded-full opacity-60"></div>
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-accent/10 blur-3xl rounded-full opacity-50"></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-20 items-center">

          {/* Image Section */}
          <div className="relative group">
            <div className="absolute -inset-6 bg-accent/20 rounded-3xl blur-3xl opacity-60 group-hover:opacity-80 transition duration-500"></div>

            <img
              src="https://images.unsplash.com/photo-1584013544027-acfe4d8ca478?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvcmdhbmljJTIwYmVhdXR5JTIwcHJvZHVjdHN8ZW58MXx8fHwxNzY0MzEwNDUwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Organic beauty products"
              className="relative rounded-3xl shadow-2xl w-full h-[520px] object-cover ring-2 ring-white/40 
                         group-hover:scale-[1.03] transition-all duration-700"
            />

            {/* Soft gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-primary/50 via-transparent to-transparent rounded-3xl pointer-events-none"></div>
          </div>

          {/* Content Section */}
          <div className="space-y-8">
            <div className="inline-block px-5 py-2 bg-accent/10 rounded-full shadow-sm">
              <span className="text-accent tracking-wider text-sm font-medium">
                Our Story
              </span>
            </div>

            <h2 className="text-secondary text-4xl leading-snug font-semibold">
              Beauty Inspired by
              <span className="block text-accent drop-shadow-sm">
                Nature's Purity
              </span>
            </h2>

            <p className="text-secondary/80 text-lg leading-relaxed">
              At Cristal Beauty Clear, we believe that true beauty comes from nature.
              Our journey began with a simple vision: to create cosmetic products that are
              as pure and transparent as crystal, delivering exceptional results without compromise.
            </p>

            <p className="text-secondary/80 text-lg leading-relaxed">
              Every product in our collection is crafted using the finest natural ingredients,
              sourced sustainably and ethically. We combine traditional beauty wisdom with modern
              science to create formulations that truly work and elevate natural beauty.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-8 pt-6">
              {[
                { value: "2020", label: "Founded" },
                { value: "50+", label: "Countries" },
                { value: "100%", label: "Organic" },
                { value: "10k+", label: "Reviews" }
              ].map((stat, i) => (
                <div
                  key={i}
                  className="space-y-1 bg-white/40 backdrop-blur-md rounded-2xl p-5 text-center 
                             border border-white/50 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="text-3xl font-semibold text-accent">{stat.value}</div>
                  <div className="text-sm text-secondary/70 tracking-wide">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
