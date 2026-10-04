import { 
  PanelRecord, 
  RecoveryBatch, 
  Facility, 
  InventoryItem, 
  FinancialScenario, 
  FinancialMetrics, 
  EnvironmentalImpactData, 
  ActivityLog, 
  UserProfile 
} from './types';

export const INITIAL_USER: UserProfile = {
  id: 'usr-demo-01',
  name: 'Devendra Rathore',
  email: 'operator@bhadla.heliosolv.com',
  role: 'microplant_operator',
  organization: 'Bhadla Sunbelt Solvo-Recovery MSME',
  facilityId: 'fac-01',
  isDemoUser: true,
};

export const JUDGE_USER: UserProfile = {
  id: 'usr-judge-sfl',
  name: 'SANKALP Jury / Satin Finserv ESG',
  email: 'jury@satinfinserv.com',
  role: 'sfl_financier',
  organization: 'Satin Finserv Limited (NBFC-MFI)',
  isDemoUser: true,
};

export const INITIAL_FACILITIES: Facility[] = [
  {
    id: 'fac-01',
    name: 'Bhadla Sunbelt Micro-Plant #01',
    code: 'HS-FAC-BHD-01',
    location: 'Bhadla Solar Park Periphery, Jodhpur District',
    state: 'Rajasthan',
    capacityKgPerDay: 100,
    dailyCapacityKg: 100,
    dailyOperatingHours: 8,
    status: 'active',
    operationalStatus: 'online',
    responsibleOperator: 'Devendra Rathore (MSME Partner)',
    operatorName: 'Devendra Rathore',
    operatorContact: '+91 98290 XXXXX',
    sflLoanId: 'SFL-GML-2025-0894',
    sflFinancedDate: '2025-11-15',
    sflLoan: {
      loanId: 'SFL-GML-2025-0894',
      sanctionedAmountInr: 1800000,
      monthlyEmiInr: 48150,
      dscrCoverage: 2.33,
      repaidMonths: 10,
      tenureMonths: 36,
    },
    activeBatchesCount: 2,
    totalTonnageProcessed: 28.4,
    cumulativeWasteDivertedTonnes: 28.4,
    silverRecoveredKg: 14.2,
    siliconRecoveredKg: 1704,
    equipmentUptimePct: 98.2,
  },
  {
    id: 'fac-02',
    name: 'Phalodi Circular Tech Hub #02',
    code: 'HS-FAC-PHL-02',
    location: 'Phalodi Industrial Corridor',
    state: 'Rajasthan',
    capacityKgPerDay: 100,
    dailyCapacityKg: 100,
    dailyOperatingHours: 8,
    status: 'active',
    operationalStatus: 'online',
    responsibleOperator: 'Sunita Gehlot',
    operatorName: 'Sunita Gehlot',
    operatorContact: '+91 94141 XXXXX',
    sflLoanId: 'SFL-GML-2026-0120',
    sflFinancedDate: '2026-01-10',
    sflLoan: {
      loanId: 'SFL-GML-2026-0120',
      sanctionedAmountInr: 1800000,
      monthlyEmiInr: 48150,
      dscrCoverage: 2.15,
      repaidMonths: 8,
      tenureMonths: 36,
    },
    activeBatchesCount: 1,
    totalTonnageProcessed: 14.1,
    cumulativeWasteDivertedTonnes: 14.1,
    silverRecoveredKg: 7.1,
    siliconRecoveredKg: 846,
    equipmentUptimePct: 96.5,
  },
  {
    id: 'fac-03',
    name: 'Jodhpur Clean Tech Incubation Lab',
    code: 'HS-FAC-JDP-03',
    location: 'IIT Jodhpur Technology Park',
    state: 'Rajasthan',
    capacityKgPerDay: 25,
    dailyCapacityKg: 25,
    dailyOperatingHours: 6,
    status: 'active',
    operationalStatus: 'maintenance',
    responsibleOperator: 'Prof. Leaching Research Team',
    operatorName: 'Dr. A. Sharma',
    operatorContact: '+91 291 280 XXXX',
    sflLoanId: 'SFL-GRANT-PILOT-01',
    sflFinancedDate: '2025-08-01',
    sflLoan: {
      loanId: 'SFL-GRANT-PILOT-01',
      sanctionedAmountInr: 500000,
      monthlyEmiInr: 14200,
      dscrCoverage: 1.85,
      repaidMonths: 14,
      tenureMonths: 24,
    },
    activeBatchesCount: 1,
    totalTonnageProcessed: 4.8,
    cumulativeWasteDivertedTonnes: 4.8,
    silverRecoveredKg: 2.4,
    siliconRecoveredKg: 288,
    equipmentUptimePct: 99.4,
  }
];

