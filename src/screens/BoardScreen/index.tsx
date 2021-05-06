import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
} from 'react-native';
import {
  HomeScreens,
  HomeStackParamList,
} from '../../navigators/HomeStackNavigators';
import {
  createStackNavigator,
  StackNavigationProp,
} from '@react-navigation/stack';
import axios from 'axios';

type BoardScreenNavigationProps = StackNavigationProp<
  HomeStackParamList,
  HomeScreens.Board
>;

export type BoardParams = {};

interface BoardScreenProps {
  navigation: BoardScreenNavigationProps;
}

interface Post {
  id: string;
  userID: string;
  schoolID: string;
  title: string;
}
const BoardScreen: React.FunctionComponent<BoardScreenProps> = (props) => {
  const { navigation } = props;
  const [posts, setPosts] = useState<Post[]>([]);

  const movePost = (postID: string) => () => {
    // 게시글 상세 페이지로 이동한다.
    // 이동할 때 postID를 같이 넘겨서 이동한다.
    const postID = '123123'; //임시 postID
    navigation.navigate(HomeScreens.BoardDetail, { postID });
  };

  useEffect(() => {
    async function getPost() {
      const result = await axios.get('http://localhost:4000/api/posts', {
        params: {
          schoolID: 'S010000391',
        },
      });

      if (result.data) {
        if (posts.length === 0) {
          setPosts(result.data.posts);
        }
        console.log(posts[0]);
      } else {
        console.log('실패');
      }
    }
    getPost();
  }, [posts]);

  return (
    <SafeAreaView>
      <Text style={styles.ScreenTitle}>학교 게시판 테스트</Text>
      <View style={styles.container}>
        {posts.map((post) => (
          <Text onPress={movePost(post.id)} key={post.id}>
            {post.title}
          </Text>
        ))}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    alignItems: 'center',
  },
  ScreenTitle: {
    alignSelf: 'center',
    fontSize: 30,
  },
  BoardTitle: {
    marginTop: 20,
    marginBottom: 10,
    color: 'white',
    flexDirection: 'column',
    fontSize: 20,
    backgroundColor: 'grey',
    borderRadius: 10,
    padding: 10,
  },
});

export default BoardScreen;
