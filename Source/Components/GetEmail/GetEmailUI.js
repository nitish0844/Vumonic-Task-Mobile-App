import {
  View,
  Text,
  ScrollView,
  RefreshControl,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import GetEmail from './GetEmail';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useSelector, useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import Normalize from '../../../utils/helper/Normalize';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LottieView from 'lottie-react-native';
import MainLoader from '../Loader/MainLoader';
import {setUserEmail, setAppCode} from '../Redux/Action';

const GetEmailUI = () => {
  const totalEmails = useSelector(state => state.totalEmails);
  const error = useSelector(state => state.error);
  const EmailLoading = useSelector(state => state.emailLoading);
  const dispatch = useDispatch();
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const onRefresh = () => {
    setLoading(true);
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      setLoading(false);
    }, 3000);
  };

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  useEffect(() => {
    if (error) {
      dispatch(setUserEmail(''));
      dispatch(setAppCode(''));
    }
  }, [error, navigation]);

  return (
    <>
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
      <ScrollView
        contentContainerStyle={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        {error ? (
          <Text style={{color: 'red'}}>{error}</Text>
        ) : (
          <View style={{alignItems: 'center'}}>
            {loading || EmailLoading ? (
              <MainLoader />
            ) : (
              <>
                <LottieView
                  source={require('../../Assets/Loaders/EmailAnimation/EmailLoader.json')}
                  autoPlay
                  loop
                  style={{
                    width: Normalize(100),
                    height: Normalize(100),
                    marginBottom: Normalize(20),
                  }}
                />
                <Text style={{color: 'gray'}}>Total Emails: {totalEmails}</Text>
                <AntDesign
                  name="arrowdown"
                  size={Normalize(40)}
                  color="gray"
                  style={{marginTop: 20}}
                />
                <Text style={{color: 'gray'}}>Pull to reload</Text>
              </>
            )}
          </View>
        )}

        <GetEmail />
      </ScrollView>
    </>
  );
};

export default GetEmailUI;
