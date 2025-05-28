const app = document.getElementById('app');
const contacts = [];
const groups = [];
const archivedContacts = [];

function loadFromLocalStorage() {
  const storedContacts = localStorage.getItem('contacts');
  const storedGroups = localStorage.getItem('groups');
  const storedArchivedContacts = localStorage.getItem('archivedContacts'); // Charger les contacts archivés

  if (storedContacts) {
    contacts.push(...JSON.parse(storedContacts));
  }

  if (storedGroups) {
    groups.push(...JSON.parse(storedGroups));
  }

  if (storedArchivedContacts) {
    archivedContacts.push(...JSON.parse(storedArchivedContacts));
  }
}

function saveToLocalStorage() {
  localStorage.setItem('contacts', JSON.stringify(contacts));
  localStorage.setItem('groups', JSON.stringify(groups));
  localStorage.setItem('archivedContacts', JSON.stringify(archivedContacts)); // Sauvegarder les contacts archivés
}

const container = document.createElement('div');
container.className = 'w-[1600px] h-[800px] bg-white shadow-lg rounded-lg flex';

container.innerHTML = `
  <div class="w-[10%] bg-[#ECE5DD] flex flex-col justify-center items-center space-y-4 py-4">
    <button id="messagesButton" class="bg-white w-20 h-20 p-3 rounded-md border-2 border-[#F5C16C] shadow flex flex-col items-center justify-center hover:bg-[#F5F5DC]">
      <span class="material-icons text-black text-2xl">chat</span>
      <span class="text-sm text-black mt-1">Messages</span>
    </button>
    <button id="groupsButton" class="bg-white w-20 h-20 p-3 rounded-md border-2 border-[#F5C16C] shadow flex flex-col items-center justify-center hover:bg-[#F5F5DC]">
      <span class="material-icons text-black text-2xl">group</span>
      <span class="text-sm text-black mt-1">Groupes</span>
    </button>
    <button id="broadcastButton" class="bg-white w-20 h-20 p-3 rounded-md border-2 border-[#F5C16C] shadow flex flex-col items-center justify-center hover:bg-[#F5F5DC]">
      <span class="material-icons text-black text-2xl">campaign</span>
      <span class="text-sm text-black mt-1">Diffusions</span>
    </button>
    <button id="archiveButton" class="bg-white w-20 h-20 p-3 rounded-md border-2 border-[#F5C16C] shadow flex flex-col items-center justify-center hover:bg-[#F5F5DC]">
      <span class="material-icons text-black text-2xl">archive</span>
      <span class="text-sm text-black mt-1">Archives</span>
    </button>
    <button id="addContactButton" class="bg-white w-20 h-20 p-3 rounded-md border-2 border-[#F5C16C] shadow flex flex-col items-center justify-center hover:bg-[#E0B05A]">
      <span class="material-icons text-black text-2xl">add</span>
      <span class="text-sm text-black mt-1">Nouveau</span>
    </button>
  </div>

  <div class="w-[30%] bg-[#F5F5DC] flex flex-col border-r border-gray-300" id="discussionsContainer">
  <h1 class="text-2xl font-semibold text-black px-4 py-2 bg-[#F5F5DC]">Discussions</h1>
  <input 
    type="text" 
    placeholder="Recherche" 
    class="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#25D366] mx-4 bg-white text-black placeholder-gray-500"
  />
  <div class="flex-1 border-t border-gray-300 bg-[#F5F5DC] overflow-y-auto">
    <!-- Liste des contacts sera générée ici -->
  </div>
</div>

  <div id="mainContent" class="w-[64%] bg-[#ECE5DD] relative rounded-r-lg border-l border-gray-300">
    <div class="absolute top-2 left-2 flex items-center">
      <div class="w-10 h-10 bg-gray-500 rounded-full"></div>
      <span class="ml-2 text-black font-semibold"></span>
    </div>
    
    <!-- Trait blanc ajouté ici -->
    <div class="absolute top-[50px] left-0 w-full h-[2px] bg-white"></div>
    
    <div class="absolute top-2 right-2 flex items-center space-x-2">
      <button id="closeButton" class="w-8 h-8 bg-white rounded-full shadow flex items-center justify-center hover:bg-gray-200">
        <span class="material-icons text-yellow-500">close</span>
      </button>
      <button id="archiveButton" class="w-8 h-8 bg-white rounded-full shadow flex items-center justify-center hover:bg-gray-200">
        <span class="material-icons text-amber-700">archive</span>
      </button>
      <button id="blockButton" class="w-8 h-8 bg-white rounded-full shadow flex items-center justify-center hover:bg-gray-200">
        <span class="material-icons text-black">block</span>
      </button>
      <button id="deleteButton" class="w-8 h-8 bg-white rounded-full shadow flex items-center justify-center hover:bg-gray-200">
        <span class="material-icons text-red-500">delete</span>
      </button>
    </div>
    
    <div class="absolute bottom-4 right-4 flex items-center space-x-2 w-full px-4">
      <input 
        type="text" 
        placeholder="Écrire un message..." 
        class="flex-1 h-[49px] p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#25D366] bg-white text-black placeholder-gray-500"
      />
      <button class="w-12 h-12 bg-[#25D366] rounded-full shadow flex items-center justify-center hover:bg-[#1DAF5A]">
        <span class="material-icons text-white">send</span>
      </button>
    </div>
  </div>

  <div id="modal" class="hidden fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
    <div class="bg-white p-6 rounded-lg shadow-lg w-[400px]">
      <h2 class="text-lg font-semibold text-gray-700 mb-4">Ajouter un Contact</h2>
      <form id="contactForm" class="space-y-4">
        <input type="text" id="contactName" placeholder="Nom" class="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#25D366]">
        <input type="text" id="contactPhone" placeholder="Numéro de téléphone" class="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#25D366]">
        <div class="text-red-500 text-sm" id="phoneError"></div>
        <button type="submit" class="bg-[#25D366] text-white px-4 py-2 rounded-lg hover:bg-[#1DAF5A]">Ajouter</button>
      </form>
      <button id="closeModal" class="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600">Fermer</button>
    </div>
  </div>

  <div id="groupModal" class="hidden fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
    <div class="bg-white p-6 rounded-lg shadow-lg w-[400px]">
      <h2 id="groupModalTitle" class="text-lg font-semibold text-gray-700 mb-4"></h2>
      <form id="groupModalForm" class="space-y-4">
        <input type="text" id="groupModalInput" placeholder="" class="w-full p-2 border border-gray-300 rounded-lg">
        <button type="submit" class="bg-green-500 text-white px-4 py-2 rounded-lg">Valider</button>
      </form>
      <button id="closeGroupModal" class="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg">Fermer</button>
    </div>
  </div>
`;

