import "bootstrap/dist/css/bootstrap.min.css"
import { Container } from "react-bootstrap"
import { Routes, Route, Navigate } from "react-router-dom"
import { NewPost } from "./NewPost"
import { useLocalStorage } from "./useLocalStorage"
import { useMemo } from "react"
import { v4 as uuidV4 } from "uuid"
import { PostList } from "./PostList"
import { PostLayout } from "./PostLayout"
import { Post } from "./Post"
import { EditPost } from "./EditPost"

export type Post = {
  id: string
} & PostData

export type RawPost = {
  id: string
} & RawPostData

export type RawPostData = {
  title: string,
  markdown: string,
  tagIds: string[]
}

export type PostData = {
  title: string,
  markdown: string,
  tags: Tag[]
}

export type Tag = {
  id: string,
  label: string
}


function App() {
  const [Posts, setPosts] = useLocalStorage<RawPost[]>("PostS", [])
  const [tags, setTags] = useLocalStorage<Tag[]>("TAGS", [])

  const PostsWithTags = useMemo(() => {
    return Posts.map(Post => {
      return { ...Post, tags: tags.filter(tag => Post.tagIds.includes(tag.id)) }
    })
  }, [Posts, tags])

  function onCreatePost({ tags, ...data }: PostData) {
    setPosts(prevPosts => {
      return [...prevPosts, { ...data, id: uuidV4(), tagIds: tags.map(tag => tag.id) }]
    })
  }

  function onUpdatePost(id: string, { tags, ...data }: PostData) {
    setPosts(prevPosts => {
      return prevPosts.map(Post => {
        if (Post.id === id) {
          return { ...Post, ...data, tagIds: tags.map(tag => tag.id) }
        } else return Post
      })
      return [...prevPosts, { ...data, id: uuidV4(), tagIds: tags.map(tag => tag.id) }]
    })
  }

  function addTag(tag: Tag) {
    setTags(prev => [...prev, tag])
  }

  function onDeletePost(id: string) {
    setPosts(prevPosts => {
      return prevPosts.filter(Post => Post.id !== id)
    })
  }

  return (
    <Container className="my-4">
      <Routes>
        <Route path="/" element={<PostList Posts={PostsWithTags} availableTags={tags} />} />
        <Route path="/new" element={<NewPost onSubmit={onCreatePost} onAddTag={addTag} availableTags={tags} />} />
        <Route path="/:id" element={<PostLayout Posts={PostsWithTags} />}>
          <Route index element={<Post onDelete={onDeletePost} />} />
          <Route path="edit" element={<EditPost onSubmit={onUpdatePost} onAddTag={addTag} availableTags={tags} />} />
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Container>
  )
}

export default App
