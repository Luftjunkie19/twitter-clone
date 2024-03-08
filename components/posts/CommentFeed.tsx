import React from 'react';

import CommentItem from './CommentItem';

type Props = {comments:Record<string,any>[]};

function CommentFeed({comments = []}: Props) {


  return (
<>
{comments.map((comment)=>(<CommentItem key={comment.id} data={comment}/>))}
</>
  )
}

export default CommentFeed