app.appendChild(container);

const modal = document.getElementById('modal');
const closeModal = document.getElementById('closeModal');
document.getElementById('addContactButton').addEventListener('click', () => {
  modal.classList.remove('hidden');
});
closeModal.addEventListener('click', () => {
  modal.classList.add('hidden');
});
document.addEventListener('DOMContentLoaded', displayContacts );
document.getElementById('contactForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('contactName').value.trim();
  let phone = document.getElementById('contactPhone').value.trim();
  const errorMessage = document.getElementById('phoneError');

  phone = phone.replace(/\s+/g, '');

  if (!/^(\+\d{1,3})?\d{9}$/.test(phone)) {
    errorMessage.textContent = 'Le numéro de téléphone doit être valide (exemple : +33XXXXXXXXX ou 77XXXXXXX).';
    return;
  }

  if (name && phone) {
    const uniqueName = generateUniqueName(name);

    if (contacts.some(contact => contact.phone === phone)) {
      alert('Un contact avec ce numéro de téléphone existe déjà.');
      return;
    }

    contacts.push({ name: uniqueName, phone });
    saveToLocalStorage();
    modal.classList.add('hidden');
    document.getElementById('contactForm').reset();
    displayContacts();
  } else {
    alert('Veuillez remplir tous les champs.');
  }
});
function displayContacts(searchTerm = '') {
  const discussionsContainer = document.querySelector('#discussionsContainer');
  const container = discussionsContainer.querySelector('div');

  container.innerHTML = `
    <div id="contactsList" class="overflow-y-auto h-[700px]">
      <ul class="list-none pl-5 space-y-2">
        ${contacts
          .filter(contact => 
            contact.name.toLowerCase().includes(searchTerm) || 
            contact.phone.includes(searchTerm)
          )
          .map(contact => `
            <li class="flex items-center gap-4 border-b border-gray-300 py-2">
              <div class="w-10 h-10 bg-gray-500 text-white flex items-center justify-center rounded-full font-bold">
                ${getInitials(contact.name)}
              </div>
              <div class="flex-1">
                <span class="text-gray-700 font-semibold">${contact.name}</span>
                <br>
                <span class="text-sm text-gray-500">${contact.phone || 'Aucun numéro'}</span>
              </div>
              <div class="flex flex-col items-end">
                <span class="text-sm text-green-500">${contact.lastMessageDate || 'date'}</span>
                <div class="w-3 h-3 bg-green-500 rounded-full mt-1"></div>
              </div>
            </li>
          `).join('')}
      </ul>
    </div>
  `;

  const contactsList = document.getElementById('contactsList');
  contactsList.scrollTop = contactsList.scrollHeight; 
}


