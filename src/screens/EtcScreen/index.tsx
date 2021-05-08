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
    <SafeAreaView>
      <Text style={styles.EtcTitle}>여기는 기타 기능 탭</Text>
      <TouchableOpacity
        onPress={() => navigation.navigate(HomeScreens.SignUp, { symbol })}>
        <Text>선생님 팁 게시판 버튼</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  EtcTitle: {
    fontSize: 30,
  },
});

export default EtcScreen;
