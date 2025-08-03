"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { X, FileText, RefreshCw } from "lucide-react"
import type { Lead } from "@/app/page"

interface NovoLeadModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (leadData: any) => void
  editingLead?: Lead | null
  saving?: boolean // Adicione esta linha
}

export function NovoLeadModal({ isOpen, onClose, onSave, editingLead, saving = false }: NovoLeadModalProps) {
  const [formData, setFormData] = useState({
    // Preenchimento Automático
    dadosAutomaticos: "",

    // Informações da Empresa
    nomeEmpresa: "",
    produtoMarketing: "",
    nicho: "",
    dataHoraCompra: "",
    horarioCompra: "",
    valorPagoLead: "",
    tipoLead: "",
    faturamento: "",
    canal: "",
    nivelUrgencia: "",
    regiao: "",
    cidade: "",
    cnpj: "",

    // Contato
    nomeContato: "",
    cargoContato: "",
    email: "",
    emailCorporativo: "",
    telefone: "",

    // Equipe e processo
    sdr: "",
    closer: "",
    arrematador: "",
    tipoOferta: "",
    produto: "",
    anuncios: "",

    // Status e acompanhamento
    status: "",
    observacoes: "",
    dataUltimoContato: "",
    motivoPerdaPV: "",
    temComentarioLBF: false,

    // Informações Adicionais da Qualificação
    investimentoTrafego: "",
    ticketMedio: "",
    qtdLojas: "",
    qtdVendedores: "",

    // Acompanhamento de Vendas
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

  // Load editing lead data when modal opens
  useEffect(() => {
    if (editingLead && isOpen) {
      setFormData({
        dadosAutomaticos: "",
        nomeEmpresa: editingLead.nomeEmpresa || "",
        produtoMarketing: editingLead.produtoMarketing || "",
        nicho: editingLead.nicho || "",
        dataHoraCompra: editingLead.dataHoraCompra || "",
        horarioCompra: editingLead.horarioCompra || "",
        valorPagoLead: editingLead.valorPagoLead || "",
        tipoLead: editingLead.tipoLead || "",
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
        tipoOferta: editingLead.tipoOferta || "",
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
    } else if (!editingLead && isOpen) {
      // Reset form for new lead
      setFormData({
        dadosAutomaticos: "",
        nomeEmpresa: "",
        produtoMarketing: "",
        nicho: "",
        dataHoraCompra: "",
        horarioCompra: "",
        valorPagoLead: "",
        tipoLead: "",
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
        tipoOferta: "",
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
    }
  }, [editingLead, isOpen])

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const parseLeadData = (text: string) => {
    const parsedData: any = {}

    // Clean and normalize the text
    const cleanText = text.trim().replace(/\r\n/g, "\n").replace(/\r/g, "\n")

    // 1. Parse company name - first line that's not empty
    const lines = cleanText
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line.length > 0)
    if (lines.length > 0) {
      // The company name is typically the first line
      const firstLine = lines[0]
      if (
        firstLine &&
        !firstLine.includes("Produto de Marketing") &&
        !firstLine.includes("Valor pago") &&
        !firstLine.includes("|") &&
        !firstLine.match(/^\d{2}\/\d{2}\/\d{4}/)
      ) {
        parsedData.nomeEmpresa = firstLine
      }
    }

    // 2. Parse Produto de Marketing - look for line with pipe separator
    const produtoMarketingMatch = text.match(/Produto de Marketing\s*\|\s*([^\n\r]+)/i)
    if (produtoMarketingMatch) {
      parsedData.produtoMarketing = produtoMarketingMatch[1].trim()
    }

    // 3. Parse Data/Hora - look for date pattern with pipe and time
    for (const line of lines) {
      const dateTimeMatch = line.match(/(\d{2}\/\d{2}\/\d{4})\s*\|\s*(\d{2}:\d{2})/)
      if (dateTimeMatch) {
        const [, date, time] = dateTimeMatch
        const [day, month, year] = date.split("/")
        const [hours, minutes] = time.split(":")

        // Convert to datetime-local format (YYYY-MM-DDTHH:MM)
        const dateTime = new Date(
          Number.parseInt(year),
          Number.parseInt(month) - 1,
          Number.parseInt(day),
          Number.parseInt(hours),
          Number.parseInt(minutes),
        )
        parsedData.dataHoraCompra = dateTime.toISOString().slice(0, 16)
        break
      }
    }

    // 4. Parse Valor pago - more flexible matching
    const valorMatch = text.match(/Valor pago:\s*R?\$?\s*([\d.,]+)/i)
    if (valorMatch) {
      let valor = valorMatch[1]
      // Handle Brazilian number format (1.170,00 -> 1170.00)
      if (valor.includes(".") && valor.includes(",")) {
        valor = valor.replace(/\./g, "").replace(",", ".")
      } else if (valor.includes(",")) {
        valor = valor.replace(",", ".")
      }
      parsedData.valorPagoLead = valor
    }

    // 5. Parse Faturamento
    const faturamentoMatch = text.match(/Faturamento:\s*([^\n\r]+)/i)
    if (faturamentoMatch) {
      parsedData.faturamento = faturamentoMatch[1].trim()
    }

    // 6. Parse Segmento (Nicho)
    const segmentoMatch = text.match(/Segmento:\s*([^\n\r]+)/i)
    if (segmentoMatch) {
      parsedData.nicho = segmentoMatch[1].trim()
    }

    // 7. Parse Região
    const regiaoMatch = text.match(/Região:\s*([^\n\r]+)/i)
    if (regiaoMatch) {
      parsedData.regiao = regiaoMatch[1].trim()
    }

    // 8. Parse Urgência
    const urgenciaMatch = text.match(/Urgência:\s*([^\n\r]+)/i)
    if (urgenciaMatch) {
      const urgencia = urgenciaMatch[1].trim()
      if (urgencia && urgencia !== "-") {
        parsedData.nivelUrgencia = urgencia
      }
    }

    // 9. Parse Canal
    const canalMatch = text.match(/Canal:\s*([^\n\r]+)/i)
    if (canalMatch) {
      parsedData.canal = canalMatch[1].trim()
    }

    // 10. Parse CNPJ
    const cnpjMatch = text.match(/CNPJ:\s*([^\n\r]+)/i)
    if (cnpjMatch) {
      const cnpj = cnpjMatch[1].trim()
      if (cnpj && cnpj !== "-") {
        parsedData.cnpj = cnpj
      }
    }

    // 11. Parse Nome do contato
    const nomeContatoMatch = text.match(/Nome do contato:\s*([^\n\r]+)/i)
    if (nomeContatoMatch) {
      parsedData.nomeContato = nomeContatoMatch[1].trim()
    }

    // 12. Parse E-mail
    const emailMatch = text.match(/E-mail:\s*([^\n\r]+)/i)
    if (emailMatch) {
      const email = emailMatch[1].trim()
      if (email && email !== "-") {
        parsedData.email = email
      }
    }

    // 13. Parse Cargo
    const cargoMatch = text.match(/Cargo:\s*([^\n\r]+)/i)
    if (cargoMatch) {
      const cargo = cargoMatch[1].trim()
      if (cargo && cargo !== "-") {
        parsedData.cargoContato = cargo
      }
    }

    // 14. Parse Telefone
    const telefoneMatch = text.match(/Telefone:\s*([^\n\r]+)/i)
    if (telefoneMatch) {
      const telefone = telefoneMatch[1].trim()
      if (telefone && telefone !== "-") {
        parsedData.telefone = telefone
      }
    }

    // 15. Parse additional fields from "Informações da qualificação"
    const investimentoTrafegoMatch = text.match(/Investimento em tráfego:\s*([^\n\r]+)/i)
    if (investimentoTrafegoMatch) {
      const investimento = investimentoTrafegoMatch[1].trim()
      if (investimento && investimento !== "-") {
        parsedData.investimentoTrafego = investimento
      }
    }

    const ticketMedioMatch = text.match(/Ticket médio:\s*([^\n\r]+)/i)
    if (ticketMedioMatch) {
      const ticket = ticketMedioMatch[1].trim()
      if (ticket && ticket !== "-") {
        parsedData.ticketMedio = ticket
      }
    }

    const qtdLojasMatch = text.match(/Qtd\.\s*de lojas:\s*([^\n\r]+)/i)
    if (qtdLojasMatch) {
      const qtdLojas = qtdLojasMatch[1].trim()
      if (qtdLojas && qtdLojas !== "-") {
        parsedData.qtdLojas = qtdLojas
      }
    }

    const qtdVendedoresMatch = text.match(/qtd\.\s*de vendedores:\s*([^\n\r]+)/i)
    if (qtdVendedoresMatch) {
      const qtdVendedores = qtdVendedoresMatch[1].trim()
      if (qtdVendedores && qtdVendedores !== "-") {
        parsedData.qtdVendedores = qtdVendedores
      }
    }

    // Set default tipo de lead based on canal
    if (parsedData.canal) {
      const canal = parsedData.canal.toLowerCase()
      if (canal.includes("google")) {
        parsedData.tipoLead = "google"
      } else if (canal.includes("facebook")) {
        parsedData.tipoLead = "facebook"
      } else if (canal.includes("organico") || canal.includes("orgânico")) {
        parsedData.tipoLead = "organico"
      } else if (canal.includes("linkedin")) {
        parsedData.tipoLead = "linkedin"
      } else {
        parsedData.tipoLead = "leadbroker"
      }
    }

    return parsedData
  }

  const handleProcessarCampos = () => {
    if (formData.dadosAutomaticos) {
      const parsedData = parseLeadData(formData.dadosAutomaticos)

      // Update form with parsed data
      setFormData((prev) => ({
        ...prev,
        ...parsedData,
      }))

      // Show detailed success message
      const fieldsFound = Object.keys(parsedData).length
      const fieldsList = Object.keys(parsedData).join(", ")

      console.log("Dados parseados:", parsedData) // Para debug

      alert(`✅ Processamento concluído! 
${fieldsFound} campos foram preenchidos automaticamente:
${fieldsList}`)
    }
  }

  const handleSave = () => {
    // Basic validation
    const requiredFields = [
      "nomeEmpresa",
      "produtoMarketing",
      "nicho",
      "valorPagoLead",
      "tipoLead",
      "nomeContato",
      "email",
      "telefone",
      "sdr",
      "status",
    ]
    const missingFields = requiredFields.filter((field) => !formData[field as keyof typeof formData])

    if (missingFields.length > 0) {
      alert(`Por favor, preencha os campos obrigatórios: ${missingFields.join(", ")}`)
      return
    }

    onSave(formData)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
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
          <p className="text-sm text-gray-600">
            {editingLead
              ? "Edite as informações do lead conforme necessário"
              : "Preencha as informações do lead ou cole os dados para preenchimento automático"}
          </p>

          {/* Preenchimento Automático - Only show for new leads */}
          {!editingLead && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-3">
                <FileText className="w-5 h-5 text-blue-600" />
                <h3 className="font-semibold text-blue-900">Preenchimento Automático</h3>
              </div>
              <p className="text-sm text-blue-700 mb-3">
                Cole aqui os dados do lead para preenchimento automático dos campos:
              </p>
              <Textarea
                placeholder="Cole aqui os dados do lead (ex: Nome da Empresa ou 00:28:05 Valor:R$ 972,00 Segmento: Serviço Nome contato: Neuza...)"
                value={formData.dadosAutomaticos}
                onChange={(e) => handleInputChange("dadosAutomaticos", e.target.value)}
                className="min-h-[120px] mb-3 font-mono text-sm"
              />
              <Button
                onClick={handleProcessarCampos}
                className="bg-blue-600 hover:bg-blue-700"
                disabled={!formData.dadosAutomaticos}
              >
                <FileText className="w-4 h-4 mr-2" />
                Processar e Preencher Campos
              </Button>
            </div>
          )}

          {/* Main Form - Two Columns */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column - Informações da Empresa */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Informações da Empresa</h3>

              <div className="space-y-4">
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
                  <Input
                    id="nicho"
                    placeholder="Digite o nicho"
                    value={formData.nicho}
                    onChange={(e) => handleInputChange("nicho", e.target.value)}
                  />
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
                  <Label htmlFor="tipoLead">Tipo de Lead *</Label>
                  <Select value={formData.tipoLead} onValueChange={(value) => handleInputChange("tipoLead", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o tipo" />
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

                <div>
                  <Label htmlFor="faturamento">Faturamento</Label>
                  <Input
                    id="faturamento"
                    placeholder="Digite o faturamento"
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
                  <Input
                    id="nivelUrgencia"
                    placeholder="Digite o nível de urgência"
                    value={formData.nivelUrgencia}
                    onChange={(e) => handleInputChange("nivelUrgencia", e.target.value)}
                  />
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
                  <Label htmlFor="cnpj">CNPJ</Label>
                  <Input
                    id="cnpj"
                    placeholder="00.000.000/0000-00"
                    value={formData.cnpj}
                    onChange={(e) => handleInputChange("cnpj", e.target.value)}
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
                  <Label htmlFor="horarioCompra">Horário de Compra</Label>
                  <Input
                    id="horarioCompra"
                    type="time"
                    value={formData.horarioCompra}
                    onChange={(e) => handleInputChange("horarioCompra", e.target.value)}
                  />
                </div>

                {/* Novos campos da qualificação */}
                <div className="border-t pt-4 mt-4">
                  <h4 className="text-md font-semibold text-gray-800 mb-3">Informações da Qualificação</h4>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="investimentoTrafego">Investimento em Tráfego</Label>
                      <Input
                        id="investimentoTrafego"
                        placeholder="Digite o investimento em tráfego"
                        value={formData.investimentoTrafego}
                        onChange={(e) => handleInputChange("investimentoTrafego", e.target.value)}
                      />
                    </div>

                    <div>
                      <Label htmlFor="ticketMedio">Ticket Médio</Label>
                      <Input
                        id="ticketMedio"
                        placeholder="Digite o ticket médio"
                        value={formData.ticketMedio}
                        onChange={(e) => handleInputChange("ticketMedio", e.target.value)}
                      />
                    </div>

                    <div>
                      <Label htmlFor="qtdLojas">Quantidade de Lojas</Label>
                      <Input
                        id="qtdLojas"
                        placeholder="Digite a quantidade de lojas"
                        value={formData.qtdLojas}
                        onChange={(e) => handleInputChange("qtdLojas", e.target.value)}
                      />
                    </div>

                    <div>
                      <Label htmlFor="qtdVendedores">Quantidade de Vendedores</Label>
                      <Input
                        id="qtdVendedores"
                        placeholder="Digite a quantidade de vendedores"
                        value={formData.qtdVendedores}
                        onChange={(e) => handleInputChange("qtdVendedores", e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Contato e Vendas */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Contato e Vendas</h3>

              <div className="space-y-4">
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
                    placeholder="Digite o cargo"
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
                  <Label htmlFor="telefone">Telefone *</Label>
                  <Input
                    id="telefone"
                    placeholder="(11) 99999-9999"
                    value={formData.telefone}
                    onChange={(e) => handleInputChange("telefone", e.target.value)}
                  />
                </div>

                <div>
                  <Label htmlFor="emailCorporativo">E-mail Corporativo</Label>
                  <Input
                    id="emailCorporativo"
                    type="email"
                    placeholder="email@empresa.com"
                    value={formData.emailCorporativo}
                    onChange={(e) => handleInputChange("emailCorporativo", e.target.value)}
                  />
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
                      <SelectValue placeholder="Selecione o Closer" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="alan">Alan</SelectItem>
                      <SelectItem value="leonardo">Leonardo</SelectItem>
                      <SelectItem value="william">William</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="arrematador">Arrematador</Label>
                  <Select
                    value={formData.arrematador}
                    onValueChange={(value) => handleInputChange("arrematador", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o arrematador" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="alan">Alan</SelectItem>
                      <SelectItem value="antonio">Antônio</SelectItem>
                      <SelectItem value="gabrielli">Gabrielli</SelectItem>
                      <SelectItem value="leonardo">Leonardo</SelectItem>
                      <SelectItem value="vanessa">Vanessa</SelectItem>
                      <SelectItem value="william">William</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="tipoOferta">Tipo de Oferta</Label>
                  <Input
                    id="tipoOferta"
                    placeholder="Digite o tipo de oferta"
                    value={formData.tipoOferta}
                    onChange={(e) => handleInputChange("tipoOferta", e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Status e Acompanhamento */}
          <div className="border-t pt-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Status e Acompanhamento</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <Label htmlFor="status">Status *</Label>
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
                <Label htmlFor="dataUltimoContato">Data Último Contato</Label>
                <Input
                  id="dataUltimoContato"
                  type="date"
                  value={formData.dataUltimoContato}
                  onChange={(e) => handleInputChange("dataUltimoContato", e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <Label htmlFor="motivoPerdaPV">Motivo de Perda PV</Label>
                <Input
                  id="motivoPerdaPV"
                  placeholder="Digite o motivo da perda"
                  value={formData.motivoPerdaPV}
                  onChange={(e) => handleInputChange("motivoPerdaPV", e.target.value)}
                />
              </div>

              <div className="flex items-center space-x-2 pt-6">
                <Checkbox
                  id="temComentarioLBF"
                  checked={formData.temComentarioLBF}
                  onCheckedChange={(checked) => handleInputChange("temComentarioLBF", checked)}
                />
                <Label htmlFor="temComentarioLBF">Tem Comentário no LBF</Label>
              </div>
            </div>

            <div>
              <Label htmlFor="observacoes">Observações</Label>
              <Textarea
                id="observacoes"
                placeholder="Digite observações detalhadas sobre o lead..."
                value={formData.observacoes}
                onChange={(e) => handleInputChange("observacoes", e.target.value)}
                className="min-h-[100px]"
              />
            </div>
          </div>

          {/* Informações Financeiras */}
          <div className="border-t pt-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Informações Financeiras</h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="fee">Fee (R$)</Label>
                <Input
                  id="fee"
                  type="number"
                  step="0.01"
                  placeholder="0"
                  value={formData.fee}
                  onChange={(e) => handleInputChange("fee", e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="escopoFechado">Escopo Fechado</Label>
                <Input
                  id="escopoFechado"
                  placeholder="Digite o escopo fechado"
                  value={formData.escopoFechado}
                  onChange={(e) => handleInputChange("escopoFechado", e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="feeTotal">Fee Total (R$)</Label>
                <Input
                  id="feeTotal"
                  type="number"
                  step="0.01"
                  placeholder="0"
                  value={formData.feeTotal}
                  onChange={(e) => handleInputChange("feeTotal", e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div>
                <Label htmlFor="dataFechamento">Data de Fechamento</Label>
                <Input
                  id="dataFechamento"
                  type="date"
                  value={formData.dataFechamento}
                  onChange={(e) => handleInputChange("dataFechamento", e.target.value)}
                />
              </div>

              <div className="flex items-center space-x-2 pt-6">
                <Checkbox
                  id="vendaViaJassonCo"
                  checked={formData.vendaViaJassonCo}
                  onCheckedChange={(checked) => handleInputChange("vendaViaJassonCo", checked)}
                />
                <Label htmlFor="vendaViaJassonCo">Venda via Jasson&Co</Label>
              </div>
            </div>
          </div>

          {/* Acompanhamento de Vendas */}
          <div className="border-t pt-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Acompanhamento de Vendas</h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="conseguiuContato"
                  checked={formData.conseguiuContato}
                  onCheckedChange={(checked) => handleInputChange("conseguiuContato", checked)}
                />
                <Label htmlFor="conseguiuContato">Conseguiu Contato</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="reuniaoAgendada"
                  checked={formData.reuniaoAgendada}
                  onCheckedChange={(checked) => handleInputChange("reuniaoAgendada", checked)}
                />
                <Label htmlFor="reuniaoAgendada">Reunião Agendada</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="reuniaoRealizada"
                  checked={formData.reuniaoRealizada}
                  onCheckedChange={(checked) => handleInputChange("reuniaoRealizada", checked)}
                />
                <Label htmlFor="reuniaoRealizada">Reunião Realizada</Label>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                <Label htmlFor="valorProposta">Valor da Proposta (R$)</Label>
                <Input
                  id="valorProposta"
                  type="number"
                  step="0.01"
                  placeholder="0"
                  value={formData.valorProposta}
                  onChange={(e) => handleInputChange("valorProposta", e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="valorVenda">Valor da Venda (R$)</Label>
                <Input
                  id="valorVenda"
                  type="number"
                  step="0.01"
                  placeholder="0"
                  value={formData.valorVenda}
                  onChange={(e) => handleInputChange("valorVenda", e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="dataVenda">Data da Venda</Label>
                <Input
                  id="dataVenda"
                  type="date"
                  value={formData.dataVenda}
                  onChange={(e) => handleInputChange("dataVenda", e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="comissaoSDR">Comissão SDR (%)</Label>
                <Input
                  id="comissaoSDR"
                  type="number"
                  step="0.01"
                  placeholder="0"
                  value={formData.comissaoSDR}
                  onChange={(e) => handleInputChange("comissaoSDR", e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="comissaoCloser">Comissão Closer (%)</Label>
                <Input
                  id="comissaoCloser"
                  type="number"
                  step="0.01"
                  placeholder="0"
                  value={formData.comissaoCloser}
                  onChange={(e) => handleInputChange("comissaoCloser", e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="statusComissao">Status Comissão</Label>
                <Select
                  value={formData.statusComissao}
                  onValueChange={(value) => handleInputChange("statusComissao", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pendente">Pendente</SelectItem>
                    <SelectItem value="pago">Pago</SelectItem>
                    <SelectItem value="cancelado">Cancelado</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
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