function displayGroups() {
  const discussionsContainer = document.querySelector('#discussionsContainer');
  const container = discussionsContainer.querySelector('div');

  container.innerHTML = `
    <h2 class="text-lg font-semibold text-gray-700 px-4 py-2">Groupes</h2>
    <ul class="list-none pl-5 space-y-2">
      ${groups.map(group => `
        <li class="flex items-center gap-2 border-b border-gray-300 py-2">
          <div class="w-10 h-10 bg-gray-500 text-white flex items-center justify-center rounded-full font-bold">
            ${getInitials(group.name)}
          </div>
          <div class="flex-1">
            <span class="text-gray-700 font-semibold">${group.name}</span>
            <br>
            <span class="text-sm text-gray-500">Admin : ${group.admin ? group.admin.name : 'Aucun'}</span>
          </div>
          <div class="flex flex-col items-end">
            <span class="text-sm text-green-500">date</span>
            <div class="w-3 h-3 bg-green-500 rounded-full mt-1 cursor-pointer" onclick="showGroupOptions('${group.name}')"></div>
          </div>
        </li>
      `).join('')}
    </ul>
    <div class="flex justify-end p-4">
      <button id="createGroupButton" class="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
        Créer un groupe
      </button>
    </div>
  `;

  document.getElementById('createGroupButton').addEventListener('click', () => {
    openCreateGroupForm();
  });
}

document.getElementById('groupsButton').addEventListener('click', () => {
  displayGroups();
});

const groupModal = document.getElementById('groupModal');
const groupModalTitle = document.getElementById('groupModalTitle');
const groupModalInput = document.getElementById('groupModalInput');
const groupModalForm = document.getElementById('groupModalForm');
const closeGroupModal = document.getElementById('closeGroupModal');

closeGroupModal.addEventListener('click', () => {
  groupModal.classList.add('hidden');
});

function openGroupModal(title, placeholder, callback) {
  groupModalTitle.textContent = title;
  groupModalInput.placeholder = placeholder;
  groupModalInput.value = '';
  groupModalForm.onsubmit = (e) => {
    e.preventDefault();
    callback(groupModalInput.value.trim());
    groupModal.classList.add('hidden');
  };
  groupModal.classList.remove('hidden');
}

function createGroup() {
  openGroupModal('Créer un groupe', 'Nom du groupe', (groupName) => {
    if (groupName) {
      const existingGroup = groups.find(group => group.name === groupName);
      if (existingGroup) {
        alert('Un groupe avec ce nom existe déjà.');
        return;
      }

      let admin = contacts.find(contact => contact.name === 'Mary Vonne Diallo');
      if (!admin) {
        admin = { name: 'Mary Vonne Diallo', phone: '123456789' }; 
        contacts.push(admin);
        saveToLocalStorage();
      }

      groups.push({
        name: groupName,
        admin,
        members: [],
        messages: []
      });

      saveToLocalStorage();

      displayGroups();
    } else {
      alert('Le nom du groupe ne peut pas être vide.');
    }
  });
}

