import React, { Component } from 'react';
import { ChatManager, TokenProvider } from '@pusher/chatkit-client';

import MessageList from './components/MessageList';
import SendMessageForm from './components/SendMessageForm';
import RoomList from './components/RoomList';
import NewRoomForm from './components/NewRoomForm';

import { instanceLocator, tokenUrl, userId } from './Chatkit';

class App extends Component {
	constructor() {
		super();

		this.state = {
			roomId: null,
			messages: [],
			joinableRooms: [],
			joinedRooms: []
		};

		this.sendMessage = this.sendMessage.bind(this);
		this.subscribeToRoom = this.subscribeToRoom.bind(this);
		this.getRooms = this.getRooms.bind(this);
		this.createRoom = this.createRoom.bind(this);
	}

	componentDidMount() {
		const chatManager = new ChatManager({
			instanceLocator,
			userId,
			tokenProvider: new TokenProvider({ url: tokenUrl })
		});

		chatManager.connect()
			.then(currentUser => {
				this.currentUser = currentUser;

				this.getRooms();
			})
	}

	getRooms() {
		this.currentUser.getJoinableRooms()
		.then(joinableRooms => {
			this.setState({
				joinableRooms,
				joinedRooms: this.currentUser.rooms
			})
		})
	}

	subscribeToRoom(roomId) {
		this.setState({
			messages: []
		})

		this.currentUser.subscribeToRoomMultipart({
			roomId: roomId,
			hooks: {
				onMessage: message => {
					this.setState({
						messages: [...this.state.messages, message]
					});
				}
			}
		})
		.then(room => {
			this.setState({
				roomId: room.id
			});
			this.getRooms()
		});
	}

	sendMessage(text) {
		this.currentUser.sendMessage({
			text,
			roomId: this.state.roomId
		})
	}

	createRoom(name) {
		this.currentUser.createRoom({
			name
		})
		.then(room => this.subscribeToRoom(room.id));
	}


	render() {
		return (
			<div className='app'>
				<RoomList
					roomId={this.state.roomId}
					subscribeToRoom={this.subscribeToRoom}
					rooms={[...this.state.joinableRooms, ...this.state.joinedRooms]} />
				<MessageList messages={this.state.messages} />
				<SendMessageForm sendMessage={this.sendMessage} />
				<NewRoomForm createRoom={this.createRoom} />
			</div>
		)
	}
};

export default App;
