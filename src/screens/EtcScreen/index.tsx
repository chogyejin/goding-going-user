import { StackNavigationProp } from '@react-navigation/stack';
import { Button, FooterTab, Icon } from 'native-base';
import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {
  HomeScreens,
  HomeStackParamList,
} from '../../navigators/HomeStackNavigators';

type EtcScreenNavigationProps = StackNavigationProp<
  HomeStackParamList,
  HomeScreens.Etc
>;

export type EtcParams = {};

interface EtcScreenProps {
  route: { params: EtcParams };
  navigation: EtcScreenNavigationProps;
}

const EtcScreen: React.FunctionComponent<EtcScreenProps> = (props) => {
  const { navigation, route } = props;
  const { params } = route;

  return (
    <SafeAreaView
      style={{
        backgroundColor: '#dae7ed',
        flex: 1,
        justifyContent: 'space-between',
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
      }}>
      <View style={styles.container}>
        <View style={styles.buttonContainer}>
          <Text>게시판 바로 가기</Text>

          <TouchableOpacity
            style={styles.list}
            onPress={() => navigation.navigate(HomeScreens.Board, {})}>
            <Text> - 자유게시판 </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.list}
            onPress={() => navigation.navigate(HomeScreens.TeacherTip, {})}>
            <Text> - 선생님 팁 게시판 버튼</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.list}
            onPress={() => navigation.navigate(HomeScreens.Naesin, {})}>
            <Text>내신 계산기</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.list}>
            <Text> - 무슨 무슨 게시판 </Text>
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
  tab: {
    flex: 1,
  },
  container: {
    flex: 1,
    margin: 10,
    borderRadius: 5,
    backgroundColor: 'white',
  },
  buttonContainer: {
    margin: 10,
  },
  list: {
    margin: 10,
  },
});

export default EtcScreen;
