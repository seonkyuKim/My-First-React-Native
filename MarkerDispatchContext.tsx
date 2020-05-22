import React from 'react';

import {LatLng, MarkerState, Action} from './models/Marker';

import StackNavigationContainer from './StackNavigationContainer';

const reducer = (state: MarkerState, action: Action) => {
  switch (action.type) {
    case 'CREATE':
      const nextId = Math.max(0, ...state.map((marker) => marker.id)) + 1;
      return state.concat({
        id: nextId,
        coordinate: {
          longitude: action.meta.coordinate.longitude,
          latitude: action.meta.coordinate.latitude,
        },
        title: action.meta.title,
        createdTime: action.meta.createdTime,
      });
  }
};

export const MarkerDispatchContext = React.createContext<{
  // 저장된 Marker들의 상태
  markerState: MarkerState;
  dispatch: (action: Action) => void;
  // 새로 만들어질 Marker의 Coordinate 상태
  coordinateState: LatLng;
  setCoordinateState: (coordinate: LatLng) => void;
}>({
  markerState: [],
  dispatch: () => {},
  coordinateState: {
    latitude: 37.5100586,
    longitude: 127.0553367,
  },
  setCoordinateState: () => {},
});


const MarkerDispatchContextContainer: React.FC = (props) => {
  const [markerState, dispatch] = React.useReducer(reducer, []);
  // 새로 만들어질 marker의 임시 coordinate
  const [coordinateState, setCoordinateState] = React.useState<LatLng>({
    latitude: 37.5100586,
    longitude: 127.0553367,
  });

  const value = {markerState, dispatch, coordinateState, setCoordinateState};

  return (
    <MarkerDispatchContext.Provider value={value}>
      <StackNavigationContainer />
    </MarkerDispatchContext.Provider>
  );
};

export default MarkerDispatchContextContainer;
