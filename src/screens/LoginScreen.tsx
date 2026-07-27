import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  SafeAreaView,
  ImageBackground,
} from 'react-native';
import { useAppDispatch, useAppSelector } from '../redux/store';
import { loginUser, loginAsGuest, clearAuthError } from '../redux/slices/authSlice';
import { EyeIcon, EyeOffIcon, GoogleIcon, AppleIcon, FacebookIcon } from '../components/Icons';
import { Colors } from '../theme/theme';

export const LoginScreen = () => {
  const [email, setEmail] = useState('testpracticaluser001@mailinator.com');
  const [password, setPassword] = useState('Test@123');
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.auth);

  const handleLogin = () => {
    dispatch(clearAuthError());
    dispatch(loginUser({ email, password }));
  };

  const handleGuestLogin = () => {
    dispatch(loginAsGuest());
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../assets/images/background.png')}
        style={styles.backgroundImage}
        resizeMode="cover"
        blurRadius={2}
      >
        <SafeAreaView style={styles.safeArea}>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.keyboardView}
          >
            <ScrollView
              contentContainerStyle={styles.scrollContent}
              keyboardShouldPersistTaps="handled"
              showsVerticalScrollIndicator={false}
            >
              {/* Header Logo */}
              <View style={styles.header}>
                <Text style={styles.logoText}>Pliē</Text>
                <Text style={styles.tagline}>ELEVATE THE MOVEMENT</Text>
              </View>

              {/* White Card Container */}
              <View style={styles.cardContainer}>
                {error ? (
                  <View style={styles.errorContainer}>
                    <Text style={styles.errorText}>{error}</Text>
                  </View>
                ) : null}

                {/* Email Group */}
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Email</Text>
                  <TextInput
                    style={styles.input}
                    value={email}
                    onChangeText={(text) => {
                      setEmail(text);
                      if (error) dispatch(clearAuthError());
                    }}
                    placeholder="email@example.com"
                    placeholderTextColor={Colors.textMuted}
                    keyboardType="email-address"
                    autoCapitalize="none"
                  />
                </View>

                {/* Password Group */}
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Password</Text>
                  <View style={styles.passwordContainer}>
                    <TextInput
                      style={styles.passwordInput}
                      value={password}
                      onChangeText={(text) => {
                        setPassword(text);
                        if (error) dispatch(clearAuthError());
                      }}
                      placeholder="Enter your password"
                      placeholderTextColor={Colors.textMuted}
                      secureTextEntry={!showPassword}
                      autoCapitalize="none"
                    />
                    <TouchableOpacity
                      onPress={() => setShowPassword(!showPassword)}
                      style={styles.eyeButton}
                    >
                      {showPassword ? <EyeOffIcon color={Colors.textMuted} /> : <EyeIcon color={Colors.textMuted} />}
                    </TouchableOpacity>
                  </View>
                </View>

                {/* Forgot Password */}
                <TouchableOpacity style={styles.forgotButton}>
                  <Text style={styles.forgotText}>Forgot Password?</Text>
                </TouchableOpacity>

                {/* Black Sign In Button */}
                <TouchableOpacity
                  style={[styles.signInButton, loading && styles.signInButtonDisabled]}
                  onPress={handleLogin}
                  disabled={loading}
                  activeOpacity={0.8}
                >
                  {loading ? (
                    <ActivityIndicator color={Colors.white} />
                  ) : (
                    <Text style={styles.signInButtonText}>Sign In</Text>
                  )}
                </TouchableOpacity>

                {/* Sign Up Text */}
                <View style={styles.signUpRow}>
                  <Text style={styles.signUpLabel}>Not a member? </Text>
                  <TouchableOpacity>
                    <Text style={styles.signUpLink}>Sign Up Here</Text>
                  </TouchableOpacity>
                </View>

                {/* Social Login Divider */}
                <View style={styles.dividerRow}>
                  <View style={styles.divider} />
                  <Text style={styles.dividerText}>Or Sign In with</Text>
                  <View style={styles.divider} />
                </View>

                {/* Social Buttons */}
                <View style={styles.socialButtonsRow}>
                  <TouchableOpacity style={styles.socialButton} activeOpacity={0.7}>
                    <GoogleIcon size={20} />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.socialButton} activeOpacity={0.7}>
                    <AppleIcon size={20} />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.socialButton} activeOpacity={0.7}>
                    <FacebookIcon size={20} />
                  </TouchableOpacity>
                </View>

                {/* Enter as Guest Button */}
                <TouchableOpacity style={styles.guestButton} onPress={handleGuestLogin} activeOpacity={0.7}>
                  <Text style={styles.guestButtonText}>Enter as Guest</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </KeyboardAvoidingView>
        </SafeAreaView>
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
  safeArea: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 26,
    paddingVertical: 40,
  },
  header: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 28,
  },
  logoText: {
    fontSize: 48,
    fontWeight: '800',
    color: '#111827',
    letterSpacing: -1,
  },
  tagline: {
    fontSize: 10,
    fontWeight: '600',
    color: '#4B5563',
    letterSpacing: 2,
    marginTop: 2,
  },
  cardContainer: {
    backgroundColor: Colors.white,
    borderRadius: 22,
    paddingHorizontal: 22,
    paddingVertical: 24,
    marginHorizontal: 8,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.08,
    shadowRadius: 20,
    elevation: 8,
  },
  errorContainer: {
    backgroundColor: '#FEE2E2',
    borderColor: '#FCA5A5',
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    marginBottom: 14,
  },
  errorText: {
    color: Colors.error,
    fontSize: 13,
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 13,
    fontWeight: '500',
    color: Colors.textPrimary,
    marginBottom: 6,
  },
  input: {
    height: 50,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 14,
    fontSize: 14,
  },
  passwordContainer: {
    height: 50,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
  },
  passwordInput: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 14,
    color: Colors.textPrimary,
  },
  eyeButton: {
    padding: 4,
  },
  forgotButton: {
    alignSelf: 'flex-end',
    marginBottom: 20,
  },
  forgotText: {
    fontSize: 12,
    color: Colors.textSecondary,
    fontWeight: '500',
  },
  signInButton: {
    backgroundColor: Colors.black,
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  signInButtonDisabled: {
    opacity: 0.7,
  },
  signInButtonText: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.white,
  },
  signUpRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 14,
  },
  signUpLabel: {
    fontSize: 13,
    color: Colors.textSecondary,
  },
  signUpLink: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.textPrimary,
    // textDecorationLine: 'underline',
  },
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: Colors.border,
  },
  dividerText: {
    marginHorizontal: 10,
    fontSize: 12,
    color: Colors.textMuted,
  },
  socialButtonsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 16,
    marginBottom: 20,
  },
  socialButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.inputBackground,
    borderWidth: 1,
    borderColor: Colors.inputBorder,
    alignItems: 'center',
    justifyContent: 'center',
  },
  guestButton: {
    marginTop: 24,
    height: 48,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  guestButtonText: {
    fontSize: 13,
    color: Colors.textSecondary,
    fontWeight: '500',
  },
});
