/* eslint-disable react/prop-types */
const Post = ({ post, children }) => {
  return (
    <div className="mb-4">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="font-bold text-lg text-indigo-600 first-letter:uppercase">
            {post.title}
          </h1>
          <p className="text-slate-500 text-sm">
            {new Date(post.createdAt).toLocaleDateString()}
          </p>
        </div>
        <div>{children}</div>
      </div>
      <p className="text-sm mt-4">
        {post.body}
      </p>
      <div className="h-px w-full bg-gradient-to-r from-indigo-50 via-indigo-500/60 to-indigo-50 mt-5">

      </div>
    </div>
  );
};

export default Post;
