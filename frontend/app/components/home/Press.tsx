export default function Press() {
    const logos = ["VOGUE", "BAZAAR", "ELLE", "GQ", "WWD"];
    
    return (
      <section className="bg-black py-16 border-y border-yellow-900/10 opacity-60">
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-20">
            {logos.map((logo) => (
              <span 
                key={logo} 
                className="text-gray-500 font-serif text-2xl tracking-[0.2em] hover:text-yellow-600 transition-colors cursor-default"
              >
                {logo}
              </span>
            ))}
          </div>
        </div>
      </section>
    );
  }