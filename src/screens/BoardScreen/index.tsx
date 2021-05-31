import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  Dimensions,
} from 'react-native';
import { FooterTab, Icon } from 'native-base';
import {
  HomeScreens,
  HomeStackParamList,
} from '../../navigators/HomeStackNavigators';
import moment from 'moment';
import { StackNavigationProp } from '@react-navigation/stack';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { Label, InputGroup, Button } from 'native-base';
import { Picker } from '@react-native-picker/picker';

const CATEGORIES = ['자유', '입시', '동아리', '1학년', '2학년', '3학년'];

type BoardScreenNavigationProps = StackNavigationProp<
  HomeStackParamList,
  HomeScreens.Board
>;

export type BoardParams = {};

interface BoardScreenProps {
  route: { params: BoardParams };
  navigation: BoardScreenNavigationProps;
}

interface Post {
  id: string;
  userID: string;
  schoolID: string;
  title: string;
  category: string;
  createdAt: string;
  user: {
    nickName: string;
  };
}
const BoardScreen: React.FunctionComponent<BoardScreenProps> = (props) => {
  const { navigation, route } = props;
  const { params } = route;
  const [posts, setPosts] = useState<Post[]>([]);
  const [isFirstLoad, setIsFirstLoad] = useState<Boolean>(true);
  const [selectedCategory, setSelectedCategroy] = useState<string>('전체 보기');

  const movePost = (postID: string) => () => {
    navigation.navigate(HomeScreens.BoardDetail, { postID });
  };

  const onMoveCreationPage = () => {
    navigation.navigate(HomeScreens.BoardCreation, {});
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
            setPosts(result.data.posts || []);
          }
        } else {
          console.log('실패');
        }
      }
      getPost();
    }, [posts]),
  );

  const onChangeSelectedCategry = async (itemValue: string) => {
    const myShcoolID = await AsyncStorage.getItem('schoolID');
    setSelectedCategroy(itemValue);
    const result = await axios.get('http://localhost:4000/api/posts', {
      params: {
        schoolID: myShcoolID,
        category: itemValue === '전체 보기' ? undefined : itemValue,
      },
    });
    if (result.data) {
      setPosts(result.data.posts || []);
    }
  };

  //<Icon name="add-circle-outline"></Icon>
  return (
    <SafeAreaView
      style={{
        backgroundColor: '#dae7ed',
        flex: 1,
        justifyContent: 'space-between',
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
      }}>
      <View style={styles.container}>
        <View style={styles.subTitle}>
          <Text>게시판 </Text>
        </View>
        <TouchableOpacity
          style={styles.newPostButton}
          onPress={onMoveCreationPage}>
          <Text style={{ color: 'blue' }}>새로운 글쓰기</Text>
        </TouchableOpacity>
        <InputGroup stackedLabel style={{ paddingBottom: '16px' }}>
          <Label>카테고리</Label>
          <Picker
            selectedValue={selectedCategory}
            onValueChange={onChangeSelectedCategry}>
            <Picker.Item label={'전체 보기'} value={'전체 보기'} />
            {CATEGORIES.map((category) => (
              <Picker.Item label={category} value={category} />
            ))}
          </Picker>
        </InputGroup>
        {posts.map((post) => (
          <TouchableOpacity key={post.id} style={styles.postStyle}>
            <Text
              onPress={movePost(post.id)}
              key={post.id}
              style={{ marginLeft: 10, marginBottom: 8 }}>
              <b>[{post.category}]</b> {post.title}
            </Text>
            <Text style={styles.postNickNameStyle}>
              작성자: {post.user.nickName} /{' '}
              {moment(post.createdAt).format('YYYY-M-D H:m:s')}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <View>
        <View style={styles.tab}>
          <FooterTab>
            <Button
              onPress={() => navigation.navigate(HomeScreens.Details, {})}>
              <Icon name="home" />
            </Button>
            <Button onPress={() => navigation.navigate(HomeScreens.Board, {})}>
              <Icon name="reader-outline" />
            </Button>
            <Button onPress={() => navigation.navigate(HomeScreens.Etc, {})}>
              <Icon name="grid-outline" />
            </Button>
            <Button onPress={() => navigation.navigate(HomeScreens.Board, {})}>
              <Icon name="chatbox-outline" />
            </Button>
            <Button
              onPress={() => navigation.navigate(HomeScreens.Profile, {})}>
              <Icon name="person" />
            </Button>
          </FooterTab>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  postNickNameStyle: {
    textAlign: 'right',
    paddingRight: '8px',
    fontSize: 12,
  },
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

  tab: {
    flex: 1,
  },
});

export default BoardScreen;
