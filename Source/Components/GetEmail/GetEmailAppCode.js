import React, {useState} from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  Keyboard,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Normalize from '../../../utils/helper/Normalize';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {setAppCode, setUserEmail} from '../Redux/Action';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import Clipboard from '@react-native-clipboard/clipboard';
import AsyncStorage from '@react-native-async-storage/async-storage';

const GetEmailAppCode = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [code, setCode] = useState('');
  const [email, setEmail] = useState('');

  const validateEmail = email => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const formatCode = code => {
    return (
      code
        .replace(/\s+/g, '')
        .match(/.{1,4}/g)
        ?.join(' ') || ''
    );
  };

  const handleCodeChange = input => {
    const formattedCode = formatCode(input);
    setCode(formattedCode);
  };

  const handlePaste = async () => {
    const clipboardContent = await Clipboard.getString();
    const formattedCode = formatCode(clipboardContent);
    setCode(formattedCode);
  };

  const joinAllCodes = async () => {
    if (!email || !code || email === '' || code === '') {
      Alert.alert('Missing Information', 'Please fill in all fields.');
      return;
    }

    if (!validateEmail(email)) {
      Alert.alert('Invalid Email', 'Please enter a valid email address.');
      return;
    }

    const emailId = email.trim();
    await AsyncStorage.setItem('email', emailId);
    await AsyncStorage.setItem('AppCode', code);
    dispatch(setUserEmail(emailId));
    dispatch(setAppCode(code));
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={{flex: 1}}>
        <TouchableOpacity
          style={{
            padding: Normalize(10),
            position: 'absolute',
            zIndex: 1,
          }}
          onPress={() => navigation.goBack()}>
          <Ionicons
            name="chevron-back-circle"
            size={Normalize(40)}
            color={'#000'}
          />
        </TouchableOpacity>
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <TextInput
            keyboardType="email-address"
            placeholder="Enter email"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            autoCorrect={false}
            style={styles.emailInput}
            placeholderTextColor={'#000'}
          />
          <View style={styles.container}>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                value={code}
                onChangeText={handleCodeChange}
                maxLength={19}
                keyboardType="ascii-capable"
                autoCapitalize="none"
                placeholder="Enter the App Code"
                placeholderTextColor={'#000'}
              />
              <TouchableOpacity
                style={{padding: Normalize(10)}}
                onPress={handlePaste}>
                <FontAwesome6
                  name="paste"
                  size={Normalize(20)}
                  color={'#000'}
                />
                <Text style={{fontSize: Normalize(10), color: '#000'}}>
                  Paste
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View>
            <Text
              style={{
                fontSize: Normalize(12),
                fontWeight: 'bold',
                color: '#000',
              }}>
              Please enter the Email App passcode
            </Text>
          </View>
          <View style={{marginTop: Normalize(20)}}>
            <TouchableOpacity onPress={joinAllCodes}>
              <Text
                style={{
                  fontSize: Normalize(12),
                  fontWeight: 'bold',
                  color: '#fff',
                  padding: Normalize(10),
                  backgroundColor: 'blue',
                  borderRadius: Normalize(8),
                }}>
                Submit
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: Normalize(18),
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    width: '85%',
    height: Normalize(40),
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    textAlign: 'center',
    fontSize: Normalize(10),
    color: '#000',
  },
  dash: {
    fontSize: Normalize(24),
    marginHorizontal: Normalize(2),
  },
  emailInput: {
    width: Normalize(300),
    height: Normalize(40),
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: Normalize(10),
    marginBottom: Normalize(20),
    fontSize: Normalize(12),
    color: '#000',
  },
});

export default GetEmailAppCode;
