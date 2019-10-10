// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

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
            chrome.tabs.create({
                url: data.protocol + ": " + info.selectionText
            });
        });
    }
    // Create item in chrome context menu
    chrome.contextMenus.create({
        title: "Call: %s",
        contexts: ["selection"],
        onclick: callNumber
    });
});