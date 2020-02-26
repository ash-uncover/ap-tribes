import { action } from 'typesafe-actions'

import {
  Actions as SocketActions,
  ActionsTypes as SocketActionsTypes
} from '../store/socket/actions'
import { faHeartbeat } from '@fortawesome/free-solid-svg-icons'

const CONN_TIMEOUT = 1000

let _socket: WebSocket
let _pingTimeout: any

const SocketService = {

  connect(dispatch: any, url: string) {
    dispatch(SocketActions.socketConnectFetch())

    _socket = new WebSocket(url)

    _socket.onopen = function() {
      dispatch(SocketActions.socketConnectSuccess())

      this.onmessage = (event: any) => {
        const actionData = JSON.parse(event.data)
        switch (actionData.type) {
          case SocketActionsTypes.SOCKECT_CONNECTION_CHECK: {
            SocketService.heartbeat(dispatch)
            _socket.send(event.data)
            break
          }
          default: {
            dispatch(action(actionData.type, actionData.payload))
            break
          }
        }
      }
    }

    _socket.onerror = (error) => {
      dispatch(SocketActions.socketConnectFailure())
    }
  },

  heartbeat: (dispatch: any) => {
    clearTimeout(_pingTimeout)
    _pingTimeout = setTimeout(() => {
      SocketService.close(dispatch)
    }, 30000 + 10000)
  },

  send: (dispatch: any, data: any) => {
    try {
      _socket.send(JSON.stringify(data))
    } catch (error) {
      SocketService.close(dispatch)
    }
  },

  close: (dispatch: any) => {
    clearTimeout(_pingTimeout)
    _socket.close()
    dispatch(SocketActions.socketConnectionLost())
  }
}

export default SocketService