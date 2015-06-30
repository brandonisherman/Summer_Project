var data = '{ "names": [' +
    '{  "name": "Bob", "occupation": "Plumber"} ]}';
var url = 'data:text/json;charset=utf8,' + encodeURIComponent(data);
window.open(url, '_blank');
window.focus();