function addMembersToGroup(groupName) {
  const group = groups.find(g => g.name === groupName);
  if (!group) return;

  const discussionsContainer = document.querySelector('#discussionsContainer');
  const container = discussionsContainer.querySelector('div');

  container.innerHTML = `
    <div class="p-4">
      <h2 class="text-lg font-semibold text-gray-700 mb-4">Ajouter des membres au groupe : ${group.name}</h2>
      <ul class="list-none pl-5 space-y-2">
        ${contacts.map(contact => `
          <li class="flex items-center gap-4 border-b border-gray-300 py-2">
            <div class="w-10 h-10 bg-gray-500 text-white flex items-center justify-center rounded-full font-bold">
              ${getInitials(contact.name)}
            </div>
            <div class="flex-1">
              <span class="text-gray-700 font-semibold">${contact.name}</span>
              <br>
              <span class="text-sm text-gray-500">${contact.phone || 'Aucun numéro'}</span>
            </div>
            <input type="checkbox" value="${contact.name}" class="contact-checkbox">
          </li>
        `).join('')}
      </ul>
      <button class="bg-green-500 text-white px-4 py-2 rounded-lg mt-4" onclick="confirmAddMembers('${group.name}')">Ajouter les membres sélectionnés</button>
    </div>
  `;
}

function confirmAddMembers(groupName) {
  const group = groups.find(g => g.name === groupName);
  if (!group) return;

  const selectedContacts = Array.from(document.querySelectorAll('.contact-checkbox:checked'))
    .map(checkbox => checkbox.value);

  selectedContacts.forEach(memberName => {
    const contact = contacts.find(c => c.name === memberName);
    if (contact && !group.members.includes(contact)) {
      group.members.push(contact);
    }
  });

  saveToLocalStorage(); 
  showGroupDetails(groupName); 
}

function addMemberToGroup(groupName, memberName) {
  const group = groups.find(g => g.name === groupName);
  const contact = contacts.find(c => c.name === memberName);

  if (group && contact) {
    if (!group.members.includes(contact)) {
      group.members.push(contact);
      saveToLocalStorage(); 
      displayGroups();
      groupModal.classList.add('hidden');
    } else {
      alert(`${memberName} est déjà membre du groupe "${groupName}".`);
    }
  }
}

function setGroupAdmin(groupName) {
  const group = groups.find(g => g.name === groupName);
  if (!group) return;

  openGroupModal('Définir un administrateur', 'Nom du contact', (adminName) => {
    const contact = contacts.find(c => c.name === adminName);
    if (contact) {
      group.admin = contact;
      displayGroups();
    }
  });
}

document.getElementById('groupsButton').addEventListener('click', () => {
  displayGroups();
});

function displayBroadcastMessageInput() {
  const discussionsContainer = document.querySelector('#discussionsContainer');
  const container = discussionsContainer.querySelector('div');

  container.innerHTML = `
    <h2 class="text-lg font-semibold text-gray-700 px-4 py-2">Diffusion</h2>
    <textarea 
      id="broadcastMessage" 
      placeholder="Écrivez votre message ici..." 
      class="w-full h-20 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#25D366] bg-white text-black placeholder-gray-500"
    ></textarea>
    <button id="showContactsButton" class="bg-[#25D366] text-white px-4 py-2 rounded-lg mt-4 hover:bg-[#1DAF5A]">
      Envoyer
    </button>
  `;

  document.getElementById('showContactsButton').addEventListener('click', () => {
    const message = document.getElementById('broadcastMessage').value.trim();
    if (message) {
      displayBroadcastContacts(message);
    } else {
      alert('Veuillez écrire un message avant de continuer.');
    }
  });
}

function displayBroadcastContacts(message) {
  const discussionsContainer = document.querySelector('#discussionsContainer');
  const container = discussionsContainer.querySelector('div');

  container.innerHTML = `
    <h2 class="text-lg font-semibold text-gray-700 px-4 py-2">Sélectionnez les contacts</h2>
    <ul class="list-none pl-5 space-y-2">
      ${contacts.map(contact => `
        <li class="flex items-center gap-2">
          <input type="checkbox" class="broadcast-checkbox" value="${contact.phone}" />
          <span class="text-gray-700 font-semibold">${contact.name} (${contact.phone})</span>
        </li>
      `).join('')}
    </ul>
    <button id="sendBroadcastButton" class="bg-[#25D366] text-white px-4 py-2 rounded-lg mt-4 hover:bg-[#1DAF5A]">
      Envoyer la diffusion
    </button>
  `;

  document.getElementById('sendBroadcastButton').addEventListener('click', () => {
    const selectedContacts = Array.from(document.querySelectorAll('.broadcast-checkbox:checked'))
      .map(checkbox => checkbox.value);

    if (selectedContacts.length > 0) {
      alert(`Message envoyé : "${message}"\nAux contacts : ${selectedContacts.join(', ')}`);

      document.querySelectorAll('.broadcast-checkbox').forEach(checkbox => {
        checkbox.checked = false;
      });
    } else {
      alert('Veuillez sélectionner au moins un contact.');
    }
  });
}

