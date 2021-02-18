import https from "https";
import {PaytmConfig} from "../../../configs/paytm";
import PaytmChecksum from "../../../utils/checksum";

export default function paynow(req, res) {

    if(req.method==="POST"){
      

            var post_data = JSON.stringify(req.body)
            var post_data = JSON.parse(post_data)
            // received params in callback
            console.log('Callback Response: ', post_data, "\n");


            // verify the checksum
            var checksumhash = post_data.CHECKSUMHASH;
            // delete post_data.CHECKSUMHASH;
            var result = PaytmChecksum.verifySignature(post_data, PaytmConfig.key, checksumhash);

            console.log("Checksum Result => ", result, "\n");


            // Send Server-to-Server request to verify Order Status
            var params = {"MID": PaytmConfig.mid, "ORDERID": post_data.ORDERID};

            PaytmChecksum.generateSignature(params, PaytmConfig.key).then(function (checksum) {

            params.CHECKSUMHASH = checksum;
            post_data = 'JsonData='+ JSON.stringify(params);

            var options = {
                hostname: 'securegw-stage.paytm.in', // for staging
                // hostname: 'securegw.paytm.in', // for production
                port: 443,
                path: '/merchant-status/getTxnStatus',
                method: 'POST',
                headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Content-Length': post_data.length
                }
            };


            // Set up the request
            var response = "";
            var post_req = https.request(options, function(post_res) {
                post_res.on('data', function (chunk) {
                response += chunk;
                });

                post_res.on('end', function(){
                console.log('S2S Response: ', response, "\n");

                var _result = JSON.parse(response);
                    if(_result.STATUS == 'TXN_SUCCESS') {
                        res.send('payment sucess')
                        
                    }else {
                        res.send('payment failed')
                    }
                });
            });

            // post the data
            post_req.write(post_data);
            post_req.end();
            });
    }
    else{
        res.json("Page not found")
    }
}