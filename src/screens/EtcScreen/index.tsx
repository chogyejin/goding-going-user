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
    <SafeAreaView>
      <Text style={styles.EtcTitle}>여기는 기타 기능을 모은 탭</Text>
      <TouchableOpacity
        style={styles.listButton}
        onPress={() => navigation.navigate(HomeScreens.TeacherTip, { symbol })}>
        <Text>선생님 팁 게시판 버튼</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.listButton}>
        <Text>다른 리스트2 버튼</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.listButton}>
        <Text>다른 리스트3 버튼</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  EtcTitle: {
    fontSize: 30,
  },
  listButton: {
    marginTop: 16,
    paddingVertical: 8,
    borderWidth: 4,
    borderColor: '#20232a',
    borderRadius: 6,
    backgroundColor: '#61dafb',
    color: '#20232a',
    textAlign: 'center',
    fontSize: 30,
    fontWeight: 'bold',
  },
});

export default EtcScreen;
