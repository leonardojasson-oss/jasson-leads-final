"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { RefreshCw, Plus, Info, DollarSign, Users, FileText, BarChart3, CheckCircle, AlertCircle } from "lucide-react"
import { LeadsList } from "@/components/leads-list"
import { SalesTracking } from "@/components/sales-tracking"
import { CommissionControl } from "@/components/commission-control"
import { DashboardAnalytics } from "@/components/dashboard-analytics"
import { NovoLeadModal } from "@/components/novo-lead-modal"
import { leadOperations, isSupabaseConfigured } from "@/lib/supabase"

export type Lead = {
  id: string
  nome_empresa: string
  produto_marketing?: string
  nicho: string
  data_hora_compra?: string
  horario_compra?: string
  valor_pago_lead?: number
  tipo_lead?: string
  faturamento?: string
  canal?: string
  nivel_urgencia?: string
  regiao?: string
  cidade?: string
  cnpj?: string
  nome_contato: string
  cargo_contato?: string
  email: string
  email_corporativo?: string
  telefone?: string
  sdr: string
  closer?: string
  arrematador?: string
  tipo_oferta?: string
  produto?: string
  anuncios?: string
  status: string
  observacoes?: string
  data_ultimo_contato?: string
  motivo_perda_pv?: string
  tem_comentario_lbf?: boolean
  investimento_trafego?: string
  ticket_medio?: string
  qtd_lojas?: string
  qtd_vendedores?: string
  conseguiu_contato?: boolean
  reuniao_agendada?: boolean
  reuniao_realizada?: boolean
  valor_proposta?: number
  valor_venda?: number
  data_venda?: string
  data_fechamento?: string
  fee?: number
  escopo_fechado?: string
  fee_total?: number
  venda_via_jasson_co?: boolean
  comissao_sdr?: number
  comissao_closer?: number
  status_comissao?: string
  created_at?: string
  updated_at?: string
}

