// Add event listners to update context menu items
document.addEventListener('selectionchange', () => {
    let selection = window.getSelection().toString().trim();
    let contextMenuItemId = 'CIcallFromSelection';

    // Check if recived selection is a valid phone number
    if (selection.match(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/) !== null) {
        // save value in local storage
        localStorage['CICallFromSelectionVisable'] = 'true';
        sendVisibility(true, contextMenuItemId)
    } else {
        if (localStorage['CICallFromSelectionVisable'] !== 'false') {
            localStorage['CICallFromSelectionVisable'] = 'false';
            sendVisibility(false, contextMenuItemId)
        }
    }
});
document.addEventListener('mousedown', (event) => {
    let contextMenuItemId = 'CIcallFromLink';

	if (event.button === 2) {
        let elemtnIndex = event.path.findIndex((ele) => {
            return ele.toString().includes('tel:');
        });

        if (elemtnIndex > -1) {
            localStorage['CICallFromLinkVisable'] = 'true';
            sendVisibility(true, contextMenuItemId);
        } else {
            if (localStorage['CICallFromLinkVisable'] !== 'false') {
                localStorage['CICallFromLinkVisable'] = 'false';
                sendVisibility(false, contextMenuItemId);
            }
        }
    }
})

function sendVisibility(bool, id) {
    // send if context menu needs to be shown
    chrome.runtime.sendMessage({
        request: 'updateContextMenu',
        visible: bool,
        contextMenuItemId: id
    });
}