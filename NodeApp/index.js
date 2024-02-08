const express = require('express');
const fs = require('fs');
const ngrok = require('ngrok');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.post('/webhook', (req, res) => {
    // Define a function to create a configuration object from the request body
    function createConfig(requestBody) {
        const config = {};
        for (const key in requestBody) {
            if (requestBody.hasOwnProperty(key)) {
                config[key] = requestBody[key];
            }
        }
        return config;
    }

    // Extract data from the request body
    const config = createConfig(req.body);
    const timestamp = Date.now();
    const logData = 'Received data:\n' + JSON.stringify(config, null, 2) + '\n';
    const filename = 'webhook_log_' + timestamp + '.txt';

    // Write the data to a text file
    fs.writeFile(filename, logData, (err) => {
        if (err) {
            console.error('Error writing to file:', err);
        } else {
            console.log('Data written to ' + filename);
        }
    });

    console.log('Webhook received!');
    res.status(200).send('Webhook received!');
});

// Start the Express server
const server = app.listen(PORT, async () => {
    console.log('Server is running on port ' + PORT);
    
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
