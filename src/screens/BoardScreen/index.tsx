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
import { StackNavigationProp } from '@react-navigation/stack';
import axios from 'axios';

type BoardScreenNavigationProps = StackNavigationProp<
  HomeStackParamList,
  HomeScreens.Board
>;

export type BoardParams = {
  symbol: string;
};

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
  const [symbol, setSymbol] = useState<string>('');
  const [posts, setPosts] = useState<Post[]>([]);
  const movePost = (postID: string) => () => {
    // 게시글 상세 페이지로 이동한다.
    // 이동할 때 postID를 같이 넘겨서 이동한다.
    navigation.navigate(HomeScreens.BoardDetail, { symbol });

    console.log('asd');
  };

  // 이 아래있는 주석은 다른 파일에서 이뤄지는 행동(게시글 상세 페이지가 새로 생겨야 한다.)
  // 게시글 상세 페이지에서는 받은 postID를 통해서
  // useEfeect 코드를 통해 그 post.id로 api요청을 하고
  // 요청해서 받ㅇ느 데이터를 state저장해서 보여주면 된다.

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
function async() {
  throw new Error('Function not implemented.');
}
