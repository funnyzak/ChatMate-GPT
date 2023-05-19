/**
 * Created by Leon<silenceace@gmail.com> at 2023-04-04.
 */

import React, { useLayoutEffect } from 'react'
import { OPENSOURCE_LIST } from '@src/config/constants'
import { translate } from '@src/i18n'
import {
  ROUTES,
  OpenSourceScreenProps as ScreenProps
} from '@src/navigation/routes'
import { SylCommon, useTheme } from '@src/theme'
import { ScrollView } from 'react-native'
import { TableList, TableRow } from '../components'
import Icons from '../components/common/Icons'
const OpenSource = ({ route, navigation }: ScreenProps) => {
  const { theme } = useTheme()
  useLayoutEffect(() => {
    navigation.setOptions({
      title: ''
    })
  }, [])
  return (
    <ScrollView style={[SylCommon.Layout.fill, {}]}>
      <TableList
        title={translate('setting.info.thanksToOpenSource')}
        containerStyle={[
          {
            marginVertical: theme.spacing.large,
            marginBottom: theme.spacing.extraLarge
          }
        ]}>
        {OPENSOURCE_LIST.map((item, index) => (
          <TableRow
            key={index}
            title={item.name}
            withArrow={true}
            containerStyle={[
              {
                borderBottomWidth:
                  index === OPENSOURCE_LIST.length - 1
                    ? 0
                    : theme.dimensions.defaultLineWidth
              }
            ]}
            leftNode={<Icons.settings.Code theme={theme} />}
            onPress={() => {
              navigation.navigate(ROUTES.WebViewer, {
                url: item.repoUrl
              })
            }}
          />
        ))}
      </TableList>
    </ScrollView>
  )
}
export default OpenSource
