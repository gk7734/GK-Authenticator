import {Image, StyleSheet, Text, View} from 'react-native';
import React, {useMemo} from 'react';
import {useAuthDetailStore} from '../Store/AuthDetail.ts';

const AuthCard = () => {
  const authDetails = useAuthDetailStore();

  const {user, issuer, icon} = useMemo(() => {
    return {
      user: authDetails.user,
      issuer: authDetails.issuer,
      icon: authDetails.icon,
    };
  }, [authDetails]);

  return (
    <View style={styles.cardContainer}>
      {/* eslint-disable-next-line react-native/no-inline-styles */}
      <View style={{display: 'flex', flexDirection: 'row'}}>
        <Image
          source={{
            uri: icon,
          }}
          style={styles.brandIcon}
        />
        <View>
          <Text style={styles.authMainText}>{issuer}</Text>
          <Text style={styles.authSubText}>{user}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    marginTop: 15,
    marginBottom: 2,
    display: 'flex',
    flexDirection: 'column',
  },

  authMainText: {
    color: 'black',
    fontSize: 14,
    fontWeight: '500',
  },

  authSubText: {
    color: 'black',
    fontSize: 12,
  },

  brandIcon: {
    width: 45,
    height: 45,
    borderRadius: 50,
    marginRight: 10, // 아이콘과 텍스트 사이 간격
    borderWidth: 0.5,
    borderColor: '#BDBDBD',
  },
});

export default AuthCard;
