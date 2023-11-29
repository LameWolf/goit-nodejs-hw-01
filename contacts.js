import path from "path";
import fs from "fs/promises";
import { nanoid } from "nanoid";

const contactsPath = path.resolve("db/contacts.json");

const contactIndex = (contacts, contactId) =>
  contacts.findIndex((contact) => contact.id === contactId);

const updateContacts = async (contacts) => {
  try {
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  } catch (error) {
    console.log(error.message);
  }
};

export const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath);
    console.log(data);
    return JSON.parse(data);
  } catch (error) {
    console.log(error.message);
  }
};

export const getContactById = async (contactId) => {
  try {
    const contacts = await listContacts();
    const idx = contactIndex(contacts, contactId);
    if (idx === -1) {
      return null;
    }
    return contacts[idx];
  } catch (error) {
    console.log(error.message);
  }
};

export const removeContact = async (contactId) => {
  try {
    const contacts = await listContacts();
    const idx = contactIndex(contacts, contactId);

    if (idx === -1) {
      return null;
    }

    const [contactToRemove] = contacts.splice(idx, 1);
    await updateContacts(contacts);
    return contactToRemove;
  } catch (error) {
    console.log(error.message);
  }
};

export const addContact = async (name, email, phone) => {
  try {
    const contacts = await listContacts();
    const newContact = {
      id: nanoid(),
      name,
      email,
      phone,
    };
    contacts.push(newContact);
    await updateContacts(contacts);
    return newContact;
  } catch (error) {
    console.log(error.message);
  }
};
