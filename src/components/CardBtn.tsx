import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {FC} from 'react';

interface CardBtnProps {
  title: string;
  press: () => void;
  color: string;
  textColor: string;
  borderWidth: number;
  borderColor: string;
}

const CardBtn: FC<CardBtnProps> = ({
  title,
  press,
  color,
  textColor,
  borderWidth,
  borderColor,
}) => {
  return (
    <TouchableOpacity style={styles.cardContainer} onPress={press}>
      <View
        style={[
          styles.cardBtn,
          {
            backgroundColor: color,
            borderColor: borderColor,
            borderWidth: borderWidth,
          },
        ]}>
        <Text style={[styles.mainText, {color: textColor}]}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    marginTop: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  cardBtn: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    borderRadius: 10,
    height: 50,
  },

  mainText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CardBtn;
