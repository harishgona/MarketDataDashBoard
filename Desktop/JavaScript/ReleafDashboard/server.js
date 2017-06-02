var http = require('http');
var xlsx = require('xlsx');
var fs = require('fs');
var server = http.createServer(function (req, res) {
    displayForm(res);
});
var express = require('express');
var app = express();

var js = [];
var data  = xlsx.readFile('NationalRetail.xls');
var j=0;
var i=0;
var states = [];

while(i < data.SheetNames.length){
js[j]= xlsx.utils.sheet_to_json(data.Sheets[data.SheetNames[i]]);
j++;
i+=2;
}

 
 function get_header_row(sheet) {
    var headers = [];
    var range = xlsx.utils.decode_range(sheet['!ref']);
    var C, R = range.s.r; 
    // walk every column in the range 
    for(C = range.s.c+2; C <range.e.c; ++C) {
        var cell = sheet[xlsx.utils.encode_cell({c:C, r:R})] // find the cell in the first row 

        var hdr = "UNKNOWN " + C; 
        if(cell && cell.t) hdr = xlsx.utils.format_cell(cell);

        headers.push(hdr);
    }
    return headers;
}
states=get_header_row(data.Sheets[data.SheetNames[0]]);
console.log(states);
app.get('/',function(req, res){
        res.render(states);
    });

function displayForm(res) {
fs.readFile('index.html', function (err, data) {
        res.writeHead(200, {
            'Content-Type': 'text/html',
                'Content-Length': data.length
        });
        res.write(data);
        res.end();
    });
}

server.listen(1185);
console.log("server listening on 1185");