export const INITIAL_PANELS: PanelRecord[] = [
  {
    id: 'pnl-001',
    panelCode: 'HS-BHD-2026-001',
    manufacturer: 'Canadian Solar',
    model: 'CS6U-330P MaxPower',
    approxAgeYears: 8,
    ratedPowerWatts: 330,
    dimensions: '1960 x 992 x 40 mm',
    location: 'Bhadla Solar Park Sector 4',
    sourcePartner: 'Rajasthan Solar Decommissioning EPC',
    visualCondition: 'cell_shattered',
    knownDefects: ['Front Glass Shatter', 'Busbar Delamination', 'Thermal Burn Mark'],
    imageUrl: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=800&q=80',
    aiScreeningDone: true,
    aiSuggestedPathway: 'des_chemical_leaching',
    aiConfidence: 0.95,
    detectedBoxes: [
      {
        id: 'box-1',
        box: [20, 25, 45, 35],
        label: 'Cell Shatter',
        confidence: 0.96,
        severity: 'high',
        notes: 'Massive transverse fracture across silicon wafer. Severe diode burnout.',
      },
      {
        id: 'box-2',
        box: [65, 40, 25, 20],
        label: 'Busbar Corrosion',
        confidence: 0.91,
        severity: 'high',
        notes: 'Silver contact oxidation due to moisture ingress.',
      }
    ],
    electricalTest: {
      vocVolts: 18.2,
      iscAmps: 2.1,
      pmaxWatts: 38.2,
      fillFactor: 32,
      insulationResistanceMOhm: 1.2,
      efficiencyPercentage: 28,
      testedBy: 'D. Rathore',
      testedAt: '2026-09-28T10:30:00Z',
      testerNotes: 'Severe power degradation below 30%. Frame dismantled.',
    },
    finalTriageStatus: 'des_chemical_leaching',
    reviewedBy: 'Devendra Rathore (Operator)',
    reviewedAt: '2026-09-28T11:00:00Z',
    notes: 'Approved for Batch DES-BATCH-2026-014.',
    createdAt: '2026-09-28T09:15:00Z',
    batchId: 'bat-014',
  },
  {
    id: 'pnl-002',
    panelCode: 'HS-BHD-2026-002',
    manufacturer: 'Vikram Solar',
    model: 'Eldora VSP 320',
    approxAgeYears: 6,
    ratedPowerWatts: 320,
    dimensions: '1960 x 990 x 35 mm',
    location: 'Bhadla Solar Park Sector 1',
    sourcePartner: 'Thar Clean Utilities',
    visualCondition: 'eva_yellowed',
    knownDefects: ['EVA Yellowing', 'Minor Snail Trails'],
    imageUrl: 'https://images.unsplash.com/photo-1508873696983-2df5293cb32f?auto=format&fit=crop&w=800&q=80',
    aiScreeningDone: true,
    aiSuggestedPathway: 'refurbish_reuse',
    aiConfidence: 0.92,
    detectedBoxes: [
      {
        id: 'box-1',
        box: [28, 30, 30, 25],
        label: 'EVA Yellowing',
        confidence: 0.92,
        severity: 'low',
        notes: 'Mild UV photodegradation, 88% light transmission retained.',
      }
    ],
    electricalTest: {
      vocVolts: 36.4,
      iscAmps: 8.4,
      pmaxWatts: 252.8,
      fillFactor: 74,
      insulationResistanceMOhm: 240,
      efficiencyPercentage: 79,
      testedBy: 'K. Kushwah (Auditor)',
      testedAt: '2026-09-29T14:10:00Z',
      testerNotes: 'Operating efficiency 79% (>70% threshold). Excellent candidate for rural agricultural water pumps.',
    },
    finalTriageStatus: 'refurbish_reuse',
    reviewedBy: 'K. Kushwah (IIT Jodhpur)',
    reviewedAt: '2026-09-29T15:00:00Z',
    notes: 'Cleaned, recalibrated, and allocated for secondary solar tubewell deployment.',
    createdAt: '2026-09-29T12:00:00Z',
  },
  {
    id: 'pnl-003',
    panelCode: 'HS-BHD-2026-003',
    manufacturer: 'Adani Solar',
    model: 'Eternal 340W Multi',
    approxAgeYears: 7,
    ratedPowerWatts: 340,
    dimensions: '1970 x 995 x 35 mm',
    location: 'Phalodi Solar Corridors',
    sourcePartner: 'Marwar Agro-Solar Project',
    visualCondition: 'severe_cracks',
    knownDefects: ['Multiple Thermal Micro-Cracks', 'Snail Trails'],
    imageUrl: 'https://images.unsplash.com/photo-1545208942-e1c9c916524b?auto=format&fit=crop&w=800&q=80',
    aiScreeningDone: true,
    aiSuggestedPathway: 'des_chemical_leaching',
    aiConfidence: 0.89,
    detectedBoxes: [
      {
        id: 'box-1',
        box: [15, 18, 50, 40],
        label: 'Micro-Crack',
        confidence: 0.91,
        severity: 'high',
        notes: 'Intersecting micro-cracks creating inactive sub-cell islands.',
      }
    ],
    electricalTest: {
      vocVolts: 24.1,
      iscAmps: 4.2,
      pmaxWatts: 101.2,
      fillFactor: 44,
      insulationResistanceMOhm: 8.5,
      efficiencyPercentage: 42,
      testedBy: 'D. Rathore',
      testedAt: '2026-09-30T09:20:00Z',
      testerNotes: 'Severe hot-spots detected under IR thermography.',
    },
    finalTriageStatus: 'des_chemical_leaching',
    reviewedBy: 'Devendra Rathore',
    reviewedAt: '2026-09-30T10:15:00Z',
    notes: 'Queued for DES solvometallurgical silver stripping.',
    createdAt: '2026-09-30T08:30:00Z',
    batchId: 'bat-013',
  },
  {
    id: 'pnl-004',
    panelCode: 'HS-BHD-2026-004',
    manufacturer: 'Waaree Energies',
    model: 'Aditya 335W',
    approxAgeYears: 5,
    ratedPowerWatts: 335,
    dimensions: '1960 x 990 x 40 mm',
    location: 'Jaisalmer Solar Cluster',
    sourcePartner: 'Desert Green Energy',
    visualCondition: 'minor_cracks',
    knownDefects: ['Potential Induced Degradation suspected'],
    imageUrl: 'https://images.unsplash.com/photo-1559302504-64aae6ca6b6f?auto=format&fit=crop&w=800&q=80',
    aiScreeningDone: true,
    aiSuggestedPathway: 'further_testing_required',
    aiConfidence: 0.84,
    detectedBoxes: [
      {
        id: 'box-1',
        box: [40, 35, 30, 28],
        label: 'Potential Induced Degradation',
        confidence: 0.84,
        severity: 'medium',
        notes: 'Sodium migration suspected across negative end strings.',
      }
    ],
    finalTriageStatus: 'further_testing_required',
    notes: 'Awaiting high-voltage anti-PID recovery testing.',
    createdAt: '2026-10-01T11:00:00Z',
  },
  {
    id: 'pnl-005',
    panelCode: 'HS-BHD-2026-005',
    manufacturer: 'Tata Power Solar',
    model: 'TP315 Poly Series',
    approxAgeYears: 9,
    ratedPowerWatts: 315,
    dimensions: '1956 x 992 x 36 mm',
    location: 'Bhadla Phase 2 Extension',
    sourcePartner: 'Rajasthan Renewable Energy Corp (RREC)',
    visualCondition: 'delaminated',
    knownDefects: ['Severe Delamination', 'Broken Front Glass'],
    imageUrl: 'https://images.unsplash.com/photo-1497440001374-f26997328c1b?auto=format&fit=crop&w=800&q=80',
    aiScreeningDone: true,
    aiSuggestedPathway: 'des_chemical_leaching',
    aiConfidence: 0.97,
    detectedBoxes: [
      {
        id: 'box-1',
        box: [10, 10, 75, 60],
        label: 'Cell Shatter',
        confidence: 0.98,
        severity: 'high',
        notes: 'Total front plate spiderweb cracking.',
      }
    ],
    finalTriageStatus: 'des_chemical_leaching',
    notes: 'High silver extraction potential. Silicon wafer fragmentation present.',
    createdAt: '2026-10-02T13:40:00Z',
    batchId: 'bat-012',
  },
  {
    id: 'pnl-006',
    panelCode: 'HS-BHD-2026-006',
    manufacturer: 'Goldi Solar',
    model: 'Goldi 72 GN Poly 325',
    approxAgeYears: 4,
    ratedPowerWatts: 325,
    dimensions: '1960 x 990 x 35 mm',
    location: 'Bikaner Solar Corridor',
    sourcePartner: 'Marwar Agro-Solar Project',
    visualCondition: 'eva_yellowed',
    knownDefects: ['Superficial Dust Abrasion'],
    imageUrl: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&w=800&q=80',
    aiScreeningDone: true,
    aiSuggestedPathway: 'refurbish_reuse',
    aiConfidence: 0.91,
    detectedBoxes: [
      {
        id: 'box-1',
        box: [30, 20, 20, 20],
        label: 'EVA Yellowing',
        confidence: 0.88,
        severity: 'low',
        notes: 'Surface abrasion from desert sandstorms. Glass structurally pristine.',
      }
    ],
    electricalTest: {
      vocVolts: 37.1,
      iscAmps: 8.6,
      pmaxWatts: 268.0,
      fillFactor: 76,
      insulationResistanceMOhm: 310,
      efficiencyPercentage: 82.5,
      testedBy: 'D. Rathore',
      testedAt: '2026-10-02T16:00:00Z',
      testerNotes: 'Measured efficiency >82%. Ready for secondary solar mini-grid.',
    },
    finalTriageStatus: 'refurbish_reuse',
    reviewedBy: 'Devendra Rathore',
    reviewedAt: '2026-10-02T16:45:00Z',
    createdAt: '2026-10-02T15:00:00Z',
  }
];

