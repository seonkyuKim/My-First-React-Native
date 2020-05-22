export interface LatLng {
  latitude: number;
  longitude: number;
}

export interface MarkerDTO {
  coordinate: LatLng;
  title: string;
  createdTime: string;
}

export interface Marker extends MarkerDTO {
  id: number;
}

export type MarkerState = Marker[];

export interface Action {
  type: 'CREATE';
  meta: MarkerDTO;
}
