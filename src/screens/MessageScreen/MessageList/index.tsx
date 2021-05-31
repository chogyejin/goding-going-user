import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
} from 'react-native';
import {
  FooterTab,
  Icon,
  Button,
  Input,
  Label,
  Item,
  InputGroup,
  Textarea,
} from 'native-base';
import {
  HomeScreens,
  HomeStackParamList,
} from '../../../navigators/HomeStackNavigators';
import { StackNavigationProp } from '@react-navigation/stack';
import axios from 'axios';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import AsyncStorage from '@react-native-community/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';

type MessageListNavigationProps = StackNavigationProp<
  HomeStackParamList,
  HomeScreens.MessageList
>;
export type MessageListParams = {};

interface MessageListProps {
  route: { params: MessageListParams };
  navigation: MessageListNavigationProps; // 네비게이션 속성에 대한 타입
}
interface IUser {
  nickName: string;
  id: string;
}

const MessageList: React.FunctionComponent<MessageListProps> = (props) => {
  const [users, setUsers] = useState<IUser[]>([]);
  const { navigation, route } = props;
  useEffect(() => {
    async function getUsersByMessages() {
      const asyncUserID = await AsyncStorage.getItem('userID');
      const {
        data: { users },
      } = await axios.get('http://localhost:4000/api/usersByMessages', {
        params: {
          id: asyncUserID,
        },
      });

      if (users) {
        setUsers(users);
      }
    }
    getUsersByMessages();
  }, []);

  const moveMessage = (userID: string) => () => {
    navigation.navigate(HomeScreens.Message, { userID });
  };

  return (
    <SafeAreaView style={{ backgroundColor: '#dae7ed', flex: 1 }}>
      <View style={styles.container}>
        <View></View>
        {users.map((user) => (
          <div
            style={{
              border: 'solid black 1px',
              borderRadius: 5,
              padding: 16,
              marginBottom: 8,
              display: 'flex',
            }}
            key={user.id}
            onClick={moveMessage(user.id)}>
            <Image
              style={{ height: 30, width: 30 }}
              source={require('./message_icon.png')}
            />
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                marginLeft: 16,
              }}>
              <b>닉네임</b>: {user.nickName}
            </div>
          </div>
        ))}
        <View style={{ flex: 1 }}></View>
      </View>
      <View>
        <View style={styles.tab}>
          <FooterTab>
            <Button
              onPress={() => navigation.navigate(HomeScreens.Details, {})}>
              <Icon name="home" />
            </Button>
            <Button onPress={() => navigation.navigate(HomeScreens.Board, {})}>
              <Icon name="reader-outline" />
            </Button>
            <Button onPress={() => navigation.navigate(HomeScreens.Etc, {})}>
              <Icon name="grid-outline" />
            </Button>
            <Button
              onPress={() => navigation.navigate(HomeScreens.MessageList, {})}>
              <Icon name="chatbox-outline" />
            </Button>
            <Button
              onPress={() => navigation.navigate(HomeScreens.Profile, {})}>
              <Icon name="person" />
            </Button>
          </FooterTab>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
    backgroundColor: 'white',
    padding: 16,
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
  tab: {
    flex: 1,
  },
});

export default MessageList;
