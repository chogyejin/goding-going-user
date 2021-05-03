import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
} from 'react-native';
import {
  HomeScreens,
  HomeStackParamList,
} from '../../navigators/HomeStackNavigators';
import { StackNavigationProp } from '@react-navigation/stack';
import axios from 'axios';

type BoardScreenNavigationProps = StackNavigationProp<
  HomeStackParamList,
  HomeScreens.Board
>;

export type BoardParams = {
  symbol: string;
};

interface BoardScreenProps {
  route: { params: BoardParams };
  navigation: BoardScreenNavigationProps;
}

const BoardScreen: React.FunctionComponent<BoardScreenProps> = (props) => {
  const { navigation } = props;

  useEffect(() => {
    console.log('렌덜링이 완료');
  });

  console.log('렌더링');

  return (
    <SafeAreaView>
      <Text style={styles.ScreenTitle}>board 테스트</Text>
      <View style={styles.container}>
        <View>
          <TouchableOpacity>
            <Text style={styles.BoardTitle}>게시판1</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    alignItems: 'center',
  },
  ScreenTitle: {
    alignSelf: 'center',
    fontSize: 30,
  },
  BoardTitle: {
    marginTop: 20,
    marginBottom: 10,
    color: 'white',
    flexDirection: 'column',
    fontSize: 20,
    backgroundColor: 'grey',
    borderRadius: 10,
    padding: 10,
  },
});

export default BoardScreen;
function async() {
  throw new Error('Function not implemented.');
}
