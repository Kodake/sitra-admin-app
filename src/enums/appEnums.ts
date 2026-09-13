export enum wizardStep {
  Currency = 0,
  Tax = 1,
  Product = 2,
  Warehouse = 3,
  Stock = 4
}

export enum planType {
  free = 1,
  basic = 2,
  premium = 3,
}

export enum identificationType {
  identifier = 1,
  rnc = 2,
  passport = 3,
}

export const identification_data = Object.entries(identificationType)
  .filter(([_, value]) => typeof value === "number")
  .map(([key, value]) => ({ name: key, type: value }));

export enum contactType {
  customer = 1,
  provider = 2,
  biller = 3,
}

export const contact_data = Object.entries(contactType)
  .filter(([_, value]) => typeof value === "number")
  .map(([key, value]) => ({ name: key, type: value }));

export enum pricingType {
  value = 1,
  percentage = 2,
}

export const pricing_data = Object.entries(pricingType)
  .filter(([_, value]) => typeof value === "number")
  .map(([key, value]) => ({ name: key, type: value }));

export enum statusType {
  all = 0,
  deactivate = 1,
  activate = 2,
}

export enum transferStatus {
  transit = 1,
  received = 2,
  cancelled = 3,
}

export const transfer_data = Object.entries(transferStatus)
  .filter(([_, value]) => typeof value === "number")
  .map(([key, value]) => ({ name: key, type: value }));

export enum itemType {
  product = 1,
  service = 2,
  combo = 3,
}

export enum documentType {
  facturaDeVenta = 1,
  notaDeCreditoDebito = 2,
  reciboDeCaja = 3,
  gastos = 4,
  facturaProveedor = 5,
}

export enum transactionType {
  cash = 1,
  debit = 2,
  credit = 3,
}

export const transaction_data = Object.entries(transactionType)
  .filter(([_, value]) => typeof value === "number")
  .map(([key, value]) => ({ name: key, type: value }));

export enum accountStatus {
  pendingReceivable = 1,
  pendingPayable = 2,
  partiallyPaid = 3,
  paid = 4,
  overdue = 5,
}

export const account_data = Object.entries(accountStatus)
  .filter(([_, value]) => typeof value === "number")
  .map(([key, value]) => ({ name: key, type: value }));

export enum paymentMethod {
  cash = 1,
  transfer = 2,
  card = 3,
  creditNote = 7
}

export const payment_data = Object.entries(paymentMethod)
  .filter(([_, value]) => typeof value === "number")
  .map(([key, value]) => ({ name: key, type: value }));

export enum invoiceCondition {
  spot = 1,
  credit = 2,
  // draft = 3,
}

export const condition_data = Object.entries(invoiceCondition)
  .filter(([_, value]) => typeof value === "number")
  .map(([key, value]) => ({ name: key, type: value }));

export enum language {
  ES = 1,
  EN = 2,
}

export enum Country {
  AG = "Antigua and Barbuda",
  AR = "Argentina",
  BS = "Bahamas",
  BB = "Barbados",
  BZ = "Belize",
  BO = "Bolivia",
  BR = "Brazil",
  CL = "Chile",
  CO = "Colombia",
  CR = "Costa Rica",
  CU = "Cuba",
  DM = "Dominica",
  DO = "Dominican Republic",
  EC = "Ecuador",
  SV = "El Salvador",
  GD = "Grenada",
  GT = "Guatemala",
  GY = "Guyana",
  HT = "Haiti",
  HN = "Honduras",
  JM = "Jamaica",
  KN = "Saint Kitts and Nevis",
  LC = "Saint Lucia",
  MX = "Mexico",
  NI = "Nicaragua",
  PA = "Panama",
  PY = "Paraguay",
  PE = "Peru",
  VC = "Saint Vincent and the Grenadines",
  SR = "Suriname",
  TT = "Trinidad and Tobago",
  US = "United States",
  UY = "Uruguay",
  VE = "Venezuela",
}

export const countries_data = Object.entries(Country).map(([code, name]) => ({
  code,
  name,
}));



export enum DocumentId {
  FacturaDeVenta = 1,
  NotaDeCreditoDebito = 2,
  ReciboDeCaja = 3,
  Gastos = 4,
  FacturaProveedor = 5,
}

export enum EcfType {
  // Tradicionales (NCF tipo B)
  B01 = 1,   // Factura de Crédito Fiscal
  B02 = 2,   // Factura de Consumo
  B03 = 3,   // Nota de Débito
  B04 = 4,   // Nota de Crédito
  B11 = 11,  // Comprobante de Compras
  B12 = 12,  // Registro Único de Ingresos (RUI)
  B13 = 13,  // Comprobante para Gastos Menores
  B14 = 14,  // Comprobante para Regímenes Especiales
  B15 = 15,  // Comprobante Gubernamental
  B16 = 16,  // Comprobante para Exportaciones
  B17 = 17,  // Comprobante para Pagos al Exterior

  // Electrónicos
  E31 = 31, // Factura de Crédito Fiscal Electrónica
  E32 = 32, // Factura de Consumo Electrónica
  E33 = 33, // Nota de Débito Electrónica
  E34 = 34, // Nota de Crédito Electrónica
  E41 = 41, // Comprobante Electrónico de Compras
  E43 = 43, // Comprobante Electrónico para Gastos Menores
  E44 = 44, // Comprobante Electrónico para Regímenes Especiales
  E45 = 45, // Comprobante Electrónico Gubernamental
  E46 = 46, // Comprobante Electrónico para Exportaciones
  E47 = 47  // Comprobante Electrónico para Pagos al Exterior
}

export enum DocumentName {
  FacturaDeVenta = "Factura de Venta",
  NotaDeCreditoDebito = "Nota de Crédito / Débito",
  ReciboDeCaja = "Recibo de Caja",
  Gastos = "Gastos",
  FacturaProveedor = "Factura Proveedor",
}

export const getDocumentDisplayName = (name: string, isElectronic: boolean): string => {
  if (!isElectronic) return name;
  switch (name) {
    case DocumentName.FacturaDeVenta:
      return "Factura de Venta Electrónica";
    case DocumentName.NotaDeCreditoDebito:
      return "Nota de Crédito / Débito Electrónica";
    case DocumentName.ReciboDeCaja:
      return "Recibo de Caja Electrónica";
    case DocumentName.Gastos:
      return "Gastos Electrónica";
    case DocumentName.FacturaProveedor:
      return "Factura Proveedor Electrónica";
    default:
      return name;
  }
};

