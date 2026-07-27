import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,

} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useAppSelector } from '../redux/store';
import { EventCard } from '../components/EventCard';
import { HeartIcon } from '../components/Icons';
import { Colors } from '../theme/theme';
import { Event, RootStackParamList } from '../types';
import { SafeAreaView } from 'react-native-safe-area-context';

type FavoritesScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList>;
};

export const FavoritesScreen: React.FC<FavoritesScreenProps> = ({ navigation }) => {
  const favoriteIds = useAppSelector((state) => state.favorites.favoriteIds);
  const events = useAppSelector((state) => state.events.events);

  const favoritedEvents = events.filter((event) => favoriteIds.includes(event.id));

  const handleEventPress = (event: Event) => {
    navigation.navigate('EventDetail', { event });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Top Header Bar */}
        <View style={styles.topHeaderBar}>
          <Text style={styles.plieHeaderLogo}>Pliē</Text>
        </View>

        {/* Section Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Your Favorite Events!</Text>
          <Text style={styles.headerSubtitle}>Find your favorite events here...</Text>
        </View>

        {/* Favorites List */}
        <FlatList
          data={favoritedEvents}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <EventCard event={item} onPress={() => handleEventPress(item)} />
          )}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <View style={styles.heartCircle}>
                <HeartIcon filled color={Colors.heartActive} size={32} />
              </View>
              <Text style={styles.emptyTitle}>No Favorites Saved</Text>
              <Text style={styles.emptySubtitle}>
                Tap the heart icon on any event card to add it to your favorites list!
              </Text>
            </View>
          }
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.whiteBackground,
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  topHeaderBar: {
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
    marginBottom: 14,
  },
  plieHeaderLogo: {
    fontSize: 24,
    fontWeight: '800',
    color: '#111827',
    letterSpacing: -0.5,
  },
  header: {
    marginBottom: 14,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: Colors.textPrimary,
  },
  headerSubtitle: {
    fontSize: 13,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  listContent: {
    paddingBottom: 24,
  },
  emptyContainer: {
    paddingVertical: 80,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  heartCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#FEE2E2',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  emptySubtitle: {
    fontSize: 13,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 18,
  },
});
