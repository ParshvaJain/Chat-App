import React, { Component } from 'react';

const Message = props => (
    <div className='message' key={props.index}>
        <div className='message-username'>{props.senderId}</div>
        <div className='message-text'>{props.message.join(" ")}</div>
    </div>
)

export default Message;
