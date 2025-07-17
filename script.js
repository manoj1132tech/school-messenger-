function addContact() {
  const name = document.getElementById("name").value.trim();
  const number = document.getElementById("number").value.trim();
  if (name && number) {
    firebase.database().ref("contacts").push({ name, number });
    document.getElementById("name").value = "";
    document.getElementById("number").value = "";
  }
}

function loadContacts() {
  firebase.database().ref("contacts").on("value", snapshot => {
    const table = document.getElementById("contactTable");
    table.innerHTML = "<tr><th>Name</th><th>Number</th></tr>";
    snapshot.forEach(child => {
      const data = child.val();
      const row = `<tr><td>${data.name}</td><td>${data.number}</td></tr>`;
      table.innerHTML += row;
    });
  });
}

function sendWhatsApp() {
  const msg = encodeURIComponent(document.getElementById("message").value);
  firebase.database().ref("contacts").once("value", snapshot => {
    snapshot.forEach(child => {
      const number = child.val().number;
      const url = `https://wa.me/${number}?text=${msg}`;
      window.open(url, '_blank');
    });
  });
}

window.onload = loadContacts;
