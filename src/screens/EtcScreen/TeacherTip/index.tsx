import { StackNavigationProp } from '@react-navigation/stack';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import {
  HomeScreens,
  HomeStackParamList,
} from '../../../navigators/HomeStackNavigators';

type TeacherTipNavigationProps = StackNavigationProp<
  HomeStackParamList,
  HomeScreens.TeacherTip
>;

export type TeacherTipParams = {};

interface TeacherTipProps {
  route: { params: TeacherTipParams };
  navigation: TeacherTipNavigationProps;
}

interface Teacher {
  id: string;
  name: string;
  subject: string;
  schoolID: string;
}
//schoolID으로 api(api/teachers) 요청하고 선생님 이름, 과목 가져오기

const TeacherTipScreen: React.FunctionComponent<TeacherTipProps> = (props) => {
  const { navigation } = props;
  const [teachers, setTeachers] = useState<Teacher[]>([]);

  const moveTeacher = (teacherID: string) => () => {
    navigation.navigate(HomeScreens.TeacherTipDetail, { teacherID });
  };

  useEffect(() => {
    async function getTeacher() {
      const result = await axios.get('http://localhost:4000/api/teachers', {
        params: {
          schoolID: 'S010000391',
        },
      });

      if (result.data) {
        if (teachers.length === 0) {
          setTeachers(result.data.teachers);
        }
      } else {
        console.log('실패');
      }
    }
    getTeacher();
  }, [teachers]);

  return (
    <SafeAreaView>
      <Text style={styles.TeacherTipTitle}>선생님 팁 게시판 타이틀</Text>
      <View>
        <Text>과목명</Text>
        <Text>이름</Text>
      </View>
      <View style={styles.container}>
        {teachers.map((teacher) => (
          <Text onPress={moveTeacher(teacher.id)} key={teacher.id}>
            {teacher.subject} {teacher.name}
          </Text>
        ))}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    alignItems: 'center',
  },
  TeacherTipTitle: {
    fontSize: 30,
  },
});

export default TeacherTipScreen;
