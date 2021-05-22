import { StackNavigationProp } from '@react-navigation/stack';
import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import {
  HomeScreens,
  HomeStackParamList,
} from '../../navigators/HomeStackNavigators';

type EtcScreenNavigationProps = StackNavigationProp<
  HomeStackParamList,
  HomeScreens.Etc
>;

export type EtcParams = {
  symbol: string;
};

interface EtcScreenProps {
  route: { params: EtcParams };
  navigation: EtcScreenNavigationProps;
}

const EtcScreen: React.FunctionComponent<EtcScreenProps> = (props) => {
  const { navigation, route } = props;
  const { params } = route;
  const { symbol } = params;

  return (
    <SafeAreaView style={{ backgroundColor: '#dae7ed', flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.buttonContainer}>
          <Text>게시판 바로 가기</Text>

          <TouchableOpacity
            style={styles.list}
            onPress={() => navigation.navigate(HomeScreens.Board, { symbol })}>
            <Text> - 자유게시판 </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.list}
            onPress={() =>
              navigation.navigate(HomeScreens.TeacherTip, { symbol })
            }>
            <Text> - 선생님 팁 게시판 버튼</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.list}>
            <Text> - 무슨 무슨 게시판 </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
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
