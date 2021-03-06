import React from 'react'

import useContainer from '@/hooks/useContainer'
import settingInstance from '@/containers/setting'

import { ListItem, ListItemText, Switch } from '@material-ui/core'

export default () => {
  const { state, TOGGLE_THEME } = useContainer(settingInstance)

  return (
    <ListItem button>
      <ListItemText primary="夜间模式" secondary="使用暗色主题" />
      <Switch checked={state.theme === 'dark'} onChange={TOGGLE_THEME} />
    </ListItem>
  )
}
