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

//user : email, password, name, nickName, school
const ProfileScreen: React.FunctionComponent<ProfileScreenProps> = (props) => {
  const { navigation, route } = props;
  const { params } = route;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logo}>
        <Image
          style={{ height: 100, width: 100 }}
          source={require('./profile.png')}
        />
      </View>
      <View>
        <TouchableOpacity
          onPress={() => navigation.navigate(HomeScreens.ChangePassword, {})}>
          <Text style={{ borderWidth: 1 }}>비밀번호 변경</Text>
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity
          onPress={() => navigation.navigate(HomeScreens.ChangeNickName, {})}>
          <Text style={{ borderWidth: 1 }}>닉네임 변경</Text>
        </TouchableOpacity>
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
});

export default ProfileScreen;
