/**
 * Created by Leon<silenceace@gmail.com> at 2023-03-14.
 */

import { Theme, useTheme } from '@src/theme'
import React from 'react'
import { Modal, View, ViewStyle } from 'react-native'
import Loading from '../loading'
interface IProps {
  visible?: boolean
  overlay?: boolean
}
const LoadingModalComponent = ({
  visible = true,
  overlay = true
}: IProps) => {
  const { theme } = useTheme()
  const Container = () => {
    return (
      <View
        style={[
          styles.modalContainer(theme),
          {
            ...(overlay
              ? {
                  borderRadius: 8
                }
              : {
                  marginLeft: theme.dimensions.WINDOW_WIDTH / 2 - 25,
                  marginTop: theme.dimensions.WINDOW_HEIGHT / 8
                })
          }
        ]}>
        <Loading visible />
      </View>
    )
  }
  return (
    <Modal visible={visible} transparent>
      {overlay ? (
        <View style={styles.modal(theme)}>
          <Container />
        </View>
      ) : (
        <Container />
      )}
    </Modal>
  )
}
const LoadingModal = React.memo(LoadingModalComponent)
export default LoadingModal
const styles = {
  modal: (theme: Theme): ViewStyle => ({
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.overlay,
    opacity: 0.8
  }),
  modalContainer: (theme: Theme): ViewStyle => ({
    width: 50,
    height: 50,

    backgroundColor: theme.colors.backgroundDark,
    opacity: 1,
    borderWidth: 0.3,
    borderColor: theme.colors.borderDark,
    borderRadius: 25,
    justifyContent: 'center',

    shadowColor: theme.colors.borderDark,
    shadowOffset: {
      width: 0,
      height: 0
    },
    shadowOpacity: 0.2,
    shadowRadius: 25,
    elevation: 2
  })
}
