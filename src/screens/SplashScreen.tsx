import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';

import { LocalImages } from '../theme/images';

type SplashScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Splash'>;
};

export const SplashScreen: React.FC<SplashScreenProps> = ({ navigation }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Login');
    }, 2200);
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
      <ImageBackground
        source={LocalImages.background}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <TouchableOpacity
          style={styles.overlay}
          activeOpacity={1}
          onPress={() => navigation.replace('Login')}
        >
          {/* Logo Section */}
          <View style={styles.logoSection}>
            <Text style={styles.logoText}>Pliē</Text>
            <Text style={styles.tagline}>ELEVATE THE MOVEMENT</Text>
          </View>

          {/* Bottom Footer Section */}
          <View style={styles.footerSection}>
            <Text style={styles.footerHeading}>Your Dance - Your Stage</Text>
            <Text style={styles.footerSubtext}>DISCOVER • BOOK • MOVE</Text>
          </View>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 80,
  },
  logoSection: {
    alignItems: 'center',
    marginTop: 180,
  },
  logoText: {
    fontSize: 52,
    fontWeight: '800',
    color: '#111827',
    letterSpacing: -1,
  },
  tagline: {
    fontSize: 11,
    fontWeight: '600',
    color: '#4B5563',
    letterSpacing: 3,
    marginTop: 4,
  },
  footerSection: {
    alignItems: 'center',
    marginBottom: 40,
  },
  footerHeading: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 4,
  },
  footerSubtext: {
    fontSize: 10,
    fontWeight: '700',
    color: '#6B7280',
    letterSpacing: 2,
  },
});
