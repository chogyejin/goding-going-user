import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
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
} from '../../../navigators/HomeStackNavigators';

type TeacherTipNavigationProps = StackNavigationProp<
  HomeStackParamList,
  HomeScreens.TeacherTip
>;

export type TeacherTipParams = {
  symbol: string;
};

interface TeacherTipProps {
  route: { params: TeacherTipParams };
  navigation: TeacherTipNavigationProps;
}

const TeacherTipScreen: React.FunctionComponent<TeacherTipProps> = (props) => {
  const { navigation, route } = props;
  const { params } = route;
  const { symbol } = params;
  return (
    <SafeAreaView>
      <Text style={styles.EtcTitle}>선생님 팁 게시판 타이틀</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  EtcTitle: {
    fontSize: 30,
  },
});

export default TeacherTipScreen;
