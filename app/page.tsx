"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { RefreshCw, Plus, Info, DollarSign, Users, FileText, BarChart3, CheckCircle } from 'lucide-react'
import { LeadsList } from "@/components/leads-list"
import { SalesTracking } from "@/components/sales-tracking"
import { CommissionControl } from "@/components/commission-control"
import { DashboardAnalytics } from "@/components/dashboard-analytics"
import { NovoLeadModal } from "@/components/novo-lead-modal"

export type Lead = {
  id: string
  nomeEmpresa: string
  produtoMarketing?: string
  nicho: string
  dataHoraCompra?: string
  // horarioCompra removido
  valorPagoLead?: string
  tipoLead?: string // Mantido para compatibilidade, mas será "origemLead"
  faturamento?: string
  canal?: string
  nivelUrgencia?: string
  regiao?: string
  cidade?: string
  cnpj?: string
  nomeContato: string
  cargoContato?: string
  email: string
  emailCorporativo?: string
  telefone?: string
  sdr: string
  closer?: string
  arrematador?: string
  // tipoOferta removido
  produto?: string
  anuncios?: string
  status: string
  observacoes?: string
  dataUltimoContato?: string
  moti
