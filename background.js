'use strict';

chrome.runtime.onInstalled.addListener(function () {
    // Declare default options
    let callProtocol = 'tel';

    // Set defautl protocol
    chrome.storage.sync.set({ protocol: callProtocol });

    function callNumber(info, tab) {
        // Get current set protocol
        chrome.storage.sync.get('protocol', function (data) {
            // Open tab with call request
            if (info.selectionText) {
                chrome.tabs.create({
                    url: data.protocol + ": " + info.selectionText
                });
            } else if (info.linkUrl) {
                if (info.linkUrl.includes('tel:')) {
                    let phoneNumber = info.linkUrl.split('tel:')[1];

                    chrome.tabs.create({
                        url: data.protocol + ": " + phoneNumber
                    });
                }
            }
        });
    }

    // Create item in chrome context menu
    chrome.contextMenus.create({
        id: 'CIcallFromSelection',
        title: "Call: %s",
        contexts: ["selection"],
        onclick: callNumber,
        visible: false
    });

    // Create item in chrome context menu
    chrome.contextMenus.create({
        id: 'CIcallFromLink',
        title: "Call from link",
        contexts: ["link"],
        onclick: callNumber
    });
});

// Message reciver from context_script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    // Check if the message is the right riquest
    if (message.request === "updateContextMenu") {
        // Set context menu to not show context menu item for selection
        chrome.contextMenus.update(message.contextMenuItemId, {
            visible: message.visible
        });
    }
});