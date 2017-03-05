import React, {Component} from 'react';
import ReactDOM from 'react-dom';

class MessageForm extends Component{
    render(){
        return (
            <div>
            <form onSubmit={this.onSubmit.bind(this)}>
            <input type = "text" className="form-control" ref="text" placeholder="Please Type a Message.."/>
            </form>
            </div>
        )
    }

    onSubmit(e){
        e.preventDefault();
        this.props.emit('messageAdded',{
            timeStamp:Date.now(),
            text:this.refs.text.value.trim(),
            user: this.props.user.name
        });

        //clear form
        this.refs.text.value = '';
    }
}

export default MessageForm