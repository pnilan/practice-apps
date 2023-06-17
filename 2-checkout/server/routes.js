const responsesController = require('./controllers/responses');
const router = require('express').Router();

router.get('/responses', responsesController.get);

router.post('/responses', responsesController.post);

router.put('/responses/:id', responsesController.put);

module.exports = router;