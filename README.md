# cisco-directory

A simple provider for the ```/phones/directory.xml``` file to use with the Cisco Ip Phones as external service

## Installation

    npm i cisco-directory --save

## Usage

```javascript
let cisco_directory = require('cisco-directory');


let phone_book = [
  { name: "John", phone:"+44012345678"},
  { name: "Mary", phone:"+44112223321"},
  { name: "Tom", phone:"+4401321"}
];

let opts = {
  ip: '<your_local_ip>',
  no_results_message: "No results was found",  
  directory: {
    title: "Results",
    prompt: "Select an entry to call"
  },
  form: {
    title: "Search a number",                 // the title of the form
    prompt: "Type the name or the surname",   // the propt to the user
    fields: [                                 // you can add as many fields you want
      {
        name: "name",                         // the name of the var tha will be passed to the search_func  
        label: "Name",                        // the label the user will see on his phone
        type: "A",                            // can be: A:Text, T:Phone num, N:numeric, E:equaion, U:only uppercase, L:only lowercase, P:password
        default:""
      }
    ]
  },
  search_func: (params) => { 
    // this funcion will be invoken when the user perform a form submit
    // here you should return the results based ont the search criteria
    // you defined in the form
    // you can return a Promise as well
    let results = phone_book.filter(e => {
      if (name) { 
        let name = params.name.toLowerCase();
        return e.name.toLowerCase().indexOf(name) > -1 || e.phone.indexOf(name) > -1
      }
      return false;
    });
    return results;
  }
}
cisco_directory.listen(80, "0.0.0.0", opts);
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

## DEMO

![Demo](demo.gif?raw)


## Reference

For the Types, refer to [this](https://www.cisco.com/c/en/us/td/docs/voice_ip_comm/cuipph/all_models/xsi/7_0/english/programming/guide/70xsi/xsi70obj.html#wp1033319)
If you have thruble to config, you can refer to this [awesome post](https://www.whizzy.org/2017/02/cisco-7941-asterisk-and-sip/)