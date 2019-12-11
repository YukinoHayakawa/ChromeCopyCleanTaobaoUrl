

function cleanUrl(original_url)
{
    let url = new URL(original_url);
    let clean = `${url.origin}${url.pathname}?id=${url.searchParams.get('id')}`;

    return clean;
}

chrome.browserAction.onClicked.addListener(function(tab) {
    chrome.tabs.query(
        { 'active': true, 'lastFocusedWindow': true },
        function (tabs) {
            prompt("The clean URL to copy:", cleanUrl(tabs[0].url));
        }
    );
});

chrome.webRequest.onBeforeRequest.addListener(
    function(details) {
        return { redirectUrl: cleanUrl(details.url) };
    },
    {
        urls: [
            "*://detail.tmall.com/*",
            "*://item.taobao.com/*",
        ],
        types: ["main_frame", "sub_frame", "stylesheet", "script", "image", "object", "xmlhttprequest", "other"]
    },
    ["blocking"]
);
