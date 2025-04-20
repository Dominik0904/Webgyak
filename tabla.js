const table = document.querySelector("#userTable tbody");

function addRecord() {
  const name = document.getElementById("name").value.trim();
  const age = document.getElementById("age").value.trim();
  const city = document.getElementById("city").value.trim();
  const email = document.getElementById("email").value.trim();

  if (!name || !age || !city || !email) {
    alert("Minden mezőt ki kell tölteni!");
    return;
  }

  if (name.length > 30 || city.length > 30 || email.length > 50) {
    alert("Túl hosszú adat került be!");
    return;
  }

  const row = table.insertRow();

  row.insertCell().textContent = name;
  row.insertCell().textContent = age;
  row.insertCell().textContent = city;
  row.insertCell().textContent = email;

  const actions = row.insertCell();
  const delBtn = document.createElement("button");
  delBtn.textContent = "Törlés";
  delBtn.onclick = () => row.remove();
  actions.appendChild(delBtn);

  // Mezők ürítése
  document.getElementById("name").value = "";
  document.getElementById("age").value = "";
  document.getElementById("city").value = "";
  document.getElementById("email").value = "";
}

function filterTable() {
  const input = document.getElementById("searchInput").value.toLowerCase();
  const rows = table.getElementsByTagName("tr");

  for (let i = 0; i < rows.length; i++) {
    const cells = rows[i].getElementsByTagName("td");
    let match = false;

    for (let j = 0; j < cells.length - 1; j++) {
      if (cells[j].textContent.toLowerCase().includes(input)) {
        match = true;
        break;
      }
    }

    rows[i].style.display = match ? "" : "none";
  }
}

function sortTable(n) {
  const rows = Array.from(table.rows);
  let ascending = table.getAttribute("data-sort") !== "asc";
  rows.sort((a, b) => {
    const valA = a.cells[n].textContent;
    const valB = b.cells[n].textContent;
    return ascending ? valA.localeCompare(valB, 'hu', { numeric: true }) : valB.localeCompare(valA, 'hu', { numeric: true });
  });

  table.innerHTML = "";
  rows.forEach(row => table.appendChild(row));
  table.setAttribute("data-sort", ascending ? "asc" : "desc");
}
