import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TextInput, SafeAreaView } from 'react-native';
import {
  HomeScreens,
  HomeStackParamList,
} from '../../../navigators/HomeStackNavigators';
import { StackNavigationProp } from '@react-navigation/stack';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Button } from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';

type NaesinNavigationProps = StackNavigationProp<
  HomeStackParamList,
  HomeScreens.Naesin
>;

const DEFAULT_SUBJECT_INFO = [
  { id: 1, subjectName: '국어', score: 0 },
  { id: 2, subjectName: '영어', score: 0 },
  { id: 3, subjectName: '수학', score: 0 },
  { id: 4, subjectName: '과학', score: 0 },
  { id: 5, subjectName: '사회', score: 0 },
];

interface ITotalScore {
  firstGrade: {
    firstSemester: Array<{
      subjectName: string;
      score: number;
    }>;
    lastSemester: Array<{
      subjectName: string;
      score: number;
    }>;
  };
  secondGrade: {
    firstSemester: Array<{
      subjectName: string;
      score: number;
    }>;
    lastSemester: Array<{
      subjectName: string;
      score: number;
    }>;
  };
  thirdGrade: {
    firstSemester: Array<{
      subjectName: string;
      score: number;
    }>;
    lastSemester: Array<{
      subjectName: string;
      score: number;
    }>;
  };
}

export type NaesinParams = {};

interface NaesinProps {
  route: { params: NaesinParams };
  navigation: NaesinNavigationProps;
}

const SUBJECT_INFOS = [
  { name: '선택 안 함', value: 'null' },
  { name: '국어', value: 'korean' },
  { name: '영어', value: 'english' },
  { name: '수학', value: 'math' },
  { name: '과학', value: 'science' },
  { name: '사회', value: 'social' },
];

