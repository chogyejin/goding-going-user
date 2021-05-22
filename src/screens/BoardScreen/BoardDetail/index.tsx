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
import { StackNavigationProp } from '@react-navigation/stack';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

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
      console.log(result);
      if (result && !isCompletedLoading) {
        setIsCompletedLoading(true);
        setPost(result.data.post);
      } else {
      }
    }

    getPost();
  }, [post]);

  async function isYou(postUserID: string) {
    const asyncUserID = await AsyncStorage.getItem('userID');
    console.log(asyncUserID);
    console.log(postUserID);
    if (postUserID == asyncUserID) {
      return false;
    } else {
      return false;
    }
  }

  const moveMessage = (userID: string) => () => {
    navigation.navigate(HomeScreens.Message, { userID });
  };

  const [isVisible, setIsVisible] = useState(false);
  console.log(isVisible);

  // 본인이 본인 작성 post의 닉네임을 누르면 쪽지보내기 뜨지 않게 하기위해 시도했으나,
  // isYou의 return이 false여도 &&연산자가 제대로 작동 안해서 일단 뺌
  // {isYou(post.userID) && isVisible ? (
  //   <View style={styles.modalBox}>
  //     <TouchableOpacity onPress={moveMessage(post.userID)}>
  //       <Text>쪽지보내기</Text>
  //     </TouchableOpacity>
  //   </View>
  // ) : (
  //   <View />
  // )}

  return (
    <SafeAreaView>
      <View style={styles.subTitle}>
        <TouchableOpacity onPress={() => setIsVisible(!isVisible)}>
          <Text> {post.user.nickName}</Text>
        </TouchableOpacity>
        {isVisible ? (
          <View style={styles.modalBox}>
            <TouchableOpacity onPress={moveMessage(post.userID)}>
              <Text style={styles.modalBoxText}>쪽지보내기</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View />
        )}
        <Text> ( {post.createdAt} )</Text>
      </View>
      <View style={styles.subTitle}>
        <Text>{post.title}</Text>
      </View>
      <View style={styles.boardBox}>
        <Text>{post.contents}</Text>
      </View>
      <View>
        <TextInput style={styles.replyBox} placeholder="  reply"></TextInput>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  BoardDetailTitle: {
    fontSize: 30,
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

export default BoardDetail;
