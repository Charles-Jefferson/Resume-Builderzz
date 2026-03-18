import type { ResumeData } from '@/types/resume'

interface Props { data: ResumeData }

export function ModernTheme({ data }: Props) {
  const { personal, summary, experience, skills, education, certifications } = data
  const accent = '#A41034'
  const gray = '#808285'

  return (
    <div style={{ fontFamily: "'Segoe UI', Arial, sans-serif", color: '#111', background: '#fff', display: 'flex', fontSize: '13px', lineHeight: 4.75, minHeight: '100%' }}>
      {/* Sidebar */}
      <div style={{ width: '220px', background: '#1a1a2e', color: '#e0e0e0', padding: '32px 20px', flexShrink: 0, printColorAdjust: 'exact', WebkitPrintColorAdjust: 'exact' } as React.CSSProperties}>
        <div style={{ marginBottom: '24px' }}>
          <h1 style={{ fontSize: '20px', fontWeight: 700, color: '#fff', margin: '0 0 4px', lineHeight: 1.2 }}>{personal.name || 'Your Name'}</h1>
          <p style={{ color: accent, fontSize: '12px', fontWeight: 600, margin: 0, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{personal.title}</p>
        </div>

        {/* Contact */}
        <SideSection title="Contact" accent={accent}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '11px' }}>
            {personal.email && <span>{personal.email}</span>}
            {personal.phone && <span>{personal.phone}</span>}
            {personal.location && <span>{personal.location}</span>}
            {personal.linkedin && <span style={{ wordBreak: 'break-all' }}>{personal.linkedin}</span>}
          </div>
        </SideSection>

        {/* Skills sidebar */}
        {skills.length > 0 && (
          <SideSection title="Skills" accent={accent}>
            {skills.map((group) => (
              <div key={group.category} style={{ marginBottom: '8px' }}>
                <p style={{ color: accent, fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', margin: '0 0 4px' }}>{group.category}</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '3px' }}>
                  {group.skills.map((skill) => (
                    <span key={skill} style={{ background: 'rgba(255,255,255,0.1)', borderRadius: '3px', padding: '1px 6px', fontSize: '11px' }}>{skill}</span>
                  ))}
                </div>
              </div>
            ))}
          </SideSection>
        )}

        {/* Education sidebar */}
        {education.length > 0 && (
          <SideSection title="Education" accent={accent}>
            {education.map((edu) => (
              <div key={edu.id} style={{ marginBottom: '8px' }}>
                <p style={{ fontWeight: 600, margin: '0 0 2px', fontSize: '11px' }}>{edu.degree}</p>
                <p style={{ color: gray, margin: '0 0 1px', fontSize: '11px' }}>{edu.institution}</p>
                {edu.year && <p style={{ color: accent, fontSize: '10px', margin: 0 }}>{edu.year}</p>}
              </div>
            ))}
          </SideSection>
        )}
      </div>

      {/* Main content */}
      <div style={{ flex: 1, padding: '32px 28px' }}>
        {summary && (
          <MainSection title="About Me" accent={accent}>
            <p style={{ margin: 0, color: '#444' }}>{summary}</p>
          </MainSection>
        )}

        {experience.length > 0 && (
          <MainSection title="Experience" accent={accent}>
            {experience.map((exp) => (
              <div key={exp.id} style={{ marginBottom: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '2px' }}>
                  <strong style={{ fontSize: '14px' }}>{exp.role}</strong>
                  <span style={{ fontSize: '11px', color: gray }}>{[exp.startDate, exp.endDate].filter(Boolean).join(' – ')}</span>
                </div>
                <p style={{ color: accent, fontWeight: 600, margin: '0 0 5px', fontSize: '12px' }}>{exp.company}</p>
                {exp.bullets.length > 0 ? (
                  <ul style={{ margin: '0 0 0 14px', padding: 0 }}>
                    {exp.bullets.map((b, i) => b && <li key={i} style={{ marginBottom: '2px', color: '#333' }}>{b}</li>)}
                  </ul>
                ) : exp.description ? (
                  <p style={{ margin: 0, color: '#444' }}>{exp.description}</p>
                ) : null}
              </div>
            ))}
          </MainSection>
        )}

        {certifications.length > 0 && (
          <MainSection title="Certifications" accent={accent}>
            {certifications.map((cert) => (
              <div key={cert.id} style={{ marginBottom: '6px', display: 'flex', justifyContent: 'space-between' }}>
                <span><strong>{cert.name}</strong>{cert.issuer ? ` — ${cert.issuer}` : ''}</span>
                <span style={{ color: gray, fontSize: '11px' }}>{cert.year}</span>
              </div>
            ))}
          </MainSection>
        )}
      </div>
    </div>
  )
}

function SideSection({ title, accent, children }: { title: string; accent: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: '20px' }}>
      <p style={{ color: accent, fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', borderBottom: '1px solid rgba(255,255,255,0.15)', paddingBottom: '4px', margin: '0 0 8px' }}>{title}</p>
      {children}
    </div>
  )
}

function MainSection({ title, accent, children }: { title: string; accent: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: '20px' }}>
      <h2 style={{ fontSize: '13px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: accent, borderBottom: `2px solid ${accent}`, paddingBottom: '4px', margin: '0 0 12px' }}>{title}</h2>
      {children}
    </div>
  )
}
