import React from 'react';
import {
  HomeScreens,
  HomeStackParamList,
} from '../../../navigators/HomeStackNavigators';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';

type BoardDetailNavigationProps = StackNavigationProp<
  HomeStackParamList,
  HomeScreens.BoardDetail
>;

export type BoardDetailParams = {
  symbol: string;
};

interface BoardDetailProps {
  route: { params: BoardDetailParams };
  navigation: BoardDetailNavigationProps;
}

const BoardDetail: React.FunctionComponent<BoardDetailProps> = (props) => {
  const { navigation, route } = props;
  const { params } = route;
  const { symbol } = params;
  return (
    <SafeAreaView>
      <Text style={styles.BoardDetailTitle}>게시판 상세</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  BoardDetailTitle: {
    fontSize: 30,
  },
});

export default BoardDetail;
