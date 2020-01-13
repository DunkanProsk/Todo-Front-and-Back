const Todo = require('../models/todo');

module.exports.getAll = (req, res) => {
    Todo.find({}, (err, items) => {res.send(items)});
};

module.exports.createDo = (req, res) => {
    Todo.create(req.body).then(() => {
        res.status(200).json({
            massage: 'Сохранен объект ToDo!',
            list: Todo.find({}, (err, items) => {res.send(items)})
        });
    });
};

module.exports.updateDo = (req, res) => {
    const update = {
        name: req.body.name,
        checked: req.body.checked
    };

    Todo.findOneAndUpdate(
        {_id: req.params.id},
        {$set: update},
        {new: true}
    ).then(() => {
        res.status(200).json({
            massage: 'Задача отредактирована!',
            list: Todo.find({}, (err, items) => {res.send(items)})
        });
    });
};

module.exports.deleteDo = (req, res) => {
    Todo.remove({_id: req.params.id}).then(() => {
        res.status(200).json({
            massage: 'Задача удалена!',
            list: Todo.find({}, (err, items) => {res.send(items)})
        });
    });
};

module.exports.deleteAll = (req, res) => {
    Todo.remove({}).then(() => {
        res.status(200).json({
            massage: 'Задачи удалены!',
            list: Todo.find({}, (err, items) => {res.send(items)})
        });
    });
};