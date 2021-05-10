import React, { useState, useEffect } from 'react';
import {
  HomeScreens,
  HomeStackParamList,
} from '../../../../navigators/HomeStackNavigators';
import { SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import axios from 'axios';
import { Picker } from '@react-native-picker/picker';
import { Button, Input } from 'native-base';
import { TouchableOpacity } from 'react-native-gesture-handler';

type CreateTipNavigationProps = StackNavigationProp<
  HomeStackParamList,
  HomeScreens.CreateTip
>;

export type CreateTipParams = {
  symbol: string;
};

interface CreateTipProps {
  route: { params: CreateTipParams };
  navigation: CreateTipNavigationProps;
}

interface ITip {
  id: string;
  teacherID: string;
  schoolID: string;
  title: string;
  contents: string;
  createdAt: string;
  updatedAt: string;
}

const CreateTip: React.FunctionComponent<CreateTipProps> = (props) => {
  const { navigation, route } = props;
  const { params } = route;
  const { symbol } = params;
  const [tips, setTips] = useState<ITip[]>([]);
  const [selectedSubject, setSelectedSubject] = useState<string>();
  const [teacherName, setTeacherName] = useState<string>('');
  const [content, setContent] = useState<string>('');

  const registerTip = async () => {
    const result = await axios.post('http://localhost:4000/api/createTip', {
      params: {
        selectedSubject,
        teacherName,
        content,
      },
    });
    console.log(selectedSubject, teacherName, content);
    if (result.data) {
      navigation.navigate(HomeScreens.TeacherTip, { symbol });
    }
  };

  const createTeacher = async () => {
    const result2 = await axios.post(
      'http://localhost:4000/api/createTeacher',
      {
        params: {
          name,
        },
      },
    );

    if (result2.data) {
      setTeacherName(teacherName);
    } else {
    }
  };

  const checkTeacherName = async () => {
    const result = await axios.get('http://localhost:4000/api/checkTeachers', {
      params: {
        name,
      },
    });

    if (result.data) {
      console.log('선생님 확인');
      setTeacherName(teacherName);
    } else {
      console.log('선생님 확인x, 선생님 추가');
      confirm('찾는 선생님 없습니다. 만드시겠습니까?');
      createTeacher();
    }
  };
  useEffect(() => {
    console.log(selectedSubject);
  });

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.CreateTipTitle}>여기는 팁 작성 페이지</Text>
      </View>
      <View>
        <Picker
          selectedValue={selectedSubject}
          onValueChange={(itemValue, itemIndex) =>
            setSelectedSubject(itemValue)
          }>
          <Picker.Item label="국어" value="korean" />
          <Picker.Item label="영어" value="english" />
          <Picker.Item label="수학" value="math" />
        </Picker>
      </View>
      <View style={styles.InputText}>
        <Input value={teacherName} placeholder="선생님 이름 입력" />
        <Button>
          <Text style={{ color: 'white' }} onPress={checkTeacherName}>
            검색
          </Text>
        </Button>
      </View>
      <View style={styles.InputText}>
        <Input
          value={content}
          placeholder="내용 작성"
          onChangeText={(text) => setContent(text)}
        />
      </View>
      <View style={styles.RegisterButton}>
        <Button>
          <Text style={{ color: 'white' }} onPress={registerTip}>
            등록
          </Text>
        </Button>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  InputText: {
    marginTop: 5,
    marginBottom: 5,
    backgroundColor: 'white',
    borderWidth: 1,
  },
  RegisterButton: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  CreateTipTitle: {
    fontSize: 30,
  },
});

export default CreateTip;
