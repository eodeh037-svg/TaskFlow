import { cssInterop } from 'nativewind';
import { LinearGradient } from 'expo-linear-gradient';
import { Text, View, Image, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import React, {useState, useEffect} from 'react';
cssInterop(LinearGradient, { className: 'style' });

export default function SplashScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      router.replace('/(auth)/signUp');
    }, 9000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {

    return (
      <View className="flex-1 bg-[#080714]">
        <LinearGradient
          colors={['#702BFF', '#080714']}
          start={{ x: 1, y: 1 }}
          end={{ x: 1, y: 0 }}
          className="flex-1 items-center justify-center ">
          <Image source={require('../assets/logo.png')} className="w-[200] h-[200] rounded-3xl" />

          <ActivityIndicator size="large" color="#702BFF" className="mt-10" />
          <Text className="text-white text-lg mt-4">Loading your task management software...</Text>
        </LinearGradient>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-[#080714]">
    <LinearGradient
      colors={['#702BFF', '#080714']}
      start={{ x: 1, y: 1 }}
      end={{ x: 1, y: 0 }}
      className="flex-1 items-center justify-center ">
<Image source={require('../assets/logo.png')} className="w-[200] h-[200] rounded-3xl" />
    </LinearGradient>
    </View>
  );
}
