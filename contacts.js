const { v4 } = require("uuid");
const fs = require("fs/promises");
const path = require("path");

const contactsPath = path.join(__dirname, "db", "contacts.json");

// TODO: задокументировать каждую функцию
async function listContacts() {
  const contacts = JSON.parse(await fs.readFile(contactsPath));
  return contacts;
}

async function getContactById(contactId) {
  console.log({ contactId });
  const contacts = await listContacts();
  const contact = contacts.find((item) => item.id === contactId);
  if (!contact) {
    return null;
  }
  return contact;
}

async function addContact(name, email, phone) {
  const contacts = await listContacts();
  const newContact = {
    id: v4(),
    name,
    email,
    phone,
  };
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return newContact;
}

async function updateContactById(contactId, name, email, phone) {
  const contacts = await listContacts();
  const idx = contacts.findIndex((item) => item.id === contactId);
  if (idx === -1) {
    return null;
  }
  contacts[idx] = {
    id: contactId,
    name,
    email,
    phone,
  };
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return contacts[idx];
}

async function removeContact(contactId) {
  const contacts = await listContacts();
  const idx = contacts.findIndex((item) => item.id === contactId);
  if (idx === -1) {
    return null;
  }
  // with using filter
  //   const newContacts = contacts.filter((_, index) => index !== idx);
  //     await fs.writeFile(contactsPath, JSON.stringify(newContacts));
  //     return contacts[idx]
  const [removedContact] = contacts.splice(idx, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return removedContact;
}
module.exports = {
  listContacts,
  getContactById,
  addContact,
  updateContactById,
  removeContact,
};