export const INITIAL_BATCHES: RecoveryBatch[] = [
  {
    id: 'bat-012',
    batchCode: 'DES-BATCH-2026-012',
    facilityId: 'fac-01',
    facilityName: 'Bhadla Sunbelt Micro-Plant #01',
    panelCount: 5,
    feedstockMassKg: 100.0,
    weightKg: 100.0,
    currentStep: 'completed',
    temperatureC: 80.0,
    solidLiquidRatio: '1:10',
    leachingDurationMinutes: 18,
    solventRecycleCount: 4,
    silverYieldGrams: 49.8,
    siliconWaferYieldKg: 6.2,
    solventComposition: 'Ethaline (Choline Chloride + Ethylene Glycol 1:2 molar)',
    operatingTemperatureC: 80.0,
    ultrasonicationFreqKhz: 40,
    status: 'completed',
    startDate: '2026-09-24T08:00:00Z',
    completionDate: '2026-09-25T17:30:00Z',
    solventRecycleRatePct: 93.4,
    measuredOutputs: {
      silverRecoveredGrams: 49.8,
      siliconWafersRecoveredKg: 6.2,
      glassCulletRecoveredKg: 74.0,
      aluminumScrapKg: 18.0,
      processResiduesKg: 2.0,
      purityGradeAgPct: 99.92,
    },
    cpcbEprCertificateId: 'CPCB-EPR-2026-RAJ-4491',
    cpcbCreditsAwarded: 5.0,
    operatorNotes: 'Completed smoothly. Electrowinning yielded gleaming 99.9% pure silver flake deposit. Silicon wafers isolated without micro-chipping.',
    operatorName: 'Devendra Rathore',
    createdAt: '2026-09-24T07:45:00Z',
  },
  {
    id: 'bat-013',
    batchCode: 'DES-BATCH-2026-013',
    facilityId: 'fac-01',
    facilityName: 'Bhadla Sunbelt Micro-Plant #01',
    panelCount: 5,
    feedstockMassKg: 100.0,
    weightKg: 100.0,
    currentStep: 'electrowinning',
    temperatureC: 80.5,
    solidLiquidRatio: '1:10',
    leachingDurationMinutes: 18,
    solventRecycleCount: 3,
    silverYieldGrams: 46.2,
    siliconWaferYieldKg: 5.9,
    solventComposition: 'Ethaline (Choline Chloride + Ethylene Glycol 1:2 molar)',
    operatingTemperatureC: 80.5,
    ultrasonicationFreqKhz: 40,
    status: 'electrowinning',
    startDate: '2026-10-02T09:00:00Z',
    solventRecycleRatePct: 92.1,
    measuredOutputs: {
      silverRecoveredGrams: 46.2, // currently depositing
      siliconWafersRecoveredKg: 5.9,
      glassCulletRecoveredKg: 75.2,
      aluminumScrapKg: 17.5,
      processResiduesKg: 1.8,
      purityGradeAgPct: 99.90,
    },
    operatorNotes: 'Silver dissolution complete in 18 minutes. Current electrowinning cathode voltage stabilized at 2.4V.',
    operatorName: 'Devendra Rathore',
    createdAt: '2026-10-02T08:30:00Z',
  },
  {
    id: 'bat-014',
    batchCode: 'DES-BATCH-2026-014',
    facilityId: 'fac-01',
    facilityName: 'Bhadla Sunbelt Micro-Plant #01',
    panelCount: 6,
    feedstockMassKg: 120.0,
    weightKg: 120.0,
    currentStep: 'des_leaching',
    temperatureC: 79.8,
    solidLiquidRatio: '1:10',
    leachingDurationMinutes: 18,
    solventRecycleCount: 2,
    silverYieldGrams: 58.8,
    siliconWaferYieldKg: 7.2,
    solventComposition: 'Ethaline (Choline Chloride + Ethylene Glycol 1:2 molar)',
    operatingTemperatureC: 79.8,
    ultrasonicationFreqKhz: 40,
    status: 'leaching',
    startDate: '2026-10-03T11:00:00Z',
    solventRecycleRatePct: 91.5,
    measuredOutputs: {
      silverRecoveredGrams: 0,
      siliconWafersRecoveredKg: 0,
      glassCulletRecoveredKg: 88.0,
      aluminumScrapKg: 21.0,
      processResiduesKg: 0,
      purityGradeAgPct: 99.9,
    },
    operatorNotes: 'Cells immersed into 80°C heated Ethaline solvent bath with 40 kHz ultrasonic agitation.',
    operatorName: 'Devendra Rathore',
    createdAt: '2026-10-03T10:15:00Z',
  },
  {
    id: 'bat-015',
    batchCode: 'DES-BATCH-2026-015',
    facilityId: 'fac-02',
    facilityName: 'Phalodi Circular Tech Hub #02',
    panelCount: 4,
    feedstockMassKg: 80.0,
    weightKg: 80.0,
    currentStep: 'intake',
    temperatureC: 80.0,
    solidLiquidRatio: '1:10',
    leachingDurationMinutes: 18,
    solventRecycleCount: 1,
    silverYieldGrams: 39.2,
    siliconWaferYieldKg: 4.8,
    solventComposition: 'Ethaline (Choline Chloride + Ethylene Glycol 1:2 molar)',
    operatingTemperatureC: 80.0,
    ultrasonicationFreqKhz: 40,
    status: 'scheduled',
    startDate: '2026-10-05T08:30:00Z',
    solventRecycleRatePct: 94.0,
    measuredOutputs: {
      silverRecoveredGrams: 0,
      siliconWafersRecoveredKg: 0,
      glassCulletRecoveredKg: 0,
      aluminumScrapKg: 0,
      processResiduesKg: 0,
      purityGradeAgPct: 99.9,
    },
    operatorNotes: 'Scheduled for morning run after EVA delamination step.',
    operatorName: 'Sunita Gehlot',
    createdAt: '2026-10-03T16:00:00Z',
  }
];

