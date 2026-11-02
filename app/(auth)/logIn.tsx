
import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity,
  ActivityIndicator,
  Platform,
  Alert
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { signIn } from '../../services/authServices';
import { useRouter } from 'expo-router';


export default function LogIn() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSignIn() {
    if (!email.trim() || !password) {
      setError('Please enter your email and password.');
      return;
    }

    try {
      setError('');
      setLoading(true);

      await signIn(email.trim(), password);
      Alert.alert('Success', 'Logged in successfully!');
      router.replace('/companyCreation');
    } catch (error) {
      console.error('Error signing in:', error);
      setError(
        error instanceof Error ? error.message : 'Failed to sign in.'
      );
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
            Welcome Back!
          </Text>

          <Text className="text-white text-lg mt-4">
            Please log in to your account
          </Text>
        </View>

        <View className="w-[80%] mt-10">
          <TextInput
            placeholder="Email"
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
            <Text className="text-red-400 mt-3 text-sm">
              {error}
            </Text>
          ) : null}

          <TouchableOpacity
            className="bg-[#702BFF] rounded-lg py-4 px-4 mt-6 items-center justify-center"
            onPress={handleSignIn}
            disabled={loading}
            activeOpacity={0.8}
          >
            {loading ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <Text className="text-white text-lg font-semibold">
                Log In
              </Text>
            )}
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
}
