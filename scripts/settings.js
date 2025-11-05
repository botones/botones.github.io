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
            //initUserHiddenMessage: 'hola'  // saludo inicial oculto
        };


//Add settings here


        Bots = new WebSDK(chatWidgetSettings);



        Bots.connect();

        Bots.setUserInputMessage('hola');

        // Temporizadores
        var IDLE_REMINDER_MS = 2 * 60 * 1000; // 2 minutos
        var IDLE_END_MS = 5 * 60 * 1000;      // 5 minutos
        var idleReminderTimer, idleEndTimer;

        function resetIdleTimers(Bots) {
            clearTimeout(idleReminderTimer);
            clearTimeout(idleEndTimer);

            // Mensaje visual por inactividad
            idleReminderTimer = setTimeout(function () {
                Bots.showResponse({
                type: 'text',
                text: '¿Aún estás ahí? Estoy disponible si me necesitas 😊'
                });
            }, IDLE_REMINDER_MS);

            // Cierre automático
            idleEndTimer = setTimeout(function () {
                Bots.endChat(); // Cierra el widget, limpia historial
            }, IDLE_END_MS);
        }

        // Escucha eventos de actividad para reiniciar timers
        ['message:sent', 'message:received', 'chatopen'].forEach(function(evt){
            Bots.on(evt, function () {
                resetIdleTimers(Bots);
            });
        });

        // Inicia timers al cargar
        resetIdleTimers(Bots);


        // Create global object to refer Bots
        window[name] = Bots;
    }, 0);
}

