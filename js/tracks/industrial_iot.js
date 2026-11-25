// Industrial IoT Module (Cyber-Physical SCADA Guard & Predictive RUL Engine)
window.IndustrialIoTModule = (function() {
  let isInterlockTripped = false;
  let canvasAnimId = null;

  function init() {
    initControls();
    initFFTSpectrum();
  }

  function initControls() {
    const tripBtn = document.getElementById('btn-trip-gas-leak');
    const resetBtn = document.getElementById('btn-reset-scada');
    const pressureSlider = document.getElementById('slider-boiler-pressure');

    if (tripBtn) tripBtn.addEventListener('click', simulateGasSurge);
    if (resetBtn) resetBtn.addEventListener('click', resetInterlock);

    if (pressureSlider) {
      pressureSlider.addEventListener('input', (e) => {
        const val = e.target.value;
        const disp = document.getElementById('scada-pressure-val');
        if (disp) disp.innerText = `${val} PSI`;
      });
    }
  }

  function simulateGasSurge() {
    isInterlockTripped = true;
    const gasVal = document.getElementById('scada-gas-val');
    const banner = document.getElementById('scada-alarm-banner');
    const valveStatus = document.getElementById('scada-valve-status');
    const rulVal = document.getElementById('scada-rul-val');

    if (gasVal) {
      gasVal.innerText = "84.2 ppm (LETHAL)";
      gasVal.style.color = "#EF4444";
    }

    if (banner) banner.style.display = "block";
    if (valveStatus) {
      valveStatus.innerText = "EMERGENCY ISOLATED (AUTO-SHUT)";
      valveStatus.style.color = "#EF4444";
    }

    if (rulVal) {
      rulVal.innerText = "42 Hours (CRITICAL)";
      rulVal.style.color = "#EF4444";
    }

    window.NexusVoice?.speak("Critical Industrial Safety Alarm. Toxic gas concentration surge detected. Automated physical isolation interlock engaged.");
    window.OpenInnovationModule?.logCrossDomainEvent("Industrial Sector 3 Ammonia surge (84 ppm) -> Emergency Drone dispatched for perimeter thermal scan.");
  }

  function resetInterlock() {
    isInterlockTripped = false;
    const gasVal = document.getElementById('scada-gas-val');
    const banner = document.getElementById('scada-alarm-banner');
    const valveStatus = document.getElementById('scada-valve-status');
    const rulVal = document.getElementById('scada-rul-val');

    if (gasVal) {
      gasVal.innerText = "12.4 ppm (Safe)";
      gasVal.style.color = "#10B981";
    }
    if (banner) banner.style.display = "none";
    if (valveStatus) {
      valveStatus.innerText = "VALVE OPEN • NOMINAL FLOW";
      valveStatus.style.color = "#10B981";
    }
    if (rulVal) {
      rulVal.innerText = "2,480 Hours (Nominal)";
      rulVal.style.color = "#10B981";
    }

    window.NexusVoice?.speak("Industrial SCADA safety interlock reset. Atmospheric sensors normalized.");
  }

  function initFFTSpectrum() {
    const canvas = document.getElementById('scada-fft-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let offset = 0;

    function renderFFT() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "#070D1A";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.strokeStyle = "rgba(0, 240, 255, 0.1)";
      ctx.lineWidth = 1;
      for (let y = 20; y < canvas.height; y += 25) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(canvas.width, y); ctx.stroke();
      }

      const numBars = 36;
      const barWidth = canvas.width / numBars - 2;
      offset += 0.05;

      for (let i = 0; i < numBars; i++) {
        let height = Math.abs(Math.sin(i * 0.3 + offset)) * (canvas.height * 0.5) + 10;

        if (isInterlockTripped && (i === 14 || i === 15)) {
          height = canvas.height * 0.88;
        }

        const x = i * (barWidth + 2);
        const y = canvas.height - height;

        const isHazard = isInterlockTripped && (i === 14 || i === 15);
        ctx.fillStyle = isHazard ? "#EF4444" : (i % 2 === 0 ? "#00F0FF" : "#10B981");
        ctx.fillRect(x, y, barWidth, height);
      }

      ctx.fillStyle = "#94A3B8";
      ctx.font = "10px monospace";
      ctx.fillText("0 Hz", 6, canvas.height - 6);
      ctx.fillText("FFT SPECTRUM (1.2 kHz - 4.8 kHz Bearing Velocity)", canvas.width / 4, 16);
      ctx.fillText("5 kHz", canvas.width - 35, canvas.height - 6);

      canvasAnimId = requestAnimationFrame(renderFFT);
    }

    renderFFT();
  }

  return { init, simulateGasSurge, resetInterlock };
})();
