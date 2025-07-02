import BlogCard from "../components/BlogCard";
import blogData from "../Data/blogs";

function Blog() {
  return (
    <div className="p-6">
      <section className="text-center mb-8">
        <h1 className="text-3xl font-bold text-blue-600">Travel Stories & Tips 🗺️</h1>
        <p className="text-gray-600 mt-2">Inspiration and ideas from fellow travelers.</p>
      </section>

      <section className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        {blogData.map((post) => (
          <BlogCard
            key={post.id}
            id={post.id}
            title={post.title}
            image={post.image}
            author={post.author}
            date={post.date}
            snippet={post.snippet}
          />
        ))}
      </section>
    </div>
  );
}

export default Blog;
