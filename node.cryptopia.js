const base_url = 'https://www.cryptopia.co.nz/api';
const cryptopia_keys = require('./.api_keys.json');
var md5sum = require('crypto-js/md5');
var sha256hmac = ('crypto-js/hmac-sha256');

var request = require('request');
var qstring = require('querystring');
var crypto = require('crypto-js');

// public methods
module.exports.GetCurrencies = function(cb){ // returns general info on all coins
  var options = {
    url: base_url+'/GetCurrencies'
  };
  pubrequest(options, function(sdata){
      if(sdata){
        return cb(sdata);
      };
  });
}
module.exports.GetTradePairs = function(cb){ //
  var options = {
    url: base_url+'/GetTradePairs'
  };
  pubrequest(options, function(sdata){
      if(sdata){
        return cb(sdata);
      };
  });
}
module.exports.GetMarkets = function(hours, cb){ // number of hours to pull
  var options = {
    url: base_url+'/GetMarkets/'+hours
  };
  pubrequest(options, function(sdata){
      if(sdata){
        return cb(sdata);
      };
  });
}
module.exports.GetMarket = function(market, hours, cb){ // market, hours to pull
  var options = {
    url: base_url+'/GetMarket/'+market+'/'+hours
  };
  pubrequest(options, function(sdata){
      if(sdata){
        return cb(sdata);
      };
  });
}
module.exports.GetMarketHistory = function(market, hours, cb){ // market, hours to pull
  var options = {
    url: base_url+'/GetMarketHistory/'+market+'/'+hours
  };
  pubrequest(options, function(sdata){
      if(sdata){
        return cb(sdata);
      };
  });
}
module.exports.GetMarketOrders = function(market, ocount, cb){ // market, order pull count
  var options = {
    url: base_url+'/GetMarketOrders/'+market+'/'+ocount
  };
  pubrequest(options, function(sdata){
      if(sdata){
        return cb(sdata);
      };
  });
}
module.exports.GetMarketOrderGroups = function(market, ocount, cb){ // market ARRAY, order pull count
  var options = {
    url: base_url+'/GetMarketOrderGroups/'+market.join('-')+'/'+ocount
  };
  pubrequest(options, function(sdata){
      if(sdata){
        return cb(sdata);
      };
  });
}

// private methods
module.exports.orderinfo = function(params, cb){
  var hashme = qstring.stringify(params)+"&method=OrderInfo";
  var signed = hmac.HmacSHA512(hashme, api_secret).toString(hmac.enc.Hex);
  privrequest(hashme, signed, function(sdata){
      if(sdata){
        return cb(sdata);
      };
  });
}
// private function call
function privrequest(hash, sign, cb){
  var privDefaults = request.defaults({
    method: "POST",
    form: hash,
    headers: {
      'Key': api_key,
      'Sign': sign
    }
  });
  privDefaults(tapi_url, function(error, response, body){
      if(error){
        return (error, response.statusCode);
      };
      if(!error && response.statusCode == 200){
        var data = JSON.parse(body);
        //JSON.parse(body);

        cb(data);
      };
    }
  );
}
// public function call
function pubrequest(options, cb){
  //console.log(options)
  request(
    options, function(error, response, body){
      if(error){
        return error;
      };
      if(!error && response.statusCode == 200){
        var data = JSON.parse(body);
        //JSON.parse(body);
        cb(data);
      };
    }
  );
}
