import { personalInfo } from "@/data/portfolio";

export default function About() {
  const stats = [
    { value: "3+", label: "Years Experience" },
    { value: "20+", label: "Projects Delivered" },
    { value: "2", label: "AWS Certifications" },
    { value: "∞", label: "Lines of Code" },
  ];

  return (
    <section id="about" className="section-padding bg-[#0f0f0f]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <p className="text-[#c0392b] text-sm font-semibold uppercase tracking-widest mb-2">
            Who I Am
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">About Me</h2>
          <div className="w-16 h-0.5 bg-[#c0392b] mx-auto" />
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left – avatar & stats */}
          <div className="flex flex-col items-center lg:items-start gap-8">
            {/* Avatar placeholder */}
            <div className="relative">
              <div className="w-48 h-48 rounded-2xl bg-gradient-to-br from-[#c0392b] to-[#922b21] flex items-center justify-center text-white text-7xl font-bold shadow-2xl shadow-[#c0392b]/20">
                H
              </div>
              <div className="absolute -bottom-3 -right-3 bg-[#1e1e1e] border border-[#2a2a2a] rounded-xl px-3 py-1.5">
                <span className="text-green-400 text-xs font-medium flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block" />
                  Open to Work
                </span>
              </div>
            </div>

            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-4 w-full max-w-sm">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="bg-[#1e1e1e] border border-[#2a2a2a] rounded-xl p-4 text-center hover:border-[#c0392b] transition-colors duration-200"
                >
                  <div className="text-3xl font-bold gradient-text">{stat.value}</div>
                  <div className="text-[#a3a3a3] text-sm mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right – text content */}
          <div>
            <h3 className="text-2xl font-bold text-white mb-4">
              Full-Stack Developer based in{" "}
              <span className="text-[#c0392b]">Dhaka, Bangladesh</span>
            </h3>
            <p className="text-[#a3a3a3] leading-relaxed mb-6">
              {personalInfo.summary}
            </p>
            <p className="text-[#a3a3a3] leading-relaxed mb-8">
              Currently working as <span className="text-white font-medium">Associate Software Engineer &amp; Project Tech Lead</span> at{" "}
              <span className="text-[#c0392b] font-medium">Era InfoTech Ltd</span>, where I lead development of government-grade web applications and enterprise solutions for Bangladesh&apos;s digital transformation initiatives.
            </p>

            {/* Personal details */}
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { label: "Email", value: personalInfo.email, link: `mailto:${personalInfo.email}` },
                { label: "Phone", value: personalInfo.phone, link: `tel:${personalInfo.phone}` },
                { label: "Location", value: "Mirpur-1, Dhaka, Bangladesh", link: null },
                { label: "Website", value: "hasibuzzaman.com", link: personalInfo.website },
              ].map((item) => (
                <div key={item.label} className="flex gap-3">
                  <span className="text-[#c0392b] text-sm font-semibold min-w-[70px]">{item.label}:</span>
                  {item.link ? (
                    <a
                      href={item.link}
                      className="text-[#a3a3a3] text-sm hover:text-white transition-colors duration-200 truncate"
                    >
                      {item.value}
                    </a>
                  ) : (
                    <span className="text-[#a3a3a3] text-sm">{item.value}</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
