import { GridList, GridListTile, GridListTileBar } from '@material-ui/core'
import IconButton from '@material-ui/core/IconButton'
import { StyleRules, withStyles } from '@material-ui/core/styles'
import Close from '@material-ui/icons/Close'
import React from 'react'
import { PicList } from './utils'
interface Props {
  imgList: PicList[]
  deletePic: (id: string) => void
}
const styles: StyleRules = {
  tileBarRoot: {
    backgroundColor: 'rgba(0,0,0,0)',
  },
  actionIcon: {
    borderRadius: '100%',
    backgroundColor: '#13121266',
  },
}
const imgListStyle = {
  padding: '0px 15px 0px 15px',
  margin: '0px',
  // backgroundColor: 'white',
}
const replyImgListStyle = {
  padding: '0px 15px 0px 15px',
  margin: '0px',
  backgroundColor: 'white',
  maxHeight: '200px',
}
export default withStyles(styles)(
  class extends React.Component<Props & { classes: ClassNameMap }> {
    render() {
      const { replyMode, imgList, classes, deletePic } = this.props
      const wrapStyle = { backgroundColor: 'white', ...imgListStyle }

      return (
        <GridList cellHeight={160} cols={3} spacing={4} style={wrapStyle}>
          {imgList.map(e => (
            <GridListTile key={e.id}>
              <img src={e.base64} alt={e.name} />
              <GridListTileBar
                classes={{
                  root: classes.tileBarRoot,
                  actionIcon: classes.actionIcon,
                }}
                titlePosition="top"
                actionIcon={
                  <IconButton onClick={() => deletePic(e.id)}>
                    <Close />
                  </IconButton>}
                actionPosition="right"
              />
            </GridListTile>
          ))}
        </GridList>
      )
    }
  }
)
