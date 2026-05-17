import { personalInfo } from "@/data/portfolio";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0f0f0f]"
    >
      {/* Background grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(#c0392b 1px, transparent 1px), linear-gradient(90deg, #c0392b 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#c0392b]/5 blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
        {/* Greeting badge */}
        <div className="inline-flex items-center gap-2 bg-[#1e1e1e] border border-[#2a2a2a] rounded-full px-4 py-1.5 mb-8">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span className="text-[#a3a3a3] text-sm">Available for opportunities</span>
        </div>

        {/* Name */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 leading-tight">
          Hi, I&apos;m{" "}
          <span className="gradient-text">
            Md. Hasibuzzaman
          </span>
        </h1>

        {/* Title */}
        <p className="text-xl sm:text-2xl md:text-3xl text-[#a3a3a3] font-medium mb-4">
          Software Engineer &amp; Project Tech Lead
        </p>

        {/* Tagline */}
        <p className="text-[#6b6b6b] text-base sm:text-lg mb-10 italic">
          &quot;{personalInfo.tagline}&quot;
        </p>

        {/* Tech stack badges */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {["NodeJS", "NextJS", "ReactJS", "TypeScript", "PHP/Laravel", "AWS"].map((tech) => (
            <span
              key={tech}
              className="px-3 py-1 bg-[#1e1e1e] border border-[#2a2a2a] text-[#a3a3a3] text-sm rounded-full hover:border-[#c0392b] hover:text-white transition-colors duration-200"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <a
            href="#projects"
            className="px-8 py-3 bg-[#c0392b] hover:bg-[#e74c3c] text-white font-semibold rounded-lg transition-all duration-200 hover:shadow-lg hover:shadow-[#c0392b]/30 hover:-translate-y-0.5"
          >
            View My Work
          </a>
          <a
            href="#contact"
            className="px-8 py-3 bg-transparent border border-[#c0392b] text-[#c0392b] hover:bg-[#c0392b] hover:text-white font-semibold rounded-lg transition-all duration-200 hover:-translate-y-0.5"
          >
            Get In Touch
          </a>
          <a
            href="/Md_Hasibuzzaman_CV.pdf"
            download
            className="px-8 py-3 bg-[#1e1e1e] border border-[#2a2a2a] text-white hover:border-[#c0392b] font-semibold rounded-lg transition-all duration-200 hover:-translate-y-0.5"
          >
            Download CV
          </a>
        </div>

        {/* Social links */}
        <div className="flex justify-center gap-5">
          <a
            href={personalInfo.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="w-10 h-10 flex items-center justify-center rounded-full bg-[#1e1e1e] border border-[#2a2a2a] text-[#a3a3a3] hover:text-white hover:border-[#c0392b] hover:bg-[#252525] transition-all duration-200"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
            </svg>
          </a>
          <a
            href={personalInfo.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="w-10 h-10 flex items-center justify-center rounded-full bg-[#1e1e1e] border border-[#2a2a2a] text-[#a3a3a3] hover:text-white hover:border-[#c0392b] hover:bg-[#252525] transition-all duration-200"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
          </a>
          <a
            href={personalInfo.facebook}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            className="w-10 h-10 flex items-center justify-center rounded-full bg-[#1e1e1e] border border-[#2a2a2a] text-[#a3a3a3] hover:text-white hover:border-[#c0392b] hover:bg-[#252525] transition-all duration-200"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
          </a>
          <a
            href={`mailto:${personalInfo.email}`}
            aria-label="Email"
            className="w-10 h-10 flex items-center justify-center rounded-full bg-[#1e1e1e] border border-[#2a2a2a] text-[#a3a3a3] hover:text-white hover:border-[#c0392b] hover:bg-[#252525] transition-all duration-200"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </a>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-[#6b6b6b]">
          <span className="text-xs">Scroll</span>
          <div className="w-0.5 h-8 bg-gradient-to-b from-[#c0392b] to-transparent" />
        </div>
      </div>
    </section>
  );
}
