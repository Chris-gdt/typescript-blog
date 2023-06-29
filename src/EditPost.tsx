import { PostData, Tag } from "./App";
import { PostForm } from "./PostForm";
import { usePost } from "./PostLayout";

type EditPostProps = {
  onSubmit: (id: string, data: PostData) => void
  onAddTag: (tag: Tag) => void
  availableTags: Tag[]
}

export function EditPost({ onSubmit, onAddTag, availableTags }: EditPostProps) {
  const Post = usePost()
  return (
    <>
      <h1 className="mb-4">Edit Post</h1>
      <PostForm
        title={Post.title}
        markdown={Post.markdown}
        tags={Post.tags}
        onSubmit={data => onSubmit(Post.id, data)}
        onAddTag={onAddTag}
        availableTags={availableTags} />
    </>
  )
}