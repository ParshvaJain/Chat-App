import React, { useState } from 'react';

function SendMessageForm(props) {
	const [message, setMessage] = useState('');

	function handleChange(e) {
		setMessage(e.target.value);
	};

	function handleSubmit(e) {
		e.preventDefault();

		props.sendMessage(message);
		setMessage('');
	};

	return (
		<form className="send-message-form" onSubmit={handleSubmit}>
			<input
				placeholder="Type your message and press ENTER"
				type="text"
				onChange={handleChange}
				value={message} />
		</form>
	);
};

export default SendMessageForm;
