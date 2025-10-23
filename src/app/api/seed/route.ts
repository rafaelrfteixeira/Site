import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function POST() {
  try {
    // Create services
    const services = await Promise.all([
      db.service.create({
        data: {
          name: 'Corte Masculino',
          price: 45.00,
          duration: 30,
          description: 'Corte tradicional ou moderno com máquina e tesoura'
        }
      }),
      db.service.create({
        data: {
          name: 'Barba Completa',
          price: 35.00,
          duration: 20,
          description: 'Alinhamento, navalha e finalização'
        }
      }),
      db.service.create({
        data: {
          name: 'Corte + Barba',
          price: 70.00,
          duration: 50,
          description: 'Pacote completo com corte e barba'
        }
      }),
      db.service.create({
        data: {
          name: 'Tratamento de Barba',
          price: 40.00,
          duration: 25,
          description: 'Hidratação e modelagem da barba'
        }
      }),
      db.service.create({
        data: {
          name: 'Pigmentação',
          price: 80.00,
          duration: 40,
          description: 'Micropigmentação capilar'
        }
      }),
      db.service.create({
        data: {
          name: 'Platinado',
          price: 120.00,
          duration: 90,
          description: 'Descoloração completa e tratamento'
        }
      })
    ])

    // Create barbers
    const barbers = await Promise.all([
      db.barber.create({
        data: {
          name: 'João Silva',
          email: 'joao@wowbarber.com',
          phone: '(11) 98765-4321',
          specialties: 'Cortes modernos, barbas'
        }
      }),
      db.barber.create({
        data: {
          name: 'Pedro Santos',
          email: 'pedro@wowbarber.com',
          phone: '(11) 98765-4322',
          specialties: 'Cortes clássicos, tratamentos'
        }
      }),
      db.barber.create({
        data: {
          name: 'Carlos Oliveira',
          email: 'carlos@wowbarber.com',
          phone: '(11) 98765-4323',
          specialties: 'Pigmentação, platinado'
        }
      })
    ])

    return NextResponse.json({ 
      message: 'Database seeded successfully',
      services: services.length,
      barbers: barbers.length
    })
  } catch (error) {
    console.error('Error seeding database:', error)
    return NextResponse.json(
      { error: 'Failed to seed database' },
      { status: 500 }
    )
  }
}