export const INITIAL_INVENTORY: InventoryItem[] = [
  {
    id: 'inv-001',
    materialType: 'silver_999',
    materialName: '99.9% Pure Solvometallurgical Silver Bullion',
    quantity: 1420.5,
    unit: 'g',
    batchSourceCode: 'DES-BATCH-2026-012, 009, 007',
    facilityName: 'Bhadla Sunbelt Micro-Plant #01',
    verificationStatus: 'cpcb_verified',
    storageLocation: 'Secure Safe Vault A-04',
    lotNumber: 'LOT-AG-2026-08',
    marketValueInr: 127845, // @ ~90 INR / g
    dateRecorded: '2026-09-25T18:00:00Z',
  },
  {
    id: 'inv-002',
    materialType: 'intact_silicon',
    materialName: 'Intact Solar-Grade Monocrystalline Silicon Wafers',
    quantity: 178.4,
    unit: 'kg',
    batchSourceCode: 'DES-BATCH-2026-012, 010, 008',
    facilityName: 'Bhadla Sunbelt Micro-Plant #01',
    verificationStatus: 'lab_certified',
    storageLocation: 'Wafer Dry Nitrogen Rack W-02',
    lotNumber: 'LOT-SI-2026-04',
    marketValueInr: 44600, // @ ~250 INR / kg
    dateRecorded: '2026-09-26T11:20:00Z',
  },
  {
    id: 'inv-003',
    materialType: 'solar_glass',
    materialName: 'Low-Iron High Transmittance Solar Glass Cullet',
    quantity: 2150.0,
    unit: 'kg',
    batchSourceCode: 'Delamination Clean Streams (Multiple)',
    facilityName: 'Bhadla Sunbelt Micro-Plant #01',
    verificationStatus: 'lab_certified',
    storageLocation: 'Cullet Silo 1',
    lotNumber: 'LOT-GLS-2026-11',
    marketValueInr: 21500, // @ ~10 INR / kg
    dateRecorded: '2026-09-27T09:15:00Z',
  },
  {
    id: 'inv-004',
    materialType: 'aluminum_frame',
    materialName: 'Anodized 6005-T5 Aluminum Frame Scrap',
    quantity: 520.0,
    unit: 'kg',
    batchSourceCode: 'Pre-treatment Unbolting Line',
    facilityName: 'Bhadla Sunbelt Micro-Plant #01',
    verificationStatus: 'cpcb_verified',
    storageLocation: 'Baling Bay B-1',
    lotNumber: 'LOT-AL-2026-03',
    marketValueInr: 88400, // @ ~170 INR / kg
    dateRecorded: '2026-09-28T14:40:00Z',
  }
];

