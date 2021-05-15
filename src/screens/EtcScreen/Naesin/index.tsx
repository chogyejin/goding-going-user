import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import {
  HomeScreens,
  HomeStackParamList,
} from '../../../navigators/HomeStackNavigators';
import { StackNavigationProp } from '@react-navigation/stack';
import { Picker } from '@react-native-picker/picker';
import { Input } from 'native-base';

type NaesinNavigationProps = StackNavigationProp<
  HomeStackParamList,
  HomeScreens.Naesin
>;

export type NaesinParams = {
  symbol: string;
};

interface NaesinProps {
  route: { params: NaesinParams };
  navigation: NaesinNavigationProps;
}

const Naesin: React.FunctionComponent<NaesinProps> = (props) => {
  const { navigation, route } = props;
  const { params } = route;
  const { symbol } = params;
  const [Subject, setSubject] = useState<string>('');
  const [score, setScore] = useState<string>('');
  return (
    <View style={styles.containter}>
      <View style={styles.first}>
        <View style={{ flex: 2 }}>
          <Text>1학년</Text>
        </View>
        <View style={{ flex: 2 }}>
          <Text>2학년</Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text>3학년</Text>
        </View>
      </View>
      <View style={styles.second}>
        <View style={{ flex: 1 }}>
          <Text>1학기</Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text>2학기</Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text>1학기</Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text>2학기</Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text>1학기</Text>
        </View>
      </View>
      <View style={styles.third}>
        <View style={{ flex: 1 }}>
          <Picker
            selectedValue={Subject}
            onValueChange={(itemValue, itemIndex) => setSubject(itemValue)}>
            <Picker.Item label="선택 안 함" value="null" />
            <Picker.Item label="국어" value="korean" />
            <Picker.Item label="영어" value="english" />
            <Picker.Item label="수학" value="math" />
            <Picker.Item label="과학" value="science" />
            <Picker.Item label="사회" value="social" />
          </Picker>
          <Picker
            selectedValue={Subject}
            onValueChange={(itemValue, itemIndex) => setSubject(itemValue)}>
            <Picker.Item label="선택 안 함" value="null" />
            <Picker.Item label="국어" value="korean" />
            <Picker.Item label="영어" value="english" />
            <Picker.Item label="수학" value="math" />
            <Picker.Item label="과학" value="science" />
            <Picker.Item label="사회" value="social" />
          </Picker>
          <Picker
            selectedValue={Subject}
            onValueChange={(itemValue, itemIndex) => setSubject(itemValue)}>
            <Picker.Item label="선택 안 함" value="null" />
            <Picker.Item label="국어" value="korean" />
            <Picker.Item label="영어" value="english" />
            <Picker.Item label="수학" value="math" />
            <Picker.Item label="과학" value="science" />
            <Picker.Item label="사회" value="social" />
          </Picker>
          <Picker
            selectedValue={Subject}
            onValueChange={(itemValue, itemIndex) => setSubject(itemValue)}>
            <Picker.Item label="선택 안 함" value="null" />
            <Picker.Item label="국어" value="korean" />
            <Picker.Item label="영어" value="english" />
            <Picker.Item label="수학" value="math" />
            <Picker.Item label="과학" value="science" />
            <Picker.Item label="사회" value="social" />
          </Picker>
          <Picker
            selectedValue={Subject}
            onValueChange={(itemValue, itemIndex) => setSubject(itemValue)}>
            <Picker.Item label="선택 안 함" value="null" />
            <Picker.Item label="국어" value="korean" />
            <Picker.Item label="영어" value="english" />
            <Picker.Item label="수학" value="math" />
            <Picker.Item label="과학" value="science" />
            <Picker.Item label="사회" value="social" />
          </Picker>
          <Picker
            selectedValue={Subject}
            onValueChange={(itemValue, itemIndex) => setSubject(itemValue)}>
            <Picker.Item label="선택 안 함" value="null" />
            <Picker.Item label="국어" value="korean" />
            <Picker.Item label="영어" value="english" />
            <Picker.Item label="수학" value="math" />
            <Picker.Item label="과학" value="science" />
            <Picker.Item label="사회" value="social" />
          </Picker>
        </View>
        <View style={{ flex: 1 }}>
          <Picker
            selectedValue={Subject}
            onValueChange={(itemValue, itemIndex) => setSubject(itemValue)}>
            <Picker.Item label="선택 안 함" value="null" />
            <Picker.Item label="국어" value="korean" />
            <Picker.Item label="영어" value="english" />
            <Picker.Item label="수학" value="math" />
            <Picker.Item label="과학" value="science" />
            <Picker.Item label="사회" value="social" />
          </Picker>
        </View>
        <View style={{ flex: 1 }}>
          <Picker
            selectedValue={Subject}
            onValueChange={(itemValue, itemIndex) => setSubject(itemValue)}>
            <Picker.Item label="선택 안 함" value="null" />
            <Picker.Item label="국어" value="korean" />
            <Picker.Item label="영어" value="english" />
            <Picker.Item label="수학" value="math" />
            <Picker.Item label="과학" value="science" />
            <Picker.Item label="사회" value="social" />
          </Picker>
        </View>
        <View style={{ flex: 1 }}>
          <Picker
            selectedValue={Subject}
            onValueChange={(itemValue, itemIndex) => setSubject(itemValue)}>
            <Picker.Item label="선택 안 함" value="null" />
            <Picker.Item label="국어" value="korean" />
            <Picker.Item label="영어" value="english" />
            <Picker.Item label="수학" value="math" />
            <Picker.Item label="과학" value="science" />
            <Picker.Item label="사회" value="social" />
          </Picker>
        </View>
        <View style={{ flex: 1 }}>
          <Picker
            selectedValue={Subject}
            onValueChange={(itemValue, itemIndex) => setSubject(itemValue)}>
            <Picker.Item label="선택 안 함" value="null" />
            <Picker.Item label="국어" value="korean" />
            <Picker.Item label="영어" value="english" />
            <Picker.Item label="수학" value="math" />
            <Picker.Item label="과학" value="science" />
            <Picker.Item label="사회" value="social" />
          </Picker>
        </View>
      </View>
      <View style={styles.forth}>
        <View style={{ flex: 1 }}>
          <Input
            value={score}
            placeholder="등급"
            onChangeText={(text) => setScore(text)}
          />
          <Input
            value={score}
            placeholder="등급"
            onChangeText={(text) => setScore(text)}
          />
          <Input
            value={score}
            placeholder="등급"
            onChangeText={(text) => setScore(text)}
          />
          <Input
            value={score}
            placeholder="등급"
            onChangeText={(text) => setScore(text)}
          />
          <Input
            value={score}
            placeholder="등급"
            onChangeText={(text) => setScore(text)}
          />
          <Input
            value={score}
            placeholder="등급"
            onChangeText={(text) => setScore(text)}
          />
        </View>
        <View style={{ flex: 1 }}>
          <Input
            value={score}
            placeholder="등급"
            onChangeText={(text) => setScore(text)}
          />
        </View>
        <View style={{ flex: 1 }}>
          <Input
            value={score}
            placeholder="등급"
            onChangeText={(text) => setScore(text)}
          />
        </View>
        <View style={{ flex: 1 }}>
          <Input
            value={score}
            placeholder="등급"
            onChangeText={(text) => setScore(text)}
          />
        </View>
        <View style={{ flex: 1 }}>
          <Input
            value={score}
            placeholder="등급"
            onChangeText={(text) => setScore(text)}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  containter: {
    flexDirection: 'row',
    flex: 1,
  },
  first: {
    flex: 1,
    backgroundColor: 'red',
  },
  second: {
    flex: 1,
    backgroundColor: 'yellow',
  },
  third: {
    flex: 1,
    backgroundColor: 'blue',
  },
  forth: {
    flex: 1,
    backgroundColor: 'white',
  },
});

export default Naesin;
