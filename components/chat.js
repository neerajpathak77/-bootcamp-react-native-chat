import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import {GiftedChat} from 'react-native-gifted-chat';
import Fire from '../fire';
import {MESSAGES} from '../constants';

class Chat extends Component {
  state = {
    messages: [],
    channel: this.props.route.params.channelId,
  };

  componentDidMount() {
    Fire.shared.on(Fire.shared.messagesNode(this.state.channel), (message) => {
      Fire.shared.setLastSeenMessage(this.state.channel, message); // Add last message to channel

      this.setState((previousState) => ({
        messages: GiftedChat.append(previousState.messages, message),
      }));
    });
  }

  componentWillUnmount() {
    Fire.shared.off(MESSAGES);
  }

  render() {
    const {messages, channel} = this.state;

    return (
      <GiftedChat
        messages={messages}
        onSend={Fire.shared.send(channel)}
        user={Fire.shared.getUser}
      />
    );
  }
}
const styles = StyleSheet.create({});
export default Chat;
