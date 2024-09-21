import {Text, View} from 'react-native';
import React, {FC} from 'react';

interface SettingsMenuProps {
  title: string;
}

const SettingsMenuText: FC<SettingsMenuProps> = ({title}) => {
  return (
    <View>
      <Text>{title}</Text>
    </View>
  );
};

export default SettingsMenuText;
