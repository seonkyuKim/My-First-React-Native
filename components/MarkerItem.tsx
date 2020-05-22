import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import moment from 'moment';
import {Region} from 'react-native-maps';
import {LatLng} from '../models/Marker';


type Props = {
  title: String;
  createdTime: string;
  setRegionState: (region: Region) => void;
  coordinate: LatLng;
}

const MarkerListItem: React.FC<Props> = ({title, createdTime, coordinate, setRegionState}) => {
  const [fromNow, setFromNow] = React.useState<string>(
    moment(createdTime).fromNow(),
  );
  React.useEffect(() => {
    // 컴포넌트 마운트
    const timer = setInterval(() => {
      setFromNow(moment(createdTime).fromNow());
    }, 1000);
    // 컴포넌트 언마운트
    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <TouchableOpacity
      onPress={() => {
        setRegionState({
          latitude: coordinate.latitude,
          longitude: coordinate.longitude,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        });
      }}>
      <View
        style={{
          backgroundColor: 'white',
          height: 40,
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          borderBottomWidth: 0.5,
        }}>
        <View style={{margin: 10}}>
          <Text>{title}</Text>
        </View>
        <View style={{margin: 10}}>
          <Text>{fromNow}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default MarkerListItem;