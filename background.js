function createSpirit () {
    chrome.storage.sync.set({'wedone': false});
    chrome.tabs.create({'url': chrome.extension.getURL('spirit.html'), 'selected': true});
}

function focusOnSpirit() {
    chrome.tabs.query({'url': chrome.extension.getURL('spirit.html')}, function (tabs) {
        !tabs.length && createSpirit();
        tabs.length && chrome.tabs.update(tabs[0].id, {'selected': true});
    });
}

chrome.tabs.onActivated.addListener(function() {
    chrome.storage.sync.get(function (data) {
        var count = data.tabsCount || 0;
        var nextTime = data.nextTime || count;
        chrome.storage.sync.set({'tabsCount': count += 1});
        if (count > nextTime) {
            //data.wedone = false;
        }
        !data.wedone && focusOnSpirit()
    });
});
