const express = require('express');
const path = require('path');
const m = require('mithril');

// Import components for testing
const { Button, FlatButton, RoundIconButton } = require('./dist/index.js');
const { TextInput, NumberInput, TextArea } = require('./dist/index.js');
const { Switch } = require('./dist/index.js');
const { Select } = require('./dist/index.js');
const { ModalPanel } = require('./dist/index.js');
const { Dropdown } = require('./dist/index.js');

const app = express();

// Serve static files
app.use('/dist', express.static(path.join(__dirname, 'dist')));
app.use('/node_modules', express.static(path.join(__dirname, 'node_modules')));

// Test page route
app.get('/', (req, res) => {
  const testPage = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Component Tests</title>
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css" rel="stylesheet">
    <link href="/dist/index.css" rel="stylesheet">
    <style>
        .test-section { margin: 2rem 0; padding: 1rem; border: 1px solid #ddd; }
        .theme-dark { background: #121212; color: white; }
    </style>
</head>
<body>
    <div id="app" data-testid="components-container">
        <div class="container">
            <h1>Component Test Page</h1>
            
            <button id="theme-toggle" data-testid="theme-toggle">Toggle Theme</button>
            
            <div class="test-section" data-testid="buttons-section">
                <h2>Buttons</h2>
                <div id="buttons"></div>
            </div>
            
            <div class="test-section" data-testid="inputs-section">
                <h2>Inputs</h2>
                <div id="inputs"></div>
            </div>
            
            <div class="test-section" data-testid="switch-section">
                <h2>Switch</h2>
                <div id="switches"></div>
            </div>
            
            <div class="test-section" data-testid="select-section">
                <h2>Select</h2>
                <div id="selects"></div>
            </div>
            
            <div class="test-section" data-testid="dropdown-section">
                <h2>Dropdown</h2>
                <div id="dropdowns"></div>
            </div>
            
            <button data-testid="open-modal">Open Modal</button>
            <div id="modal-container"></div>
        </div>
    </div>
    
    <script src="https://unpkg.com/mithril/mithril.js"></script>
    <script src="/dist/index.umd.js"></script>
    <script>
        // Theme toggle
        document.getElementById('theme-toggle').addEventListener('click', () => {
            document.body.classList.toggle('theme-dark');
        });
        
        // Component rendering would go here
        // This is a simplified version for testing setup
        document.addEventListener('DOMContentLoaded', () => {
            // Add some test content
            document.getElementById('buttons').innerHTML = '<button class="btn">Test Button</button>';
            document.getElementById('inputs').innerHTML = '<input type="text" placeholder="Test Input">';
            document.getElementById('switches').innerHTML = '<div class="switch"><label>Off<input type="checkbox"><span class="lever"></span>On</label></div>';
        });
    </script>
</body>
</html>
  `;
  
  res.send(testPage);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Test server running on http://localhost:${port}`);
});

module.exports = app;