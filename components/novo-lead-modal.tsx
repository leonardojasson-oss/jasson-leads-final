"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { X, RefreshCw, Sparkles, Copy } from 'lucide-react'
import type { Lead } from "@/app/page"

interface NovoLeadModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (leadData: any) => void
  editingLead?: Lead | null
  saving?: boolean
}

export function NovoLeadModal({ isOpen, onClose, onSave, editingLead, saving = false }: NovoLeadModalProps) {
  const [formData, setFormData] = useState({
    nomeEmpresa: "",
    produtoMarketing: "",
    nicho: "",
    dataHoraCompra: "",
    valorPagoLead: "",
    origemLead: "", // Mudança: era "tipoLead"
    faturamento: "",
    canal: "",
    nivelUrgencia: "",
    regiao: "",
    cidade: "",
    cnpj: "",
    nomeContato: "",
    cargoContato: "",
    email: "",
    emailCorporativo: "",
    telefone: "",
    sdr: "",
    closer: "",
    arrematador: "", // Agora obrigatório
    produto: "",
    anuncios: "",
    status: "", // Agora opcional
    observacoes: "",
    dataUltimoContato: "",
    motivoPerdaPV: "",
    temComentarioLBF: false,
    investimentoTrafego: "",
    ticketMedio: "",
    qtdLojas: "",
    qtdVendedores: "",
    conseguiuContato: false,
    reuniaoAgendada: false,
    reuniaoRealizada: false,
    valorProposta: "",
    valorVenda: "",
    dataVenda: "",
    dataFechamento: "",
    fee: "",
    escopoFechado: "",
    feeTotal: "",
    vendaViaJassonCo: false,
    comissaoSDR: "",
    comissaoCloser: "",
    statusComissao: "",
  })

  const [autoFillData, setAutoFillData] = useState("")

  // Reset form when modal opens/closes
  useEffect(() => {
    if (!isOpen) {
      // Reset form when closing
      setFormData({
        nomeEmpresa: "",
        produtoMarketing: "",
        nicho: "",
        dataHoraCompra: "",
        valorPagoLead: "",
        origemLead: "",
        faturamento: "",
        canal: "",
        nivelUrgencia: "",
        regiao: "",
        cidade: "",
        cnpj: "",
        nomeContato: "",
        cargoContato: "",
        email: "",
        emailCorporativo: "",
        telefone: "",
        sdr: "",
        closer: "",
        arrematador: "",
        produto: "",
        anuncios: "",
        status: "",
        observacoes: "",
        dataUltimoContato: "",
        motivoPerdaPV: "",
        temComentarioLBF: false,
        investimentoTrafego: "",
        ticketMedio: "",
        qtdLojas: "",
        qtdVendedores: "",
        conseguiuContato: false,
        reuniaoAgendada: false,
        reuniaoRealizada: false,
        valorProposta: "",
        valorVenda: "",
        dataVenda: "",
        dataFechamento: "",
        fee: "",
        escopoFechado: "",
        feeTotal: "",
        vendaViaJassonCo: false,
        comissaoSDR: "",
        comissaoCloser: "",
        statusComissao: "",
      })
      setAutoFillData("")
    }

    if (editingLead && isOpen) {
      // Load editing data
      setFormData({
        nomeEmpresa: editingLead.nomeEmpresa || "",
        produtoMarketing: editingLead.produtoMarketing || "",
        nicho: editingLead.nicho || "",
        dataHoraCompra: editingLead.dataHoraCompra || "",
        valorPagoLead: editingLead.valorPagoLead || "",
        origemLead: editingLead.tipoLead || "", // Compatibilidade
        faturamento: editingLead.faturamento || "",
        canal: editingLead.canal || "",
        nivelUrgencia: editingLead.nivelUrgencia || "",
        regiao: editingLead.regiao || "",
        cidade: editingLead.cidade || "",
        cnpj: editingLead.cnpj || "",
        nomeContato: editingLead.nomeContato || "",
        cargoContato: editingLead.cargoContato || "",
        email: editingLead.email || "",
        emailCorporativo: editingLead.emailCorporativo || "",
        telefone: editingLead.telefone || "",
        sdr: editingLead.sdr || "",
        closer: editingLead.closer || "",
        arrematador: editingLead.arrematador || "",
        produto: editingLead.produto || "",
        anuncios: editingLead.anuncios || "",
        status: editingLead.status || "",
        observacoes: editingLead.observacoes || "",
        dataUltimoContato: editingLead.dataUltimoContato || "",
        motivoPerdaPV: editingLead.motivoPerdaPV || "",
        temComentarioLBF: editingLead.temComentarioLBF || false,
        investimentoTrafego: editingLead.investimentoTrafego || "",
        ticketMedio: editingLead.ticketMedio || "",
        qtdLojas: editingLead.qtdLojas || "",
        qtdVendedores: editingLead.qtdVendedores || "",
        conseguiuContato: editingLead.conseguiuContato || false,
        reuniaoAgendada: editingLead.reuniaoAgendada || false,
        reuniaoRealizada: editingLead.reuniaoRealizada || false,
        valorProposta: editingLead.valorProposta || "",
        valorVenda: editingLead.valorVenda || "",
        dataVenda: editingLead.dataVenda || "",
        dataFechamento: editingLead.dataFechamento || "",
        fee: editingLead.fee || "",
        escopoFechado: editingLead.escopoFechado || "",
        feeTotal: editingLead.feeTotal || "",
        vendaViaJassonCo: editingLead.vendaViaJassonCo || false,
        comissaoSDR: editingLead.comissaoSDR || "",
        comissaoCloser: editingLead.comissaoCloser || "",
        statusComissao: editingLead.statusComissao || "",
      })
    }
  }, [editingLead, isOpen])

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  // Auto-fill parser function (MELHORADO)
  const parseAutoFillData = (data: string) => {
    console.log("🔄 Parsing auto-fill data:", data)
    
    const lines = data.split('\n').map(line => line.trim()).filter(line => line)
    const parsed: any = {}

    for (const line of lines) {
      const lowerLine = line.toLowerCase()
      
      // Company name patterns
      if (lowerLine.includes('empresa:') || lowerLine.includes('nome da empresa:') || lowerLine.includes('company:')) {
        parsed.nomeEmpresa = line.split(':')[1]?.trim()
      }
      // Contact name patterns
      else if (lowerLine.includes('contato:') || lowerLine.includes('nome:') || lowerLine.includes('contact:') || lowerLine.includes('nome do contato:')) {
        parsed.nomeContato = line.split(':')[1]?.trim()
      }
      // Email patterns
      else if (line.includes('@') && (lowerLine.includes('email:') || lowerLine.includes('e-mail:') || lowerLine.includes('email'))) {
        const emailMatch = line.match(/[\w.-]+@[\w.-]+\.\w+/)
        if (emailMatch) parsed.email = emailMatch[0]
      }
      // Phone patterns
      else if (lowerLine.includes('telefone:') || lowerLine.includes('phone:') || lowerLine.includes('tel:') || lowerLine.includes('celular:')) {
        parsed.telefone = line.split(':')[1]?.trim()
      }
      // Product patterns
      else if (lowerLine.includes('produto:') || lowerLine.includes('product:') || lowerLine.includes('serviço:') || lowerLine.includes('produto de marketing:')) {
        parsed.produtoMarketing = line.split(':')[1]?.trim()
      }
      // Value patterns
      else if (lowerLine.includes('valor:') || lowerLine.includes('price:') || line.includes('R$') || lowerLine.includes('preço:')) {
        const valueMatch = line.match(/R?\$?\s*(\d+[.,]?\d*)/)
        if (valueMatch) parsed.valorPagoLead = valueMatch[1].replace(',', '.')
      }
      // City patterns
      else if (lowerLine.includes('cidade:') || lowerLine.includes('city:') || lowerLine.includes('local:')) {
        parsed.cidade = line.split(':')[1]?.trim()
      }
      // Niche patterns
      else if (lowerLine.includes('nicho:') || lowerLine.includes('segmento:') || lowerLine.includes('área:') || lowerLine.includes('setor:')) {
        const nichoValue = line.split(':')[1]?.trim()
        if (nichoValue) {
          // Map common values to our options
          const nichoMap: { [key: string]: string } = {
            'varejo': 'Varejo',
            'servico': 'Serviço',
            'serviço': 'Serviço',
            'industria': 'Indústria',
            'indústria': 'Indústria',
            'assessoria': 'Assessoria',
            'turismo': 'Turismo',
            'ecommerce': 'E-commerce',
            'e-commerce': 'E-commerce',
            'estruturacao': 'Estruturação Estratégica',
            'estruturação': 'Estruturação Estratégica'
          }
          parsed.nicho = nichoMap[nichoValue.toLowerCase()] || nichoValue
        }
      }
      // CNPJ patterns
      else if (lowerLine.includes('cnpj:') || line.match(/\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}/)) {
        const cnpjMatch = line.match(/\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}/)
        if (cnpjMatch) parsed.cnpj = cnpjMatch[0]
        else parsed.cnpj = line.split(':')[1]?.trim()
      }
      // Faturamento patterns
      else if (lowerLine.includes('faturamento:') || lowerLine.includes('receita:')) {
        parsed.faturamento = line.split(':')[1]?.trim()
      }
    }

    // Apply parsed data to form
    Object.keys(parsed).forEach(key => {
      if (parsed[key]) {
        handleInputChange(key, parsed[key])
      }
    })

    console.log("✅ Parsed data applied:", parsed)
    
    // Clear the auto-fill field after parsing
    setAutoFillData("")
  }

  const handleAutoFill = () => {
    if (autoFillData.trim()) {
      parseAutoFillData(autoFillData)
    }
  }

  const handleSave = () => {
    // Validação básica - CAMPOS OBRIGATÓRIOS ATUALIZADOS
    const requiredFields = [
      "nomeEmpresa",
      "produtoMarketing", 
      "nicho",
      "valorPagoLead",
      "origemLead", // Mudança: era "tipoLead"
      "nomeContato",
      "email",
      "telefone",
      "sdr",
      "arrematador", // Agora obrigatório
      // "status" removido dos obrigatórios
    ]

    const missingFields = requiredFields.filter((field) => {
      const value = formData[field as keyof typeof formData]
      return !value || value === ""
    })

    if (missingFields.length > 0) {
      alert(`❌ Campos obrigatórios não preenchidos:\n${missingFields.join(", ")}`)
      return
    }

    onSave(formData)
  }

  if (!isOpen) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[95vh] overflow-y-auto">
        <DialogHeader className="flex flex-row items-center justify-between border-b pb-4">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-red-600 rounded flex items-center justify-center">
              <span className="text-white font-bold text-sm">JO</span>
            </div>
            <DialogTitle className="text-xl font-semibold">{editingLead ? "Editar Lead" : "Novo Lead"}</DialogTitle>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* PREENCHIMENTO AUTOMÁTICO NO CABEÇALHO */}
          {!editingLead && (
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-3">
                <Sparkles className="w-5 h-5 text-blue-600" />
                <h3 className="text-lg font-semibold text-blue-900">✨ Preenchimento Automático</h3>
              </div>
              <p className="text-sm text-blue-700 mb-3">
                Cole os dados do lead abaixo e clique em "Preencher" para completar automaticamente os campos:
              </p>
              <div className="space-y-3">
                <Textarea
                  placeholder="Cole aqui os dados do lead... 

Exemplo:
Empresa: Romalux Iluminação
Contato: João Silva  
Email: joao@romalux.com.br
Telefone: (11) 99999-9999
Produto: Consultoria em Marketing Digital
Valor: R$ 150,00
Cidade: São Paulo
Nicho: Varejo
CNPJ: 12.345.678/0001-90"
                  value={autoFillData}
                  onChange={(e) => setAutoFillData(e.target.value)}
                  className="min-h-[120px] resize-none"
                />
                <div className="flex space-x-2">
                  <Button 
                    onClick={handleAutoFill} 
                    className="bg-blue-600 hover:bg-blue-700"
                    disabled={!autoFillData.trim()}
                  >
                    <Sparkles className="w-4 h-4 mr-2" />
                    Preencher Automaticamente
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => setAutoFillData("")}
                    disabled={!autoFillData.trim()}
                  >
                    <X className="w-4 h-4 mr-2" />
                    Limpar
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Informações Básicas */}
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-red-900 mb-4">📋 Informações Básicas *</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="nomeEmpresa">Nome da Empresa *</Label>
                <Input
                  id="nomeEmpresa"
                  placeholder="Digite o nome da empresa"
                  value={formData.nomeEmpresa}
                  onChange={(e) => handleInputChange("nomeEmpresa", e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="produtoMarketing">Produto de Marketing *</Label>
                <Input
                  id="produtoMarketing"
                  placeholder="Digite o produto de marketing"
                  value={formData.produtoMarketing}
                  onChange={(e) => handleInputChange("produtoMarketing", e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="nicho">Nicho *</Label>
                <Select value={formData.nicho} onValueChange={(value) => handleInputChange("nicho", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o nicho" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Estruturação Estratégica">Estruturação Estratégica</SelectItem>
                    <SelectItem value="Assessoria">Assessoria</SelectItem>
                    <SelectItem value="Varejo">Varejo</SelectItem>
                    <SelectItem value="Serviço">Serviço</SelectItem>
                    <SelectItem value="Indústria">Indústria</SelectItem>
                    <SelectItem value="Outro">Outro</SelectItem>
                    <SelectItem value="Turismo">Turismo</SelectItem>
                    <SelectItem value="E-commerce">E-commerce</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="dataHoraCompra">Data/Hora da Compra do Lead</Label>
                <Input
                  id="dataHoraCompra"
                  type="datetime-local"
                  value={formData.dataHoraCompra}
                  onChange={(e) => handleInputChange("dataHoraCompra", e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="valorPagoLead">Valor Pago no Lead (R$) *</Label>
                <Input
                  id="valorPagoLead"
                  type="number"
                  step="0.01"
                  placeholder="0"
                  value={formData.valorPagoLead}
                  onChange={(e) => handleInputChange("valorPagoLead", e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="origemLead">Origem do Lead *</Label>
                <Select value={formData.origemLead} onValueChange={(value) => handleInputChange("origemLead", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione a origem" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="leadbroker">LeadBroker</SelectItem>
                    <SelectItem value="organico">Orgânico</SelectItem>
                    <SelectItem value="indicacao">Indicação</SelectItem>
                    <SelectItem value="facebook">Facebook</SelectItem>
                    <SelectItem value="google">Google</SelectItem>
                    <SelectItem value="linkedin">LinkedIn</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Informações Complementares */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">📊 Informações Complementares</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="faturamento">Faturamento</Label>
                <Input
                  id="faturamento"
                  placeholder="Ex: De 401 mil à 1 milhão"
                  value={formData.faturamento}
                  onChange={(e) => handleInputChange("faturamento", e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="canal">Canal</Label>
                <Input
                  id="canal"
                  placeholder="Digite o canal"
                  value={formData.canal}
                  onChange={(e) => handleInputChange("canal", e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="nivelUrgencia">Nível de Urgência</Label>
                <Select value={formData.nivelUrgencia} onValueChange={(value) => handleInputChange("nivelUrgencia", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o nível" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="baixo">Baixo</SelectItem>
                    <SelectItem value="medio">Médio</SelectItem>
                    <SelectItem value="alto">Alto</SelectItem>
                    <SelectItem value="urgente">Urgente</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="regiao">Região</Label>
                <Input
                  id="regiao"
                  placeholder="Digite a região"
                  value={formData.regiao}
                  onChange={(e) => handleInputChange("regiao", e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="cidade">Cidade</Label>
                <Input
                  id="cidade"
                  placeholder="Digite a cidade"
                  value={formData.cidade}
                  onChange={(e) => handleInputChange("cidade", e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="cnpj">CNPJ</Label>
                <Input
                  id="cnpj"
                  placeholder="00.000.000/0000-00"
                  value={formData.cnpj}
                  onChange={(e) => handleInputChange("cnpj", e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Informações de Contato */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-blue-900 mb-4">👤 Informações de Contato *</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="nomeContato">Nome do Contato *</Label>
                <Input
                  id="nomeContato"
                  placeholder="Nome da pessoa de contato"
                  value={formData.nomeContato}
                  onChange={(e) => handleInputChange("nomeContato", e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="cargoContato">Cargo do Contato</Label>
                <Input
                  id="cargoContato"
                  placeholder="Ex: Diretor, Gerente, etc."
                  value={formData.cargoContato}
                  onChange={(e) => handleInputChange("cargoContato", e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="email">E-mail *</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="email@empresa.com"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="emailCorporativo">E-mail Corporativo</Label>
                <Input
                  id="emailCorporativo"
                  type="email"
                  placeholder="contato@empresa.com"
                  value={formData.emailCorporativo}
                  onChange={(e) => handleInputChange("emailCorporativo", e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="telefone">Telefone *</Label>
                <Input
                  id="telefone"
                  placeholder="(11) 99999-9999"
                  value={formData.telefone}
                  onChange={(e) => handleInputChange("telefone", e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Equipe e Processo */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-green-900 mb-4">👥 Equipe e Processo *</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="sdr">SDR *</Label>
                <Select value={formData.sdr} onValueChange={(value) => handleInputChange("sdr", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o SDR" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="antonio">Antônio</SelectItem>
                    <SelectItem value="gabrielli">Gabrielli</SelectItem>
                    <SelectItem value="vanessa">Vanessa</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="closer">Closer</Label>
                <Select value={formData.closer} onValueChange={(value) => handleInputChange("closer", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o closer" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="antonio">Antônio</SelectItem>
                    <SelectItem value="gabrielli">Gabrielli</SelectItem>
                    <SelectItem value="vanessa">Vanessa</SelectItem>
                    <SelectItem value="jasson">Jasson</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="arrematador">Arrematador *</Label>
                <Select value={formData.arrematador} onValueChange={(value) => handleInputChange("arrematador", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o arrematador" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="antonio">Antônio</SelectItem>
                    <SelectItem value="gabrielli">Gabrielli</SelectItem>
                    <SelectItem value="vanessa">Vanessa</SelectItem>
                    <SelectItem value="jasson">Jasson</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="produto">Produto</Label>
                <Input
                  id="produto"
                  placeholder="Digite o produto"
                  value={formData.produto}
                  onChange={(e) => handleInputChange("produto", e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="anuncios">Anúncios</Label>
                <Input
                  id="anuncios"
                  placeholder="Digite informações sobre anúncios"
                  value={formData.anuncios}
                  onChange={(e) => handleInputChange("anuncios", e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Status e Acompanhamento */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-yellow-900 mb-4">📈 Status e Acompanhamento</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="status">Status</Label>
                <Select value={formData.status} onValueChange={(value) => handleInputChange("status", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="CONTRATO ASSINADO">Contrato Assinado</SelectItem>
                    <SelectItem value="DROPADO">Dropado</SelectItem>
                    <SelectItem value="FOLLOW INFINITO">Follow Infinito</SelectItem>
                    <SelectItem value="PERDIDO">Perdido</SelectItem>
                    <SelectItem value="DESQUALIFICADO">Desqualificado</SelectItem>
                    <SelectItem value="TENTANDO CONTATO">Tentando Contato</SelectItem>
                    <SelectItem value="NO-SHOW/REMARCANDO">No-Show/Remarcando</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="dataUltimoContato">Data do Último Contato</Label>
                <Input
                  id="dataUltimoContato"
                  type="date"
                  value={formData.dataUltimoContato}
                  onChange={(e) => handleInputChange("dataUltimoContato", e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Observações */}
          <div>
            <Label htmlFor="observacoes">📝 Observações</Label>
            <Textarea
              id="observacoes"
              placeholder="Digite observações sobre o lead..."
              value={formData.observacoes}
              onChange={(e) => handleInputChange("observacoes", e.target.value)}
              className="min-h-[100px]"
            />
          </div>
        </div>

        {/* Footer Buttons */}
        <div className="flex justify-end space-x-3 border-t pt-4">
          <Button variant="outline" onClick={onClose} disabled={saving}>
            Cancelar
          </Button>
          <Button onClick={handleSave} className="bg-red-600 hover:bg-red-700" disabled={saving}>
            {saving ? (
              <>
                <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                Salvando...
              </>
            ) : editingLead ? (
              "Atualizar"
            ) : (
              "Salvar"
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
