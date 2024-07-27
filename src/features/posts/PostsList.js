import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchPosts, handleDelete } from './postsSlice'
import { UpdatePostForm } from './UpdatePostForm'

const PostExcerpt = ({ post }) => {
    console.log("The PostExcerpt rendered")
    const [showEditForm, setShowEditForm] = useState(false);
    const [updateId, setUpdateId] = useState('')
    const dispatch = useDispatch()

    const handleUpdate = (id) => {
        setUpdateId(id);
        setShowEditForm(true);
    }

    return (
        <tr className="border-b">
            <td className="py-2 px-4">{post.title}</td>
            <td className="py-2 px-4">{post.content}</td>
            <td className="py-2 px-4">
                {showEditForm && updateId === post.id ? (
                    <UpdatePostForm
                        post={post}
                        setShowEditForm={setShowEditForm}
                    />
                ) : (
                    <button
                        onClick={() => handleUpdate(post.id)}
                        className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
                    >
                        Update
                    </button>
                )}
                <button
                    onClick={() => dispatch(handleDelete(post.id))}
                    className="bg-red-500 text-white px-4 py-2 rounded"
                >
                    Delete
                </button>
            </td>
        </tr>
    )
}

export const PostsList = () => {
    console.log("The PostsList rendered")
    const dispatch = useDispatch()
    const posts = useSelector(state => state.posts.posts)
    console.log(posts)
    const status = useSelector(state => state.posts.status)
    console.log(status)
    const error = useSelector(state => state.posts.error)
    console.log(error)

    useEffect(() => {
        status === 'idle' && dispatch(fetchPosts())
    }, [status, dispatch])

    let content

    if (status === 'loading') {
        content = <tr><td colSpan="3" className="text-xl text-gray-700 py-4">Loading...</td></tr>
    } else if (status === 'succeeded') {
        content = posts.map(post => <PostExcerpt key={post.id} post={post} />)
    } else {
        content = <tr><td colSpan="3" className="text-red-500 py-4">Error: {error}</td></tr>
    }

    return (
        <section className="p-4">
            <h2 className="text-2xl font-bold mb-4">Posts</h2>
            <table className="w-full border-collapse bg-white shadow-md rounded-lg">
                <thead>
                    <tr className="bg-gray-100 border-b">
                        <th className="py-2 px-4 text-left">Title</th>
                        <th className="py-2 px-4 text-left">Content</th>
                        <th className="py-2 px-4 text-left">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {content}
                </tbody>
            </table>
        </section>
    )
}