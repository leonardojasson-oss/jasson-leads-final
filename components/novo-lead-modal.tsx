"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { X, RefreshCw, Sparkles } from "lucide-react"
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
        origemLead: editingLead.tipoLead || "",
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

  // PARSER ESPECÍFICO PARA O FORMATO DOS DADOS
  const parseAutoFillData = (data: string) => {
    console.log("🔄 === INICIANDO PARSER ESPECÍFICO ===")
    console.log("📝 Dados recebidos:", data)

    if (!data || data.trim() === "") {
      console.log("❌ Dados vazios")
      return
    }

    const updates: any = {}

    try {
      // Nome da empresa - primeira linha
      const firstLine = data.split("\n")[0]?.trim()
      if (firstLine && !firstLine.includes("|") && !firstLine.includes(":")) {
        updates.nomeEmpresa = firstLine
        console.log("✅ Empresa encontrada:", firstLine)
      }

      // Produto de Marketing
      const produtoMatch = data.match(/Produto de Marketing\s*\|\s*([^\n]+)/i)
      if (produtoMatch) {
        updates.produtoMarketing = produtoMatch[1].trim()
        console.log("✅ Produto encontrado:", produtoMatch[1].trim())
      }

      // Data e hora
      const dataMatch = data.match(/(\d{2}\/\d{2}\/\d{4})\s*\|\s*(\d{2}:\d{2})/i)
      if (dataMatch) {
        const [, dataStr, horaStr] = dataMatch
        // Converter para formato datetime-local (YYYY-MM-DDTHH:MM)
        const [dia, mes, ano] = dataStr.split("/")
        const dataFormatada = `${ano}-${mes}-${dia}T${horaStr}`
        updates.dataHoraCompra = dataFormatada
        console.log("✅ Data/Hora encontrada:", dataFormatada)
      }

      // Valor pago
      const valorMatch = data.match(/Valor pago:\s*R\$\s*([\d.,]+)/i)
      if (valorMatch) {
        const valor = valorMatch[1].replace(/\./g, "").replace(",", ".")
        updates.valorPagoLead = valor
        console.log("✅ Valor encontrado:", valor)
      }

      // Faturamento
      const faturamentoMatch = data.match(/Faturamento:\s*([^\n]+)/i)
      if (faturamentoMatch) {
        updates.faturamento = faturamentoMatch[1].trim()
        console.log("✅ Faturamento encontrado:", faturamentoMatch[1].trim())
      }

      // Segmento/Nicho
      const segmentoMatch = data.match(/Segmento:\s*([^\n]+)/i)
      if (segmentoMatch) {
        const segmento = segmentoMatch[1].trim()
        // Mapear valores
        const nichoMap: { [key: string]: string } = {
          serviço: "Serviço",
          servico: "Serviço",
          varejo: "Varejo",
          industria: "Indústria",
          indústria: "Indústria",
          assessoria: "Assessoria",
          turismo: "Turismo",
          "e-commerce": "E-commerce",
          ecommerce: "E-commerce",
        }
        updates.nicho = nichoMap[segmento.toLowerCase()] || segmento
        console.log("✅ Nicho encontrado:", updates.nicho)
      }

      // Região/Cidade
      const regiaoMatch = data.match(/Região:\s*([^\n]+)/i)
      if (regiaoMatch) {
        const regiao = regiaoMatch[1].trim()
        if (regiao !== "-") {
          // Se tem barra, pegar a primeira parte como cidade
          if (regiao.includes("/")) {
            updates.cidade = regiao.split("/")[0].trim()
            updates.regiao = regiao.split("/")[1]?.trim()
          } else {
            updates.cidade = regiao
          }
          console.log("✅ Região/Cidade encontrada:", regiao)
        }
      }

      // Canal
      const canalMatch = data.match(/Canal:\s*([^\n]+)/i)
      if (canalMatch && canalMatch[1].trim() !== "-") {
        updates.canal = canalMatch[1].trim()
        console.log("✅ Canal encontrado:", canalMatch[1].trim())
      }

      // CNPJ
      const cnpjMatch = data.match(/CNPJ:\s*([^\n]+)/i)
      if (cnpjMatch && cnpjMatch[1].trim() !== "-") {
        updates.cnpj = cnpjMatch[1].trim()
        console.log("✅ CNPJ encontrado:", cnpjMatch[1].trim())
      }

      // Nome do contato
      const contatoMatch = data.match(/Nome do contato:\s*([^\n]+)/i)
      if (contatoMatch) {
        updates.nomeContato = contatoMatch[1].trim()
        console.log("✅ Contato encontrado:", contatoMatch[1].trim())
      }

      // Email
      const emailMatch = data.match(/E-mail:\s*([^\n]+)/i)
      if (emailMatch) {
        updates.email = emailMatch[1].trim()
        console.log("✅ Email encontrado:", emailMatch[1].trim())
      }

      // Cargo
      const cargoMatch = data.match(/Cargo:\s*([^\n]+)/i)
      if (cargoMatch && cargoMatch[1].trim() !== "-") {
        updates.cargoContato = cargoMatch[1].trim()
        console.log("✅ Cargo encontrado:", cargoMatch[1].trim())
      }

      // Telefone
      const telefoneMatch = data.match(/Telefone:\s*([^\n]+)/i)
      if (telefoneMatch) {
        let telefone = telefoneMatch[1].trim()
        // Remover +55 se existir e formatar
        telefone = telefone.replace(/^\+55/, "").trim()
        updates.telefone = telefone
        console.log("✅ Telefone encontrado:", telefone)
      }

      // Investimento em tráfego
      const investimentoMatch = data.match(/Investimento em tráfego:\s*([^\n]+)/i)
      if (investimentoMatch && investimentoMatch[1].trim() !== "-") {
        updates.investimentoTrafego = investimentoMatch[1].trim()
        console.log("✅ Investimento encontrado:", investimentoMatch[1].trim())
      }

      // Ticket médio
      const ticketMatch = data.match(/Ticket médio:\s*([^\n]+)/i)
      if (ticketMatch && ticketMatch[1].trim() !== "-") {
        updates.ticketMedio = ticketMatch[1].trim()
        console.log("✅ Ticket médio encontrado:", ticketMatch[1].trim())
      }

      // Quantidade de lojas
      const lojasMatch = data.match(/Qtd\.\s*de lojas:\s*([^\n]+)/i)
      if (lojasMatch && lojasMatch[1].trim() !== "-") {
        updates.qtdLojas = lojasMatch[1].trim()
        console.log("✅ Qtd lojas encontrada:", lojasMatch[1].trim())
      }

      // Quantidade de vendedores
      const vendedoresMatch = data.match(/qtd\.\s*de vendedores:\s*([^\n]+)/i)
      if (vendedoresMatch && vendedoresMatch[1].trim() !== "-") {
        updates.qtdVendedores = vendedoresMatch[1].trim()
        console.log("✅ Qtd vendedores encontrada:", vendedoresMatch[1].trim())
      }

      // Definir origem como LeadBroker por padrão (já que parece ser o formato padrão)
      updates.origemLead = "leadbroker"
      console.log("✅ Origem definida como LeadBroker")

      // Definir status padrão como Backlog
      updates.status = "BACKLOG"
      console.log("✅ Status definido como Backlog")

      console.log("📊 Atualizações encontradas:", updates)

      // Aplicar as atualizações ao formulário
      if (Object.keys(updates).length > 0) {
        setFormData((prev) => {
          const newData = { ...prev, ...updates }
          console.log("✅ Formulário atualizado:", newData)
          return newData
        })

        // Limpar o campo de auto-fill
        setAutoFillData("")
        console.log("✅ Campo de auto-fill limpo")

        // Mostrar quantos campos foram preenchidos
        console.log(`✅ ${Object.keys(updates).length} campos preenchidos automaticamente`)
      } else {
        console.log("⚠️ Nenhuma informação reconhecida")
      }
    } catch (error) {
      console.error("❌ Erro no parser:", error)
    }
  }

  const handleAutoFill = () => {
    console.log("🚀 === BOTÃO AUTO-FILL CLICADO ===")
    console.log("📝 Dados para processar:", autoFillData)

    if (autoFillData.trim()) {
      parseAutoFillData(autoFillData)
    } else {
      console.log("❌ Nenhum dado para processar")
    }
  }

  const handleSave = () => {
    console.log("💾 === SALVANDO LEAD ===")

    // Validação básica - CAMPOS OBRIGATÓRIOS
    const requiredFields = [
      "nomeEmpresa",
      "produtoMarketing",
      "nicho",
      "valorPagoLead",
      "origemLead",
      "nomeContato",
      "email",
      "telefone",
      "sdr",
      "arrematador",
    ]

    const missingFields = requiredFields.filter((field) => {
      const value = formData[field as keyof typeof formData]
      return !value || value === ""
    })

    if (missingFields.length > 0) {
      alert(`❌ Campos obrigatórios não preenchidos:\n${missingFields.join(", ")}`)
      return
    }

    console.log("✅ Validação passou, salvando...")
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
                  placeholder="Cole aqui os dados do lead do LeadBroker..."
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
                  <Button variant="outline" onClick={() => setAutoFillData("")} disabled={!autoFillData.trim()}>
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
                <Select
                  value={formData.nivelUrgencia}
                  onValueChange={(value) => handleInputChange("nivelUrgencia", value)}
                >
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                <Label htmlFor="anuncios">Anúncios</Label>
                <Select value={formData.anuncios} onValueChange={(value) => handleInputChange("anuncios", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione uma opção" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sim">Sim</SelectItem>
                    <SelectItem value="nao">Não</SelectItem>
                  </SelectContent>
                </Select>
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
                    <SelectItem value="BACKLOG">Backlog</SelectItem>
                    <SelectItem value="TENTANDO CONTATO">Tentando Contato</SelectItem>
                    <SelectItem value="CONTATO AGENDADO">Contato Agendado</SelectItem>
                    <SelectItem value="QUALIFICANDO">Qualificando</SelectItem>
                    <SelectItem value="REUNIÃO AGENDADA">Reunião Agendada</SelectItem>
                    <SelectItem value="REUNIÃO">Reunião</SelectItem>
                    <SelectItem value="REUNIÃO REALIZADA">Reunião Realizada</SelectItem>
                    <SelectItem value="DÚVIDAS E FECHAMENTO">Dúvidas e Fechamento</SelectItem>
                    <SelectItem value="CONTRATO NA RUA">Contrato na Rua</SelectItem>
                    <SelectItem value="GANHO">Ganho</SelectItem>
                    <SelectItem value="FOLLOW UP">Follow Up</SelectItem>
                    <SelectItem value="NO-SHOW">No-Show</SelectItem>
                    <SelectItem value="DROPADO">Dropado</SelectItem>
                    <SelectItem value="FOLLOW INFINITO">Follow Infinito</SelectItem>
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
