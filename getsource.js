function findOnions(document_root) {
          node = document_root.firstChild;
          while (node) {
                var data;

                switch (node.nodeType) {
                      case Node.ELEMENT_NODE:
                      data = node.outerHTML;
                      break;

                      case Node.TEXT_NODE:
                      data = node.nodeValue;
                      break;
                }

                chrome.runtime.sendMessage({
                      action: "getSource",
                      source: data
                });

                node = node.nextSibling;
          }
}

findOnions(document);
