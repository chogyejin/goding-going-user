import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import {
  HomeScreens,
  HomeStackParamList,
} from '../../../navigators/HomeStackNavigators';
import { StackNavigationProp } from '@react-navigation/stack';
import axios from 'axios';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import AsyncStorage from '@react-native-community/async-storage';

type MessageDetailNavigationProps = StackNavigationProp<
  HomeStackParamList,
  HomeScreens.MessageDetail
>;
export type MessageDetailParams = {
  userID: string;
};

interface MessageDetailProps {
  route: { params: MessageDetailParams };
  navigation: MessageDetailNavigationProps; // 네비게이션 속성에 대한 타입
}
interface IMessage {
  title: string;
  contents: string;
  sendingUserID: string;
  receivedUserID: string;
}
const MessageDetail: React.FunctionComponent<MessageDetailProps> = (props) => {
  const [isCompletedLoading, setIsCompletedLoading] = useState<boolean>(false);
  const [messages, setMessages] = useState<IMessage[]>([]);

  const [sendingUserID, setSendingUserID] = useState<string>('');
  const [receivedUserID, setReceivedUserID] = useState<string>('');
  const [contents, setContents] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  //나 = asyncstorage의 userID -> sendingUserID
  //너 = 게시글 쓴 사람(board detail로부터 넘겨받은 userID) -> receivedUserID

  const { navigation, route } = props;
  const { params } = route;
  const { userID } = params;

  const sendMessage = async () => {
    console.log('send message');
    console.log('sendingUserID');
    console.log(sendingUserID);
    console.log('receivedUserID');
    console.log(receivedUserID);
    console.log('contents');
    console.log(contents);
    console.log('title');
    console.log(title);
    const result = await axios.post(
      'http://localhost:4000/api/createMessage',
      { 'Content-Type': 'application/json' },
      {
        params: {
          sendingUserID,
          receivedUserID,
          contents,
          title,
        },
      },
    );
    console.log(result);
    getMessage();
    navigation.navigate(HomeScreens.Message, {
      userID,
      // newMessageID: result.data.message.id,
    });
  };

  async function getMessage() {
    if (!sendingUserID) {
      //console.log('userID가 없어요');
      return;
    }
    const result = await axios.get('http://localhost:4000/api/messages', {
      params: {
        sendingUserID: sendingUserID,
        receivedUserID: userID,
      },
    });
    // console.log('result 반환 했어요');

    if (result && !isCompletedLoading) {
      setIsCompletedLoading(true);
      setMessages(result.data.messages);
    } else {
    }
  }
  // const moveMessage = (userID: string) => () => {
  //  navigation.navigate(HomeScreens.Message, { userID });
  // };

  useEffect(() => {
    async function setUser() {
      const asyncUserID = await AsyncStorage.getItem('userID');
      if (asyncUserID != null) {
        setSendingUserID(asyncUserID);
      }
      setReceivedUserID(userID);
    }
    setUser();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.sendMessage}>
        <TextInput
          style={styles.messageTitle}
          placeholder="title"
          returnKeyType="next"
          value={title}
          onChangeText={(text: string) => setTitle(text)}></TextInput>
        <TextInput
          style={styles.messageContent}
          placeholder="message"
          multiline={true}
          returnKeyType="next"
          value={contents}
          onChangeText={(text: string) => setContents(text)}></TextInput>
      </View>
      <View style={{ alignItems: 'flex-end', marginRight: 10 }}>
        <TouchableOpacity style={styles.button} onPress={sendMessage}>
          <Text style={styles.buttonText}>SEND</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
    backgroundColor: 'white',
  },
  sendMessage: {
    right: 0,
    marginTop: 50,
    flexDirection: 'column',
  },
  messageTitle: {
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'grey',
  },
  messageContent: {
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
    height: 400,
    flexShrink: 1,
    borderBottomWidth: 1,
    borderBottomColor: 'grey',
  },
  buttonText: {
    color: 'white',
  },
  button: {
    height: 20,
    width: 40,
    borderRadius: 5,
    alignItems: 'center',
    backgroundColor: '#1388c2',
  },
});

export default MessageDetail;
