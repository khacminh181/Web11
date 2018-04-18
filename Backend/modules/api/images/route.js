const express = require("express");
const router = express.Router();

const imageController = require('./controller');

router.get('/', (req, res) => {
    imageController
        .getAllImages(req.query.page || 1)
        .then(images => res.send(images))
        .catch(err => {
            console.error(err);
            res.status(500).send(err)
            //200
            //300 redirect
            //404 not found
            //55
        })
});

router.post("/", (req, res) => {
    imageController
        .createImage(req.body)
        .then(result => res.send(result))
        .catch(err => {
            console.error(err);
            res.status(500).send(err);
        });
});

router.get('/:id', (req, res) => {
    imageController
        .getImage(req.params.id)
        .then(images => res.send(images))
        .catch(err => {
            console.error(err);
            res.status(500).send(err)
            //200
            //300 redirect
            //404 not found
            //55
        })
});

router.put('/:id', (req, res) => {
    imageController.updateImage(req.params.id, req.body)
        .then(id => res.send(id))
        .catch(err => {
            console.log(err);
            res.status(500).send(err);
        });
});

router.delete('/:id', (req, res) => {
    imageController.deleteImage(req.params.id)
        .then(data => res.send(data))
        .catch(err => {
            console.log(err);
            res.status(500).send(err);
        });
});

router.post('/:id/like', (req, res) => {
    imageController.likeImage(req.params.id)
        .then(data => res.send(data))
        .catch(err => {
            console.log(err);
            res.status(500).send(err);
        });
});

router.delete('/:id/like', (req, res) => {
    imageController.unlikeImage(req.params.id)
        .then(data => res.send(data))
        .catch(err => {
            console.log(err);
            res.status(500).send(err);
        });
});

router.post("/:imageId/comment", (req, res) => {
    imageController
        .addComment(req.params.imageId, req.body)
        .then(id => res.send(id))
        .catch(err => {
            console.error(err);
            res.status(500).send(err);
        });
});

router.delete('/:id/comment/:commentid', (req, res) => {
    imageController.deleteComment(req.params.id, req.params.commentid)
        .then(_id => res.send(_id))
        .catch(err => {
            console.log(err);
            res.status(500).send(err);
        });
});

module.exports = router;