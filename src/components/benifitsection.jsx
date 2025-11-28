import { LuAward, LuHeart, LuLeaf, LuSparkles } from "react-icons/lu";

const benefits = [
  {
    icon: LuLeaf,
    title: '100% Natural',
    description: 'All our products are made with pure, organic ingredients sourced from nature.'
  },
  {
    icon: LuSparkles,
    title: 'Proven Results',
    description: 'Scientifically tested formulas that deliver visible results in weeks.'
  },
  {
    icon: LuAward,
    title: 'Award Winning',
    description: 'Recognized globally for excellence in natural beauty and skincare.'
  },
  {
    icon: LuHeart,
    title: 'Cruelty Free',
    description: 'We never test on animals and support ethical beauty practices.'
  },
];

export function BenefitSection() {
  return (
    <section className="py-24 b w-full bg-white relative overflow-hidden">

      {/* Accent Blurred Glow */}
      <div className="absolute -top-20 right-10 w-72 h-72 bg-accent/20 blur-3xl rounded-full opacity-60"></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">

        {/* Heading */}
        <div className="text-center mb-20">
          <h2 className="text-secondary text-4xl font-semibold mb-4 tracking-tight">
            Why Choose Us
          </h2>
          <p className="text-secondary/70 max-w-2xl mx-auto text-lg">
            Experience the difference with our commitment to quality, sustainability,
            and your natural beauty.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="p-10 bg-white/70 backdrop-blur-md border border-white/40 
                         rounded-3xl shadow-lg hover:shadow-2xl transition-all 
                         hover:-translate-y-2 duration-300 relative"
            >
              {/* Icon */}
              <div className="inline-flex items-center justify-center w-20 h-20 
                              bg-gradient-to-br from-accent/20 to-accent/10
                              rounded-2xl shadow-inner ring-2 ring-accent/20 mb-6">
                <benefit.icon className="text-accent" size={38} />
              </div>

              {/* Title */}
              <h3 className="text-secondary text-xl font-semibold mb-3 tracking-wide">
                {benefit.title}
              </h3>

              {/* Description */}
              <p className="text-secondary/70 leading-relaxed">
                {benefit.description}
              </p>

              {/* Accent Glow on Hover */}
              <div className="absolute inset-0 rounded-3xl opacity-0 hover:opacity-100 
                              transition-all duration-300 bg-accent/5 blur-xl pointer-events-none">
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
