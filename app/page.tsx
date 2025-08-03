"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { RefreshCw, Plus, Info, DollarSign, Users, FileText, BarChart3, CheckCircle } from "lucide-react"
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
  horarioCompra?: string
  valorPagoLead?: string
  tipoLead?: string
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
  tipoOferta?: string
  produto?: string
  anuncios?: string
  status: string
  observacoes?: string
  dataUltimoContato?: string
  motivoPerdaPV?: string
  temComentarioLBF?: boolean
  investimentoTrafego?: string
  ticketMedio?: string
  qtdLojas?: string
  qtdVendedores?: string
  conseguiuContato?: boolean
  reuniaoAgendada?: boolean
  reuniaoRealizada?: boolean
  valorProposta?: string
  valorVenda?: string
  dataVenda?: string
  dataFechamento?: string
  fee?: string
  escopoFechado?: string
  feeTotal?: string
  vendaViaJassonCo?: boolean
  comissaoSDR?: string
  comissaoCloser?: string
  statusComissao?: string
  created_at?: string
  updated_at?: string
}

// Simple localStorage operations
const LOCAL_STORAGE_KEY = "jasson-leads-data"

const saveToLocalStorage = (leads: Lead[]) => {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(leads))
    console.log("✅ Dados salvos no localStorage:", leads.length, "leads")
  } catch (error) {
    console.error("❌ Erro ao salvar no localStorage:", error)
  }
}

const loadFromLocalStorage = (): Lead[] => {
  try {
    const data = localStorage.getItem(LOCAL_STORAGE_KEY)
    const leads = data ? JSON.parse(data) : []
    console.log("📱 Dados carregados do localStorage:", leads.length, "leads")
    return leads
  } catch (error) {
    console.error("❌ Erro ao carregar do localStorage:", error)
    return []
  }
}

