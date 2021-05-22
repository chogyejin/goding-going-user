import React, { useState, useEffect } from 'react';
import {
  HomeScreens,
  HomeStackParamList,
} from '../../../../navigators/HomeStackNavigators';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  ShadowPropTypesIOS,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import axios from 'axios';

type TeacherTipDetailNavigationProps = StackNavigationProp<
  HomeStackParamList,
  HomeScreens.TeacherTipDetail
>;

export type TeacherTipDetailParams = {
  teacherID: string;
};

interface TeacherTipDetailProps {
  route: { params: TeacherTipDetailParams };
  navigation: TeacherTipDetailNavigationProps;
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

const TeacherTipDetail: React.FunctionComponent<TeacherTipDetailProps> = (
  props,
) => {
  const { navigation, route } = props;
  const { params } = route;
  const { teacherID } = params;
  const [tips, setTips] = useState<ITip[]>([]);

  useEffect(() => {
    async function getTip() {
      const result = await axios.get('http://localhost:4000/api/tips', {
        params: {
          teacherID,
        },
      });
      if (result.data) {
        if (tips.length === 0) {
          setTips(result.data.tips);
        }
      } else {
        console.log('실패');
      }
    }
    getTip();
  }, [tips]);

  return (
    <SafeAreaView>
      <Text style={styles.TeacherTipDetailTitle}>게시판 상세</Text>
      <View style={styles.subTitle}>
        <Text>팁제목</Text>
        <Text>팁내용</Text>
      </View>
      <View>
        {tips.map((tip) => (
          <Text key={tip.id}>
            {tip.title} {tip.contents}
          </Text>
        ))}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  TeacherTipDetailTitle: {
    fontSize: 30,
  },
  subTitle: {
    flexDirection: 'row',
  },
});

export default TeacherTipDetail;
