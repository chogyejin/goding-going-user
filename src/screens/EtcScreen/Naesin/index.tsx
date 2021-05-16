import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TextInput } from 'react-native';
import {
  HomeScreens,
  HomeStackParamList,
} from '../../../navigators/HomeStackNavigators';
import { StackNavigationProp } from '@react-navigation/stack';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Button } from 'native-base';

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

export type NaesinParams = {
  symbol: string;
};

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
  const { symbol } = params;
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

  //확인 console.log
  useEffect(() => {
    console.log(totalScore.firstGrade.firstSemester);
    console.log(totalScore.firstGrade.lastSemester);
    console.log(totalScore.secondGrade.firstSemester);
    console.log(totalScore.secondGrade.lastSemester);
    console.log(totalScore.thirdGrade.firstSemester);
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

  return (
    <>
      <View style={styles.containter}>
        <View style={styles.first}>
          <View style={{ flex: 2 }}>
            <Text>1학년</Text>
          </View>
          <View style={{ flex: 2 }}>
            <Text>2학년</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text>3학년</Text>
          </View>
        </View>

        <View style={styles.second}>
          <View style={{ flex: 1 }}>
            <Text>1학기</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text>2학기</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text>1학기</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text>2학기</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text>1학기</Text>
          </View>
        </View>

        <View style={styles.third}>
          <View style={{ flex: 1 }}>
            {totalScore.firstGrade.firstSemester.map((subject) => (
              <>
                <View>{subject.subjectName}</View>
              </>
            ))}
          </View>
          <View style={{ flex: 1 }}>
            {totalScore.firstGrade.lastSemester.map((subject) => (
              <>
                <View>{subject.subjectName}</View>
              </>
            ))}
          </View>
          <View style={{ flex: 1 }}>
            {totalScore.secondGrade.firstSemester.map((subject) => (
              <>
                <View>{subject.subjectName}</View>
              </>
            ))}
          </View>
          <View style={{ flex: 1 }}>
            {totalScore.secondGrade.lastSemester.map((subject) => (
              <>
                <View>{subject.subjectName}</View>
              </>
            ))}
          </View>
          <View style={{ flex: 1 }}>
            {totalScore.thirdGrade.firstSemester.map((subject) => (
              <>
                <View>{subject.subjectName}</View>
              </>
            ))}
          </View>
        </View>

        <View style={styles.forth}>
          <View style={{ flex: 1 }}>
            {totalScore.firstGrade.firstSemester.map((subject) => (
              <>
                <TextInput
                  style={{ fontSize: 16 }}
                  value={String(subject.score)}
                  onChangeText={onChangeScore(
                    'firstGrade',
                    'firstSemester',
                    subject.subjectName,
                  )}></TextInput>
              </>
            ))}
          </View>
          <View style={{ flex: 1 }}>
            {totalScore.firstGrade.lastSemester.map((subject) => (
              <>
                <TextInput
                  style={{ fontSize: 16 }}
                  value={String(subject.score)}
                  onChangeText={onChangeScore(
                    'firstGrade',
                    'lastSemester',
                    subject.subjectName,
                  )}></TextInput>
              </>
            ))}
          </View>
          <View style={{ flex: 1 }}>
            {totalScore.secondGrade.firstSemester.map((subject) => (
              <>
                <TextInput
                  style={{ fontSize: 16 }}
                  value={String(subject.score)}
                  onChangeText={onChangeScore(
                    'secondGrade',
                    'firstSemester',
                    subject.subjectName,
                  )}></TextInput>
              </>
            ))}
          </View>
          <View style={{ flex: 1 }}>
            {totalScore.secondGrade.lastSemester.map((subject) => (
              <>
                <TextInput
                  style={{ fontSize: 16 }}
                  value={String(subject.score)}
                  onChangeText={onChangeScore(
                    'secondGrade',
                    'lastSemester',
                    subject.subjectName,
                  )}></TextInput>
              </>
            ))}
          </View>
          <View style={{ flex: 1 }}>
            {totalScore.thirdGrade.firstSemester.map((subject) => (
              <>
                <TextInput
                  style={{ fontSize: 16 }}
                  value={String(subject.score)}
                  onChangeText={onChangeScore(
                    'thirdGrade',
                    'firstSemester',
                    subject.subjectName,
                  )}></TextInput>
              </>
            ))}
          </View>
        </View>
      </View>
      <View style={styles.calcButton}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate(HomeScreens.NaesinCalc, { symbol })
          }>
          <Text>계산</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  containter: {
    flexDirection: 'row',
    flex: 1,
  },
  first: {
    flex: 1,
    backgroundColor: 'red',
  },
  second: {
    flex: 1,
    backgroundColor: 'yellow',
  },
  third: {
    flex: 1,
    backgroundColor: 'red',
  },
  forth: {
    flex: 1,
    backgroundColor: 'white',
  },
  calcButton: {
    alignItems: 'center',
    borderWidth: 4,
    borderColor: '#20232a',
    borderRadius: 6,
    backgroundColor: '#61dafb',
  },
});

export default Naesin;
