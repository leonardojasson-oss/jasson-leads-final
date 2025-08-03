import { createClient } from "@supabase/supabase-js"

// Check if Supabase environment variables are available
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Only create Supabase client if environment variables are available
export const supabase = supabaseUrl && supabaseAnonKey ? createClient(supabaseUrl, supabaseAnonKey) : null

export const isSupabaseConfigured = !!(supabaseUrl && supabaseAnonKey)

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

// SUPER ROBUST date cleaning function
const cleanDateValue = (dateValue: any): string | null => {
  // If it's falsy, empty, or invalid, return null
  if (
    !dateValue ||
    dateValue === "" ||
    dateValue === "undefined" ||
    dateValue === "null" ||
    dateValue === "Invalid Date" ||
    (typeof dateValue === "string" && dateValue.trim() === "")
  ) {
    return null
  }

  // Convert to string and trim
  const dateStr = String(dateValue).trim()

  // If empty after trim, return null
  if (dateStr === "") {
    return null
  }

  // Try to validate the date
  try {
    const date = new Date(dateStr)
    if (isNaN(date.getTime())) {
      return null
    }

    // If it's a valid date, return the original string
    return dateStr
  } catch {
    return null
  }
}

// SUPER ROBUST numeric cleaning function
const cleanNumericValue = (numericValue: any): number | null => {
  if (
    numericValue === null ||
    numericValue === undefined ||
    numericValue === "" ||
    numericValue === "undefined" ||
    numericValue === "null"
  ) {
    return null
  }

  const num = Number(numericValue)
  if (isNaN(num)) {
    return null
  }

  return num
}

// SUPER ROBUST string cleaning function
const cleanStringValue = (stringValue: any): string | null => {
  if (
    stringValue === null ||
    stringValue === undefined ||
    stringValue === "" ||
    stringValue === "undefined" ||
    stringValue === "null" ||
    (typeof stringValue === "string" && stringValue.trim() === "")
  ) {
    return null
  }

  return String(stringValue).trim()
}

// Local storage fallback for when Supabase is not configured
const LOCAL_STORAGE_KEY = "jasson-leads-data"

const localStorageOperations = {
  getAll(): Lead[] {
    if (typeof window === "undefined") return []
    try {
      const data = localStorage.getItem(LOCAL_STORAGE_KEY)
      return data ? JSON.parse(data) : []
    } catch {
      return []
    }
  },

  save(leads: Lead[]) {
    if (typeof window === "undefined") return
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(leads))
    } catch (error) {
      console.error("Error saving to localStorage:", error)
    }
  },

  create(lead: Omit<Lead, "id" | "created_at" | "updated_at">): Lead {
    const newLead: Lead = {
      ...lead,
      id: Date.now().toString(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }

    const leads = this.getAll()
    leads.unshift(newLead)
    this.save(leads)
    return newLead
  },

  update(id: string, leadUpdate: Partial<Lead>): Lead | null {
    const leads = this.getAll()
    const index = leads.findIndex((lead) => lead.id === id)

    if (index === -1) return null

    leads[index] = {
      ...leads[index],
      ...leadUpdate,
      updated_at: new Date().toISOString(),
    }

    this.save(leads)
    return leads[index]
  },

  delete(id: string): boolean {
    const leads = this.getAll()
    const filteredLeads = leads.filter((lead) => lead.id !== id)

    if (filteredLeads.length === leads.length) return false

    this.save(filteredLeads)
    return true
  },
}

