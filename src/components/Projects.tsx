import type { Project } from "@/lib/types";

export default function Projects({ projects }: { projects: Project[] }) {
  const featured = projects.filter((p) => p.featured);
  const rest = projects.filter((p) => !p.featured);

  return (
    <section id="projects" className="section-padding bg-[#1a1a1a]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <p className="text-[#c0392b] text-sm font-semibold uppercase tracking-widest mb-2">
            What I&apos;ve Built
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Projects</h2>
          <div className="w-16 h-0.5 bg-[#c0392b] mx-auto" />
        </div>

        {/* Featured project */}
        {featured.map((project) => (
          <div
            key={project.id}
            className="mb-8 bg-[#1e1e1e] border border-[#c0392b]/30 rounded-2xl p-6 sm:p-8 card-hover relative overflow-hidden"
          >
            {/* Featured badge */}
            <div className="absolute top-4 right-4">
              <span className="px-3 py-1 bg-[#c0392b]/10 border border-[#c0392b]/30 text-[#c0392b] text-xs font-semibold rounded-full">
                Featured
              </span>
            </div>

            <div className="flex flex-col lg:flex-row gap-6">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-0.5 bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs rounded-md">
                    {project.type}
                  </span>
                </div>
                <h3 className="text-white font-bold text-xl mb-1">{project.name}</h3>
                <p className="text-[#c0392b] text-sm font-medium mb-4">{project.company}</p>
                <p className="text-[#a3a3a3] text-sm leading-relaxed mb-6">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 bg-[#0f0f0f] border border-[#333] text-[#a3a3a3] text-xs rounded-lg"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#c0392b] hover:bg-[#e74c3c] text-white text-sm font-semibold rounded-lg transition-all duration-200 hover:shadow-lg hover:shadow-[#c0392b]/30"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  Visit Live Site
                </a>
              </div>

              {/* Preview box */}
              <div className="lg:w-64 flex-shrink-0">
                <div className="bg-[#0f0f0f] border border-[#2a2a2a] rounded-xl p-4 h-full min-h-32 flex flex-col justify-between">
                  <div className="flex gap-1.5 mb-3">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
                    <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
                    <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
                  </div>
                  <p className="text-[#6b6b6b] text-xs font-mono">{project.linkLabel}</p>
                  <p className="text-[#a3a3a3] text-xs mt-2">Government Project — Live in Production</p>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Other projects grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {rest.map((project) => (
            <div
              key={project.id}
              className="bg-[#1e1e1e] border border-[#2a2a2a] rounded-2xl p-6 card-hover flex flex-col"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-[#c0392b]/10 border border-[#c0392b]/20 flex items-center justify-center">
                    <svg className="w-4 h-4 text-[#c0392b]" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                    </svg>
                  </div>
                  <span className="px-2 py-0.5 bg-[#252525] border border-[#333] text-[#6b6b6b] text-xs rounded-md">
                    {project.type}
                  </span>
                </div>
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Visit ${project.name}`}
                  className="text-[#6b6b6b] hover:text-[#c0392b] transition-colors duration-200"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>

              <h3 className="text-white font-semibold text-base mb-1">{project.name}</h3>
              <p className="text-[#c0392b] text-xs font-medium mb-3">{project.company}</p>
              <p className="text-[#a3a3a3] text-sm leading-relaxed mb-4 flex-1">
                {project.description}
              </p>

              {project.demo && (
                <div className="mb-4 p-3 bg-[#0f0f0f] border border-[#333] rounded-lg text-xs text-[#6b6b6b]">
                  Demo — User: <span className="text-[#a3a3a3]">{project.demo.user}</span> / Pass:{" "}
                  <span className="text-[#a3a3a3]">{project.demo.pass}</span>
                </div>
              )}

              <div className="flex flex-wrap gap-1.5">
                {project.technologies.slice(0, 4).map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-0.5 bg-[#0f0f0f] border border-[#333] text-[#a3a3a3] text-xs rounded"
                  >
                    {tech}
                  </span>
                ))}
                {project.technologies.length > 4 && (
                  <span className="px-2 py-0.5 text-[#6b6b6b] text-xs">
                    +{project.technologies.length - 4} more
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
