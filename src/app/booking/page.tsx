'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Calendar, Clock, User, Phone, Mail, CheckCircle, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

interface Service {
  id: string
  name: string
  price: number
  duration: number
  description?: string
}

interface Barber {
  id: string
  name: string
  email: string
  phone?: string
  specialties?: string
}

export default function BookingPage() {
  const [services, setServices] = useState<Service[]>([])
  const [barbers, setBarbers] = useState<Barber[]>([])
  const [selectedService, setSelectedService] = useState<string>('')
  const [selectedBarber, setSelectedBarber] = useState<string>('')
  const [selectedDate, setSelectedDate] = useState<string>('')
  const [selectedTime, setSelectedTime] = useState<string>('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  
  const [formData, setFormData] = useState({
    clientName: '',
    clientEmail: '',
    clientPhone: '',
    notes: ''
  })

  const timeSlots = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
    '15:00', '15:30', '16:00', '16:30', '17:00', '17:30',
    '18:00', '18:30', '19:00', '19:30'
  ]

  useEffect(() => {
    fetchServices()
    fetchBarbers()
  }, [])

  const fetchServices = async () => {
    try {
      const response = await fetch('/api/services')
      if (response.ok) {
        const data = await response.json()
        setServices(data)
      }
    } catch (error) {
      console.error('Error fetching services:', error)
    }
  }

  const fetchBarbers = async () => {
    try {
      const response = await fetch('/api/barbers')
      if (response.ok) {
        const data = await response.json()
        setBarbers(data)
      }
    } catch (error) {
      console.error('Error fetching barbers:', error)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!selectedService || !selectedBarber || !selectedDate || !selectedTime) {
      alert('Por favor, preencha todos os campos obrigatórios')
      return
    }

    setIsSubmitting(true)

    try {
      const appointmentData = {
        clientName: formData.clientName,
        clientEmail: formData.clientEmail,
        clientPhone: formData.clientPhone,
        date: `${selectedDate}T${selectedTime}:00`,
        serviceId: selectedService,
        barberId: selectedBarber,
        notes: formData.notes
      }

      const response = await fetch('/api/appointments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(appointmentData),
      })

      if (response.ok) {
        setIsSuccess(true)
      } else {
        const error = await response.json()
        alert(error.error || 'Erro ao agendar. Tente novamente.')
      }
    } catch (error) {
      console.error('Error creating appointment:', error)
      alert('Erro ao agendar. Tente novamente.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center px-4">
        <Card className="w-full max-w-md bg-slate-800 border-slate-700">
          <CardContent className="p-8 text-center">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-white mb-2">Agendamento Confirmado!</h2>
            <p className="text-gray-300 mb-6">
              Seu agendamento foi realizado com sucesso. Enviaremos um e-mail de confirmação em breve.
            </p>
            <Link href="/">
              <Button className="w-full bg-amber-500 hover:bg-amber-600 text-white">
                Voltar para Início
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <header className="bg-slate-900/95 backdrop-blur-sm border-b border-slate-700">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-xl">W</span>
            </div>
            <span className="text-white font-bold text-xl">WOW Barber</span>
          </Link>
          <Link href="/">
            <Button variant="outline" className="border-gray-600 text-white hover:bg-gray-800">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar
            </Button>
          </Link>
        </div>
      </header>

      {/* Booking Form */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Form Section */}
            <div>
              <div className="text-center mb-8">
                <h1 className="text-4xl font-bold text-white mb-4">Agende seu Horário</h1>
                <p className="text-gray-300 text-lg">Escolha o serviço, profissional e horário preferidos</p>
              </div>

              <Card className="bg-slate-800 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white text-2xl">Formulário de Agendamento</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Client Information */}
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="clientName" className="text-gray-300 flex items-center gap-2">
                          <User className="w-4 h-4" />
                          Nome Completo *
                        </Label>
                        <Input
                          id="clientName"
                          type="text"
                          value={formData.clientName}
                          onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                          className="bg-slate-700 border-slate-600 text-white"
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="clientEmail" className="text-gray-300 flex items-center gap-2">
                          <Mail className="w-4 h-4" />
                          E-mail *
                        </Label>
                        <Input
                          id="clientEmail"
                          type="email"
                          value={formData.clientEmail}
                          onChange={(e) => setFormData({ ...formData, clientEmail: e.target.value })}
                          className="bg-slate-700 border-slate-600 text-white"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="clientPhone" className="text-gray-300 flex items-center gap-2">
                        <Phone className="w-4 h-4" />
                        Telefone *
                      </Label>
                      <Input
                        id="clientPhone"
                        type="tel"
                        value={formData.clientPhone}
                        onChange={(e) => setFormData({ ...formData, clientPhone: e.target.value })}
                        className="bg-slate-700 border-slate-600 text-white"
                        required
                      />
                    </div>

                    {/* Service Selection */}
                    <div className="space-y-2">
                      <Label className="text-gray-300">Serviço *</Label>
                      <Select value={selectedService} onValueChange={setSelectedService}>
                        <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                          <SelectValue placeholder="Selecione um serviço" />
                        </SelectTrigger>
                        <SelectContent className="bg-slate-700 border-slate-600">
                          {services.map((service) => (
                            <SelectItem key={service.id} value={service.id} className="text-white">
                              {service.name} - R$ {service.price.toFixed(2)} ({service.duration}min)
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Barber Selection */}
                    <div className="space-y-2">
                      <Label className="text-gray-300">Profissional *</Label>
                      <Select value={selectedBarber} onValueChange={setSelectedBarber}>
                        <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                          <SelectValue placeholder="Selecione um profissional" />
                        </SelectTrigger>
                        <SelectContent className="bg-slate-700 border-slate-600">
                          {barbers.map((barber) => (
                            <SelectItem key={barber.id} value={barber.id} className="text-white">
                              {barber.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Date and Time Selection */}
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="date" className="text-gray-300 flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          Data *
                        </Label>
                        <Input
                          id="date"
                          type="date"
                          value={selectedDate}
                          onChange={(e) => setSelectedDate(e.target.value)}
                          min={new Date().toISOString().split('T')[0]}
                          className="bg-slate-700 border-slate-600 text-white"
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label className="text-gray-300 flex items-center gap-2">
                          <Clock className="w-4 h-4" />
                          Horário *
                        </Label>
                        <Select value={selectedTime} onValueChange={setSelectedTime}>
                          <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                            <SelectValue placeholder="Selecione um horário" />
                          </SelectTrigger>
                          <SelectContent className="bg-slate-700 border-slate-600 max-h-60 overflow-y-auto">
                            {timeSlots.map((time) => (
                              <SelectItem key={time} value={time} className="text-white">
                                {time}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {/* Notes */}
                    <div className="space-y-2">
                      <Label htmlFor="notes" className="text-gray-300">Observações</Label>
                      <Textarea
                        id="notes"
                        value={formData.notes}
                        onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                        className="bg-slate-700 border-slate-600 text-white"
                        rows={3}
                        placeholder="Alguma informação adicional que gostaria de compartilhar?"
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white py-3 text-lg"
                    >
                      {isSubmitting ? 'Agendando...' : 'Confirmar Agendamento'}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Image Section */}
            <div className="space-y-6">
              <div className="relative aspect-square overflow-hidden rounded-2xl">
                <img 
                  src="/barber-working.jpg" 
                  alt="Profissional da WOW Barber" 
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6">
                  <h3 className="text-2xl font-bold text-white mb-2">Profissionais Qualificados</h3>
                  <p className="text-gray-300">Nossa equipe é formada por especialistas em cortes modernos e barbas impecáveis</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="relative aspect-square overflow-hidden rounded-xl">
                  <img 
                    src="/barber-tools.jpg" 
                    alt="Ferramentas profissionais" 
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="relative aspect-square overflow-hidden rounded-xl">
                  <img 
                    src="/luxury-barber.jpg" 
                    alt="Ambiente premium" 
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}