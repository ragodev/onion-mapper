chrome.runtime.onMessage.addListener(function(request, sender) {
      if (request.action == "getSource") {
            for (var i = 0; i < request.source.length; i++) {
                  var host = request.source[i].host;
                  var onion = request.source[i].onion;

                  message.innerText += host + ": " + onion + "<br>";
            }
      }
});

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
