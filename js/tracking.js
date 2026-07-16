// js/tracking.js
document.addEventListener('DOMContentLoaded', () => {
  // PERBAIKAN: Key disesuaikan menggunakan '_active_order'
  const activeOrderRaw = localStorage.getItem('_active_order');
  const trackingIDDisplay = document.getElementById('trackingIDDisplay');
  const progressBar = document.getElementById('statusProgressFill');
  const courierPin = document.getElementById('courierPin');

  let orderData = { orderID: 'WWZ-2026-DEFAULT', statusStep: 1 };

  if (activeOrderRaw) {
    orderData = JSON.parse(activeOrderRaw);
    if (trackingIDDisplay) trackingIDDisplay.innerText = orderData.orderID;
  }

  let simulatedStep = orderData.statusStep || 1;
  const pathPoints = [
    { x: 200, y: 150 },
    { x: 400, y: 150 },
    { x: 600, y: 150 },
    { x: 600, y: 450 }
  ];

  function updateTrackingState() {
    // Update opacity node di timeline
    document.querySelectorAll('.timeline-node').forEach((node, idx) => {
      if (idx + 1 <= simulatedStep) {
        node.classList.add('active');
      } else {
        node.classList.remove('active');
      }
    });

    // Update lebar progress bar linear
    const progressPercents = [25, 50, 75, 100];
    if (progressBar) {
      progressBar.style.width = `${progressPercents[simulatedStep - 1]}%`;
    }

    // Menggerakkan pin motor kurir pada map SVG secara real-time
    const targetPoint = pathPoints[simulatedStep - 1] || pathPoints[0];
    if (courierPin) {
      courierPin.setAttribute('transform', `translate(${targetPoint.x}, ${targetPoint.y})`);
    }

    // PERBAIKAN: Simulasi looping maju kedepan tanpa merusak data dasar localstorage awal
    if (simulatedStep < 4) {
      simulatedStep++;
    } else {
      simulatedStep = 1; // loop kembali dari awal untuk demo visual yang bagus
    }
  }

  updateTrackingState();
  setInterval(updateTrackingState, 4000); // Dipercepat ke 4 detik biar transisinya seru dilihat
});