document.getElementById('broadcastButton').addEventListener('click', () => {
  displayBroadcastMessageInput();
});

function displayGroupMessages(groupName) {
  const group = groups.find(g => g.name === groupName);
  if (!group) {
    alert('Groupe introuvable.');
    return;
  }

  const messagesContainer = document.createElement('div');
  messagesContainer.className = 'absolute top-[60px] bottom-[80px] left-0 right-0 overflow-y-auto px-4 py-2';

  messagesContainer.innerHTML = `
    ${group.messages && group.messages.length > 0 ? group.messages.map(message => `
      <div class="flex ${message.sender === 'Me' ? 'justify-end' : 'justify-start'} mb-2">
        <div class="max-w-[70%] p-2 rounded-lg shadow ${message.sender === 'Me' ? 'bg-green-500 text-white' : 'bg-gray-200 text-black'}">
          <span class="block font-semibold">${message.sender}</span>
          <span>${message.text}</span>
          <span class="block text-xs text-right mt-1">${message.time}</span>
        </div>
      </div>
    `).join('') : '<div class="text-gray-500 text-center mt-4">Aucun message dans ce groupe.</div>'}
  `;

  const mainContent = document.getElementById('mainContent');

  mainContent.querySelector('.absolute.top-2.left-2 span').textContent = group.name;
  const existingMessagesContainer = mainContent.querySelector('.absolute.top-[60px].bottom-[80px]');
  if (existingMessagesContainer) {
    mainContent.removeChild(existingMessagesContainer);
  }
  mainContent.appendChild(messagesContainer);

  const inputSection = mainContent.querySelector('.absolute.bottom-4.right-4');
  inputSection.innerHTML = `
    <input 
      type="text" 
      id="groupMessageInput"
      placeholder="Écrire un message..." 
      class="flex-1 h-[49px] p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#25D366] bg-white text-black placeholder-gray-500"
    />
    <button id="sendGroupMessageButton" class="w-12 h-12 bg-[#25D366] rounded-full shadow flex items-center justify-center hover:bg-[#1DAF5A]">
      <span class="material-icons text-white">send</span>
    </button>
  `;

  document.getElementById('sendGroupMessageButton').addEventListener('click', () => {
    const input = document.getElementById('groupMessageInput');
    const messageText = input.value.trim();
    if (messageText) {
      const newMessage = {
        sender: 'Me',
        text: messageText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      group.messages.push(newMessage); 
      saveToLocalStorage(); 
      input.value = ''; 
      displayGroupMessages(groupName);
    }
  });
}

function displayMessages() {
  const discussionsContainer = document.querySelector('#discussionsContainer');
  const container = discussionsContainer.querySelector('div');

  container.innerHTML = `
    <div id="contactsList" class="overflow-y-auto h-[700px]">
      <ul class="list-none pl-5 space-y-2">
        ${contacts.length > 0 ? contacts.map(contact => `
          <li class="flex items-center gap-4 border-b border-gray-300 py-2 cursor-pointer" data-contact-name="${contact.name}">
            <div class="relative w-10 h-10 bg-gray-500 text-white flex items-center justify-center rounded-full font-bold">
              ${getInitials(contact.name)}
              <div class="selected-icon hidden absolute top-0 right-0 bg-green-500 text-white w-4 h-4 flex items-center justify-center rounded-full text-xs font-bold">✔</div>
            </div>
            <div class="flex-1">
              <span class="text-gray-700 font-semibold">${contact.name}</span>
              <br>
              <span class="text-sm text-gray-500">${contact.phone || 'Aucun numéro'}</span>
            </div>
            <div class="flex flex-col items-end">
              <span class="text-sm text-green-500">${contact.lastMessageDate || 'date'}</span>
              <div class="w-3 h-3 bg-green-500 rounded-full mt-1"></div>
            </div>
          </li>
        `).join('') : '<div class="text-gray-500 text-center mt-4">Aucun message disponible.</div>'}
      </ul>
    </div>
  `;

  const messageItems = container.querySelectorAll('li[data-contact-name]');
  messageItems.forEach(item => {
    item.addEventListener('click', () => {
      const selectedIcon = item.querySelector('.selected-icon');
      if (selectedIcon.classList.contains('hidden')) {
        selectedIcon.classList.remove('hidden');
      } else {
        selectedIcon.classList.add('hidden');
      }
    });
  });
}
loadFromLocalStorage();
document.addEventListener('DOMContentLoaded', displayContacts);
document.querySelector('input[placeholder="Recherche"]').addEventListener('input', (e) => {
  const searchTerm = e.target.value.toLowerCase();
  displayContacts(searchTerm);
});

function getInitials(name) {
  const words = name.trim().split(' ');
  const initials = words.map(word => word[0]?.toUpperCase()).join('');
  return initials.slice(0, 2); 
}

function generateUniqueName(name) {
  let uniqueName = name;
  let counter = 1;

  while (contacts.some(contact => contact.name === uniqueName)) {
    uniqueName = `${name} ${counter}`;
    counter++;
  }

  return uniqueName;
}

document.addEventListener('DOMContentLoaded', () => {
  if (!contacts.some(contact => contact.name === 'Mary Vonne Diallo')) {
    contacts.push({ name: 'Mary Vonne Diallo', phone: '123456789' }); 
    saveToLocalStorage();
  }

  displayContacts();
});

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('closeButton').addEventListener('click', () => {
    alert('Action : Fermer');
  });

  // Bouton "Archiver"
  // document.getElementById('archiveButton').addEventListener('click', () => {
  //   alert('Action : Archiver');
  // });

  document.getElementById('blockButton').addEventListener('click', () => {
    alert('Action : Bloquer');
  });

  document.getElementById('deleteButton').addEventListener('click', () => {
    const confirmation = confirm('Êtes-vous sûr de vouloir supprimer cet élément ?');
    if (confirmation) {
      alert('Action : Supprimer');
    }
  });
});

