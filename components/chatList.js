import React, {Component} from 'react';
import {FlatList} from 'react-native';
import Fire from '../fire';
import {CHANNELS, activeUserList, USERS} from '../constants';
import ChatItem from './chatItem';

const channelMock = {
  activeUserList,
};

class ChatList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      channels: [],
    };
  }

  componentDidMount() {
    // Uncomment to add one more item in chat list
    this.createChannel();
    this.loadChannels();
  }

  loadChannels = () => {
    // Load channel directly (in case want to create chat rooms)
    // Fire.shared.on(CHANNELS, (channel) =>
    //   this.setState((previousState) => ({
    //     channels: [...previousState.channels, channel],
    //   })),
    // );

    Fire.shared.on(
      `${USERS}/${Fire.shared.getUser._id}/${CHANNELS}`,
      (channelId) => {
        Fire.shared.once(`${CHANNELS}/${channelId}`, (channel) => {
          this.setState((previousState) => ({
            channels: [...previousState.channels, channel],
          }));
        });
      },
    );
  };

  createChannel = () => {
    Fire.shared.createChannel(channelMock);
  };

  onPress = (channel) => () => {
    const {_id} = channel;
    this.props.navigation.navigate('Chat', {channelId: _id});
  };

  renderItem = ({item}) => {
    return (
      <ChatItem
        channel={item}
        key={item._id}
        leftAvatar={{source: {uri: item.activeUserList[0].avatar}}}
        title={item.activeUserList[1].name}
        bottomDivider
        onPress={this.onPress(item)}
        chevron
      />
    );
  };

  render() {
    return (
      <FlatList
        data={this.state.channels}
        keyExtractor={(item) => item._id}
        renderItem={this.renderItem}
      />
    );
  }
}

export default ChatList;
