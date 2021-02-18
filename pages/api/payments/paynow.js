import https from "https";
import {PaytmConfig} from "../../../configs/paytm";
import PaytmChecksum from "../../../utils/checksum";

export default async function paynow(req, res) {

  
      var params = {};
      params['MID'] = PaytmConfig.mid;
      params['WEBSITE'] = PaytmConfig.website;
      params['CHANNEL_ID'] = 'WEB';
      params['INDUSTRY_TYPE_ID'] = 'Retail';
      params['ORDER_ID'] = 'TEST_'  + new Date().getTime();
      params['CUST_ID'] = "9547562fhrb";
      params['TXN_AMOUNT'] = "1";
      params['CALLBACK_URL'] = 'https://cavstax.vercel.app/api/payments/callback';
      params['EMAIL'] = "yuvraj@gmai.com";
      params['MOBILE_NO'] = "7087365494";

      console.log(params);

      PaytmChecksum.generateSignature(params, PaytmConfig.key).then((checksum) => {

          console.log(checksum);

          var txn_url = "https://securegw-stage.paytm.in/theia/processTransaction"; // for staging
          // var txn_url = "https://securegw.paytm.in/theia/processTransaction"; // for production

          var form_fields = "";
          for (var x in params) {
              form_fields += "<input type='hidden' name='" + x + "' value='" + params[x] + "' >";
          }
          form_fields += "<input type='hidden' name='CHECKSUMHASH' value='" + checksum + "' >";

          res.writeHead(200, { 'Content-Type': 'text/html' });
          res.write('<html><head><title>Merchant Checkout Page</title></head><body><center><h1>Please do not refresh this page...</h1></center><form method="post" action="' + txn_url + '" name="f1">' + form_fields + '</form><script type="text/javascript">document.f1.submit();</script></body></html>');
          res.end();
      });
 
}
