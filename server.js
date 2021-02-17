//Install express server
const express = require('express');
const path = require('path');

const app = express();

//console.log('caminho',express.static(__dirname + '/dist/App'));
// Serve only the static files form the dist directory
app.use(express.static('./dist/OrcamentoAtelie'));

app.get('/*', (req, res) =>
    res.sendFile('index.html', {root: 'dist/OrcamentoAtelie/'}),
);

app.listen(process.env.PORT || 8080);