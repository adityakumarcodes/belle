import Link from "next/link";
// rfc - keyboard shotcut
export default function AboutPage() {
  // throw new Error('Temporary error')
  return (
    <div className="p-4">
      <h1>About (1. Pages & Layouts)</h1>
      <Link href='/'><h2>Go to home</h2></Link>
    </div>
  )
}
