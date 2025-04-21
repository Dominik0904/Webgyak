// Web Storage
function saveStorage() {
    const val = document.getElementById("storageInput").value;
    localStorage.setItem("myData", val);
  }
  
  function loadStorage() {
    const val = localStorage.getItem("myData");
    document.getElementById("storageOutput").innerText = val || "Nincs adat tárolva";
  }
  
  // Web Worker
  let worker;
  
  function startWorker() {
    if (typeof Worker !== "undefined") {
      if (!worker) {
        worker = new Worker("worker.js");
        worker.onmessage = function(e) {
          document.getElementById("workerResult").innerText = "Szám: " + e.data;
        };
      }
    } else {
      document.getElementById("workerResult").innerText = "A böngésző nem támogatja a Web Workert.";
    }
  }
  
  // Geolocation
  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        document.getElementById("location").innerText = `Lat: ${pos.coords.latitude}, Lon: ${pos.coords.longitude}`;
      });
    } else {
      document.getElementById("location").innerText = "A böngésző nem támogatja a Geolocation API-t.";
    }
  }
  
  // Drag and Drop
  function allowDrop(ev) {
    ev.preventDefault();
  }
  
  function dragStart(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
  }
  
  function drop(ev) {
    ev.preventDefault();
    const data = ev.dataTransfer.getData("text");
    const dragged = document.getElementById(data);
    ev.target.appendChild(dragged);
  }
  
  // Canvas rajz
  window.onload = function() {
    const canvas = document.getElementById("myCanvas");
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "green";
    ctx.fillRect(10, 10, 150, 80);
  };
  