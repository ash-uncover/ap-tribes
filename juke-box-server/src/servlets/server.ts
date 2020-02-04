import * as express from 'express'
import Logger from 'ap-utils-logger'

import { getUsers, postUser, getUser, putUser, deleteUser, getUserMemberships } from './rest/users'
import { getTribes, postTribe, getTribe, putTribe, deleteTribe, getTribeMemberships } from './rest/tribes'
import { postMembership, getMembership, putMembership, deleteMembership } from './rest/memberships'

const LOGGER = new Logger('server')

const server = express()

// Users
server.get('/rest/users', getUsers)
server.post('/rest/users', postUser)
server.get('/rest/users/:userId', getUser)
server.put('/rest/users/:userId', putUser)
server.del('/rest/users/:userId', deleteUser)
server.get('/rest/users/:userId/memberships', getUserMemberships)

// Tribes end point
server.get('/rest/tribes', getTribes)
server.post('/rest/tribes', postTribe)
server.get('/rest/tribes/:tribeId', getTribe)
server.put('/rest/tribes/:tribeId', putTribe)
server.del('/rest/tribes/:tribeId', deleteTribe)
server.get('/rest/tribes/:tribeId/memberships', getTribeMemberships)

// Memberships end point
server.post('/rest/memberships/', postMembership)
server.get('/rest/memberships/:membershipId', getMembership)
server.put('/rest/memberships/:membershipId', putMembership)
server.del('/rest/memberships/:membershipId', deleteMembership)

const PORT = process.env.PORT || 3090;

server.listen(PORT, () => {
  LOGGER.debug(`Server is running in http://localhost:${PORT}`)
})

server.on('close', () => {
  LOGGER.debug('Server Shutting down')
})
