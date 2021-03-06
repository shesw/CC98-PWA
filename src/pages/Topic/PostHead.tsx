import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

import { IconButton, Typography, Paper } from '@material-ui/core'

import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace'

import { ITopic } from '@cc98/api'
import { getBoardNameById } from '@/services/board'

import { navigate, goback } from '@/utils/history'

import PostActions from './PostActions'

const Wrapper = styled(Paper).attrs({
  square: true,
  elevation: 1,
})`
  && {
    display: flex;
    align-items: center;
    position: sticky;
    top: 0;
    min-height: 56px;
    padding: 0 16px;
    padding-right: 0;
    /* z-index of TopBar is 1100 and DrawerMenu is 1200 */
    z-index: 1105;

    @media (min-width: 600px) {
      height: 64px;
    }
  }
`

const GobackIcon = styled(IconButton)`
  && {
    margin-left: -12px;
    margin-right: 5px;
  }
`

const Title = styled(Typography).attrs({
  variant: 'subtitle2',
})`
  && {
    margin: 4px 0;
    flex-grow: 2;
    flex-shrink: 1;
  }
`

const SubTitle = styled(Typography)`
  && {
    display: inline-block;
    min-width: 4rem;
    max-width: 6rem;
    text-align: center;
    margin-right: -5px;
    flex-shrink: 1.2;
    opacity: 0.5;
  }
`

interface Props {
  topicInfo: ITopic
}

const PostHead: React.FunctionComponent<Props> = ({ topicInfo }) => {
  const [boardName, setBoardName] = useState('')

  useEffect(() => {
    getBoardNameById(topicInfo.boardId).then(boardName => setBoardName(boardName))
  }, [])

  return (
    <Wrapper>
      <GobackIcon onClick={goback}>
        <KeyboardBackspaceIcon />
      </GobackIcon>
      <Title>{topicInfo.title}</Title>
      <SubTitle onClick={() => navigate(`/board/${topicInfo.boardId}`)}>{boardName}</SubTitle>
      <PostActions topicInfo={topicInfo} />
    </Wrapper>
  )
}

export default PostHead
