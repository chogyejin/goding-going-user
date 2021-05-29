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
import { Input } from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';

type ChangeNickNameNavigationProps = StackNavigationProp<
  HomeStackParamList,
  HomeScreens.ChangeNickName
>;

export type ChangeNickNameParams = {};

interface ChangeNickNameProps {
  route: { params: ChangeNickNameParams };
  navigation: ChangeNickNameNavigationProps;
}

const ChangeNickName: React.FunctionComponent<ChangeNickNameProps> = (
  props,
) => {
  const { navigation, route } = props;
  const { params } = route;
  const [nickName, setNickname] = useState<string>('');
  const [checkedNickname, setCheckedNickname] = useState(false);

  const checkNickName = async () => {
    const result = await axios.get('http://localhost:4000/api/checkNickName', {
      params: {
        nickName,
      },
    });

    console.log(result.data);
    if (result.data) {
      setCheckedNickname(result.data);
      alert('닉네임 사용 가능');
    } else {
      alert('닉네임 불가능');
    }
  };

  const changeNickName = async () => {
    const asyncUserID = await AsyncStorage.getItem('userID');
    const headers = {
      'Content-Type': 'application/json',
    };
    if (checkedNickname) {
      const result = await axios.post(
        'http://localhost:4000/api/updateUser',
        { headers },
        {
          params: {
            id: asyncUserID,
            nickName,
          },
        },
      );

      navigation.navigate(HomeScreens.Profile, {});
    }
  };

  return (
    <SafeAreaView>
      <View style={{ flexDirection: 'row' }}>
        <Input
          style={{ borderWidth: 2 }}
          returnKeyType="next"
          value={nickName}
          onChangeText={(text) => setNickname(text)}
        />
        <TouchableOpacity>
          <Text style={{ borderWidth: 2 }} onPress={checkNickName}>
            중복확인
          </Text>
        </TouchableOpacity>
      </View>
      <View style={{ alignItems: 'center', marginTop: 30 }}>
        <TouchableOpacity onPress={changeNickName}>
          <Text>변경 완료</Text>
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

export default ChangeNickName;
