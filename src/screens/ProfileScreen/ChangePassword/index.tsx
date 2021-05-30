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
} from '../../../navigators/HomeStackNavigators';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import { Input } from 'native-base';

type ChangePasswordNavigationProps = StackNavigationProp<
  HomeStackParamList,
  HomeScreens.ChangePassword
>;

export type ChangePasswordParams = {};

interface ChangePasswordProps {
  route: { params: ChangePasswordParams };
  navigation: ChangePasswordNavigationProps;
}

const ChangePassword: React.FunctionComponent<ChangePasswordProps> = (
  props,
) => {
  const { navigation, route } = props;
  const { params } = route;
  const [currentPassword, setCurrentPassword] = useState<string>('');
  const [changedPassword, setchangedPassword] = useState<string>('');
  const [changedPasswordCheck, setChangedPasswordCheck] = useState<string>('');

  const changePassword = async () => {
    const asyncUserID = await AsyncStorage.getItem('userID');
    const headers = {
      'Content-Type': 'application/json',
    };

    const result = await axios.post(
      'http://localhost:4000/api/updatePassword',
      { headers },
      {
        params: {
          id: asyncUserID,
          currentPassword,
          changedPassword,
        },
      },
    );

    if (!result.data) {
      alert('바꿀 수 없습니다');
    } else {
      navigation.navigate(HomeScreens.Profile, {});
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View>
          <View style={{ margin: 10, padding: 10 }}>
            <Text> 현재 비밀번호 </Text>
            <Input
              //placeholder="현재 비밀번호 입력"
              //placeholderTextColor="#DDDDDD"
              style={{ borderBottomWidth: 1 }}
              returnKeyType="next"
              value={currentPassword}
              onChangeText={(text) => setCurrentPassword(text)}
              secureTextEntry
            />
          </View>
          <View style={{ margin: 10, padding: 10 }}>
            <Text> 새 비밀번호 </Text>
            <Input
              //placeholder="새 비밀번호"
              //placeholderTextColor="#DDDDDD"
              style={{ borderBottomWidth: 1 }}
              returnKeyType="next"
              value={changedPassword}
              onChangeText={(text) => setchangedPassword(text)}
              secureTextEntry
            />
          </View>
          <View style={{ margin: 10, padding: 10 }}>
            <Text> 새 비밀번호 확인 </Text>
            <Input
              //placeholder="새 비밀번호 확인"
              placeholderTextColor="#DDDDDD"
              style={{ borderBottomWidth: 1 }}
              returnKeyType="next"
              value={changedPasswordCheck}
              onChangeText={(text) => setChangedPasswordCheck(text)}
              secureTextEntry
            />
          </View>

          <View>
            <Text>
              {changedPassword !== changedPasswordCheck &&
                changedPasswordCheck &&
                '비밀번호가 다릅니다.'}
            </Text>
          </View>
        </View>
        <View style={{ flex: 1, flexDirection: 'column-reverse' }}>
          <TouchableOpacity style={styles.button} onPress={changePassword}>
            <Text style={{ color: 'white' }}>비밀번호 변경 완료</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //justifyContent: 'space-between',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    backgroundColor: '#dae7ed',
  },
  content: {
    //flexDirection: 'row',
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
  button: {
    height: 30,
    alignItems: 'center',
    borderRadius: 10,
    marginLeft: 10,
    marginRight: 5,
    marginBottom: 5,
    padding: 3,
    justifyContent: 'center',
    backgroundColor: '#1388c2',
  },
});

export default ChangePassword;
