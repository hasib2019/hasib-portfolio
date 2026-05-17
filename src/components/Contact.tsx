import { personalInfo } from "@/data/portfolio";

export default function Contact() {
  const contactItems = [
    {
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      label: "Email",
      value: personalInfo.email,
      link: `mailto:${personalInfo.email}`,
    },
    {
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      ),
      label: "Phone",
      value: personalInfo.phone,
      link: `tel:${personalInfo.phone}`,
    },
    {
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      label: "Location",
      value: "Mirpur-1, Dhaka-1216, Bangladesh",
      link: "https://maps.google.com/?q=Mirpur-1,Dhaka,Bangladesh",
    },
    {
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
        </svg>
      ),
      label: "Website",
      value: "www.hasibuzzaman.com",
      link: personalInfo.website,
    },
  ];

  return (
    <section id="contact" className="section-padding bg-[#0f0f0f]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <p className="text-[#c0392b] text-sm font-semibold uppercase tracking-widest mb-2">
            Let&apos;s Talk
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Get In Touch</h2>
          <div className="w-16 h-0.5 bg-[#c0392b] mx-auto mb-6" />
          <p className="text-[#a3a3a3] max-w-xl mx-auto">
            Have a project in mind or want to discuss opportunities? I&apos;m always open to new challenges and exciting collaborations.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-10">
          {/* Contact info */}
          <div>
            <h3 className="text-white font-bold text-xl mb-6">Contact Information</h3>
            <div className="space-y-4 mb-8">
              {contactItems.map((item) => (
                <a
                  key={item.label}
                  href={item.link}
                  target={item.link.startsWith("http") ? "_blank" : undefined}
                  rel={item.link.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="flex items-center gap-4 p-4 bg-[#1e1e1e] border border-[#2a2a2a] rounded-xl hover:border-[#c0392b] hover:bg-[#252525] transition-all duration-200 group"
                >
                  <div className="w-10 h-10 rounded-lg bg-[#c0392b]/10 border border-[#c0392b]/20 flex items-center justify-center text-[#c0392b] group-hover:bg-[#c0392b] group-hover:text-white transition-all duration-200">
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-[#6b6b6b] text-xs font-medium">{item.label}</p>
                    <p className="text-white text-sm">{item.value}</p>
                  </div>
                </a>
              ))}
            </div>

            {/* Social links */}
            <h3 className="text-white font-bold text-base mb-4">Follow Me</h3>
            <div className="flex gap-3">
              {[
                { href: personalInfo.github, label: "GitHub", icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg> },
                { href: personalInfo.linkedin, label: "LinkedIn", icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg> },
                { href: personalInfo.facebook, label: "Facebook", icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg> },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-10 h-10 flex items-center justify-center rounded-lg bg-[#1e1e1e] border border-[#2a2a2a] text-[#a3a3a3] hover:text-white hover:border-[#c0392b] hover:bg-[#252525] transition-all duration-200"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* CTA card */}
          <div className="bg-[#1e1e1e] border border-[#2a2a2a] rounded-2xl p-8 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#c0392b]/10 border border-[#c0392b]/20 flex items-center justify-center text-[#c0392b] mb-6">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <h3 className="text-white font-bold text-2xl mb-3">Let&apos;s Work Together</h3>
              <p className="text-[#a3a3a3] leading-relaxed mb-6">
                Whether you need a full-stack web application, a government project, or technical leadership — I bring the skills, experience, and dedication to deliver.
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  "Full-stack web application development",
                  "React/Next.js frontend engineering",
                  "Node.js / PHP backend development",
                  "AWS cloud architecture & DevOps",
                  "Technical project leadership",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-[#a3a3a3] text-sm">
                    <svg className="w-4 h-4 text-[#c0392b] flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <a
              href={`mailto:${personalInfo.email}?subject=Project Inquiry — Portfolio`}
              className="w-full py-3 bg-[#c0392b] hover:bg-[#e74c3c] text-white font-semibold text-center rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-[#c0392b]/30"
            >
              Send Me a Message
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
