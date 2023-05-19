/**
 * Created by Leon<silenceace@gmail.com> at 2023-05-03.
 */

import _ from 'lodash'
import React from 'react'
import { SheetManager } from 'react-native-actions-sheet'
import { InputText2Submit, InputText2SubmitProp } from '../edit'

export const ShowInputSubmitSheet = ({
  height = '95%',
  submitProps
}: {
  submitProps: InputText2SubmitProp
  height?: number | string
}) => {
  SheetManager.show('submit-sheet', {
    onClose: (data: any) => {},
    payload: {
      height,
      actionTitle: submitProps.buttonTitle,
      title: submitProps.title,
      submitAction: async (inputValue: string) => {
        if (submitProps.submit && _.isFunction(submitProps.submit)) {
          await submitProps.submit(inputValue)
        }
      },
      ContentNode: ({
        onChange
      }: {
        onChange: (text: string) => void
      }) => (
        <InputText2Submit
          {...submitProps}
          textInputProps={{
            ...submitProps.textInputProps
          }}
          inputTextChange={(text?: string) => {
            onChange(text || '')
            submitProps.inputTextChange &&
              submitProps.inputTextChange(text)
          }}
          title=""
          useKeyboardAvoidingView={false}
          containerStyle={{
            flex: 1,
            padding: 0
          }}
          buttonContainerStyle={{
            display: 'none'
          }}
        />
      )
    }
  })
}