function archiveContact(contactName) {
  const contactIndex = contacts.findIndex(contact => contact.name === contactName);
  if (contactIndex !== -1) {
    const [archivedContact] = contacts.splice(contactIndex, 1); 
    archivedContacts.push(archivedContact);
    saveToLocalStorage(); 
    alert(`${contactName} a été archivé.`);
    displayMessages(); 
  }
}

function archiveSelectedMessages() {
  const selectedMessages = document.querySelectorAll('li[data-contact-name] .selected-icon:not(.hidden)');
  const selectedContacts = Array.from(selectedMessages).map(icon => {
    const parentLi = icon.closest('li[data-contact-name]');
    return parentLi.dataset.contactName;
  });

  selectedContacts.forEach(contactName => {
    const contactIndex = contacts.findIndex(contact => contact.name === contactName);
    const archivedIndex = archivedContacts.findIndex(contact => contact.name === contactName);

    if (contactIndex !== -1) {
      const [archivedContact] = contacts.splice(contactIndex, 1);
      archivedContacts.push(archivedContact);
    } else if (archivedIndex !== -1) {
      const [restoredContact] = archivedContacts.splice(archivedIndex, 1);
      contacts.push(restoredContact);
    }
  });

  saveToLocalStorage(); 
  displayMessages(); 
  alert('Action effectuée : messages archivés ou désarchivés.');
}

document.getElementById('messagesButton').addEventListener('click', () => {
  displayMessages();
});

function displayArchivedContacts() {
  const discussionsContainer = document.querySelector('#discussionsContainer');
  const container = discussionsContainer.querySelector('div');

  container.innerHTML = `
    <div id="archivedContactsList" class="overflow-y-auto h-[700px]">
      <ul class="list-none pl-5 space-y-2">
        ${archivedContacts.length > 0 ? archivedContacts.map(contact => `
          <li class="flex items-center gap-4 border-b border-gray-300 py-2">
            <div class="w-10 h-10 bg-gray-500 text-white flex items-center justify-center rounded-full font-bold">
              ${getInitials(contact.name)}
            </div>
            <div class="flex-1">
              <span class="text-gray-700 font-semibold">${contact.name}</span>
              <br>
              <span class="text-sm text-gray-500">${contact.phone || 'Aucun numéro'}</span>
            </div>
            <div class="flex flex-col items-end">
              <span class="text-sm text-green-500">${contact.lastMessageDate || 'date'}</span>
              <div class="w-3 h-3 bg-green-500 rounded-full mt-1"></div>
            </div>
          </li>
        `).join('') : '<div class="text-gray-500 text-center mt-4">Aucun contact archivé.</div>'}
      </ul>
    </div>
  `;
}

