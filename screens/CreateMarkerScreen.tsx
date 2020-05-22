import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity,
} from 'react-native';

import {MarkerDispatchContext} from '../MarkerDispatchContext';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../StackNavigationContainer';

import moment from 'moment';

type CreateMarkerScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'CreateMarkerScreen'
>;

type Props = {
  navigation: CreateMarkerScreenNavigationProp;
};

const CreateMarkerScreen: React.FC<Props> = ({navigation}) => {
  const markerDispatchContext = React.useContext(MarkerDispatchContext);
  const [text, setText] = React.useState('');

  return (
    <KeyboardAvoidingView style={styles.container}>
      <TextInput
        style={styles.placeInput}
        onChangeText={(text) => setText(text)}
        placeholder="장소 이름"
        value={text}
      />
      <TouchableOpacity
        style={{width: '100%'}}
        onPress={() => {
          // 추가 버튼 누를 경우 mapState를 CREATE로 변경
          markerDispatchContext.dispatch({
            type: 'CREATE',
            meta: {
              coordinate: markerDispatchContext.coordinateState,
              title: text,
              createdTime: moment().format(),
            },
          });

          navigation.goBack();
        }}>
        <View style={styles.addPlaceButton}>
          <Text>장소 추가</Text>
        </View>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: '100%',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  addPlaceButton: {
    backgroundColor: 'orange',
    paddingHorizontal: 30,
    paddingVertical: 10,
    width: '100%',
    alignItems: 'center',
  },
  placeInput: {width: '90%', height: 40, margin: 20, fontSize: 16},
});

export default CreateMarkerScreen;
