const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.send('Hola, Mundo!');
});

app.get('/ruta', (req, res) => {
    res.send('Respuesta de la ruta GET');
});

app.get('/ruta/:param1/subruta/:param2', (req, res) => {
    const p1 = req.params.param1;
    const p2 = req.params.param2;
    res.send(`TUS PARAMETROS FUERON ${p1} Y ${p2}`);
});

app.get('/ruta', (req, res) => {                   //Ejercicio ahora te toca a ti - IMPRIME EN CONSOLA EL CONTENIDO DE REQ
    console.log('Contenido de req:', req);
    res.send('Respuesta de la ruta GET');
});


app.post('/ruta', (req, res) => {
    res.send('Respuesta de la ruta POST');
});

app.put('/ruta', (req, res) => {
    res.send('Respuesta de la ruta PUT');
});

app.patch('/ruta', (req, res) => {
    res.send('Respuesta de la ruta PATCH');
});

app.delete('/ruta', (req, res) => {
    res.send('Respuesta de la ruta DELETE');
});

app.head('/ruta', (req, res) => {
    res.send('Respuesta de la ruta HEAD la cual no se debe ver ya que solo obtiene info del contenido sin el contenido en si');
});

app.options('/ruta', (req, res) => {
    res.send('Respuesta de la ruta OPTIONS');
});

app.listen(port, () => {
    console.log(`Servidor express escuchando el puerto ${port}`);
});
