import type { ResumeData } from '@/types/resume'

interface Props { data: ResumeData }

export function ExecutiveTheme({ data }: Props) {
  const { personal, summary, experience, skills, education, certifications } = data
  const accent = '#A41034'

  return (
    <div style={{ fontFamily: 'Georgia, "Times New Roman", serif', color: '#000', background: '#fff', fontSize: '13px', lineHeight: 1.55 }}>
      {/* Dark header bar */}
      <div style={{ background: '#000', color: '#fff', padding: '32px 48px 24px', textAlign: 'center' }}>
        <h1 style={{ fontSize: '30px', fontWeight: 700, margin: '0 0 6px', letterSpacing: '0.04em', textTransform: 'uppercase' }}>{personal.name || 'Your Name'}</h1>
        {personal.title && <p style={{ color: accent, fontSize: '13px', margin: '0 0 12px', letterSpacing: '0.1em', textTransform: 'uppercase', fontFamily: 'Arial, sans-serif' }}>{personal.title}</p>}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', fontSize: '11px', color: '#ccc', fontFamily: 'Arial, sans-serif', flexWrap: 'wrap' }}>
          {personal.email && <span>{personal.email}</span>}
          {personal.phone && <span>{personal.phone}</span>}
          {personal.location && <span>{personal.location}</span>}
          {personal.linkedin && <span>{personal.linkedin}</span>}
        </div>
      </div>

      <div style={{ padding: '32px 48px' }}>
        {summary && (
          <ExecSection title="Executive Summary" accent={accent}>
            <p style={{ margin: 0, fontStyle: 'italic', color: '#333' }}>{summary}</p>
          </ExecSection>
        )}

        {experience.length > 0 && (
          <ExecSection title="Professional Experience" accent={accent}>
            {experience.map((exp) => (
              <div key={exp.id} style={{ marginBottom: '18px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #e0e0e0', paddingBottom: '4px', marginBottom: '6px' }}>
                  <div>
                    <strong style={{ fontSize: '14px', display: 'block' }}>{exp.role}</strong>
                    {exp.company && <span style={{ color: accent, fontSize: '12px', fontFamily: 'Arial, sans-serif' }}>{exp.company}</span>}
                  </div>
                  <span style={{ fontSize: '11px', color: '#808285', fontFamily: 'Arial, sans-serif', whiteSpace: 'nowrap' }}>
                    {[exp.startDate, exp.endDate].filter(Boolean).join(' – ')}
                  </span>
                </div>
                {exp.bullets.length > 0 ? (
                  <ul style={{ margin: '0 0 0 16px', padding: 0 }}>
                    {exp.bullets.map((b, i) => b && <li key={i} style={{ marginBottom: '3px' }}>{b}</li>)}
                  </ul>
                ) : exp.description ? (
                  <p style={{ margin: 0, color: '#444' }}>{exp.description}</p>
                ) : null}
              </div>
            ))}
          </ExecSection>
        )}

        {skills.length > 0 && (
          <ExecSection title="Core Competencies" accent={accent}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '8px' }}>
              {skills.flatMap((g) =>
                g.skills.map((skill) => (
                  <div key={`${g.category}-${skill}`} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span style={{ color: accent, fontSize: '10px' }}>◆</span>
                    <span style={{ fontSize: '12px' }}>{skill}</span>
                  </div>
                ))
              )}
            </div>
          </ExecSection>
        )}

        {education.length > 0 && (
          <ExecSection title="Education" accent={accent}>
            {education.map((edu) => (
              <div key={edu.id} style={{ marginBottom: '8px', display: 'flex', justifyContent: 'space-between' }}>
                <div>
                  <strong>{edu.institution}</strong>
                  {edu.degree && <span style={{ color: '#555', marginLeft: '8px' }}>{edu.degree}</span>}
                </div>
                <span style={{ color: '#808285', fontSize: '11px' }}>{edu.year}</span>
              </div>
            ))}
          </ExecSection>
        )}

        {certifications.length > 0 && (
          <ExecSection title="Certifications" accent={accent}>
            {certifications.map((cert) => (
              <div key={cert.id} style={{ marginBottom: '6px', display: 'flex', justifyContent: 'space-between' }}>
                <span><strong>{cert.name}</strong>{cert.issuer ? ` — ${cert.issuer}` : ''}</span>
                <span style={{ color: '#808285', fontSize: '11px' }}>{cert.year}</span>
              </div>
            ))}
          </ExecSection>
        )}
      </div>
    </div>
  )
}

function ExecSection({ title, accent, children }: { title: string; accent: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: '24px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
        <h2 style={{ fontSize: '13px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', margin: 0, whiteSpace: 'nowrap', color: '#000' }}>{title}</h2>
        <div style={{ flex: 1, height: '2px', background: accent }} />
      </div>
      {children}
    </div>
  )
}
