// Live Microphone Voice Command Engine (Web Speech Recognition API)
window.VoiceCommandEngine = (function() {
  let recognition = null;
  let isListening = false;

  function init() {
    const SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition;
    const micBtn = document.getElementById('btn-mic-voice-command');
    const statusText = document.getElementById('voice-status-indicator');

    if (!SpeechRec) {
      console.warn("SpeechRecognition API not available in this browser environment.");
      if (micBtn) {
        micBtn.title = "Voice recognition requires Chrome/Edge/Safari";
      }
      return;
    }

    recognition = new SpeechRec();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = function() {
      isListening = true;
      if (micBtn) {
        micBtn.classList.add('animate-pulse', 'border-red-500', 'bg-red-500/20');
        micBtn.classList.remove('border-cyan-500/40');
      }
      if (statusText) statusText.innerText = "Listening...";
      window.NexusVoice?.speak("Listening for voice command.");
    };

    recognition.onresult = function(event) {
      const transcript = event.results[0][0].transcript.toLowerCase().trim();
      console.log("Voice Command Recognized:", transcript);
      if (statusText) statusText.innerText = `Heard: "${transcript}"`;
      handleVoiceCommand(transcript);
    };

    recognition.onerror = function(event) {
      console.warn("Speech recognition notice:", event.error);
      stopListening();
    };

    recognition.onend = function() {
      stopListening();
    };

    if (micBtn) {
      micBtn.addEventListener('click', toggleListening);
    }
  }

  function toggleListening() {
    if (!recognition) {
      alert("Microphone voice recognition is supported on Chrome, Edge, and modern mobile browsers!");
      return;
    }
    if (isListening) {
      recognition.stop();
      stopListening();
    } else {
      // Set recognition language based on current i18n
      const curLang = window.I18n ? window.I18n.getLang() : 'en';
      recognition.lang = curLang === 'hi' ? 'hi-IN' : curLang === 'kn' ? 'kn-IN' : 'en-US';
      try {
        recognition.start();
      } catch (e) {
        console.warn("Recognition start notice:", e);
      }
    }
  }

  function stopListening() {
    isListening = false;
    const micBtn = document.getElementById('btn-mic-voice-command');
    const statusText = document.getElementById('voice-status-indicator');
    if (micBtn) {
      micBtn.classList.remove('animate-pulse', 'border-red-500', 'bg-red-500/20');
      micBtn.classList.add('border-cyan-500/40');
    }
    if (statusText) statusText.innerText = "";
  }

  function handleVoiceCommand(cmd) {
    // Navigation Keywords
    if (cmd.includes("agri") || cmd.includes("farm") || cmd.includes("crop") || cmd.includes("kheti") || cmd.includes("krishi")) {
      document.querySelector('[data-target="view-agri"]')?.click();
      window.NexusVoice?.speak("Navigating to AgriTech Deep Hub.");
    } else if (cmd.includes("drone") || cmd.includes("robot") || cmd.includes("flight") || cmd.includes("waypoint")) {
      document.querySelector('[data-target="view-drones"]')?.click();
      window.NexusVoice?.speak("Navigating to Aero-Swarm Robotics.");
    } else if (cmd.includes("city") || cmd.includes("weather") || cmd.includes("aqi") || cmd.includes("metropolis")) {
      document.querySelector('[data-target="view-city"]')?.click();
      window.NexusVoice?.speak("Navigating to Davangere Smart City.");
    } else if (cmd.includes("health") || cmd.includes("blood") || cmd.includes("hospital") || cmd.includes("emergency") || cmd.includes("doctor")) {
      document.querySelector('[data-target="view-health"]')?.click();
      window.NexusVoice?.speak("Navigating to HealthTech and Blood Bank.");
    } else if (cmd.includes("scada") || cmd.includes("industry") || cmd.includes("iot") || cmd.includes("boiler") || cmd.includes("gas")) {
      document.querySelector('[data-target="view-iot"]')?.click();
      window.NexusVoice?.speak("Navigating to Industrial SCADA Guard.");
    } else if (cmd.includes("ai") || cmd.includes("copilot") || cmd.includes("open") || cmd.includes("innovation") || cmd.includes("ask") || cmd.includes("question")) {
      document.querySelector('[data-target="view-open"]')?.click();
      window.NexusVoice?.speak("Navigating to Nexus AI Copilot.");
    } 
    // Language Switch Commands
    else if (cmd.includes("kannada") || cmd.includes("kannadadalli")) {
      const select = document.getElementById('global-lang-select');
      if (select) { select.value = 'kn'; select.dispatchEvent(new Event('change')); }
    } else if (cmd.includes("hindi") || cmd.includes("hindiyalli")) {
      const select = document.getElementById('global-lang-select');
      if (select) { select.value = 'hi'; select.dispatchEvent(new Event('change')); }
    } else if (cmd.includes("english")) {
      const select = document.getElementById('global-lang-select');
      if (select) { select.value = 'en'; select.dispatchEvent(new Event('change')); }
    } 
    // Action Commands
    else if (cmd.includes("drill") || cmd.includes("crisis")) {
      document.getElementById('btn-trigger-drill')?.click();
    } else if (cmd.includes("scan") || cmd.includes("analyze")) {
      document.getElementById('btn-scan-leaf')?.click();
    } 
    // Otherwise send query to AI Copilot
    else {
      if (window.OpenInnovationModule?.askCopilot) {
        document.querySelector('[data-target="view-open"]')?.click();
        window.OpenInnovationModule.askCopilot(cmd);
      }
    }
  }

  return { init, toggleListening };
})();
