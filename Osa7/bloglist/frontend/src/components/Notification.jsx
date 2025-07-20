import { use } from 'react'
import { useSelector } from 'react-redux'
import { Alert } from '@mui/material'

const Notification = () => {
  const visible = useSelector(state => {
    if (state.notification === '') {
      return false
    }
    return true
  })
  const notification = useSelector(state => {
    if (state.notification === '') {
      return ''
    }
    return state.notification
  })

  return (
    <div>
      {visible && (
        <Alert severity="info" sx={{ m: 1 }}>
          {notification}
        </Alert>
      )}
    </div>
  )
}

export default Notification
