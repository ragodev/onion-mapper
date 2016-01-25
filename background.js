var map = {
	"swehack.org": "swehackmzys2gpmb.onion"
};

chrome.webRequest.onBeforeRequest.addListener(
	function(details) {
		var url = new URL(details.url);

		if (map[url.host] != undefined) {
			return { redirectUrl: "http://" + map[url.host] + url.pathname + url.search + url.hash };
		}

		return { };
	},
	{
		urls: [
			"<all_urls>"
		],
		types: ["main_frame", "sub_frame", "stylesheet", "script", "image", "object", "xmlhttprequest", "other"]
	},
	["blocking"]
);
