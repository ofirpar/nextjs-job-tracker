import { NextResponse } from 'next/server'

const mockOpportunities = [
  {
    id: '1',
    status: 'applied',
    company: {
      name: 'Tech Corp',
      location: 'Tel Aviv, Israel',
    },
    stack: ['React', 'Node.js', 'TypeScript'],
  },
  {
    id: '2',
    status: 'interviewing',
    company: {
      name: 'Startup Inc',
      location: 'Haifa, Israel',
    },
    stack: ['Vue.js', 'Python', 'Docker'],
  },
]

export async function GET() {
  // Simulate a delay
  await new Promise(resolve => setTimeout(resolve, 1000))

  // Simulate an occasional error
  if (Math.random() < 0.1) {
    return NextResponse.json({ error: 'Random error occurred' }, { status: 500 })
  }

  return NextResponse.json(mockOpportunities)
}

