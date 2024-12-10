'use client'

import Image from 'next/image'

interface TestimonialCardProps {
  content: string
  author: {
    name: string
    avatar: string
    title: string
  }
  stats?: {
    label: string
    value: string
  }[]
}

const TestimonialCard = ({ content, author, stats }: TestimonialCardProps) => {
  return (
    <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6">
      <div className="flex items-start gap-4 mb-4">
        <Image
          src={author.avatar}
          alt={author.name}
          width={48}
          height={48}
          className="rounded-full"
        />
        <div>
          <h4 className="font-semibold">{author.name}</h4>
          <p className="text-sm text-gray-400">{author.title}</p>
        </div>
      </div>
      <p className="text-gray-300 mb-6">{content}</p>
      {stats && (
        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-700">
          {stats.map((stat, index) => (
            <div key={index}>
              <p className="text-2xl font-bold">{stat.value}</p>
              <p className="text-sm text-gray-400">{stat.label}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default TestimonialCard 