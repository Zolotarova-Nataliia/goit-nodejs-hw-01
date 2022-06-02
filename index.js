const contactsOperation = require("./contacts");
const argv = require("yargs")
  .option("action", { string: true })
  .option("id", { string: true })
  .option("name", { string: true })
  .option("email", { string: true })
  .option("phone", { string: true }).argv;
async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const list = await contactsOperation.listContacts();
      console.table(list);
      break;

    case "get":
      const contact = await contactsOperation.getContactById(id);
      if (!contact) {
        throw new Error(`Product with id ${id} is not found!`);
      }
      console.log(contact);
      break;

    case "add":
      const newContact = await contactsOperation.addContact(name, email, phone);
      console.log(newContact);
      break;

    case "update":
      const updatedContact = await contactsOperation.updateContactById(
        id,
        name,
        email,
        phone
      );
      if (!updatedContact) {
        throw new Error(`Product with id ${id} is not found!`);
      }
      console.log(updatedContact);
      break;

    case "remove":
      const removedContact = await contactsOperation.removeContact(id);
      console.log(removedContact);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

(async () => {
  await invokeAction(argv);
})();
