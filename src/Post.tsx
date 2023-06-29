import { Badge, Button, Col, Row, Stack } from "react-bootstrap";
import { usePost } from "./PostLayout";
import { Link, useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";

type PostProps = {
  onDelete: (id: string) => void
}

export function Post({ onDelete }: PostProps) {
  const Post = usePost()
  const navigate = useNavigate()

  return (
    <>
      <Row className="align-items-center mb-4">
        <Col>
          <h1>{Post.title}</h1>
          {Post.tags.length > 0 && (
            <Stack gap={1} direction="horizontal" className="flex-wrap">
              {Post.tags.map(tag => (
                <Badge className="text-truncate" key={tag.id}>{tag.label}</Badge>
              ))}
            </Stack>
          )}
        </Col>
        <Col xs="auto">
          <Stack gap={2} direction="horizontal">
            <Link to={`/${Post.id}/edit`}>
              <Button variant="primary">Edit</Button>
            </Link>
            <Button
              onClick={() => {
                onDelete(Post.id)
                navigate("/")
              }}
              variant="outline-danger">Delete</Button>
            <Link to="..">
              <Button variant="outline-secondary">Back</Button>
            </Link>
          </Stack>
        </Col>
      </Row>
      <ReactMarkdown>{Post.markdown}</ReactMarkdown>
    </>
  )
}