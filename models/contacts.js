const fs = require('fs/promises')
const path = require('path')
const { v4 } = require('uuid')

const contactsPath = path.join(__dirname, 'contacts.json')

const listContacts = async () => {
  const data = await fs.readFile(contactsPath)
  const contacts = JSON.parse(data)
  return contacts
}

const getContactById = async (contactId) => {
  const contacts = await listContacts()
  const result = contacts.find((contact) => contact.id === contactId.toString())
  if (!result) {
    return null
  }
  return result
}

const removeContact = async (contactId) => {
  const contacts = await listContacts()
  const index = contacts.findIndex((item) => item.id === contactId)
  if (index === -1) {
    return null
  }
  const [removedContact] = contacts.splice(index, 1)
  await fs.writeFile(contactsPath, JSON.stringify(contacts))
  return removedContact
}

const addContact = async ({ name, email, phone }) => {
  const contacts = await listContacts()
  const newContact = { id: v4(), name, email, phone }
  contacts.push(newContact)
  await fs.writeFile(contactsPath, JSON.stringify(contacts))
  return newContact
}

const updateContact = async (contactId, body) => {
  const contacts = await listContacts()
  const index = contacts.findIndex(
    (contact) => contact.id === contactId.toString(),
  )
  if (index === -1) {
    return null
  }
  contacts[index] = { ...body, id: contactId }
  await fs.writeFile(contactsPath, JSON.stringify(contacts))
  return contacts[index]
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
