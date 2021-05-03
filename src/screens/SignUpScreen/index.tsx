import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
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
import { StackNavigationProp } from '@react-navigation/stack';
import { ScrollView } from 'react-native-gesture-handler';

type SignUpScreenNavigationProps = StackNavigationProp<
  HomeStackParamList,
  HomeScreens.SignUp
>;

// ~/src/navigators/HomeStackNavigators/index.tsx 에서 2번 각 스크린 마다 필요한 파라미터 타입 정의해줄 때 SignUp 스크린에 필요한 props 로 지정해줬었음.
export type SignUpParams = {
  symbol: string; // SignUpScreen 에는 symbol 이라는 이름의 string 타입의 파라미터가 필요하다.
};

// SignUpScreen Props 의 타입들을 지정. (리액트에서 proptypes 지정하는 것 처럼)
interface SignUpScreenProps {
  route: { params: SignUpParams }; // 루트의 파라미터로 방금 지정해준 SignUpParams 타입이 온다.
  navigation: SignUpScreenNavigationProps;
}

const SignUpScreen: React.FunctionComponent<SignUpScreenProps> = (props) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [passwordCheck, setPasswordCheck] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [nickName, setNickname] = useState<string>('');
  const [grade, setGrade] = useState<number>(0);
  const [classNumber, setClassNumber] = useState<number>(0);
  const [schoolName, setSchoolName] = useState('');
  const [schoolID, setSchoolID] = useState('');
  const [schools, setSchools] = useState([]);
  const [disabled, setDisabled] = useState(true); // 모든 정보 미입력 -> 버튼 불가
  const [checkedNickname, setCheckedNickname] = useState(false);

  useEffect(() => {
    setDisabled(
      !(
        email &&
        password &&
        name &&
        nickName &&
        schoolID &&
        passwordCheck &&
        checkedNickname
      ),
    );
  }, [
    email,
    password,
    name,
    nickName,
    schoolID,
    passwordCheck,
    checkedNickname,
  ]);

  const signUpAccount = async () => {
    console.log(email);
    console.log(password);
    console.log(name);
    console.log(nickName);
    console.log(schoolID);

    const headers = {
      'Content-Type': 'application/json',
    };

    const result = await axios.post(
      'http://localhost:4000/api/signUp',
      { headers },
      {
        params: {
          email,
          password,
          name,
          nickName,
          schoolID,
          grade: 1,
          classNumber: 3,
        },
      },
    );
  };

  const checkNickName = async () => {
    const result = await axios.get('http://localhost:4000/api/checkNickName', {
      params: {
        nickName,
      },
    });
    console.log(result);
    if (result.data) {
      setCheckedNickname(true); //닉네임 중복확인이 되어야 회원가입이 가능하도록
      alert('닉네임 사용 가능');
    } else {
      alert('닉네임 불가능');
    }
  };

  const getSchools = async () => {
    const result = await axios.get('http://localhost:4000/api/schools', {
      params: {
        name: schoolName,
      },
    });

    setSchools(result.data);
    console.log(result.data);
  };

  const selectSchool = (schoolID: string) => () => {
    setSchoolID(schoolID);
  };

  const { navigation, route } = props;
  const { params } = route;
  const { symbol } = params;

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <View style={styles.txtSignupScreenContainer}>
            <Content>
              <Form>
                <Item stackedLabel>
                  <Label>이메일</Label>
                  <Input
                    returnKeyType="next"
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                  />
                </Item>
                <Item stackedLabel>
                  <Label>비밀번호</Label>
                  <Input
                    placeholder="비밀번호 입력"
                    placeholderTextColor="#DDDDDD"
                    style={{ fontSize: 12 }}
                    returnKeyType="next"
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                    secureTextEntry
                  />
                </Item>
                <Item stackedLabel>
                  <Input
                    placeholder="비밀번호 재입력"
                    placeholderTextColor="#DDDDDD"
                    style={{ fontSize: 12 }}
                    returnKeyType="next"
                    value={passwordCheck}
                    onChangeText={(text) => setPasswordCheck(text)}
                    secureTextEntry
                  />
                </Item>
                <View>
                  <Text>
                    {password !== passwordCheck &&
                      passwordCheck &&
                      '비밀번호가 다릅니다.'}
                  </Text>
                </View>
                <Item stackedLabel>
                  <Label>이름</Label>
                  <Input
                    returnKeyType="next"
                    value={name}
                    onChangeText={(text) => setName(text)}
                  />
                </Item>

                <Item stackedLabel>
                  <Label>닉네임</Label>
                  <View style={{ flexDirection: 'row' }}>
                    <Input
                      returnKeyType="next"
                      value={nickName}
                      onChangeText={(text) => setNickname(text)}
                      //maxLength={10} //최대글자수
                    />
                    <TouchableOpacity style={styles.nickNameDuplicate}>
                      <Text onPress={checkNickName}>중복확인</Text>
                    </TouchableOpacity>
                  </View>
                </Item>
                <Item stackedLabel last>
                  <Label>학교</Label>
                  <View style={{ flexDirection: 'row' }}>
                    <Input
                      returnKeyType="next"
                      value={schoolName}
                      onChangeText={(text) => setSchoolName(text)}
                    />
                    <TouchableOpacity style={styles.nickNameDuplicate}>
                      <Text onPress={getSchools}>검색</Text>
                    </TouchableOpacity>
                  </View>
                  {schools.map((school) => (
                    <Text key={school.id}>
                      {school.name}
                      <Button onPress={selectSchool(school.id)}>
                        <Text>선택 </Text>
                      </Button>
                    </Text>
                  ))}
                </Item>
              </Form>
            </Content>

            <Text style={styles.txtSymbol}>{symbol}</Text>
          </View>
          <View style={{ alignItems: 'center', marginTop: 30 }}>
            <TouchableOpacity
              onPress={signUpAccount}
              disabled={disabled}
              style={disabled ? styles.disabled : styles.buttonContainer}
              //onPress={() => navigation.navigate(HomeScreens.SignUp, { symbol })}
            >
              <Text style={styles.buttonText}>회원가입 완료</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  btnLoginContainer: {
    alignSelf: 'center',
  },
  buttonContainer: {
    width: 300,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 5,
    borderRadius: 10,
    backgroundColor: '#1388c2',
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
  },
  container: {
    flex: 1,
    justifyContent: 'space-between',
    margin: 5,
    backgroundColor: 'white',
  },
  txtSignupScreen: {
    fontSize: 30,
  },
  txtSignupScreenContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  txtSymbol: {
    fontSize: 25,
    color: 'grey',
  },
  nickNameDuplicate: {
    height: 30,
    alignItems: 'center',
    borderRadius: 5,
    backgroundColor: '#DDDDDD',
    padding: 5,
  },
  disabled: {
    width: 300,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 5,
    borderRadius: 10,
    backgroundColor: '#596c75',
  },
});

export default SignUpScreen;
