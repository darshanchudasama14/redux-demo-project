import React, { useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  SafeAreaView,
  RefreshControl,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useAppDispatch, useAppSelector } from '../redux/store';
import { fetchEvents, setSearchQuery } from '../redux/slices/eventsSlice';
import { EventCard } from '../components/EventCard';
import { SearchBar } from '../components/SearchBar';
import { Colors } from '../theme/theme';
import { Event, RootStackParamList } from '../types';

type EventListScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList>;
};

export const EventListScreen: React.FC<EventListScreenProps> = ({ navigation }) => {
  const dispatch = useAppDispatch();
  const { user, token } = useAppSelector((state) => state.auth);
  const { events, loading, searchQuery } = useAppSelector((state) => state.events);

  useEffect(() => {
    dispatch(fetchEvents(token || undefined));
  }, [dispatch, token]);

  const handleRefresh = () => {
    dispatch(fetchEvents(token || undefined));
  };

  const filteredEvents = events.filter((event) => {
    return (
      searchQuery.trim() === '' ||
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.categories.some((cat) => cat.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  });

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

        {/* Greeting Section */}
        <View style={styles.greetingSection}>
          <Text style={styles.greetingTitle}>Hello {user?.name || 'Renzo'}!</Text>
          <Text style={styles.greetingSubtitle}>
            Are you ready to dance? Explore today's movements.
          </Text>
        </View>

        {/* Search Bar */}
        <SearchBar
          value={searchQuery}
          onChangeText={(text) => dispatch(setSearchQuery(text))}
          placeholder="Search events..."
        />

        {/* Events List */}
        {loading && events.length === 0 ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={Colors.primary} />
            <Text style={styles.loadingText}>Fetching dance events...</Text>
          </View>
        ) : (
          <FlatList
            data={filteredEvents}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <EventCard event={item} onPress={() => handleEventPress(item)} />
            )}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl
                refreshing={loading}
                onRefresh={handleRefresh}
                colors={[Colors.primary]}
                tintColor={Colors.primary}
              />
            }
            ListEmptyComponent={
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyTitle}>No Events Found</Text>
                <Text style={styles.emptySubtitle}>
                  Try searching for another dance style or event name.
                </Text>
              </View>
            }
          />
        )}
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
  greetingSection: {
    marginBottom: 12,
  },
  greetingTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: Colors.textPrimary,
  },
  greetingSubtitle: {
    fontSize: 13,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  listContent: {
    paddingBottom: 24,
    paddingTop: 4,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 14,
    color: Colors.textSecondary,
  },
  emptyContainer: {
    paddingVertical: 60,
    alignItems: 'center',
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
  },
});
