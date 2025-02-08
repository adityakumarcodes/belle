import getUser from '@/lib/getUser'
import getUserPosts from '@/lib/getUserPosts'
import React, { Suspense } from 'react'
import UserPosts from './components/UserPosts'
import type { Metadata } from 'next'
import getAllUsers from '@/lib/getAllUsers'
import Link from 'next/link'
import { notFound } from 'next/navigation'

type Params = {
    params: Promise<{ userId: string }>
}

//dynamic metadata
export async function generateMetadata({ params }: Params): Promise<Metadata> {
    const {userId}=await params
    const userData: Promise<User> = getUser(userId);//dedup recommendation3
    const user: User = await userData;

    if (!user.name) {
        return {
            title: 'User Not Found'
        }
    }

    return {
        title: user.name,
        description: `This is page of ${user.name}`
    }
}

export default async function UserPage({ params }: Params) {
    const {userId}=await params
    const userData: Promise<User> = getUser(userId);
    const userPostsData: Promise<Post[]> = getUserPosts(userId);

    // avoid waterfall by calling at the same time(recommandation2)
    // const [user, userPosts] = await Promise.all([userData, userPostsData]);

    //but more good to use Suspense to show loading data as we wait till all data is received(recommanded4)
    const user = await userData;

    if (!user.name) notFound()

    return (
        <div className='p-4'>
            <h1>{user.name} Page(3. SSG/SSR/ISR)</h1>
            <Link href='/users'><h4>Go to users</h4></Link>
            <br />
            <Suspense fallback={<h4>Loading...</h4>}>
                {/* <UserPosts posts={userPosts} /> */}
                <UserPosts promise={userPostsData} />
            </Suspense>
        </div>
    )
}


// npm run build tells if page is SSG,SSR or ISR
// npm run start tells to run this build
// below show all possible
// ○  (Static)   prerendered as static content
// ƒ  (Dynamic)  server-rendered on demand (SSR)
// ●  (SSG)      prerendered as static HTML (uses getStaticProps)

// nextjs will know what the params are going to be and statically generate pages in advance->SSG
// changes SSR to SSG
export async function generateStaticParams() {
    const usersData: Promise<User[]> = getAllUsers();
    const users = await usersData;

    return users.map(user => ({
        userId: user.id.toString()//params always need to be string
    }))
}


