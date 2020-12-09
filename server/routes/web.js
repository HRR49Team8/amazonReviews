const router = require('express').Router();
const path = require('path');

router.get('*/:id', (req, res) => res.sendFile(path.join(__dirname, '../../client/dist/index.html')));
router.get(`/${process.env.LOADERIO}`, (req, res) => res.sendFile(path.join(__dirname, `/${process.env.LOADERIO}.txt`)));

module.exports = router;