document.getElementById('archiveButton').addEventListener('click', () => {
  displayArchivedContacts(); 
});

const buttons = document.querySelectorAll('.w-20'); 

buttons.forEach(button => {
  button.addEventListener('click', () => {
    buttons.forEach(btn => btn.classList.remove('bg-[#F5C16C]', 'border-[#E0B05A]'));

    button.classList.add('bg-[#F5C16C]', 'border-[#E0B05A]');
  });
});

document.getElementById('addContactButton').classList.remove('bg-[#F5C16C]', 'border-[#E0B05A]');

function showGroupOptions(groupName) {
  const group = groups.find(g => g.name === groupName);
  if (!group) return;

  const discussionsContainer = document.querySelector('#discussionsContainer');
  const container = discussionsContainer.querySelector('div');

  container.innerHTML = `
    <div class="p-4">
      <h2 class="text-lg font-semibold text-gray-700 mb-4">${group.name}</h2>
      <button class="bg-blue-500 text-white px-4 py-2 rounded-lg mb-2" onclick="showGroupDetails('${group.name}')">Détails du groupe</button>
      <button class="bg-green-500 text-white px-4 py-2 rounded-lg" onclick="addMembersToGroup('${group.name}')">Ajouter des membres</button>
    </div>
  `;
}

function showGroupDetails(groupName) {
  const group = groups.find(g => g.name === groupName);
  if (!group) return;

  const discussionsContainer = document.querySelector('#discussionsContainer');
  const container = discussionsContainer.querySelector('div');

  container.innerHTML = `
    <div class="p-4">
      <h2 class="text-lg font-semibold text-gray-700 mb-4">Membres du groupe : ${group.name}</h2>
      <p class="text-sm text-gray-500 mb-4">Administrateur : ${group.admin ? group.admin.name : 'Aucun'}</p>
      <ul class="list-none pl-5 space-y-2">
        ${group.members.length > 0 ? group.members.map(member => `
          <li class="flex items-center gap-4 border-b border-gray-300 py-2">
            <div class="w-10 h-10 bg-gray-500 text-white flex items-center justify-center rounded-full font-bold">
              ${getInitials(member.name)}
            </div>
            <div class="flex-1">
              <span class="text-gray-700 font-semibold">${member.name}</span>
              <br>
              <span class="text-sm text-gray-500">${member.phone || 'Aucun numéro'}</span>
            </div>
          </li>
        `).join('') : '<div class="text-gray-500 text-center mt-4">Aucun membre dans ce groupe.</div>'}
      </ul>
    </div>
  `;
}

function openCreateGroupForm() {
  const discussionsContainer = document.querySelector('#discussionsContainer');
  const container = discussionsContainer.querySelector('div');

  container.innerHTML = `
    <div class="p-4">
      <h2 class="text-lg font-semibold text-gray-700 mb-4">Créer un groupe</h2>
      <form id="createGroupForm" class="space-y-4">
        <input 
          type="text" 
          id="groupNameInput" 
          placeholder="Nom du groupe" 
          class="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <textarea 
          id="groupDescriptionInput" 
          placeholder="Description du groupe" 
          class="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows="3"
        ></textarea>
        <button type="submit" class="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600">Créer</button>
        <button type="button" id="cancelCreateGroup" class="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600">Annuler</button>
      </form>
    </div>
  `;

  document.getElementById('createGroupForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const groupName = document.getElementById('groupNameInput').value.trim();
    const groupDescription = document.getElementById('groupDescriptionInput').value.trim();
    createGroupWithDetails(groupName, groupDescription);
  });

  document.getElementById('cancelCreateGroup').addEventListener('click', () => {
    displayGroups();
  });
}


  

















