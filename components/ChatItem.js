import React, {Component} from 'react';
import {ListItem} from 'react-native-elements';
import Fire from '../fire';

class ChatItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      badge: -1,
      recentMessage: '',
    };
  }

  componentDidMount() {
    this.getBadgeAndMessage(this.props.channel, Fire.shared.getUser);
  }

  getBadgeAndMessage = (channel, user) => {
    Fire.shared.getUnseenMessages(channel, user, (message) => {
      this.setState((previousState) => ({
        badge: previousState.badge + 1,
        recentMessage: message.text,
      }));
    });
  };

  render() {
    return (
      <ListItem
        {...this.props}
        badge={this.state.badge > 0 ? {value: this.state.badge} : null}
        subtitle={this.state.recentMessage}
      />
    );
  }
}

export default ChatItem;
