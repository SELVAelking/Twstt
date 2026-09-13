import React, { useState } from 'react';
import { ArrowRightLeft } from 'lucide-react';

const CONVERSIONS = {
  length: {
    label: 'الطول (Length)',
    units: {
      m: { label: 'متر (m)', rate: 1 },
      km: { label: 'كيلومتر (km)', rate: 1000 },
      cm: { label: 'سنتيمتر (cm)', rate: 0.01 },
      mm: { label: 'ميليمتر (mm)', rate: 0.001 },
      mile: { label: 'ميل (mi)', rate: 1609.344 },
      yard: { label: 'ياردا (yd)', rate: 0.9144 },
      foot: { label: 'قدم (ft)', rate: 0.3048 },
      inch: { label: 'بوصة (in)', rate: 0.0254 },
    },
  },
  weight: {
    label: 'الوزن والكتلة (Weight)',
    units: {
      kg: { label: 'كيلوغرام (kg)', rate: 1 },
      g: { label: 'غرام (g)', rate: 0.001 },
      mg: { label: 'مليغرام (mg)', rate: 0.000001 },
      lb: { label: 'رطل (lb)', rate: 0.45359237 },
      oz: { label: 'أونصة (oz)', rate: 0.028349523125 },
      ton: { label: 'طن متري (t)', rate: 1000 },
    },
  },
  data: {
    label: 'البيانات الرقمية (Data)',
    units: {
      B: { label: 'بايت (Byte)', rate: 1 },
      KB: { label: 'كيلوبايت (KB)', rate: 1024 },
      MB: { label: 'ميغابايت (MB)', rate: 1048576 },
      GB: { label: 'غيغابايت (GB)', rate: 1073741824 },
      TB: { label: 'تيرابايت (TB)', rate: 1099511627776 },
    },
  },
  temperature: {
    label: 'درجة الحرارة (Temp)',
    custom: true,
    units: {
      C: 'درجة مئوية (°C)',
      F: 'فهرنهايت (°F)',
      K: 'كلفن (K)',
    },
  },
};

export const Converter = () => {
  const [category, setCategory] = useState('length');
  const [amount, setAmount] = useState('1');
  const [fromUnit, setFromUnit] = useState('m');
  const [toUnit, setToUnit] = useState('cm');

  const handleCategoryChange = (cat) => {
    setCategory(cat);
    const unitKeys = Object.keys(CONVERSIONS[cat].units);
    setFromUnit(unitKeys[0]);
    setToUnit(unitKeys[1] || unitKeys[0]);
  };

  const calculateResult = () => {
    const val = parseFloat(amount);
    if (isNaN(val)) return '—';

    if (category === 'temperature') {
      let celsius = val;
      if (fromUnit === 'F') celsius = ((val - 32) * 5) / 9;
      if (fromUnit === 'K') celsius = val - 273.15;

      if (toUnit === 'C') return celsius.toFixed(2);
      if (toUnit === 'F') return ((celsius * 9) / 5 + 32).toFixed(2);
      if (toUnit === 'K') return (celsius + 273.15).toFixed(2);
      return val;
    }

    const fromRate = CONVERSIONS[category].units[fromUnit].rate;
    const toRate = CONVERSIONS[category].units[toUnit].rate;
    const inBase = val * fromRate;
    const out = inBase / toRate;

    return Number.isInteger(out) ? out.toString() : parseFloat(out.toPrecision(7)).toString();
  };

  const swapUnits = () => {
    const temp = fromUnit;
    setFromUnit(toUnit);
    setToUnit(temp);
  };

  return (
    <div className="bg-slate-900/90 border border-slate-700/60 rounded-2xl p-5 text-right space-y-4 shadow-xl">
      {/* Category selector */}
      <div className="flex overflow-x-auto gap-2 pb-1 scrollbar-none">
        {Object.keys(CONVERSIONS).map((cat) => (
          <button
            key={cat}
            onClick={() => handleCategoryChange(cat)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
              category === cat
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            {CONVERSIONS[cat].label}
          </button>
        ))}
      </div>

      {/* Inputs */}
      <div className="space-y-3">
        <div>
          <label className="block text-xs font-medium text-slate-400 mb-1">القيمة المراد تحويلها:</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white font-mono text-lg focus:outline-none focus:border-indigo-500 text-left"
            dir="ltr"
            placeholder="0"
          />
        </div>

        <div className="grid grid-cols-[1fr,auto,1fr] gap-2 items-center">
          <div>
            <label className="block text-xs text-slate-400 mb-1">من:</label>
            <select
              value={fromUnit}
              onChange={(e) => setFromUnit(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl p-2 text-xs focus:outline-none focus:border-indigo-500"
            >
              {Object.entries(CONVERSIONS[category].units).map(([key, val]) => (
                <option key={key} value={key}>
                  {typeof val === 'string' ? val : val.label}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={swapUnits}
            className="p-2.5 rounded-full bg-slate-800 hover:bg-indigo-600 text-slate-300 hover:text-white transition self-end mb-0.5 border border-slate-700 hover:border-indigo-500"
            title="تبديل الوحدتين"
          >
            <ArrowRightLeft size={16} />
          </button>

          <div>
            <label className="block text-xs text-slate-400 mb-1">إلى:</label>
            <select
              value={toUnit}
              onChange={(e) => setToUnit(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl p-2 text-xs focus:outline-none focus:border-indigo-500"
            >
              {Object.entries(CONVERSIONS[category].units).map(([key, val]) => (
                <option key={key} value={key}>
                  {typeof val === 'string' ? val : val.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Converted result output */}
        <div className="p-4 bg-indigo-950/40 border border-indigo-500/30 rounded-xl flex flex-col justify-between items-start">
          <span className="text-xs text-indigo-300 font-medium">النتيجة المحولة:</span>
          <div className="w-full text-center py-1 text-2xl font-black font-mono text-emerald-400" dir="ltr">
            {calculateResult()}
          </div>
        </div>
      </div>
    </div>
  );
};