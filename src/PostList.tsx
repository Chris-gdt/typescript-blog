import { useMemo, useState } from "react";
import { Badge, Button, Card, Col, Form, Row, Stack } from "react-bootstrap";
import { Link } from "react-router-dom";
import ReactSelect from "react-select";
import { Tag } from "./App";
import styles from "./PostList.module.css"


type PostListProps = {
  availableTags: Tag[]
  Posts: SimplifiedPost[]
}

type SimplifiedPost = {
  tags: Tag[]
  title: string
  id: string
}

export function PostList({ availableTags, Posts }: PostListProps) {

  const [selectedTags, setSelectedTags] = useState<Tag[]>([])
  const [title, setTitle] = useState("")

  const filteredPosts = useMemo(() => {
    return Posts.filter(Post => {
      return (
        (title === "" ||
          Post.title.toLowerCase().includes(title.toLowerCase())) &&
        (selectedTags.length === 0 ||
          selectedTags.every(tag =>
            Post.tags.some(PostTag => PostTag.id === tag.id)
          ))
      )
    })
  }, [title, selectedTags, Posts]);

  return <>
    <Row className="align-items-center mb-4">
      <Col><h1>Echoes</h1></Col>
      <Col xs="auto">
        <Stack gap={2} direction="horizontal">
          <Link to="/new">
            <Button variant="primary">Create Post</Button>
          </Link>
        </Stack>
      </Col>
    </Row>
    <Form>
      <Row className="mb-4">
        <Col>
          <Form.Group controlId="title">
            <Form.Label>Recherche par titre</Form.Label>
            <Form.Control value={title} onChange={e => setTitle(e.target.value)} type="text" />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group controlId="tags">
            <Form.Label>Recherche par tag</Form.Label>
            <ReactSelect
              value={selectedTags.map(tag => {
                return { label: tag.label, value: tag.id }
              })}
              options={availableTags.map(tag => {
                return { label: tag.label, value: tag.id }
              })}
              onChange={tags => {
                setSelectedTags(tags.map(tag => {
                  return { label: tag.label, id: tag.value }
                }))
              }}
              isMulti />
          </Form.Group>
        </Col>
      </Row>
    </Form>
    <Row xs={1} sm={2} lg={3} xl={4} className="g-3">
      {filteredPosts.map(Post => (
        <Col key={Post.id}>
          <PostCard id={Post.id} title={Post.title} tags={Post.tags} />
        </Col>
      ))}
    </Row>
  </>
}

function PostCard({ id, title, tags }: SimplifiedPost) {
  return (
    <Card
      as={Link}
      to={`/${id}`}
      className={`h-100 text-reset text-decoration-none ${styles.card}`}
    >
      <Card.Body>
        <Stack gap={2} className="align-items-center justify-content-center h-100">
          <span className="fs-5">{title}</span>
          {tags.length > 0 && (
            <Stack gap={1} direction="horizontal" className="justify-content-center flex-wrap">
              {tags.map(tag => (
                <Badge className="text-truncate" key={tag.id}>{tag.label}</Badge>
              ))}
            </Stack>
          )}
        </Stack>
      </Card.Body>
    </Card >
  )
}