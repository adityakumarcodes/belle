export default function AboutLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <nav className="bg-cyan-400">About Layout</nav>
            <main>{children}</main>
        </>
    )
}
