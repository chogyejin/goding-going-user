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
} from '../../navigators/HomeStackNavigators';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

type ProfileScreenNavigationProps = StackNavigationProp<
  HomeStackParamList,
  HomeScreens.Profile
>;

export type ProfileParams = {
  symbol: string;
};

interface ProfileScreenProps {
  route: { params: ProfileParams };
  navigation: ProfileScreenNavigationProps;
}

//user : email, password, name, nickName, school
const ProfileScreen: React.FunctionComponent<ProfileScreenProps> = (props) => {
  const { navigation, route } = props;
  const { params } = route;
  const { symbol } = params;

  return (
    <SafeAreaView>
      <View style={styles.logo}>
        <Image
          style={{ height: 100, width: 100 }}
          source={require('./profile.png')}
        />
      </View>
      <View>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate(HomeScreens.ChangePassword, { symbol })
          }>
          <Text style={{ borderWidth: 1 }}>비밀번호 변경</Text>
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate(HomeScreens.ChangeNickName, { symbol })
          }>
          <Text style={{ borderWidth: 1 }}>닉네임 변경</Text>
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

export default ProfileScreen;
