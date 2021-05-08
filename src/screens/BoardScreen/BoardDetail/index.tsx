import React, { useState, useEffect } from 'react';
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
  Dimensions,
  ShadowPropTypesIOS,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import axios from 'axios';

type BoardDetailNavigationProps = StackNavigationProp<
  HomeStackParamList,
  HomeScreens.BoardDetail
>;

export type BoardDetailParams = {
  postID: string;
};

interface BoardDetailProps {
  route: { params: BoardDetailParams };
  navigation: BoardDetailNavigationProps;
}

interface Post {
  post: string;
}

// 게시글 상세 페이지에서는 받은 postID를 통해서
// useEfeect 코드를 통해 그 post.id로 api요청을 하고
// 요청해서 받ㅇ느 데이터를 state저장해서 보여주면 된다.
const BoardDetail: React.FunctionComponent<BoardDetailProps> = (props) => {
  const { navigation, route } = props;
  const { params } = route;
  const { postID } = params;
  const [post, setPost] = useState<Post>();

  useEffect(() => {
    async function showPost() {
      const result = await axios.get('http://localhost:4000/api/posts', {
        params: {
          postID: postID,
        },
      });

      if (result) {
        console.log('성공');
        setPost(post);
      } else {
        console.log('실패');
      }
    }
    showPost();
  });

  return (
    <SafeAreaView>
      <Text style={styles.BoardDetailTitle}>게시판 상세</Text>
      <Text style={styles.BoardDetailTitle}>{postID}</Text>
      <Text style={styles.BoardDetailTitle}>{post}</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  BoardDetailTitle: {
    fontSize: 30,
  },
});

export default BoardDetail;
