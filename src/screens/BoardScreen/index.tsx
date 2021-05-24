import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
} from 'react-native';
import { Icon } from 'native-base';
import {
  HomeScreens,
  HomeStackParamList,
} from '../../navigators/HomeStackNavigators';
import {
  createStackNavigator,
  StackNavigationProp,
} from '@react-navigation/stack';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import { useIsFocused, useFocusEffect } from '@react-navigation/native';

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
  const [isFirstLoad, setIsFirstLoad] = useState<Boolean>(true);

  const movePost = (postID: string) => () => {
    navigation.navigate(HomeScreens.BoardDetail, { postID });
  };

  const onMoveCreationPage = () => {
    navigation.navigate(HomeScreens.BoardCreation);
  };

  useFocusEffect(
    React.useCallback(() => {
      async function getPost() {
        const myShcoolID = await AsyncStorage.getItem('schoolID');
        const result = await axios.get('http://localhost:4000/api/posts', {
          params: {
            schoolID: myShcoolID,
          },
        });

        if (result.data) {
          const existsPosts = result.data.posts.length > 0;
          if (isFirstLoad && existsPosts) {
            setIsFirstLoad(false);
            console.log(result.data.posts);
            setPosts(result.data.posts || []);
          }
        } else {
          console.log('실패');
        }
      }
      getPost();
    }, [posts]),
  );
  //<Icon name="add-circle-outline"></Icon>
  return (
    <SafeAreaView style={{ backgroundColor: '#dae7ed', flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.subTitle}>
          <Text> 자유 게시판 </Text>
        </View>
        <TouchableOpacity
          style={styles.newPostButton}
          onPress={onMoveCreationPage}>
          <Text>새로운 글쓰기</Text>
        </TouchableOpacity>
        {posts.map((post) => (
          <TouchableOpacity style={styles.postStyle}>
            <Text
              onPress={movePost(post.id)}
              key={post.id}
              style={{ marginLeft: 10 }}>
              {post.title}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  subTitle: {
    margin: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    margin: 10,
    borderRadius: 5,
    backgroundColor: 'white',
    //alignItems: 'center',
  },
  postStyle: {
    height: 80,
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderColor: '#dae7ed',
    //backgroundColor: 'white',
    // alignItems: 'center',
  },
  newPostButton: {
    margin: 10,
    flexDirection: 'row-reverse',
  },
  // BoardTitle: {
  //   marginTop: 20,
  //   marginBottom: 10,
  //   color: 'white',
  //   flexDirection: 'column',
  //   fontSize: 20,
  //   backgroundColor: 'grey',
  //   borderRadius: 10,
  //   padding: 10,
  // },
});

export default BoardScreen;
