const express = require('express');
const app = express();
const port = 3000;

//Ejercicio ahora te toca a ti - status codes

const items = [
    { id: 1, nombre: 'producto 1' },
    { id: 2, nombre: 'producto 2' },
    { id: 3, nombre: 'producto 3' },
];

app.use(express.json());

app.get('/redireccionar', (req, res) => {
    res.status(302).redirect('/nueva-ruta');
});

app.get('/nueva-ruta', (req, res) => {
    res.send('¡Has sido redirigido a la nueva ruta!');
});

const miMiddleware = (req, res, next) => {
    console.log('Middleware ejecutado');
    next();
};

const continueMiddleware = (req, res, next) => {
    console.log('Middleware informativo ejecutado');
    console.log('Todo en orden');
    res.status(100); // Agrega el código de estado 100 (Continue)
    next();
};

const validarDatosMiddleware = (req, res, next) => {
    if (!req.body.nombre) {
        res.status(400).send('El campo nombre es obligatorio');
    } else {
        next();
    }
};

app.get('/items-prueba', (req, res) => {
    res.json(items);
});


app.use(miMiddleware);
app.use(continueMiddleware);
app.use(validarDatosMiddleware);

app.get('/items', (req, res) => {
    res.json(items);
});

app.get('/items/:id', (req, res) => {
    const itemId = parseInt(req.params.id);
    const item = items.find((item) => item.id === itemId);
    if (item) {
        res.json(item);
    } else {
        res.status(404).json({ mensaje: 'Elemento no encontrado' });
    }
});

app.post('/items', (req, res) => {
    const newItem = req.body;
    newItem.id = items.length + 1;
    items.push(newItem);
    res.status(201).json(newItem);
});

app.put('/items/:id', (req, res) => {
    const itemId = parseInt(req.params.id);
    const updatedItem = req.body;
    const index = items.findIndex((item) => item.id === itemId);
    if (index !== -1) {
        items[index] = updatedItem;
        res.json(updatedItem);
    } else {
        res.status(404).json({ mensaje: 'Elemento no encontrado' });
    }
});

app.delete('/items/:id', (req, res) => {
    const itemId = parseInt(req.params.id);
    const index = items.findIndex((item) => item.id === itemId);
    if (index !== -1) {
        items.splice(index, 1);
        res.status(204).send();
    } else {
        res.status(404).json({ mensaje: 'Elemento no encontrado' });
    }
});

app.listen(port, () => {
    console.log(`Servidor express escuchando en el puerto ${port}`);
});
