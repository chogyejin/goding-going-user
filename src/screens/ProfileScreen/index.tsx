import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import {
  HomeScreens,
  HomeStackParamList,
} from '../../navigators/HomeStackNavigators';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import { Button, FooterTab, Icon } from 'native-base';

type ProfileScreenNavigationProps = StackNavigationProp<
  HomeStackParamList,
  HomeScreens.Profile
>;

export type ProfileParams = {};

interface ProfileScreenProps {
  route: { params: ProfileParams };
  navigation: ProfileScreenNavigationProps;
}
interface IUser {
  name: string;
  nickName: string;
  school: {
    name: string;
  };
}
//user : email, password, name, nickName, school
const ProfileScreen: React.FunctionComponent<ProfileScreenProps> = (props) => {
  const { navigation, route } = props;
  const { params } = route;
  const [schoolID, setSchoolID] = useState<string>('');
  const [user, setUser] = useState<IUser>({
    name: '',
    nickName: '',
    school: {
      name: '',
    },
  });

  useEffect(() => {
    async function getMySchoolID() {
      if (schoolID) {
        return;
      }

      const asyncSchoolID = await AsyncStorage.getItem('schoolID');
      if (!asyncSchoolID) {
        return;
      }
      setSchoolID(asyncSchoolID);
    }
    getMySchoolID();
  });
  useEffect(() => {
    async function getUserID() {
      const userID = await AsyncStorage.getItem('userID');
      const {
        data: { user },
      } = await axios.get('http://localhost:4000/api/user', {
        params: {
          id: userID,
        },
      });

      setUser(user);
    }
    getUserID();
  }, [schoolID]);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View
          style={{
            borderWidth: 1,
            padding: 8,
            margin: 10,
          }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
            }}>
            <div>
              <div>
                <Text>
                  <b>이름</b> : {user.name}
                </Text>
              </div>
              <div>
                <Text>
                  <b>닉네임</b> : {user.nickName}
                </Text>
              </div>
              <div>
                <Text>
                  <b>학교</b> : {user.school.name}
                </Text>
              </div>
            </div>
            <div>
              <Image
                style={{ height: 100, width: 100 }}
                source={require('../ProfileScreen/profile.png')}
              />
            </div>
          </div>
          <div>
            <Image
              style={{ marginTop: '8px', height: 50, width: '100%' }}
              source={require('../ProfileScreen/barcode.png')}
            />
          </div>
        </View>

        <View>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate(HomeScreens.ChangePassword, {})}>
            <Text style={{ color: '#1388c2' }}>비밀번호 변경</Text>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate(HomeScreens.ChangeNickName, {})}>
            <Text style={{ color: '#1388c2' }}>닉네임 변경</Text>
          </TouchableOpacity>
        </View>
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
            <Button onPress={() => navigation.navigate(HomeScreens.Board, {})}>
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
    justifyContent: 'space-between',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    backgroundColor: '#dae7ed',
  },
  content: {
    backgroundColor: 'white',
    margin: 10,
    padding: 1,
    flex: 1,
  },
  logo: {
    //flex: 1,
    //width: '100%',
    backgroundColor: '#fff',
    alignItems: 'center',
    marginTop: 30,
  },
  tab: {
    flex: 1,
  },
  button: {
    height: 30,
    alignItems: 'center',
    borderRadius: 10,
    marginLeft: 10,
    marginRight: 5,
    marginBottom: 5,
    padding: 3,
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#1388c2',
  },
});

export default ProfileScreen;
