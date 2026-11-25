// HealthTech Module (Rapid Medical Drone Dispatch, Blood Donor Network, Snakebite ASV & Live ECG)
window.HealthTechModule = (function() {
  let isDispatchActive = false;
  let dispatchTimer = null;
  let cprInterval = null;
  let isCprActive = false;
  let ecgAnimId = null;

  // Davangere Local Blood Donors Registry
  const bloodDonors = [
    { name: "Kishan N. (BIET Campus)", group: "O-Negative", dist: "1.2 km", phone: "+91 97409-XXXXX", status: "Available Now" },
    { name: "Dr. Rohith Ram (PB Road)", group: "O-Negative", dist: "2.1 km", phone: "+91 93802-XXXXX", status: "Available Now" },
    { name: "Meghana S. (Davangere City)", group: "B-Positive", dist: "3.4 km", phone: "+91 63638-XXXXX", status: "Available" },
    { name: "Goutham G. (Shamanur)", group: "A-Positive", dist: "1.8 km", phone: "+91 78922-XXXXX", status: "Available" },
    { name: "Haripriya K. (Medical College)", group: "AB-Positive", dist: "0.9 km", phone: "+91 63611-XXXXX", status: "Available Now" }
  ];

  function init() {
    initDispatchControls();
    initSosControls();
    initCprCoach();
    initBloodDonorRegistry();
    initSnakebiteProtocol();
    initECGMonitor();
  }

  function initDispatchControls() {
    const dispatchBtn = document.getElementById('btn-dispatch-medical');
    if (dispatchBtn) dispatchBtn.addEventListener('click', startMedicalDispatch);
  }

  function startMedicalDispatch() {
    if (isDispatchActive) return;

    const payloadSelect = document.getElementById('medical-payload-select');
    const targetSelect = document.getElementById('medical-target-select');
    const statusBox = document.getElementById('medical-dispatch-status');
    const progressBar = document.getElementById('medical-progress-bar');
    const btn = document.getElementById('btn-dispatch-medical');

    const payload = payloadSelect ? payloadSelect.value : "O-Negative Blood Units";
    const target = targetSelect ? targetSelect.value : "BIET Emergency Room";

    isDispatchActive = true;
    btn.innerText = "MED-DRONE IN TRANSIT...";
    btn.className = "btn-cyber btn-crimson";

    if (statusBox) statusBox.style.display = "block";

    window.NexusVoice?.speak(`Emergency Medical Drone Med-Flight 1 dispatched. Payload: ${payload}. Navigating to ${target}.`);

    let progress = 0;
    const totalSeconds = 12;
    let remaining = totalSeconds;

    if (dispatchTimer) clearInterval(dispatchTimer);

    dispatchTimer = setInterval(() => {
      progress += (100 / totalSeconds);
      remaining--;

      if (progressBar) progressBar.style.width = `${Math.min(100, progress)}%`;

      const etaEl = document.getElementById('med-flight-eta');
      const altEl = document.getElementById('med-flight-alt');
      const spdEl = document.getElementById('med-flight-spd');

      if (etaEl) etaEl.innerText = `${Math.max(0, remaining)}s (ETA: 4 min ground equivalent)`;
      if (altEl) altEl.innerText = `${(75 + Math.random() * 5).toFixed(1)} m`;
      if (spdEl) spdEl.innerText = `68.4 km/h`;

      if (progress >= 100 || remaining <= 0) {
        clearInterval(dispatchTimer);
        isDispatchActive = false;
        btn.innerText = "PAYLOAD DELIVERED • READY FOR NEXT DISPATCH";
        btn.className = "btn-cyber btn-emerald";
        if (etaEl) etaEl.innerText = "DELIVERED AT DROP ZONE";
        window.NexusVoice?.speak(`Medical payload successfully air-dropped at ${target}. Patient care transfer confirmed.`);
      }
    }, 1000);
  }

  function initBloodDonorRegistry() {
    const container = document.getElementById('blood-donors-container');
    const filterSelect = document.getElementById('blood-group-filter');

    function renderDonors(groupFilter) {
      if (!container) return;
      const filtered = groupFilter && groupFilter !== "ALL" 
        ? bloodDonors.filter(d => d.group.toLowerCase().includes(groupFilter.toLowerCase()))
        : bloodDonors;

      container.innerHTML = filtered.map(d => `
        <div style="display:flex; justify-content:space-between; align-items:center; background:rgba(255,255,255,0.03); border-left:3px solid #EF4444; padding:8px 12px; border-radius:6px; margin-bottom:6px; font-size:0.78rem;">
          <div>
            <div style="font-weight:700; color:#F1F5F9;">${d.name}</div>
            <div style="font-size:0.7rem; color:#94A3B8;">Distance: ${d.dist} • ${d.status}</div>
          </div>
          <div style="text-align:right;">
            <span style="background:rgba(239,68,68,0.2); border:1px solid #EF4444; color:#EF4444; padding:2px 8px; border-radius:4px; font-weight:800; font-family:var(--font-mono); font-size:0.75rem;">
              ${d.group}
            </span>
            <button onclick="alert('Calling donor: ${d.phone} (Emergency Alert Dispatched)');" style="display:block; margin-top:4px; font-size:0.68rem; color:#00F0FF; background:none; border:none; cursor:pointer; text-decoration:underline;">
              🚨 Request Blood
            </button>
          </div>
        </div>
      `).join('');
    }

    if (filterSelect) {
      filterSelect.addEventListener('change', (e) => {
        renderDonors(e.target.value);
      });
    }

    renderDonors("ALL");
  }

  function initSnakebiteProtocol() {
    const calcBtn = document.getElementById('btn-calc-asv');
    if (calcBtn) {
      calcBtn.addEventListener('click', () => {
        const species = document.getElementById('snake-species')?.value || "Russell's Viper";
        const clottingClot = document.getElementById('snake-wbct')?.value === "No";

        const outputEl = document.getElementById('snakebite-output');
        if (outputEl) {
          outputEl.style.display = 'block';
          outputEl.innerHTML = `
            <div style="background:rgba(239,68,68,0.1); border:1px solid rgba(239,68,68,0.4); padding:10px; border-radius:8px; font-size:0.8rem; color:#FEE2E2;">
              <strong style="color:#EF4444;">🏥 Clinical ASV Protocol for ${species}:</strong><br>
              • Initial Dose: <strong>10 Vials Polyvalent ASV (Anti-Snake Venom)</strong><br>
              • Administration: Infuse in 500 ml Normal Saline over 60 minutes.<br>
              • 20WBCT Clotting Status: ${clottingClot ? '<span style="color:#EF4444; font-weight:bold;">Non-Clotting (Systemic Envenomation Active)</span>' : '<span style="color:#10B981; font-weight:bold;">Normal Clotting (Monitor 6 Hours)</span>'}<br>
              • Anaphylaxis Premedication: Keep Inj. Adrenaline (1:1000) 0.5ml IM on standby.
            </div>
          `;
        }

        window.NexusVoice?.speak(`Karnataka ASV protocol calculated: 10 vials polyvalent antivenom indicated for ${species} envenomation.`);
      });
    }
  }

  function initECGMonitor() {
    const canvas = document.getElementById('ecg-monitor-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let x = 0;
    let prevY = canvas.height / 2;

    // Draw dark grid background
    function drawECGGrid() {
      ctx.fillStyle = "#050811";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.strokeStyle = "rgba(16, 185, 129, 0.1)";
      ctx.lineWidth = 1;
      for (let i = 0; i < canvas.width; i += 20) {
        ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, canvas.height); ctx.stroke();
      }
      for (let j = 0; j < canvas.height; j += 20) {
        ctx.beginPath(); ctx.moveTo(0, j); ctx.lineTo(canvas.width, j); ctx.stroke();
      }
    }

    drawECGGrid();

    // Standard Lead-II P-Q-R-S-T cardiac cycle generator
    function getECGVoltage(t) {
      const cycle = t % 100;
      if (cycle > 15 && cycle < 25) return -Math.sin((cycle - 15) * Math.PI / 10) * 12; // P-wave
      if (cycle === 38) return 8; // Q-dip
      if (cycle === 42) return -70; // R-peak spike!
      if (cycle === 46) return 18; // S-dip
      if (cycle > 55 && cycle < 75) return -Math.sin((cycle - 55) * Math.PI / 20) * 18; // T-wave
      return 0; // Isoelectric baseline
    }

    let t = 0;
    function renderECG() {
      t += 1.5;
      const baseline = canvas.height / 2;
      const y = baseline + getECGVoltage(t);

      // Fade trail ahead of sweep
      ctx.fillStyle = "rgba(5, 8, 17, 0.25)";
      ctx.fillRect(x + 1, 0, 15, canvas.height);

      ctx.strokeStyle = "#10B981";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(x === 0 ? 0 : x - 2, prevY);
      ctx.lineTo(x, y);
      ctx.stroke();

      prevY = y;
      x += 2;
      if (x >= canvas.width) {
        x = 0;
        prevY = baseline;
      }

      ecgAnimId = requestAnimationFrame(renderECG);
    }

    renderECG();
  }

  function initSosControls() {
    const sosBtn = document.getElementById('btn-citizen-sos');
    if (sosBtn) {
      sosBtn.addEventListener('click', () => {
        if ('geolocation' in navigator) {
          navigator.geolocation.getCurrentPosition(pos => {
            const lat = pos.coords.latitude.toFixed(4);
            const lng = pos.coords.longitude.toFixed(4);
            alert(`🚨 SOS BEACON TRANSMITTED!\nCoordinates: ${lat} N, ${lng} E\nAlert dispatched to Davangere District Trauma Control.`);
            window.NexusVoice?.speak("Emergency SOS distress beacon transmitted. Medical emergency response dispatched to your smartphone GPS location.");
          }, err => {
            alert("🚨 SOS BEACON BROADCASTED to Davangere Emergency Services (BIET Campus Sector).");
            window.NexusVoice?.speak("Emergency SOS distress beacon transmitted to Davangere central dispatch.");
          });
        }
      });
    }
  }

  function initCprCoach() {
    const cprBtn = document.getElementById('btn-cpr-metronome');
    const cprIndicator = document.getElementById('cpr-indicator');

    if (cprBtn) {
      cprBtn.addEventListener('click', () => {
        isCprActive = !isCprActive;

        if (isCprActive) {
          cprBtn.innerText = "⏹️ STOP CPR METRONOME";
          cprBtn.className = "btn-cyber btn-crimson text-xs";
          window.NexusVoice?.speak("CPR Metronome started. 110 beats per minute. Push hard and fast in the center of the chest. Allow chest to fully recoil.");

          let beat = false;
          cprInterval = setInterval(() => {
            beat = !beat;
            if (cprIndicator) {
              cprIndicator.style.background = beat ? "#EF4444" : "#10B981";
              cprIndicator.style.transform = beat ? "scale(1.2)" : "scale(1)";
            }
          }, 545);
        } else {
          cprBtn.innerText = "🎵 START CPR AUDIO COACH (110 BPM)";
          cprBtn.className = "btn-cyber btn-emerald text-xs";
          if (cprInterval) clearInterval(cprInterval);
          if (cprIndicator) {
            cprIndicator.style.background = "#3B82F6";
            cprIndicator.style.transform = "scale(1)";
          }
          window.NexusVoice?.speak("CPR metronome deactivated.");
        }
      });
    }
  }

  return { init, startMedicalDispatch };
})();
