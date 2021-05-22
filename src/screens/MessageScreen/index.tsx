import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  TextInput,
  ScrollView,
} from 'react-native';

import { Icon } from 'native-base';

import {
  HomeScreens,
  HomeStackParamList,
} from '../../navigators/HomeStackNavigators';
import { StackNavigationProp } from '@react-navigation/stack';
import axios from 'axios';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import AsyncStorage from '@react-native-community/async-storage';
import { useIsFocused, useFocusEffect } from '@react-navigation/native';

type MessageScreenNavigationProps = StackNavigationProp<
  HomeStackParamList,
  HomeScreens.Message
>;
export type MessageParams = {
  userID: string;
  newMessageID?: string;
};

interface MessageScreenProps {
  route: { params: MessageParams };
  navigation: MessageScreenNavigationProps; // 네비게이션 속성에 대한 타입
}
interface IMessage {
  title: string;
  contents: string;
  sendingUserID: string;
  receivedUserID: string;
}

const MessageScreen: React.FunctionComponent<MessageScreenProps> = (props) => {
  //const [sendingUserID, setSendingUserID] = useState<string>('');
  //const [receivedUserID, setReceivedUserID] = useState<string>('');
  //const [contents, setContents] = useState<string>('');
  //const [title, setTitle] = useState<string>('');
  //나 = asyncstorage의 userID -> sendingUserID
  //너 = 게시글 쓴 사람(board detail로부터 넘겨받은 userID) -> receivedUserID
  const [isCompletedLoading, setIsCompletedLoading] = useState<boolean>(false);
  const [myUserID, setMyUserID] = useState<String>('');
  const { navigation, route } = props;
  const { params } = route;
  const { userID, newMessageID } = params;
  //const [newMessageIDState, setNewMessageIDState] = useState('');
  const [messages, setMessages] = useState<IMessage[]>([]);
  //const isFocused = useIsFocused();

  //if (newMessageID) {
  //  setNewMessageIDState(newMessageID);
  // }

  // console.log(newMessageID);

  useFocusEffect(
    React.useCallback(() => {
      async function getMessage() {
        if (!myUserID) {
          return;
        }
        const result = await axios.get('http://localhost:4000/api/messages', {
          params: {
            sendingUserID: myUserID,
            receivedUserID: userID,
          },
        });

        if (result && !isCompletedLoading) {
          setIsCompletedLoading(true);
          setMessages(result.data.messages);
        } else {
        }
      }

      async function setUser() {
        const asyncUserID = await AsyncStorage.getItem('userID');
        if (asyncUserID != null) {
          setMyUserID(asyncUserID);
        } else {
        }
      }
      setUser();

      getMessage();
    }, [myUserID]),
  );

  function isSender(userid: string) {
    //userID == userid : sender가 post작성자(userID)
    if (userID == userid) {
      return true;
    } else {
      return false;
    }
  }

  const moveMessageDetail = (userID: string) => () => {
    navigation.navigate(HomeScreens.MessageDetail, { userID });
  };

  console.log('내 아래는 마이 유저 아이디');
  console.log(myUserID);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={moveMessageDetail(userID)}>
        <Icon name="paper-plane-outline"></Icon>
      </TouchableOpacity>
      <ScrollView style={styles.messageBox}>
        <View>
          {messages.map((ele, index) => {
            if (ele.receivedUserID === myUserID) {
              return (
                <View key={index} style={styles.receiverBox}>
                  <Text style={{ color: 'blue' }}>받은 쪽지</Text>
                  <Text>{ele.title}</Text>
                  <Text>{ele.contents}</Text>
                </View>
              );
            } else {
              return (
                <View key={index} style={styles.senderBox}>
                  <Text style={{ color: 'red' }}>보낸 쪽지</Text>
                  <Text>{ele.title}</Text>
                  <Text>{ele.contents}</Text>
                </View>
              );
            }
          })}
        </View>
      </ScrollView>
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
    height: 380,
    margin: 10,
    borderWidth: 1,
    borderColor: '#1388c2',
  },
  sendMessage: {
    right: 0,
    margin: 10,
    flexDirection: 'column',
  },
  messageTitle: {
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'grey',
  },
  messageContent: {
    marginLeft: 10,
    marginRight: 10,
    height: 100,
    flexShrink: 1,
    borderBottomWidth: 1,
    borderBottomColor: 'grey',
  },
  senderBox: {
    //borderWidth: 1,
    //marginRight: 20,
    backgroundColor: '#baf5ff',
    marginBottom: 5,
  },
  receiverBox: {
    //borderWidth: 1,
    //marginLeft: 20,
    backgroundColor: '#ffbaba',
    marginBottom: 5,
  },
  button: {
    marginRight: 10,
    marginTop: 10,
    alignItems: 'flex-end',
  },
});

export default MessageScreen;
