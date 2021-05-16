import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TextInput } from 'react-native';
import {
  HomeScreens,
  HomeStackParamList,
} from '../../../../navigators/HomeStackNavigators';
import { StackNavigationProp } from '@react-navigation/stack';

type NaesinCalcNavigationProps = StackNavigationProp<
  HomeStackParamList,
  HomeScreens.NaesinCalc
>;

export type NaesinCalcParams = {
  symbol: string;
};

interface NaesinCalcProps {
  route: { params: NaesinCalcParams };
  navigation: NaesinCalcNavigationProps;
}

//임시데이터로 각 학년별 비중 골라서 계산
const STUDEND1 = {
  firstGrade: {
    firstSemester: [
      {
        subjectName: '국어',
        score: 1,
      },
      {
        subjectName: '영어',
        score: 1,
      },
      {
        subjectName: '수학',
        score: 1,
      },
      {
        subjectName: '과학',
        score: 1,
      },
      {
        subjectName: '영어',
        score: 1,
      },
    ],
    lastSemester: [
      {
        subjectName: '국어',
        score: 3,
      },
      {
        subjectName: '영어',
        score: 3,
      },
      {
        subjectName: '수학',
        score: 3,
      },
      {
        subjectName: '과학',
        score: 3,
      },
      {
        subjectName: '영어',
        score: 3,
      },
    ],
  },
  secondGrade: {
    firstSemester: [
      {
        subjectName: '국어',
        score: 2,
      },
      {
        subjectName: '영어',
        score: 2,
      },
      {
        subjectName: '수학',
        score: 2,
      },
      {
        subjectName: '과학',
        score: 2,
      },
      {
        subjectName: '영어',
        score: 2,
      },
    ],
    lastSemester: [
      {
        subjectName: '국어',
        score: 3,
      },
      {
        subjectName: '영어',
        score: 3,
      },
      {
        subjectName: '수학',
        score: 3,
      },
      {
        subjectName: '과학',
        score: 3,
      },
      {
        subjectName: '영어',
        score: 3,
      },
    ],
  },
  thirdGrade: {
    firstSemester: [
      {
        subjectName: '국어',
        score: 1,
      },
      {
        subjectName: '영어',
        score: 1,
      },
      {
        subjectName: '수학',
        score: 1,
      },
      {
        subjectName: '과학',
        score: 1,
      },
      {
        subjectName: '영어',
        score: 1,
      },
    ],
  },
};

const NaesinCalc: React.FunctionComponent<NaesinCalcProps> = (props) => {
  const { navigation, route } = props;
  const { params } = route;
  const [firstGradePercent, setFirstGradePercent] = useState<Number>(0);
  const [secondGradePercent, setSecondGradePercent] = useState<Number>(0);
  const [thirdGradePercent, setThirdGradePercent] = useState<Number>(0);

  useEffect(() => {
    console.log(STUDEND1.firstGrade.firstSemester[0].score);
    console.log(STUDEND1.firstGrade.firstSemester.length);
  });

  return (
    <View style={styles.container}>
      <View style={{ flex: 1 }}>
        <Text>1학년</Text>
        <TextInput
          style={{ borderWidth: 1, width: 100 }}
          value={String(firstGradePercent)}
          placeholder="1학년 반영 비율"
          onChangeText={(text) =>
            setFirstGradePercent(Number(text))
          }></TextInput>
      </View>
      <View style={{ flex: 1 }}>
        <Text>2학년</Text>
        <TextInput
          style={{ borderWidth: 1, width: 100 }}
          value={String(secondGradePercent)}
          placeholder="2학년 반영 비율"
          onChangeText={(text) =>
            setSecondGradePercent(Number(text))
          }></TextInput>
      </View>
      <View style={{ flex: 1 }}>
        <Text>3학년</Text>
        <TextInput
          style={{ borderWidth: 1, width: 100 }}
          value={String(thirdGradePercent)}
          placeholder="3학년 반영 비율"
          onChangeText={(text) =>
            setThirdGradePercent(Number(text))
          }></TextInput>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default NaesinCalc;
