import { useState } from 'react';
import { updatePost } from './postsSlice';
import { useDispatch } from 'react-redux';

export const UpdatePostForm = ({ post, setShowEditForm }) => {
  console.log("The UpdatePostForm.js rendered")
  const [title, setTitle] = useState(post.title)
  const [content, setContent] = useState(post.content)
  const dispatch = useDispatch()

  const canSave = Boolean(title) && Boolean(content);

  const onUpdatePostClicked = async (e) => {
    e.preventDefault()
    if (canSave) {
        dispatch(updatePost({ id: post.id, title: title, content: content }))
        setShowEditForm(false)
    }   
  }

  return (
    <form onSubmit={onUpdatePostClicked} className="bg-white p-4 shadow-md rounded-lg">
      <div className="mb-4">
        <label htmlFor="postTitleEdit" className="block text-sm font-medium text-gray-700">Title</label>
        <input  
          id="postTitleEdit"
          name="postTitleEdit"
          placeholder="Edit your title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border border-gray-300 p-2 rounded w-full mt-1"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="postContentEdit" className="block text-sm font-medium text-gray-700">Content</label>
        <textarea  
          id="postContentEdit"
          name="postContentEdit"
          placeholder="Edit your content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="border border-gray-300 p-2 rounded w-full mt-1"
        />
      </div>

      <div className="flex space-x-2">
        <button
          type="submit"
          disabled={!canSave}
          className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          Update
        </button>
        <button
          type="button"
          onClick={() => setShowEditForm(false)}
          className="bg-gray-500 text-white px-4 py-2 rounded"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default UpdatePostForm