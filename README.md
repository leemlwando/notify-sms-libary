# Notify Bulk SMS Library Documentation

## Introduction

[https://www.olympusmedia.co.zm](https://www.olympusmedia.co.zm)

Notify is a bulk SMS Module for sending SMS's accross local zambian phone numbers. It is embedded in [GameBox - Download the app here](https://play.google.com/store/apps/details?id=com.microtech.gamebox).

## Instructions

- Download GameBox and Sign Up. [GameBox - Download the app here](https://play.google.com/store/apps/details?id=com.microtech.gamebox).
- place your username and password in .env file as

```js
NOTIFY_SMS_USERNAME="2609xxxxxxx"
NOTIFY_SMS_PASSWORD="***********"
```

- use the library as follows:

```js
import { SMS } from '@open-source-initiative/notify-sms';

//or
//const SMS  = require('mosi/sms');



/**
 * configure access token
*/
const setupNotify = async () => {
    await SMS.configureAccessToken();
}

/**
 * configure credentials if not already set in your .env
 * @note { only do this if you havent set credentials in your .env }
*/
const setCredentials = async () => {
    await SMS.setCredentials({ username: '2609xxxxxxxxx', password: '********' });
}

/**
 * fetch your sender Ids
 * @returns [  { name: 'MicroTech', identifier: '644316912beefb5376aa11f2' }, ... ]
*/

const getMySenderIds = async () => {
    return await SMS.GET_SENDER_IDS();
}

const getMySMSBalance = async () => {
    return await SMS.GET_SMS_BALANCE();
}

const sendSMSToMyContacts = async () => {
    const smsResponse = await SMS.SEND_SMS_TO_CUSTOM_CONTACTS({ contacts: [ '2609xxxxxxxx' ], senderId: "644316912beefb5376aa11f2", message: 'Notify SMS::Test Message::Hello Zambia!!!' });
}

```

## TEST YOUR CONNECTION

Answer the prompts:

 - Enter Login Credentials
 - Enter Test Numbers

```sh
    node node_modules/@open-source-initiative/notify-sms/build/testMe.js --terminal
```

## Support The MicroTech OpenSource Initiative
- Call/Whatsapp/MOMO 260975247994
- Email [leemlwando@gmail.com]
- Purchase Some SMSs via gamebox app.

## Support

Email us [info@microtech.co.zm]




## TODO

- Document Library
- Test Library