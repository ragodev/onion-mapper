chrome.runtime.onMessage.addListener(function(request, sender) {

      // Remove "loading..." label
      message.innerHTML = "";

      if (request.action == "getSource") {
            for (var i = 0; i < request.source.length; i++) {
                  addOnionEntry(request.source[i]);
            }
      }
});

function addOnionEntry(onion) {
      message.innerHTML += "<input type=radio name=anus value=\"" + onion + "\">" + onion + "<br>";
}

function onWindowLoad() {
      var message = document.querySelector('#message');

      chrome.tabs.executeScript(null, {
            file: "getsource.js"
      }, function() {
            if (chrome.runtime.lastError) {
                  message.innerText = 'There was an error injecting script : \n' + chrome.runtime.lastError.message;
            }
      });
}

window.onload = onWindowLoad;
