import {View, Text} from 'react-native';
import React, {useEffect} from 'react';
import axios from 'axios';
import Constants from '../../../utils/helper/Constants';
import {useSelector, useDispatch} from 'react-redux';
import {setTotalEmails, setError, setEmailLoading} from '../Redux/Action';

const GetEmail = () => {
  const dispatch = useDispatch();
  const getPasscode = useSelector(state => state.AppCode);
  const userEmail = useSelector(state => state.userEmail);

  const fetchEmails = async () => {
    dispatch(setEmailLoading(true));
    try {
      const response = await axios.post(`${Constants.BASE_URL}/emails`, {
        email: userEmail,
        password: getPasscode, // Send email and passcode in the request body
      });
      console.log(response.data);
      dispatch(setTotalEmails(response.data.total));
      dispatch(setError('')); // Clear any previous error
      dispatch(setEmailLoading(false));
    } catch (err) {
      dispatch(setError('Failed to fetch data'));
      console.error('Error fetching data:', err);
      dispatch(setEmailLoading(false));
    }
  };

  useEffect(() => {
    fetchEmails();
  }, []);

  return null;
};

export default GetEmail;
