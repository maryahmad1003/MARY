import { createAppInterface } from './script.js';

createAppInterface();

const mainContent = document.getElementById('mainContent');
const addContactButton = document.getElementById('addContact');

addContactButton.addEventListener('click', () => {
  mainContent.innerHTML = `
    <h1 class="text-lg font-semibold text-gray-700">Ajouter un Contact</h1>
    <form id="contactForm" class="space-y-4">
      <input type="text" id="contactName" placeholder="Nom du contact" class="w-full p-2 border border-gray-300 rounded-lg">
      <input type="text" id="contactPhone" placeholder="Numéro de téléphone" class="w-full p-2 border border-gray-300 rounded-lg">
      <button type="submit" class="bg-green-500 text-white px-4 py-2 rounded-lg">Ajouter</button>
    </form>
    <div id="contactList" class="mt-4">
      <h2 class="text-md font-semibold text-gray-700">Liste des Contacts</h2>
      <ul class="list-disc pl-5 space-y-2"></ul>
    </div>
  `;

  const contactForm = document.getElementById('contactForm');
  const contactList = document.querySelector('#contactList ul');

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const phone = document.getElementById('contactPhone').value.trim();

    if (name && phone) {
      const listItem = document.createElement('li');
      listItem.textContent = `${name} - ${phone}`;
      contactList.appendChild(listItem);

      contactForm.reset();
    } else {
      alert('Veuillez remplir tous les champs.%%%%%%%%%%');
    }
  });
});