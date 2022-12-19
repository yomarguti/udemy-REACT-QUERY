import { useQuery, useMutation } from 'react-query';

async function fetchComments(postId) {
  const response = await fetch(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`);
  return response.json();
}

async function deletePost(postId) {
  const response = await fetch(`https://jsonplaceholder.typicode.com/postId/${postId}`, { method: 'DELETE' });
  return response.json();
}

async function updatePost(postId) {
  const response = await fetch(`https://jsonplaceholder.typicode.com/postId/${postId}`, { method: 'PATCH', data: { title: 'REACT QUERY FOREVER!!!!' } });
  return response.json();
}

export function PostDetail({ post }) {
  // replace with useQuery
  const { data, isLoading, isError } = useQuery(['comments', post.id], () => fetchComments(post.id), {
    staleTime: 2000,
  });

  const deleteMutation = useMutation((postId) => deletePost(postId));
  const updateMutation = useMutation((postId) => updatePost(postId));

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error!</div>;

  return (
    <>
      <h3 style={{ color: 'blue' }}>{post.title}</h3>
      <button onClick={() => deleteMutation.mutate(post.id)}>Delete</button>
      {deleteMutation.isError && <div style={{ color: 'red' }}>Error deleting post</div>}
      {deleteMutation.isLoading && <div style={{ color: 'purple' }}>Deleting post...</div>}
      {deleteMutation.isSuccess && <div style={{ color: 'green' }}>Post deleted!</div>}
      <button onClick={() => updateMutation.mutate(post.id)}>Update title</button>
      {updateMutation.isError && <div style={{ color: 'red' }}>Error Updating post</div>}
      {updateMutation.isLoading && <div style={{ color: 'purple' }}>Updating post...</div>}
      {updateMutation.isSuccess && <div style={{ color: 'green' }}>Post updated!</div>}
      <p>{post.body}</p>
      <h4>Comments</h4>
      {data.map((comment) => (
        <li key={comment.id}>
          {comment.email}: {comment.body}
        </li>
      ))}
    </>
  );
}
