'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  PanelRecord,
  RecoveryBatch,
  Facility,
  InventoryItem,
  FinancialScenario,
  FinancialMetrics,
  EnvironmentalImpactData,
  ActivityLog,
  UserProfile,
  TriageDecisionOutcome,
  BatchStep,
  BatchStatus,
} from './types';
import {
  INITIAL_USER,
  JUDGE_USER,
  INITIAL_FACILITIES,
  INITIAL_PANELS,
  INITIAL_BATCHES,
  INITIAL_INVENTORY,
  INITIAL_ACTIVITY,
  DEFAULT_FINANCIAL_SCENARIO,
  calculateFinancialMetrics,
  calculateEnvironmentalImpact,
} from './store';

interface DemoContextType {
  user: UserProfile;
  setUser: (user: UserProfile) => void;
  facilities: Facility[];
  microPlants: Facility[];
  panels: PanelRecord[];
  batches: RecoveryBatch[];
  inventory: InventoryItem[];
  activityLogs: ActivityLog[];
  financialScenario: FinancialScenario;
  financialMetrics: FinancialMetrics;
  environmentalImpact: EnvironmentalImpactData;
  isDemoMode: boolean;
  addPanel: (panel: Omit<PanelRecord, 'id' | 'createdAt'>) => PanelRecord;
  updatePanel: (id: string, updates: Partial<PanelRecord>) => void;
  deletePanel: (id: string) => void;
  addBatch: (batch: Partial<RecoveryBatch> & { batchCode: string }) => RecoveryBatch;
  updateBatch: (id: string, updates: Partial<RecoveryBatch>) => void;
  updateBatchStatus: (id: string, currentStep: BatchStep, status: BatchStatus) => void;
  addInventoryItem: (item: Omit<InventoryItem, 'id' | 'dateRecorded'>) => void;
  updateInventoryOfftake: (id: string, offtakerStatus: string, buyerOrganization?: string) => void;
  updateFinancialScenario: (scenario: Partial<FinancialScenario>) => void;
  resetDemoData: () => void;
  switchUserRole: (role: UserProfile['role']) => void;
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const DemoContext = createContext<DemoContextType | null>(null);

const STORAGE_KEY = 'heliosolv_demo_state_v1';

export function DemoProvider({ children }: { children: React.ReactNode }) {
  const [isClient, setIsClient] = useState(false);
  const [user, setUser] = useState<UserProfile>(INITIAL_USER);
  const [facilities, setFacilities] = useState<Facility[]>(INITIAL_FACILITIES);
  const [panels, setPanels] = useState<PanelRecord[]>(INITIAL_PANELS);
  const [batches, setBatches] = useState<RecoveryBatch[]>(INITIAL_BATCHES);
  const [inventory, setInventory] = useState<InventoryItem[]>(INITIAL_INVENTORY);
  const [activityLogs, setActivityLogs] = useState<ActivityLog[]>(INITIAL_ACTIVITY);
  const [financialScenario, setFinancialScenario] = useState<FinancialScenario>(DEFAULT_FINANCIAL_SCENARIO);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Initialize from LocalStorage
  useEffect(() => {
    setIsClient(true);
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed.panels) setPanels(parsed.panels);
        if (parsed.batches) setBatches(parsed.batches);
        if (parsed.inventory) setInventory(parsed.inventory);
        if (parsed.facilities) setFacilities(parsed.facilities);
        if (parsed.activityLogs) setActivityLogs(parsed.activityLogs);
        if (parsed.financialScenario) setFinancialScenario(parsed.financialScenario);
        if (parsed.user) setUser(parsed.user);
      }
    } catch (e) {
      console.warn('Could not load stored state, using defaults', e);
    }
  }, []);

  // Save to LocalStorage on updates
  useEffect(() => {
    if (!isClient) return;
    try {
      const payload = {
        user,
        facilities,
        panels,
        batches,
        inventory,
        activityLogs,
        financialScenario,
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    } catch (e) {
      console.warn('Could not persist demo state', e);
    }
  }, [user, facilities, panels, batches, inventory, activityLogs, financialScenario, isClient]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const addPanel = (newPanelData: Omit<PanelRecord, 'id' | 'createdAt'>): PanelRecord => {
    const id = `pnl-${Date.now().toString().slice(-4)}`;
    const newPanel: PanelRecord = {
      ...newPanelData,
      id,
      createdAt: new Date().toISOString(),
    };
    setPanels(prev => [newPanel, ...prev]);

    const log: ActivityLog = {
      id: `act-${Date.now()}`,
      title: 'New Panel Registered',
      description: `Panel ${newPanel.panelCode} (${newPanel.manufacturer || 'Generic PV'}) registered for screening.`,
      actor: user.name,
      entityType: 'panel',
      entityId: id,
      timestamp: new Date().toISOString(),
      status: 'info',
    };
    setActivityLogs(prev => [log, ...prev]);
    showToast(`Panel ${newPanel.panelCode} successfully registered.`);
    return newPanel;
  };

  const updatePanel = (id: string, updates: Partial<PanelRecord>) => {
    setPanels(prev => prev.map(p => (p.id === id ? { ...p, ...updates } : p)));
    showToast(`Panel record updated.`);
  };

  const deletePanel = (id: string) => {
    setPanels(prev => prev.filter(p => p.id !== id));
    showToast(`Panel removed from registry.`);
  };

  const addBatch = (batchData: Partial<RecoveryBatch> & { batchCode: string }): RecoveryBatch => {
    const id = `bat-${Date.now().toString().slice(-4)}`;
    const feedstock = batchData.feedstockMassKg || batchData.weightKg || 100;
    const temp = batchData.operatingTemperatureC || batchData.temperatureC || 80;
    const agGrams = batchData.silverYieldGrams || Math.round(feedstock * 0.49);
    const siKg = batchData.siliconWaferYieldKg || Math.round(feedstock * 0.06);

    const newBatch: RecoveryBatch = {
      ...batchData,
      id,
      batchCode: batchData.batchCode,
      facilityId: batchData.facilityId || 'fac-01',
      facilityName: batchData.facilityName || 'Bhadla Sunbelt Micro-Plant #01',
      panelCount: batchData.panelCount || 5,
      feedstockMassKg: feedstock,
      weightKg: feedstock,
      currentStep: batchData.currentStep || 'intake',
      temperatureC: temp,
      operatingTemperatureC: temp,
      solidLiquidRatio: batchData.solidLiquidRatio || '1:10',
      ultrasonicationFreqKhz: batchData.ultrasonicationFreqKhz || 40,
      leachingDurationMinutes: batchData.leachingDurationMinutes || 18,
      solventRecycleCount: batchData.solventRecycleCount || 3,
      silverYieldGrams: agGrams,
      siliconWaferYieldKg: siKg,
      solventComposition: batchData.solventComposition || 'Ethaline (Choline Chloride + Ethylene Glycol 1:2 molar)',
      status: batchData.status || 'in_progress',
      startDate: batchData.startDate || new Date().toISOString(),
      solventRecycleRatePct: batchData.solventRecycleRatePct || 92,
      measuredOutputs: batchData.measuredOutputs || {
        silverRecoveredGrams: agGrams,
        siliconWafersRecoveredKg: siKg,
        glassCulletRecoveredKg: Math.round(feedstock * 0.74),
        aluminumScrapKg: Math.round(feedstock * 0.18),
        processResiduesKg: 2,
        purityGradeAgPct: 99.9,
      },
      operatorNotes: batchData.operatorNotes || batchData.notes || 'Standard micro-plant solvometallurgical recovery run.',
      operatorName: batchData.operatorName || user.name,
      createdAt: new Date().toISOString(),
    };
    setBatches(prev => [newBatch, ...prev]);

    const log: ActivityLog = {
      id: `act-${Date.now()}`,
      title: 'New DES Recovery Batch Started',
      description: `Batch ${newBatch.batchCode} initiated with ${newBatch.feedstockMassKg} kg feedstock in 80°C Ethaline DES.`,
      actor: user.name,
      entityType: 'batch',
      entityId: id,
      timestamp: new Date().toISOString(),
      status: 'info',
    };
    setActivityLogs(prev => [log, ...prev]);
    showToast(`Batch ${newBatch.batchCode} initiated.`);
    return newBatch;
  };

  const updateBatch = (id: string, updates: Partial<RecoveryBatch>) => {
    setBatches(prev => prev.map(b => (b.id === id ? { ...b, ...updates } : b)));
    showToast(`Recovery batch updated.`);
  };

  const updateBatchStatus = (id: string, currentStep: BatchStep, status: BatchStatus) => {
    setBatches(prev => prev.map(b => (b.id === id ? { ...b, currentStep, status } : b)));
    showToast(`Batch state transitioned to ${currentStep.replace('_', ' ')}.`);
  };

  const addInventoryItem = (itemData: Omit<InventoryItem, 'id' | 'dateRecorded'>) => {
    const id = `inv-${Date.now().toString().slice(-4)}`;
    const newItem: InventoryItem = {
      ...itemData,
      id,
      dateRecorded: new Date().toISOString(),
    };
    setInventory(prev => [newItem, ...prev]);
    showToast(`Recovered material added to inventory lot.`);
  };

  const updateInventoryOfftake = (id: string, offtakerStatus: string, buyerOrganization?: string) => {
    setInventory(prev => prev.map(item => (item.id === id ? { ...item, offtakerStatus, buyerOrganization } : item)));
    showToast(`Inventory lot status updated to ${offtakerStatus}.`);
  };

  const updateFinancialScenario = (updates: Partial<FinancialScenario>) => {
    setFinancialScenario(prev => ({ ...prev, ...updates }));
  };

  const resetDemoData = () => {
    setUser(INITIAL_USER);
    setFacilities(INITIAL_FACILITIES);
    setPanels(INITIAL_PANELS);
    setBatches(INITIAL_BATCHES);
    setInventory(INITIAL_INVENTORY);
    setActivityLogs(INITIAL_ACTIVITY);
    setFinancialScenario(DEFAULT_FINANCIAL_SCENARIO);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {
      console.warn(e);
    }
    showToast('Demo data reset to pristine SANKALP baseline.');
  };

  const switchUserRole = (role: UserProfile['role']) => {
    if (role === 'sfl_financier') {
      setUser(JUDGE_USER);
      showToast('Switched persona to Satin Finserv ESG / SANKALP Jury');
    } else {
      setUser({
        ...INITIAL_USER,
        role,
      });
      showToast(`Switched active role to ${role}`);
    }
  };

  const financialMetrics = calculateFinancialMetrics(financialScenario);
  const environmentalImpact = calculateEnvironmentalImpact(panels, batches);

  return (
    <DemoContext.Provider
      value={{
        user,
        setUser,
        facilities,
        microPlants: facilities,
        panels,
        batches,
        inventory,
        activityLogs,
        financialScenario,
        financialMetrics,
        environmentalImpact,
        isDemoMode: true,
        addPanel,
        updatePanel,
        deletePanel,
        addBatch,
        updateBatch,
        updateBatchStatus,
        addInventoryItem,
        updateInventoryOfftake,
        updateFinancialScenario,
        resetDemoData,
        switchUserRole,
        toastMessage,
        showToast,
      }}
    >
      {children}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-darknavy/95 border border-solargreen/40 text-cleanwhite px-4 py-3 rounded-xl shadow-solar-glow backdrop-blur-md animate-float text-sm font-medium">
          <span className="h-2 w-2 rounded-full bg-solargreen animate-ping" />
          <span>{toastMessage}</span>
        </div>
      )}
    </DemoContext.Provider>
  );
}

export function useDemo() {
  const context = useContext(DemoContext);
  if (!context) {
    throw new Error('useDemo must be used within a DemoProvider');
  }
  return context;
}
