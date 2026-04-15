// const SpeechRecognition =
//   window.SpeechRecognition || window.webkitSpeechRecognition;

// if (!SpeechRecognition) {
//   alert("Speech Recognition not supported in this browser");
// }

// let recognition = null;
// let isListening = false;
// let hasClearedPlaceholder = false;

// document.addEventListener("DOMContentLoaded", () => {
//   const micBtn = document.getElementById("micBtn");
//   const pad = document.getElementById("pad");
//   const languageSelect = document.getElementById("language");

//   micBtn.addEventListener("click", () => {
//     if (!isListening) {
//       startRecognition(pad, languageSelect.value);
//     } else {
//       stopRecognition();
//     }
//   });
// });

// function startRecognition(pad, lang) {
//   recognition = new SpeechRecognition();
//   recognition.lang = lang;
//   recognition.continuous = true;
//   recognition.interimResults = true;

//   if (!hasClearedPlaceholder) {
//     pad.innerText = "";
//     hasClearedPlaceholder = true;
//   }

//   let finalText = pad.innerText;

//   recognition.onstart = () => {
//     isListening = true;
//     document.body.classList.add("listening");
//   };

//   recognition.onresult = (event) => {
//     let interim = "";

//     for (let i = event.resultIndex; i < event.results.length; i++) {
//       const transcript = event.results[i][0].transcript;
//       event.results[i].isFinal
//         ? (finalText += transcript + " ")
//         : (interim += transcript);
//     }

//     pad.innerText = finalText + interim;
//   };

//   recognition.onerror = stopRecognition;
//   recognition.onend = stopRecognition;

//   recognition.start();
// }

// function stopRecognition() {
//   if (recognition) recognition.stop();
//   isListening = false;
//   document.body.classList.remove("listening");
// }



document.addEventListener("DOMContentLoaded", function () {
  const micBtn = document.getElementById("micBtn");
  const pad = document.getElementById("pad");

  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

  if (!SpeechRecognition) {
    alert("Your browser does not support Speech Recognition.");
    return;
  }

  let recognition = null;
  let isListening = false;

  micBtn.addEventListener("click", function () {
    if (!isListening) {
      recognition = new SpeechRecognition();
      recognition.lang = window.currentLanguage || "en-US";
      recognition.continuous = true;
      recognition.interimResults = true;

      recognition.onstart = function () {
        isListening = true;
        document.body.classList.add("listening");
      };

      recognition.onresult = function (event) {
        let text = "";
        for (let i = 0; i < event.results.length; i++) {
          text += event.results[i][0].transcript;
        }
        pad.innerText = text;
      };

      recognition.onerror = function (event) {
        console.error("Speech error:", event.error);
      };

      recognition.onend = function () {
        isListening = false;
        document.body.classList.remove("listening");
      };

      recognition.start();
    } else {
      recognition.stop();
      isListening = false;
      document.body.classList.remove("listening");
    }
  });
});


