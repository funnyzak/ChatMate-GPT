/**
 * Created by Leon<silenceace@gmail.com> at 2023-04-03.
 */

import { useAppSelector } from '@src/hooks'
import { translate } from '@src/i18n'
import { SvgRadioButton } from '@src/svg'
import { useTheme } from '@src/theme'
import { haptic } from '@src/utils/haptic'
import React, { useMemo, useState } from 'react'
import RNNumericInput, {
  INumericInputProps
} from 'react-native-numeric-input'
import { Switch as RNSwitch, SwitchProps } from 'react-native-switch'
export const RadioOption = (checked: boolean) => {
  const { theme } = useTheme()
  return !checked ? (
    <SvgRadioButton.normal
      width={15}
      height={15}
      color={checked ? theme.colors.primary : theme.colors.disabled}
    />
  ) : (
    <SvgRadioButton.selected
      width={15}
      height={15}
      color={checked ? theme.colors.primary : theme.colors.disabled}
    />
  )
}
export const NumericInput = (props: INumericInputProps) => {
  const { theme } = useTheme()
  const setting = useAppSelector((state) => state.setting)
  const {
    totalWidth = 90,
    totalHeight = 30,
    iconSize = 15,
    type = 'plus-minus',
    editable = true,
    step = 1,
    valueType = 'real',
    rounded = true,
    textColor = theme.colors.primaryText,
    rightButtonBackgroundColor = theme.colors.backgroundLight,
    leftButtonBackgroundColor = theme.colors.backgroundLight
  } = useMemo(() => props, [props, theme])
  return (
    <RNNumericInput
      {...props}
      editable={editable}
      value={props.value}
      onChange={(value) => {
        setting.hapticFeedback && haptic()
        props.onChange(value)
      }}
      onLimitReached={props.onLimitReached}
      containerStyle={{
        ...props.containerStyle
      }}
      sepratorWidth={0.3}
      borderColor={theme.colors.borderLighter}
      totalWidth={totalWidth}
      totalHeight={totalHeight}
      iconSize={iconSize}
      step={step}
      valueType={valueType}
      rounded={rounded}
      type={type}
      textColor={textColor}
      iconStyle={{
        ...props.iconStyle,
        color: theme.colors.primaryText
      }}
      rightButtonBackgroundColor={rightButtonBackgroundColor}
      leftButtonBackgroundColor={leftButtonBackgroundColor}
    />
  )
}
export const Switch = (props: SwitchProps) => {
  const { theme } = useTheme()
  const {
    value = false,
    onValueChange = (_val: boolean) => {},
    disabled = false,
    activeText = translate('common.on'),
    inActiveText = translate('common.off'),
    circleSize = 25,
    circleBorderWidth = 0.3,
    backgroundActive = theme.colors.primary,
    backgroundInactive = theme.colors.borderDark,
    circleActiveColor = theme.colors.white,
    circleInActiveColor = theme.colors.white,
    changeValueImmediately = true, // if rendering inside circle, change state immediately or wait for animation to complete
    innerCircleStyle = {
      alignItems: 'center',
      justifyContent: 'center'
    }, // style for inner animated circle for what you (may) be rendering inside the circle
    outerCircleStyle = {}, // style for outer animated circle
    renderActiveText = false,
    renderInActiveText = false,
    switchLeftPx = 2, // denominator for logic when sliding to TRUE position
    switchRightPx = 2, // denominator for logic when sliding to FALSE position
    switchWidthMultiplier = 2 // multipled by the `circleSize` prop to calculate total width of the Switch
  } = useMemo(() => props, [props, theme])
  const setting = useAppSelector((state) => state.setting)
  return (
    <RNSwitch
      {...props}
      value={value}
      onValueChange={(_val: boolean) => {
        setting.hapticFeedback && haptic()
        onValueChange(_val)
      }}
      disabled={disabled}
      activeText={activeText}
      inActiveText={inActiveText}
      circleSize={circleSize}
      circleBorderWidth={circleBorderWidth}
      backgroundActive={backgroundActive}
      backgroundInactive={backgroundInactive}
      circleActiveColor={circleActiveColor}
      circleInActiveColor={circleInActiveColor}
      changeValueImmediately={changeValueImmediately}
      innerCircleStyle={innerCircleStyle}
      outerCircleStyle={outerCircleStyle}
      renderActiveText={renderActiveText}
      renderInActiveText={renderInActiveText}
      switchLeftPx={switchLeftPx}
      switchRightPx={switchRightPx}
      switchWidthMultiplier={switchWidthMultiplier}
    />
  )
}
