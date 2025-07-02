import { Link } from "react-router-dom";

function BlogCard({ id, title, image, author, date, snippet }) {
  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden">
      <img
        src={image}
        alt={title}
        className="w-full h-48 object-cover"
      />

      <div className="p-4">
        <h3 className="text-lg font-bold text-gray-800 mb-1">{title}</h3>

        <div className="text-xs text-gray-500 mb-2">
          By {author} • {new Date(date).toDateString()}
        </div>

        <p className="text-sm text-gray-600 line-clamp-3 mb-3">{snippet}</p>

        <Link
          to={`/blog/${id}`}
          className="text-sm text-blue-600 hover:underline"
        >
          Read More →
        </Link>
      </div>
    </div>
  );
}

export default BlogCard;
