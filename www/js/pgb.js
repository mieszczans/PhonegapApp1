let watchID = null;
function init() {
	document.addEventListener("deviceready",onDeviceReady, false);
	document.addEventListener("online", onOnline, false);
    document.addEventListener("offline", onOffline, false);
}

function startAcc() {
    var options = { frequency: 3000 };

    watchID = navigator.accelerometer.watchAcceleration(onSuccess, onError, options);
}
function stopAcc() {
    navigator.accelerometer.clearWatch(watchID);
}

// function onDeviceReady() {
// 	navigator.notification.beep(1);
// }

function deviceInfo() {

	info =  'Hi, I am your smartphone :-)' + '\n' +
			'=====' + '\n' +
			'Device Name    : '     + device.name     + '\n' + 
			'Device Cordova : '  + device.cordova + '\n' + 
			'Device Platform: ' + device.platform + '\n' + 
			'Device UUID    : '     + device.uuid     + '\n' + 
			'Device Model   : '    + device.model     + '\n' + 
			'Device Version : '  + device.version  + '\n';

	navigator.notification.alert(info);
}

function checkConnection() {
    var networkState = navigator.connection.type;

    var states = {};
    states[Connection.UNKNOWN] = 'Unknown connection';
    states[Connection.ETHERNET] = 'Ethernet connection';
    states[Connection.WIFI] = 'WiFi connection';
    states[Connection.CELL_2G] = 'Cell 2G connection';
    states[Connection.CELL_3G] = 'Cell 3G connection';
    states[Connection.CELL_4G] = 'Cell 4G connection';
    states[Connection.CELL] = 'Cell generic connection';
    states[Connection.NONE] = 'No network connection';

    navigator.notification.alert('Connection type: ' + states[networkState]);
}

function onOnline() {
    navigator.notification.alert("Online");
}
function onOffline() {
    navigator.notification.alert("Offline");
}
function onSuccess(acceleration) {

    var p = document.querySelector('#accelerationContent');

    p.innerHTML='Acceleration X: ' +
        acceleration.x +
        '<br/>' +
        'Acceleration Y: ' +
        acceleration.y +
        '<br/>' +
        'Acceleration Z: ' +
        acceleration.z +
        '<br/>' +
        'Timestamp: ' +
        acceleration.timestamp +
        '<br/>';
}
function onError() {
    navigator.notification.alert('onError!');
}

function showSplash() {
    navigator.splashscreen.show();
    setTimeout(function () {
        navigator.splashscreen.hide();
    }, 2000);
}

function Contacts(contacts) {
    let list = "";
    for (var i = 0; i < contacts.length; i++) {
        list += "Nazwa: " + contacts[i].displayName + " - " + contacts[i].phoneNumber + "\n";
    }
    navigator.notification.alert(list)
};

function showContacts() {
    var optionsC = new ContactFindOptions();
    optionsC.filter = "";
    optionsC.multiple = true;
    var filter = ["displayName", "phoneNumbers"];
    navigator.contacts.find(filter, Contacts, onErrorC, optionsC);
}

function sendMessage() {
    var app = {
    sendSms: function () {
        var number = document.getElementById('numberTxt').value;
        var message = document.getElementById('messageTxt').value;
        

        //CONFIGURATION
        var options = {
            replaceLineBreaks: false, // true to replace \n by a new line, false by default
            android: {
                intent: 'INTENT'  // send SMS with the native android SMS messaging
                //intent: '' // send SMS without open any other app
            }
        };

        var success = function () { alert('Wiadomość została wysłana'); };
        var error = function (e) { alert('Błąd: ' + e); };
        sms.send(number, message, options, success, error);
    }
};
app.sendSms();
}