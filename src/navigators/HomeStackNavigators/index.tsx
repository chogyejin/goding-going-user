import React from 'react';
// 필요한 모듈과 스크린 tsx 를 불러온다.
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../../screens/LoginScreen'; // 메인스크린
import DetailsScreen, { DetailsParams } from '../../screens/DetailsScreen'; // 디테일스크린(주가정보)
import SignUpScreen, { SignUpParams } from '../../screens/SignUpScreen';
import BoardScreen, { BoardParams } from '../../screens/BoardScreen';
import BoardDetail, {
  BoardDetailParams,
} from '../../screens/BoardScreen/BoardDetail';
import BoardCreation, {
  BoardCreationParams,
} from '../../screens/BoardScreen/BoardCreation';
import EtcScreen, { EtcParams } from '../../screens/EtcScreen';
import TeacherTip, {
  TeacherTipParams,
} from '../../screens/EtcScreen/TeacherTip';
import TeacherTipDetail, {
  TeacherTipDetailParams,
} from '../../screens/EtcScreen/TeacherTip/TeacherTipDetail';
import MessageScreen, { MessageParams } from '../../screens/MessageScreen';
import MessageDetail, {
  MessageDetailParams,
} from '../../screens/MessageScreen/MessageDetail';
import MessageList, {
  MessageListParams,
} from '../../screens/MessageScreen/MessageList';
import CreateTip, {
  CreateTipParams,
} from '../../screens/EtcScreen/TeacherTip/CreateTip';
import Naesin, { NaesinParams } from '../../screens/EtcScreen/Naesin';
import NaesinCalc, {
  NaesinCalcParams,
} from '../../screens/EtcScreen/Naesin/NaesinCalc';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ProfileScreen, { ProfileParams } from '../../screens/ProfileScreen';
import ChangePassword, {
  ChangePasswordParams,
} from '../../screens/ProfileScreen/ChangePassword';
import ChangeNickName, {
  ChangeNickNameParams,
} from '../../screens/ProfileScreen/ChangeNickName';
// Home Screen 에서 필요한 스택은 2개 - 메인, 디테일

// 1. 필요한 스크린에 대해 enum 타입을 정의한다. (리듀서에서 액션타입을 지정해주는 것 처럼)
export enum HomeScreens {
  Login = 'Login',
  Details = 'Details',
  SignUp = 'SignUp',
  Board = 'Board',
  BoardDetail = 'BoardDetail',
  Etc = 'Etc',
  TeacherTip = 'TeacherTip',
  TeacherTipDetail = 'TeacherTipDetail',
  MessageList = 'MessageList',
  Message = 'Message',
  MessageDetail = 'MessageDetail',
  BoardCreation = 'BoardCreation',
  CreateTip = 'CreateTip',
  Naesin = 'Naesin',
  NaesinCalc = 'NaesinCalc',
  Profile = 'Profile',
  ChangePassword = 'ChangePassword',
  ChangeNickName = 'ChangeNickName',
}

// 2. 각 스크린 마다 필요한 파라미터 타입 정의
export type HomeStackParamList = {
  Login: undefined; // Login 스크린은 아무런 파라미터도 필요 없음
  Details: DetailsParams; // Details 스크린은 DetailsParams 라는 지정 타입의 파라미터가 필요함 => DetailsScreen 에서 지정할 것임.
  SignUp: SignUpParams;
  Board: BoardParams;
  BoardDetail: BoardDetailParams;
  BoardCreation: BoardCreationParams;
  Etc: EtcParams;
  TeacherTip: TeacherTipParams;
  TeacherTipDetail: TeacherTipDetailParams;
  Message: MessageParams;
  MessageList: MessageListParams;
  MessageDetail: MessageDetailParams;
  CreateTip: CreateTipParams;
  Naesin: NaesinParams;
  NaesinCalc: NaesinCalcParams;
  Profile: ProfileParams;
  ChangePassword: ChangePasswordParams;
  ChangeNickName: ChangeNickNameParams;
};

// 3. 방금 만든 타입을 createStackNavigator 메소드 앞에 지정해주서 HomeStack 네비게이터 객체를 만들어줌.
const HomeStack = createStackNavigator<HomeStackParamList>();
const HomeStackNavigator: React.FunctionComponent = () => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name={HomeScreens.Login} component={LoginScreen} />
      <HomeStack.Screen
        name={HomeScreens.Details}
        component={DetailsScreen}
        options={{ headerLeft: () => null }}
      />
      <HomeStack.Screen name={HomeScreens.SignUp} component={SignUpScreen} />
      <HomeStack.Screen
        name={HomeScreens.Board}
        component={BoardScreen}
        options={{ headerLeft: () => null }}
      />
      <HomeStack.Screen
        name={HomeScreens.BoardDetail}
        component={BoardDetail}
        options={{ headerLeft: () => null }}
      />
      <HomeStack.Screen
        name={HomeScreens.BoardCreation}
        component={BoardCreation}
      />
      <HomeStack.Screen
        name={HomeScreens.Etc}
        component={EtcScreen}
        options={{ headerLeft: () => null }}
      />
      <HomeStack.Screen name={HomeScreens.TeacherTip} component={TeacherTip} />
      <HomeStack.Screen
        name={HomeScreens.TeacherTipDetail}
        component={TeacherTipDetail}
      />
      <HomeStack.Screen
        name={HomeScreens.MessageList}
        component={MessageList}
        options={{ headerLeft: () => null }}
      />
      <HomeStack.Screen
        name={HomeScreens.Message}
        component={MessageScreen}
        options={{ headerLeft: () => null }}
      />
      <HomeStack.Screen
        name={HomeScreens.MessageDetail}
        component={MessageDetail}
      />
      <HomeStack.Screen name={HomeScreens.CreateTip} component={CreateTip} />
      <HomeStack.Screen name={HomeScreens.Naesin} component={Naesin} />
      <HomeStack.Screen name={HomeScreens.NaesinCalc} component={NaesinCalc} />
      <HomeStack.Screen
        name={HomeScreens.Profile}
        component={ProfileScreen}
        options={{ headerLeft: () => null }}
      />
      <HomeStack.Screen
        name={HomeScreens.ChangePassword}
        component={ChangePassword}
      />
      <HomeStack.Screen
        name={HomeScreens.ChangeNickName}
        component={ChangeNickName}
      />
    </HomeStack.Navigator>
  );
};
export default HomeStackNavigator;
