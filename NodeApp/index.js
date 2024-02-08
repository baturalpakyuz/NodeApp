const express = require('express');
const localtunnel = require('localtunnel');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.post('/webhook', (req, res) => {
  
    
    //Uygulamanýn web sunucuda (tomcat/ngnx) çalýþtýrýlmasý
    //gelen datanýn TAMAMI loga yazýlacak

    // console.log('Trigger Severity', req.body.trigger_severity);
    console.log("Event ", req.body);
    console.log('Webhook received!');
    res.status(200).send('Webhook received!');
});

const server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    
    // Set up localtunnel
    const tunnel = localtunnel(PORT, { subdomain: 'webhook-project' }, (err, tunnel) => {
        if (err) {
            console.error('Error setting up localtunnel:', err);
        } else {
            console.log('Localtunnel is running at:', tunnel.url);
        }
    });

    // Close the tunnel when the server is stopped
    server.on('close', () => {
        tunnel.close();
        console.log('Localtunnel closed');
    });
});