import type { Experience as ExperienceType } from "@/lib/types";

export default function Experience({ experiences }: { experiences: ExperienceType[] }) {
  return (
    <section id="experience" className="section-padding bg-[#0f0f0f]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <p className="text-[#c0392b] text-sm font-semibold uppercase tracking-widest mb-2">
            My Journey
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Work Experience</h2>
          <div className="w-16 h-0.5 bg-[#c0392b] mx-auto" />
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#c0392b] via-[#c0392b]/40 to-transparent hidden sm:block" />

          <div className="space-y-8">
            {experiences.map((exp, idx) => (
              <div key={exp.id} className="relative sm:pl-16">
                {/* Timeline dot */}
                <div className="hidden sm:flex absolute left-0 top-6 w-12 h-12 rounded-full bg-[#1e1e1e] border-2 border-[#c0392b] items-center justify-center text-[#c0392b] font-bold text-lg shadow-lg shadow-[#c0392b]/10">
                  {idx + 1}
                </div>

                <div className="bg-[#1e1e1e] border border-[#2a2a2a] rounded-2xl p-6 card-hover">
                  {/* Header */}
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
                    <div>
                      <h3 className="text-white font-bold text-xl leading-tight">{exp.role}</h3>
                      <p className="text-[#c0392b] font-semibold mt-1">{exp.company}</p>
                      <p className="text-[#6b6b6b] text-sm mt-1 flex items-center gap-1.5">
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        {exp.location}
                      </p>
                    </div>
                    <div className="flex-shrink-0">
                      <span
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${
                          exp.current
                            ? "bg-green-500/10 text-green-400 border border-green-500/20"
                            : "bg-[#252525] text-[#a3a3a3] border border-[#333]"
                        }`}
                      >
                        {exp.current && (
                          <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                        )}
                        {exp.duration}
                      </span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-[#a3a3a3] text-sm leading-relaxed mb-5">
                    {exp.description}
                  </p>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2">
                    {exp.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 bg-[#0f0f0f] border border-[#333] text-[#a3a3a3] text-xs rounded-lg"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
