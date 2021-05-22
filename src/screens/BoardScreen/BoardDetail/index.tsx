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
    <SafeAreaView style={{ flex: 1, backgroundColor: '#dae7ed' }}>
      <View style={styles.container}>
        <View style={styles.nicknameBox}>
          <Text
            style={{ marginTop: 10, marginLeft: 10 }}
            onPress={() => setIsVisible(!isVisible)}>
            {post.user.nickName}
          </Text>

          {isVisible ? (
            <View style={styles.modalBox}>
              <TouchableOpacity onPress={moveMessage(post.userID)}>
                <Text style={styles.modalBoxText}>쪽지보내기</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View />
          )}

          <Text
            style={{
              fontSize: 13,
              alignSelf: 'flex-end',
              marginRight: 10,
            }}>
            ( {post.createdAt} )
          </Text>
        </View>
        <View style={styles.content}>
          <View style={styles.titleBox}>
            <Text style={{ fontSize: 15, fontWeight: 'bold' }}>
              {post.title}
            </Text>
          </View>
          <View style={styles.boardBox}>
            <Text>{post.contents}</Text>
          </View>
        </View>
        <View>
          <TextInput style={styles.replyBox} placeholder="  reply"></TextInput>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,

    //backgroundColor: 'white',
  },
  nicknameBox: {
    marginBottom: 10,
    height: 50,
    flexDirection: 'column',
    backgroundColor: 'white',
  },
  content: {
    flex: 1,
    backgroundColor: 'white',
  },
  titleBox: {
    margin: 10,
    paddingTop: 10,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderColor: '#b5bfc4',
    flexDirection: 'row',
    backgroundColor: 'white',
  },
  boardBox: {
    margin: 10,
    paddingTop: 20,
    paddingBottom: 20,
    //borderBottomWidth: 1,
    //borderColor: '#1388c2',
    backgroundColor: 'white',
  },
  replyBox: {
    margin: 10,
    height: 20,
    borderRadius: 10,
    backgroundColor: 'white',
  },
  modalBoxText: {
    color: '#1388c2',
    fontSize: 12,
  },
  modalBox: {
    left: 10,
    top: 30,
    width: 80,
    height: 20,
    alignItems: 'center',
    position: 'absolute',
  },
});

export default BoardDetail;
