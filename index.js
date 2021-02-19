const mongose = require('./app/conection/mongose');
const cors = require('cors');
const express = require('express');
const bodyParser = require("body-parser");

const serviceServices = require('./services/serviceServices');
const Service = require('./model/service');

const app = express();

const port = 3000;

//add dependencias to app
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use((err, req, res, next) => {
    if (res.headersSent) return next(err);
    res.status(500);
    res.render({ error: err });
});

//get methods
app.get('/', function (req, res) {
    res.send('HelloTest Api Rest')
})

app.get('/test/services', function (req, res) {

    serviceServices.listServices(res);

});

app.get('/test/service/:id', function (req, res) {

    let id = req.params.id;

    serviceServices.findById(res, id);

});

//post methods

app.post("/test/service", (req, res) => {
    let service = new Service();
    service.nombre = req.body.nombre;
    service.descripcion = req.body.descripcion;
    service.codigo = req.body.codigo;
    service.valor = req.body.valor;

    service.save((err, serviceResponse) => {
        if (err) {
            console.log(err)
            return res
                .status(500)
                .send({ message: `Error making POST request` });
        }
        res.status(200).send(serviceResponse);
    });
});

app.post('/test/service/calification/:id', (req, res) => {

    let id = req.params.id;

    let calification = req.body;

    Service.findOne({ _id: id }, (err, findService)=>{

        findService.calificaciones.push({
            nombre : calification.nombre,
            correo : calification.correo,
            valor: calification.valor
        });
        
        
        findService.save((err, serviceResponse) => {
            if (err) {
                console.log(err)
                return res
                .status(500)
                .send({ message: `Error saving CALIFICACION` });
            }
            calcularPromedio(serviceResponse);
            res.status(200).send(serviceResponse);
        });
    });

})

// update
app.put("/test/service", (req, res) => {
    let service = new Service();
    let id = req.body._id;
    service.nombre = req.body.nombre;
    service.descripcion = req.body.descripcion;
    service.codigo = req.body.codigo;
    service.valor = req.body.valor;

    let newvalues = {
        $set:
        {
            nombre: service.nombre,
            descripcion: service.descripcion,
            codigo: service.codigo,
            valor: service.valor
        }
    };
    //se modifica el servicio con base a su id y se asignan los nuevos valores
    Service.updateOne({ _id: id }, newvalues, (err, serviceResponse) => {
        if (err) {
            console.log(err)
            return res
                .status(500)
                .send({ message: `Error making UPDATE` });
        }
        res.status(200).send(serviceResponse);
    });
});

//delete
app.delete("/test/service/:id", (req, res) => {
    let id = req.params.id;

    Service.deleteOne({ _id: id }, (err,response) => {
        if (err) {
            res.status(500).send({ message: `Error making DELETE` });
        }
        res.status(200).send(response);
    })

});


function calcularPromedio(serviceResponse) {
    let calificaciones = serviceResponse.calificaciones;

    let suma = 0;

    calificaciones.forEach(calificacion =>{
        suma += calificacion.valor;
    })
    sumaPromedio = suma /calificaciones.length;
    let newvalues = {
        promedioCalificacion : sumaPromedio
    }
    //se modifica el servicio con base a su id y se asignan los nuevos valores
    Service.updateOne({ _id: serviceResponse._id }, newvalues, (err, serviceResponse) => {
        if (err) {
            console.log(err);
        }
    });

}


app.listen(port, () => {
    console.log(`Node server running on http://localhost:${port}`);
})