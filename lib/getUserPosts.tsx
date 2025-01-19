export default async function getUserPosts(userId: string) {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`, { next: { revalidate: 60 } });
  if (!res.ok) return {}//throw new Error('failed to fetch user')
  return res.json()
}

// fetch second parameter
// { cache: 'force-cache' } default
// request should be cached until manually invalidated

// { cache: 'no-store' }
// request should be refetched on every request

// {next: { revalidate: 10 }}
// request should be cached with a lifetime of 10 seconds
// ISR
// works in both SSG and SSR pages