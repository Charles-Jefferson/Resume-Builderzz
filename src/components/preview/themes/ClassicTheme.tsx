import type { ResumeData } from '@/types/resume'

interface Props { data: ResumeData }

export function ClassicTheme({ data }: Props) {
  const { personal, summary, experience, skills, education, certifications } = data

  return (
    <div style={{ fontFamily: 'Georgia, "Times New Roman", serif', color: '#000', background: '#fff', padding: '48px', lineHeight: 1.5, fontSize: '14px' }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '24px', borderBottom: '2px solid #000', paddingBottom: '16px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: 700, margin: '0 0 4px', letterSpacing: '0.02em' }}>{personal.name || 'Your Name'}</h1>
        {personal.title && <p style={{ fontSize: '15px', color: '#808285', margin: '0 0 8px' }}>{personal.title}</p>}
        <div style={{ fontSize: '12px', color: '#808285', display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '12px' }}>
          {personal.email && <span>{personal.email}</span>}
          {personal.phone && <span>{personal.phone}</span>}
          {personal.location && <span>{personal.location}</span>}
          {personal.linkedin && <span>{personal.linkedin}</span>}
        </div>
      </div>

      {/* Summary */}
      {summary && (
        <Section title="Professional Summary">
          <p style={{ margin: 0 }}>{summary}</p>
        </Section>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <Section title="Experience">
          {experience.map((exp) => (
            <div key={exp.id} style={{ marginBottom: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <strong style={{ fontSize: '14px' }}>{exp.role}{exp.company ? `, ${exp.company}` : ''}</strong>
                <span style={{ fontSize: '12px', color: '#808285', whiteSpace: 'nowrap' }}>
                  {[exp.startDate, exp.endDate].filter(Boolean).join(' – ')}
                </span>
              </div>
              {exp.bullets.length > 0 ? (
                <ul style={{ margin: '6px 0 0 16px', padding: 0 }}>
                  {exp.bullets.map((b, i) => b && <li key={i} style={{ marginBottom: '3px' }}>{b}</li>)}
                </ul>
              ) : exp.description ? (
                <p style={{ margin: '6px 0 0', color: '#444' }}>{exp.description}</p>
              ) : null}
            </div>
          ))}
        </Section>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <Section title="Skills">
          {skills.map((group) => (
            <div key={group.category} style={{ marginBottom: '6px' }}>
              <strong>{group.category}:</strong>{' '}
              <span style={{ color: '#444' }}>{group.skills.join(', ')}</span>
            </div>
          ))}
        </Section>
      )}

      {/* Education */}
      {education.length > 0 && (
        <Section title="Education">
          {education.map((edu) => (
            <div key={edu.id} style={{ marginBottom: '8px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <strong>{edu.institution}</strong>
                <span style={{ fontSize: '12px', color: '#808285' }}>{edu.year}</span>
              </div>
              {edu.degree && <p style={{ margin: '2px 0 0', color: '#444' }}>{edu.degree}</p>}
            </div>
          ))}
        </Section>
      )}

      {/* Certifications */}
      {certifications.length > 0 && (
        <Section title="Certifications">
          {certifications.map((cert) => (
            <div key={cert.id} style={{ marginBottom: '6px', display: 'flex', justifyContent: 'space-between' }}>
              <span><strong>{cert.name}</strong>{cert.issuer ? ` — ${cert.issuer}` : ''}</span>
              <span style={{ fontSize: '12px', color: '#808285' }}>{cert.year}</span>
            </div>
          ))}
        </Section>
      )}
    </div>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: '20px' }}>
      <h2 style={{ fontSize: '13px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', borderBottom: '1px solid #000', paddingBottom: '4px', marginBottom: '10px', margin: '0 0 10px' }}>
        {title}
      </h2>
      {children}
    </div>
  )
}
