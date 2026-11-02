
import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import {
  View,
  Text,
  Image,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity,
  ActivityIndicator,
  Platform,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { signUp } from '../../services/authServices';

export default function SignUp() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSignUp() {
    if (!name.trim() || !email.trim() || !password) {
      setError('Please fill in all fields.');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    try {
      setError('');
      setLoading(true);

      await signUp(name.trim(), email.trim(), password);
      Alert.alert('Success', 'Account created successfully! Please log in.');
      router.replace('/(tabs)');
    } catch (error) {
      console.error('Error signing up:', error);
      Alert.alert('Error', 'Failed to create account. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-[#080714]"
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <LinearGradient
        colors={['#702BFF', '#080714']}
        start={{ x: 1, y: 1 }}
        end={{ x: 1, y: 0 }}
        className="flex-1 items-center justify-center"
      >
        <Image
          source={require('../../assets/logo.png')}
          className="w-[130px] h-[130px] rounded-3xl"
          resizeMode="contain"
        />

        <View className="items-center justify-center mt-10">
          <Text className="text-white text-3xl font-bold">
            Create Account
          </Text>

          <Text className="text-white text-lg mt-4">
            Please sign up to get started
          </Text>
        </View>

        <View className="w-[80%] mt-10">
          <TextInput
            placeholder="John Doe"
            placeholderTextColor="#6F6A85"
            value={name}
            onChangeText={setName}
            autoCapitalize="words"
           className="bg-[#1A192A] border border-[#702BFF] rounded-lg h-14 px-4 text-white mt-4" />

          <TextInput
            placeholder="john@example.com"
            placeholderTextColor="#6F6A85"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
           className="bg-[#1A192A] border border-[#702BFF] rounded-lg h-14 px-4 text-white mt-4"
          />

          <TextInput
            placeholder="Password"
            placeholderTextColor="#6F6A85"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            autoCapitalize="none"
         className="bg-[#1A192A] border border-[#702BFF] rounded-lg h-14 px-4 text-white mt-4"
          />

          {error ? (
            <Text className="text-red-400 text-sm mt-3">
              {error}
            </Text>
          ) : null}

          <TouchableOpacity
            className="bg-[#702BFF] rounded-lg py-4 px-4 mt-6 items-center justify-center"
            onPress={handleSignUp}
            disabled={loading}
            activeOpacity={0.8}
          >
            {loading ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <Text className="text-white text-lg font-semibold">
                Sign Up
              </Text>
            )}
          </TouchableOpacity>
          <Text className="text-white text-sm mt-4 text-center">
            Already have an account?{' '}
            <Text
              className="text-[#702BFF] font-semibold"
              onPress={() => router.push('/(auth)/logIn')}
            >
              Log In
            </Text>
          </Text>
        </View>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
}