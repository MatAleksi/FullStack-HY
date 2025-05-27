import { useContext } from 'react'
import { useNotificationValue } from './NotificationContext'

const Notification = () => {
  const notification = useNotificationValue()
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  }
  console.log('notification', notification)
  if(notification === ''){
    console.log('notification is empty')
    return null
  }

  return (
    <div style={style}>
      {notification}
    </div>
  )
}

export default Notification
