import React from 'react'

import useFetcher, { Service } from '@/hooks/useFetcher'
import PostItem from './PostItem'
import { useUserMap } from './PostList'

import { IPost } from '@cc98/api'

interface Props {
  service: Service<IPost[]>
  isTrace: boolean
}

export default ({ service, isTrace }: Props) => {
  const [userMap, updateUserMap] = useUserMap()

  const [posts] = useFetcher(service, {
    success: updateUserMap,
  })

  if (posts === null) {
    return null
  }

  return (
    <>
      {posts.map((info: IPost) => (
        <PostItem
          key={info.id}
          postInfo={info}
          userInfo={userMap[info.userId]}
          isHot
          isTrace={isTrace}
        />
      ))}
    </>
  )
}