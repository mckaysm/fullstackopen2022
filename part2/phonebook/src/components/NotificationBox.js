//Displays different style for succesful/unsuccesful operations
const NotificationBox = ({notification, successful}) => {
  let successfulStyle={
    color: 'green',
    background: 'lightgrey',
    fontSize: '20px',
    borderStyle: 'solid',
    borderRadius: '5px',
    padding: '10px',
    marginBottom: '10px',
  }

  let failureStyle={
    ...successfulStyle,
    color: 'red'
  }

  if (notification === null || notification.message === null) {
    return null
  }
  console.log("succesful", notification.successful)
  return (
    <div style={notification.successful ? successfulStyle : failureStyle}>
      {notification.message}
    </div> 
  )
}

export default NotificationBox