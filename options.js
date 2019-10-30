'use strict';

let page = document.getElementById('settings');
let protocolSelect = document.getElementById('protocol');
let saveButton = document.getElementById('save-protocol');
let otherValue = document.getElementById('protocol-other-value');

// Get current set protocol
chrome.storage.sync.get('protocol', (data) => {
    protocolSelect.value = data.protocol.index;

    if (data.protocol.index > 0) {
        protocolSelect.value = data.protocol.index;
    } else {
        protocolSelect.value = 0;
        otherValue.value = data.protocol.value;
    }

    // Run function to make sure when other is selected the input is shown
    showOtherInput();
});

// Listen to changes in the select with protocols
protocolSelect.addEventListener('change', () => {
    showOtherInput();
});

saveButton.addEventListener('click', () => {
    // Set protocol
    if (protocolSelect.value == 0) {
        chrome.storage.sync.set({ protocol: { index: protocolSelect.value, value: otherValue.value.toLocaleLowerCase() }});
    } else {
        chrome.storage.sync.set({ protocol: { index: protocolSelect.value, value: protocolSelect.selectedOptions[0].text }});
    }
});

// Show and hide input field for other option in select
function showOtherInput() {
    if (protocolSelect.value == 0) {
        otherValue.style.display = 'inherit';
    } else {
        otherValue.style.display = 'none';
    }
}