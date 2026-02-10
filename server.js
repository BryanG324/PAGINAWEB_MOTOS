const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/ktmDukeDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const subscriberSchema = new mongoose.Schema({
    email: { type: String, required: true }
});

const Subscriber = mongoose.model('Subscriber', subscriberSchema);

app.post('/subscribe', async (req, res) => {
    const { email } = req.body;
    const newSubscriber = new Subscriber({ email });

    try {
        await newSubscriber.save();
        res.status(201).send('Suscripción exitosa');
    } catch (error) {
        res.status(400).send('Error al suscribirse');
    }
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});


