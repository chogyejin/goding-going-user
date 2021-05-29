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
import { Input, Label, Item, InputGroup, Textarea } from 'native-base';
import {
  HomeScreens,
  HomeStackParamList,
} from '../../../navigators/HomeStackNavigators';
import { StackNavigationProp } from '@react-navigation/stack';
import axios from 'axios';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import AsyncStorage from '@react-native-community/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';

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
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    setDisabled(!(title && contents));
  }, [contents, title]);

  const { navigation, route } = props;
  const { params } = route;
  const { userID } = params;

  const sendMessage = async () => {
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
    getMessage();
    navigation.navigate(HomeScreens.Message, {
      userID,
    });
  };

  async function getMessage() {
    if (!sendingUserID) {
      return;
    }
    const result = await axios.get('http://localhost:4000/api/messages', {
      params: {
        sendingUserID: sendingUserID,
        receivedUserID: userID,
      },
    });

    if (result && !isCompletedLoading) {
      setIsCompletedLoading(true);
      setMessages(result.data.messages);
    } else {
    }
  }

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
    <SafeAreaView style={{ backgroundColor: '#dae7ed', flex: 1 }}>
      <View style={styles.container}>
        <View>
          <InputGroup stackedLabel style={{}}>
            <Label>제목</Label>
            <Input
              value={title}
              onChangeText={(text: string) => setTitle(text)}
            />
          </InputGroup>
        </View>
        <View style={{ flex: 1 }}>
          <Label> 내용</Label>
          <Textarea
            style={{ height: 400 }}
            rowSpan={5}
            value={contents}
            onChangeText={(text: string) => setContents(text)}
          />
        </View>
      </View>
      <View style={{ alignItems: 'flex-end', margin: 10 }}>
        <TouchableOpacity
          onPress={sendMessage}
          disabled={disabled}
          style={disabled ? styles.disabled : styles.buttonContainer}>
          <Text>작성 완료</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
    backgroundColor: 'white',
  },

  buttonContainer: {
    width: 100,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5,
    borderRadius: 10,
    backgroundColor: '#1388c2',
  },
  disabled: {
    width: 100,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5,
    borderRadius: 10,
    backgroundColor: '#596c75',
  },
});

export default MessageDetail;
