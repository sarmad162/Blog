var express = require('express');
var router = express.Router();

const controller = require('../controllers/userController');

// router.use((req, res, next) => {
//     console.log('User_Time : ', Date.now());
//     next();
// })


// const meddelWare1 = (req, res, next) => {
//     console.log('meddelWare1 :', Date.now());
//     next();
// };

// const meddelWare2 = (req, res, next) => {
//     console.log('meddelWare2 : ', Date.now());
//     next();
// };

// /* GET users listing. */
// router.get('/', [meddelWare1, meddelWare2], function(req, res, next) {
//     console.log(req.query.limit);
//     res.send('respond with a resource');
// });

// router.get('/:id', function(req, res, next) {

//     res.send(`User Id is : ${req.params.id}`);
// });

// router.post('/', (req, res, next) => {
//     res.send(req.body);
// });

router.post('/', controller.create);

router.get('/', controller.list);

router.get('/:id', controller.show);

router.put('/:id', controller.update);

router.delete('/:id', controller.delete);



module.exports = router;