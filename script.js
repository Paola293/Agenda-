// Armazenamento de contatos no LocalStorage
let contacts = JSON.parse(localStorage.getItem('contacts')) || [];

function updateContactsTable() {
    const tableBody = document.querySelector("#contacts-table tbody");
    tableBody.innerHTML = ''; // Limpa a tabela
    contacts.forEach((contact, index) => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${contact.name}</td>
            <td>${contact.email}</td>
            <td>${contact.phone}</td>
            <td>
                <button class="edit" onclick="editContact(${index})">Editar</button>
                <button class="delete" onclick="deleteContact(${index})">Excluir</button>
            </td>
        `;

        tableBody.appendChild(row);
    });

    document.getElementById("total-count").innerText = contacts.length;
}

function addContact() {
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;

    if (!name || !email || !phone) {
        alert("Por favor, preencha todos os campos.");
        return;
    }

    const newContact = { name, email, phone };
    contacts.push(newContact);
    localStorage.setItem('contacts', JSON.stringify(contacts));
    clearFields();
    updateContactsTable();
}

function deleteContact(index) {
    if (confirm("Tem certeza que deseja excluir este contato?")) {
        contacts.splice(index, 1);
        localStorage.setItem('contacts', JSON.stringify(contacts));
        updateContactsTable();
    }
}

function editContact(index) {
    const contact = contacts[index];
    document.getElementById("name").value = contact.name;
    document.getElementById("email").value = contact.email;
    document.getElementById("phone").value = contact.phone;
    deleteContact(index);
}

function filterContacts() {
    const filter = document.getElementById("filter").value.toLowerCase();
    const filteredContacts = contacts.filter(contact =>
        contact.name.toLowerCase().includes(filter) ||
        contact.email.toLowerCase().includes(filter) ||
        contact.phone.toLowerCase().includes(filter)
    );
    updateFilteredContactsTable(filteredContacts);
}

function updateFilteredContactsTable(filteredContacts) {
    const tableBody = document.querySelector("#contacts-table tbody");
    tableBody.innerHTML = ''; // Limpa a tabela

    filteredContacts.forEach((contact, index) => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${contact.name}</td>
            <td>${contact.email}</td>
            <td>${contact.phone}</td>
            <td>
                <button class="edit" onclick="editContact(${index})">Editar</button>
                <button class="delete" onclick="deleteContact(${index})">Excluir</button>
            </td>
        `;

        tableBody.appendChild(row);
    });

    document.getElementById("total-count").innerText = filteredContacts.length;
}

function clearFields() {
    document.getElementById("name").value = '';
    document.getElementById("email").value = '';
    document.getElementById("phone").value = '';
}

// Atualiza a tabela de contatos ao carregar a página
updateContactsTable();