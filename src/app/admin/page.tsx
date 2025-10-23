'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Calendar, Clock, User, Phone, Mail, CheckCircle, XCircle, AlertCircle, RefreshCw, Users, Scissors, CalendarDays } from 'lucide-react'
import Link from 'next/link'

interface Appointment {
  id: string
  clientName: string
  clientEmail: string
  clientPhone: string
  date: string
  status: string
  notes?: string
  service: {
    id: string
    name: string
    price: number
    duration: number
  }
  barber: {
    id: string
    name: string
    email: string
  }
}

interface Service {
  id: string
  name: string
  price: number
  duration: number
}

interface Barber {
  id: string
  name: string
  email: string
  phone?: string
}

export default function AdminPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [services, setServices] = useState<Service[]>([])
  const [barbers, setBarbers] = useState<Barber[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<'appointments' | 'services' | 'barbers'>('appointments')

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    setLoading(true)
    try {
      const [appointmentsRes, servicesRes, barbersRes] = await Promise.all([
        fetch('/api/appointments'),
        fetch('/api/services'),
        fetch('/api/barbers')
      ])

      if (appointmentsRes.ok) {
        const appointmentsData = await appointmentsRes.json()
        setAppointments(appointmentsData)
      }

      if (servicesRes.ok) {
        const servicesData = await servicesRes.json()
        setServices(servicesData)
      }

      if (barbersRes.ok) {
        const barbersData = await barbersRes.json()
        setBarbers(barbersData)
      }
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setLoading(false)
    }
  }

  const updateAppointmentStatus = async (appointmentId: string, status: string) => {
    try {
      const response = await fetch(`/api/appointments/${appointmentId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      })

      if (response.ok) {
        fetchData()
      } else {
        alert('Erro ao atualizar status do agendamento')
      }
    } catch (error) {
      console.error('Error updating appointment:', error)
      alert('Erro ao atualizar status do agendamento')
    }
  }

  const deleteAppointment = async (appointmentId: string) => {
    if (!confirm('Tem certeza que deseja excluir este agendamento?')) {
      return
    }

    try {
      const response = await fetch(`/api/appointments/${appointmentId}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        fetchData()
      } else {
        alert('Erro ao excluir agendamento')
      }
    } catch (error) {
      console.error('Error deleting appointment:', error)
      alert('Erro ao excluir agendamento')
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled':
        return 'bg-blue-500'
      case 'completed':
        return 'bg-green-500'
      case 'cancelled':
        return 'bg-red-500'
      default:
        return 'bg-gray-500'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'scheduled':
        return <AlertCircle className="w-4 h-4" />
      case 'completed':
        return <CheckCircle className="w-4 h-4" />
      case 'cancelled':
        return <XCircle className="w-4 h-4" />
      default:
        return <AlertCircle className="w-4 h-4" />
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'scheduled':
        return 'Agendado'
      case 'completed':
        return 'Concluído'
      case 'cancelled':
        return 'Cancelado'
      default:
        return status
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="w-8 h-8 text-amber-500 animate-spin mx-auto mb-4" />
          <p className="text-white">Carregando...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <header className="bg-slate-900/95 backdrop-blur-sm border-b border-slate-700">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-xl">W</span>
            </div>
            <span className="text-white font-bold text-xl">WOW Barber - Admin</span>
          </div>
          <Link href="/">
            <Button variant="outline" className="border-gray-600 text-white hover:bg-gray-800">
              Voltar para Site
            </Button>
          </Link>
        </div>
      </header>

      {/* Admin Content */}
      <section className="py-8 px-4">
        <div className="container mx-auto">
          {/* Stats Cards */}
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <Card className="bg-slate-800 border-slate-700">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Total Agendamentos</p>
                    <p className="text-2xl font-bold text-white">{appointments.length}</p>
                  </div>
                  <CalendarDays className="w-8 h-8 text-amber-500" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-800 border-slate-700">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Agendados</p>
                    <p className="text-2xl font-bold text-blue-400">
                      {appointments.filter(a => a.status === 'scheduled').length}
                    </p>
                  </div>
                  <AlertCircle className="w-8 h-8 text-blue-500" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-800 border-slate-700">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Concluídos</p>
                    <p className="text-2xl font-bold text-green-400">
                      {appointments.filter(a => a.status === 'completed').length}
                    </p>
                  </div>
                  <CheckCircle className="w-8 h-8 text-green-500" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-800 border-slate-700">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Profissionais</p>
                    <p className="text-2xl font-bold text-white">{barbers.length}</p>
                  </div>
                  <Users className="w-8 h-8 text-purple-500" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Tabs */}
          <div className="flex space-x-1 mb-6 bg-slate-800 p-1 rounded-lg">
            <button
              onClick={() => setActiveTab('appointments')}
              className={`flex-1 py-2 px-4 rounded-md transition ${
                activeTab === 'appointments'
                  ? 'bg-amber-500 text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Agendamentos
            </button>
            <button
              onClick={() => setActiveTab('services')}
              className={`flex-1 py-2 px-4 rounded-md transition ${
                activeTab === 'services'
                  ? 'bg-amber-500 text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Serviços
            </button>
            <button
              onClick={() => setActiveTab('barbers')}
              className={`flex-1 py-2 px-4 rounded-md transition ${
                activeTab === 'barbers'
                  ? 'bg-amber-500 text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Profissionais
            </button>
          </div>

          {/* Tab Content */}
          {activeTab === 'appointments' && (
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="text-white text-xl">Gerenciar Agendamentos</CardTitle>
                  <Button onClick={fetchData} variant="outline" className="border-gray-600 text-white hover:bg-gray-800">
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Atualizar
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {appointments.length === 0 ? (
                    <p className="text-gray-400 text-center py-8">Nenhum agendamento encontrado</p>
                  ) : (
                    appointments.map((appointment) => (
                      <div key={appointment.id} className="bg-slate-700 rounded-lg p-4 border border-slate-600">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h3 className="text-white font-semibold text-lg">{appointment.clientName}</h3>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge className={`${getStatusColor(appointment.status)} text-white flex items-center gap-1`}>
                                {getStatusIcon(appointment.status)}
                                {getStatusText(appointment.status)}
                              </Badge>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-amber-500 font-semibold">{appointment.service.name}</p>
                            <p className="text-gray-400">R$ {appointment.service.price.toFixed(2)}</p>
                          </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-4 mb-3">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2 text-gray-300">
                              <Mail className="w-4 h-4" />
                              <span className="text-sm">{appointment.clientEmail}</span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-300">
                              <Phone className="w-4 h-4" />
                              <span className="text-sm">{appointment.clientPhone}</span>
                            </div>
                          </div>
                          <div className="space-y-1">
                            <div className="flex items-center gap-2 text-gray-300">
                              <Calendar className="w-4 h-4" />
                              <span className="text-sm">{formatDate(appointment.date)}</span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-300">
                              <User className="w-4 h-4" />
                              <span className="text-sm">{appointment.barber.name}</span>
                            </div>
                          </div>
                        </div>

                        {appointment.notes && (
                          <div className="mb-3">
                            <p className="text-gray-400 text-sm">
                              <span className="font-semibold">Observações:</span> {appointment.notes}
                            </p>
                          </div>
                        )}

                        <div className="flex gap-2">
                          {appointment.status === 'scheduled' && (
                            <>
                              <Button
                                onClick={() => updateAppointmentStatus(appointment.id, 'completed')}
                                size="sm"
                                className="bg-green-500 hover:bg-green-600 text-white"
                              >
                                <CheckCircle className="w-4 h-4 mr-1" />
                                Concluir
                              </Button>
                              <Button
                                onClick={() => updateAppointmentStatus(appointment.id, 'cancelled')}
                                size="sm"
                                variant="outline"
                                className="border-red-500 text-red-400 hover:bg-red-500 hover:text-white"
                              >
                                <XCircle className="w-4 h-4 mr-1" />
                                Cancelar
                              </Button>
                            </>
                          )}
                          <Button
                            onClick={() => deleteAppointment(appointment.id)}
                            size="sm"
                            variant="outline"
                            className="border-gray-600 text-gray-400 hover:bg-red-500 hover:text-white hover:border-red-500"
                          >
                            Excluir
                          </Button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          {activeTab === 'services' && (
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white text-xl">Serviços Oferecidos</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {services.map((service) => (
                    <div key={service.id} className="bg-slate-700 rounded-lg p-4 border border-slate-600">
                      <h3 className="text-white font-semibold mb-2">{service.name}</h3>
                      <p className="text-amber-500 font-semibold mb-1">R$ {service.price.toFixed(2)}</p>
                      <p className="text-gray-400 text-sm">Duração: {service.duration} minutos</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {activeTab === 'barbers' && (
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white text-xl">Profissionais</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {barbers.map((barber) => (
                    <div key={barber.id} className="bg-slate-700 rounded-lg p-4 border border-slate-600">
                      <h3 className="text-white font-semibold mb-2">{barber.name}</h3>
                      <p className="text-gray-400 text-sm mb-1">{barber.email}</p>
                      {barber.phone && (
                        <p className="text-gray-400 text-sm">{barber.phone}</p>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </section>
    </div>
  )
}