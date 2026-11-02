import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import React, { useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { createCompany } from '../services/createCompany';
import { useRouter } from 'expo-router';
export default function companyCreation() {
  const router = useRouter();
  async function handleCreateCompany() {
    setLoading(true);
    setError('');
    try {
      await createCompany(companyName.trim());
      router.replace('/(tabs)');
      Alert.alert('Success', 'Workspace created successfully!');
    } catch (error) {
      console.error('Error creating company:', error);
      setError('Failed to create company.');
      Alert.alert('Error', 'Failed to create workspace. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  const [companyName, setCompanyName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center bg-[#080714]">
        <ActivityIndicator size="large" color="#9747FF" />
        <Text className="text-white text-base font-medium mt-5">
          Creating your workspace...
        </Text>
        <Text className="text-[#A5A1B8] text-sm mt-2">
          Getting everything ready for you
        </Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-[#080714]">
      <LinearGradient
        colors={['#702BFF', '#211044', '#080714']}
        locations={[0, 0.4, 1]}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        className="flex-1"
      >
        <View className="flex-1 px-7 justify-center">
          <View className="items-center mb-12">
            <Image
              source={require('../assets/logo.png')}
              className="w-24 h-24 rounded-3xl"
              resizeMode="contain"
            />

            <Text className="text-white text-3xl font-bold mt-7 text-center">
              Create your workspace
            </Text>

            <Text className="text-[#C1BBD3] text-base mt-3 text-center leading-6">
              Bring your team together and get your work organized in one place.
            </Text>
          </View>

          <View className="bg-[#111022] border border-[#292541] rounded-2xl p-5">
            <Text className="text-white text-base font-semibold mb-3">
              Workspace name
            </Text>

            <TextInput
              className="bg-[#1A192A] border border-[#393151] rounded-xl h-14 px-4 text-white text-base"
              placeholder="e.g. Acme Technologies"
              placeholderTextColor="#6F6A85"
              value={companyName}
              onChangeText={setCompanyName}
              autoCapitalize="words"
            />

            <Text className="text-[#6F6A85] text-xs mt-3">
              You can change your workspace name later.
            </Text>

            {error ? (
              <Text className="text-red-400 text-sm mt-3">
                {error}
              </Text>
            ) : null}

            <TouchableOpacity
              className="bg-[#702BFF] rounded-xl h-14 mt-6 items-center justify-center"
              onPress={handleCreateCompany}
              disabled={loading}
              activeOpacity={0.8}
            >
              <Text className="text-white text-base font-bold">
                Create Workspace
              </Text>
            </TouchableOpacity>
          </View>

          <Text className="text-[#6F6A85] text-xs text-center mt-8">
            Your team's productivity starts here.
          </Text>
        </View>
      </LinearGradient>
    </View>
  );
}