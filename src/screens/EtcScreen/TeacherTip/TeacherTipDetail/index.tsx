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
    <SafeAreaView style={styles.container}>
      <View>
        {tips.map((tip) => (
          <View style={styles.tipList}>
            <Text style={{ fontWeight: '600' }} key={tip.id}>
              [ {tip.title} ]
            </Text>
            <Text key={tip.id}>{tip.contents}</Text>
          </View>
        ))}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#dae7ed',
  },
  tipList: {
    backgroundColor: 'white',
    margin: 10,
    padding: 10,
  },
});

export default TeacherTipDetail;
