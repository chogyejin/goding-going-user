import React from 'react';
// 필요한 모듈과 스크린 tsx 를 불러온다.
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../../screens/LoginScreen'; // 메인스크린
import DetailsScreen, { DetailsParams } from '../../screens/DetailsScreen'; // 디테일스크린(주가정보)
import SignUpScreen, { SignUpParams } from '../../screens/SignUpScreen';
import BoardScreen, { BoardParams } from '../../screens/BoardScreen';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import BScreen from '../../screens/BScreen';
import DScreen from '../../screens/DScreen';
import EScreen from '../../screens/EScreen';

// Home Screen 에서 필요한 스택은 2개 - 메인, 디테일

// 1. 필요한 스크린에 대해 enum 타입을 정의한다. (리듀서에서 액션타입을 지정해주는 것 처럼)
export enum HomeScreens {
  Login = 'Login',
  Details = 'Details',
  SignUp = 'SignUp',
  Board = 'Board',
}

// 2. 각 스크린 마다 필요한 파라미터 타입 정의
export type HomeStackParamList = {
  Login: undefined; // Login 스크린은 아무런 파라미터도 필요 없음
  Details: DetailsParams; // Details 스크린은 DetailsParams 라는 지정 타입의 파라미터가 필요함 => DetailsScreen 에서 지정할 것임.
  SignUp: SignUpParams;
  Board: BoardParams;
};

// 3. 방금 만든 타입을 createStackNavigator 메소드 앞에 지정해주서 HomeStack 네비게이터 객체를 만들어줌.
const HomeStack = createStackNavigator<HomeStackParamList>();
const HomeStackNavigator: React.FunctionComponent = () => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name={HomeScreens.Login} // 처음에 enum 으로 지정했던 HomeScreens 에서 맞는 컴포넌트명을 가져온다.
        component={LoginScreen} // 실제 보여주게 될 컴포넌트
      />
      <HomeStack.Screen name={HomeScreens.Details} component={DetailsScreen} />
      <HomeStack.Screen name={HomeScreens.SignUp} component={SignUpScreen} />
      <HomeStack.Screen name={HomeScreens.Board} component={BoardScreen} />
    </HomeStack.Navigator>
  );
};
export default HomeStackNavigator;
