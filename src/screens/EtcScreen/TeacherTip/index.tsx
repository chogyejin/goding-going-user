import AsyncStorage from '@react-native-community/async-storage';
import { useFocusEffect } from '@react-navigation/native';
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

export type TeacherTipParams = {
  symbol: string;
};

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
  const { navigation, route } = props;
  const { params } = route;
  const { symbol } = params;
  const [teachers, setTeachers] = useState<Teacher[]>([]);

  const moveTeacher = (teacherID: string) => () => {
    navigation.navigate(HomeScreens.TeacherTipDetail, { teacherID });
  };

  // useEffect(() => {
  //   async function getTeacher() {
  //     const schoolID = await AsyncStorage.getItem('schoolID');
  //     const result = await axios.get('http://localhost:4000/api/teachers', {
  //       params: {
  //         schoolID,
  //       },
  //     });

  //     console.log(result.data.teachers);
  //     if (result.data) {
  //       if (teachers.length === 0) {
  //         setTeachers(result.data.teachers);
  //       }
  //     } else {
  //       console.log('실패');
  //     }
  //   }

  //   getTeacher();
  // }, [teachers]);

  useFocusEffect(
    React.useCallback(() => {
      async function getTeacher() {
        const schoolID = await AsyncStorage.getItem('schoolID');
        const result = await axios.get('http://localhost:4000/api/teachers', {
          params: {
            schoolID,
          },
        });

        console.log(result.data.teachers);
        if (result.data) {
          if (teachers.length === 0) {
            setTeachers(result.data.teachers);
          }
        } else {
          console.log('실패');
        }
      }
      getTeacher();
    }, []),
  );

  return (
    <SafeAreaView style={{ backgroundColor: '#dae7ed', flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.subTitle}>
          <Text>[과목명]</Text>
          <Text> </Text>
          <Text>이름</Text>
        </View>
        <View style={styles.CreateTipButton}>
          <Text
            onPress={() =>
              navigation.navigate(HomeScreens.CreateTip, { symbol })
            }
            style={{ padding: 10 }}>
            팁 작성
          </Text>
        </View>
        <View style={styles.tipStyle}>
          {teachers.map((teacher) => (
            <Text onPress={moveTeacher(teacher.id)} key={teacher.id}>
              [{teacher.subject}] {teacher.name}
            </Text>
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
    borderRadius: 5,
    backgroundColor: 'white',
  },
  subTitle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  CreateTipButton: {
    flexDirection: 'row-reverse',
  },
  tipStyle: {
    height: 50,
    padding: 10,
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderColor: '#dae7ed',
  },
});

export default TeacherTipScreen;