const Naesin: React.FunctionComponent<NaesinProps> = (props) => {
  const { navigation, route } = props;
  const { params } = route;
  const [totalScore, setTotalScore] = useState<ITotalScore>({
    firstGrade: {
      firstSemester: DEFAULT_SUBJECT_INFO,
      lastSemester: DEFAULT_SUBJECT_INFO,
    },
    secondGrade: {
      firstSemester: DEFAULT_SUBJECT_INFO,
      lastSemester: DEFAULT_SUBJECT_INFO,
    },
    thirdGrade: {
      firstSemester: DEFAULT_SUBJECT_INFO,
      lastSemester: DEFAULT_SUBJECT_INFO,
    },
  });

  const headers = {
    'Content-Type': 'application/json',
  };

  useEffect(() => {
    async function getNaesin() {
      const userID = await AsyncStorage.getItem('userID');
      const result = await axios.get('http://localhost:4000/api/naesin', {
        params: {
          userID,
        },
      });
      if (result.data && result.data.naesin) {
        navigation.navigate(HomeScreens.NaesinCalc, {});
      }
    }
    getNaesin();
  });

  const onChangeScore =
    (
      gradeName: 'firstGrade' | 'secondGrade' | 'thirdGrade',
      semesterName: 'firstSemester' | 'lastSemester',
      subjectName: string,
    ) =>
    (text: string) => {
      const convertedSubjects = totalScore[gradeName][semesterName].map(
        (subject) => {
          return subject.subjectName === subjectName
            ? { ...subject, score: Number(text) }
            : { ...subject };
        },
      );

      setTotalScore({
        ...totalScore,
        [gradeName]: {
          ...totalScore[gradeName],
          [semesterName]: convertedSubjects,
        },
      });
    };

  const onCreateNaesin = async () => {
    const userID = await AsyncStorage.getItem('userID');

    const result = await axios.post(
      'http://localhost:4000/api/createNaesin',
      { headers },
      {
        params: {
          userID,
          grade1FirstSemester: JSON.stringify(
            totalScore.firstGrade.firstSemester.map((ele) => {
              return { subject: ele.subjectName, score: ele.score };
            }),
          ),
          grade1LastSemester: JSON.stringify(
            totalScore.firstGrade.lastSemester.map((ele) => {
              return { subject: ele.subjectName, score: ele.score };
            }),
          ),
          grade2FirstSemester: JSON.stringify(
            totalScore.secondGrade.firstSemester.map((ele) => {
              return { subject: ele.subjectName, score: ele.score };
            }),
          ),
          grade2LastSemester: JSON.stringify(
            totalScore.secondGrade.lastSemester.map((ele) => {
              return { subject: ele.subjectName, score: ele.score };
            }),
          ),
          grade3FirstSemester: JSON.stringify(
            totalScore.thirdGrade.firstSemester.map((ele) => {
              return { subject: ele.subjectName, score: ele.score };
            }),
          ),
        },
      },
    );

    if (result.data) {
      navigation.navigate(HomeScreens.NaesinCalc, {});
    }
  };

  return (
    <SafeAreaView style={styles.containter}>
      <View style={styles.contents}>
        <View>
          <View style={styles.grade1}>
            <Text>1학년</Text>
          </View>
          <View style={styles.grade2}>
            <Text>2학년</Text>
          </View>
          <View style={styles.grade3}>
            <Text>3학년</Text>
          </View>
        </View>

        <View style={styles.semester}>
          <View
            style={{
              flex: 1,
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#e8f6fc',
              borderBottomWidth: 1,
              borderColor: 'white',
            }}>
            <Text>1학기</Text>
          </View>
          <View
            style={{
              flex: 1,
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#e8f6fc',
              borderBottomWidth: 1,
              borderColor: 'white',
            }}>
            <Text>2학기</Text>
          </View>
          <View
            style={{
              flex: 1,
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#dae7ed',
              borderBottomWidth: 1,
              borderColor: 'white',
            }}>
            <Text>1학기</Text>
          </View>
          <View
            style={{
              flex: 1,
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#dae7ed',
              borderBottomWidth: 1,
              borderColor: 'white',
            }}>
            <Text>2학기</Text>
          </View>
          <View
            style={{
              flex: 1,
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#c3d0d6',
            }}>
            <Text>1학기</Text>
          </View>
        </View>

        <View style={styles.subjects}>
          <View
            style={{
              flex: 1,
              width: '100%',
              backgroundColor: '#e8f6fc',
              borderBottomWidth: 1,
              borderColor: 'white',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            {totalScore.firstGrade.firstSemester.map((subject, index) => (
              <View key={index}>
                <Text>{subject.subjectName}</Text>
              </View>
            ))}
          </View>
          <View
            style={{
              flex: 1,
              width: '100%',
              backgroundColor: '#e8f6fc',
              borderBottomWidth: 1,
              borderColor: 'white',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            {totalScore.firstGrade.lastSemester.map((subject, index) => (
              <View key={index}>
                <Text>{subject.subjectName}</Text>
              </View>
            ))}
          </View>
          <View
            style={{
              flex: 1,
              width: '100%',
              backgroundColor: '#dae7ed',
              borderBottomWidth: 1,
              borderColor: 'white',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            {totalScore.secondGrade.firstSemester.map((subject, index) => (
              <View key={index}>
                <Text>{subject.subjectName}</Text>
              </View>
            ))}
          </View>
          <View
            style={{
              flex: 1,
              width: '100%',
              backgroundColor: '#dae7ed',
              borderBottomWidth: 1,
              borderColor: 'white',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            {totalScore.secondGrade.lastSemester.map((subject, index) => (
              <View key={index}>
                <Text>{subject.subjectName}</Text>
              </View>
            ))}
          </View>
          <View
            style={{
              flex: 1,
              width: '100%',
              backgroundColor: '#c3d0d6',
              borderBottomWidth: 1,
              borderColor: 'white',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            {totalScore.thirdGrade.firstSemester.map((subject, index) => (
              <View key={index}>
                <Text>{subject.subjectName}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.score}>
          <View
            style={{
              flex: 1,
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#e8f6fc',
              borderBottomWidth: 1,
              borderColor: 'white',
            }}>
            {totalScore.firstGrade.firstSemester.map((subject, index) => (
              <TextInput
                key={index}
                style={{ fontSize: 16, width: 20 }}
                value={String(subject.score)}
                onChangeText={onChangeScore(
                  'firstGrade',
                  'firstSemester',
                  subject.subjectName,
                )}></TextInput>
            ))}
          </View>
          <View
            style={{
              flex: 1,
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#e8f6fc',
              borderBottomWidth: 1,
              borderColor: 'white',
            }}>
            {totalScore.firstGrade.lastSemester.map((subject, index) => (
              <TextInput
                key={index}
                style={{ fontSize: 16, width: 20 }}
                value={String(subject.score)}
                onChangeText={onChangeScore(
                  'firstGrade',
                  'lastSemester',
                  subject.subjectName,
                )}></TextInput>
            ))}
          </View>
          <View
            style={{
              flex: 1,
              width: '100%',
              backgroundColor: '#dae7ed',
              borderBottomWidth: 1,
              borderColor: 'white',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            {totalScore.secondGrade.firstSemester.map((subject, index) => (
              <TextInput
                key={index}
                style={{ fontSize: 16, width: 20 }}
                value={String(subject.score)}
                onChangeText={onChangeScore(
                  'secondGrade',
                  'firstSemester',
                  subject.subjectName,
                )}></TextInput>
            ))}
          </View>
          <View
            style={{
              flex: 1,
              width: '100%',
              backgroundColor: '#dae7ed',
              borderBottomWidth: 1,
              borderColor: 'white',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            {totalScore.secondGrade.lastSemester.map((subject, index) => (
              <TextInput
                key={index}
                style={{ fontSize: 16, width: 20 }}
                value={String(subject.score)}
                onChangeText={onChangeScore(
                  'secondGrade',
                  'lastSemester',
                  subject.subjectName,
                )}></TextInput>
            ))}
          </View>
          <View
            style={{
              flex: 1,
              width: '100%',
              backgroundColor: '#c3d0d6',
              borderBottomWidth: 1,
              borderColor: 'white',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            {totalScore.thirdGrade.firstSemester.map((subject, index) => (
              <TextInput
                key={index}
                style={{ fontSize: 16, width: 20 }}
                value={String(subject.score)}
                onChangeText={onChangeScore(
                  'thirdGrade',
                  'firstSemester',
                  subject.subjectName,
                )}></TextInput>
            ))}
          </View>
        </View>
      </View>
      <View style={styles.calcButton}>
        <TouchableOpacity onPress={onCreateNaesin}>
          <Text style={{ color: 'white' }}>비율 계산 페이지로 이동</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  containter: {
    flex: 1,
    backgroundColor: 'white',
  },
  contents: {
    flex: 1,
    margin: 10,
    flexDirection: 'row',
  },
  grade1: {
    flex: 2,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderColor: 'white',
    backgroundColor: '#e8f6fc',
  },
  grade2: {
    flex: 2,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderColor: 'white',
    backgroundColor: '#dae7ed',
  },
  grade3: {
    flex: 1,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderColor: 'white',
    backgroundColor: '#c3d0d6',
  },
  semester: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderColor: 'white',
  },

  subjects: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRightWidth: 1,
    borderColor: 'white',
  },
  score: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  calcButton: {
    height: 30,
    alignItems: 'center',
    borderRadius: 10,
    marginLeft: 10,
    marginRight: 5,
    marginBottom: 5,
    padding: 3,
    justifyContent: 'center',
    backgroundColor: '#1388c2',
  },
});

export default Naesin;