// Helper to map Document IDs to their fiscal supports
const documentFiscalSupports: Record<number, { id: string; code: string; description: string }[]> = {
  [DocumentId.FacturaDeVenta]: [
    { id: "31", code: "E31", description: "E31 - Factura de Crédito Fiscal Electrónica" },
    { id: "32", code: "E32", description: "E32 - Factura de Consumo Electrónica" },
    { id: "44", code: "E44", description: "E44 - Comprobante Electrónico para Regímenes Especiales" },
    { id: "45", code: "E45", description: "E45 - Comprobante Electrónico Gubernamental" },
    { id: "46", code: "E46", description: "E46 - Comprobante Electrónico para Exportaciones" },
    { id: "1", code: "B01", description: "B01 - Factura de Crédito Fiscal" },
    { id: "2", code: "B02", description: "B02 - Factura de Consumo" },
    { id: "14", code: "B14", description: "B14 - Comprobante para Regímenes Especiales" },
    { id: "15", code: "B15", description: "B15 - Comprobante Gubernamental" },
    { id: "16", code: "B16", description: "B16 - Comprobante para Exportaciones" },
  ],
  [DocumentId.NotaDeCreditoDebito]: [
    { id: "34", code: "E34", description: "E34 - Nota de Crédito Electrónica" },
    { id: "33", code: "E33", description: "E33 - Nota de Débito Electrónica" },
    { id: "4", code: "B04", description: "B04 - Nota de Crédito" },
    { id: "3", code: "B03", description: "B03 - Nota de Débito" },
  ],
  [DocumentId.Gastos]: [
    { id: "43", code: "E43", description: "E43 - Comprobante Electrónico para Gastos Menores" },
    { id: "47", code: "E47", description: "E47 - Comprobante Electrónico para Pagos al Exterior" },
    { id: "13", code: "B13", description: "B13 - Comprobante para Gastos Menores" },
    { id: "17", code: "B17", description: "B17 - Comprobante para Pagos al Exterior" },
  ],
  [DocumentId.FacturaProveedor]: [
    { id: "41", code: "E41", description: "E41 - Comprobante Electrónico de Compras" },
    { id: "11", code: "B11", description: "B11 - Comprobante de Compras" },
  ],
};

export const documents_data = [
  {
    id: String(DocumentId.FacturaDeVenta),
    name: DocumentName.FacturaDeVenta,
    fiscalSupports: documentFiscalSupports[DocumentId.FacturaDeVenta]
  },
  {
    id: String(DocumentId.NotaDeCreditoDebito),
    name: DocumentName.NotaDeCreditoDebito,
    fiscalSupports: documentFiscalSupports[DocumentId.NotaDeCreditoDebito]
  },
  {
    id: String(DocumentId.Gastos),
    name: DocumentName.Gastos,
    fiscalSupports: documentFiscalSupports[DocumentId.Gastos]
  },
  {
    id: String(DocumentId.FacturaProveedor),
    name: DocumentName.FacturaProveedor,
    fiscalSupports: documentFiscalSupports[DocumentId.FacturaProveedor]
  }
];

export enum UnitMeasure {
  BARR = 1, // Barril
  BOL = 2, // Bolsa
  BOT = 3, // Bote
  BULTO = 4, // Bulto
  BOTELLA = 5, // Botella
  CAJ = 6, // Caja
  CAJETILLA = 7, // Cajetilla
  CM = 8, // Centímetro
  CIL = 9, // Cilindro
  CONJ = 10, // Conjunto
  CONT = 11, // Contenedor
  DIA = 12, // Día
  DOC = 13, // Docena
  FARD = 14, // Fardo
  GL = 15, // Galón
  GRAD = 16, // Grado
  GR = 17, // Gramo
  GRAN = 18, // Granel
  HOR = 19, // Hora
  HUAC = 20, // Huacal
  KG = 21, // Kilogramo
  KWH = 22, // Kilovatio Hora
  LB = 23, // Libra
  LITRO = 24, // Litro
  LOT = 25, // Lote
  M = 26, // Metro
  M2 = 27, // Metro Cuadrado
  M3 = 28, // Metro Cúbico
  MMBTU = 29, // Millones de Unidades Térmicas
  MIN = 30, // Minuto
  PAQ = 31, // Paquete
  PAR = 32, // Par
  PIE = 33, // Pie
  PZA = 34, // Pieza
  ROL = 35, // Rollo
  SOBR = 36, // Sobre
  SEG = 37, // Segundo
  TANQUE = 38, // Tanque
  TONE = 39, // Tonelada
  TUB = 40, // Tubo
  YD = 41, // Yarda
  YD2 = 42, // Yarda Cuadrada
  UND = 43, // Unidad
  EA = 44, // Elemento
  MILLAR = 45, // Millar
  SAC = 46, // Saco
  LAT = 47, // Lata
  DIS = 48, // Display
  BID = 49, // Bidón
  RAC = 50, // Ración
  Q = 51, // Quintal
  GRT = 52, // Toneladas de registro bruto
  P2 = 53, // Pie Cuadrado
  PAX = 54, // Pasajero
  PULG = 55, // Pulgada
  STAY = 56, // Parqueo Barcos En Muelle
  BDJ = 57, // Bandeja
  HA = 58, // Hectárea
  ML = 59, // Mililitro
  MG = 60, // Miligramo
  OZ = 61, // Onza
  OZT = 62 // Onza Troy
}

export const unit_measure_list: { id: string; code: string; description: string }[] = [
  { id: "1", code: "BARR", description: "Barril" },
  { id: "2", code: "BOL", description: "Bolsa" },
  { id: "3", code: "BOT", description: "Bote" },
  { id: "4", code: "BULTO", description: "Bulto" },
  { id: "5", code: "BOTELLA", description: "Botella" },
  { id: "6", code: "CAJ", description: "Caja" },
  { id: "7", code: "CAJETILLA", description: "Cajetilla" },
  { id: "8", code: "CM", description: "Centímetro" },
  { id: "9", code: "CIL", description: "Cilindro" },
  { id: "10", code: "CONJ", description: "Conjunto" },
  { id: "11", code: "CONT", description: "Contenedor" },
  { id: "12", code: "DIA", description: "Día" },
  { id: "13", code: "DOC", description: "Docena" },
  { id: "14", code: "FARD", description: "Fardo" },
  { id: "15", code: "GL", description: "Galón" },
  { id: "16", code: "GRAD", description: "Grado" },
  { id: "17", code: "GR", description: "Gramo" },
  { id: "18", code: "GRAN", description: "Granel" },
  { id: "19", code: "HOR", description: "Hora" },
  { id: "20", code: "HUAC", description: "Huacal" },
  { id: "21", code: "KG", description: "Kilogramo" },
  { id: "22", code: "KWH", description: "Kilovatio Hora" },
  { id: "23", code: "LB", description: "Libra" },
  { id: "24", code: "LITRO", description: "Litro" },
  { id: "25", code: "LOT", description: "Lote" },
  { id: "26", code: "M", description: "Metro" },
  { id: "27", code: "M2", description: "Metro Cuadrado" },
  { id: "28", code: "M3", description: "Metro Cúbico" },
  { id: "29", code: "MMBTU", description: "Millones de Unidades Térmicas" },
  { id: "30", code: "MIN", description: "Minuto" },
  { id: "31", code: "PAQ", description: "Paquete" },
  { id: "32", code: "PAR", description: "Par" },
  { id: "33", code: "PIE", description: "Pie" },
  { id: "34", code: "PZA", description: "Pieza" },
  { id: "35", code: "ROL", description: "Rollo" },
  { id: "36", code: "SOBR", description: "Sobre" },
  { id: "37", code: "SEG", description: "Segundo" },
  { id: "38", code: "TANQUE", description: "Tanque" },
  { id: "39", code: "TONE", description: "Tonelada" },
  { id: "40", code: "TUB", description: "Tubo" },
  { id: "41", code: "YD", description: "Yarda" },
  { id: "42", code: "YD2", description: "Yarda Cuadrada" },
  { id: "43", code: "UND", description: "Unidad" },
  { id: "44", code: "EA", description: "Elemento" },
  { id: "45", code: "MILLAR", description: "Millar" },
  { id: "46", code: "SAC", description: "Saco" },
  { id: "47", code: "LAT", description: "Lata" },
  { id: "48", code: "DIS", description: "Display" },
  { id: "49", code: "BID", description: "Bidón" },
  { id: "50", code: "RAC", description: "Ración" },
  { id: "51", code: "Q", description: "Quintal" },
  { id: "52", code: "GRT", description: "Toneladas de registro bruto" },
  { id: "53", code: "P2", description: "Pie Cuadrado" },
  { id: "54", code: "PAX", description: "Pasajero" },
  { id: "55", code: "PULG", description: "Pulgada" },
  { id: "56", code: "STAY", description: "Parqueo Barcos En Muelle" },
  { id: "57", code: "BDJ", description: "Bandeja" },
  { id: "58", code: "HA", description: "Hectárea" },
  { id: "59", code: "ML", description: "Mililitro" },
  { id: "60", code: "MG", description: "Miligramo" },
  { id: "61", code: "OZ", description: "Onza" },
  { id: "62", code: "OZT", description: "Onza Troy" },
];