export const INITIAL_ACTIVITY: ActivityLog[] = [
  {
    id: 'act-001',
    title: 'Silver Electrowinning Completed',
    description: 'Recovered 49.8g of 99.9% pure silver from Batch DES-BATCH-2026-012 without toxic acid emissions.',
    actor: 'Devendra Rathore',
    entityType: 'batch',
    entityId: 'bat-012',
    timestamp: '2026-09-25T17:35:00Z',
    status: 'success',
  },
  {
    id: 'act-002',
    title: 'CPCB EPR Certificate Generated',
    description: 'Certificate #CPCB-EPR-2026-RAJ-4491 issued for 100 kg PV waste diverted. 5 EPR credits minted.',
    actor: 'CPCB E-Waste Portal Gateway',
    entityType: 'compliance',
    entityId: 'CPCB-EPR-2026-RAJ-4491',
    timestamp: '2026-09-26T09:00:00Z',
    status: 'success',
  },
  {
    id: 'act-003',
    title: 'Reuse-First Triage Approved',
    description: 'Vikram Solar 320W panel (HS-BHD-2026-002) cleared at 79% efficiency for agricultural pump reuse.',
    actor: 'Khushi Kushwah (Auditor)',
    entityType: 'panel',
    entityId: 'pnl-002',
    timestamp: '2026-09-29T15:00:00Z',
    status: 'info',
  },
  {
    id: 'act-004',
    title: 'Reactor Temperature Stabilized at 80°C',
    description: 'Batch DES-BATCH-2026-014 Ethaline solvent bath heated to optimum 79.8°C with 40 kHz ultrasonics.',
    actor: 'Telemetry Edge System',
    entityType: 'batch',
    entityId: 'bat-014',
    timestamp: '2026-10-03T11:05:00Z',
    status: 'info',
  },
  {
    id: 'act-005',
    title: 'Satin Finserv Loan Repayment Logged',
    description: 'MSME Loan SFL-GML-2025-0894 monthly installment ₹22,400 debited from recovered silver sales escrow.',
    actor: 'SFL Core Banking Gateway',
    entityType: 'facility',
    entityId: 'fac-01',
    timestamp: '2026-10-01T00:05:00Z',
    status: 'success',
  }
];

