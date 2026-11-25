// NEXUS-OMNI Master Application Controller
(function() {
  window.NexusVoice = {
    isMuted: false,
    lang: 'en-US',
    speak: function(text) {
      if (this.isMuted || !('speechSynthesis' in window)) return;
      try {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 1.05;
        utterance.pitch = 1.0;
        utterance.lang = this.lang || 'en-US';
        window.speechSynthesis.speak(utterance);
      } catch (e) {
        console.warn("Speech error:", e);
      }
    }
  };

  document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initGlobalClock();
    initPhoneModal();
    initMuteToggle();
    initLanguageSelector();
    initPWAInstall();

    initFloatingCopilot();

    if (window.VoiceCommandEngine) window.VoiceCommandEngine.init();
    if (window.DroneSwarmModule) window.DroneSwarmModule.init();
    if (window.AgriTechModule) window.AgriTechModule.init();
    if (window.SmartCityModule) window.SmartCityModule.init();
    if (window.HealthTechModule) window.HealthTechModule.init();
    if (window.IndustrialIoTModule) window.IndustrialIoTModule.init();
    if (window.OpenInnovationModule) window.OpenInnovationModule.init();
  });

  function initFloatingCopilot() {
    const floatingBtn = document.getElementById('btn-floating-copilot');
    if (floatingBtn) {
      floatingBtn.addEventListener('click', () => {
        const openTab = document.querySelector('[data-target="view-open"]');
        if (openTab) openTab.click();
        const input = document.getElementById('copilot-query-input');
        if (input) {
          setTimeout(() => {
            input.focus();
            input.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }, 150);
        }
      });
    }
  }

  function initLanguageSelector() {
    const langSelect = document.getElementById('global-lang-select');
    if (langSelect) {
      langSelect.addEventListener('change', (e) => {
        const lang = e.target.value;
        if (window.I18n) {
          window.I18n.setLanguage(lang);
        }
      });
    }
  }

  function initNavigation() {
    const desktopTabs = document.querySelectorAll('.track-tab');
    const mobileTabs = document.querySelectorAll('.mobile-nav-item');
    const views = document.querySelectorAll('.track-view');

    function switchView(targetViewId) {
      views.forEach(v => {
        v.style.display = (v.id === targetViewId) ? 'block' : 'none';
      });

      desktopTabs.forEach(t => {
        t.classList.toggle('active', t.getAttribute('data-target') === targetViewId);
      });

      mobileTabs.forEach(t => {
        t.classList.toggle('active', t.getAttribute('data-target') === targetViewId);
      });

      window.scrollTo({ top: 0, behavior: 'smooth' });

      setTimeout(() => {
        window.dispatchEvent(new Event('resize'));
      }, 100);
    }

    desktopTabs.forEach(t => {
      t.addEventListener('click', () => {
        const target = t.getAttribute('data-target');
        if (target) switchView(target);
      });
    });

    mobileTabs.forEach(t => {
      t.addEventListener('click', () => {
        const target = t.getAttribute('data-target');
        if (target) switchView(target);
      });
    });

    switchView('view-agri');
  }

  function initGlobalClock() {
    const clockEl = document.getElementById('global-clock');
    function updateTime() {
      if (clockEl) {
        const now = new Date();
        clockEl.innerText = now.toLocaleTimeString('en-US', { hour12: false }) + " IST";
      }
    }
    updateTime();
    setInterval(updateTime, 1000);
  }

  function initMuteToggle() {
    const muteBtn = document.getElementById('btn-toggle-sound');
    if (muteBtn) {
      muteBtn.addEventListener('click', () => {
        window.NexusVoice.isMuted = !window.NexusVoice.isMuted;
        const msg = window.NexusVoice.isMuted ? 
          (window.I18n ? window.I18n.get('audioMuted') : "🔇 Voice Muted") : 
          (window.I18n ? window.I18n.get('audioActive') : "🔊 Voice Audio Active");
        muteBtn.innerText = msg;
        muteBtn.style.color = window.NexusVoice.isMuted ? "#94A3B8" : "var(--accent-cyan)";
      });
    }
  }

  function initPhoneModal() {
    const openBtn = document.getElementById('btn-open-phone-modal');
    const closeBtn = document.getElementById('btn-close-phone-modal');
    const modal = document.getElementById('phone-access-modal');
    const qrContainer = document.getElementById('phone-qr-display');
    const urlDisplay = document.getElementById('phone-network-url');

    if (openBtn && modal) {
      openBtn.addEventListener('click', () => {
        modal.classList.add('active');
        const hostUrl = window.location.origin;
        if (urlDisplay) urlDisplay.innerText = hostUrl;

        if (qrContainer) {
          qrContainer.innerHTML = generateQRVisual(hostUrl);
        }
      });
    }

    if (closeBtn && modal) {
      closeBtn.addEventListener('click', () => {
        modal.classList.remove('active');
      });
    }

    if (modal) {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.classList.remove('active');
      });
    }
  }

  function initPWAInstall() {
    const installBtn = document.getElementById('btn-install-pwa');
    let deferredPrompt = null;

    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      deferredPrompt = e;
      if (installBtn) {
        installBtn.classList.remove('hidden');
        installBtn.style.display = 'inline-flex';
      }
    });

    if (installBtn) {
      installBtn.addEventListener('click', async () => {
        if (deferredPrompt) {
          deferredPrompt.prompt();
          const { outcome } = await deferredPrompt.userChoice;
          if (outcome === 'accepted') {
            installBtn.style.display = 'none';
          }
          deferredPrompt = null;
        } else {
          alert("📱 INNOVEX OS Mobile App Installation:\n\n• Android (Chrome): Tap browser menu (⋮) -> Select 'Install app' or 'Add to Home screen'\n• iPhone (Safari): Tap Share button (⎋) -> Scroll down & select 'Add to Home Screen'\n• Desktop (Chrome/Edge): Click install icon (⊕) on the right side of the URL bar");
        }
      });
    }

    window.addEventListener('appinstalled', () => {
      if (installBtn) installBtn.style.display = 'none';
    });
  }

  function generateQRVisual(text) {
    return `
      <div style="background:white; padding:16px; border-radius:12px; display:inline-block; box-shadow:0 0 20px rgba(0,240,255,0.3);">
        <img src="https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(text)}" 
             alt="QR Code" 
             style="width:180px; height:180px; display:block;"
             onerror="this.onerror=null; this.parentElement.innerHTML='<div style=\\'width:180px; height:180px; display:flex; align-items:center; justify-content:center; color:#0A0F1D; font-weight:700; text-align:center;\\'>SCAN ON LOCAL WI-FI:<br><br>${text}</div>';"/>
      </div>
    `;
  }
})();
