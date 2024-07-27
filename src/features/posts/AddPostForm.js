import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addNewPost } from './postsSlice'

export const AddPostForm = () => {
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [addRequestStatus, setAddRequestStatus] = useState('idle')
    const [error, setError] = useState(null)
    const dispatch = useDispatch()
    const onTitleChanged = (e) => setTitle(e.target.value)
    const onContentChanged = e => setContent(e.target.value)

    const canSave = Boolean(title) && Boolean(content) && addRequestStatus === 'idle'

    const onSavePostClicked = async () => {
        if (canSave) {
            try {
                setAddRequestStatus('pending')
                await dispatch(addNewPost({title, content})).unwrap()
                setTitle('')
                setContent('')
                setError(null)
            } catch (err) {
                console.error('Failed to save the post: ', err)
                setError('Error saving the post')
            } finally {
                setAddRequestStatus('idle')
            }
        }
    }

    return (
        <section className="p-4">
            <h2 className="text-xl font-bold mb-4">Add a New Post</h2>
            <form className="space-y-4">
                <div>
                    <label htmlFor="postTitle" className="block text-sm font-medium text-gray-700">Post Title:</label>
                    <input 
                        type="text"
                        id="postTitle"
                        name="postTitle"
                        value={title}
                        onChange={onTitleChanged}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                        placeholder="Enter your title"
                    />
                </div>
                <div>
                    <label htmlFor="postContent" className="block text-sm font-medium text-gray-700">Content:</label>
                    <textarea
                        id="postContent"
                        name="postContent"
                        value={content}
                        onChange={onContentChanged} 
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                        placeholder="Enter your content"
                    />
                </div>
                <div>
                    <button 
                        type="button" 
                        onClick={onSavePostClicked} 
                        disabled={!canSave}
                        className="px-4 py-2 bg-blue-500 text-white rounded-md disabled:opacity-50"
                    >
                        Save Post
                    </button>
                </div>
            </form>
            {error && <div className="mt-4 text-red-500">{error}</div>}
        </section>
    )
}