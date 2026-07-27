export interface Event {
  id: string;
  title: string;
  description?: string;
  date: string; // e.g. "24 - 26 Feb 2022, 21:00"
  time?: string;
  location: string; // e.g. "Berlin, Germany"
  city?: string;
  price: string; // e.g. "€30 - €100"
  image: string; // URL to poster image
  categories: string[]; // e.g. ["Workshop", "Bachata"]
  organizer?: string;
  isFavorite?: boolean;
}

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isGuest: boolean;
  loading: boolean;
  error: string | null;
}

export interface EventsState {
  events: Event[];
  loading: boolean;
  error: string | null;
  searchQuery: string;
  selectedCategory: string;
}

export interface FavoritesState {
  favoriteIds: string[];
}

export type RootStackParamList = {
  Splash: undefined;
  Login: undefined;
  MainTabs: undefined;
  EventDetail: { event: Event };
};

export type MainTabParamList = {
  Search: undefined;
  Events: undefined;
  Favourites: undefined;
  Profile: undefined;
};
