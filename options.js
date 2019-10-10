// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

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
   debugger;
   chrome.storage.sync.set({ protocol: protocolInput.value });
});
