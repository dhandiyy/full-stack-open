const Notification = ({message, status}) => {
	if (message === null){
		return null;
	}

	const style = {
		base: {
			backgroundColor: 'lightgrey',
			fontSize: '20px',
			padding: '5px',
			borderStyle: 'solid',
			borderRadius: '5px',
			margin: '10px',
		},
		success: {color: 'green'},
		error: {color: 'red'}
	}

	return (
		<div style={{
			...style.base,
			...(status === 'success'? style.success: {}),
			...(status === 'error'? style.error: {}),
		}}>
			{message}
		</div>

	)

}
export default Notification;