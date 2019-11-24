import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import Message from './Message';

class MessageList extends Component {

    componentWillUpdate() {
        const node = ReactDOM.findDOMNode(this);
        this.shouldScrollToBottom = node.scrollTop + node.clientHeight + 100 >= node.scrollHeight;;
    }

    componentDidUpdate() {
        if (this.shouldScrollToBottom) {
            const node = ReactDOM.findDOMNode(this);
            node.scrollTop = node.scrollHeight;
        }
    }

    render() {
        return (
            <div className='message-list'>
                {this.props.messages.map((message, index) => {
                    const completeMessage = [];
                    message.parts.map(part => completeMessage.push(part.payload.content));
                    return <Message key={index} senderId={message.senderId} message={completeMessage} />
                })}
            </div>
        )
    }
};

export default MessageList;
