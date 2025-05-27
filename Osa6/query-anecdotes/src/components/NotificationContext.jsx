import { createContext, useContext, useReducer } from 'react'

const notificationReducer = (state, action) => {
    switch (action.type) {
      case 'SHOW':
        return action.payload
      case 'HIDE':
        return ''
      default:
        return state
    }
  }

const NotificationContext = createContext()

export const NotificationProvider = (props) => {
    const [notification, dispatch] = useReducer(notificationReducer, '')

    return (
        <NotificationContext.Provider value={[notification, dispatch]}>
            {props.children}
        </NotificationContext.Provider>
    )
}

export const useNotificationValue = () => {
    const notificationValue = useContext(NotificationContext)
    return notificationValue[0]
}

export const useNotificationDispatch = () => {
    const notificationDispatch = useContext(NotificationContext)
    return notificationDispatch[1]
}

export default NotificationContext