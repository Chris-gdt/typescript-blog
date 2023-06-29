import { PostData, Tag } from "./App";
import { PostForm } from "./PostForm";

type NewPostProps = {
  onSubmit: (data: PostData) => void
  onAddTag: (tag: Tag) => void
  availableTags: Tag[]
}

export function NewPost({ onSubmit, onAddTag, availableTags }: NewPostProps) {
  return <>
    <h1 className="mb-4">Ajouter une news</h1>
    <PostForm onSubmit={onSubmit} onAddTag={onAddTag} availableTags={availableTags} />
  </>
}