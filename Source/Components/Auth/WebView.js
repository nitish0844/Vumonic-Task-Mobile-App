import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {WebView} from 'react-native-webview';
import {useNavigation} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const WebViewPage = () => {
  const navigation = useNavigation();

  const handleBackPress = () => {
    navigation.goBack();
  };

  const handleDonePress = () => {
    AsyncStorage.setItem('loggedIn', 'true');

    navigation.reset({
      index: 0,
      routes: [{name: 'MainScreen'}],
    });
  };

  return (
    <View style={{flex: 1}}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>

        {/* <Text style={styles.headerTitle}>WebView</Text> */}

        <TouchableOpacity onPress={handleDonePress}>
          <Text style={{fontWeight: 'bold', fontSize: 16, color: '#000'}}>
            Done
          </Text>
        </TouchableOpacity>
      </View>
      <WebView
        source={{
          uri: 'https://myaccount.google.com/apppasswords',
        }}
        style={{flex: 1}}
        // Optionally handle navigation state changes here
        // onNavigationStateChange={event => {
        //   if (event.url.includes('https://your-redirect-url.com')) {
        //     // Handle successful login and get the token or code from the URL
        //     setShowWebView(false);
        //   }
        // }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 60,
    backgroundColor: '#f8f8f8',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    justifyContent: 'space-between',
  },
  backButton: {
    padding: 10,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
});

export default WebViewPage;
