import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET() {
  try {
    const appointments = await db.appointment.findMany({
      include: {
        service: true,
        barber: true
      },
      orderBy: {
        date: 'desc'
      }
    })
    
    return NextResponse.json(appointments)
  } catch (error) {
    console.error('Error fetching appointments:', error)
    return NextResponse.json(
      { error: 'Failed to fetch appointments' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { clientName, clientEmail, clientPhone, date, serviceId, barberId, notes } = body
    
    if (!clientName || !clientEmail || !clientPhone || !date || !serviceId || !barberId) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      )
    }
    
    const appointment = await db.appointment.create({
      data: {
        clientName,
        clientEmail,
        clientPhone,
        date: new Date(date),
        serviceId,
        barberId,
        notes
      },
      include: {
        service: true,
        barber: true
      }
    })
    
    return NextResponse.json(appointment, { status: 201 })
  } catch (error) {
    console.error('Error creating appointment:', error)
    return NextResponse.json(
      { error: 'Failed to create appointment' },
      { status: 500 }
    )
  }
}