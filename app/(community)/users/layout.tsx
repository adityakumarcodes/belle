export default function UserLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <nav className="bg-cyan-400">Users Layout</nav>
            <main>{children}</main>
        </>
    )
}
