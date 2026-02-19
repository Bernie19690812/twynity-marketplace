import { DigitalTwinState, ToneOption, ChannelOption } from '@/lib/types'

interface TwinFormFieldsProps {
  state: Partial<DigitalTwinState>
  onChange: (update: Partial<DigitalTwinState>) => void
}

const TONE_OPTIONS: { value: ToneOption; label: string }[] = [
  { value: 'professional', label: 'Professional' },
  { value: 'friendly', label: 'Friendly' },
  { value: 'concise', label: 'Concise' },
  { value: 'visionary', label: 'Visionary' },
  { value: 'custom', label: 'Custom' },
]

const inputClass =
  'w-full rounded-lg border border-navy/20 bg-white px-4 py-2.5 text-sm font-normal text-navy placeholder:text-navy/30 focus:border-royal focus:outline-none transition-colors duration-150'

const labelClass = 'block text-sm font-medium text-navy mb-1.5'

function RequiredMark() {
  return <span className="text-royal ml-0.5" aria-hidden>*</span>
}

function ChannelCheckboxes({
  channels,
  onChange,
}: {
  channels: ChannelOption[]
  onChange: (channels: ChannelOption[]) => void
}) {
  const toggle = (channel: ChannelOption) => {
    onChange(
      channels.includes(channel)
        ? channels.filter((c) => c !== channel)
        : [...channels, channel]
    )
  }

  return (
    <div className="flex gap-6" role="group" aria-label="Available channels">
      {(['web_chat', 'voice'] as ChannelOption[]).map((channel) => (
        <label key={channel} className="flex items-center gap-2 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={channels.includes(channel)}
            onChange={() => toggle(channel)}
            className="h-4 w-4 rounded border-navy/30 accent-royal"
          />
          <span className="text-sm font-medium text-navy">
            {channel === 'web_chat' ? 'Web Chat' : 'Voice'}
          </span>
        </label>
      ))}
    </div>
  )
}

export function TwinFormFields({ state, onChange }: TwinFormFieldsProps) {
  return (
    <div className="flex flex-col gap-5">
      <div>
        <label htmlFor="twin_name" className={labelClass}>
          Twin name <RequiredMark />
        </label>
        <input
          id="twin_name"
          type="text"
          value={state.twin_name ?? ''}
          onChange={(e) => onChange({ twin_name: e.target.value })}
          placeholder="e.g. Alex"
          className={inputClass}
        />
      </div>

      <div>
        <label htmlFor="use_case" className={labelClass}>
          Use case <RequiredMark />
        </label>
        <textarea
          id="use_case"
          value={state.use_case ?? ''}
          onChange={(e) => onChange({ use_case: e.target.value })}
          placeholder="Describe the primary purpose of this Digital Twin"
          rows={3}
          className={`${inputClass} resize-none`}
        />
      </div>

      <div>
        <label htmlFor="role_title" className={labelClass}>
          Role title <span className="text-xs font-normal text-navy/40">(optional)</span>
        </label>
        <input
          id="role_title"
          type="text"
          value={state.role_title ?? ''}
          onChange={(e) => onChange({ role_title: e.target.value })}
          placeholder="e.g. Customer Success Manager"
          className={inputClass}
        />
      </div>

      <div>
        <label htmlFor="tone" className={labelClass}>
          Tone <RequiredMark />
        </label>
        <select
          id="tone"
          value={state.tone ?? ''}
          onChange={(e) => onChange({ tone: e.target.value as ToneOption })}
          className={inputClass}
        >
          <option value="" disabled>Select a tone</option>
          {TONE_OPTIONS.map(({ value, label }) => (
            <option key={value} value={value}>{label}</option>
          ))}
        </select>
      </div>

      <div>
        <fieldset>
          <legend className={labelClass}>
            Channels <RequiredMark />
          </legend>
          <ChannelCheckboxes
            channels={state.channels ?? []}
            onChange={(channels) => onChange({ channels })}
          />
        </fieldset>
      </div>

      <div>
        <label htmlFor="knowledge_sources" className={labelClass}>
          Knowledge sources <span className="text-xs font-normal text-navy/40">(optional)</span>
        </label>
        <textarea
          id="knowledge_sources"
          value={(state.knowledge_sources ?? []).join('\n')}
          onChange={(e) =>
            onChange({
              knowledge_sources: e.target.value
                .split('\n')
                .map((s) => s.trim())
                .filter(Boolean),
            })
          }
          placeholder="One URL or document name per line"
          rows={3}
          className={`${inputClass} resize-none`}
        />
      </div>

      <div>
        <label className={labelClass}>
          Consent <RequiredMark />
        </label>
        <label className="flex items-start gap-3 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={state.consent ?? false}
            onChange={(e) => onChange({ consent: e.target.checked })}
            className="mt-0.5 h-4 w-4 flex-shrink-0 rounded border-navy/30 accent-royal"
          />
          <span className="text-sm font-normal text-navy/70 leading-relaxed">
            I consent to 4th-IR processing this information to create my Digital Twin.
          </span>
        </label>
      </div>
    </div>
  )
}
