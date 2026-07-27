import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import { useAppDispatch, useAppSelector } from '../redux/store';
import { toggleFavorite } from '../redux/slices/favoritesSlice';
import {
  BackArrowIcon,
  ShareIcon,
  HeartIcon,
  CalendarIcon,
  LocationIcon,
} from '../components/Icons';
import { Colors } from '../theme/theme';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getEventImageSource } from '../theme/images';

type Props = NativeStackScreenProps<RootStackParamList, 'EventDetail'>;

export const EventDetailScreen: React.FC<Props> = ({ route, navigation }) => {
  const { event } = route.params;
  const dispatch = useAppDispatch();
  const favoriteIds = useAppSelector((state) => state.favorites.favoriteIds);
  const isFavorite = favoriteIds.includes(event.id);

  const handleFavoriteToggle = () => {
    dispatch(toggleFavorite(event.id));
  };
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      {/* Navigation Top Header Bar */}
      <View style={styles.headerBar}>
        <TouchableOpacity style={styles.iconButton} onPress={() => navigation.goBack()}>
          <BackArrowIcon color={Colors.textPrimary} size={22} />
        </TouchableOpacity>

        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.iconButton}>
            <ShareIcon color={Colors.textPrimary} size={18} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton} onPress={handleFavoriteToggle}>
            <HeartIcon filled={isFavorite} color={isFavorite ? Colors.heartActive : Colors.heartInactive} size={20} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Large Hero Poster Image */}
        <View style={styles.heroContainer}>
          <Image source={getEventImageSource('adicto')} style={styles.heroImage} resizeMode="cover" />
        </View>

        {/* Category Badges */}
        <View style={styles.categoriesRow}>
          {event.categories.map((cat, idx) => (
            <View key={idx} style={styles.categoryTag}>
              <Text style={styles.categoryTagText}>{cat}</Text>
            </View>
          ))}
        </View>

        {/* Event Title */}
        <Text style={styles.title}>{event.title}</Text>

        {/* Price Tag */}
        <Text style={styles.price}>{event.price}</Text>

        {/* Date & Time Card */}
        <View style={styles.infoCard}>
          <View style={styles.infoIconBox}>
            <CalendarIcon color={Colors.primary} size={18} />
          </View>
          <View style={styles.infoTextContainer}>
            <Text style={styles.infoLabel}>DATE & TIME</Text>
            <Text style={styles.infoValue}>{event.date} onwards</Text>
          </View>
        </View>

        {/* Location Card */}
        <View style={styles.infoCard}>
          <View style={styles.infoIconBox}>
            <LocationIcon color={Colors.primary} size={18} />
          </View>
          <View style={styles.infoTextContainer}>
            <Text style={styles.infoLabel}>LOCATION</Text>
            <Text style={styles.infoValue}>{event.location}</Text>
          </View>
        </View>

        {/* Map Preview Box */}
        <View style={styles.mapContainer}>
          <Image
            source={{
              uri: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=600&q=80',
            }}
            style={styles.mapImage}
            resizeMode="cover"
          />
          <View style={styles.mapPinOverlay}>
            <LocationIcon color={Colors.heartActive} size={24} />
          </View>
        </View>

        {/* About the Event */}
        <View style={styles.aboutSection}>
          <Text style={styles.aboutTitle}>About the Event</Text>
          <Text style={styles.aboutDescription}>
            {event.description ||
              `${event.title} is set to be one of the premier dance highlights of the season in ${event.location}. Featuring top international and local dance instructors, high-energy social dancing, and live DJ sets.`}
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.whiteBackground,
  },
  headerBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  iconButton: {
    padding: 6,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 32,
  },
  heroContainer: {
    width: '100%',
    height: 220,
    borderRadius: 16,
    overflow: 'hidden',
    marginTop: 14,
    backgroundColor: '#E5E7EB',
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  categoriesRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 16,
  },
  categoryTag: {
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  categoryTagText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#4B5563',
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    color: Colors.textPrimary,
    marginTop: 10,
  },
  price: {
    fontSize: 20,
    fontWeight: '800',
    color: Colors.textPrimary,
    marginTop: 4,
    marginBottom: 16,
  },
  infoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    padding: 12,
    borderRadius: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  infoIconBox: {
    width: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: '#E8FDF3',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  infoTextContainer: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: Colors.textMuted,
    letterSpacing: 0.5,
  },
  infoValue: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginTop: 2,
  },
  mapContainer: {
    position: 'relative',
    height: 120,
    borderRadius: 12,
    overflow: 'hidden',
    marginVertical: 14,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  mapImage: {
    width: '100%',
    height: '100%',
  },
  mapPinOverlay: {
    position: 'absolute',
    top: '40%',
    left: '48%',
  },
  aboutSection: {
    marginTop: 8,
  },
  aboutTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: 6,
  },
  aboutDescription: {
    fontSize: 13,
    color: Colors.textSecondary,
    lineHeight: 20,
  },
});
