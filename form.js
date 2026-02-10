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

const contactSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    message: { type: String, required: true }
});

const ContactMessage = mongoose.model('ContactMessage', contactSchema);

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

app.post('/contact', async (req, res) => {
    const { name, email, message } = req.body;
    const newContactMessage = new ContactMessage({ name, email, message });

    try {
        await newContactMessage.save();
        res.status(201).send('Mensaje enviado con éxito');
    } catch (error) {
        console.error(error); 
        res.status(400).send('Error al enviar el mensaje');
    }
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
