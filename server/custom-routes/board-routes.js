let Boards = require('../models/board')
let Lists = require('../models/list')
let Tasks = require('../models/task')
let Comments = require('../models/comment')

module.exports = {
    getListsByBoardId: {
        path: '/boards/:boardId/lists',
        reqType: 'get',
        method(req, res, next) {
            let action = 'Find Lists By Board'
            Lists.find({ boardId: req.params.boardId })
                .then(lists => {
                    res.send(handleResponse(action, lists))
                }).catch(error => {
                    return next(handleResponse(action, null, error))
                })
        }
    },
    getTasksByListId: {
        path: '/boards/:boardId/lists/:listId/tasks',
        reqType: 'get',
        method(req, res, next) {
            let action = 'Find Tasks By List'
            Tasks.find({ listId: req.params.listId })
                .then(tasks => {
                    res.send(handleResponse(action, tasks))
                }).catch(error => {
                    return next(handleResponse(action, null, error))
                })
        }
    },
    getCommentsByTaskId: {
        path: '/boards/:boardId/lists/:listId/tasks/:taskId/comments',
        reqType: 'get',
        method(req, res, next) {
            let action = 'Find Comments By Task'
            Comments.find({ taskId: req.params.taskId })
                .then(comments => {
                    res.send(handleResponse(action, comments))
                }).catch(error => {
                    return next(handleResponse(action, null, error))
                })
        }
    }
}




function handleResponse(action, data, error) {
    var response = {
        action: action,
        data: data
    }
    if (error) {
        response.error = error
    }
    return response
}
