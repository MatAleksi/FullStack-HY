import { use } from 'react'
import { useSelector } from 'react-redux'

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

  const style = {
    backgroundColor: 'lightgrey',
    margin: '10px',
    padding: '10px',
    border: '2px solid',
    borderColor: 'black',
    borderRadius: '5px',
  }

  return (
    <div>
      {visible && (
        <div style={style}>
          {notification}
        </div>
      )}
    </div>
  )
}

export default Notification
