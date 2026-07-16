// js/order.js
document.addEventListener('DOMContentLoaded', () => {
  // PERBAIKAN: Menyesuaikan struktur grid service-option dari HTML order
  const slider = document.getElementById('weightSlider');
  const weightValDisplay = document.getElementById('weightValue') || document.getElementById('weightVal');
  
  const sumService = document.getElementById('summaryService') || document.getElementById('sumService');
  const sumWeight = document.getElementById('summaryWeight') || document.getElementById('sumWeight');
  const sumTotal = document.getElementById('summaryTotal') || document.getElementById('sumTotal');

  const backBtn = document.getElementById('backBtn');
  const nextBtn = document.getElementById('nextBtn');
  const steps = document.querySelectorAll('.form-step') || document.querySelectorAll('.step-content');
  let activeStepIdx = 0;

  function updatePricing() {
    // PERBAIKAN: Mengambil data dari element yang memiliki class .selected (bukan radio button)
    const selectedOpt = document.querySelector('.service-option.selected');
    if (!selectedOpt || !slider) return;

    // Parsing harga dari text atau attribute jika ada, default ke harga dasar
    let pricePerKg = 8000; 
    const textContent = selectedOpt.innerText;
    if (textContent.includes('12.000')) pricePerKg = 12000;
    if (textContent.includes('20.000')) pricePerKg = 20000;

    const weight = parseInt(slider.value) || 5;
    const total = pricePerKg * weight;

    if (weightValDisplay) weightValDisplay.innerText = weight;
    if (sumService) sumService.innerText = selectedOpt.querySelector('h4').innerText;
    if (sumWeight) sumWeight.innerText = `${weight} Kg`;
    if (sumTotal) sumTotal.innerText = `Rp ${total.toLocaleString('id-ID')}`;
  }

  if (slider) {
    slider.addEventListener('input', updatePricing);
  }

  // Daftarkan click listener ke semua opsi layanan
  document.querySelectorAll('.service-option').forEach(opt => {
    opt.addEventListener('click', () => {
      document.querySelectorAll('.service-option').forEach(o => o.classList.remove('selected'));
      opt.classList.add('selected');
      updatePricing();
    });
  });

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      if (activeStepIdx < steps.length - 1) {
        steps[activeStepIdx].classList.remove('active');
        activeStepIdx++;
        steps[activeStepIdx].classList.add('active');
        if (backBtn) backBtn.style.visibility = 'visible';
        if (activeStepIdx === steps.length - 1 && nextBtn) {
          nextBtn.innerHTML = 'Konfirmasi Pemesanan';
        }
      } else {
        processBooking();
      }
    });
  }

  if (backBtn) {
    backBtn.addEventListener('click', () => {
      if (activeStepIdx > 0) {
        steps[activeStepIdx].classList.remove('active');
        activeStepIdx--;
        steps[activeStepIdx].classList.add('active');
        if (nextBtn) {
          nextBtn.innerHTML = 'Lanjut →';
        }
        if (activeStepIdx === 0) {
          backBtn.style.visibility = 'hidden';
        }
      }
    });
  }

  function processBooking() {
    const selectedOpt = document.querySelector('.service-option.selected');
    const serviceName = selectedOpt ? selectedOpt.querySelector('h4').innerText : "Cuci Kering";
    const weight = slider ? slider.value : 5;
    const inputNamaElem = document.getElementById('inputNama') || document.getElementById('custName');
    const custName = inputNamaElem ? inputNamaElem.value : 'Pelanggan Setia';
    
    const randomID = "WWZ-" + new Date().getFullYear() + "-" + Math.floor(1000 + Math.random() * 9000);
    
    // PERBAIKAN: Key diubah menjadi '_active_order' agar sinkron dengan HTML
    const activeOrderPayload = {
      orderID: randomID,
      service: serviceName,
      weight: currentWeight,
      customerName: custName,
      statusStep: 1
    };
    
    localStorage.setItem('_active_order', JSON.stringify(activeOrderPayload));

    const bookingOutput = document.getElementById('bookingCodeOutput');
    if (bookingOutput) bookingOutput.innerText = randomID;
    
    const modal = document.getElementById('successModal');
    if (modal) modal.classList.add('active');

    if (window.confetti) {
      confetti({
        particleCount: 150,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#7C3AED', '#F97316', '#FACC15']
      });
    }
  }

  updatePricing();
});