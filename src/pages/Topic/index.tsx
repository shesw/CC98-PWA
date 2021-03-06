import React, { useState, useMemo, useCallback } from 'react'
import styled from 'styled-components'

import useFetcher from '@/hooks/useFetcher'

import LoadingCircle from '@/components/LoadingCircle'

import PostHead from './PostHead'
import PostListHot from './PostListHot'
import PostList from './PostList'
import FixButtons from './FixButtons'

import { getTopicInfo } from '@/services/topic'
import {
  getPost,
  getReversePost,
  getTracePost,
  getAnonymousTracePost,
  getHotPost,
} from '@/services/post'
import { navigateHandler } from '@/services/utils/errorHandler'

const EndPlaceholder = styled.div`
  height: 64px;
`

interface Props {
  // 帖子 ID
  topicId: string
  // 追踪非匿名帖子
  userId?: string
  // 追踪匿名帖子
  postId?: string
  // 是否逆向
  isReverse?: boolean
}

const Topic = ({ topicId, userId, postId, isReverse }: Props) => {
  const [topicInfo, setTopicInfo] = useFetcher(() => getTopicInfo(topicId), {
    fail: navigateHandler,
  })

  // 用于刷新
  const [postListKey, setPostListKey] = useState(0)

  if (!topicInfo) {
    return <LoadingCircle />
  }

  // 根据 URL 参数选择获取 post 的 service
  const postService = useMemo(
    () =>
      isReverse
        ? (from: number) => getReversePost(topicInfo.id, from, topicInfo.replyCount)
        : userId
        ? (from: number) => getTracePost(topicInfo.id, userId, from)
        : postId
        ? (from: number) => getAnonymousTracePost(topicInfo.id, postId, from)
        : (from: number) => getPost(topicInfo.id, from),
    [topicInfo]
  )

  const hotPostService = useCallback(() => getHotPost(topicInfo.id), [topicInfo])

  // 是否处于追踪状态
  const isTrace = !!userId || !!postId

  const refreshFunc = () => {
    getTopicInfo(topicId).then(res =>
      res.fail(navigateHandler).succeed(newTopicInfo => {
        setTopicInfo(newTopicInfo)
        setPostListKey(postListKey + 1)
      })
    )
  }

  return (
    <>
      <PostHead topicInfo={topicInfo} />
      <PostList key={postListKey} service={postService} isTrace={isTrace}>
        {!isTrace && <PostListHot service={hotPostService} />}
      </PostList>
      <FixButtons topicInfo={topicInfo} isReverse={isReverse} refreshFunc={refreshFunc} />
      <EndPlaceholder />
    </>
  )
}

/**
 * 逆序 Topic
 */
const TopicReverse = (props: Props) => <Topic isReverse {...props} />

export { Topic as default, TopicReverse }
