import Link from "next/link";
// rfc - keyboard shotcut
export default function AboutPage() {
  // throw new Error('Temporary error')
  return (
    <div className="p-4">
      <h1>About (1. Pages & Layouts)</h1>
        <ol className="space-y-3">
            <li className="flex items-start">
                <span className="text-xl font-medium text-gray-700">AI-powered content suggestions:</span>
                <span className="ml-2 text-gray-600">Integrate AI-driven content suggestions to help users discover new articles based on their interests.</span>
            </li>
            <li className="flex items-start">
                <span className="text-xl font-medium text-gray-700">Voice-activated search:</span>
                <span className="ml-2 text-gray-600">Implement voice-activated search to enable users to search for articles using voice commands.</span>
            </li>
            <li className="flex items-start">
                <span className="text-xl font-medium text-gray-700">Augmented Reality (AR) experiences:</span>
                <span className="ml-2 text-gray-600">Create immersive AR experiences to enhance user engagement and interaction with your content.</span>
            </li>
            <li className="flex items-start">
                <span className="text-xl font-medium text-gray-700">Virtual Reality (VR) storytelling:</span>
                <span className="ml-2 text-gray-600">Experiment with VR storytelling to create immersive and interactive experiences for your users.</span>
            </li>
            <li className="flex items-start">
                <span className="text-xl font-medium text-gray-700">Personalized content recommendations:</span>
                <span className="ml-2 text-gray-600">Use ML algo to offer personalized content recommendations based on users reading history and preferences.</span>
            </li>
            <li className="flex items-start">
                <span className="text-xl font-medium text-gray-700">Responsive design</span>
            </li>
            <li className="flex items-start">
                <span className="text-xl font-medium text-gray-700">Search functionality</span>
            </li>
            <li className="flex items-start">
                <span className="text-xl font-medium text-gray-700">Categories and tags</span>
            </li>
            <li className="flex items-start">
                <span className="text-xl font-medium text-gray-700">Commenting system</span>
            </li>
            <li className="flex items-start">
                <span className="text-xl font-medium text-gray-700">Social sharing buttons</span>
            </li>
            <li className="flex items-start">
                <span className="text-xl font-medium text-gray-700">Newsletter subscription</span>
            </li>
            <li className="flex items-start">
                <span className="text-xl font-medium text-gray-700">Contact form</span>
            </li>
            <li className="flex items-start">
                <span className="text-xl font-medium text-gray-700">Analytics integration</span>
            </li>
            <li className="flex items-start">
                <span className="text-xl font-medium text-gray-700">Blog post draft</span>
            </li>
            <li className="flex items-start">
                <span className="text-xl font-medium text-gray-700">Guest blogging:</span>
                <span className="ml-2 text-gray-600">Enable guest blogging to allow other authors to contribute to your blog.</span>
            </li>
            <li className="flex items-start">
                <span className="text-xl font-medium text-gray-700">Blog post formatting options:</span>
                <span className="ml-2 text-gray-600">Offer formatting options for blog posts, such as font styles, colors, and layouts.</span>
            </li>
            <li className="flex items-start">
                <span className="text-xl font-medium text-gray-700">Resume</span>
            </li>
        </ol>

      <Link href='/'><h6>Go to home</h6></Link>
    </div>
  )
}
