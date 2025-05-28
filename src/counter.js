let groups = [];

function createGroup() {
    const groupName = prompt("Nom du groupe ?");
    if (groupName) {
        groups.push({ name: groupName, admin: "Moi", members: [] });
        updateGroupList();
    }
}

function updateGroupList() {
    const list = document.getElementById("groupsList");
    list.innerHTML = "";

    groups.forEach((group, index) => {
        list.innerHTML += `
            <li class="border p-2 flex justify-between items-center">
                ${group.name} (Admin: ${group.admin}) 
                <button onclick="addMember(${index})" class="bg-blue-500 text-white p-1 rounded">Ajouter Membre</button>
            </li>
        `;
    });
}

function addMember(groupIndex) {
    const memberName = prompt("Nom du membre ?");
    if (memberName) {
        groups[groupIndex].members.push(memberName);
        updateGroupList();
    }
}
