const service = require('../model/service');

module.exports = {

    listServices: function (res) {
        
        service.find({}, (err, services) => {
            if (err) {
                res.status(500).send('Error findAll services' + err);
            }
            res.status(200).send(services);
        });
    },

    findById: function (res, id) {
        service.findOne({ _id: id }, (err, serviceResponse) => {
            if (!serviceResponse){
                return res.status(500).send({ message: `service NO exist` });
            }
            res.status(200).send(serviceResponse);
        });
    }

};

