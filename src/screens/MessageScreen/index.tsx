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
  const [isCompletedLoading, setIsCompletedLoading] = useState<boolean>(false);
  const [myUserID, setMyUserID] = useState<String>('');
  const { navigation, route } = props;
  const { params } = route;
  const { userID, newMessageID } = params;
  const [messages, setMessages] = useState<IMessage[]>([]);

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

  return (
    <View style={styles.container}>
      <ScrollView style={styles.messageBox}>
        <View>
          {messages.map((ele, index) => {
            if (ele.receivedUserID === myUserID) {
              return (
                <View key={index} style={styles.receiverBox}>
                  <Text
                    style={{
                      color: '#2889bd',
                      marginBottom: 5,
                      fontWeight: 'bold',
                    }}>
                    받은 쪽지
                  </Text>
                  <Text>[ {ele.title} ]</Text>
                  <Text>{ele.contents}</Text>
                </View>
              );
            } else {
              return (
                <View key={index} style={styles.senderBox}>
                  <Text
                    style={{
                      color: '#e06822',
                      marginBottom: 5,
                      fontWeight: 'bold',
                    }}>
                    보낸 쪽지
                  </Text>
                  <Text>[ {ele.title} ]</Text>
                  <Text>{ele.contents}</Text>
                </View>
              );
            }
          })}
        </View>
      </ScrollView>
      <TouchableOpacity
        style={styles.button}
        onPress={moveMessageDetail(userID)}>
        <Icon name="paper-plane-outline"></Icon>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#dae7ed',
    // backgroundColor: 'white',
  },
  messageBox: {
    height: 380,
    margin: 10,
    backgroundColor: 'white',
  },
  senderBox: {
    borderBottomWidth: 1,
    borderColor: '#b5bfc4',
    //backgroundColor: '#baf5ff',
    padding: 5,
    marginBottom: 5,
  },
  receiverBox: {
    borderBottomWidth: 1,
    borderColor: '#b5bfc4',
    //marginLeft: 20,
    //backgroundColor: '#ffbaba',
    marginBottom: 5,
    padding: 5,
  },
  button: {
    marginRight: 10,
    marginBottom: 10,
    alignItems: 'flex-end',
  },
});

export default MessageScreen;
