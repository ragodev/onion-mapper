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

          chrome.runtime.sendMessage({
                action: "getSource",
                source: JSON.stringify(onions)
          });
}

findOnions(document);
