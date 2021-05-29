import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, Text, View, Dimensions } from 'react-native';
import {
  Container,
  Content,
  Footer,
  FooterTab,
  Button,
  Icon,
} from 'native-base';
import {
  HomeScreens,
  HomeStackParamList,
} from '../../navigators/HomeStackNavigators';
import { StackNavigationProp } from '@react-navigation/stack';
import { NavigationActions } from 'react-navigation';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

type DetailsScreenNavigationProps = StackNavigationProp<
  HomeStackParamList,
  HomeScreens.Details
>;

// ~/src/navigators/HomeStackNavigators/index.tsx 에서 2번 각 스크린 마다 필요한 파라미터 타입 정의해줄 때 Details 스크린에 필요한 props 로 지정해줬었음.
export type DetailsParams = {
  symbol: string; // DetailsScreen 에는 symbol 이라는 이름의 string 타입의 파라미터가 필요하다.
};

// DetailsScreen Props 의 타입들을 지정. (리액트에서 proptypes 지정하는 것 처럼)
interface DetailsScreenProps {
  route: { params: DetailsParams }; // 루트의 파라미터로 방금 지정해준 DetailsParams 타입이 온다.
  navigation: DetailsScreenNavigationProps;
}

const styles = StyleSheet.create({
  btnLoginContainer: {
    alignSelf: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'space-between',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  foodContainer: {
    display: 'block',
    marginBottom: 50,
  },
  txtSignupScreenContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  txtSymbol: {
    fontSize: 25,
    color: 'grey',
  },
  tab: {
    flex: 1,
  },
});

const DetailsScreen: React.FunctionComponent<DetailsScreenProps> = (props) => {
  const { navigation, route } = props;
  const { params } = route;
  const { symbol } = params;
  const [schoolFoods, setSchoolFoods] = useState<Array<{ DDISH_NM: string }>>(
    [],
  );
  const [schoolID, setSchoolID] = useState<string>('');

  useEffect(() => {
    async function getMySchoolID() {
      if (schoolID) {
        return;
      }

      const asyncSchoolID = await AsyncStorage.getItem('schoolID');
      if (!asyncSchoolID) {
        return;
      }
      setSchoolID(asyncSchoolID);
    }

    getMySchoolID();
  });

  useEffect(() => {
    async function getSchoolFoods() {
      const result = await axios.get('http://localhost:4000/api/schoolFoods', {
        params: {
          date: new Date().toISOString(),
          schoolID,
        },
      });
      if (result) {
        setSchoolFoods(result.data.schoolFoods);
      }
    }
    getSchoolFoods();
  }, [schoolID]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.txtSignupScreenContainer}>
        <Text style={{ display: 'flex', justifyContent: 'space-between' }}>
          {schoolFoods.map((schoolFood, index) => (
            <Text key={index}>
              <table style={{ border: 'solid black 1px' }}>
                <thead>
                  <td
                    style={{
                      borderBottom: 'solid black 2px',
                      textAlign: 'center',
                    }}>
                    {index === 0 ? '점심' : '저녁'}
                  </td>
                </thead>
                <tbody>
                  {schoolFood.DDISH_NM.split('<br/>').map((menu) => (
                    <tr>
                      <td style={{ padding: '4px' }}>
                        {menu.replace(/[0-9]/g, '').replace(/["."]/g, '')}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <br />
            </Text>
          ))}
        </Text>
        <Text style={styles.txtSymbol}>{symbol}</Text>
      </View>
      <View>
        <View style={styles.tab}>
          <FooterTab>
            <Button
              onPress={() =>
                navigation.navigate(HomeScreens.Details, { symbol })
              }>
              <Icon name="home" />
            </Button>
            <Button
              onPress={() =>
                navigation.navigate(HomeScreens.Board, { symbol })
              }>
              <Icon name="reader-outline" />
            </Button>
            <Button
              onPress={() => navigation.navigate(HomeScreens.Etc, { symbol })}>
              <Icon name="grid-outline" />
            </Button>
            <Button
              onPress={() =>
                navigation.navigate(HomeScreens.Board, { symbol })
              }>
              <Icon name="chatbox-outline" />
            </Button>
            <Button
              onPress={() =>
                navigation.navigate(HomeScreens.Profile, { symbol })
              }>
              <Icon name="person" />
            </Button>
          </FooterTab>
        </View>
      </View>
    </SafeAreaView>
  );
};
export default DetailsScreen;
