// Drone Swarm & Robotics Module (Robotics & Drones Track)
window.DroneSwarmModule = (function() {
  let map = null;
  let droneMarker = null;
  let waypoints = [];
  let pathPolyline = null;
  let flightInterval = null;
  let isFlying = false;
  let isThermalMode = false;
  let selectedDrone = "Alpha";

  const BIET_COORDS = [14.4644, 75.9218];

  function init() {
    initMap();
    initControls();
    initVideoHUD();
  }

  function initMap() {
    const mapContainer = document.getElementById('drone-map');
    if (!mapContainer) return;

    try {
      if (typeof L !== 'undefined') {
        map = L.map('drone-map', {
          zoomControl: true,
          attributionControl: false
        }).setView(BIET_COORDS, 15);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: 19
        }).addTo(map);

        const droneIcon = L.divIcon({
          className: 'custom-drone-icon',
          html: `<div style="background: rgba(0,240,255,0.2); border: 2px solid #00F0FF; border-radius: 50%; width: 36px; height: 36px; display: flex; align-items: center; justify-content: center; box-shadow: 0 0 15px #00F0FF; animation: pulse-dot 1.5s infinite;">
                   <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#00F0FF" stroke-width="2"><path d="M12 2v20M2 12h20M7 7l10 10M17 7L7 17"/></svg>
                 </div>`,
          iconSize: [36, 36],
          iconAnchor: [18, 18]
        });

        droneMarker = L.marker(BIET_COORDS, { icon: droneIcon }).addTo(map);
        droneMarker.bindPopup(`<b>NEXUS-DRONE ALPHA</b><br>Station: BIET Davangere Swarm Pad<br>Status: Ready for Dispatch`);

        map.on('click', function(e) {
          addWaypoint(e.latlng.lat, e.latlng.lng);
        });

        addWaypoint(14.4644, 75.9218, "BIET Base Pad");
        addWaypoint(14.4680, 75.9260, "Agri Sector Alpha");
        addWaypoint(14.4610, 75.9290, "Urban Health Clinic");
        addWaypoint(14.4590, 75.9210, "Industrial Sector Gate");

      } else {
        renderFallbackMap(mapContainer);
      }
    } catch (e) {
      console.warn("Leaflet map init notice:", e);
      renderFallbackMap(mapContainer);
    }
  }

  function renderFallbackMap(container) {
    container.innerHTML = `
      <div style="width:100%; height:100%; background: #070B14; display:flex; flex-direction:column; align-items:center; justify-content:center; border: 1px dashed var(--accent-cyan); border-radius:8px; padding:20px; text-align:center;">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#00F0FF" stroke-width="1.5"><polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21"/><line x1="9" y1="3" x2="9" y2="18"/><line x1="15" y1="6" x2="15" y2="21"/></svg>
        <p style="color:#00F0FF; font-weight:700; margin-top:8px;">TACTICAL GIS ENGINE ACTIVE</p>
        <p style="font-size:0.8rem; color:#94A3B8;">BIET Davangere Coordinates: 14.4644° N, 75.9218° E</p>
        <div style="margin-top:12px; font-size:0.75rem; color:#10B981;">[GPS Link Locked • 12 Satellites • Haversine Telemetry Online]</div>
      </div>
    `;
  }

  function addWaypoint(lat, lng, name) {
    const wpNum = waypoints.length + 1;
    const wpName = name || `WP-${wpNum}`;
    const wp = { lat, lng, name: wpName };
    waypoints.push(wp);

    if (map && typeof L !== 'undefined') {
      const wpIcon = L.divIcon({
        className: 'wp-icon',
        html: `<div style="background:#0F172A; border:1px solid #10B981; color:#10B981; border-radius:4px; font-size:10px; font-weight:700; padding:2px 4px; text-align:center;">${wpName}</div>`,
        iconSize: [45, 20]
      });
      L.marker([lat, lng], { icon: wpIcon }).addTo(map);
      updatePathPolyline();
    }

    updateWaypointListUI();
    calculateTotalDistance();
  }

  function updatePathPolyline() {
    if (!map || typeof L === 'undefined') return;
    if (pathPolyline) map.removeLayer(pathPolyline);

    const latlngs = waypoints.map(w => [w.lat, w.lng]);
    pathPolyline = L.polyline(latlngs, {
      color: '#00F0FF',
      weight: 3,
      opacity: 0.8,
      dashArray: '6, 8'
    }).addTo(map);
  }

  function calculateTotalDistance() {
    let totalKm = 0;
    for (let i = 0; i < waypoints.length - 1; i++) {
      totalKm += haversineDistance(waypoints[i].lat, waypoints[i].lng, waypoints[i+1].lat, waypoints[i+1].lng);
    }
    const distEl = document.getElementById('drone-mission-distance');
    const etaEl = document.getElementById('drone-mission-eta');
    if (distEl) distEl.innerText = `${totalKm.toFixed(2)} km`;
    if (etaEl) {
      const minutes = (totalKm / 45) * 60;
      etaEl.innerText = `${Math.ceil(minutes)} min`;
    }
  }

  function haversineDistance(lat1, lon1, lat2, lon2) {
    const R = 6371;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  }

  function updateWaypointListUI() {
    const listEl = document.getElementById('waypoint-list');
    if (!listEl) return;
    listEl.innerHTML = waypoints.map((w, i) => `
      <div style="display:flex; justify-content:space-between; align-items:center; background:rgba(255,255,255,0.03); padding:6px 10px; border-radius:6px; font-size:0.78rem; border-left:3px solid var(--accent-cyan); margin-bottom:4px;">
        <span style="font-weight:700; color:#E2E8F0;">${w.name}</span>
        <span style="font-family:var(--font-mono); color:#94A3B8;">${w.lat.toFixed(4)}, ${w.lng.toFixed(4)}</span>
      </div>
    `).join('');
  }

  function launchMission() {
    if (isFlying) return;
    if (waypoints.length < 2) {
      alert("Please add at least 2 waypoints by tapping the map.");
      return;
    }

    isFlying = true;
    const btn = document.getElementById('btn-launch-drone');
    if (btn) {
      btn.innerText = "MISSION IN FLIGHT...";
      btn.classList.remove('btn-cyan');
      btn.classList.add('btn-crimson');
    }

    let currentWpIndex = 0;
    let step = 0;
    const totalSteps = 40;

    window.NexusVoice?.speak(`Autonomous Drone ${selectedDrone} mission engaged. Navigating to Agri Sector.`);

    if (flightInterval) clearInterval(flightInterval);

    flightInterval = setInterval(() => {
      if (currentWpIndex >= waypoints.length - 1) {
        clearInterval(flightInterval);
        isFlying = false;
        if (btn) {
          btn.innerText = "MISSION COMPLETED (RTH)";
          btn.classList.remove('btn-crimson');
          btn.classList.add('btn-cyan');
        }
        window.NexusVoice?.speak("Drone Mission successfully completed. Autonomous Return to Home initiated.");
        return;
      }

      const p1 = waypoints[currentWpIndex];
      const p2 = waypoints[currentWpIndex + 1];

      step++;
      const fraction = step / totalSteps;
      const curLat = p1.lat + (p2.lat - p1.lat) * fraction;
      const curLng = p1.lng + (p2.lng - p1.lng) * fraction;

      if (droneMarker && map) {
        droneMarker.setLatLng([curLat, curLng]);
      }

      const alt = 60 + Math.sin(step) * 12;
      const spd = 42 + Math.cos(step) * 5;
      const batt = Math.max(20, 98 - Math.floor((currentWpIndex * 40 + step) / 4));

      document.getElementById('telemetry-alt').innerText = `${alt.toFixed(1)} m`;
      document.getElementById('telemetry-speed').innerText = `${spd.toFixed(1)} km/h`;
      document.getElementById('telemetry-batt').innerText = `${batt}%`;

      if (step >= totalSteps) {
        step = 0;
        currentWpIndex++;
      }
    }, 150);
  }

  function triggerRTL() {
    if (flightInterval) clearInterval(flightInterval);
    isFlying = false;
    if (droneMarker && map) {
      droneMarker.setLatLng(BIET_COORDS);
      map.setView(BIET_COORDS, 16);
    }
    const btn = document.getElementById('btn-launch-drone');
    if (btn) {
      btn.innerText = "STANDBY AT BIET PAD";
      btn.className = "btn-cyber btn-cyan";
    }
    window.NexusVoice?.speak("Emergency Return to Launch engaged. Drone safely landed at BIET Davangere Pad.");
  }

  function initVideoHUD() {
    const canvas = document.getElementById('drone-vision-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let angle = 0;

    function renderHUD() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (isThermalMode) {
        // FLIR Thermal Ironbow False-Color palette
        const grad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
        grad.addColorStop(0, '#020024');
        grad.addColorStop(0.5, '#790979');
        grad.addColorStop(1, '#ff6a00');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Thermal heat spots
        ctx.fillStyle = "#FFFFFF";
        ctx.beginPath();
        ctx.arc(canvas.width * 0.45, canvas.height * 0.5, 25, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = "#FF0000";
        ctx.font = "10px monospace";
        ctx.fillText("[HEAT SIGNATURE: 38.6°C]", canvas.width * 0.45 - 50, canvas.height * 0.5 - 32);

      } else {
        // Standard Optical Recon Feed
        ctx.fillStyle = "#060A14";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.strokeStyle = "rgba(0, 240, 255, 0.15)";
        ctx.lineWidth = 1;
        for (let x = 0; x < canvas.width; x += 40) {
          ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, canvas.height); ctx.stroke();
        }
        for (let y = 0; y < canvas.height; y += 40) {
          ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(canvas.width, y); ctx.stroke();
        }

        ctx.strokeStyle = "#10B981";
        ctx.lineWidth = 2;
        ctx.strokeRect(canvas.width * 0.25, canvas.height * 0.35, 90, 60);
        ctx.fillStyle = "#10B981";
        ctx.font = "10px monospace";
        ctx.fillText("[CROP BLIGHT: 92%]", canvas.width * 0.25, canvas.height * 0.35 - 5);

        ctx.strokeStyle = "#00F0FF";
        ctx.strokeRect(canvas.width * 0.65, canvas.height * 0.5, 70, 50);
        ctx.fillStyle = "#00F0FF";
        ctx.fillText("[CIVILIAN ASSET]", canvas.width * 0.65, canvas.height * 0.5 - 5);
      }

      angle += 0.02;
      ctx.save();
      ctx.translate(canvas.width / 2, canvas.height / 2);
      ctx.rotate(angle);
      ctx.strokeStyle = isThermalMode ? "rgba(255, 255, 255, 0.6)" : "rgba(0, 240, 255, 0.4)";
      ctx.beginPath();
      ctx.arc(0, 0, 35, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();

      requestAnimationFrame(renderHUD);
    }
    renderHUD();
  }

  function initControls() {
    const launchBtn = document.getElementById('btn-launch-drone');
    if (launchBtn) launchBtn.addEventListener('click', launchMission);

    const rtlBtn = document.getElementById('btn-drone-rtl');
    if (rtlBtn) rtlBtn.addEventListener('click', triggerRTL);

    const clearWpBtn = document.getElementById('btn-clear-wps');
    if (clearWpBtn) {
      clearWpBtn.addEventListener('click', () => {
        waypoints = [];
        if (pathPolyline && map) map.removeLayer(pathPolyline);
        updateWaypointListUI();
        calculateTotalDistance();
      });
    }

    const liveGpsBtn = document.getElementById('btn-drone-live-gps');
    if (liveGpsBtn) {
      liveGpsBtn.addEventListener('click', () => {
        if ('geolocation' in navigator) {
          navigator.geolocation.getCurrentPosition(pos => {
            const lat = pos.coords.latitude;
            const lng = pos.coords.longitude;
            addWaypoint(lat, lng, "My Live Phone GPS");
            if (map) map.setView([lat, lng], 16);
            window.NexusVoice?.speak("Live smartphone coordinates acquired and synced to drone route.");
          }, err => {
            alert("Location access denied or unavailable. Using Davangere BIET coordinates.");
          });
        }
      });
    }

    // Thermal Vision Mode Toggle
    const thermalBtn = document.getElementById('btn-toggle-thermal');
    if (thermalBtn) {
      thermalBtn.addEventListener('click', () => {
        isThermalMode = !isThermalMode;
        thermalBtn.innerText = isThermalMode ? "🔥 FLIR THERMAL ACTIVE" : "👁️ OPTICAL RGB RECON";
        thermalBtn.className = isThermalMode ? "btn-cyber btn-crimson text-xs" : "btn-cyber btn-outline text-xs";
        window.NexusVoice?.speak(isThermalMode ? "FLIR Thermal infrared vision mode enabled." : "Optical RGB daylight reconnaissance restored.");
      });
    }

    // Swarm Fleet Selector
    const fleetSelect = document.getElementById('drone-fleet-select');
    if (fleetSelect) {
      fleetSelect.addEventListener('change', (e) => {
        selectedDrone = e.target.value;
        window.NexusVoice?.speak(`Swarm UAV reassigned to Drone ${selectedDrone}.`);
      });
    }
  }

  return { init, addWaypoint, launchMission, triggerRTL };
})();
