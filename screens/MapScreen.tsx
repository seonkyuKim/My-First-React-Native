import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Animated,
} from 'react-native';

import MapView, {
  PROVIDER_GOOGLE,
  Marker,
  LatLng,
  Region,
} from 'react-native-maps';

import Item from '../components/MarkerItem';

import {MarkerDispatchContext} from '../MarkerDispatchContext';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../StackNavigationContainer';

import moment from 'moment';

moment.updateLocale('ko', {
  relativeTime: {
    s: '%d seconds',
    ss: '%d seconds',
    m: '%d minute',
    mm: '%d minutes',
  },
});

type MapScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'MapScreen'
>;

type Props = {
  navigation: MapScreenNavigationProp;
};

// 지도의 상태에 따라 버튼이 달라짐
type MapState = 'DEFAULT' | 'CREATE';

const Map: React.FC<Props> = ({navigation}) => {
  const markerDispatchContext = React.useContext(MarkerDispatchContext);
  const [bottomSheetState, setBottomSheetState] = React.useState<
    'OPEN' | 'CLOSE'
  >('CLOSE');
  const [mapState, setMapState] = React.useState<MapState>('DEFAULT');
  const [region, setRegionState] = React.useState<Region>({
    latitude: 37.5100586,
    longitude: 127.0553367,
    latitudeDelta: 0.015,
    longitudeDelta: 0.0121,
  });

  // draggable marker의 coordinate
  const [coordinate, setCoordinateState] = React.useState<LatLng>({
    latitude: region.latitude,
    longitude: region.longitude,
  });

  const bottomSheetAnimate = React.useRef(new Animated.Value(-160)).current;

  // Bottom Sheet Open Action
  const open = () => {
    Animated.timing(bottomSheetAnimate, {
      useNativeDriver: false,
      toValue: 0,
      duration: 200,
    }).start();
    setBottomSheetState('OPEN');
  };

  // Bottom Sheet Close Action
  const close = () => {
    Animated.timing(bottomSheetAnimate, {
      useNativeDriver: false,
      toValue: -160,
      duration: 200,
    }).start();
    setBottomSheetState('CLOSE');
  };

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE} // remove if not using Google Maps
        style={styles.map}
        initialRegion={region}
        region={region}
        onRegionChangeComplete={(region: Region) => {
          setRegionState(region);
          // 새로 생길 draggable marker의 시작 위치를 변경해줌
          setCoordinateState({
            latitude: region.latitude,
            longitude: region.longitude,
          });
        }}>
        {/* 지도에 Marker 표시 */}
        {markerDispatchContext.markerState.map((marker) => (
          <Marker coordinate={marker.coordinate} title={marker.title} />
        ))}
        {/* 추가 버튼 루를 시 draggable 버튼 생성 */}
        {mapState == 'CREATE' && (
          <Marker
            draggable
            pinColor={'green'}
            coordinate={coordinate}
            onDragEnd={(event) => {
              // 새로 만들어질 Marker의 Coordinate 상태를 저장
              markerDispatchContext.setCoordinateState(
                event.nativeEvent.coordinate,
              );
            }}
          />
        )}
      </MapView>

      <View style={styles.buttonContainer}>
        {mapState == 'DEFAULT' && (
          <TouchableOpacity
            onPress={() => {
              // 추가 버튼 누를 경우 mapState를 CREATE로 변경
              setMapState('CREATE');
            }}>
            <View style={styles.addPlaceButton}>
              <Text>장소 추가</Text>
            </View>
          </TouchableOpacity>
        )}
        {mapState == 'CREATE' && (
          <View style={styles.addCancelButtonContainer}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('CreateMarkerScreen');
                setMapState('DEFAULT');
                // 새로 만들어질 마커의 coordinate를 지정
                markerDispatchContext.setCoordinateState(coordinate);
              }}>
              <View style={styles.addButton}>
                <Text>추가</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setMapState('DEFAULT');
              }}>
              <View style={styles.cancelButton}>
                <Text>취소</Text>
              </View>
            </TouchableOpacity>
          </View>
        )}
      </View>
      <Animated.View
        style={{
          ...styles.bottomSheet,
          bottom: bottomSheetAnimate,
        }}>
        <TouchableOpacity onPress={bottomSheetState == 'OPEN' ? close : open}>
          <View style={styles.bottomSheetButton}>
            <Text>{bottomSheetState == 'OPEN' ? '닫기' : '열기'}</Text>
          </View>
        </TouchableOpacity>
        <FlatList
          style={{backgroundColor: 'white'}}
          data={markerDispatchContext.markerState}
          renderItem={({item}) => (
            <Item
              createdTime={item.createdTime}
              title={item.title}
              setRegionState={setRegionState}
              coordinate={item.coordinate}></Item>
          )}></FlatList>
      </Animated.View>
    </View>
  );
};

export default Map;


const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: '100%',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  bottomSheetButton: {
    height: 40,
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 10,
    borderBottomWidth: 0.5,
  },
  bottomSheet: {
    height: 200,
    width: '100%',
    position: 'absolute',
  },
  addButton: {
    backgroundColor: 'orange',
    paddingHorizontal: 30,
    paddingVertical: 10,
  },
  cancelButton: {
    backgroundColor: 'gray',
    paddingHorizontal: 30,
    paddingVertical: 10,
  },
  addCancelButtonContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    margin: 10,
  },
  addPlaceButton: {
    backgroundColor: 'orange',
    paddingHorizontal: 30,
    paddingVertical: 10,
    margin: 10,
  },
  buttonContainer: {
    margin: 50,
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-end',
    flexDirection: 'row',
  },
});

