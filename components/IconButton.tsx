import Link from 'next/link'
import React from 'react'

interface IconButtonProps {
  title: string;
  icon: React.ElementType;
  href:string;
}

const IconButton: React.FC<IconButtonProps> = ({ title, icon: Icon ,href}) => (
  <Link href={href} className="flex items-start gap-1.5 group hover:bg-gray-200 rounded-md p-1.5 cursor-pointer">
    <Icon strokeWidth={1.25} />
    <p>{title}</p>
  </Link>
)

export default IconButton
