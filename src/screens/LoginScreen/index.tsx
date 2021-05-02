import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
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
import AsyncStorage from '@react-native-community/async-storage';

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
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [disabled, setDisabled] = useState(true); // email,pswd 미입력 -> 버튼 불가

  const { navigation } = props;
  const initialSymbol: string = '';
  const [symbol, setSymbol] = useState<string>(initialSymbol);
  // LoginScreenProps 에 navigation 이 있으니까 비구조화 할당으로 꺼내쓸 수 있음

  useEffect(() => {
    setDisabled(!(email && password));
  }, [email, password]);
  //email, pswd 미입력 -> diasbled button

  const login = async () => {
    console.log('로그인 클릭');

    // const headers = {
    //   'Content-Type': 'application/json',
    // };

    // const result = await axios.post(
    //   'http://localhost:4000/api/login',
    //   { headers },
    //   {
    //     params: {
    //       email,
    //       password,
    //     },
    //   },
    // );
    const result = await axios.get('http://localhost:4000/api/login', {
      params: {
        email,
        password,
      },
    });

    if (result) {
      // 가져온 데이터 로컬 저장소에 저장하는 코드 추가
      //AsyncStorage.setItem('result', JSON.stringify(result));
      //result 를 string type으로
      navigation.navigate(HomeScreens.Details, { symbol });
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <View style={{ margin: 10 }}>
            <View style={styles.logo}>
              <Image
                style={{ height: 100, width: 100 }}
                source={require('./logo.png')}
              />
            </View>
            <View style={styles.content}>
              <Form>
                <Item stackedLabel>
                  <Label style={styles.labelText}>E-mail</Label>
                  <Input
                    returnKeyType="next"
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                    autoCapitalize="none"
                    autoCompleteType="email"
                    textContentType="emailAddress"
                    keyboardType="email-address"
                  />
                </Item>
                <Item stackedLabel last>
                  <Label style={styles.labelText}>Password</Label>
                  <Input
                    returnKeyType="done"
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                    secureTextEntry
                  />
                </Item>
              </Form>
            </View>
            <View style={{ alignItems: 'center' }}>
              <View>
                <TouchableOpacity
                  onPress={login}
                  disabled={disabled}
                  style={disabled ? styles.disabled : styles.buttonContainer}>
                  <Text style={styles.buttonText}>로그인</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate(HomeScreens.SignUp, { symbol })
                  }>
                  <Text style={styles.buttonText}>회원가입</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};
//keyboard로 인하여 레이아웃이 변하는 것을 막기 위해 ScrollView + window size 이용
//Dimensions.get('window').width/height 를 통해 화면 사이즈를 가져옴.
const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    backgroundColor: '#fff',
  },
  logo: {
    //flex: 1,
    //width: '100%',
    backgroundColor: '#fff',
    alignItems: 'center',
    marginTop: 30,
  },
  content: {
    flex: 1,
    width: 300,
    marginTop: 50,
    marginBottom: 50,
    alignItems: 'stretch',
  },
  buttonContainer: {
    width: 300,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 5,
    borderRadius: 10,
    backgroundColor: '#1388c2',
  },
  buttonText: {
    fontSize: 15,
    color: 'white',
  },
  labelText: {
    color: '#1388c2',
  },
  disabled: {
    width: 300,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 5,
    borderRadius: 10,
    backgroundColor: '#596c75',
    //opacity: 0.2,
  },
});

export default LoginScreen;