export const DEFAULT_FINANCIAL_SCENARIO: FinancialScenario = {
  dailyFeedstockKg: 100, // 100 kg/day standard micro-plant
  annualOperatingDays: 300,
  silverPricePerGram: 90, // INR per gram
  siliconPricePerKg: 250, // INR per kg
  eprCreditPerTonne: 5000, // INR per tonne
  solventRegenerationRatePct: 92,
  operatingCostPerKg: 20, // INR 20/kg (~20,000/tonne)
  capexPerMicroPlant: 1800000, // INR 18 Lakhs
  sflLoanInterestRatePct: 9.5,
};

export function calculateFinancialMetrics(scenario: FinancialScenario): FinancialMetrics {
  const annualInputTonnes = (scenario.dailyFeedstockKg * scenario.annualOperatingDays) / 1000;
  
  // 1 tonne PV yields ~0.5 kg Silver (0.05% mass) and ~60 kg silicon wafers
  const annualRecoveredSilverKg = annualInputTonnes * 0.5;
  const annualRecoveredSiliconTonnes = annualInputTonnes * 0.06;
  const annualGlassTonnes = annualInputTonnes * 0.74;
  const annualAluminiumTonnes = annualInputTonnes * 0.18;

  // Revenues:
  const silverRevenue = (annualRecoveredSilverKg * 1000) * scenario.silverPricePerGram;
  const siliconRevenue = (annualRecoveredSiliconTonnes * 1000) * scenario.siliconPricePerKg;
  const glassRevenue = (annualGlassTonnes * 1000) * 10; // ~10 INR / kg
  const alRevenue = (annualAluminiumTonnes * 1000) * 170; // ~170 INR / kg
  const eprRevenue = annualInputTonnes * scenario.eprCreditPerTonne;

  const annualRevenueInr = silverRevenue + siliconRevenue + glassRevenue + alRevenue + eprRevenue;
  const annualOpexInr = (scenario.dailyFeedstockKg * scenario.annualOperatingDays) * scenario.operatingCostPerKg;
  const annualOperatingSurplusInr = annualRevenueInr - annualOpexInr;
  const grossMarginPct = annualRevenueInr > 0 ? (annualOperatingSurplusInr / annualRevenueInr) * 100 : 0;
  const costPerTonneInr = (scenario.operatingCostPerKg * 1000);

  // Payback period in months
  const monthlySurplus = annualOperatingSurplusInr / 12;
  const paybackPeriodMonths = monthlySurplus > 0 ? scenario.capexPerMicroPlant / monthlySurplus : 999;

  // Comparison with mechanical status quo: -10,230 INR per tonne net loss
  const statusQuoLossPerTonneInr = -10230;
  const revenuePerTonne = annualRevenueInr / annualInputTonnes;
  const helioSolvProfitPerTonne = revenuePerTonne - costPerTonneInr;
  const netAdvantagePerTonneInr = helioSolvProfitPerTonne - statusQuoLossPerTonneInr;

  return {
    annualInputTonnes,
    annualRecoveredSilverKg,
    annualRecoveredSiliconTonnes,
    annualRevenueInr,
    annualOpexInr,
    annualOperatingSurplusInr,
    grossMarginPct,
    costPerTonneInr,
    paybackPeriodMonths,
    statusQuoLossPerTonneInr,
    netAdvantagePerTonneInr,
  };
}

