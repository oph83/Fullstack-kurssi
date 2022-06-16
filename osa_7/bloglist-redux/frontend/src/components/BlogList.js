import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Table } from 'react-bootstrap'

const BlogList = () => {
  const blogs = useSelector(state => state.blogs)

  const sortedBlogs = [...blogs].sort((a1, a2) => a2.votes - a1.votes)

  return (
    <div>
      <Table striped>
        <tbody>
          {sortedBlogs.map(blog =>
            <tr key={blog.id}>
              <td>
                <Link to={`/blogs/${blog.id}`} key={blog.id}>{blog.title} by {blog.author} </Link>
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  )
}

export default BlogList