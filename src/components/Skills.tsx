const categoryIcons: Record<string, string> = {
  Frontend: "🎨",
  Backend: "⚙️",
  Database: "🗄️",
  "Cloud & DevOps": "☁️",
  Tools: "🛠️",
};

export default function Skills({ skills }: { skills: Record<string, string[]> }) {
  return (
    <section id="skills" className="section-padding bg-[#1a1a1a]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <p className="text-[#c0392b] text-sm font-semibold uppercase tracking-widest mb-2">
            What I Know
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Technical Skills</h2>
          <div className="w-16 h-0.5 bg-[#c0392b] mx-auto" />
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.entries(skills).map(([category, items]) => (
            <div
              key={category}
              className="bg-[#1e1e1e] border border-[#2a2a2a] rounded-2xl p-6 card-hover"
            >
              <div className="flex items-center gap-3 mb-5">
                <span className="text-2xl">{categoryIcons[category] ?? "💡"}</span>
                <h3 className="text-white font-semibold text-lg">{category}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {items.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 bg-[#0f0f0f] border border-[#333] text-[#a3a3a3] text-xs rounded-full hover:border-[#c0392b] hover:text-white transition-all duration-200"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom highlight */}
        <div className="mt-12 bg-[#1e1e1e] border border-[#2a2a2a] rounded-2xl p-6 text-center">
          <p className="text-[#a3a3a3] text-sm">
            <span className="text-white font-medium">Always learning</span> — currently exploring{" "}
            <span className="text-[#c0392b]">AI/ML integrations</span>,{" "}
            <span className="text-[#c0392b]">Microservices</span>, and{" "}
            <span className="text-[#c0392b]">Kubernetes</span> on AWS.
          </p>
        </div>
      </div>
    </section>
  );
}
