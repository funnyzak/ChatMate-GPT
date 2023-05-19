/**
 * Created by Leon<silenceace@gmail.com> at 2023-04-06.
 */

import {
  Button,
  HideKeyboard,
  Input,
  TextInputProps
} from '@src/components'
import { translate } from '@src/i18n'
import { SylCommon, Theme, useTheme } from '@src/theme'
import React, { useEffect, useState } from 'react'
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleProp,
  Text,
  TextStyle,
  View,
  ViewStyle
} from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { FloatingLabelInput } from 'react-native-floating-label-input'
import _ from 'lodash'
import Icons from '../common/Icons'
export interface InputText2SubmitProp {
  containerStyle?: StyleProp<ViewStyle>
  useKeyboardAvoidingView?: boolean
  titleStyle?: StyleProp<TextStyle>
  descriptionStyle?: StyleProp<TextStyle>
  inputContainerStyle?: ViewStyle
  inputTextStyle?: TextStyle
  buttonContainerStyle?: StyleProp<ViewStyle>
  buttonTitleStyle?: StyleProp<TextStyle>
  belowInputNode?: React.ReactNode
  learnMorePressCallback?: () => void
  title?: string
  description?: string
  inputInitialValue?: string
  inputPlaceholder?: string
  inputTextChange?: (inputText?: string) => void
  textInputRequired?: boolean
  textInputProps?: TextInputProps
  textInputType?: 'text' | 'password' | 'email' | 'number'
  textInputClearButton?: boolean
  buttonTitle?: string
  submit?: (inputText?: string) => Promise<void>
  longPressSubmit?: (inputText?: string) => Promise<void>
  tipsText?: String
  tipsPressCallback?: () => void
}
const InputText2Submit: React.FC<InputText2SubmitProp> = (
  data: InputText2SubmitProp
) => {
  const {
    useKeyboardAvoidingView = true,
    textInputRequired = true,
    textInputClearButton = true,
    buttonTitle = translate('common.submit')
  } = data
  const { theme } = useTheme()
  const [submiting, setSubmiting] = useState<boolean>(false)
  const [isEdit, setIsEdit] = useState<boolean>(false)
  useEffect(() => {
    setInputVal(data.inputInitialValue || '')
  }, [data.inputInitialValue])
  const submitCallBack = () => {
    if (data.submit) {
      setSubmiting(true)
      try {
        data.submit(inputVal).then(() => {
          setSubmiting(false)
        })
      } catch (_err) {
        setSubmiting(false)
      }
    }
  }
  const longPressSubmitCallBack = () => {
    if (data.longPressSubmit) {
      setSubmiting(true)
      try {
        data.longPressSubmit(inputVal).then(() => {
          setSubmiting(false)
        })
      } catch (_err) {
        setSubmiting(false)
      }
    }
  }
  useEffect(() => {
    inputTextChangeCallBack(data.inputInitialValue || '')
  }, [data.inputInitialValue])
  const [inputVal, setInputVal] = useState<string>(
    data.inputInitialValue || ''
  )
  const inputTextChangeCallBack = (_val: string) => {
    setInputVal(_val)
    if (data.inputTextChange) data.inputTextChange(_val)
  }
  const RightCommpent = () => {
    if (
      textInputClearButton &&
      inputVal &&
      inputVal.length > 0 &&
      isEdit
    ) {
      return (
        <TouchableOpacity
          style={{
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
            marginHorizontal:
              data.textInputType === 'password' ? 3 : 0
          }}
          onPress={() => {
            inputTextChangeCallBack('')
          }}>
          <Icons.input.Clear theme={theme} />
        </TouchableOpacity>
      )
    }
    return null
  }

  return (
    <KeyboardAvoidingView
      style={{}}
      behavior={
        !useKeyboardAvoidingView
          ? undefined
          : Platform.OS === 'ios'
          ? 'padding'
          : 'height'
      }>
      <HideKeyboard>
        <View style={[styles.container(theme), data.containerStyle]}>
          <View>
            {data.title && (
              <Text style={[styles.title(theme), data.titleStyle]}>
                {data.title}
              </Text>
            )}
            {data.description && (
              <TouchableOpacity
                activeOpacity={1}
                onPress={
                  data.learnMorePressCallback &&
                  (() => {
                    data.learnMorePressCallback!()
                  })
                }
                style={styles.descriptionWrapper(theme)}>
                <Text
                  style={[
                    styles.description(theme),
                    data.descriptionStyle
                  ]}>
                  {data.description}
                  {data.learnMorePressCallback && (
                    <Text
                      style={{
                        color: theme.colors.primary
                      }}>
                      {` ${translate('button.learnMore')}...`}
                    </Text>
                  )}
                </Text>
              </TouchableOpacity>
            )}

            <View
              style={_.merge(
                styles.inputContainer(theme),
                data.inputContainerStyle
              )}>
              <FloatingLabelInput
                label=""
                numberOfLines={1}
                hintTextColor={theme.colors.placeholderText}
                hint={data.inputPlaceholder}
                staticLabel
                {...data.textInputProps}
                defaultValue={data.inputInitialValue}
                containerStyles={{
                  borderWidth: 0,
                  padding: 0,
                  margin: 0
                }}
                onFocus={() => {
                  setIsEdit(true)
                }}
                onBlur={() => {
                  setIsEdit(false)
                }}
                inputStyles={_.merge(
                  styles.inputText(theme),
                  data.inputTextStyle
                )}
                autoCapitalize={'none'}
                editable={!submiting}
                isPassword={data.textInputType === 'password'}
                togglePassword={data.textInputType !== 'password'}
                value={inputVal}
                onChangeText={(value) =>
                  inputTextChangeCallBack(value)
                }
                customShowPasswordComponent={
                  <Icons.input.Eye theme={theme} />
                }
                customHidePasswordComponent={
                  <Icons.input.EyeOff theme={theme} />
                }
                rightComponent={<RightCommpent />}
              />
            </View>
            {data.belowInputNode}
          </View>
          <View>
            {buttonTitle && (
              <Button
                disabled={
                  (textInputRequired && inputVal.length === 0) ||
                  submiting
                }
                loading={submiting}
                style={[
                  styles.buttonContainer(theme),
                  data.buttonContainerStyle
                ]}
                textStyle={[
                  styles.buttonTitle(theme),
                  data.buttonTitleStyle
                ]}
                onLongPress={longPressSubmitCallBack}
                onPress={submitCallBack}>
                {buttonTitle}
              </Button>
            )}
            {data.tipsText && (
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={data.tipsPressCallback}
                style={{
                  marginBottom: theme.spacing.tiny
                }}>
                <Text
                  style={{
                    ...theme.typography.labelText,
                    color: theme.colors.secondaryLight
                  }}>
                  {data.tipsText!}
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </HideKeyboard>
    </KeyboardAvoidingView>
  )
}
const styles = {
  container: (theme: Theme): ViewStyle => ({
    display: 'flex',
    flexDirection: 'column',
    marginVertical: theme.spacing.medium,
    height: '100%'
  }),
  title: (theme: Theme): TextStyle => ({
    ...theme.typography.titleTextSemiBold,
    color: theme.colors.primaryText
  }),
  descriptionWrapper: (theme: Theme): ViewStyle => ({
    marginTop: theme.spacing.small,
    display: 'flex',
    flexDirection: 'row',
    marginVertical: theme.spacing.medium
  }),
  description: (theme: Theme): TextStyle => ({
    ...theme.typography.labelText,
    color: theme.colors.secondaryText
  }),
  inputContainer: (theme: Theme): ViewStyle => ({
    alignItems: 'center',
    height: theme.dimensions.defaultInputBoxHeight,
    backgroundColor: theme.colors.inputBackground,
    borderWidth: theme.dimensions.defaultLineWidth,
    borderRadius: theme.dimensions.borderRadius * 2,
    borderColor: theme.colors.borderBase,
    paddingHorizontal: theme.spacing.medium,
    marginBottom: theme.spacing.medium,
    width: '100%'
  }),
  inputText: (theme: Theme): TextStyle => ({
    ...theme.typography.inputText,
    flex: 1,
    color: theme.colors.regularText
  }),
  buttonContainer: (theme: Theme): ViewStyle => ({
    alignSelf: 'center',
    marginBottom: theme.spacing.medium
  }),
  buttonTitle: (theme: Theme): TextStyle => ({})
}
export { InputText2Submit }
