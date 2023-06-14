import {
  ForwardRefRenderFunction,
  ReactNode,
  forwardRef,
  useState
} from 'react'
import clsx from 'clsx'

import {
  NavigationMenu,
  NavigationMenuRootProps
} from '@components/NavigationMenu'
import { Text } from '@components/Text'
import { TextInput, TextInputInputProps } from '@components/Inputs/TextInput'

import { ContactProps } from '@contexts/ContactsContext'

export interface ContactsTextInputRootProps extends NavigationMenuRootProps {
  search: string
  contactsList: ContactProps[]
  children: ReactNode
  handleSelectContact: (contact: ContactProps) => void
}

function ContactsTextInputRoot({
  children,
  contactsList,
  search = '',
  handleSelectContact,
  ...props
}: ContactsTextInputRootProps) {
  const [isOpen, setIsOpen] = useState(false)

  const filteredContacts = contactsList.filter(
    ({ contactName, contactAddress }) =>
      contactName.toLowerCase().startsWith(search?.toLowerCase()) ||
      contactAddress.toLowerCase().startsWith(search?.toLowerCase())
  )

  return (
    <NavigationMenu.Root
      className="flex items-stretch justify-start"
      viewPortClassName={clsx('!top-[4.5rem]', { hidden: !isOpen })}
      onValueChange={value => setIsOpen(!!value)}
      {...props}
    >
      <NavigationMenu.List>
        <NavigationMenu.Item>
          <NavigationMenu.Trigger type="button">
            {children}
          </NavigationMenu.Trigger>

          {filteredContacts.length > 0 && (
            <NavigationMenu.Content className="z-10 w-full absolute left-auto">
              <div className="w-full flex flex-col items-stretch bg-white dark:bg-black rounded">
                {filteredContacts?.map(contact => (
                  <button
                    key={contact.contactId}
                    type="button"
                    onClick={() => {
                      handleSelectContact(contact)
                      setIsOpen(false)
                    }}
                    className="w-full flex flex-col items-stretch justify-start gap-1 p-2 ring-cyan-500 rounded transition-colors hover:bg-zinc-500/10 hover:dark:bg-zinc-50/10"
                  >
                    <Text asChild className="text-start">
                      <strong>{contact.contactName}</strong>
                    </Text>

                    <Text className="w-min text-sm capitalize">
                      {contact.formattedAddress}
                    </Text>
                  </button>
                ))}
              </div>
            </NavigationMenu.Content>
          )}
        </NavigationMenu.Item>
      </NavigationMenu.List>
    </NavigationMenu.Root>
  )
}

ContactsTextInputRoot.displayName = 'ContactsTextInput.Root'

export interface ContactsTextInputInputProps extends TextInputInputProps {
  error?: string
  label?: string
}

const ContactsTextInputInput: ForwardRefRenderFunction<
  HTMLInputElement,
  ContactsTextInputInputProps
> = ({ error, label = 'Wallet address', id, ...props }, ref) => {
  return (
    <TextInput.Root
      htmlFor={id}
      error={error}
      className="justify-start items-start"
    >
      <TextInput.Label>{label}</TextInput.Label>

      <TextInput.Content>
        <TextInput.Input
          ref={ref}
          id={id}
          type="search"
          autoComplete="off"
          role="combobox"
          list=""
          autoFocus={true}
          {...props}
        />
      </TextInput.Content>
    </TextInput.Root>
  )
}

ContactsTextInputInput.displayName = 'ContactsTextInput.Input'

export const ContactsTextInput = {
  Root: ContactsTextInputRoot,
  Input: forwardRef(ContactsTextInputInput)
}
