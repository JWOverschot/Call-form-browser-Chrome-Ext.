'use strict';

let page = document.getElementById('settings');
let protocolInput = document.getElementById('protocol');
let saveButton = document.getElementById('save-protocol');

// Get current set protocol
chrome.storage.sync.get('protocol', function(data) {
    protocolInput.value = data.protocol;
});

saveButton.addEventListener('click', () => {
   // Set protocol
   chrome.storage.sync.set({ protocol: protocolInput.value });
});
