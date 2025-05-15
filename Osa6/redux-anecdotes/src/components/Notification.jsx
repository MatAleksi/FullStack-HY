import { useSelector } from 'react-redux'


const Notification = () => {
  const visible = useSelector(state => {
    console.log(state.notification)
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
    border: 'solid',
    padding: 10,
    borderWidth: 1
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