const router = require('express').Router();
const path = require('path');

router.get(`/${process.env.LOADERIO}.txt`, (req, res) => res.sendFile(path.join(__dirname, `/${process.env.LOADERIO}.txt`)));
router.get('/:id', (req, res) => res.sendFile(path.join(__dirname, '../../client/dist/index.html')));

module.exports = router;
