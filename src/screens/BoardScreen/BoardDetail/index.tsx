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

interface IPost {
  id: string;
  schoolID: string;
  title: string;
  contents: string;
  userID: string;
  hits: number;
  recommendUserIDs: string;
  createdAt: string;
  updatedAt: string;
  user: {
    nickName: string;
    userID: string;
  };
}

// 게시글 상세 페이지에서는 받은 postID를 통해서
// useEfeect 코드를 통해 그 post.id로 api요청을 하고
// 요청해서 받ㅇ느 데이터를 state저장해서 보여주면 된다.
const BoardDetail: React.FunctionComponent<BoardDetailProps> = (props) => {
  const { navigation, route } = props;
  const { params } = route;
  const { postID } = params;
  const [isCompletedLoading, setIsCompletedLoading] = useState<boolean>(false);
  const [post, setPost] = useState<IPost>({
    id: '',
    schoolID: '',
    title: '',
    contents: '',
    userID: '',
    hits: 0,
    recommendUserIDs: '',
    createdAt: '',
    updatedAt: '',
    user: {
      nickName: '',
      userID: '',
    },
  });

  useEffect(() => {
    async function getPost() {
      const result = await axios.get('http://localhost:4000/api/post', {
        params: {
          postID,
        },
      });
      if (result && !isCompletedLoading) {
        setIsCompletedLoading(true);
        setPost(result.data.post);
      } else {
      }
    }

    getPost();
  }, [post]);

  return (
    <SafeAreaView>
      <Text style={styles.BoardDetailTitle}>게시판 상세</Text>
      <View>
        <Text>
          <Text>내용</Text>
          {post.contents}
        </Text>
      </View>
      <View>
        <Text>{post.createdAt}</Text>
      </View>
      <View>
        <Text>
          <Text style={styles.title}>제목: </Text>
          {post.title}
        </Text>
      </View>
      <View>
        <Text>
          <Text>제 옆에 피카츄가 없어요... {post.user.nickName}</Text>
        </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  BoardDetailTitle: {
    fontSize: 30,
  },
  subTitle: {
    flexDirection: 'row',
  },
  title: {
    fontSize: 40,
  },
});

export default BoardDetail;
