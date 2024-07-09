import {FC} from 'react';
import {Surface} from 'react-native-paper';
import { StyleSheet, View } from "react-native";

const Header: FC = () => {
  return (
    <Surface style={style.header}>
      <View></View>
    </Surface>
  );
};

export default Header;

const style = StyleSheet.create({
  header: {
    height: 50,
    elevation: 4,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#EFEFEF',
  },
});
