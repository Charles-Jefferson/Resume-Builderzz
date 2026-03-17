import { Input } from '@/components/ui/input'
import type { PersonalInfo } from '@/types/resume'

interface PersonalInfoStepProps {
  data: PersonalInfo
  onChange: (payload: Partial<PersonalInfo>) => void
}

export function PersonalInfoStep({ data, onChange }: PersonalInfoStepProps) {
  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-lg font-semibold text-gray-900">Personal Information</h2>
        <p className="text-sm text-gray-500 mt-0.5">Required: name, title, and email</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Input
          id="name"
          label="Full Name *"
          placeholder="Jane Doe"
          value={data.name}
          onChange={(e) => onChange({ name: e.target.value })}
        />
        <Input
          id="title"
          label="Job Title *"
          placeholder="Senior Software Engineer"
          value={data.title}
          onChange={(e) => onChange({ title: e.target.value })}
        />
        <Input
          id="email"
          label="Email *"
          type="email"
          placeholder="jane@example.com"
          value={data.email}
          onChange={(e) => onChange({ email: e.target.value })}
        />
        <Input
          id="phone"
          label="Phone"
          placeholder="+1 (555) 000-0000"
          value={data.phone}
          onChange={(e) => onChange({ phone: e.target.value })}
        />
        <Input
          id="location"
          label="Location"
          placeholder="San Francisco, CA"
          value={data.location}
          onChange={(e) => onChange({ location: e.target.value })}
        />
        <Input
          id="linkedin"
          label="LinkedIn URL"
          placeholder="linkedin.com/in/janedoe"
          value={data.linkedin}
          onChange={(e) => onChange({ linkedin: e.target.value })}
        />
      </div>
    </div>
  )
}
