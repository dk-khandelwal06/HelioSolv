export type PanelCondition = 'intact' | 'minor_cracks' | 'severe_cracks' | 'delaminated' | 'eva_yellowed' | 'cell_shattered' | 'busbar_corroded';

export type TriageDecisionOutcome = 'refurbish_reuse' | 'des_chemical_leaching' | 'further_testing_required' | 'manual_review_pending';

export interface BoundingBox {
  id: string;
  box: [number, number, number, number]; // [top, left, width, height] in percentages
  label: 'Micro-Crack' | 'EVA Yellowing' | 'Busbar Corrosion' | 'Cell Shatter' | 'Potential Induced Degradation' | 'Delamination';
  confidence: number;
  severity: 'low' | 'medium' | 'high';
  notes?: string;
}

export interface ElectricalTestData {
  vocVolts?: number; // Open circuit voltage
  iscAmps?: number; // Short circuit current
  pmaxWatts?: number; // Maximum power
  fillFactor?: number; // FF %
  insulationResistanceMOhm?: number; // Insulation resistance in M-Ohms
  efficiencyPercentage?: number; // Remaining efficiency %
  testerNotes?: string;
  testedAt?: string;
  testedBy?: string;
}

export interface PanelRecord {
  id: string;
  panelCode: string; // e.g. "HS-BHD-2026-081"
  manufacturer?: string;
  model?: string;
  approxAgeYears: number;
  ratedPowerWatts: number;
  dimensions?: string; // e.g. "1960 x 992 x 40 mm"
  location: string; // e.g. "Bhadla Solar Park, Sec 4"
  sourcePartner: string; // e.g. "Rajasthan Green Energy Corp"
  visualCondition: PanelCondition;
  knownDefects: string[];
  imageUrl: string;
  aiScreeningDone: boolean;
  aiSuggestedPathway?: TriageDecisionOutcome;
  aiConfidence?: number;
  detectedBoxes?: BoundingBox[];
  electricalTest?: ElectricalTestData;
  finalTriageStatus: TriageDecisionOutcome;
  reviewedBy?: string;
  reviewedAt?: string;
  notes?: string;
  createdAt: string;
  batchId?: string; // If routed to DES batch
}

export type BatchStatus = 'draft' | 'scheduled' | 'in_progress' | 'leaching' | 'electrowinning' | 'awaiting_verification' | 'completed' | 'on_hold';

export type BatchStep = 'intake' | 'disassembly' | 'delamination' | 'des_leaching' | 'electrowinning' | 'completed';

export interface BatchOutputs {
  silverRecoveredGrams: number;
  siliconWafersRecoveredKg: number;
  glassCulletRecoveredKg: number;
  aluminumScrapKg: number;
  processResiduesKg: number;
  purityGradeAgPct: number; // e.g. 99.9%
}

export interface RecoveryBatch {
  id: string;
  batchCode: string; // e.g. "DES-BATCH-2026-014"
  facilityId: string;
  facilityName: string;
  panelCount: number;
  feedstockMassKg: number;
  // Convenience fields for reactor UI
  weightKg?: number;
  currentStep?: BatchStep;
  temperatureC?: number;
  solidLiquidRatio?: string;
  leachingDurationMinutes?: number;
  solventRecycleCount?: number;
  silverYieldGrams?: number;
  siliconWaferYieldKg?: number;
  panelIds?: string[];
  microPlantId?: string;

  solventComposition: string; // e.g. "Ethaline (Choline Chloride + Ethylene Glycol 1:2 molar)"
  operatingTemperatureC: number; // 80°C
  ultrasonicationFreqKhz?: number; // e.g. 40 kHz
  status: BatchStatus;
  startDate: string;
  completionDate?: string;
  solventRecycleRatePct: number; // e.g. 92%
  measuredOutputs: BatchOutputs;
  cpcbEprCertificateId?: string;
  cpcbCreditsAwarded?: number;
  operatorNotes?: string;
  notes?: string;
  operatorName: string;
  createdAt: string;
}

