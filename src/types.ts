export interface Event {
    id: string;
    date: string;
    location: GeoRegion;
    details: LocationDetails | any;
    slots: number;
    owner: string;
    guests: User[];
}

export interface EventCreationState {
    date: string;
    location: GeoRegion;
    details: LocationDetails | any;
    slots: number;
}

export interface EventZoomState {
    item: Event;
    loading: boolean;
}

export interface GeoRegion {
    latitude: number;
    longitude: number;
    latitudeDelta?: number;
    longitudeDelta?: number;
}

export interface LocationDetails {
    latitude: number;
    longitude: number;
    id: string;
    name: string;
    address: string;
    rating: number;
    phone: string;
}

export interface AuthState {
    email: string;
    password: string;
    user: User;
    error: string;
}

export interface User {
    accessToken: string;
    accessTokenExpirationDate: Number;
    email: string;
    familyName: string;
    givenName: string;
    id: string;
    idToken: string;
    name: string;
    photo: string;
    serverAuthCode: string;
}

export interface AppState {
    eventCreation: EventCreationState,
    eventZoom: EventCreationState,
    events: any[],
    auth: AuthState
}

export interface ListLocationalEventType {
    type: string;
    id: string;
    location?: number[];
    distance?: number;
}
