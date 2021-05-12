import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  TextInput,
} from 'react-native';
import {
  HomeScreens,
  HomeStackParamList,
} from '../../navigators/HomeStackNavigators';
import { StackNavigationProp } from '@react-navigation/stack';
import axios from 'axios';
import { Colors } from 'react-native/Libraries/NewAppScreen';

type MessageScreenNavigationProps = StackNavigationProp<
  HomeStackParamList,
  HomeScreens.Message
>;
export type MessageParams = {
  userID: string;
};

interface MessageScreenProps {
  route: { params: MessageParams };
  navigation: MessageScreenNavigationProps; // 네비게이션 속성에 대한 타입
}
interface IMessage {
  sendingUserID: string;
  receivedUserID: string;
  contents: string;
  title: string;
}

const MessageScreen: React.FunctionComponent<MessageScreenProps> = (props) => {
  const { navigation, route } = props;
  const { params } = route;
  const { userID } = params;
  console.log(userID);

  const [message, setMessage] = useState<IMessage>({
    sendingUserID: '',
    receivedUserID: '',
    contents: '',
    title: '',
  });

  const sendMessage = async () => {
    const result = await axios.post('http://localhost:4000/api/createMessage', {
      params: {
        sendingUserID,
        receivedUserID,
        contents,
        title,
      },
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.messageBox}>
        <Text>messages</Text>
      </View>
      <View style={styles.sendMessage}>
        <TextInput placeholder="send message"></TextInput>
        <TouchableOpacity style={styles.button}>
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
  messageBox: {
    height: 500,
    margin: 10,
    borderWidth: 1,
    borderColor: '#1388c2',
  },
  sendMessage: {
    right: 0,
    margin: 10,
    flexDirection: 'row',
    alignItems: 'flex-end',
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

export default MessageScreen;
