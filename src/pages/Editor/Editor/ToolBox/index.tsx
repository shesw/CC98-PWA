import React from 'react'
import styled from 'styled-components'

import { EditorContainer } from '../EditorContainer'

import PictureBtn from './PictureBtn'
import StickerBtn from './StickerBtn'
import ClearBtn from './ClearBtn'
import PreviewBtn from './PreviewBtn'
import SendBtn from './SendBtn'

const WrapperDiv = styled.div`
  display: flex;
  justify-content: space-between;
`

interface Props {
  editor: EditorContainer
  onSendCallback: () => void
}

export default ({ editor, onSendCallback }: Props) => (
  <WrapperDiv>
    <div>
      <PictureBtn editor={editor} />
      <StickerBtn editor={editor} />
    </div>
    <div>
      <ClearBtn editor={editor} />
      <PreviewBtn editor={editor} />
      <SendBtn onSendCallback={onSendCallback} />
    </div>
  </WrapperDiv>
)