export default function LeadsControl() {
  const [activeTab, setActiveTab] = useState("lista")
  const [isNovoLeadModalOpen, setIsNovoLeadModalOpen] = useState(false)
  const [leads, setLeads] = useState<Lead[]>([])
  const [editingLead, setEditingLead] = useState<Lead | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false) // Adicione esta linha

  const tabs = [
    { id: "lista", label: "Lista de Leads", active: activeTab === "lista" },
    { id: "vendas", label: "Acompanhamento de Vendas", active: activeTab === "vendas" },
    { id: "comissoes", label: "Controle de Comissões", active: activeTab === "comissoes" },
    { id: "dashboard", label: "Dashboard & Analytics", active: activeTab === "dashboard" },
  ]

  // Load leads from Supabase or localStorage
  useEffect(() => {
    loadLeads()
  }, [])

  const loadLeads = async () => {
    try {
      setLoading(true)
      const data = await leadOperations.getAll()
      setLeads(data || [])
    } catch (error) {
      console.error("Error loading leads:", error)
      setLeads([])
    } finally {
      setLoading(false)
    }
  }

  const handleSaveLead = async (leadData: any) => {
    try {
      setSaving(true)
      console.log("🔄 Iniciando salvamento do lead:", leadData.nomeEmpresa)

      // Convert form field names to database field names
      const dbLeadData = {
        nome_empresa: leadData.nomeEmpresa,
        produto_marketing: leadData.produtoMarketing,
        nicho: leadData.nicho,
        data_hora_compra: leadData.dataHoraCompra,
        horario_compra: leadData.horarioCompra,
        valor_pago_lead: leadData.valorPagoLead ? Number(leadData.valorPagoLead) : undefined,
        tipo_lead: leadData.tipoLead,
        faturamento: leadData.faturamento,
        canal: leadData.canal,
        nivel_urgencia: leadData.nivelUrgencia,
        regiao: leadData.regiao,
        cidade: leadData.cidade,
        cnpj: leadData.cnpj,
        nome_contato: leadData.nomeContato,
        cargo_contato: leadData.cargoContato,
        email: leadData.email,
        email_corporativo: leadData.emailCorporativo,
        telefone: leadData.telefone,
        sdr: leadData.sdr,
        closer: leadData.closer,
        arrematador: leadData.arrematador,
        tipo_oferta: leadData.tipoOferta,
        produto: leadData.produto,
        anuncios: leadData.anuncios,
        status: leadData.status,
        observacoes: leadData.observacoes,
        data_ultimo_contato: leadData.dataUltimoContato,
        motivo_perda_pv: leadData.motivoPerdaPV,
        tem_comentario_lbf: leadData.temComentarioLBF,
        investimento_trafego: leadData.investimentoTrafego,
        ticket_medio: leadData.ticketMedio,
        qtd_lojas: leadData.qtdLojas,
        qtd_vendedores: leadData.qtdVendedores,
        conseguiu_contato: leadData.conseguiuContato,
        reuniao_agendada: leadData.reuniaoAgendada,
        reuniao_realizada: leadData.reuniaoRealizada,
        valor_proposta: leadData.valorProposta ? Number(leadData.valorProposta) : undefined,
        valor_venda: leadData.valorVenda ? Number(leadData.valorVenda) : undefined,
        data_venda: leadData.dataVenda,
        data_fechamento: leadData.dataFechamento,
        fee: leadData.fee ? Number(leadData.fee) : undefined,
        escopo_fechado: leadData.escopoFechado,
        fee_total: leadData.feeTotal ? Number(leadData.feeTotal) : undefined,
        venda_via_jasson_co: leadData.vendaViaJassonCo,
        comissao_sdr: leadData.comissaoSDR ? Number(leadData.comissaoSDR) : undefined,
        comissao_closer: leadData.comissaoCloser ? Number(leadData.comissaoCloser) : undefined,
        status_comissao: leadData.statusComissao,
      }

      console.log("📊 Dados convertidos para o banco:", dbLeadData)

      if (editingLead) {
        // Update existing lead
        console.log("✏️ Atualizando lead existente:", editingLead.id)
        await leadOperations.update(editingLead.id, dbLeadData)
        alert(`✅ Lead "${leadData.nomeEmpresa}" atualizado com sucesso!`)
        setEditingLead(null)
      } else {
        // Create new lead
        console.log("➕ Criando novo lead")
        const savedLead = await leadOperations.create(dbLeadData)
        console.log("✅ Lead criado com sucesso:", savedLead)
        alert(`✅ Lead "${leadData.nomeEmpresa}" salvo com sucesso!`)
      }

      // Reload leads
      console.log("🔄 Recarregando lista de leads...")
      await loadLeads()
      setIsNovoLeadModalOpen(false)
      console.log("✅ Processo de salvamento concluído!")
    } catch (error) {
      console.error("❌ Erro detalhado ao salvar lead:", error)
      alert(`❌ Erro ao salvar lead: ${error.message || "Erro desconhecido"}. Verifique o console para mais detalhes.`)
    } finally {
      setSaving(false)
    }
  }

  const handleEditLead = (lead: Lead) => {
    // Convert database field names to form field names
    const formLeadData = {
      nomeEmpresa: lead.nome_empresa,
      produtoMarketing: lead.produto_marketing,
      nicho: lead.nicho,
      dataHoraCompra: lead.data_hora_compra,
      horarioCompra: lead.horario_compra,
      valorPagoLead: lead.valor_pago_lead?.toString(),
      tipoLead: lead.tipo_lead,
      faturamento: lead.faturamento,
      canal: lead.canal,
      nivelUrgencia: lead.nivel_urgencia,
      regiao: lead.regiao,
      cidade: lead.cidade,
      cnpj: lead.cnpj,
      nomeContato: lead.nome_contato,
      cargoContato: lead.cargo_contato,
      email: lead.email,
      emailCorporativo: lead.email_corporativo,
      telefone: lead.telefone,
      sdr: lead.sdr,
      closer: lead.closer,
      arrematador: lead.arrematador,
      tipoOferta: lead.tipo_oferta,
      produto: lead.produto,
      anuncios: lead.anuncios,
      status: lead.status,
      observacoes: lead.observacoes,
      dataUltimoContato: lead.data_ultimo_contato,
      motivoPerdaPV: lead.motivo_perda_pv,
      temComentarioLBF: lead.tem_comentario_lbf,
      investimentoTrafego: lead.investimento_trafego,
      ticketMedio: lead.ticket_medio,
      qtdLojas: lead.qtd_lojas,
      qtdVendedores: lead.qtd_vendedores,
      conseguiuContato: lead.conseguiu_contato,
      reuniaoAgendada: lead.reuniao_agendada,
      reuniaoRealizada: lead.reuniao_realizada,
      valorProposta: lead.valor_proposta?.toString(),
      valorVenda: lead.valor_venda?.toString(),
      dataVenda: lead.data_venda,
      dataFechamento: lead.data_fechamento,
      fee: lead.fee?.toString(),
      escopoFechado: lead.escopo_fechado,
      feeTotal: lead.fee_total?.toString(),
      vendaViaJassonCo: lead.venda_via_jasson_co,
      comissaoSDR: lead.comissao_sdr?.toString(),
      comissaoCloser: lead.comissao_closer?.toString(),
      statusComissao: lead.status_comissao,
    }

    setEditingLead({ ...lead, ...formLeadData } as any)
    setIsNovoLeadModalOpen(true)
  }

  const handleDeleteLead = async (leadId: string) => {
    const leadToDelete = leads.find((lead) => lead.id === leadId)
    if (leadToDelete && confirm(`Tem certeza que deseja excluir o lead "${leadToDelete.nome_empresa}"?`)) {
      try {
        await leadOperations.delete(leadId)
        alert(`✅ Lead "${leadToDelete.nome_empresa}" excluído com sucesso!`)
        await loadLeads()
      } catch (error) {
        console.error("Error deleting lead:", error)
        alert("Erro ao excluir lead. Tente novamente.")
      }
    }
  }

  const handleCloseModal = () => {
    setIsNovoLeadModalOpen(false)
    setEditingLead(null)
  }

  // Calculate KPIs based on leads data and status
  const totalLeads = leads.length
  const totalInvestido = leads.reduce((sum, lead) => sum + (lead.valor_pago_lead || 0), 0)
  const leadsAtivos = leads.filter(
    (lead) => !["CONTRATO ASSINADO", "DROPADO", "PERDIDO", "DESQUALIFICADO"].includes(lead.status),
  ).length
  const totalVendas = leads.reduce((sum, lead) => sum + (lead.valor_venda || 0), 0)
  const totalPropostas = leads.reduce((sum, lead) => sum + (lead.valor_proposta || 0), 0)
  const roi = totalInvestido > 0 ? ((totalVendas - totalInvestido) / totalInvestido) * 100 : 0

  // Status-based metrics
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
      {/* Database Status Banner */}
      {!isSupabaseConfigured && (
        <div className="bg-yellow-50 border-b border-yellow-200 px-6 py-3">
          <div className="flex items-center space-x-2">
            <AlertCircle className="w-5 h-5 text-yellow-600" />
            <div className="flex-1">
              <p className="text-sm text-yellow-800">
                <strong>Modo Local:</strong> Os dados estão sendo salvos no navegador. Para persistência permanente,
                configure o Supabase após o deploy.
              </p>
            </div>
          </div>
        </div>
      )}

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
              <p className="text-sm text-gray-500">
                Sistema completo de gestão de leads e vendas
                {!isSupabaseConfigured && " (Modo Local)"}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Button
              variant="outline"
              className="flex items-center space-x-2 bg-transparent"
              onClick={loadLeads}
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

      {/* KPI Cards - Enhanced with status-based metrics */}
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
        saving={saving} // Adicione esta linha
      />
    </div>
  )
}