export const unit_measure_data = unit_measure_list.map(u => ({
  id: Number(u.id),
  name: u.code,
  description: u.description
}));

export interface Municipality {
  code: string;
  name: string;
}

export const province_municipality_data: Record<string, { province: string, municipalities: Municipality[] }> = {
  "100000": {
    province: "Independencia",
    municipalities: [
      { code: "100100", name: "Municipio Jimaní" },
      { code: "100101", name: "Jimaní (d. M.)." },
      { code: "100102", name: "El Limón (d. M.)." },
      { code: "100103", name: "Boca De Cachón (d. M.)." },
      { code: "100200", name: "Municipio Duvergé" },
      { code: "100201", name: "Duvergé (d. M.)." },
      { code: "100202", name: "Vengan A Ver (d. M.)." },
      { code: "100300", name: "Municipio La Descubierta" },
      { code: "100301", name: "La Descubierta (d. M.)." },
      { code: "100400", name: "Municipio Postrer Río" },
      { code: "100401", name: "Postrer Río (d. M.)." },
      { code: "100402", name: "Guayabal (d. M.)." },
      { code: "100500", name: "Municipio Cristóbal" },
      { code: "100501", name: "Cristóbal (d. M.)." },
      { code: "100502", name: "Batey 8 (d. M.)." },
      { code: "100600", name: "Municipio Mella" },
      { code: "100601", name: "Mella (d. M.)." },
      { code: "100602", name: "La Colonia (d. M.)." },
    ]
  },
  "110000": {
    province: "La Altagracia",
    municipalities: [
      { code: "110100", name: "Municipio Higüey" },
      { code: "110101", name: "Higüey (d. M.)." },
      { code: "110102", name: "Las Lagunas De Nisibón (d. M.)." },
      { code: "110103", name: "La Otra Banda (d. M.)." },
      { code: "110104", name: "Verón Punta Cana (d. M.) (incluye Bávaro)" },
      { code: "110200", name: "Municipio San Rafael Del Yuma" },
      { code: "110201", name: "San Rafael Del Yuma (d. M.)." },
      { code: "110202", name: "Boca De Yuma (d. M.)." },
      { code: "110203", name: "Bayahíbe (d. M.)." },
    ]
  },
  "120000": {
    province: "La Romana",
    municipalities: [
      { code: "120100", name: "Municipio La Romana" },
      { code: "120101", name: "La Romana (d. M.)." },
      { code: "120102", name: "Caleta (d. M.)." },
      { code: "120200", name: "Municipio Guaymate" },
      { code: "120201", name: "Guaymate (d. M.)." },
      { code: "120300", name: "Municipio Villa Hermosa" },
      { code: "120301", name: "Villa Hermosa (d. M.)." },
      { code: "120302", name: "Cumayasa (d. M.)." },
    ]
  },
  "130000": {
    province: "La Vega",
    municipalities: [
      { code: "130100", name: "Municipio La Vega" },
      { code: "130101", name: "La Vega (d. M.)." },
      { code: "130102", name: "Río Verde Arriba (d. M.)." },
      { code: "130103", name: "El Ranchito (d. M.)." },
      { code: "130104", name: "Taveras (d. M.)." },
      { code: "130105", name: "Don Juan Rodríguez (d.m.)" },
      { code: "130200", name: "Municipio Constanza" },
      { code: "130201", name: "Constanza (d. M.)." },
      { code: "130202", name: "Tireo (d. M.)." },
      { code: "130203", name: "La Sabina (d. M.)." },
      { code: "130300", name: "Municipio Jarabacoa" },
      { code: "130301", name: "Jarabacoa (d. M.)." },
      { code: "130302", name: "Buena Vista (d. M.)." },
      { code: "130303", name: "Manabao (d. M.)." },
      { code: "130400", name: "Municipio Jima Abajo" },
      { code: "130401", name: "Jima Abajo (d. M.)." },
      { code: "130402", name: "Rincón (d. M.)." },
    ]
  },
  "140000": {
    province: "María Trinidad Sánchez",
    municipalities: [
      { code: "140100", name: "Municipio Nagua" },
      { code: "140101", name: "Nagua (d. M.)." },
      { code: "140102", name: "San José De Matanzas (d. M.)." },
      { code: "140103", name: "Las Gordas (d. M.)." },
      { code: "140104", name: "Arroyo Al Medio (d. M.)." },
      { code: "140200", name: "Municipio Cabrera" },
      { code: "140201", name: "Cabrera (d. M.)." },
      { code: "140202", name: "Arroyo Salado (d. M.)." },
      { code: "140203", name: "La Entrada (d. M.)." },
      { code: "140300", name: "Municipio El Factor" },
      { code: "140301", name: "El Factor (d. M.)." },
      { code: "140302", name: "El Pozo (d. M.)." },
      { code: "140400", name: "Municipio Río San Juan" },
      { code: "140401", name: "Río San Juan (d. M.)." },
    ]
  },
  "150000": {
    province: "Monte Cristi",
    municipalities: [
      { code: "150100", name: "Municipio Monte Cristi" },
      { code: "150101", name: "Monte Cristi (d. M.)." },
      { code: "150200", name: "Municipio Castañuelas" },
      { code: "150201", name: "Castañuelas (d. M.)." },
      { code: "150202", name: "Palo Verde (d. M.)." },
      { code: "150300", name: "Municipio Guayubín" },
      { code: "150301", name: "Guayubín (d. M.)." },
      { code: "150302", name: "Villa Elisa (d. M.)." },
      { code: "150303", name: "Hatillo Palma (d. M.)." },
      { code: "150304", name: "Cana Chapetón (d. M.)." },
      { code: "150400", name: "Municipio Las Matas De Santa Cruz" },
      { code: "150401", name: "Las Matas De Santa Cruz (d. M.)." },
      { code: "150500", name: "Municipio Pepillo Salcedo" },
      { code: "150501", name: "Pepillo Salcedo (manzanillo)" },
      { code: "150502", name: "Santa María (d. M.)" },
      { code: "150600", name: "Municipio Villa Vásquez" },
      { code: "150601", name: "Villa Vásquez" },
    ]
  },
  "160000": {
    province: "Pedernales",
    municipalities: [
      { code: "160100", name: "Municipio Pedernales" },
      { code: "160101", name: "Pedernales" },
      { code: "160102", name: "José Francisco Peña Gómez (d. M.)." },
      { code: "160200", name: "Municipio Oviedo" },
      { code: "160201", name: "Oviedo" },
      { code: "160202", name: "Juancho (d. M.)." },
    ]
  },
  "170000": {
    province: "Peravia",
    municipalities: [
      { code: "170100", name: "Municipio Baní" },
      { code: "170101", name: "Baní (d. M.)." },
      { code: "170102", name: "Matanzas (d. M.)." },
      { code: "170103", name: "Villa Fundación (d. M.)." },
      { code: "170104", name: "Sabana Buey (d. M.)." },
      { code: "170105", name: "Paya (d. M.)." },
      { code: "170106", name: "Villa Sombrero (d. M.)." },
      { code: "170107", name: "El Carretón (d. M.)." },
      { code: "170108", name: "Catalina (d. M.)." },
      { code: "170109", name: "El Limonal (d. M.)." },
      { code: "170110", name: "Las Barías (d. M.)." },
      { code: "170200", name: "Municipio Nizao" },
      { code: "170201", name: "Nizao" },
      { code: "170202", name: "Pizarrete (d. M.)." },
      { code: "170203", name: "Santana (d. M.)." },
      { code: "170300", name: "Matanzas" },
      { code: "170301", name: "Matanzas" },
    ]
  },
  "180000": {
    province: "Puerto Plata",
    municipalities: [
      { code: "180100", name: "Municipio Puerto Plata" },
      { code: "180101", name: "Puerto Plata (d. M.)." },
      { code: "180102", name: "Yásica Arriba (d. M.)." },
      { code: "180103", name: "Maimón (d. M.)." },
      { code: "180200", name: "Municipio Altamira" },
      { code: "180201", name: "Altamira" },
      { code: "180202", name: "Río Grande (d. M.)." },
      { code: "180300", name: "Municipio Guananico" },
      { code: "180301", name: "Guananico" },
      { code: "180400", name: "Municipio Imbert" },
      { code: "180401", name: "Imbert" },
      { code: "180500", name: "Municipio Los Hidalgos" },
      { code: "180501", name: "Los Hidalgos" },
      { code: "180502", name: "Navas (d. M.)." },
      { code: "180600", name: "Municipio Luperón" },
      { code: "180601", name: "Luperón" },
      { code: "180602", name: "La Isabela (d. M.)." },
      { code: "180603", name: "Belloso (d. M.)." },
      { code: "180604", name: "El Estrecho De Luperón Omar Bross (d. M.)." },
      { code: "180700", name: "Municipio Sosúa" },
      { code: "180701", name: "Sosúa" },
      { code: "180702", name: "Cabarete (d. M.)." },
      { code: "180703", name: "Sabaneta De Yásica (d. M.)." },
      { code: "180800", name: "Municipio Villa Isabela" },
      { code: "180801", name: "Villa Isabela" },
      { code: "180802", name: "Estero Hondo (d. M.)." },
      { code: "180803", name: "La Jaiba (d. M.)." },
      { code: "180804", name: "Gualete (d. M.)." },
      { code: "180900", name: "Municipio Villa Montellano" },
      { code: "180901", name: "Villa Montellano" },
    ]
  },
  "190000": {
    province: "Hermanas Mirabal",
    municipalities: [
      { code: "190100", name: "Municipio Salcedo" },
      { code: "190101", name: "Salcedo" },
      { code: "190102", name: "Jamao Afuera (d. M.)." },
      { code: "190200", name: "Municipio Tenares" },
      { code: "190201", name: "Tenares" },
      { code: "190202", name: "Blanco (d. M.)." },
      { code: "190300", name: "Municipio Villa Tapia" },
      { code: "190301", name: "Villa Tapia" },
    ]
  },
  "200000": {
    province: "Samaná",
    municipalities: [
      { code: "200100", name: "Municipio Samaná" },
      { code: "200101", name: "Samaná" },
      { code: "200102", name: "El Limón  (d. M.)." },
      { code: "200103", name: "Arroyo Barril (d. M.)." },
      { code: "200104", name: "Las Galeras (d. M.)." },
      { code: "200200", name: "Municipio Sánchez" },
      { code: "200201", name: "Sánchez (d. M.)." },
      { code: "200300", name: "Municipio Las Terrenas" },
      { code: "200301", name: "Las Terrenas" },
    ]
  },
  "210000": {
    province: "San Cristóbal",
    municipalities: [
      { code: "210100", name: "Municipio San Cristóbal" },
      { code: "210101", name: "San Cristóbal (d. M.)." },
      { code: "210102", name: "Hato Damas (d. M.)." },
      { code: "210103", name: "Hatillo (d. M.)." },
      { code: "210200", name: "Municipio Sabana Grande De Palenque" },
      { code: "210201", name: "Sabana Grande De Palenque (d. M.)." },
      { code: "210300", name: "Municipio Bajos De Haina" },
      { code: "210301", name: "Bajos De Haina" },
      { code: "210302", name: "El Carril (d. M.)." },
      { code: "210303", name: "Quita Sueño (d. M.)." },
      { code: "210400", name: "Municipio Cambita Garabitos" },
      { code: "210401", name: "Cambita Garabitos" },
      { code: "210402", name: "Cambita El Pueblecito (d. M.)." },
      { code: "210500", name: "Municipio Villa Altagracia" },
      { code: "210501", name: "Villa Altagracia" },
      { code: "210502", name: "San José Del Puerto (d. M.)." },
      { code: "210503", name: "Medina (d. M.)." },
      { code: "210504", name: "La Cuchilla (d. M.)." },
      { code: "210600", name: "Municipio Yaguate" },
      { code: "210601", name: "Yaguate (d. M.)." },
      { code: "210602", name: "Doña Ana (d. M.)" },
      { code: "210700", name: "Municipio San Gregorio De Nigua" },
      { code: "210701", name: "San Gregorio De Nigua" },
      { code: "210800", name: "Municipio Los Cacaos" },
      { code: "210801", name: "Los Cacaos (d. M.)." },
    ]
  },
  "220000": {
    province: "San Juan",
    municipalities: [
      { code: "220100", name: "Municipio San Juan" },
      { code: "220101", name: "San Juan" },
      { code: "220102", name: "Pedro Corto (d. M.)." },
      { code: "220103", name: "Sabaneta (d. M.)." },
      { code: "220104", name: "Sabana Alta (d. M.)." },
      { code: "220105", name: "El Rosario (d. M.)." },
      { code: "220106", name: "Hato Del Padre (d. M.)." },
      { code: "220107", name: "Guanito (d. M.)." },
      { code: "220108", name: "La Jagua (d. M.)." },
      { code: "220109", name: "Las Maguanas-hato Nuevo (d. M.)." },
      { code: "220110", name: "Las Charcas De María Nova (d. M.)." },
      { code: "220111", name: "Las Zanjas (d. M.)" },
      { code: "220200", name: "Municipio Bohechío" },
      { code: "220201", name: "Bohechío" },
      { code: "220202", name: "Arroyo Cano (d. M.)." },
      { code: "220203", name: "Yaque (d. M.)." },
      { code: "220300", name: "Municipio El Cercado" },
      { code: "220301", name: "El Cercado" },
      { code: "220302", name: "Derrumbadero (d. M.)" },
      { code: "220303", name: "Batista (d. M.)" },
      { code: "220400", name: "Municipio Juan De Herrera" },
      { code: "220401", name: "Juan De Herrera" },
      { code: "220402", name: "Jínova (d. M.)." },
      { code: "220500", name: "Municipio Las Matas De Farfán" },
      { code: "220501", name: "Las Matas De Farfán" },
      { code: "220502", name: "Matayaya (d. M.)." },
      { code: "220503", name: "Carrera De Yeguas (d. M.)." },
      { code: "220600", name: "Municipio Vallejuelo" },
      { code: "220601", name: "Vallejuelo" },
      { code: "220602", name: "Jorjillo (d. M.)." },
    ]
  },
  "230000": {
    province: "San Pedro De Macorís",
    municipalities: [
      { code: "230100", name: "Municipio San Pedro De Macorís" },
      { code: "230101", name: "San Pedro De Macorís" },
      { code: "230200", name: "Municipio Los Llanos" },
      { code: "230201", name: "Los Llanos" },
      { code: "230202", name: "El Puerto (d. M.)." },
      { code: "230203", name: "Gautier (d. M.)." },
      { code: "230300", name: "Municipio Ramón Santana" },
      { code: "230301", name: "Ramón Santana" },
      { code: "230400", name: "Municipio Consuelo" },
      { code: "230401", name: "Consuelo" },
      { code: "230500", name: "Municipio Quisqueya" },
      { code: "230501", name: "Quisqueya" },
      { code: "230600", name: "Municipio Guayacanes" },
      { code: "230601", name: "Guayacanes" },
    ]
  },
  "240000": {
    province: "Sanchez Ramírez",
    municipalities: [
      { code: "240100", name: "Municipio Cotuí" },
      { code: "240101", name: "Cotuí" },
      { code: "240102", name: "Quita Sueño (d. M.)." },
      { code: "240103", name: "Caballero (d. M.)." },
      { code: "240104", name: "Comedero Arriba (d. M.)." },
      { code: "240105", name: "Platanal  (d. M.)." },
      { code: "240106", name: "Zambrana Abajo" },
      { code: "240200", name: "Municipio Cevicos" },
      { code: "240201", name: "Cevicos" },
      { code: "240202", name: "La Cueva (d. M.)." },
      { code: "240300", name: "Municipio Fantino" },
      { code: "240301", name: "Fantino" },
      { code: "240400", name: "Municipio La Mata" },
      { code: "240401", name: "La Mata" },
      { code: "240402", name: "La Bija (d. M.)." },
      { code: "240403", name: "Angelina (d. M.)." },
      { code: "240404", name: "Hernando Alonzo (d. M.)." },
    ]
  },
  "250000": {
    province: "Santiago",
    municipalities: [
      { code: "250100", name: "Municipio Santiago" },
      { code: "250101", name: "Santiago" },
      { code: "250102", name: "Pedro García (d. M.)." },
      { code: "250104", name: "Baitoa (d. M.)." },
      { code: "250105", name: "La Canela (d. M.)." },
      { code: "250106", name: "San Francisco De Jacagua (d. M.)." },
      { code: "250107", name: "Hato Del Yaque (d. M.)." },
      { code: "250200", name: "Municipio Bisonó" },
      { code: "250201", name: "Villa Bisonó (navarrete) (d. M.)." },
      { code: "250300", name: "Municipio Jánico" },
      { code: "250301", name: "Jánico" },
      { code: "250302", name: "Juncalito (d. M.)." },
      { code: "250303", name: "El Caimito (d. M.)." },
      { code: "250400", name: "Municipio Licey Al Medio" },
      { code: "250401", name: "Licey Al Medio" },
      { code: "250402", name: "Las Palomas (d. M.)." },
      { code: "250500", name: "Municipio San José De Las Matas" },
      { code: "250501", name: "San José De Las Matas" },
      { code: "250502", name: "El Rubio (d. M.)." },
      { code: "250503", name: "La Cuesta (d. M.)." },
      { code: "250504", name: "Las Placetas (d. M.)." },
      { code: "250600", name: "Municipio Tamboril" },
      { code: "250601", name: "Tamboril" },
      { code: "250602", name: "Canca La Piedra (d. M.)." },
      { code: "250700", name: "Municipio Villa González" },
      { code: "250701", name: "Villa González" },
      { code: "250702", name: "Palmar Arriba (d. M.)." },
      { code: "250703", name: "El Limón (d. M.)." },
      { code: "250800", name: "Municipio Puñal" },
      { code: "250801", name: "Puñal" },
      { code: "250802", name: "Guayabal (d. M.)." },
      { code: "250803", name: "Canabacoa (d. M.)." },
      { code: "250900", name: "Municipio Sabana Iglesia" },
      { code: "250901", name: "Sabana Iglesia" },
      { code: "251000", name: "Baitoa" },
      { code: "251001", name: "Baitoa" },
    ]
  },
  "260000": {
    province: "Santiago Rodríguez",
    municipalities: [
      { code: "260100", name: "Municipio San Ignacio De Sabaneta" },
      { code: "260101", name: "San Ignacio De Sabaneta (d. M.)." },
      { code: "260200", name: "Municipio Villa Los Almácigos" },
      { code: "260201", name: "Villa Los Almácigos (d. M.)." },
      { code: "260300", name: "Municipio Monción" },
      { code: "260301", name: "Monción (d. M.)." },
    ]
  },
  "270000": {
    province: "Valverde",
    municipalities: [
      { code: "270100", name: "Municipio Mao" },
      { code: "270101", name: "Mao (d. M.)." },
      { code: "270102", name: "Amina (d. M.)." },
      { code: "270103", name: "Jaibón (pueblo Nuevo) (d. M.)." },
      { code: "270104", name: "Guatapanal (d. M.)." },
      { code: "270200", name: "Municipio Esperanza" },
      { code: "270201", name: "Esperanza" },
      { code: "270202", name: "Maizal (d. M.)." },
      { code: "270203", name: "Jicomé (d. M.)." },
      { code: "270204", name: "Boca De Mao (d. M.)." },
      { code: "270205", name: "Paradero (d. M.)." },
      { code: "270300", name: "Municipio Laguna Salada" },
      { code: "270301", name: "Laguna Salada (d. M.)." },
      { code: "270302", name: "Jaibón (d. M.)." },
      { code: "270303", name: "La Caya (d. M.)." },
      { code: "270304", name: "Cruce De Guayacanes (d. M.)." },
    ]
  },
  "280000": {
    province: "Monseñor Nouel",
    municipalities: [
      { code: "280100", name: "Municipio Bonao" },
      { code: "280101", name: "Bonao (d. M.)." },
      { code: "280102", name: "Sabana Del Puerto (d. M.)." },
      { code: "280103", name: "Juma Bejucal (d. M.)." },
      { code: "280104", name: "Arroyo  Toro - Masipedro (d. M.)." },
      { code: "280105", name: "Jayaco (d. M.)." },
      { code: "280106", name: "La Salvia - Los Quemados (d. M.)." },
      { code: "280200", name: "Municipio Maimón" },
      { code: "280201", name: "Maimón (d. M.)." },
      { code: "280300", name: "Municipio Piedra Blanca" },
      { code: "280301", name: "Piedra Blanca (d. M.)." },
      { code: "280302", name: "Villa De Sonador (d. M.)." },
      { code: "280303", name: "Juan Adrián (d. M.)." },
    ]
  },
  "290000": {
    province: "Monte Plata",
    municipalities: [
      { code: "290100", name: "Municipio Monte Plata" },
      { code: "290101", name: "Monte Plata (d. M.)." },
      { code: "290102", name: "Don Juan (d. M.)." },
      { code: "290103", name: "Chirino (d. M.)." },
      { code: "290104", name: "Boyá (d. M.)." },
      { code: "290200", name: "Municipio Bayaguana" },
      { code: "290201", name: "Bayaguana (d. M.)." },
      { code: "290300", name: "Municipio Sabana Grande De Boyá" },
      { code: "290301", name: "Sabana Grande De Boyá (d. M.)." },
      { code: "290302", name: "Gonzalo (d. M.)." },
      { code: "290303", name: "Majagual (d. M.)." },
      { code: "290400", name: "Municipio Yamasá" },
      { code: "290402", name: "Los Botados (d. M.)." },
      { code: "290403", name: "Mamá Tingó (d. M.)." },
      { code: "290500", name: "Municipio Peralvillo" },
      { code: "290501", name: "Peralvillo (d. M.)." },
    ]
  },
  "300000": {
    province: "Hato Mayor",
    municipalities: [
      { code: "300100", name: "Municipio Hato Mayor" },
      { code: "300101", name: "Hato Mayor (d. M.)." },
      { code: "300102", name: "Yerba Buena (d. M.)." },
      { code: "300103", name: "Mata Palacio (d. M.)." },
      { code: "300104", name: "Guayabo Dulce (d. M.)." },
      { code: "300200", name: "Municipio Sabana De La Mar" },
      { code: "300201", name: "Sabana De La Mar (d. M.)." },
      { code: "300202", name: "Elupina Cordero De Las Cañitas (d. M.)." },
      { code: "300300", name: "Municipio El Valle" },
      { code: "300301", name: "El Valle (d. M.)." },
    ]
  },
  "310000": {
    province: "San José De Ocoa",
    municipalities: [
      { code: "310100", name: "Municipio San José De Ocoa" },
      { code: "310101", name: "San José De Ocoa (d. M.)." },
      { code: "310102", name: "La Ciénaga (d. M.)." },
      { code: "310103", name: "Nizao - Las Auyamas (d. M.)." },
      { code: "310104", name: "El Pinar (d. M.)." },
      { code: "310105", name: "El Naranjal (d. M.)." },
      { code: "310200", name: "Municipio Sabana Larga" },
      { code: "310201", name: "Sabana Larga (d. M.)." },
      { code: "310300", name: "Municipio Rancho Arriba" },
      { code: "310301", name: "Rancho Arriba (d. M.)." },
    ]
  },
  "320000": {
    province: "Santo Domingo",
    municipalities: [
      { code: "320100", name: "Municipio Santo Domingo Este" },
      { code: "320101", name: "Santo Domingo Este (d. M.)." },
      { code: "320102", name: "San Luis (d. M.)." },
      { code: "320200", name: "Municipio Santo Domingo Oeste" },
      { code: "320201", name: "Santo Domingo Oeste (d. M.)." },
      { code: "320300", name: "Municipio Santo Domingo Norte" },
      { code: "320301", name: "Santo Domingo Norte (d. M.)." },
      { code: "320302", name: "La Victoria (d. M.)." },
      { code: "320400", name: "Municipio Boca Chica" },
      { code: "320401", name: "Boca Chica (d. M.)." },
      { code: "320402", name: "La Caleta (d. M.)." },
      { code: "320500", name: "Municipio San Antonio De Guerra" },
      { code: "320501", name: "San Antonio De Guerra (d. M.)." },
      { code: "320502", name: "Hato Viejo (d. M.)." },
      { code: "320600", name: "Municipio Los Alcarrizos" },
      { code: "320601", name: "Los Alcarrizos (d. M.)." },
      { code: "320602", name: "Palmarejo-villa Linda (d. M.)." },
      { code: "320603", name: "Pantoja (d. M.)." },
      { code: "320700", name: "Municipio Pedro Brand" },
      { code: "320701", name: "Pedro Brand (d. M.)." },
      { code: "320702", name: "La Guáyiga (d. M.)." },
      { code: "320703", name: "La Cuaba (d. M.)." },
    ]
  },
  "010000": {
    province: "Distrito Nacional",
    municipalities: [
      { code: "010100", name: "Municipio Santo Domingo De Guzmán" },
      { code: "010101", name: "Santo Domingo De Guzmán (d. M.)." },
    ]
  },
  "020000": {
    province: "Azua",
    municipalities: [
      { code: "020100", name: "Municipio Azua" },
      { code: "020101", name: "Azua (d. M.)." },
      { code: "020102", name: "Barro Arriba (d. M.)." },
      { code: "020103", name: "Las Barías-la Estancia (d. M.)." },
      { code: "020104", name: "Los Jovillos (d. M.)." },
      { code: "020105", name: "Puerto Viejo (d. M.)." },
      { code: "020106", name: "Barreras (d. M.)." },
      { code: "020107", name: "Doña Emma Balaguer Viuda Vallejo (d. M.)." },
      { code: "020108", name: "Clavellina (d. M.)." },
      { code: "020109", name: "Las Lomas (d. M.)." },
      { code: "020200", name: "Municipio Las Charcas" },
      { code: "020201", name: "Las Charcas (d. M.)." },
      { code: "020202", name: "Palmar De Ocoa (d. M.)." },
      { code: "020300", name: "Municipio Las Yayas De Viajama" },
      { code: "020301", name: "Las Yayas De Viajama (d. M.)." },
      { code: "020302", name: "Villarpando (d. M.)." },
      { code: "020303", name: "Hato Nuevo Cortés (d. M.)." },
      { code: "020400", name: "Municipio Padre Las Casas" },
      { code: "020401", name: "Padre Las Casas (d. M.)." },
      { code: "020402", name: "Las Lagunas (d. M.)." },
      { code: "020403", name: "La Siembra (d. M.)." },
      { code: "020404", name: "Monte Bonito (d. M.)." },
      { code: "020405", name: "Los Fríos (d. M.)." },
      { code: "020500", name: "Municipio Peralta" },
      { code: "020501", name: "Peralta (d. M.)." },
      { code: "020600", name: "Municipio Sabana Yegua" },
      { code: "020601", name: "Sabana Yegua (d. M.)." },
      { code: "020602", name: "Proyecto 4 (d. M.)." },
      { code: "020603", name: "Ganadero (d. M.)." },
      { code: "020604", name: "Proyecto 2-c (d. M.)." },
      { code: "020700", name: "Municipio Pueblo Viejo" },
      { code: "020701", name: "Pueblo Viejo (d. M.)." },
      { code: "020702", name: "El Rosario (d. M.)." },
      { code: "020800", name: "Municipio Tábara Arriba" },
      { code: "020801", name: "Tábara Arriba (d. M.)." },
      { code: "020802", name: "Tábara Abajo (d. M.)." },
      { code: "020803", name: "Amiama Gómez (d. M.)." },
      { code: "020804", name: "Los Toros (d. M.)." },
      { code: "020900", name: "Municipio Guayabal" },
      { code: "020901", name: "Guayabal (d. M.)." },
      { code: "021000", name: "Municipio Estebanía" },
      { code: "021001", name: "Estebanía (d. M.)." },
    ]
  },
  "030000": {
    province: "Bahoruco",
    municipalities: [
      { code: "030001", name: "Municipio Neiba" },
      { code: "030101", name: "Neiba (d. M.)." },
      { code: "030102", name: "El Palmar  (d. M.)." },
      { code: "030200", name: "Municipio Galván" },
      { code: "030201", name: "Galván (d. M.)." },
      { code: "030202", name: "El Salado (d. M.)." },
      { code: "030300", name: "Municipio Tamayo" },
      { code: "030301", name: "Tamayo (d. M.)." },
      { code: "030302", name: "Uvilla (d. M.)." },
      { code: "030303", name: "Santana (d. M.)." },
      { code: "030304", name: "Monserrate (montserrat) (d. M.)." },
      { code: "030305", name: "Cabeza De Toro (d. M.)." },
      { code: "030306", name: "Mena (d. M.)." },
      { code: "030307", name: "Santa Bárbara El 6 (d. M.)." },
      { code: "030400", name: "Municipio Villa Jaragua" },
      { code: "030401", name: "Villa Jaragua (d. M.)." },
      { code: "030500", name: "Municipio Los Ríos" },
      { code: "030501", name: "Los Ríos (d. M.)." },
      { code: "030502", name: "Las Clavellinas (d. M.)." },
    ]
  },
  "040000": {
    province: "Barahona",
    municipalities: [
      { code: "040100", name: "Municipio Barahona" },
      { code: "040101", name: "Barahona (d. M.)." },
      { code: "040102", name: "El Cachón (d. M.)." },
      { code: "040103", name: "La Guázara (d. M.)." },
      { code: "040104", name: "Villa Central (d. M.)." },
      { code: "040200", name: "Municipio Cabral" },
      { code: "040201", name: "Cabral (d. M.)." },
      { code: "040300", name: "Municipio Enriquillo" },
      { code: "040301", name: "Enriquillo (d. M.)." },
      { code: "040302", name: "Arroyo Dulce (d. M.)." },
      { code: "040400", name: "Municipio Paraíso" },
      { code: "040401", name: "Paraíso (d. M.)." },
      { code: "040402", name: "Los Patos (d. M.)." },
      { code: "040500", name: "Municipio Vicente Noble" },
      { code: "040501", name: "Vicente Noble (d. M.)." },
      { code: "040502", name: "Canoa (d. M.)." },
      { code: "040503", name: "Quita Coraza (d. M.)." },
      { code: "040504", name: "Fondo Negro (d. M.)." },
      { code: "040600", name: "Municipio El Peñón" },
      { code: "040601", name: "El Peñón (d. M.)." },
      { code: "040700", name: "Municipio La Ciénaga" },
      { code: "040701", name: "La Ciénaga (d. M.)." },
      { code: "040702", name: "Bahoruco (d. M.)." },
      { code: "040800", name: "Municipio Fundación" },
      { code: "040801", name: "Fundación (d. M.)." },
      { code: "040802", name: "Pescadería (d. M.)." },
      { code: "040900", name: "Municipio Las Salinas" },
      { code: "040901", name: "Las Salinas (d. M.)." },
      { code: "041000", name: "Municipio Polo" },
      { code: "041001", name: "Polo (d. M.)." },
      { code: "041100", name: "Municipio Jaquimeyes" },
      { code: "041101", name: "Jaquimeyes (d. M.)." },
      { code: "041102", name: "Palo Alto (d. M.)." },
    ]
  },
  "050000": {
    province: "Dajabón",
    municipalities: [
      { code: "050100", name: "Municipio Dajabón" },
      { code: "050101", name: "Dajabón (d. M.)." },
      { code: "050102", name: "Cañongo (d. M.)." },
      { code: "050200", name: "Municipio Loma De Cabrera" },
      { code: "050201", name: "Loma De Cabrera (d. M.)." },
      { code: "050202", name: "Capotillo (d. M.)." },
      { code: "050203", name: "Santiago De La Cruz (d. M.)." },
      { code: "050300", name: "Municipio Partido" },
      { code: "050301", name: "Partido (d. M.)." },
      { code: "050400", name: "Municipio Restauración" },
      { code: "050401", name: "Restauración (d. M.)." },
      { code: "050500", name: "Municipio El Pino" },
      { code: "050501", name: "El Pino (d. M.)." },
      { code: "050502", name: "Manuel Bueno (d. M.)." },
    ]
  },
  "060000": {
    province: "Duarte",
    municipalities: [
      { code: "060100", name: "Municipio San Francisco De Macorís" },
      { code: "060101", name: "San Francisco De Macorís (d. M.)." },
      { code: "060102", name: "La Peña (d. M.)." },
      { code: "060103", name: "Cenoví (d. M.)." },
      { code: "060104", name: "Jaya (d. M.)." },
      { code: "060105", name: "Presidente Don Antonio Guzmán Fernández (d. M.)." },
      { code: "060200", name: "Municipio Arenoso" },
      { code: "060201", name: "Arenoso (d. M.)." },
      { code: "060202", name: "Las Coles (d. M.)." },
      { code: "060203", name: "El Aguacate (d. M.)." },
      { code: "060300", name: "Municipio Castillo" },
      { code: "060301", name: "Castillo (d. M.)." },
      { code: "060400", name: "Municipio Pimentel" },
      { code: "060401", name: "Pimentel (d. M.)." },
      { code: "060500", name: "Municipio Villa Riva" },
      { code: "060501", name: "Villa Riva (d. M.)." },
      { code: "060502", name: "Agua Santa Del Yuna  (d. M.)." },
      { code: "060503", name: "Cristo Rey De Guaraguao (d. M.)." },
      { code: "060504", name: "Las Taranas (d. M.)." },
      { code: "060505", name: "Barraquito (d. M.)." },
      { code: "060600", name: "Municipio Las Guáranas" },
      { code: "060601", name: "Las Guáranas (d. M.)." },
      { code: "060700", name: "Municipio Eugenio María De Hostos" },
      { code: "060701", name: "Eugenio María De Hostos (d. M.)." },
      { code: "060702", name: "Sabana Grande (d. M.)." },
    ]
  },
  "070000": {
    province: "Elías Piña",
    municipalities: [
      { code: "070100", name: "Municipio Comendador" },
      { code: "070101", name: "Comendador (d. M.)." },
      { code: "070102", name: "Sabana Larga (d. M.)." },
      { code: "070103", name: "Guayabo  (d. M.)." },
      { code: "070200", name: "Municipio Bánica" },
      { code: "070201", name: "Bánica (d. M.)." },
      { code: "070202", name: "Sabana Cruz (d. M.)." },
      { code: "070203", name: "Sabana Higüero (d. M.)." },
      { code: "070300", name: "Municipio El Llano" },
      { code: "070301", name: "El Llano (d. M.)." },
      { code: "070302", name: "Guanito (d. M.)." },
      { code: "070400", name: "Municipio Hondo Valle" },
      { code: "070401", name: "Hondo Valle (d. M.)." },
      { code: "070402", name: "Rancho De La Guardia (d. M.)." },
      { code: "070500", name: "Municipio Pedro Santana" },
      { code: "070501", name: "Pedro Santana (d. M.)." },
      { code: "070502", name: "Río Limpio (d. M.)." },
      { code: "070600", name: "Municipio Juan Santiago" },
      { code: "070601", name: "Juan Santiago (d. M.)." },
    ]
  },
  "080000": {
    province: "El Seibo",
    municipalities: [
      { code: "080100", name: "Municipio El Seibo" },
      { code: "080101", name: "El Seibo (d. M.)." },
      { code: "080102", name: "Pedro Sánchez (d. M.)." },
      { code: "080103", name: "San Francisco-vicentillo (d. M.)." },
      { code: "080104", name: "Santa Lucía (d. M.)." },
      { code: "080200", name: "Municipio Miches" },
      { code: "080201", name: "Miches (d. M.)." },
      { code: "080202", name: "El Cedro (d. M.)." },
      { code: "080203", name: "La Gina (d. M.)." },
    ]
  },
  "090000": {
    province: "Espaillat",
    municipalities: [
      { code: "090100", name: "Municipio Moca" },
      { code: "090101", name: "Moca (d. M.)." },
      { code: "090102", name: "José Contreras (d. M.)." },
      { code: "090103", name: "San Víctor (d. M.)." },
      { code: "090104", name: "Juan López (d. M.)." },
      { code: "090105", name: "Las Lagunas (d. M.)." },
      { code: "090106", name: "Canca La Reyna  (d. M.)." },
      { code: "090107", name: "El Higüerito (d. M.)." },
      { code: "090108", name: "Monte De La Jagua (d. M.)." },
      { code: "090109", name: "La Ortega (d. M.)." },
      { code: "090200", name: "Municipio Cayetano Germosén" },
      { code: "090201", name: "Cayetano Germosén (d. M.)." },
      { code: "090300", name: "Municipio Gaspar Hernández" },
      { code: "090301", name: "Gaspar Hernández (d. M.)." },
      { code: "090302", name: "Joba Arriba (d. M.)." },
      { code: "090303", name: "Veragua (d. M.)." },
      { code: "090304", name: "Villa Magante (d. M.)." },
      { code: "090400", name: "Municipio Jamao Al Norte" },
      { code: "090401", name: "Jamao Al Norte (d. M.)." },
    ]
  },
};

