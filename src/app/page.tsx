'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Calendar, Clock, MapPin, Phone, Star, Check } from 'lucide-react'
import Link from 'next/link'

export default function Home() {
  const [selectedService, setSelectedService] = useState<string | null>(null)

  const services = [
    { id: '1', name: 'Corte Masculino', price: 'R$ 45', duration: '30min' },
    { id: '2', name: 'Barba Completa', price: 'R$ 35', duration: '20min' },
    { id: '3', name: 'Corte + Barba', price: 'R$ 70', duration: '50min' },
    { id: '4', name: 'Tratamento de Barba', price: 'R$ 40', duration: '25min' },
    { id: '5', name: 'Pigmentação', price: 'R$ 80', duration: '40min' },
    { id: '6', name: 'Platinado', price: 'R$ 120', duration: '90min' }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <header className="fixed top-0 w-full bg-slate-900/95 backdrop-blur-sm z-50 border-b border-slate-700">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-xl">W</span>
            </div>
            <span className="text-white font-bold text-xl">WOW Barber</span>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <a href="#services" className="text-gray-300 hover:text-white transition">Serviços</a>
            <a href="#about" className="text-gray-300 hover:text-white transition">Sobre</a>
            <a href="#contact" className="text-gray-300 hover:text-white transition">Contato</a>
            <Link href="/booking">
              <Button className="bg-amber-500 hover:bg-amber-600 text-white">
                Agendar Horário
              </Button>
            </Link>
            <Link href="/admin">
              <Button variant="outline" className="border-gray-600 text-white hover:bg-gray-800">
                Admin
              </Button>
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 pt-20">
        <div className="absolute inset-0">
          <img 
            src="/barber-shop.jpg" 
            alt="WOW Barber Shop" 
            className="w-full h-full object-cover opacity-30"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900"></div>
        <div className="relative z-10 text-center max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            Estilo que
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">
              {" "}Impressiona
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8">
            Transforme seu visual com os melhores profissionais da cidade
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/booking">
              <Button size="lg" className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white px-8 py-4 text-lg">
                Agendar Agora
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="border-gray-600 text-white hover:bg-gray-800 px-8 py-4 text-lg">
              Ver Serviços
            </Button>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">Nossos Serviços</h2>
            <p className="text-gray-300 text-lg">Escolha o serviço perfeito para você</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <Card 
                key={service.id} 
                className={`bg-slate-800 border-slate-700 hover:border-amber-500 transition-all cursor-pointer ${
                  selectedService === service.id ? 'ring-2 ring-amber-500' : ''
                }`}
                onClick={() => setSelectedService(service.id)}
              >
                <div className="relative h-48 overflow-hidden rounded-t-lg">
                  <img 
                    src={
                      index === 0 ? "/barber-working.jpg" :
                      index === 1 ? "/beard-trim.jpg" :
                      index === 2 ? "/luxury-barber.jpg" :
                      index === 3 ? "/barber-tools.jpg" :
                      index === 4 ? "/barber-shop.jpg" :
                      "/barber-facade.jpg"
                    } 
                    alt={service.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent"></div>
                </div>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-semibold text-white">{service.name}</h3>
                    <span className="text-2xl font-bold text-amber-500">{service.price}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-400">
                    <Clock className="w-4 h-4" />
                    <span>{service.duration}</span>
                  </div>
                  {selectedService === service.id && (
                    <div className="mt-4 p-3 bg-amber-500/10 rounded-lg border border-amber-500/30">
                      <p className="text-amber-400 text-sm">Serviço selecionado</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4 bg-slate-800/50">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">Sobre a WOW Barber</h2>
            <p className="text-gray-300 text-lg">Conheça nossa barbearia e nossos profissionais</p>
          </div>
          
          {/* Image Gallery */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
            <div className="relative aspect-square overflow-hidden rounded-lg">
              <img src="/barber-facade.jpg" alt="Fachada da WOW Barber" className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
            </div>
            <div className="relative aspect-square overflow-hidden rounded-lg">
              <img src="/barber-working.jpg" alt="Profissional trabalhando" className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
            </div>
            <div className="relative aspect-square overflow-hidden rounded-lg">
              <img src="/beard-trim.jpg" alt="Serviço de barba" className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
            </div>
            <div className="relative aspect-square overflow-hidden rounded-lg">
              <img src="/luxury-barber.jpg" alt="Ambiente luxuoso" className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-white mb-6">Nossa História</h2>
              <p className="text-gray-300 mb-6">
                Há mais de 10 anos transformando homens com cortes modernos e barbas impecáveis. 
                Nossa equipe é especializada em técnicas atualizadas e produtos premium.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-amber-500" />
                  <span className="text-gray-300">Profissionais especializados</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-amber-500" />
                  <span className="text-gray-300">Produtos de alta qualidade</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-amber-500" />
                  <span className="text-gray-300">Ambiente climatizado e confortável</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-amber-500" />
                  <span className="text-gray-300">Atendimento personalizado</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-amber-500/20 to-orange-600/20 rounded-2xl flex items-center justify-center">
                <div className="text-center">
                  <div className="flex justify-center mb-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="w-8 h-8 text-amber-500 fill-current" />
                    ))}
                  </div>
                  <p className="text-3xl font-bold text-white mb-2">4.9/5</p>
                  <p className="text-gray-300">Mais de 2.000 clientes satisfeitos</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-20 px-4 bg-slate-800/30">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">Nossa Galeria</h2>
            <p className="text-gray-300 text-lg">Conheça nosso espaço e nosso trabalho</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <div className="col-span-2 row-span-2 relative aspect-square overflow-hidden rounded-lg">
              <img src="/barber-shop.jpg" alt="Interior da barbearia" className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
            </div>
            <div className="relative aspect-square overflow-hidden rounded-lg">
              <img src="/barber-tools.jpg" alt="Ferramentas de barbear" className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
            </div>
            <div className="relative aspect-square overflow-hidden rounded-lg">
              <img src="/beard-trim.jpg" alt="Serviço de barba" className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
            </div>
            <div className="relative aspect-square overflow-hidden rounded-lg">
              <img src="/luxury-barber.jpg" alt="Ambiente luxuoso" className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
            </div>
            <div className="col-span-2 relative aspect-square overflow-hidden rounded-lg">
              <img src="/barber-facade.jpg" alt="Fachada da barbearia" className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">Visite Nossa Barbearia</h2>
            <p className="text-gray-300 text-lg">Estamos esperando por você!</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <Card className="bg-slate-800 border-slate-700 text-center">
              <CardContent className="p-6">
                <MapPin className="w-12 h-12 text-amber-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">Endereço</h3>
                <p className="text-gray-300">Av. Principal, 1234<br />Centro - São Paulo/SP</p>
              </CardContent>
            </Card>
            
            <Card className="bg-slate-800 border-slate-700 text-center">
              <CardContent className="p-6">
                <Phone className="w-12 h-12 text-amber-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">Telefone</h3>
                <p className="text-gray-300">(11) 98765-4321<br />Seg-Sex: 9h-20h | Sáb: 8h-18h</p>
              </CardContent>
            </Card>
            
            <Card className="bg-slate-800 border-slate-700 text-center">
              <CardContent className="p-6">
                <Calendar className="w-12 h-12 text-amber-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">Agendamento</h3>
                <p className="text-gray-300">Agende online 24/7<br />Confirmação imediata</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 border-t border-slate-700 py-8 px-4">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-8 h-8 bg-gradient-to-br from-amber-500 to-orange-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold">W</span>
            </div>
            <span className="text-white font-bold">WOW Barber</span>
          </div>
          <p className="text-gray-400">© 2024 WOW Barber. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  )
}