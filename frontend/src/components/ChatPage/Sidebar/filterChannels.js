const filterChannel = (chat, channels, setDummyChannels) => {
  if (channels === undefined || chat.length === 0) {
    setDummyChannels(channels);
    return;
  }
  let newChannels = [];
  for (let i = 0; i < channels.length; i++) {
    let flag = 0;
    const channelMsg = channels[i].channelName.toLowerCase();
    chat = chat.toLowerCase();
    for (let j = 0; j < chat.length; j++) {
      if (chat[j] !== channelMsg[j]) {
        flag = 1;
        break;
      }
    }
    if (flag === 1) {
      continue;
    }
    newChannels.push(channels[i]);
  }
  setDummyChannels(newChannels);
};

export default filterChannel;
