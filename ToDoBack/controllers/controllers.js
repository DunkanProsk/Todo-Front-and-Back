const Todo = require('../models/todo');
const Users = require('../models/users');

module.exports.getAll = (req, res) => {
    Todo.find({}, (err, items) => {res.send(items)});
};

module.exports.getUsers = (req, res) => {
    Users.findOne({login: req.body.login, password: req.body.password}, function(err, doc){
        if(doc === null) {
            res.status(409).json({massage: 'User не существует!'});
            console.log('User не существует!');
        } else {
            res.status(200).json({massage: 'Успешный вход!'});
            console.log('Успешный вход!');
        }
    });
};

module.exports.createUser = (req, res) => {
    Users.findOne({login: req.body.login}, function(err, doc){
        if(doc === null) {
            Users.create(req.body).then(() => {
                res.status(200).json({massage: 'Регистрация успешна!'});
                console.log('Регистрация успешна!');
            });
        } else {
            console.log(doc);
            res.status(409).json({massage: 'User существует!'});
            console.log('User существует!');
        }
    });
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