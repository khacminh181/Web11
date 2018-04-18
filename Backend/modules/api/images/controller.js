const imageModel = require("./model");

const createImage = ({ imageURL, title, description, createdBy }) =>
    new Promise((resolve, reject) => {
        imageModel.create({
            imageURL,
            title,
            description,
            createdBy
        })
            .then(data => resolve({ id: data._id })) // chi tra lai id
            .catch(err => reject(err))
    });

const getAllImages = page => new Promise((resolve, reject) => {
    imageModel.find({
        "active": true
    })
        .sort({ createdAt: -1 }) //thoi gian giam dan
        .skip((page - 1) * 20) // bo qua
        .limit(20)
        .select("_id imageURL title description createdAt createdBy view like")
        .exec()
        .then(data => resolve(data))
        .catch(err => reject(err))
});

const getImage = id => new Promise((resolve, reject) => {
    imageModel
        .findOne({
            "active": true,
            _id: id
        })

        .select("_id imageURL title description createdAt createdBy view like comment")
        .exec()
        .then(data => resolve(data))
        .catch(err => reject(err))
});

const updateImage = (id, { imageURL, title, description }) =>
    new Promise((resolve, reject) => {
        imageModel.update({
            _id: id
        }, {
                imageURL,
                title,
                description,
                createdBy
            })
            .then(data => resolve({ id: data._id })) // chi tra lai id
            .catch(err => reject(err))
    });

const deleteImage = id => new Promise((resolve, reject) => {
    imageModel.update({
        _id: id
    }, {
            active: false
        })
        .then(data => resolve({ id: data._id })) // chi tra lai id
        .catch(err => reject(err))

})

const addComment = (imageId, { createdBy, content }) =>
    new Promise((resolve, reject) => {
        imageModel
            .update({
                _id: imageId
            }, {
                    $push: { comment: { createdBy, content } }
                }
            )
            .then(data => resolve(data)) // chi tra lai id
            .catch(err => reject(err))
    })

const deleteComment = (imageId, commentId) =>
    new Promise((resolve, reject) => {
        imageModel
            .update({
                _id: imageId
            }, {
                    $pull: { comment: { _id: commentId } }
                }
            )
            .then(data => resolve(data))
            .catch(err => reject(err))
    })

const likeImage = id =>
    new Promise((resolve, reject) => {
        imageModel
            .update({
                _id: id
            }, {
                    $inc: {
                        'like': 1
                    }
                })
            .then(data => resolve(data))
            .catch(err => reject(err))
    })

const unlikeImage = id =>
    new Promise((resolve, reject) => {
        imageModel
            .update({
                _id: id
            }, {
                    $inc: {
                        'like': -1
                    }
                })
            .then(data => resolve(data))
            .catch(err => reject(err))
    })

//TODO Like image
//TODO unLike image
//TODO delete comment : $pull: { comment: {_id: commentId}}

module.exports = {
    createImage,
    getAllImages,
    getImage,
    updateImage,
    deleteImage,
    addComment,
    deleteComment,
    likeImage,
    unlikeImage
}