export function calculateEnvironmentalImpact(panels: PanelRecord[], batches: RecoveryBatch[]): EnvironmentalImpactData {
  const panelsAssessedTotal = panels.length;
  const panelsReusedCount = panels.filter(p => p.finalTriageStatus === 'refurbish_reuse').length;
  const panelsRecycledCount = panels.filter(p => p.finalTriageStatus === 'des_chemical_leaching').length;

  const totalKgProcessed = batches.reduce((sum, b) => sum + (b.feedstockMassKg || 0), 0);
  const wasteDivertedTonnes = (totalKgProcessed / 1000) + (panelsReusedCount * 0.020); // ~20kg per panel

  // From research paper: ~1.5 tonnes CO2e avoided per tonne PV waste recycled
  const co2eAvoidedTonnes = wasteDivertedTonnes * 1.5;

  // 100% elimination of toxic HNO3/HF acids (typically ~25L acid per tonne in conventional hydrometallurgy)
  const toxicAcidAvoidedLitres = wasteDivertedTonnes * 25;

  const siliconVirginMiningOffsetKg = wasteDivertedTonnes * 60; // 60kg Si / tonne
  const soilLeachingRiskPreventedPoints = Math.round(wasteDivertedTonnes * 10);

  return {
    panelsAssessedTotal: panelsAssessedTotal + 1420, // include cumulative pilot historical count
    panelsReusedCount: panelsReusedCount + 380,
    panelsRecycledCount: panelsRecycledCount + 1040,
    wasteDivertedTonnes: Number((wasteDivertedTonnes + 28.4).toFixed(1)),
    totalWasteDivertedKg: Math.round((wasteDivertedTonnes + 28.4) * 1000),
    co2eAvoidedTonnes: Number((co2eAvoidedTonnes + 42.6).toFixed(1)),
    equivalentTreesPlanted: Math.round((co2eAvoidedTonnes + 42.6) * 45),
    toxicAcidAvoidedLitres: Math.round(toxicAcidAvoidedLitres + 710),
    soilLeachingRiskPreventedPoints: soilLeachingRiskPreventedPoints + 284,
    siliconVirginMiningOffsetKg: Math.round(siliconVirginMiningOffsetKg + 1704),
  };
}
