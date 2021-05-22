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
import { RichEditor } from 'react-native-pell-rich-editor';

type BoardCreationNavigationProps = StackNavigationProp<
  HomeStackParamList,
  HomeScreens.BoardCreation
>;

export type BoardCreationParams = {
  postID: string;
};

interface BoardCreationProps {
  route: { params: BoardCreationParams };
  navigation: BoardCreationNavigationProps;
}

interface IPost {
  schoolID: string;
  title: string;
  contents: string;
  userID: string;
  hits: number;
  recommendUserIDs: string;
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
  });

  useEffect(() => {
    async function getMyUserIDAndSchoolID() {
      const myUserID = await AsyncStorage.getItem('userID');
      const mySchoolID = await AsyncStorage.getItem('schoolID');
      console.log('왜 스쿨 아이디가 없죠...?');
      console.log(mySchoolID);

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
        },
      },
    );
    navigation.navigate(HomeScreens.BoardDetail, {
      postID: result.data.post.id,
      // newMessageID: result.data.message.id,
    });

    console.log('버튼을 클릭하였구나');
  };

  console.log(post.title);

  return (
    <SafeAreaView>
      <View>
        <View>
          <InputGroup stackedLabel>
            <Label>제목</Label>
            <Input
              style={styles.title}
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
      </View>
      <View>
        <Label>내용</Label>
        <Textarea
          style={styles.title}
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

      <Button onPress={onCreationPost}>
        <Text>작성완료</Text>
      </Button>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  BoardCreationTitle: {
    fontSize: 30,
  },
  title: {
    backgroundColor: 'white',
  },
  subTitle: {
    margin: 10,
    height: 20,
    flexDirection: 'row',
    backgroundColor: 'white',
  },
  boardBox: {
    margin: 10,
    height: 100,
    backgroundColor: 'white',
  },
  replyBox: {
    margin: 10,
    height: 20,
    borderRadius: 10,
    backgroundColor: 'white',
  },
  mailbox: {
    alignItems: 'flex-end',
    marginRight: 10,
  },
  modalBoxText: {
    color: 'white',
  },
  modalBox: {
    left: 10,
    top: 20,
    width: 80,
    height: 20,
    borderRadius: 5,
    backgroundColor: '#1388c2',
    opacity: 0.8,
    alignItems: 'center',
    position: 'absolute',
  },
});

export default BoardCreation;
