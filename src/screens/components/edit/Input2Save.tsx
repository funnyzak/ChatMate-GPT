/**
 * Created by Leon<silenceace@gmail.com> at 2023-04-06.
 */

import { translate } from '@src/i18n'
import { useTheme } from '@src/theme'
import { truncateString } from '@src/utils/utils'
import _ from 'lodash'
import React, { useState } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import {
  InputText2Submit,
  InputText2SubmitProp
} from './Input2Submit'
import { logInfo } from '@src/helper'
export const Input2Save = (
  prop: InputText2SubmitProp & {
    adviceInputText?: string
    helpText?: string
    helpCallback?: () => void
  }
) => {
  const { theme } = useTheme()
  const [defaultInputValue, setDefaultInputVal] = useState<string>(
    prop.inputInitialValue ?? ''
  )
  const {
    containerStyle = {},
    titleStyle = {},
    descriptionStyle = {},
    inputContainerStyle = {},
    inputTextStyle = {},
    textInputProps = {},
    buttonContainerStyle = {},
    belowInputNode,
    adviceInputText
  } = prop
  return (
    <InputText2Submit
      {...prop}
      buttonTitle={translate('common.ok')}
      belowInputNode={
        belowInputNode ? (
          belowInputNode
        ) : (
          <>
            {adviceInputText && (
              <View
                style={{
                  display: 'flex',
                  width: '100%',
                  flexDirection: 'row',
                  alignItems: 'center'
                }}>
                <Text
                  numberOfLines={1}
                  ellipsizeMode={'middle'}
                  style={{
                    maxWidth: '70%',
                    paddingTop: theme.spacing.small - 3,
                    ...theme.typography.captionText,
                    color: theme.colors.secondaryText
                  }}>
                  {(prop.title ?? '') +
                    (prop.title && translate('symbol.colon')) +
                    adviceInputText.trim()}
                </Text>
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={{}}
                  onPress={() => {
                    // textInputRef?.current?.setNativeProps({
                    //   text: adviceInputText
                    // })
                    // setInputVal(adviceInputText)
                    // textInputRef?.current?.focus()
                    logInfo(
                      'adviceInputText',
                      adviceInputText,
                      defaultInputValue
                    )
                    setDefaultInputVal(adviceInputText)
                  }}>
                  <Text
                    style={{
                      paddingTop: theme.spacing.small - 3,
                      paddingLeft: theme.spacing.small,
                      ...theme.typography.captionText,
                      color: theme.colors.primaryText
                    }}>
                    {translate('common.fillIn')}
                  </Text>
                </TouchableOpacity>
              </View>
            )}
            {prop.helpText && (
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={prop.helpCallback}
                style={{
                  display: 'flex',
                  width: '100%',
                  flexDirection: 'row',
                  alignItems: 'center'
                }}>
                <Text
                  numberOfLines={1}
                  ellipsizeMode={'middle'}
                  style={{
                    maxWidth: '70%',
                    paddingTop: theme.spacing.small - 3,
                    ...theme.typography.captionText,
                    color: theme.colors.secondary
                  }}>
                  {prop.helpText}
                </Text>
              </TouchableOpacity>
            )}
          </>
        )
      }
      inputTextChange={(inputText?: string) => {
        setDefaultInputVal(inputText || '')
        prop.inputTextChange && prop.inputTextChange(inputText)
      }}
      inputInitialValue={defaultInputValue}
      containerStyle={_.merge(
        {
          justifyContent: 'space-between',
          paddingTop: theme.spacing.extraLarge * 2,
          alignItems: 'center'
        },
        containerStyle
      )}
      titleStyle={_.merge(
        {
          ...theme.typography.bigTitleTextBold,
          color: theme.colors.primaryText,
          textAlign: 'center'
        },
        titleStyle
      )}
      descriptionStyle={_.merge(
        {
          ...theme.typography.bodyText,
          color: theme.colors.secondaryText,
          textAlign: 'center',
          marginBottom: theme.spacing.extraLarge
        },
        descriptionStyle
      )}
      inputContainerStyle={_.merge(
        {
          backgroundColor: theme.colors.transparent,
          borderRadius: 0,
          borderWidth: 0,
          borderLeftWidth: 0,
          borderRightWidth: 0,
          paddingHorizontal: 0,
          borderTopWidth: theme.dimensions.defaultLineWidth,
          borderBottomWidth: theme.dimensions.defaultLineWidth,
          borderColor: theme.colors.borderBase
        },
        inputContainerStyle
      )}
      inputTextStyle={_.merge({}, inputTextStyle)}
      textInputProps={_.merge(
        {
          inputMode: 'text',
          textAlign: 'left',
          autoFocus: true
        },
        textInputProps
      )}
      buttonContainerStyle={_.merge(
        {
          width: '45%',
          marginBottom: theme.spacing.extraLarge * 6,
          minWidth: 170,
          maxWidth: 240
        },
        buttonContainerStyle
      )}
    />
  )
}
