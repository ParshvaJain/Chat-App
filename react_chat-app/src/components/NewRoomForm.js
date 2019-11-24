import React, { useState } from 'react';

function NewRoomForm(props) {
	const [roomName, setRoomName] = useState('');

	function handleChange(e) {
		setRoomName(e.target.value);
	};

	function handleSubmit(e) {
		e.preventDefault();

		props.createRoom(roomName);
		setRoomName('');
	};

	return (
		<div className="new-room-form">
			<form onSubmit={handleSubmit}>
				<input
					type="text"
					placeholder="Create a Room"
					required
					onChange={handleChange}
					value={roomName} />
				<button id="create-room-btn" type="submit">+</button>
			</form>
		</div>
	);
};

export default NewRoomForm;
