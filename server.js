var express = require('express')
var path = require('path')
var bodyParser = require('body-parser')
var _ = require('lodash')
var fs = require('fs')
var chokidar = require('chokidar')
var mongojs = require('mongojs')
var ObjectId = require('mongodb').ObjectID

var localDb = mongojs('caradDb', ['persistedBankDetailCSVs'])

var watcher = chokidar.watch('bankDetailCSVs', {ignored: /^\./})

var index = require('./routes/index')
var suppliers = require('./routes/suppliers')

var port = (process.env.PORT || '3000')

var app = express()

// view engine setup
app.set('views', path.join(__dirname, './client/dist/'))
app.set("view engine", "ejs")
app.engine("html", require("ejs").renderFile)

// Set Static Folder
app.use(express.static(path.join(__dirname, './client/dist/')))

// Body Parser MW (Middleware)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}))

app.use('/', index)
app.use("/api", suppliers)

/*fs.readFile(path.join(__dirname, '/bankDetailCSVs(1)/CARADENCONS-20161014-First30.csv'), 'utf8', function (err,data) {
  if (err) {
    return console.log(err);
  }
  console.log(data);
});*/


let fieldArray = ['{"bankTranDate" : ','"bankTranRef" : ','"bankTranDetail" : ','"bankTranAmnt" : ','"bankTranBal": ']
let fieldIndex = 0
let loopCount = 0
let keyValStr = ""

let text = fs.readFileSync(path.join(__dirname, '/bankDetailCSVs/CARADENCONS-20161030.csv'),'utf8')
text = text.substring(text.indexOf(",,,,,,") + 8)

while (text.length > 20 && loopCount < 3000) {

    //console.log("XXXXXXXXXXXXXXXXXX " + text.substring(0, 50))

    loopCount++ 
    keyValStr = keyValStr.concat(fieldArray[fieldIndex])

    if (fieldIndex === 0){
        if (text.substring(0, 10).indexOf('/') === -1){
            return
        }
        keyValStr = keyValStr.concat(getUTCDateFromString(text.substring(0, 10))) + ','
        text = text.substring(11)
    }

    else if (fieldIndex === 1){
        keyValStr = keyValStr.concat('"' + text.substring(0, text.indexOf(',')) + '",')
        text = text.substring(text.indexOf("'") - 1)
    }

    else if (fieldIndex === 2){
        if(text.startsWith('"')) {
            keyValStr = keyValStr.concat('"' +  (text.substring(1, text.indexOf('",')) + 1) + '",')
            text = text.substring(text.indexOf('",') + 2)
        } else {
            text = text.substring(2)
            keyValStr = keyValStr.concat('"' +  (text.substring(0, text.indexOf(','))) + '",')
            text = text.substring(text.indexOf(',') + 1)
        }
    }

    else if (fieldIndex === 3){
        keyValStr = keyValStr.concat(text.substring(0, text.indexOf(',')) + ',')
        text = text.substring(text.indexOf(',') + 1)
    }

    else if (fieldIndex === 4){
        keyValStr = keyValStr.concat((text.substring(0, text.indexOf(',')) - 1) + '}')  
        text = (text.substring(text.indexOf('75027025') + 10) + '}')
        
    }

    if (fieldIndex < fieldArray.length - 1){
        fieldIndex++
    } 
    else {
        console.log("loopCount " + loopCount + ",    " +  keyValStr)
        localDb.banktrans.insert(JSON.parse(keyValStr, dateReviver))
        keyValStr = ""
        fieldIndex = 0;
    }
}

    function dateReviver(key, value) {
        var a;
        if (typeof value === 'string') {
            a = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*)?)Z$/.exec(value);
            if (a) {
                return new Date(Date.UTC(+a[1], +a[2] - 1, +a[3], +a[4],
                                +a[5], +a[6]));
            }
        }
        return value;
    };

    function getUTCDateFromString (dateString) {
    let utcDateAsStr = '"' + dateString.substring(6, 10) + "-" + dateString.substring(3, 5) 
                    + "-" + dateString.substring(0, 2) + 'T00:00:00.000Z"'
                    return utcDateAsStr
}


app.listen(port, function() {
    console.log("Server started on port "+ port)
})

module.exports = app;
