import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET() {
  try {
    const barbers = await db.barber.findMany({
      orderBy: {
        name: 'asc'
      }
    })
    
    return NextResponse.json(barbers)
  } catch (error) {
    console.error('Error fetching barbers:', error)
    return NextResponse.json(
      { error: 'Failed to fetch barbers' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, phone, specialties } = body
    
    if (!name || !email) {
      return NextResponse.json(
        { error: 'Name and email are required' },
        { status: 400 }
      )
    }
    
    const barber = await db.barber.create({
      data: {
        name,
        email,
        phone,
        specialties
      }
    })
    
    return NextResponse.json(barber, { status: 201 })
  } catch (error) {
    console.error('Error creating barber:', error)
    return NextResponse.json(
      { error: 'Failed to create barber' },
      { status: 500 }
    )
  }
}