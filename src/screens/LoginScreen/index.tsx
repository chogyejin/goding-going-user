import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
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
} from 'native-base';

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
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logo}>
        <Image
          style={{ height: '50%', width: '50%' }}
          source={require('./logo.png')}
        />
      </View>
      <View style={styles.content}>
        <Container>
          <Content>
            <Form>
              <Item stackedLabel>
                <Label>Username</Label>
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
          onPress={() => navigation.navigate(HomeScreens.Details, { symbol })}>
          <Text style={styles.buttonText}>로그인</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => navigation.navigate(HomeScreens.SignUp, { symbol })}>
          <Text style={styles.buttonText}>회원가입</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    //alignItems: 'center',
    backgroundColor: 'black',
  },
  logo: {
    width: '100%',
    height: '40%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    //justifyContent: 'center',
    //alignItems: 'center',
    //flexDirection: 'column',
    backgroundColor: '#d6ca1a',
  },
  footer: {
    width: '100%',
    height: '20%',
    //justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9aa9ff',
  },
  buttonContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 20,
    color: 'white',
  },
});

export default LoginScreen;
