import { action } from 'typesafe-actions'

export const ActionsTypes = {
  SOCKECT_CONNECT_FETCH: '@@SOCKET/CONNECT_FETCH',
  SOCKECT_CONNECT_SUCCESS: '@@SOCKET/CONNECT_SUCCESS',
  SOCKECT_CONNECT_FAILURE: '@@SOCKET/CONNECT_FAILURE',
}

export const Actions = {
  socketConnectFetch: () => action(ActionsTypes.SOCKECT_CONNECT_FETCH),
  socketConnectSuccess: () => action(ActionsTypes.SOCKECT_CONNECT_SUCCESS),
  socketConnectFailure: () => action(ActionsTypes.SOCKECT_CONNECT_FAILURE)
}