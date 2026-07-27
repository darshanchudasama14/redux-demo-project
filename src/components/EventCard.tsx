import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Event } from '../types';
import { Colors } from '../theme/theme';
import { CalendarIcon, LocationIcon, HeartIcon, ShareIcon, GreenArrowIcon } from './Icons';
import { useAppDispatch, useAppSelector } from '../redux/store';
import { toggleFavorite } from '../redux/slices/favoritesSlice';

import { getEventImageSource, getEventImageSources } from '../theme/images';

interface EventCardProps {
  event: Event;
  onPress?: () => void;
}

export const EventCard: React.FC<EventCardProps> = ({ event, onPress }) => {
  const dispatch = useAppDispatch();
  const favoriteIds = useAppSelector((state) => state.favorites.favoriteIds);
  const isFavorite = favoriteIds.includes(event.id);

  const handleFavoriteToggle = (e: any) => {
    e.stopPropagation?.();
    dispatch(toggleFavorite(event.id));
  };
  console.log("event list :-", event)
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.9}>
      {/* Event Image */}
      <View style={styles.imageContainer}>
        {/* //<Image source={{ uri: event.image }} style={styles.image} resizeMode="cover" /> */}
        <Image
          source={getEventImageSources(event.id)}
          style={styles.image} resizeMode="cover" />
      </View>

      {/* Info Column */}
      <View style={styles.infoContainer}>
        {/* Top Header: Categories & Action Icons (Share & Heart) */}
        <View style={styles.headerRow}>
          <View style={styles.categoriesRow}>
            {event.categories.map((cat, idx) => (
              <Text key={idx} style={styles.categoryBadgeText}>
                {cat} {idx < event.categories.length - 1 ? '• ' : ''}
              </Text>
            ))}
          </View>

          <View style={styles.actionsRow}>
            <TouchableOpacity style={styles.actionIconButton} activeOpacity={0.7}>
              <ShareIcon size={16} color={Colors.textSecondary} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.actionIconButton}
              onPress={handleFavoriteToggle}
              activeOpacity={0.7}
            >
              <HeartIcon filled={isFavorite} color={isFavorite ? Colors.heartActive : Colors.heartInactive} size={18} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Title */}
        <Text style={styles.title} numberOfLines={1}>
          {event.title}
        </Text>

        {/* Date Row */}
        <View style={styles.detailRow}>
          <CalendarIcon color={Colors.textMuted} size={13} />
          <Text style={styles.detailText} numberOfLines={1}>
            {event.date}
          </Text>
        </View>

        {/* Location Row */}
        <View style={styles.detailRow}>
          <LocationIcon color={Colors.textMuted} size={13} />
          <Text style={styles.detailText} numberOfLines={1}>
            {event.location}
          </Text>
        </View>

        {/* Footer: Price Tag & Green Arrow CTA */}
        <View style={styles.footerRow}>
          <Text style={styles.priceText}>{event.price}</Text>

          <View style={styles.arrowCircleButton}>
            <GreenArrowIcon color={Colors.white} size={14} />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: Colors.cardBackground,
    borderRadius: 14,
    padding: 10,
    marginVertical: 6,
    borderWidth: 1,
    borderColor: '#EFEFEF',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
  },
  imageContainer: {
    width: 90,
    height: 105,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#E5E7EB',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  infoContainer: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'space-between',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  categoriesRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    flex: 1,
  },
  categoryBadgeText: {
    fontSize: 11,
    fontWeight: '600',
    color: Colors.textSecondary,
  },
  actionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  actionIconButton: {
    padding: 2,
  },
  title: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginVertical: 2,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginTop: 2,
  },
  detailText: {
    fontSize: 12,
    color: Colors.textSecondary,
    flex: 1,
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 6,
  },
  priceText: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  arrowCircleButton: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
