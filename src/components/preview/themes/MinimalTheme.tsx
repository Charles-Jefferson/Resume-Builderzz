import type { ResumeData } from '@/types/resume'

interface Props { data: ResumeData }

export function MinimalTheme({ data }: Props) {
  const { personal, summary, experience, skills, education, certifications } = data

  return (
    <div style={{ fontFamily: "'Courier New', Courier, monospace", color: '#000', background: '#fafafa', padding: '48px 52px', fontSize: '13px', lineHeight: 1.6 }}>
      {/* Header */}
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '32px', fontWeight: 400, letterSpacing: '-0.02em', margin: '0 0 4px' }}>{personal.name || 'Your Name'}</h1>
        {personal.title && <p style={{ fontSize: '13px', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#B6B6B6', margin: '0 0 12px' }}>{personal.title}</p>}
        <div style={{ display: 'flex', gap: '16px', fontSize: '11px', color: '#B6B6B6', flexWrap: 'wrap' }}>
          {personal.email && <span>{personal.email}</span>}
          {personal.phone && <span>{personal.phone}</span>}
          {personal.location && <span>{personal.location}</span>}
          {personal.linkedin && <span>{personal.linkedin}</span>}
        </div>
      </div>

      {summary && (
        <MinSection title="Summary">
          <p style={{ margin: 0, color: '#333' }}>{summary}</p>
        </MinSection>
      )}

      {experience.length > 0 && (
        <MinSection title="Experience">
          {experience.map((exp) => (
            <div key={exp.id} style={{ marginBottom: '18px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <span style={{ fontWeight: 700 }}>{exp.role}{exp.company ? ` / ${exp.company}` : ''}</span>
                <span style={{ color: '#B6B6B6', fontSize: '11px' }}>{[exp.startDate, exp.endDate].filter(Boolean).join(' — ')}</span>
              </div>
              {exp.bullets.length > 0 ? (
                <ul style={{ margin: '6px 0 0 0', padding: '0 0 0 16px' }}>
                  {exp.bullets.map((b, i) => b && <li key={i} style={{ marginBottom: '2px' }}>{b}</li>)}
                </ul>
              ) : exp.description ? (
                <p style={{ margin: '6px 0 0', color: '#444' }}>{exp.description}</p>
              ) : null}
            </div>
          ))}
        </MinSection>
      )}

      {skills.length > 0 && (
        <MinSection title="Skills">
          {skills.map((group) => (
            <div key={group.category} style={{ marginBottom: '4px' }}>
              <span style={{ color: '#B6B6B6', textTransform: 'uppercase', fontSize: '10px', letterSpacing: '0.1em' }}>{group.category} — </span>
              <span>{group.skills.join(', ')}</span>
            </div>
          ))}
        </MinSection>
      )}

      {education.length > 0 && (
        <MinSection title="Education">
          {education.map((edu) => (
            <div key={edu.id} style={{ marginBottom: '8px', display: 'flex', justifyContent: 'space-between' }}>
              <span><strong>{edu.institution}</strong>{edu.degree ? ` — ${edu.degree}` : ''}</span>
              <span style={{ color: '#B6B6B6', fontSize: '11px' }}>{edu.year}</span>
            </div>
          ))}
        </MinSection>
      )}

      {certifications.length > 0 && (
        <MinSection title="Certifications">
          {certifications.map((cert) => (
            <div key={cert.id} style={{ marginBottom: '4px', display: 'flex', justifyContent: 'space-between' }}>
              <span>{cert.name}{cert.issuer ? ` — ${cert.issuer}` : ''}</span>
              <span style={{ color: '#B6B6B6', fontSize: '11px' }}>{cert.year}</span>
            </div>
          ))}
        </MinSection>
      )}
    </div>
  )
}

function MinSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: '24px' }}>
      <p style={{ textTransform: 'uppercase', letterSpacing: '0.15em', fontSize: '10px', fontWeight: 700, color: '#000', margin: '0 0 10px', borderTop: '1px solid #000', paddingTop: '8px' }}>{title}</p>
      {children}
    </div>
  )
}
