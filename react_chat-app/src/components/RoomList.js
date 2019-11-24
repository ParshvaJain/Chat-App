import React, { Component } from 'react';

function RoomList(props) {
	const orderedRooms = [...props.rooms,].sort((a,b) => a.id - b.id);

	return (
		<div className='rooms-list'>
			<h3>Choose a Room</h3>
			<ul>
			{orderedRooms.map(room => {
			const active = props.roomId === room.id ? 'active' : '';

			return (
				<li key={room.id} className={'room'}>
					<a
						onClick={() => { props.subscribeToRoom(room.id) }}
						href='#'
						className={active}>
						# {room.name}
						</a>
				</li>
			)})}
			</ul>
		</div>
	)
};

export default RoomList;
