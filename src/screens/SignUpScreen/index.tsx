import React from 'react';
import { SafeAreaView, StyleSheet, Text, View,TouchableOpacity,Dimensions } from 'react-native';
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

const styles = StyleSheet.create({
  btnLoginContainer: {
    alignSelf: 'center',
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
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: 10,
  },
  txtSignupScreen: {
    fontSize: 30,
  },
  txtSignupScreenContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  footer: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height * 0.3,
    bottom: 0,
    flexDirection: 'column',
    backgroundColor: '#9aa9ff',
  },
  txtSymbol: {
    fontSize: 25,
    color: 'grey',
  },
});

const SignUpScreen: React.FunctionComponent<SignUpScreenProps> = (props) => {
  const { navigation, route } = props;
  const { params } = route;
  const { symbol } = params;
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.txtSignupScreenContainer}>
      <Container>
          <Content>
            <Form>
              <Item stackedLabel>
                <Label>username</Label>
                <Input />
              </Item>
              <Item stackedLabel>
                <Label>password</Label>
                <Input />
              </Item>
              <Item stackedLabel>
                <Label>password check</Label>
                <Input />
              </Item>
              <Item stackedLabel>
                <Label>school</Label>
                <Input />
              </Item>
              <Item stackedLabel>
                <Label>grade</Label>
                <Input />
              </Item>
              <Item stackedLabel last>
                <Label>nickname</Label>
                <Input />
              </Item>
            </Form>
          </Content>
        </Container>
        <Text style={styles.txtSymbol}>{symbol}</Text>
      </View>
    </SafeAreaView>
  );
};


export default SignUpScreen;
