const { Router } = require('express');
const router = Router();

router.use('/game', require('./game'));

module.exports = router;
