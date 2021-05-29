import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
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

export type ChangePasswordParams = {
  symbol: string;
};

interface ChangePasswordProps {
  route: { params: ChangePasswordParams };
  navigation: ChangePasswordNavigationProps;
}

const ChangePassword: React.FunctionComponent<ChangePasswordProps> = (
  props,
) => {
  const { navigation, route } = props;
  const { params } = route;
  const { symbol } = params;
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
      navigation.navigate(HomeScreens.Profile, { symbol });
    }
  };

  return (
    <SafeAreaView>
      <View>
        <Input
          placeholder="현재 비밀번호 입력"
          placeholderTextColor="#DDDDDD"
          style={{ fontSize: 12 }}
          returnKeyType="next"
          value={currentPassword}
          onChangeText={(text) => setCurrentPassword(text)}
          secureTextEntry
        />
      </View>
      <View>
        <Input
          placeholder="새 비밀번호"
          placeholderTextColor="#DDDDDD"
          style={{ fontSize: 12 }}
          returnKeyType="next"
          value={changedPassword}
          onChangeText={(text) => setchangedPassword(text)}
          secureTextEntry
        />
      </View>
      <View>
        <Input
          placeholder="새 비밀번호 확인"
          placeholderTextColor="#DDDDDD"
          style={{ fontSize: 12 }}
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
      <View>
        <TouchableOpacity onPress={changePassword}>
          <Text>비밀번호 변경 완료</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logo: {
    //flex: 1,
    //width: '100%',
    backgroundColor: '#fff',
    alignItems: 'center',
    marginTop: 30,
  },
});

export default ChangePassword;