export default function LeadsControl() {
  const [activeTab, setActiveTab] = useState("lista")
  const [isNovoLeadModalOpen, setIsNovoLeadModalOpen] = useState(false)
  const [leads, setLeads] = useState<Lead[]>([])
  const [editingLead, setEditingLead] = useState<Lead | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  const tabs = [
    { id: "lista", label: "Lista de Leads", active: activeTab === "lista" },
    { id: "vendas", label: "Acompanhamento de Vendas", active: activeTab === "vendas" },
    { id: "comissoes", label: "Controle de Comissões", active: activeTab === "comissoes" },
    { id: "dashboard", label: "Dashboard & Analytics", active: activeTab === "dashboard" },
  ]

  // Load leads on component mount
  useEffect(() => {
    console.log("🔄 Carregando leads...")
    try {
      const savedLeads = loadFromLocalStorage()
      setLeads(savedLeads)
      console.log("✅ Leads carregados:", savedLeads.length)
    } catch (error) {
      console.error("❌ Erro ao carregar leads:", error)
      setLeads([])
    } finally {
      setLoading(false)
    }
  }, [])

  const handleSaveLead = async (leadData: any) => {
    console.log("🔄 === SALVANDO LEAD ===")
    console.log("📊 Dados recebidos:", leadData)

    try {
      setSaving(true)

      // Create new lead object
      const newLead: Lead = {
        id: editingLead ? editingLead.id : Date.now().toString(),
        nomeEmpresa: leadData.nomeEmpresa,
        produtoMarketing: leadData.produtoMarketing,
        nicho: leadData.nicho,
        dataHoraCompra: leadData.dataHoraCompra,
        horarioCompra: leadData.horarioCompra,
        valorPagoLead: leadData.valorPagoLead,
        tipoLead: leadData.tipoLead,
        faturamento: leadData.faturamento,
        canal: leadData.canal,
        nivelUrgencia: leadData.nivelUrgencia,
        regiao: leadData.regiao,
        cidade: leadData.cidade,
        cnpj: leadData.cnpj,
        nomeContato: leadData.nomeContato,
        cargoContato: leadData.cargoContato,
        email: leadData.email,
        emailCorporativo: leadData.emailCorporativo,
        telefone: leadData.telefone,
        sdr: leadData.sdr,
        closer: leadData.closer,
        arrematador: leadData.arrematador,
        tipoOferta: leadData.tipoOferta,
        produto: leadData.produto,
        anuncios: leadData.anuncios,
        status: leadData.status,
        observacoes: leadData.observacoes,
        dataUltimoContato: leadData.dataUltimoContato,
        motivoPerdaPV: leadData.motivoPerdaPV,
        temComentarioLBF: leadData.temComentarioLBF,
        investimentoTrafego: leadData.investimentoTrafego,
        ticketMedio: leadData.ticketMedio,
        qtdLojas: leadData.qtdLojas,
        qtdVendedores: leadData.qtdVendedores,
        conseguiuContato: leadData.conseguiuContato,
        reuniaoAgendada: leadData.reuniaoAgendada,
        reuniaoRealizada: leadData.reuniaoRealizada,
        valorProposta: leadData.valorProposta,
        valorVenda: leadData.valorVenda,
        dataVenda: leadData.dataVenda,
        dataFechamento: leadData.dataFechamento,
        fee: leadData.fee,
        escopoFechado: leadData.escopoFechado,
        feeTotal: leadData.feeTotal,
        vendaViaJassonCo: leadData.vendaViaJassonCo,
        comissaoSDR: leadData.comissaoSDR,
        comissaoCloser: leadData.comissaoCloser,
        statusComissao: leadData.statusComissao,
        created_at: editingLead ? editingLead.created_at : new Date().toISOString(),
        updated_at: new Date().toISOString(),
      }

      console.log("📝 Lead processado:", newLead)

      let updatedLeads: Lead[]

      if (editingLead) {
        // Update existing lead
        updatedLeads = leads.map((lead) => (lead.id === editingLead.id ? newLead : lead))
        console.log("✏️ Lead atualizado:", newLead.id)
      } else {
        // Add new lead
        updatedLeads = [newLead, ...leads]
        console.log("➕ Novo lead adicionado:", newLead.id)
      }

      // Save to localStorage
      saveToLocalStorage(updatedLeads)
      setLeads(updatedLeads)

      // Success message
      alert(`✅ Lead "${leadData.nomeEmpresa}" ${editingLead ? "atualizado" : "salvo"} com sucesso!`)

      // Close modal and reset
      setIsNovoLeadModalOpen(false)
      setEditingLead(null)

      console.log("✅ Salvamento concluído com sucesso!")
    } catch (error) {
      console.error("❌ Erro ao salvar lead:", error)
      alert(`❌ Erro ao salvar lead: ${error.message}`)
    } finally {
      setSaving(false)
    }
  }

  const handleEditLead = (lead: Lead) => {
    console.log("✏️ Editando lead:", lead.nomeEmpresa)
    setEditingLead(lead)
    setIsNovoLeadModalOpen(true)
  }

  const handleDeleteLead = (leadId: string) => {
    const leadToDelete = leads.find((lead) => lead.id === leadId)
    if (leadToDelete && confirm(`Tem certeza que deseja excluir o lead "${leadToDelete.nomeEmpresa}"?`)) {
      try {
        const updatedLeads = leads.filter((lead) => lead.id !== leadId)
        saveToLocalStorage(updatedLeads)
        setLeads(updatedLeads)
        alert(`✅ Lead "${leadToDelete.nomeEmpresa}" excluído com sucesso!`)
        console.log("🗑️ Lead excluído:", leadId)
      } catch (error) {
        console.error("❌ Erro ao excluir lead:", error)
        alert("❌ Erro ao excluir lead. Tente novamente.")
      }
    }
  }

  const handleCloseModal = () => {
    setIsNovoLeadModalOpen(false)
    setEditingLead(null)
  }

  const handleRefresh = () => {
    console.log("🔄 Atualizando dados...")
    try {
      const savedLeads = loadFromLocalStorage()
      setLeads(savedLeads)
      console.log("✅ Dados atualizados:", savedLeads.length, "leads")
    } catch (error) {
      console.error("❌ Erro ao atualizar:", error)
    }
  }

  // Calculate KPIs
  const totalLeads = leads.length
  const totalInvestido = leads.reduce((sum, lead) => {
    const valor = Number.parseFloat(lead.valorPagoLead || "0")
    return sum + (isNaN(valor) ? 0 : valor)
  }, 0)
  const leadsAtivos = leads.filter(
    (lead) => !["CONTRATO ASSINADO", "DROPADO", "PERDIDO", "DESQUALIFICADO"].includes(lead.status),
  ).length
  const totalVendas = leads.reduce((sum, lead) => {
    const valor = Number.parseFloat(lead.valorVenda || "0")
    return sum + (isNaN(valor) ? 0 : valor)
  }, 0)

  const contratoAssinado = leads.filter((lead) => lead.status === "CONTRATO ASSINADO").length
  const followInfinito = leads.filter((lead) => lead.status === "FOLLOW INFINITO").length
  const tentandoContato = leads.filter((lead) => lead.status === "TENTANDO CONTATO").length

  const renderContent = () => {
    if (loading) {
      return (
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-4 text-gray-400" />
            <p className="text-gray-500">Carregando leads...</p>
          </div>
        </div>
      )
    }

    switch (activeTab) {
      case "lista":
        return <LeadsList leads={leads} onEditLead={handleEditLead} onDeleteLead={handleDeleteLead} />
      case "vendas":
        return <SalesTracking leads={leads} />
      case "comissoes":
        return <CommissionControl leads={leads} />
      case "dashboard":
        return <DashboardAnalytics leads={leads} />
      default:
        return <LeadsList leads={leads} onEditLead={handleEditLead} onDeleteLead={handleDeleteLead} />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Status Banner */}
      <div className="bg-blue-50 border-b border-blue-200 px-6 py-3">
        <div className="flex items-center space-x-2">
          <Info className="w-5 h-5 text-blue-600" />
          <div className="flex-1">
            <p className="text-sm text-blue-800">
              <strong>Modo Simplificado:</strong> Os dados estão sendo salvos no navegador (localStorage). Sistema
              funcionando perfeitamente!
            </p>
          </div>
        </div>
      </div>

      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-red-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">JO</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Controle de Leads</h1>
              <p className="text-sm text-red-600 font-medium">Jasson Oliveira & Co</p>
              <p className="text-sm text-gray-500">Sistema completo de gestão de leads e vendas</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Button
              variant="outline"
              className="flex items-center space-x-2 bg-transparent"
              onClick={handleRefresh}
              disabled={loading}
            >
              <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
              <span>Atualizar</span>
            </Button>
            <Button
              className="bg-red-600 hover:bg-red-700 flex items-center space-x-2"
              onClick={() => setIsNovoLeadModalOpen(true)}
            >
              <Plus className="w-4 h-4" />
              <span>Novo Lead</span>
            </Button>
          </div>
        </div>
      </header>

      {/* KPI Cards */}
      <div className="px-6 py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 mb-6">
          <Card className="border-l-4 border-l-red-500">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 flex items-center">
                    <Info className="w-4 h-4 mr-1" />
                    Total Leads
                  </p>
                  <p className="text-2xl font-bold text-gray-900">{totalLeads}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-green-500">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 flex items-center">
                    <CheckCircle className="w-4 h-4 mr-1" />
                    Contratos Assinados
                  </p>
                  <p className="text-2xl font-bold text-gray-900">{contratoAssinado}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-blue-500">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 flex items-center">
                    <Users className="w-4 h-4 mr-1" />
                    Leads Ativos
                  </p>
                  <p className="text-2xl font-bold text-gray-900">{leadsAtivos}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-purple-500">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 flex items-center">
                    <DollarSign className="w-4 h-4 mr-1" />
                    Total Vendas
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    R$ {totalVendas.toLocaleString("pt-BR", { minimumFractionDigits: 0 })}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-orange-500">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 flex items-center">
                    <FileText className="w-4 h-4 mr-1" />
                    Follow Infinito
                  </p>
                  <p className="text-2xl font-bold text-gray-900">{followInfinito}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-yellow-500">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 flex items-center">
                    <BarChart3 className="w-4 h-4 mr-1" />
                    Tentando Contato
                  </p>
                  <p className="text-2xl font-bold text-gray-900">{tentandoContato}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Navigation Tabs */}
        <div className="flex space-x-1 mb-6">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                tab.active ? "bg-red-600 text-white" : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        {renderContent()}
      </div>

      {/* Novo Lead Modal */}
      <NovoLeadModal
        isOpen={isNovoLeadModalOpen}
        onClose={handleCloseModal}
        onSave={handleSaveLead}
        editingLead={editingLead}
        saving={saving}
      />
    </div>
  )
}
