import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useAppDispatch, useAppSelector } from '../redux/store';
import { logout } from '../redux/slices/authSlice';
import { EditPencilIcon, ChevronRightIcon } from '../components/Icons';
import { Colors } from '../theme/theme';
import { SafeAreaView } from 'react-native-safe-area-context';

export const ProfileScreen = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);

  const menuItems = [
    { title: 'My Tickets' },
    { title: 'Payment Methods' },
    { title: 'Notification Settings' },
    { title: 'Help & Support' },
  ];

  return (
    <SafeAreaView
      style={styles.safeArea}>
      <View style={styles.container}>
        {/* Top Header Bar */}
        <View style={styles.topHeaderBar}>
          <Text style={styles.plieHeaderLogo}>Pliē</Text>
        </View>

        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          {/* User Profile Card */}
          <View style={styles.profileSection}>
            <View style={styles.avatarBox}>
              <Image
                source={{
                  uri: user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
                }}
                style={styles.avatarImage}
              />
              <TouchableOpacity style={styles.editButton} activeOpacity={0.7}>
                <EditPencilIcon color="#FFFFFF" size={12} />
              </TouchableOpacity>
            </View>

            <Text style={styles.userName}>{user?.name || 'Dance Enthusiast'}</Text>
            <Text style={styles.userEmail}>{user?.email || 'abc@gmail.com'}</Text>
          </View>

          {/* Menu Items List */}
          <View style={styles.menuContainer}>
            {menuItems.map((item, index) => (
              <TouchableOpacity key={index} style={styles.menuRow} activeOpacity={0.7}>
                <Text style={styles.menuTitle}>{item.title}</Text>
                <ChevronRightIcon color="#9CA3AF" size={16} />
              </TouchableOpacity>
            ))}

            {/* Logout Row */}
            <TouchableOpacity
              style={styles.logoutRow}
              onPress={() => dispatch(logout())}
              activeOpacity={0.7}
            >
              <Text style={styles.logoutText}>Logout</Text>
              <ChevronRightIcon color={Colors.error} size={16} />
            </TouchableOpacity>
          </View>
        </ScrollView>
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
  scrollContent: {
    paddingBottom: 30,
  },
  profileSection: {
    alignItems: 'center',
    marginVertical: 20,
  },
  avatarBox: {
    position: 'relative',
    width: 90,
    height: 90,
    borderRadius: 18,
    backgroundColor: '#E5E7EB',
    marginBottom: 12,
  },
  avatarImage: {
    width: '100%',
    height: '100%',
    borderRadius: 18,
  },
  editButton: {
    position: 'absolute',
    bottom: -4,
    right: -4,
    width: 26,
    height: 26,
    borderRadius: 6,
    backgroundColor: '#111827',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  userName: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: 2,
  },
  userEmail: {
    fontSize: 13,
    color: Colors.textSecondary,
  },
  menuContainer: {
    marginTop: 10,
  },
  menuRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  menuTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.textPrimary,
  },
  logoutRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    marginTop: 10,
  },
  logoutText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.error,
  },
});
