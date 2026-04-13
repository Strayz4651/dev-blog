export async function load() {
	const modules = import.meta.glob('./posts/*.svx');
	const posts = await Promise.all(
		Object.entries(modules).map(async ([path, resolver]) => {
			const { metadata } = await resolver();
			const name = path.split('/').pop().replace('.svx', '');
			return { name, ...metadata };
		})
	);
	posts.sort((a, b) => new Date(a.date) - new Date(b.date));
	return { posts };
}
