import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  Text,
  Button,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import Normalize from '../../utils/helper/Normalize';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LottieView from 'lottie-react-native';
import Modal from 'react-native-modal';
import {useFocusEffect} from '@react-navigation/native';

const GmailLogin = () => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);

  useFocusEffect(
    useCallback(() => {
      getData();
      setModalVisible(false);
    }, []),
  );

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('loggedIn');
      if (value === 'true') {
        navigation.reset({
          index: 0,
          routes: [{name: 'MainScreen'}],
        });
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getData();
    setModalVisible(false);
  }, []);

  const handleLogin = () => {
    setModalVisible(true);
  };

  return (
    <View style={{flex: 1}}>
      <View style={styles.container}>
        <View>
          <Text style={{fontSize: Normalize(30), color: '#000'}}>
            Hey buddy
          </Text>
          <Text style={{fontSize: Normalize(20), color: '#000'}}>
            Let's Login
          </Text>
          <LottieView
            style={{
              width: Normalize(230),
              height: Normalize(230),
              alignSelf: 'center',
            }}
            source={require('../Assets/Loaders/Auth/Login.json')}
            autoPlay
            loop
          />
        </View>

        <View>
          <TouchableOpacity
            onPress={handleLogin}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: Normalize(20),
            }}>
            <LottieView
              source={require('../Assets/Loaders/Auth/Google.json')}
              style={{width: Normalize(50), height: Normalize(50)}}
              autoPlay
              loop
            />
            <Button title="Continue with Google" onPress={handleLogin} />
          </TouchableOpacity>
        </View>
      </View>

      <Modal
        isVisible={modalVisible}
        onBackdropPress={() => setModalVisible(false)}
        style={styles.modal}>
        <View style={styles.modalContent}>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setModalVisible(false)}>
            <Ionicons name="close" size={24} color="#000" />
          </TouchableOpacity>

          <ScrollView contentContainerStyle={styles.instructionsContainer}>
            <Text style={styles.modalTitle}>
              Instructions to Create and Copy App Password
            </Text>
            <Text style={styles.modalText}>
              1. After Pressing Accept, you will be prompted to sign in.
            </Text>
            <Text style={styles.modalText}>
              2. After signing in, you will be prompted to select "App
              passwords".
            </Text>
            <Text style={styles.modalText}>
              3. Select "Create new password."
            </Text>
            <Text style={styles.modalText}>
              4. Enter a name (e.g., "My App").
            </Text>
            <Text style={styles.modalText}>5. Select "Generate password."</Text>
            <Text style={styles.modalText}>
              6. Enter a password of your choice.
            </Text>
            <Text style={styles.modalText}>
              7. Copy the generated app password.
            </Text>
            <Text style={styles.modalText}>
              9. Press "Done" to close the Page and move to Main Screen.
            </Text>
            <Text style={styles.modalText}>
              10. Paste the app password in the appropriate field in the app.
            </Text>
          </ScrollView>

          <Button
            title="Accept"
            onPress={() => navigation.navigate('WebViewPage')}
          />
        </View>
      </Modal>
    </View>
  );
};

export default GmailLogin;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 0,
  },
  modalContent: {
    width: '90%',
    maxHeight: '90%',
    backgroundColor: '#fff',
    borderRadius: Normalize(10),
    padding: Normalize(20),
    position: 'relative',
  },
  closeButton: {
    position: 'absolute',
    top: Normalize(10),
    right: Normalize(10),
    zIndex: 1,
  },
  instructionsContainer: {
    paddingVertical: Normalize(10),
  },
  modalTitle: {
    fontSize: Normalize(16),
    fontWeight: 'bold',
    marginBottom: Normalize(10),
    color: '#000',
  },
  modalText: {
    fontSize: Normalize(14),
    marginBottom: Normalize(8),
    color: '#000',
  },
});
