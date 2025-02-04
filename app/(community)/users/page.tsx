import getAllUsers from '@/lib/getAllUsers'
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Users'
}

export default async function UsersPage() {
    const usersData: Promise<User[]> = getAllUsers();//types.d.ts file has all the types
    const users = await usersData;
    const content = (
        <section className='p-4'>
            <h1>Users (2. Fetching Data)</h1>
            <Link href='/'><h2>Go to Home</h2></Link>
            <br />
            {users.map(user => {
                return (
                    <p key={user.id}>
                        <Link href={`/users/${user.id}`}>{user.id}. {user.name}</Link>
                        <br />
                    </p>
                )
            })}
        </section>
    )
    return content;
}
