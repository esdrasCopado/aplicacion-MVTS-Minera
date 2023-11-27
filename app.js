const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();

const bcrypt=require('bcrypt');
const mongoose = require('mongoose');
const User = require('./public/js/user');
const RegistroMaterial = require('./public/js/registroMaterial');



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));

const mongo_url = "mongodb+srv://esdrascopado:pPpXEpWMGEQcHVxv@esdrasproyect.w2zkiud.mongodb.net/?retryWrites=true&w=majority";

async function connectToDB() {
    try {
        await mongoose.connect(mongo_url, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('Successfully connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error.message);
    }
}
connectToDB();

//metodo para registrar el usuario y contraseña en la base de datos
app.post('/register', async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = new User({ username, password });
        await user.save(); // Espera a que se complete el guardado

        res.status(200).send('USUARIO REGISTRADO');
    } catch (err) {
        res.status(500).send('ERROR AL REGISTRAR AL USUARIO');
    }
});
app.post('/RegistrarMaterial', async (req, res) => {
    const { numeroViaje,cantidad } = req.body;
    
    try {
        const opcionSeleccionada = req.body.selectMaterial;
        const fechaActual = new Date();
        
        console.log("registro de material")
        const nuevoRegistroMaterial  = new RegistroMaterial({
            numeroViaje: numeroViaje,
            tipoMaterial: opcionSeleccionada,
            peso:parseInt(cantidad),
            fecha: fechaActual
        });
        
        await nuevoRegistroMaterial.save(); // Espera a que se complete el guardado

        res.status(200).send('Material Registrado');
    } catch (err) {
        res.status(500).send('ERROR AL REGISTRAR el material');
    }
});

//metodo para autenticar a un usuario 
app.post('/authenticate', async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username }); // Busca un usuario por username en la base de datos

        if (!user) {
            res.status(500).send('EL USUARIO NO EXISTE');
            return;
        }

        const isPasswordCorrect = await user.isCorrectPassword(password); // Verifica la contraseña

        if (isPasswordCorrect) {
            if(username==="Admin"){
                res.redirect('/gerente.html');
            }else{
                res.redirect('/central.html');//da entrada al usuario al
            }
            
        } else {
            res.status(500).send('USUARIO Y/O CONTRASEÑA INCORRECTA');
        }
    } catch (err) {
        res.status(500).send('ERROR AL AUTENTICAR AL USUARIO');
    }
});
app.get('/mostrarReporte', async (req, res) => {
    try {
        
       
       const registros= await RegistroMaterial.find();

       if (registros.length === 0) {
        console.log('No hay registros en la base de datos.');
      } else {
        console.log('Hay registros en la base de datos.');
        // Haces algo con los registros aquí si es necesario
      }
      res.render('reporteMateriales', {registros});
      
     
    } catch (err) {
        console.error('Error al obtener los registros:', err);
        res.status(500).send('Error al obtener los registros');
    }
  });


app.listen(3000, () => {
  console.log('Servidor iniciado en el puerto 3000');
});

module.exports = app;
