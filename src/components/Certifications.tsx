import type { Certification } from "@/lib/types";

const categoryColors: Record<string, string> = {
  Cloud: "bg-blue-500/10 border-blue-500/20 text-blue-400",
  Management: "bg-purple-500/10 border-purple-500/20 text-purple-400",
  Frontend: "bg-green-500/10 border-green-500/20 text-green-400",
};

export default function Certifications({ certifications }: { certifications: Certification[] }) {
  return (
    <section id="certifications" className="section-padding bg-[#1a1a1a]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <p className="text-[#c0392b] text-sm font-semibold uppercase tracking-widest mb-2">
            Credentials
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Certifications</h2>
          <div className="w-16 h-0.5 bg-[#c0392b] mx-auto" />
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {certifications.map((cert) => (
            <div
              key={cert.id}
              className="bg-[#1e1e1e] border border-[#2a2a2a] rounded-2xl p-6 card-hover flex flex-col"
            >
              {/* Top */}
              <div className="flex items-start justify-between mb-4">
                <div className="w-10 h-10 rounded-xl bg-[#c0392b]/10 border border-[#c0392b]/20 flex items-center justify-center">
                  {cert.category === "Cloud" ? (
                    <svg className="w-5 h-5 text-[#c0392b]" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                    </svg>
                  ) : cert.category === "Management" ? (
                    <svg className="w-5 h-5 text-[#c0392b]" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5 text-[#c0392b]" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                    </svg>
                  )}
                </div>
                <span className={`px-2.5 py-1 border text-xs font-medium rounded-full ${categoryColors[cert.category] ?? "bg-[#252525] border-[#333] text-[#a3a3a3]"}`}>
                  {cert.category}
                </span>
              </div>

              {/* Name & issuer */}
              <h3 className="text-white font-semibold text-sm leading-snug mb-2 flex-1">
                {cert.name}
              </h3>
              <p className="text-[#a3a3a3] text-xs mb-4">{cert.issuer}</p>

              {/* Validation */}
              {cert.validationNo && (
                <div className="mt-auto">
                  <p className="text-[#6b6b6b] text-xs mb-1">
                    Validation: <span className="text-[#a3a3a3] font-mono">{cert.validationNo}</span>
                  </p>
                  {cert.verifyUrl && (
                    <a
                      href={cert.verifyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[#c0392b] text-xs hover:text-[#e74c3c] transition-colors duration-200 font-medium"
                    >
                      Verify Certificate
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
