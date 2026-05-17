import type { Education as EducationType } from "@/lib/types";

export default function Education({ education }: { education: EducationType[] }) {
  return (
    <section id="education" className="section-padding bg-[#0f0f0f]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <p className="text-[#c0392b] text-sm font-semibold uppercase tracking-widest mb-2">
            Academic Background
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Education</h2>
          <div className="w-16 h-0.5 bg-[#c0392b] mx-auto" />
        </div>

        <div className="max-w-3xl mx-auto space-y-6">
          {education.map((edu) => (
            <div
              key={edu.id}
              className="bg-[#1e1e1e] border border-[#2a2a2a] rounded-2xl p-6 card-hover flex gap-5"
            >
              {/* Icon */}
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-[#c0392b]/10 border border-[#c0392b]/20 flex items-center justify-center text-2xl">
                {edu.icon}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                  <div>
                    <h3 className="text-white font-bold text-base leading-tight">{edu.degree}</h3>
                    <p className="text-[#c0392b] text-sm font-medium mt-1">{edu.institution}</p>
                  </div>
                  <div className="flex-shrink-0 flex flex-col items-start sm:items-end gap-1">
                    <span className="px-3 py-1 bg-[#252525] border border-[#333] text-[#a3a3a3] text-xs rounded-full whitespace-nowrap">
                      {edu.duration}
                    </span>
                    {edu.gpa && (
                      <span className="px-3 py-1 bg-[#c0392b]/10 border border-[#c0392b]/20 text-[#c0392b] text-xs font-semibold rounded-full">
                        GPA: {edu.gpa}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
