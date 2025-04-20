const ctx = document.getElementById("myChart").getContext("2d");

let chart = new Chart(ctx, {
  type: 'line',
  data: {
    labels: ["1", "2", "3", "4", "5"],
    datasets: [{
      label: 'Kiválasztott sor',
      data: [],
      borderColor: 'rgba(75, 192, 192, 1)',
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      fill: true,
      tension: 0.3
    }]
  },
  options: {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }
});

const rows = document.querySelectorAll("#dataTable tbody tr");

rows.forEach(row => {
  row.addEventListener("click", () => {
    const data = Array.from(row.children).map(cell => Number(cell.textContent));
    chart.data.datasets[0].data = data;
    chart.update();
  });

  // Hover effekthez: opcionális
  row.addEventListener("mouseover", () => row.style.backgroundColor = "#e0f7fa");
  row.addEventListener("mouseout", () => row.style.backgroundColor = "");
});
