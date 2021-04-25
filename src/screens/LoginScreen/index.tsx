import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
// 아까 HomeStackNavigator 에서 export 해줬던 타입들을 가지고 온다.
import {
  HomeScreens,
  HomeStackParamList,
} from '../../navigators/HomeStackNavigators';
import {
  Container,
  Header,
  Content,
  Form,
  Item,
  Input,
  Label,
  Button,
} from 'native-base';
import axios from 'axios';
import { ScrollView } from 'react-native-gesture-handler';

// LoginScreen 에 필요한 파라미터들을 StackNavigationProp 으로 타입 명시해준다.
type LoginScreenNavigationProps = StackNavigationProp<
  HomeStackParamList, // navigators/HomeStackNavigators/index.tsx 에서 지정했던 HomeStackParamList
  HomeScreens.Login // enum 으로 지정했던 타입 중 Login 에 해당하는 부분
>;

// LoginScreenProps 에 대한 인터페이스 지정
// 인터페이스: 객체의 타입을 정의할 수 있게 하는 것
interface LoginScreenProps {
  navigation: LoginScreenNavigationProps; // 네비게이션 속서에 대한 타입으로 방금 지정해주었던 LoginScreenNavigationProps 을 지정
}

const LoginScreen: React.FunctionComponent<LoginScreenProps> = (props) => {
  const { navigation } = props;
  const initialSymbol: string = '';
  const [symbol, setSymbol] = useState<string>(initialSymbol);
  // LoginScreenProps 에 navigation 이 있으니까 비구조화 할당으로 꺼내쓸 수 있음

  const login = async () => {
    console.log('로그인 클릭');

    const headers = {
      'Content-Type': 'application/json',
    };

    const result = await axios.post(
      'http://localhost:4000/api/user',
      { headers },
      {
        params: {
          email: 'email',
          nickName: '얏얏',
          password: '1234',
          name: '윤태진',
          schoolID: '151515',
          grade: 4,
          class: 3,
        },
      },
    );

    console.log(result);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.logo}>
          <Image
            style={{ height: 100, width: 100 }}
            source={require('./logo.png')}
          />
        </View>
        <View style={styles.content}>
          <Container>
            <Content>
              <Form>
                <Item stackedLabel>
                  <Label>E-mail</Label>
                  <Input />
                </Item>
                <Item stackedLabel last>
                  <Label>Password</Label>
                  <Input />
                </Item>
              </Form>
            </Content>
          </Container>
        </View>
        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={() =>
              navigation.navigate(HomeScreens.Details, { symbol })
            }>
            <Text style={styles.buttonText} onPress={login}>
              로그인
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={() => navigation.navigate(HomeScreens.SignUp, { symbol })}>
            <Text style={styles.buttonText}>회원가입</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
//keyboard로 인하여 레이아웃이 변하는 것을 막기 위해 ScrollView + window size 이용
//Dimensions.get('window').width/height 를 통해 화면 사이즈를 가져옴.
const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  logo: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height * 0.3,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  content: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height * 0.4,
    justifyContent: 'center',
    backgroundColor: '#d6ca1a',
  },
  footer: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height * 0.3,
    bottom: 0,
    flexDirection: 'column',
    backgroundColor: '#9aa9ff',
  },
  buttonContainer: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height * 0.09,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 20,
    color: 'white',
  },
});

export default LoginScreen;
