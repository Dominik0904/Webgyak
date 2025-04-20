const API_URL = "http://gamf.nhely.hu/ajax2/";
const NEPTUN = "FL6KPT"; // ← Saját Neptun kód
const CODE = NEPTUN + "abc123"; // ← saját generált kód

function postData(params, callback) {
  fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      ...params,
      code: CODE,
    }),
  })
    .then((res) => res.json())
    .then(callback)
    .catch((err) => console.error("Hiba:", err));
}

// ----- READ -----
function readData() {
  postData({ op: "list" }, (data) => {
    const output = document.getElementById("output");
    output.innerHTML = "";
    let total = 0, max = 0;

    data.forEach((item) => {
      total += Number(item.height);
      if (item.height > max) max = item.height;

      const row = document.createElement("div");
      row.innerText = `ID: ${item.id} - ${item.name}, ${item.height} cm, ${item.weight} kg`;
      output.appendChild(row);
    });

    const stats = document.createElement("p");
    stats.innerText = `Elemek száma: ${data.length}, Össz: ${total}, Átlag: ${(total / data.length).toFixed(2)}, Max: ${max}`;
    output.appendChild(stats);
  });
}

// ----- CREATE -----
function createData() {
  const name = document.getElementById("name").value.trim();
  const height = document.getElementById("height").value;
  const weight = document.getElementById("weight").value;

  if (!name || name.length > 30) return alert("Név kötelező (max 30 karakter)");
  if (!height || !weight) return alert("Magasság és súly megadása kötelező");

  postData(
    { op: "create", name, height, weight },
    (response) => {
      alert("Sikeres hozzáadás");
      readData();
    }
  );
}

// ----- DELETE -----
function deleteData() {
  const id = document.getElementById("deleteId").value.trim();
  if (!id) return alert("Add meg az ID-t a törléshez!");

  postData({ op: "delete", id }, (response) => {
    alert("Sikeres törlés");
    readData();
  });
}

// ----- GET ONE (UPDATE előkészítés) -----
function getDataForId() {
  const id = document.getElementById("updateId").value.trim();
  if (!id) return alert("Add meg az ID-t a lekéréshez!");

  postData({ op: "get", id }, (item) => {
    document.getElementById("newName").value = item.name;
    document.getElementById("newHeight").value = item.height;
    document.getElementById("newWeight").value = item.weight;
  });
}

// ----- UPDATE -----
function updateData() {
  const id = document.getElementById("updateId").value.trim();
  const name = document.getElementById("newName").value.trim();
  const height = document.getElementById("newHeight").value;
  const weight = document.getElementById("newWeight").value;

  if (!id || !name || name.length > 30 || !height || !weight) {
    return alert("Minden mező kötelező, név max 30 karakter");
  }

  postData({ op: "update", id, name, height, weight }, (res) => {
    alert("Sikeres módosítás");
    readData();
  });
}

// --- induláskor betöltés ---
window.onload = () => {
  readData();
  document.getElementById("readBtn").onclick = readData;
  document.getElementById("createBtn").onclick = createData;
  document.getElementById("deleteBtn").onclick = deleteData;
  document.getElementById("getBtn").onclick = getDataForId;
  document.getElementById("updateBtn").onclick = updateData;
};

