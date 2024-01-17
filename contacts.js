import fs from 'fs/promises';
import path from 'path';
import { nanoid } from 'nanoid';


const contactPath = path.resolve("db", "contacts.json");


export async function listContacts() {
    const contacts = await fs.readFile(contactPath)
    return JSON.parse(contacts)
}

export async function getContactById(contactId) {
    const contacts = await listContacts()
    const contact = contacts.find((contact) => contact.id === contactId)
    return contact || null
}

export async function removeContact(contactId) {
    const contacts = await listContacts()
    const index = contacts.findIndex((item) => item.id === contactId)
    if (index === -1) {
        return null
    }
    const deletedContact = contacts.splice(index, 1)[0];
    await fs.writeFile(contactPath, JSON.stringify(contacts, null, 2))
    return deletedContact
}

export async function addContact(newContact) {
    const contacts = await listContacts()
    const addedContact = {
        id: nanoid(),
        ...newContact
    };
    contacts.push(addedContact)
    await fs.writeFile(contactPath, JSON.stringify(contacts, null, 2))
    return addedContact
}
