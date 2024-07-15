import React, {FC} from 'react';
import {StyleSheet, View} from 'react-native';

const BottomSheet: FC = () => {
  return (
    <View style={styles.container}>
      <BottomSheet>
        
      </BottomSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: 'grey',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
});

export default BottomSheet;