function findOnions(document_root) {
          node = document_root.firstChild;

          var data = "";

          while (node) {
                switch (node.nodeType) {
                      case Node.ELEMENT_NODE:
                      data += node.outerHTML;
                      break;

                      case Node.TEXT_NODE:
                      data += node.nodeValue;
                      break;
                }

                node = node.nextSibling;
          }

          var regexp = /[a-z0-9]{16}.onion/g;
          var onions = data.match(regexp);

          var found = [];
          var sorted = [];

          for (var i = 0; i < onions.length; i++) {
                if (found.indexOf(onions[i]) == -1) {
                      found.push(onions[i]);
                }
          }

          var j = 0;
          for (var i = 0; i < onions.length; i++) {
                sorted[j] = {
                      onion: onions[i],
                      host: location.host
                };
          }

          chrome.runtime.sendMessage({
                action: "getSource",
                source: sorted
          });
}

findOnions(document);
