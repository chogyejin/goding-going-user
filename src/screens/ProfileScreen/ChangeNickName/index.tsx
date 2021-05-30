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
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={{ margin: 10, padding: 10 }}>변경할 닉네임</Text>
        <View style={styles.change}>
          <Input
            style={{ borderBottomWidth: 1 }}
            returnKeyType="next"
            value={nickName}
            onChangeText={(text) => setNickname(text)}
          />
          <TouchableOpacity style={styles.checkButton}>
            <Text style={{ color: '#1388c2', flex: 1 }} onPress={checkNickName}>
              중복확인
            </Text>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity style={styles.button} onPress={changeNickName}>
            <Text style={{ color: 'white' }}>변경 완료</Text>
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
    backgroundColor: 'white',
    margin: 10,
    padding: 1,
    flex: 1,
  },
  change: {
    flexDirection: 'row',
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
    width: '90%',
    alignItems: 'center',
    borderRadius: 10,
    margin: 20,
    padding: 3,
    justifyContent: 'center',
    backgroundColor: '#1388c2',
  },
  checkButton: {
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

export default ChangeNickName;
