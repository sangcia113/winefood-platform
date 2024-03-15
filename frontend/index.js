const express = require('express');
const app = express();
const path = require('path');
const port = process.env.REACT_APP_PORT || 3000;

// Serve static files from the React app
app.use(express.static(path.join(__dirname, './build')));

// Handle requests to the root URL
app.get(
    [
        '/',
        '/nghiphep',
        '/nghiphep/login',
        '/nghiphep/history',
        '/nghiphep/leader',
        '/nghiphep/manager',
        '/nghiphep/user',
    ],
    (req, res) => {
        res.sendFile(path.join(__dirname, './build', 'index.html'));
    }
);

// Start the server
app.listen(port, () => {
    console.log(`React is running on port ${port}`);
});
