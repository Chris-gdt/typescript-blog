import { Navigate, Outlet, useOutletContext, useParams } from "react-router-dom"
import { Post } from "./App"

type PostLayoutProps = {
  Posts: Post[]
}
export function PostLayout({ Posts }: PostLayoutProps) {
  const { id } = useParams()
  const Post = Posts.find(Post => Post.id === id)

  if (Post == null) return <Navigate to="/" replace />

  return <Outlet context={Post} />
}

export function usePost() {
  return useOutletContext<Post>()
}