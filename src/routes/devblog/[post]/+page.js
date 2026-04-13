export const prerender = false;

/** @type {import('./$types.js').PageLoad} */
export async function load({ params }) {

  // Dynamically import all .svx files in the current directory 
  const allPosts = import.meta.glob('../posts/*.svx');
  // Extract import function for the specific post based on the slug
  const postImport = allPosts["../posts/"+params.post+".svx"];

  // Check if the post import function exists
  if (!postImport) {
    throw new Error("Post not found: "+params.post);
  }
  // Import the specific post 
  const post = await postImport();
  const { title, date ,effort,meme,} = post.metadata;
  const content = post.default;

  return {
    content,
    title,
    date,
    effort,
    meme,
  };
}
