import ComboBox from './combobox'
import { CircleAlertIcon, LucideMail } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import useContactForm from '@/components/container/useContactForm'
import type { ContactPropsFormType } from '@/types/ui/ContactForm'

export default function Component({ configTranslations }: ContactPropsFormType) {
  const { errorsContact, onContactSubmit } = useContactForm(configTranslations.lang)
  return (
    <form 
      className="shadow-xs max-w-100 px-4 mx-auto **:focus-within:z-10"
      onSubmit={onContactSubmit}
    >
      <div className="relative">
        <Input
          id="email"
          type="email"
          name='email'
          placeholder="Email"
          className="peer rounded-b-none pe-9 shadow-none [direction:inherit]"
        />
        <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center pe-3 peer-disabled:opacity-50">
          <LucideMail size={16} aria-hidden />
        </div>
      </div>
      <div className="-mt-px flex">
        <div className="min-w-0 flex-1">
          <Input
            id="lastName"
            name='lastName'
            placeholder={configTranslations.contactLastName}
            className="rounded-none shadow-none [direction:inherit]"
          />
        </div>
        <div className="-ms-px min-w-0 flex-1">
          <Input
            id="firstName"
            name='firstName'
            placeholder={configTranslations.contactFirstName}
            className="rounded-none shadow-none [direction:inherit]"
          />
        </div>
      </div>
      <ComboBox placeholder={configTranslations.contactPlaceholderCheckbox} />
      <Textarea
        id='message'
        name='message'
        placeholder={configTranslations.contactMessage}
        className='rounded-t-none border-t-0'
        rows={8}
      />
      <Button type='submit' variant="outline" className="w-full my-2 transition-shadow">
        {configTranslations.contactSubmit}
      </Button>
      {errorsContact.length > 0 && (
        <div className="rounded-md border p-4 mt-4">
          <div className="flex gap-3 text-primary">
            <CircleAlertIcon
              className="mt-0.5 shrink-0 opacity-60"
              size={16}
              aria-hidden="true"
            />
            <div className="grow space-y-1">
              <p className="text- text-sm font-medium mb-2!">
                {configTranslations.contactShowError}
              </p>
              <ul className="text-secondary-foreground list-inside list-disc text-sm opacity-80 mb-2!">
                {errorsContact.map((err, i) => (
                  <li key={i}>{err}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </form>
  )
}