// Lead operations that work with both Supabase and localStorage
export const leadOperations = {
  // Get all leads
  async getAll(): Promise<Lead[]> {
    if (!isSupabaseConfigured || !supabase) {
      console.log("📱 Usando localStorage - Supabase não configurado")
      return localStorageOperations.getAll()
    }

    try {
      console.log("🔍 Buscando leads no Supabase...")
      const { data, error } = await supabase.from("leads").select("*").order("created_at", { ascending: false })

      if (error) {
        console.error("❌ Erro ao buscar no Supabase:", error)
        throw error
      }

      console.log("✅ Leads encontrados no Supabase:", data?.length || 0)
      return data || []
    } catch (error) {
      console.error("❌ Erro no Supabase, usando localStorage:", error)
      return localStorageOperations.getAll()
    }
  },

  // Create new lead with ULTRA ROBUST error handling
  async create(lead: Omit<Lead, "id" | "created_at" | "updated_at">): Promise<Lead> {
    console.log("🔄 [ULTRA ROBUST] Iniciando salvamento do lead:", lead.nome_empresa)

    if (!isSupabaseConfigured || !supabase) {
      console.log("⚠️ Supabase não configurado, usando localStorage")
      return localStorageOperations.create(lead)
    }

    try {
      console.log("✅ Supabase configurado, preparando dados com limpeza ULTRA ROBUSTA...")

      // ULTRA ROBUST data cleaning - remove ALL empty strings and convert to null
      const cleanedLead: any = {}

      // Process each field individually with extreme care
      const fields = {
        // Required string fields
        nome_empresa: lead.nome_empresa || "Empresa não informada",
        nicho: lead.nicho || "Não informado",
        nome_contato: lead.nome_contato || "Contato não informado",
        email: lead.email || "email@nao-informado.com",
        sdr: lead.sdr || "Não informado",
        status: lead.status || "TENTANDO CONTATO",

        // Optional string fields
        produto_marketing: cleanStringValue(lead.produto_marketing),
        tipo_lead: cleanStringValue(lead.tipo_lead),
        faturamento: cleanStringValue(lead.faturamento),
        canal: cleanStringValue(lead.canal),
        nivel_urgencia: cleanStringValue(lead.nivel_urgencia),
        regiao: cleanStringValue(lead.regiao),
        cidade: cleanStringValue(lead.cidade),
        cnpj: cleanStringValue(lead.cnpj),
        cargo_contato: cleanStringValue(lead.cargo_contato),
        email_corporativo: cleanStringValue(lead.email_corporativo),
        telefone: cleanStringValue(lead.telefone),
        closer: cleanStringValue(lead.closer),
        arrematador: cleanStringValue(lead.arrematador),
        tipo_oferta: cleanStringValue(lead.tipo_oferta),
        produto: cleanStringValue(lead.produto),
        anuncios: cleanStringValue(lead.anuncios),
        observacoes: cleanStringValue(lead.observacoes),
        motivo_perda_pv: cleanStringValue(lead.motivo_perda_pv),
        investimento_trafego: cleanStringValue(lead.investimento_trafego),
        ticket_medio: cleanStringValue(lead.ticket_medio),
        qtd_lojas: cleanStringValue(lead.qtd_lojas),
        qtd_vendedores: cleanStringValue(lead.qtd_vendedores),
        escopo_fechado: cleanStringValue(lead.escopo_fechado),
        status_comissao: cleanStringValue(lead.status_comissao),
        horario_compra: cleanStringValue(lead.horario_compra),

        // Numeric fields
        valor_pago_lead: cleanNumericValue(lead.valor_pago_lead),
        valor_proposta: cleanNumericValue(lead.valor_proposta),
        valor_venda: cleanNumericValue(lead.valor_venda),
        fee: cleanNumericValue(lead.fee),
        fee_total: cleanNumericValue(lead.fee_total),
        comissao_sdr: cleanNumericValue(lead.comissao_sdr),
        comissao_closer: cleanNumericValue(lead.comissao_closer),

        // Boolean fields
        tem_comentario_lbf: Boolean(lead.tem_comentario_lbf),
        conseguiu_contato: Boolean(lead.conseguiu_contato),
        reuniao_agendada: Boolean(lead.reuniao_agendada),
        reuniao_realizada: Boolean(lead.reuniao_realizada),
        venda_via_jasson_co: Boolean(lead.venda_via_jasson_co),

        // DATE FIELDS - ULTRA CAREFUL HANDLING
        data_hora_compra: cleanDateValue(lead.data_hora_compra),
        data_ultimo_contato: cleanDateValue(lead.data_ultimo_contato),
        data_venda: cleanDateValue(lead.data_venda),
        data_fechamento: cleanDateValue(lead.data_fechamento),
      }

      // Copy all fields to cleanedLead
      Object.keys(fields).forEach((key) => {
        cleanedLead[key] = fields[key]
      })

      console.log("🧹 [ULTRA ROBUST] Dados limpos:", cleanedLead)

      // FINAL SAFETY CHECK - scan for any remaining empty strings
      Object.keys(cleanedLead).forEach((key) => {
        if (cleanedLead[key] === "") {
          console.warn(`⚠️ [ULTRA ROBUST] Encontrada string vazia em ${key}, convertendo para null`)
          cleanedLead[key] = null
        }
      })

      console.log("📤 [ULTRA ROBUST] Enviando para Supabase...")
      const { data, error } = await supabase.from("leads").insert([cleanedLead]).select().single()

      if (error) {
        console.error("❌ [ULTRA ROBUST] Erro detalhado do Supabase:", {
          message: error.message,
          details: error.details,
          hint: error.hint,
          code: error.code,
          cleanedData: cleanedLead,
        })
        throw error
      }

      console.log("✅ [ULTRA ROBUST] Lead salvo com sucesso no Supabase:", data)
      return data
    } catch (error) {
      console.error("❌ [ULTRA ROBUST] Erro no Supabase, usando localStorage como fallback:", error)
      return localStorageOperations.create(lead)
    }
  },

  // Update lead
  async update(id: string, lead: Partial<Lead>): Promise<Lead | null> {
    if (!isSupabaseConfigured || !supabase) {
      return localStorageOperations.update(id, lead)
    }

    try {
      // Clean and prepare data for Supabase
      const cleanedLead: any = {
        updated_at: new Date().toISOString(),
      }

      // Only include fields that are being updated
      Object.keys(lead).forEach((key) => {
        const value = (lead as any)[key]

        if (
          key.includes("data_") ||
          key === "data_venda" ||
          key === "data_fechamento" ||
          key === "data_ultimo_contato" ||
          key === "data_hora_compra"
        ) {
          cleanedLead[key] = cleanDateValue(value)
        } else if (key.includes("valor_") || key.includes("fee") || key.includes("comissao_")) {
          cleanedLead[key] = cleanNumericValue(value)
        } else if (typeof value === "string") {
          cleanedLead[key] = cleanStringValue(value)
        } else {
          cleanedLead[key] = value
        }
      })

      // Final safety check for empty strings
      Object.keys(cleanedLead).forEach((key) => {
        if (cleanedLead[key] === "") {
          cleanedLead[key] = null
        }
      })

      const { data, error } = await supabase.from("leads").update(cleanedLead).eq("id", id).select().single()

      if (error) throw error
      return data
    } catch (error) {
      console.error("Supabase error, falling back to localStorage:", error)
      return localStorageOperations.update(id, lead)
    }
  },

  // Delete lead
  async delete(id: string): Promise<boolean> {
    if (!isSupabaseConfigured || !supabase) {
      return localStorageOperations.delete(id)
    }

    try {
      const { error } = await supabase.from("leads").delete().eq("id", id)
      if (error) throw error
      return true
    } catch (error) {
      console.error("Supabase error, falling back to localStorage:", error)
      return localStorageOperations.delete(id)
    }
  },

  // Get leads by status
  async getByStatus(status: string): Promise<Lead[]> {
    const allLeads = await this.getAll()
    return allLeads.filter((lead) => lead.status === status)
  },

  // Get leads by SDR
  async getBySdr(sdr: string): Promise<Lead[]> {
    const allLeads = await this.getAll()
    return allLeads.filter((lead) => lead.sdr === sdr)
  },
}
