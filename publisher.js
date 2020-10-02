const NATS = require('nats')
const https = require('https');

function foo() {

    const nc = NATS.connect("demo.nats.io:4222")

    https.get('https://api.icndb.com/jokes/random?firstName=&lastName=CyVerse&limitTo=[nerdy] ', (resp) => {
        let data = '';

        // A chunk of data has been recieved.
        resp.on('data', (chunk) => {
            data += chunk;
        });

        // The whole response has been received.
        resp.on('end', () => {
            var response = JSON.parse(data)
            if (response.type !== undefined && response.type == 'success') {

                var joke = response.value.joke;
                joke = joke.replace(" CyVerse", "CyVerse"); // Replace double space forcing CyVerse name to fit the joke.
                console.log(joke)

                // TODO some sort of try catch here for network errors on publish
                nc.publish('towicode_cy8889a', joke, () => {
                    nc.close()
                })
            }
        });

    }).on("error", (err) => {
        console.log("Error: " + err.message);
        nc.close() //ensure this always closes.
    });

    setTimeout(foo, 5000);
}

foo();


