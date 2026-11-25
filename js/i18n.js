// Trilingual Internationalization Engine (English, Hindi, Kannada)
window.I18n = (function() {
  let currentLang = 'en';

  const translations = {
    en: {
      appName: "INNOVEX OS",
      tagline: "",
      openPhone: "📱 Open on Phone",
      audioActive: "🔊 Voice Audio Active",
      audioMuted: "🔇 Voice Muted",
      navAgri: "🌾 1. AgriTech Deep Hub",
      navHealth: "🏥 2. HealthTech & Blood Bank",
      navCity: "🏙️ 3. Smart City & Scam Sentinel",
      navDrones: "🛸 4. Robotics & Drones",
      navIot: "🏭 5. Industrial IoT SCADA",
      navOpen: "🤖 6. AI Copilot & Open Innovation",
      
      // Drones
      droneTitle: "Aero-Swarm Autonomous Command & Tactical GIS",
      droneDesc: "Interactive OpenStreetMap GPS mission routing, real-time Haversine distance math, FLIR thermal mode & aerial telemetry.",
      launchMission: "🚀 LAUNCH AUTONOMOUS MISSION",
      usePhoneGps: "📍 Use My Phone GPS",
      clearWaypoints: "Clear Waypoints",
      altitude: "Flight Altitude",
      airSpeed: "Air Speed",
      swarmBattery: "Swarm Battery",
      missionDist: "Mission Distance",

      // AgriTech
      agriTitle: "Terra-Agri Deep Agronomy: Vision AI, APMC Arbitrage & Jeevamrutha Engine",
      agriDesc: "In-browser Computer Vision leaf diagnosis, Karnataka APMC Mandi arbitrage, Jeevamrutha bio-fertilizer calculator & pest radar.",
      startCamera: "📷 Start Camera",
      stopCamera: "⏹️ Stop Camera",
      analyzeLeaf: "🔍 Analyze Leaf",
      loadSample: "🧪 Load Diseased Sample",
      uploadPhoto: "📁 Upload Photo",
      mandiRates: "KARNATAKA APMC MANDI PRICE ARBITRAGE (DAVANGERE vs SHIMOGA vs HUBLI)",
      soilCalc: "ORGANIC JEEVAMRUTHA & BIO-FORMULATION RECIPE CALCULATOR",
      calculateFert: "CALCULATE 100% ORGANIC RECIPE",

      // Smart City
      cityTitle: "Davangere Metropolis Digital Twin & Open-Meteo Satellite Feed",
      cityDesc: "Real-time live weather & air quality telemetry fetched directly from Open-Meteo satellites for Davangere coordinates.",
      refreshWeather: "🔄 Sync Live Satellites",
      activateGreenCorridor: "ACTIVATE EMERGENCY GREEN CORRIDOR",
      deactivateGreenCorridor: "DEACTIVATE GREEN CORRIDOR",

      // HealthTech
      healthTitle: "Bio-Pulse Emergency Triage, Blood Donor Network & Snakebite ASV",
      healthDesc: "Community Blood Donor radius matching, Karnataka Snakebite ASV clinical protocol, live ECG monitor & emergency medical drone.",
      dispatchDrone: "🚨 1-TAP DISPATCH MEDICAL DRONE",
      emergencySos: "🆘 CITIZEN SOS PANIC BEACON",
      cprMetronome: "START CPR AUDIO METRONOME (110 BPM)",
      bloodMatch: "DAVANGERE COMMUNITY BLOOD DONOR GEO-LOCATOR",
      snakebiteTitle: "KARNATAKA BIG-FOUR SNAKEBITE ANTIVENOM (ASV) PROTOCOL",

      // Industrial IoT
      iotTitle: "Cyber-Physical SCADA Guard & Vibration FFT Analysis",
      iotDesc: "High-concurrency telemetry, Fourier spectrum vibration monitoring, and automated physical interlocks for toxic gas leaks.",
      tripGas: "⚠️ SIMULATE TOXIC GAS SURGE",
      resetScada: "Reset SCADA",

      // Open Innovation
      openTitle: "Cross-Domain Swarm Orchestrator & Nexus AI Copilot",
      openDesc: "Autonomous multi-agent protocol generator, Web Speech voice synthesis & citizen crowdsourced hazard mesh."
    },

    hi: {
      appName: "INNOVEX OS",
      tagline: "",
      openPhone: "📱 फोन पर खोलें",
      audioActive: "🔊 आवाज सक्रिय",
      audioMuted: "🔇 आवाज बंद",
      navAgri: "🌾 1. एग्री-टेक कृषि हब",
      navHealth: "🏥 2. हेल्थ-टेक एवं रक्त बैंक",
      navCity: "🏙️ 3. स्मार्ट सिटी & स्कैम सेंटिनल",
      navDrones: "🛸 4. रोबोटिक्स एवं ड्रोन",
      navIot: "🏭 5. इंडस्ट्रियल IoT स्काडा",
      navOpen: "🤖 6. AI कोपायलट & ओपन इनोवेशन",

      // Drones
      droneTitle: "एयरो-स्वाम स्वायत्त कमांड एवं जीआईएस (GIS)",
      droneDesc: "ओपनस्ट्रीटमैप लाइव जीपीएस मिशन रूटिंग, हैवरसाइन दूरी गणना, FLIR थर्मल दृष्टि एवं एरियल टेलीमेट्री।",
      launchMission: "🚀 स्वायत्त मिशन शुरू करें",
      usePhoneGps: "📍 फोन का GPS उपयोग करें",
      clearWaypoints: "वेपॉइंट्स हटाएं",
      altitude: "उड़ान ऊंचाई",
      airSpeed: "वायु गति",
      swarmBattery: "ड्रोन बैटरी",
      missionDist: "मिशन दूरी",

      // AgriTech
      agriTitle: "टेरा-एग्री आधुनिक कृषि हब: जीवामृत कैलकुलेटर एवं मंडी तुलना",
      agriDesc: "ब्राउज़र आधारित कैमरा रोग निदान, कर्नाटक एपीएमसी मंडी तुलना, प्राकृतिक जीवामृत फार्मूला एवं कीट रडार।",
      startCamera: "📷 कैमरा शुरू करें",
      stopCamera: "⏹️ कैमरा बंद करें",
      analyzeLeaf: "🔍 पत्ती की जांच करें",
      loadSample: "🧪 रोग ग्रस्त पत्ती लोड करें",
      uploadPhoto: "📁 फोटो अपलोड करें",
      mandiRates: "कर्नाटक एपीएमसी मंडी भाव तुलना (दावणगेरे बनाम शिमोगा बनाम हुबली)",
      soilCalc: "प्राकृतिक जीवामृत एवं जैविक पोषण निर्माण कैलकुलेटर",
      calculateFert: "100% जैविक जीवामृत की गणना करें",

      // Smart City
      cityTitle: "दावणगेरे महानगर डिजिटल ट्विन एवं सैटेलाइट मौसम",
      cityDesc: "ओपन-मेटियो उपग्रहों से दावणगेरे के लिए वास्तविक समय का मौसम, हवा की गुणवत्ता (AQI) और ग्रीन कॉरिडोर।",
      refreshWeather: "🔄 सैटेलाइट डेटा ताज़ा करें",
      activateGreenCorridor: "आपातकालीन ग्रीन कॉरिडोर चालू करें",
      deactivateGreenCorridor: "ग्रीन कॉरिडोर बंद करें",

      // HealthTech
      healthTitle: "बायो-पल्स आपातकालीन ट्राइएज, रक्तदाता नेटवर्क एवं सर्पदंश एएसवी",
      healthDesc: "सामुदायिक रक्तदाता खोजक, कर्नाटक सर्पदंश एंटीवेनम क्लीनिकल डोज, लाइव ईसीजी मॉनिटर एवं मेडिकल ड्रोन।",
      dispatchDrone: "🚨 1-क्लिक मेडिकल ड्रोन भेजें",
      emergencySos: "🆘 नागरिक एसओएस पैनिक बटन",
      cprMetronome: "सीपीआर ऑडियो मेट्रोनोम (110 BPM)",
      bloodMatch: "दावणगेरे सामुदायिक रक्तदाता जियो-मैचिंग नेटवर्क",
      snakebiteTitle: "कर्नाटक बिग-फोर सर्पदंश एंटीवेनम (ASV) क्लीनिकल प्रोटोकॉल",

      // Industrial IoT
      iotTitle: "साइबर-फिजिकल स्काडा (SCADA) सुरक्षा एवं कंपन FFT विश्लेषण",
      iotDesc: "उच्च गति टेलीमेट्री, कंपन स्पेक्ट्रम विश्लेषण और जहरीली गैस रिसाव पर स्वचालित सुरक्षा शटऑफ।",
      tripGas: "⚠️ जहरीली गैस रिसाव का सिमुलेशन करें",
      resetScada: "स्काडा रीसेट करें",

      // Open Innovation
      openTitle: "क्रॉस-डोमेन स्वाम समन्वयक एवं नेक्सस एआई कोपायलट",
      openDesc: "बहु-डोमेन आपातकालीन प्रोटोकॉल जनरेटर, वॉइस स्पीच संश्लेषण और नागरिक आपदा रिपोर्टिंग पोर्टल।"
    },

    kn: {
      appName: "INNOVEX OS",
      tagline: "",
      openPhone: "📱 ಫೋನ್‌ನಲ್ಲಿ ತೆರೆಯಿರಿ",
      audioActive: "🔊 ಧ್ವನಿ ಸಕ್ರಿಯ",
      audioMuted: "🔇 ಧ್ವನಿ ಮ್ಯೂಟ್",
      navAgri: "🌾 1. ಅಗ್ರಿಟೆಕ್ ಕೃಷಿ ಕೇಂದ್ರ",
      navHealth: "🏥 2. ಹೆಲ್ತ್‌ಟೆಕ್ ಮತ್ತು ರಕ್ತದಾನ",
      navCity: "🏙️ 3. ಸ್ಮಾರ್ಟ್ ಸಿಟಿ & ಸ್ಕ್ಯಾಮ್ ಸೆಂಟಿನೆಲ್",
      navDrones: "🛸 4. ರೊಬೊಟಿಕ್ಸ್ ಮತ್ತು ಡ್ರೋನ್‌ಗಳು",
      navIot: "🏭 5. ಕೈಗಾರಿಕಾ ಐಒಟಿ ಸ್ಕಾಡಾ",
      navOpen: "🤖 6. AI ಕಾಪಿಲಟ್ & ಓಪನ್ ಇನ್ನೋವೇಶನ್",

      // Drones
      droneTitle: "ಏರೋ-ಸ್ವಾರ್ಮ್ ಸ್ವಾಯತ್ತ ಕಮಾಂಡ್ ಮತ್ತು ಜಿಐಎಸ್",
      droneDesc: "ಓಪನ್‌ಸ್ಟ್ರೀಟ್‌ಮ್ಯಾಪ್ ಲೈವ್ ಜಿಪಿಎಸ್ ಮಿಷನ್ ರೂಟಿಂಗ್, ಹ್ಯಾವರ್ಸೈನ್ ದೂರ ಲೆಕ್ಕಾಚಾರ, FLIR ಥರ್ಮಲ್ ದೃಷ್ಟಿ ಮತ್ತು ಡ್ರೋನ್ ಟೆಲಿಮೆಟ್ರಿ.",
      launchMission: "🚀 ಸ್ವಾಯತ್ತ ಹಾರಾಟ ಪ್ರಾರಂಭಿಸಿ",
      usePhoneGps: "📍 ಫೋನ್ GPS ಬಳಸಿ",
      clearWaypoints: "ವೇಪಾಯಿಂಟ್ ತೆರವುಗೊಳಿಸಿ",
      altitude: "ಹಾರಾಟದ ಎತ್ತರ",
      airSpeed: "ಗಾಳಿಯ ವೇಗ",
      swarmBattery: "ಡ್ರೋನ್ ಬ್ಯಾಟರಿ",
      missionDist: "ಮಿಷನ್ ದೂರ",

      // AgriTech
      agriTitle: "ಟೆರಾ-ಅಗ್ರಿ ಕೃಷಿ ಕೇಂದ್ರ: ಜೀವಾಮೃತ ಲೆಕ್ಕಾಚಾರ ಮತ್ತು ಮಾರುಕಟ್ಟೆ ಹೋಲಿಕೆ",
      agriDesc: "ಕ್ಯಾಮೆರಾ ಎಲೆ ರೋಗ ಪತ್ತೆ, ಕರ್ನಾಟಕ ಎಪಿಎಂಸಿ ದರ ಹೋಲಿಕೆ (ದಾವಣಗೆರೆ-ಶಿವಮೊಗ್ಗ-ಹುಬ್ಬಳ್ಳಿ), ನೈಸರ್ಗಿಕ ಜೀವಾಮೃತ ಕ್ಯಾಲ್ಕುಲೇಟರ್.",
      startCamera: "📷 ಕ್ಯಾಮೆರಾ ಆನ್ ಮಾಡಿ",
      stopCamera: "⏹️ ಕ್ಯಾಮೆರಾ ಆಫ್ ಮಾಡಿ",
      analyzeLeaf: "🔍 ಎಲೆ ತಪಾಸಣೆ ಮಾಡಿ",
      loadSample: "🧪 ರೋಗಗ್ರಸ್ತ ಎಲೆ ಮಾದರಿ ಲೋಡ್ ಮಾಡಿ",
      uploadPhoto: "📁 ಫೋಟೋ ಅಪ್‌ಲೋಡ್ ಮಾಡಿ",
      mandiRates: "ಕರ್ನಾಟಕ ಎಪಿಎಂಸಿ ಮಾರುಕಟ್ಟೆ ಬೆಳೆ ದರಗಳ ಹೋಲಿಕೆ (ದಾವಣಗೆರೆ vs ಶಿವಮೊಗ್ಗ vs ಹುಬ್ಬಳ್ಳಿ)",
      soilCalc: "ನೈಸರ್ಗಿಕ ಜೀವಾಮೃತ ಮತ್ತು ಸಾವಯವ ಗೊಬ್ಬರ ತಯಾರಿಕೆ ಕ್ಯಾಲ್ಕುಲೇಟರ್",
      calculateFert: "ನೈಸರ್ಗಿಕ ಜೀವಾಮೃತ ಪ್ರಮಾಣ ಲೆಕ್ಕಹಾಕಿ",

      // Smart City
      cityTitle: "ದಾವಣಗೆರೆ ಮಹಾನಗರ ಡಿಜಿಟಲ್ ಟ್ವಿನ್ ಮತ್ತು ಉಪಗ್ರಹ ಹವಾಮಾನ",
      cityDesc: "ಓಪನ್-ಮೆಟಿಯೊ ಉಪಗ್ರಹಗಳಿಂದ ದಾವಣಗೆರೆಯ ನೈಜ ಸಮಯದ ಹವಾಮಾನ, ವಾಯು ಗುಣಮಟ್ಟ (AQI) ಮತ್ತು ಹಸಿರು ಕಾರಿಡಾರ್ ನಿಯಂತ್ರಣ.",
      refreshWeather: "🔄 ಲೈವ್ ಡೇಟಾ ರಿಫ್ರೆಶ್ ಮಾಡಿ",
      activateGreenCorridor: "ತುರ್ತು ಹಸಿರು ಕಾರಿಡಾರ್ ಆನ್ ಮಾಡಿ",
      deactivateGreenCorridor: "ಹಸಿರು ಕಾರಿಡಾರ್ ಆಫ್ ಮಾಡಿ",

      // HealthTech
      healthTitle: "ಬಯೋ-ಪಲ್ಸ್ ತುರ್ತು ಮೆಡಿಕಲ್ ಡ್ರೋನ್, ರಕ್ತದಾನ ಜಾಲ ಮತ್ತು ಸರ್ಪದಂಶ ASV",
      healthDesc: "ದಾವಣಗೆರೆ ಸಮುದಾಯ ರಕ್ತದಾನಿಗಳ ಹೊಂದಾಣಿಕೆ, ಕರ್ನಾಟಕ ಸರ್ಪದಂಶ ವಿರೋಧಿ ಔಷಧ ಡೋಸೇಜ್, ಲೈವ್ ಇಸಿಜಿ ಮತ್ತು ಡ್ರೋನ್.",
      dispatchDrone: "🚨 ಮೆಡಿಕಲ್ ಡ್ರೋನ್ ರವಾನಿಸಿ",
      emergencySos: "🆘 ನಾಗರಿಕ SOS ಪ್ಯಾನಿಕ್ ಬಟನ್",
      cprMetronome: "ಸಿಪಿಆರ್ ಆಡಿಯೋ ಮೆಟ್ರೋನೊಮ್ (110 BPM)",
      bloodMatch: "ದಾವಣಗೆರೆ ಸಮುದಾಯ ರಕ್ತದಾನಿಗಳ ಜಿಯೋ-ನೆಟ್‌ವರ್ಕ್",
      snakebiteTitle: "ಕರ್ನಾಟಕ ಹಾವು ಕಡಿತ (ಸರ್ಪದಂಶ) ಆಂಟಿವೆನಮ್ (ASV) ಚಿಕಿತ್ಸಾ ವಿಧಾನ",

      // Industrial IoT
      iotTitle: "ಕೈಗಾರಿಕಾ ಸ್ಕಾಡಾ (SCADA) ಭದ್ರತೆ ಮತ್ತು ಕಂಪನ ತರಂಗ ವಿಶ್ಲೇಷಣೆ",
      iotDesc: "ನೈಜ ಸಮಯದ ಟೆಲಿಮೆಟ್ರಿ, ಫೋರಿಯರ್ ತರಂಗ ವಿಶ್ಲೇಷಣೆ ಮತ್ತು ವಿಷಾನಿಲ ಸೋರಿಕೆಯಾದಾಗ ಸ್ವಯಂಚಾಲಿತ ವಾಲ್ವ್ ಬಂದ್ ವ್ಯವಸ್ಥೆ.",
      tripGas: "⚠️ ಅನಿಲ ಸೋರಿಕೆ ಸಿಮ್ಯುಲೇಶನ್",
      resetScada: "ಸ್ಕಾಡಾ ಮರುಹೊಂದಿಸಿ",

      // Open Innovation
      openTitle: "ಮಲ್ಟಿ-ಡೊಮೇನ್ ಸ್ವಾರ್ಮ್ ಆರ್ಕೆಸ್ಟ್ರೇಟರ್ ಮತ್ತು ಎಐ ಸಹಾಯಕ",
      openDesc: "ಬಹು-ಡೊಮೇನ್ ತುರ್ತು ಪ್ರೋಟೋಕಾಲ್ ಜನರೇಟರ್, ಕನ್ನಡ ಧ್ವನಿ ಸಂಶ್ಲೇಷಣೆ ಮತ್ತು ಸಾರ್ವಜನಿಕ ವಿಪತ್ತು ವರದಿ ಪೋರ್ಟಲ್."
    }
  };

  function setLanguage(lang) {
    if (!translations[lang]) return;
    currentLang = lang;

    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (translations[lang][key]) {
        if (el.tagName === 'INPUT' && el.type === 'button') {
          el.value = translations[lang][key];
        } else {
          el.innerText = translations[lang][key];
        }
      }
    });

    if (window.NexusVoice) {
      if (lang === 'hi') window.NexusVoice.lang = 'hi-IN';
      else if (lang === 'kn') window.NexusVoice.lang = 'kn-IN';
      else window.NexusVoice.lang = 'en-US';
    }

    const bannerMsg = lang === 'kn' ? "ಭಾಷೆಯನ್ನು ಕನ್ನಡಕ್ಕೆ ಬದಲಾಯಿಸಲಾಗಿದೆ." :
                      lang === 'hi' ? "भाषा को हिंदी में सेट किया गया है।" :
                      "Language switched to English.";
    
    window.NexusVoice?.speak(bannerMsg);
  }

  function get(key) {
    return translations[currentLang][key] || translations['en'][key] || key;
  }

  function getLang() {
    return currentLang;
  }

  return { setLanguage, get, getLang };
})();
