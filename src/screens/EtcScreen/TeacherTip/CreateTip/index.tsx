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
  contentss: string;
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
<<<<<<< Updated upstream
  const [content, setContent] = useState<string>('');
=======
  const [contents, setContents] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const [teacherID, setTeacherID] = useState<string>('');
>>>>>>> Stashed changes

  const registerTip = async () => {
    const schoolID = await AsyncStorage.getItem('schoolID');
    const result = await axios.post('http://localhost:4000/api/createTip', {
      params: {
<<<<<<< Updated upstream
        selectedSubject,
        teacherName,
        content,
=======
        teacherID,
        schoolID,
        title,
        contents,
>>>>>>> Stashed changes
      },
    });
    console.log(selectedSubject, teacherName, content);
    if (result.data) {
      navigation.navigate(HomeScreens.TeacherTip, { symbol });
    }
  };

  const createTeacher = async () => {
    const schoolID = await AsyncStorage.getItem('schoolID');
    const result2 = await axios.post(
      'http://localhost:4000/api/createTeacher',
      {
        params: {
<<<<<<< Updated upstream
          name,
=======
          name: teacherName,
          subject: selectedSubject,
          schoolID,
>>>>>>> Stashed changes
        },
      },
    );

    if (result2.data) {
      setTeacherName(teacherName);
      setTeacherID(result2.data.teacher.id);
    } else {
    }
  };

<<<<<<< Updated upstream
  const checkTeacherName = async () => {
    const result = await axios.get('http://localhost:4000/api/checkTeachers', {
=======
  const getTeacherName = async () => {
    const schoolID = await AsyncStorage.getItem('schoolID');

    console.log(teacherName);
    const result = await axios.get('http://localhost:4000/api/teachers', {
>>>>>>> Stashed changes
      params: {
        schoolID,
        name: teacherName,
        subject: selectedSubject,
      },
    });

    if (result.data.teachers.length > 0) {
      console.log('선생님 확인');
      alert('선생님 이름 사용');
      setTeacherName(teacherName);
    } else {
      console.log('선생님 확인x, 선생님 추가');
      confirm('찾는 선생님 없습니다. 만드시겠습니까?');
      createTeacher();
    }
  };

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
          <Picker.Item label="과목을 선택하세요" value="null" />
          <Picker.Item label="국어" value="korean" />
          <Picker.Item label="영어" value="english" />
          <Picker.Item label="수학" value="math" />
        </Picker>
      </View>
      <View style={styles.InputText}>
        <Input value={teacherName} placeholder="선생님 이름 입력" />
        <Button>
          <Text style={{ color: 'white' }} onPress={getTeacherName}>
            검색
          </Text>
        </Button>
      </View>
      <View style={styles.InputText}>
        <Input
          value={title}
          placeholder="팁 제목"
          onChangeText={(text) => setTitle(text)}
        />
      </View>
      <View style={styles.InputText}>
        <Input
          value={contents}
          placeholder="내용 작성"
          onChangeText={(text) => setContents(text)}
        />
      </View>
      <View style={{ alignItems: 'center', marginTop: 10 }}>
        <TouchableOpacity onPress={registerTip}>
          <Text style={{ color: 'black' }}>등록</Text>
        </TouchableOpacity>
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
    justifyContents: 'center',
    alignItems: 'center',
  },
  CreateTipTitle: {
    fontSize: 30,
  },
});

export default CreateTip;
