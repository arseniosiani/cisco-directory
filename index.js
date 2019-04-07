const express = require('express');
const app = express();

let directory = {};
let title = '';
app.get('/phone/directory.xml', function (req, res) {

  let xml = buildXml(directory, title)

  res.header("Content-Type", "text/xml");
  res.send(xml);
});

let buildXml = (entries, title) => { 
  let xml = '<CiscoIPPhoneDirectory>';
  xml += '<Title>' + title + '</Title>';

  Object.keys(entries).forEach(k => {
    xml += '<DirectoryEntry>' +
      ' <Telephone>' + entries[k] + '</Telephone>' +
      ' <Name>' + k + '</Name>' +
      '</DirectoryEntry>';
  });

  xml += '</CiscoIPPhoneDirectory>';
  return xml;
}

module.exports = {
  listen: function (port, host, entries, t) { 
    title = t;
    directory = entries;
    app.listen(port, host);
  }
}

