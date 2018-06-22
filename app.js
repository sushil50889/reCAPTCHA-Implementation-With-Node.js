const express = require('express');
const request = require('request');
const bodyParser = require('body-parser');
const app = express();
//port variale
const port = process.env.PORT || 5000;
//handlebars middleware
app.set("view engine", "ejs");
//body parser middleware
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
//static folder
app.use(express.static(`${__dirname}/public`));


//index route
app.get('/', (req, res) => {
  res.render('index');
});



app.post('/subscription', (req, res) => {
  if(
    req.body.captcha === undefined ||
    req.body.captcha === '' ||
    req.body.captcha === null
  ){
    return res.json({'success': false, 'msg': 'Please Select Captcha'});
  }


//secret Key
  const secretKey = '6LepVDQUAAAAAIpFO3bYS-mUeGWkh3DSN5PKUdJE';


//verify urlencoded
const verifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${req.body.captcha}&remoteip=${req.connection.remoteAddress}`;
//make request to verify captcha
request(verifyUrl, (err, response, body) => {
  console.log(body);
  var body = JSON.parse(body);
  console.log(body);
  if(body.success !== undefined && !body.success){
    return res.json({'success': false, 'msg': 'Failed captcha verification'});
  }

  return res.json({'success': true, 'msg': 'Captcha Passed'});
});
});


app.listen(port, () => {
  console.log(`server is on...port : ${port}`);
});
