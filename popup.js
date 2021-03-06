chrome.runtime.onMessage.addListener(function(request, sender) {

      // Remove "loading..." label
      message.innerHTML = "";

      if (request.action == "getSource") {
            for (var i = 0; i < request.source.length; i++) {
                  addOnionEntry(request.source[i]);
            }

            if (request.source.length == 0) {
                  message.innerHTML += "<p>No onions found on this page</p>";
            }
      }
});

function addOnionEntry(onion) {
      message.innerHTML += "<input type=radio name=onionbutton value=\"" + onion + "\">" + onion + "<br>";
}

function onWindowLoad() {
      var message = document.querySelector('#message');

      chrome.tabs.executeScript(null, {
            file: "getsource.js"
      }, function() {
            if (chrome.runtime.lastError) {
                  message.innerHTML = 'There was an error injecting script : \n' + chrome.runtime.lastError.message;
                  cantAdd();
            }
      });

      var existing = document.querySelector('#existing');

      for (var key in localStorage) {
            existing.innerHTML += "<input type=checkbox name=existingonions value=\"" + key + "\">" + key + ": " + localStorage[key] + "<br>";
      }
}

// Cannot add any mapping for this url
function cantAdd() {
      document.getElementById("add").disabled = true;
}

window.onload = onWindowLoad;

document.addEventListener("DOMContentLoaded", function() {
      var addbutton = document.getElementById("add");
      addbutton.addEventListener("click", function() {
      	chrome.tabs.getSelected(null, function(tab) {
                  var manual = document.getElementById("onionbox");
                  var url = new URL(tab.url);

                  if (manual.value.length > 0) {
                        localStorage[url.host] = manual.value;
                  } else {
                        var rbtns = document.getElementsByName("onionbutton");

                        for (var i = 0; i < rbtns.length; i++) {
                              var btn = rbtns[i];

                              if (btn.checked) {
                                    var onion = btn.value;

                                    localStorage[url.host] = onion;

                                    break;
                              }
                        }
                  }
      	});
      }, false);

      var removebutton = document.getElementById("remove");
      removebutton.addEventListener("click", function() {
      	chrome.tabs.getSelected(null, function(tab) {
                  var chkbxs = document.getElementsByName("existingonions");

                  for (var i = 0; i < chkbxs.length; i++) {
                        var btn = chkbxs[i];

                        if (btn.checked) {
                              var url = btn.value;

                              delete localStorage[url];
                        }
                  }
      	});
      }, false);
}, false);
