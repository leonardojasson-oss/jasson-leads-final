"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { X, RefreshCw } from 'lucide-react'
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
    // Campos obrigatórios
    nomeEmpresa: "",
    produtoMarketing: "",
    nicho: "",
    valorPagoLead: "",
    origemLead: "", // Mudança: era "tipoLead"
    nomeContato: "",
    email: "",
    telefone: "",
    sdr: "",
    arrematador: "", // Agora obrigatório

    // Campos opcionais
    status: "", // Agora opcional
    dataHoraCompra: "",
    // horarioCompra removido
    faturamento: "",
    canal: "",
    nivelUrgencia: "",
    regiao: "",
    cidade: "",
    cnpj: "",
    cargoContato: "",
    emailCorporativo: "",
    closer: "",
    // tipoOferta removido
    produto: "",
    anuncios: "",
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

  // Reset form when modal opens/closes
  useEffect(() => {
    if (!isOpen) {
      // Reset form when closing
      setFormData({
        nomeEmpresa: "",
        produtoMarketing: "",
        nicho: "",
        valorPagoLead: "",
        origemLead: "",
        nomeContato: "",
        email: "",
        telefone: "",
        sdr: "",
        arrematador: "",
        status: "",
        dataHoraCompra: "",
        faturamento: "",
        canal: "",
        nivelUrgencia: "",
        regiao: "",
        cidade: "",
        cnpj: "",
        cargoContato: "",
        emailCorporativo: "",
        closer: "",
        produto: "",
        anuncios: "",
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

    if (editingLead && isOpen) {
      // Load editing data
      setFormData({
        nomeEmpresa: editingLead.nomeEmpresa || "",
        produtoMarketing: editingLead.produtoMarketing || "",
        nicho: editingLead.nicho || "",
        valorPagoLead: editingLead.valorPagoLead || "",
        origemLead: editingLead.tipoLead || "", // Compatibilidade
        nomeContato: editingLead.nomeContato || "",
        email: editingLead.email || "",
        telefone: editingLead.telefone || "",
        sdr: editingLead.sdr || "",
        arrematador: editingLead.arrematador || "",
        status: editingLead.status || "",
        dataHoraCompra: editingLead.dataHoraCompra || "",
        faturamento: editingLead.faturamento || "",
        canal: editingLead.canal || "",
        nivelUrgencia: editingLead.nivelUrgencia || "",
        regiao: editingLead.regiao || "",
        cidade: editingLead.cidade || "",
        cnpj: editingLead.cnpj || "",
        cargoContato: editingLead.cargoContato || "",
        emailCorporativo: editingLead.emailCorporativo || "",
        closer: editingLead.closer || "",
        produto: editingLead.produto || "",
        anuncios: editingLead.anuncios || "",
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
    console.log(`🔄 Alterando campo ${field}:`, value)
    try {
      setFormData((prev) => ({
        ...prev,
        [field]: value,
      }))
    } catch (error) {
      console.error(`❌ Erro ao alterar campo ${field}:`, error)
    }
  }

  const handleSave = () => {
    console.log("🔄 === INICIANDO SALVAMENTO ===")
    console.log("📊 Dados do formulário:", formData)

    try {
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

      console.log("✅ Validação passou, chamando onSave...")

      // Chama a função de salvar
      onSave(formData)
    } catch (error) {
      console.error("❌ Erro no handleSave:", error)
      alert(`❌ Erro ao processar dados: ${error.message}`)
    }
  }

  if (!isOpen) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
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
          {/* Campos Obrigatórios */}
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-red-900 mb-4">Campos Obrigatórios</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
            </div>
          </div>

          {/* Campos Opcionais */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Campos Opcionais</h3>

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
                <Label htmlFor="dataHoraCompra">Data/Hora da Compra do Lead</Label>
                <Input
                  id="dataHoraCompra"
                  type="datetime-local"
                  value={formData.dataHoraCompra}
                  onChange={(e) => handleInputChange("dataHoraCompra", e.target.value)}
                />
              </div>

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
                <Label htmlFor="cidade">Cidade</Label>
                <Input
                  id="cidade"
                  placeholder="Digite a cidade"
                  value={formData.cidade}
                  onChange={(e) => handleInputChange("cidade", e.target.value)}
                />
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
            </div>
          </div>

          {/* Observações */}
          <div>
            <Label htmlFor="observacoes">Observações</Label>
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
