import { data } from "./data.js";

const contacts = [
  { name: 'Toto', lastMessage: 'Un exemple', lastMessageDate: '10:30', phone: '+123456789' },
  { name: 'MM', lastMessage: 'Mon dernier message', lastMessageDate: 'Hier', phone: '+987654321' }
];

const groups = [
  {
    name: 'Fifa',
    admin: { name: 'Lepp nice' },
    messages: [
      { sender: 'Toto', text: 'bla bla bla', time: '12:01' },
      { sender: 'MM', text: 'Wala Bok', time: '12:01' },
      { sender: 'Me', text: 'Voici un message', time: '12:01' }
    ]
  },
  {
    name: 'Group 2',
    admin: { name: 'Admin 2' },
    messages: [
      { sender: 'User 1', text: 'Hello Group 2', time: '10:30' }
    ]
  }
];

export const data = {
  contacts: [
    { name: "Alice", phone: "123-456-7890" },
    { name: "Bob", phone: "987-654-3210" },
    { name: "Charlie", phone: "555-555-5555" },

    { name: "Alice", phone: "123-456-7890" },
    { name: "Bob", phone: "987-654-3210" },
    { name: "Charlie", phone: "555-555-5555" },

    { name: "Alice", phone: "123-456-7890" },
    { name: "Bob", phone: "987-654-3210" },
    { name: "Charlie", phone: "555-555-5555" }
  ],
  archivedContacts: [],
  groups: [],
  messages: []
};
groups.push({
  name: groupName,
  description: groupDescription,
  admin,
  members: [],
  messages: []
});
const archivedContacts = [];