let Boards = require('../models/board')
let Lists = require('../models/list')

module.exports = {
  userBoards: {
    path: '/userboards',
    reqType: 'get',
    method(req, res, next){
      let action = 'Find User Boards'
      Boards.find({creatorId: req.session.uid})
        .then(boards => {
          res.send(handleResponse(action, boards))
        }).catch(error => {
          return next(handleResponse(action, null, error))
        })
    }
  },
  sharedBoards: {
    path: '/sharedBoards',
    reqType: 'get',
    method(req, res, next){
      let action = 'Find User Boards'
      Boards.find({collaborators: { $in: req.session.uid}})
        .then(boards => {
          res.send(handleResponse(action, boards))
        }).catch(error => {
          return next(handleResponse(action, null, error))
        })
    }
  },

  // /${model.endpoint}/:id?


  boardLists: {
    path: '/boardlists',
    reqType: 'get',
    method(req, res, next){
      let action = 'Find Board Lists'
      Lists.find({boardId: req.params.id})
        .then(lists => {
          res.send(handleResponse(action, lists))
        }).catch(error => {
          return next(handleResponse(action, null, error))
        })
    }
  },
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