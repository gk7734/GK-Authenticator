import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import AtIcon from 'react-native-vector-icons/AntDesign';
import React from 'react';

const Profile = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/Image/Profile.png')}
        style={styles.profileImg}
      />
      <View style={styles.textBox}>
        <Text style={styles.username}>John Doe</Text>
        <Text style={styles.email}>user@example.com</Text>
      </View>
      <TouchableOpacity style={styles.btnContainer}>
        <Text style={styles.btnText}>Edit profile</Text>
        <AtIcon name={'right'} size={15} color={'#82b5ff'} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },

  profileImg: {
    width: 70,
    height: 70,
    borderRadius: 50,
  },

  textBox: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },

  username: {
    marginTop: 5,
    fontSize: 22,
    fontFamily: 'Pretendard-Medium',
    color: 'black',
  },

  email: {
    fontSize: 16,
    fontFamily: 'Pretendard-Regular',
    color: '#7C7C7C',
  },

  btnContainer: {
    marginTop: 20,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5,
    width: 120,
    borderRadius: 20,
    paddingVertical: 8,
    backgroundColor: '#056AFF',
  },

  btnText: {
    marginLeft: 5,
    color: '#eff0f3',
    fontSize: 14,
    fontFamily: 'Pretendard-Medium',
  },
});

export default Profile;
