import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {
  HomeScreens,
  HomeStackParamList,
} from '../../../../navigators/HomeStackNavigators';
import { StackNavigationProp } from '@react-navigation/stack';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';

type NaesinCalcNavigationProps = StackNavigationProp<
  HomeStackParamList,
  HomeScreens.NaesinCalc
>;

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

export type NaesinCalcParams = {};

interface NaesinCalcProps {
  route: { params: NaesinCalcParams };
  navigation: NaesinCalcNavigationProps;
}

//임시데이터로 각 학년별 비중 골라서 계산
// const STUDEND1 = {
//   firstGrade: {
//     firstSemester: [
//       {
//         subjectName: '국어',
//         score: 1,
//       },
//       {
//         subjectName: '영어',
//         score: 1,
//       },
//       {
//         subjectName: '수학',
//         score: 1,
//       },
//       {
//         subjectName: '과학',
//         score: 1,
//       },
//       {
//         subjectName: '영어',
//         score: 1,
//       },
//     ],
//     lastSemester: [
//       {
//         subjectName: '국어',
//         score: 3,
//       },
//       {
//         subjectName: '영어',
//         score: 3,
//       },
//       {
//         subjectName: '수학',
//         score: 3,
//       },
//       {
//         subjectName: '과학',
//         score: 3,
//       },
//       {
//         subjectName: '영어',
//         score: 3,
//       },
//     ],
//   },
//   secondGrade: {
//     firstSemester: [
//       {
//         subjectName: '국어',
//         score: 2,
//       },
//       {
//         subjectName: '영어',
//         score: 2,
//       },
//       {
//         subjectName: '수학',
//         score: 2,
//       },
//       {
//         subjectName: '과학',
//         score: 2,
//       },
//       {
//         subjectName: '영어',
//         score: 2,
//       },
//     ],
//     lastSemester: [
//       {
//         subjectName: '국어',
//         score: 3,
//       },
//       {
//         subjectName: '영어',
//         score: 3,
//       },
//       {
//         subjectName: '수학',
//         score: 3,
//       },
//       {
//         subjectName: '과학',
//         score: 3,
//       },
//       {
//         subjectName: '영어',
//         score: 3,
//       },
//     ],
//   },
//   thirdGrade: {
//     firstSemester: [
//       {
//         subjectName: '국어',
//         score: 1,
//       },
//       {
//         subjectName: '영어',
//         score: 1,
//       },
//       {
//         subjectName: '수학',
//         score: 1,
//       },
//       {
//         subjectName: '과학',
//         score: 1,
//       },
//       {
//         subjectName: '영어',
//         score: 1,
//       },
//     ],
//   },
// };

const NaesinCalc: React.FunctionComponent<NaesinCalcProps> = (props) => {
  const { navigation, route } = props;
  const { params } = route;

  const [totalScore, setTotalScore] = useState<ITotalScore>({
    firstGrade: {
      firstSemester: [],
      lastSemester: [],
    },
    secondGrade: {
      firstSemester: [],
      lastSemester: [],
    },
    thirdGrade: {
      firstSemester: [],
      lastSemester: [],
    },
  });
  const [firstGradePercent, setFirstGradePercent] = useState<Number>(0);
  const [secondGradePercent, setSecondGradePercent] = useState<Number>(0);
  const [thirdGradePercent, setThirdGradePercent] = useState<Number>(0);
  const [calculatedNaesin, setCalculatedNaesin] = useState<Number>(0);

  const calculateNaesin = () => {
    let sumOf1 = 0;
    let sumOf2 = 0;
    let sumOf3 = 0;
    let sumOf4 = 0;
    let sumOf5 = 0;
    let result = 0;

    for (const ele of totalScore.firstGrade.firstSemester) {
      sumOf1 += Number(ele.score);
    }
    for (const ele of totalScore.firstGrade.lastSemester) {
      sumOf2 += Number(ele.score);
    }
    for (const ele of totalScore.secondGrade.firstSemester) {
      sumOf3 += Number(ele.score);
    }
    for (const ele of totalScore.secondGrade.lastSemester) {
      sumOf4 += Number(ele.score);
    }
    for (const ele of totalScore.thirdGrade.firstSemester) {
      sumOf5 += Number(ele.score);
    }

    result =
      ((sumOf1 + sumOf2) * Number(firstGradePercent)) / 1000 +
      ((sumOf3 + sumOf4) * Number(secondGradePercent)) / 1000 +
      (sumOf5 * Number(thirdGradePercent)) / 500;
    const calculatedNaesin = result;
    setCalculatedNaesin(calculatedNaesin);
  };

  useEffect(() => {
    async function getNaesin() {
      const userID = await AsyncStorage.getItem('userID');
      const result = await axios.get('http://localhost:4000/api/naesin', {
        params: {
          userID,
        },
      });

      if (
        result.data &&
        result.data.naesin &&
        totalScore.firstGrade.firstSemester.length === 0
      ) {
        setTotalScore({
          firstGrade: {
            firstSemester: result.data.naesin.grade1FirstSemester,
            lastSemester: result.data.naesin.grade1LastSemester,
          },
          secondGrade: {
            firstSemester: result.data.naesin.grade2FirstSemester,
            lastSemester: result.data.naesin.grade2LastSemester,
          },
          thirdGrade: {
            firstSemester: result.data.naesin.grade3FirstSemester,
            lastSemester: result.data.naesin.grade3LastSemester,
          },
        });
      } else {
        console.log('내신 가져오기 실패');
      }
    }
    getNaesin();
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contents}>
        <View style={styles.content}>
          <Text>1학년</Text>
          <TextInput
            style={{ borderBottomWidth: 1, width: 100 }}
            value={firstGradePercent ? String(firstGradePercent) : ''}
            placeholder="1학년 반영 비율"
            onChangeText={(text) =>
              setFirstGradePercent(Number(text))
            }></TextInput>
        </View>
        <View style={styles.content}>
          <Text>2학년</Text>
          <TextInput
            style={{ borderBottomWidth: 1, width: 100 }}
            value={secondGradePercent ? String(secondGradePercent) : ''}
            placeholder="2학년 반영 비율"
            onChangeText={(text) =>
              setSecondGradePercent(Number(text))
            }></TextInput>
        </View>
        <View style={styles.content}>
          <Text>3학년</Text>
          <TextInput
            style={{ borderBottomWidth: 1, width: 100 }}
            value={thirdGradePercent ? String(thirdGradePercent) : ''}
            placeholder="3학년 반영 비율"
            onChangeText={(text) =>
              setThirdGradePercent(Number(text))
            }></TextInput>
        </View>
        <View style={styles.button}>
          <TouchableOpacity onPress={calculateNaesin}>
            <Text style={{ color: 'white' }}>계산해보기</Text>
          </TouchableOpacity>
        </View>
        <View style={{ flex: 1, alignItems: 'center' }}>
          <Text style={{ fontSize: 30 }}>{calculatedNaesin}</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#dae7ed',
  },
  contents: {
    flex: 1,
    margin: 10,
    backgroundColor: 'white',
  },
  content: {
    flex: 1,
    flexDirection: 'column',
    margin: 10,
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#dae7ed',
  },
  button: {
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

export default NaesinCalc;
