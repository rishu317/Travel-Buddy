import { useParams, Link } from "react-router-dom";
import blogData from "../Data/blogs";

function BlogDetail() {
  const { id } = useParams();
  const blog = blogData.find((b) => b.id.toString() === id);

  if (!blog) {
    return (
      <div className="p-6 text-center text-red-500 font-semibold">
        Blog post not found.
        <div className="mt-4">
          <Link
            to="/blog"
            className="text-blue-600 underline hover:text-blue-800"
          >
            ← Go back to Blog list
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Blog Title */}
      <h1 className="text-3xl font-bold text-blue-700 mb-2">{blog.title}</h1>

      {/* Author and Date */}
      <div className="text-sm text-gray-500 mb-4">
        By {blog.author} • {new Date(blog.date).toDateString()}
      </div>

      {/* Hero Image */}
      <img
        src={blog.image}
        alt={blog.title}
        className="w-full h-auto rounded-lg shadow-md mb-6"
      />

      {/* Blog Content */}
      <div className="text-gray-700 text-xl font-semibold leading- space-y-4 ">
        {/* If blog.fullText exists, use it. Otherwise, fallback to snippet */}
        {blog.fullText
          ? blog.fullText.split("\n").map((para, idx) => (
              <p key={idx}>{para}</p>
            ))
          : blog.snippet}
      </div>

      {/* Back Button */}
      <div className="mt-8">
        <Link
          to="/blog"
          className="inline-block text-sm text-white bg-blue-600 px-5 py-2 rounded hover:bg-blue-700 transition-all"
        >
          ← Back to Blog List
        </Link>
      </div>
    </div>
  );
}

export default BlogDetail;
