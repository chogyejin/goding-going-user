import React, { useState, useEffect, useReducer } from 'react';
import {
  HomeScreens,
  HomeStackParamList,
} from '../../../navigators/HomeStackNavigators';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { Input, Label, Item, InputGroup, Textarea, Button } from 'native-base';
import { useRef } from 'react';

import { StackNavigationProp } from '@react-navigation/stack';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import { Picker } from '@react-native-picker/picker';
//import { RichEditor } from 'react-native-pell-rich-editor';

type BoardCreationNavigationProps = StackNavigationProp<
  HomeStackParamList,
  HomeScreens.BoardCreation
>;

export type BoardCreationParams = {
  postID: string;
  symbol: string;
};

interface BoardCreationProps {
  route: { params: BoardCreationParams };
  navigation: BoardCreationNavigationProps;
}

const CATEGORIES = ['자유', '입시', '동아리', '1학년', '2학년', '3학년'];
interface IPost {
  schoolID: string;
  title: string;
  contents: string;
  userID: string;
  hits: number;
  recommendUserIDs: string;
  category: string;
}

// 게시글 상세 페이지에서는 받은 postID를 통해서
// useEfeect 코드를 통해 그 post.id로 api요청을 하고
// 요청해서 받ㅇ느 데이터를 state저장해서 보여주면 된다.
const BoardCreation: React.FunctionComponent<BoardCreationProps> = (props) => {
  const { navigation } = props;
  const [post, setPost] = useState<IPost>({
    schoolID: '',
    title: '',
    contents: '',
    userID: '',
    hits: 0,
    recommendUserIDs: '',
    category: '자유',
  });
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    setDisabled(!(post.title && post.contents));
  }, [post.contents, post.title]);

  useEffect(() => {
    async function getMyUserIDAndSchoolID() {
      const myUserID = await AsyncStorage.getItem('userID');
      const mySchoolID = await AsyncStorage.getItem('schoolID');

      setPost({
        ...post,
        userID: myUserID!,
        schoolID: mySchoolID!,
      });
    }

    if (!post.userID) {
      getMyUserIDAndSchoolID();
    }
  });

  const onCreationPost = async () => {
    const result = await axios.post(
      'http://localhost:4000/api/createPost',
      { 'Content-Type': 'application/json' },
      {
        params: {
          schoolID: post.schoolID,
          title: post.title,
          contents: post.contents,
          userID: post.userID,
          hits: 0,
          recommendUserIDs: [],
          category: post.category,
        },
      },
    );
    navigation.navigate(HomeScreens.BoardDetail, {
      postID: result.data.post.id,
      // newMessageID: result.data.message.id,
    });
  };

  return (
    <SafeAreaView style={{ backgroundColor: '#dae7ed', flex: 1 }}>
      <View style={styles.container}>
        <View>
          <InputGroup stackedLabel style={{}}>
            <Label>카테고리</Label>
            <Picker
              selectedValue={post.category}
              onValueChange={(itemValue) =>
                setPost({ ...post, category: itemValue })
              }>
              {CATEGORIES.map((category) => (
                <Picker.Item label={category} value={category} />
              ))}
            </Picker>
          </InputGroup>
        </View>
        <View>
          <InputGroup stackedLabel style={{}}>
            <Label>제목</Label>
            <Input
              value={post.title}
              onChangeText={(text: string) =>
                setPost({
                  ...post,
                  title: text,
                })
              }
            />
          </InputGroup>
        </View>
        <View style={{ flex: 1 }}>
          <Label> 내용</Label>
          <Textarea
            style={{ height: 400 }}
            rowSpan={5}
            value={post.contents}
            onChangeText={(text: string) =>
              setPost({
                ...post,
                contents: text,
              })
            }
          />
        </View>
      </View>
      <View style={{ alignItems: 'flex-end', margin: 10 }}>
        <TouchableOpacity
          onPress={onCreationPost}
          disabled={disabled}
          style={disabled ? styles.disabled : styles.buttonContainer}>
          <Text>작성 완료</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
    backgroundColor: 'white',
  },

  buttonContainer: {
    width: 100,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5,
    borderRadius: 10,
    backgroundColor: '#1388c2',
  },
  disabled: {
    width: 100,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5,
    borderRadius: 10,
    backgroundColor: '#596c75',
  },
});

export default BoardCreation;
