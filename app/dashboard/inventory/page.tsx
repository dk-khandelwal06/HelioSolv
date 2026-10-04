'use client';

import React, { useState } from 'react';
import {
  Boxes,
  Sparkles,
  TrendingUp,
  Tag,
  CheckCircle2,
  DollarSign,
  PackageCheck,
  Send,
  ArrowRight,
  Filter,
  Search,
} from 'lucide-react';
import { useDemo } from '@/lib/demo-context';
import { formatInr, formatNumber } from '@/lib/utils';
import { RecoveredMaterial } from '@/lib/types';

export default function MaterialInventoryPage() {
  const { inventory, updateInventoryOfftake, showToast } = useDemo();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedItem, setSelectedItem] = useState<RecoveredMaterial | null>(null);
  const [dispatchBuyer, setDispatchBuyer] = useState('Hindustan Zinc Refinery');

  const totalValuation = inventory.reduce(
    (acc, item) => acc + (item.marketValueInr || item.quantity * (item.currentMarketPriceInrPerUnit || 0)),
    0
  );

  const handleDispatch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedItem) return;
    updateInventoryOfftake(selectedItem.id, 'dispatched', dispatchBuyer);
    showToast(`Dispatched ${selectedItem.quantity} ${selectedItem.unit} of ${selectedItem.materialName} to ${dispatchBuyer}.`);
    setSelectedItem(null);
  };

  const filteredInventory = inventory.filter((item) =>
    item.materialName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.storageLocation.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* ── HEADER ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-solargreen/15 text-solargreen text-xs font-mono font-bold uppercase mb-2">
            <Boxes className="w-3.5 h-3.5" /> Recovered Mineral Stockpile
          </div>
          <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-slate-900 dark:text-cleanwhite">
            Material Inventory &amp; B2B Offtake Escrow
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-mutedslate mt-1 max-w-2xl">
            Fraction-by-fraction accounting of high-purity minerals liberated via low-heat solvometallurgy. Integrated with tamper-proof IoT scales and certified assays.
          </p>
        </div>

        {/* Total Stockpile Valuation Card */}
        <div className="p-4 rounded-2xl glass-panel border border-solargreen/30 self-start sm:self-center text-right">
          <span className="text-[10px] font-mono uppercase text-mutedslate block">Total Stockpile Valuation</span>
          <div className="text-2xl font-extrabold font-mono text-solargreen">
            {formatInr(totalValuation)}
          </div>
          <span className="text-[10px] text-mutedslate">Active B2B Spot Market Pricing</span>
        </div>
      </div>

      {/* ── INVENTORY FRACTION CARDS ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredInventory.map((item) => {
          const itemTotal = item.marketValueInr || item.quantity * (item.currentMarketPriceInrPerUnit || 0);
          const unitPrice = item.currentMarketPriceInrPerUnit || Math.round(itemTotal / (item.quantity || 1));
          const offtakeStatus = item.offtakerStatus || 'available';
          const isSilver = item.materialType === 'silver_999';

          return (
            <div
              key={item.id}
              className={`p-6 rounded-3xl glass-panel border transition-all ${
                isSilver ? 'border-solargreen shadow-solar-glow' : 'border-slate-200 dark:border-slate-800'
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <span className="text-[10px] font-mono uppercase text-mutedslate block">
                    {item.purityGrade || 'CPCB Certified Grade'}
                  </span>
                  <h3 className="font-display font-bold text-lg text-slate-900 dark:text-cleanwhite">
                    {item.materialName}
                  </h3>
                </div>
                <span
                  className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase ${
                    offtakeStatus === 'available'
                      ? 'bg-solargreen/15 text-solargreen'
                      : offtakeStatus === 'dispatched'
                      ? 'bg-electriccyan/15 text-electriccyan'
                      : 'bg-warningamber/15 text-warningamber'
                  }`}
                >
                  {offtakeStatus}
                </span>
              </div>

              {/* Quantities & Pricing */}
              <div className="space-y-2 py-3 border-y border-slate-200 dark:border-slate-800 text-xs font-mono">
                <div className="flex justify-between">
                  <span className="text-mutedslate">Stock Quantity:</span>
                  <span className="font-bold text-slate-900 dark:text-cleanwhite">
                    {formatNumber(item.quantity)} {item.unit}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-mutedslate">Market Unit Price:</span>
                  <span className="text-slate-700 dark:text-slate-300">
                    {formatInr(unitPrice)} / {item.unit}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-mutedslate">Current Asset Value:</span>
                  <span className="font-bold text-solargreen">{formatInr(itemTotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-mutedslate">Vault Location:</span>
                  <span className="text-slate-400">{item.storageLocation}</span>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-4 flex items-center justify-between">
                <span className="text-[10px] font-mono text-mutedslate">
                  {item.buyerOrganization ? `Offtaker: ${item.buyerOrganization}` : 'Available for spot purchase'}
                </span>
                <button
                  onClick={() => setSelectedItem(item)}
                  className="px-3 py-1.5 rounded-xl bg-solargreen text-midnight font-bold text-xs shadow-solar-glow hover:opacity-95 transition-all flex items-center gap-1"
                >
                  <span>Dispatch / Escrow</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* ── DISPATCH MODAL ── */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-solargreen/40 max-w-md w-full space-y-5">
            <div className="flex justify-between items-center pb-3 border-b border-slate-200 dark:border-slate-800">
              <h3 className="font-display font-bold text-lg text-slate-900 dark:text-cleanwhite">
                Dispatch Material to Verified Offtaker
              </h3>
              <button onClick={() => setSelectedItem(null)} className="text-slate-400 hover:text-cleanwhite">
                ✕
              </button>
            </div>

            <form onSubmit={handleDispatch} className="space-y-4 text-xs">
              <div className="p-3.5 rounded-2xl bg-midnight/80 border border-slate-700 font-mono space-y-1">
                <div className="text-solargreen font-bold">{selectedItem.materialName}</div>
                <div>Quantity: {selectedItem.quantity} {selectedItem.unit} ({selectedItem.purityGrade || 'CPCB Certified Grade'})</div>
                <div>Assay Escrow Value: {formatInr(selectedItem.marketValueInr || (selectedItem.quantity * (selectedItem.currentMarketPriceInrPerUnit || 0)))}</div>
              </div>

              <div>
                <label className="block font-mono uppercase text-mutedslate mb-1">
                  Select Certified Offtaker / Buyer
                </label>
                <select
                  value={dispatchBuyer}
                  onChange={(e) => setDispatchBuyer(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white/70 dark:bg-midnight"
                >
                  <option value="Hindustan Zinc Smelters">Hindustan Zinc Smelters (Bullion)</option>
                  <option value="Tata Electronics Wafer Division">Tata Electronics (Silicon Wafers)</option>
                  <option value="Hindalco Aluminum Recycling">Hindalco (Extrusion Aluminum)</option>
                  <option value="Saint-Gobain Glass India">Saint-Gobain (Cullet Float Glass)</option>
                </select>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setSelectedItem(null)}
                  className="px-4 py-2 rounded-xl border border-slate-700 text-mutedslate hover:text-cleanwhite"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-solargreen text-midnight font-bold shadow-solar-glow hover:opacity-95"
                >
                  Generate Manifest &amp; Settle
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
