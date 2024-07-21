import React from 'react';
import {Modal, Pressable, StyleSheet, Text, View} from 'react-native';
import {useModalStore} from '../Store/Modal.ts';
import AuthCard from './AuthCard.tsx';
import CardBtn from './CardBtn.tsx';

const DeleteModal = () => {
  const {isOpen, setIsOpen} = useModalStore();

  return (
    <Modal
      visible={isOpen}
      transparent={true}
      animationType={'fade'}
      onRequestClose={() => {
        setIsOpen(false);
      }}>
      <Pressable style={styles.center} onPress={() => setIsOpen(false)}>
        <View style={styles.modalContainer}>
          <Pressable onPress={e => e.stopPropagation()}>
            <View>
              <Text style={styles.modalTitle}>Delete Auth</Text>
              <Text style={styles.modalDescription}>
                Are you sure you want to delete the{' '}
                <Text style={{fontWeight: '600'}}>Account?</Text>
              </Text>
            </View>
            <AuthCard />
            <CardBtn
              title={'Delete'}
              press={() => {}}
              color={'#FE043F'}
              borderColor={'none'}
              borderWidth={0}
              textColor={'white'}
            />
            <CardBtn
              title={'Cancel'}
              press={() => {}}
              color={'white'}
              borderColor={'#BDBDBD'}
              borderWidth={1}
              textColor={'black'}
            />
          </Pressable>
        </View>
      </Pressable>
    </Modal>
  );
};

const styles = StyleSheet.create({
  center: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.45)', // 검은 배경과 투명도 설정
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },

  modalContainer: {
    width: '80%',
    height: 315,
    backgroundColor: 'white',
    borderRadius: 25,
    padding: 25,
  },

  modalTitle: {
    fontSize: 22,
    color: 'black',
    fontWeight: '600',
  },

  modalDescription: {
    marginTop: 5,
    fontSize: 16,
    color: 'black',
    fontWeight: '300',
  },

  authCard: {},
});

export default DeleteModal;