/**
 * Obtiene los municipios asociados a una provincia.
 * @param provinceCode Los dos primeros dígitos (ej. "02")
 */
export const getMunicipalitiesByProvince = (provinceCode: string): Municipality[] => {
  return province_municipality_data[provinceCode]?.municipalities || [];
};

export const province_data = Object.entries(province_municipality_data).map(([code, data]) => ({
  code,
  name: data.province,
}));

export enum TaxType {
  itbis = 1,
  isc = 2,
  otro = 3,
  exento = 4,
  noFacturable = 5,
  isr = 6
}

export const taxType_data = [
  { id: TaxType.itbis, name: "ITBIS" },
  { id: TaxType.isc, name: "ISC" },
  { id: TaxType.otro, name: "Otro" },
  { id: TaxType.exento, name: "Exento" },
  { id: TaxType.noFacturable, name: "No Facturable" },
  { id: TaxType.isr, name: "ISR" }
];

export enum IncomeType {
  saleOfGoods = "01",
  provisionOfServices = "02",
  rentalOfGoods = "03",
  saleOfSecurities = "04",
  interests = "05",
  dividends = "06"
}

export const getIncomeTypeData = () => {
  return [
    { id: IncomeType.saleOfGoods, name: "Ingresos por Enajenación de Bienes" },
    { id: IncomeType.provisionOfServices, name: "Ingresos por Prestación de Servicios" },
    { id: IncomeType.rentalOfGoods, name: "Ingresos por Arrendamiento de Bienes" },
    { id: IncomeType.saleOfSecurities, name: "Ingresos por Enajenación de Valores" },
    { id: IncomeType.interests, name: "Ingresos por Intereses" },
    { id: IncomeType.dividends, name: "Ingresos por Dividendos" }
  ];
};

export enum ModificationCode {
  anula = "1",
  corrigeTexto = "2",
  corrigeMontos = "3",
  reemplazoContingencia = "4",
  referenciaFacturaConsumo = "5"
}

export const modificationCodeData = [
  { id: "1", name: "Anula el NCF modificado" },
  { id: "2", name: "Corrige Texto del Comprobante Fiscal modificado" },
  { id: "3", name: "Corrige montos del NCF modificado" },
  { id: "4", name: "Reemplazo NCF emitido en contingencia" },
  { id: "5", name: "Referencia Factura Consumo Electrónica" }
];