'use strict';

function initSdk(name) {
    // Retry initialization later if WebSDK is not available yet
    if (!document || !WebSDK) {
        setTimeout(function () {
            initSdk(name);
        }, 2000);
        return;
    }

    if (!name) {
        name = 'Bots';          // Set default reference name to 'Bots'
    }
    var Bots;



    setTimeout(function () {

        var chatWidgetSettings = {
            URI: 'https://oda-e2b237d9df2641a7a17aafbd430436c6-da2.data.digitalassistant.oci.oraclecloud.com', // ODA URI, pass the hostname. Do not include the protocol (https://).

            channelId: '92bbc851-fb0d-4df0-95aa-40c5a729c0d1', // Channel ID, available in channel settings in ODA UI

//Add settings here


        };


        Bots = new WebSDK(chatWidgetSettings);



        Bots.connect();

//Add Bots.setUserInputMessage('Order pizza'); here. Comment out for voice recognition.


        // Create global object to refer Bots
        window[name] = Bots;
    }, 0);
}

