# cisco-directory

A simple provider for the ```/phones/directory.xml``` file to use with the Cisco Ip Phones as external service

## Installation

    npm i cisco-directory --save

## Usage

```javascript
let cisco_directory = require('cisco-directory');

let entries = {
  "John": "+44012345678",
  "Mary": "+44112223321",
  "Tom": "+4401321",
}

cisco_directory.listen(80, "0.0.0.0", entries, "My awesome Company");
```

Since objects are passed as reference, you can add your own logic to keep these info updated

```javascript
let cisco_directory = require('cisco-directory');
let entries = {
  // ...whatever
}

cisco_directory.listen(80, "0.0.0.0", entries, "My awesome Company");

setTimeout(() => {
  //every 10 minutes update the entryes from DB
  let entries = db.query('<your query here>');
}, 600000)
```

## Configure the Phone

To configure your Cisco Ip Phone, you should referer to the guide of your model.  
For conveniente I add the config for the 79X1 models.  
You sould modify the provisioning configuration adn add the url into the section serviceURL

```xml
<device>
    <!-->Other config infos <-->
    <servicesURL>http://your_local_server/phones/directory.xml</servicesURL>
</device>
```
Make sure tha the Ip Phone and the server are on the same network.

## Reference
If you have thruble to config, you can refer to this [awesome post](https://www.whizzy.org/2017/02/cisco-7941-asterisk-and-sip/)