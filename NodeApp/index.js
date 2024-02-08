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
    const server = app.listen(PORT, async () => {
        console.log(`Server is running on port ${PORT}`);

        try {
            // Start ngrok tunnel
            const url = await ngrok.connect(PORT);
            console.log('Ngrok tunnel is running at:', url);
        } catch (err) {
            console.error('Error setting up ngrok:', err);
        }
    });

    // Close the tunnel when the server is stopped
    server.on('close', async () => {
        try {
            await ngrok.disconnect(); // Disconnect ngrok tunnel
            console.log('Ngrok tunnel closed');
        } catch (err) {
            console.error('Error closing ngrok tunnel:', err);
        }
    });
});