export type SolvoBatch = RecoveryBatch;

export interface SflLoanDetails {
  loanId: string;
  sanctionedAmountInr: number;
  monthlyEmiInr: number;
  dscrCoverage: number;
  repaidMonths: number;
  tenureMonths: number;
}

export interface Facility {
  id: string;
  name: string;
  code: string;
  location: string;
  state: string;
  capacityKgPerDay: number;
  dailyCapacityKg?: number;
  dailyOperatingHours: number;
  status: 'active' | 'maintenance' | 'standby';
  operationalStatus?: 'online' | 'maintenance' | 'offline' | string;
  responsibleOperator: string;
  operatorName?: string;
  operatorContact: string;
  sflLoanId?: string; // Satin Finserv Green Machinery Loan reference
  sflFinancedDate?: string;
  sflLoan?: SflLoanDetails;
  activeBatchesCount: number;
  totalTonnageProcessed: number;
  cumulativeWasteDivertedTonnes?: number;
  silverRecoveredKg?: number;
  siliconRecoveredKg?: number;
  equipmentUptimePct: number;
}

export type MicroPlant = Facility;

export interface InventoryItem {
  id: string;
  materialType: 'silver_999' | 'intact_silicon' | 'solar_glass' | 'aluminum_frame' | 'process_residue';
  materialName: string;
  quantity: number;
  unit: 'g' | 'kg' | 'tonnes';
  batchSourceCode: string;
  facilityName: string;
  verificationStatus: 'cpcb_verified' | 'lab_certified' | 'pending';
  storageLocation: string; // e.g. "Safe Vault A-04" or "Silo 2"
  lotNumber: string;
  marketValueInr: number;
  dateRecorded: string;
  currentMarketPriceInrPerUnit?: number;
  purityGrade?: string;
  offtakerStatus?: 'allocated' | 'unallocated' | 'dispatched' | string;
  buyerOrganization?: string;
}

export type RecoveredMaterial = InventoryItem;

export interface FinancialScenario {
  dailyFeedstockKg: number;
  annualOperatingDays: number;
  silverPricePerGram: number; // In INR, default ~90
  siliconPricePerKg: number; // In INR, default ~250
  eprCreditPerTonne: number; // In INR, default ~5,000
  solventRegenerationRatePct: number; // default ~90%
  operatingCostPerKg: number; // In INR, default ~20
  capexPerMicroPlant: number; // In INR, default ~18,00,000
  sflLoanInterestRatePct: number; // e.g. 9.5%
}

export interface FinancialMetrics {
  annualInputTonnes: number;
  annualRecoveredSilverKg: number;
  annualRecoveredSiliconTonnes: number;
  annualRevenueInr: number;
  annualOpexInr: number;
  annualOperatingSurplusInr: number;
  grossMarginPct: number;
  costPerTonneInr: number;
  paybackPeriodMonths: number;
  statusQuoLossPerTonneInr: number; // -10,230 INR per tonne
  netAdvantagePerTonneInr: number;
}

export interface EnvironmentalImpactData {
  panelsAssessedTotal: number;
  panelsReusedCount: number;
  panelsRecycledCount: number;
  wasteDivertedTonnes: number;
  totalWasteDivertedKg: number;
  co2eAvoidedTonnes: number; // ~1.5t per tonne recycled
  equivalentTreesPlanted: number;
  toxicAcidAvoidedLitres: number; // 100% elimination of HNO3/HF
  soilLeachingRiskPreventedPoints: number;
  siliconVirginMiningOffsetKg: number;
}

export interface ActivityLog {
  id: string;
  title: string;
  description: string;
  actor: string;
  entityType: 'panel' | 'batch' | 'inventory' | 'facility' | 'compliance';
  entityId: string;
  timestamp: string;
  status: 'info' | 'success' | 'warning' | 'alert';
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: 'microplant_operator' | 'asset_owner' | 'recycler' | 'sustainability_analyst' | 'sfl_financier' | 'admin';
  organization: string;
  facilityId?: string;
  isDemoUser: boolean;
}
