import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useAppDispatch, useAppSelector } from '../redux/store';
import { setSearchQuery } from '../redux/slices/eventsSlice';
import { EventCard } from '../components/EventCard';
import { SearchIcon } from '../components/Icons';
import { TextInput } from 'react-native';
import { Colors } from '../theme/theme';
import { Event, RootStackParamList } from '../types';
import { SafeAreaView } from 'react-native-safe-area-context';

type SearchScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList>;
};

export const SearchScreen: React.FC<SearchScreenProps> = ({ navigation }) => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const { events, searchQuery } = useAppSelector((state) => state.events);

  const filteredEvents = events.filter((event) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      event.title.toLowerCase().includes(q) ||
      event.location.toLowerCase().includes(q) ||
      event.date.toLowerCase().includes(q) ||
      event.categories.some((cat) => cat.toLowerCase().includes(q))
    );
  });

  const handleEventPress = (event: Event) => {
    navigation.navigate('EventDetail', { event });
  };

  return (
    <SafeAreaView
      style={styles.safeArea}>
      <View style={styles.container}>
        {/* Top Header Bar */}
        <View style={styles.topHeaderBar}>
          <Text style={styles.plieHeaderLogo}>Pliē</Text>
        </View>

        {/* Greeting */}
        <View style={styles.greetingSection}>
          <Text style={styles.greetingTitle}>Hello {user?.name || 'Renzo'}!</Text>
          <Text style={styles.greetingSubtitle}>
            Are you ready to dance? Explore today's movements.
          </Text>
        </View>

        {/* Expanded Search Bar with Clear Button */}
        <View style={styles.searchBarContainer}>
          <SearchIcon color={Colors.textMuted} size={18} />
          <TextInput
            style={styles.searchInput}
            value={searchQuery}
            onChangeText={(text) => dispatch(setSearchQuery(text))}
            placeholder="Search events..."
            placeholderTextColor={Colors.textMuted}
            autoFocus
          />
          {searchQuery ? (
            <TouchableOpacity
              onPress={() => dispatch(setSearchQuery(''))}
              style={styles.clearButton}
            >
              <Text style={styles.clearButtonText}>✕</Text>
            </TouchableOpacity>
          ) : null}
        </View>

        {/* Search Results */}
        <FlatList
          data={filteredEvents}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <EventCard event={item} onPress={() => handleEventPress(item)} />
          )}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyTitle}>No matching events</Text>
              <Text style={styles.emptySubtitle}>Try searching for "SSD", "Bachata", "Salsa", or "Berlin"</Text>
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
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.inputBackground,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 14,
    color: Colors.textPrimary,
    padding: 0,
  },
  clearButton: {
    padding: 4,
  },
  clearButtonText: {
    fontSize: 14,
    color: Colors.textMuted,
    fontWeight: '700',
  },
  listContent: {
    paddingBottom: 24,
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
