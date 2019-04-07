const express = require('express');
const app = express();

let options = {};
app.get('/phone/directory.xml', function (req, res) {
  let xml = buildXmlForm()
  res.header("Content-Type", "text/xml");
  res.send(xml);
});
app.get('/phone/search.xml', function (req, res) {
  return Promise.resolve()
    .then(() => options.search_func(req.query))
    .then((entries) => {
      let xml = buildXmlDirectory(entries)
      res.header("Content-Type", "text/xml");
      res.send(xml);
    })
});

let buildXmlDirectory = (entries) => { 
  entries.splice(32)
  if (entries.length === 0) { 
    return '<CiscoIPPhoneText>'+
      '<Title>No Results</Title>'+
      '<Text>'+options.no_results_message+'</Text>'+
      '</CiscoIPPhoneText>'
  }

  let xml = '<CiscoIPPhoneDirectory>';
  xml += '<Title>' + options.directory.title + '</Title>'
  xml += '  <Prompt>' + options.directory.prompt + '</Prompt>';
  entries.forEach(e => {
    xml += '<DirectoryEntry>' +
      ' <Telephone>' + e.phone + '</Telephone>' +
      ' <Name>' + e.name + '</Name>' +
      '</DirectoryEntry>';
  });

  xml += '</CiscoIPPhoneDirectory>';
  return xml;
}

let buildXmlForm = () => { 
  let xml = '<CiscoIPPhoneInput>' +
    '  <Title>' + options.form.title + '</Title>' +
    '  <Prompt>' + options.form.prompt + '</Prompt>' +
    '  <URL>http://' + options.ip + ':' + options.port + '/phone/search.xml</URL>';
  
  options.form.fields.forEach(f => { 
    xml += '<InputItem>' +
      '    <DisplayName>' + f.label + '</DisplayName>' +
      '    <QueryStringParam>' + f.name + '</QueryStringParam>' +
      '    <DefaultValue>' + (f.default||'') + '</DefaultValue>' +
      '    <InputFlags>' + f.type + '</InputFlags>' +
      '  </InputItem>'
  })
  xml += '</CiscoIPPhoneInput>'
  return xml
}

module.exports = {
  listen: function (port, host, opts, t) { 
    options = opts;
    options.port = port;
    app.listen(port, host);
    return app;
  }
}

