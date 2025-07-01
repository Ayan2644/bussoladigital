// src/pages/CPAMaximo.jsx (Código completo e atualizado)

import React, { useState, useMemo } from 'react';
import PageHeader from '../components/ui/PageHeader';
import { Trash2, PlusCircle } from 'lucide-react';

// --- COMPONENTES DE UI OTIMIZADOS ---

// Componente de Input numérico com a correção de acessibilidade
function NumberInput({ label, value, onChange, placeholder }) {
  // Cria um 'id' único para o campo baseado no label para a conexão de acessibilidade
  const inputId = `cpa-input-${label.replace(/\s+/g, '-').toLowerCase()}`;

  return (
    <div>
      {/* O atributo 'htmlFor' conecta a label ao input pelo 'id' */}
      <label htmlFor={inputId} className="text-sm text-zinc-400 block mb-1">
        {label}
      </label>
      <input
        id={inputId}
        type="number"
        value={value === 0 ? '' : value}
        onChange={(e) => onChange(e.target.valueAsNumber || 0)}
        placeholder={placeholder}
        className="input w-full"
      />
    </div>
  );
}

// Card de resultados com fontes e proporções corrigidas
function ResultCard({ title, value, subtext, color = "white" }) {
  const colorClass = 
    color === "green" ? "text-green-400" :
    color === "yellow" ? "text-yellow-400" :
    color === "red" ? "text-[#ED195C]" :
    "text-white";

  return (
    <div className={`bg-[#1D1D1D]/50 p-5 rounded-xl border text-center flex flex-col justify-center h-full ${color === 'red' ? 'border-red-500/50' : color === 'yellow' ? 'border-yellow-400/50' : color === 'green' ? 'border-green-500/50' : 'border-zinc-700'}`}>
      <h2 className="text-sm text-zinc-400 font-medium">{title}</h2>
      <p className={`font-bold text-3xl md:text-4xl ${colorClass}`}>{value}</p>
      {subtext && <p className="text-xs text-zinc-500 mt-1">{subtext}</p>}
    </div>
  );
}

function ResultItem({ label, value }) {
    return (
        <div className="flex justify-between items-center bg-[#1D1D1D]/50 border border-zinc-700 p-3 rounded-lg">
            <span className="text-sm text-zinc-300">{label}</span>
            <span className="text-md font-bold text-white">{value}</span>
        </div>
    )
}


// --- COMPONENTE PRINCIPAL ---
export default function CPAMaximo() {
  const [productPrice, setProductPrice] = useState(197);
  const [platformPercentage, setPlatformPercentage] = useState(6.99);
  const [platformFixed, setPlatformFixed] = useState(2.50);
  const [variableCosts, setVariableCosts] = useState([
    { id: 1, name: 'Impostos', value: 10, type: 'percentage' },
  ]);
  
  const addVariableCost = () => {
    setVariableCosts(prev => [...prev, { id: Date.now(), name: '', value: 0, type: 'fixed' }]);
  };

  const removeVariableCost = (id) => {
    setVariableCosts(prev => prev.filter(cost => cost.id !== id));
  };

  const updateVariableCost = (id, field, value) => {
    setVariableCosts(prev => prev.map(cost => 
      cost.id === id ? { ...cost, [field]: value } : cost
    ));
  };

  const resultados = useMemo(() => {
    const platformFee = (productPrice * (platformPercentage / 100)) + platformFixed;
    const totalVariableCostsValue = variableCosts.reduce((total, cost) => {
      const value = parseFloat(cost.value) || 0;
      return cost.type === 'fixed' ? total + value : total + (productPrice * (value / 100));
    }, platformFee);

    const contributionMargin = productPrice - totalVariableCostsValue;
    const cpaRoi1 = Math.max(0, contributionMargin);
    const cpaRoi1_5 = Math.max(0, contributionMargin / 1.5);
    const cpaRoi2 = Math.max(0, contributionMargin / 2);

    return {
      revenuePerSale: productPrice,
      totalVariableCosts: totalVariableCostsValue,
      contributionMargin,
      contributionPercentage: productPrice > 0 ? (contributionMargin / productPrice) * 100 : 0,
      cpaRoi1, cpaRoi1_5, cpaRoi2,
    };
  }, [productPrice, platformPercentage, platformFixed, variableCosts]);

  const formatCurrency = (value) => value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

  return (
    <div className="bg-[#0f0f0f] text-white px-4 py-10 flex flex-col items-center">
        <PageHeader
            title="Calculadora de CPA Máximo"
            description="Calcule o Custo por Aquisição máximo que o seu negócio suporta para se manter lucrativo, com base nos seus custos reais e metas de ROI."
        />

        <div className="w-full max-w-6xl mt-2 grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            {/* Coluna de Inputs (Layout unificado Fiel à v1.0) */}
            <div className="bg-[#161616] p-6 rounded-2xl border border-zinc-800 shadow-lg space-y-6">
              <h2 className="text-xl font-semibold text-center text-[#008CFF]">Dados de Entrada</h2>
              
              <div className="space-y-2">
                  <h3 className="text-md font-semibold text-zinc-300 border-b border-zinc-700 pb-2">Informações do Produto</h3>
                  <NumberInput label="Valor do Produto (R$)" value={productPrice} onChange={setProductPrice} placeholder="Digite o valor do seu produto" />
              </div>

              <div className="space-y-2">
                  <h3 className="text-md font-semibold text-zinc-300 border-b border-zinc-700 pb-2">Taxa de Plataforma</h3>
                   <div className="grid grid-cols-2 gap-4">
                      <NumberInput label="Percentual (%)" value={platformPercentage} onChange={setPlatformPercentage} placeholder="Ex: 6.99" />
                      <NumberInput label="Taxa Fixa (R$)" value={platformFixed} onChange={setPlatformFixed} placeholder="Ex: 2.50" />
                   </div>
              </div>
              
              <div className="space-y-4">
                  <h3 className="text-md font-semibold text-zinc-300 border-b border-zinc-700 pb-2">Custos Variáveis</h3>
                  {variableCosts.map(cost => (
                    <div key={cost.id} className="grid grid-cols-12 gap-2 items-center">
                      <div className="col-span-6"><input type="text" value={cost.name} onChange={(e) => updateVariableCost(cost.id, 'name', e.target.value)} placeholder="Nome do custo" className="input w-full"/></div>
                      <div className="col-span-3"><input type="number" value={String(cost.value)} onChange={(e) => updateVariableCost(cost.id, 'value', e.target.valueAsNumber || 0)} placeholder="Valor" className="input w-full"/></div>
                      <div className="col-span-2"><select value={cost.type} onChange={(e) => updateVariableCost(cost.id, 'type', e.target.value)} className="input w-full text-sm"><option value="fixed">R$</option><option value="percentage">%</option></select></div>
                      <div className="col-span-1 flex justify-end"><button onClick={() => removeVariableCost(cost.id)} className="text-red-500 hover:text-red-400 transition p-2 rounded-full"><Trash2 size={18} /></button></div>
                    </div>
                  ))}
                  <button onClick={addVariableCost} className="flex items-center justify-center gap-2 text-sm text-[#008CFF] hover:text-cyan-300 transition w-full p-2 mt-2 rounded-lg border-2 border-dashed border-zinc-700 hover:border-zinc-600"><PlusCircle size={16}/> Adicionar Custo</button>
              </div>
            </div>

            {/* Coluna de Resultados (Layout unificado e hierárquico Fiel à v1.0) */}
            <div className="bg-[#161616] p-6 rounded-2xl border border-zinc-800 shadow-lg space-y-6">
                <h2 className="text-xl font-semibold text-center text-[#008CFF]">Resultados</h2>
                
                <div className="space-y-3">
                    <h3 className="text-md font-semibold text-zinc-300 border-b border-zinc-700 pb-2">Análise de Margem</h3>
                    <ResultItem label="Receita por Venda:" value={formatCurrency(resultados.revenuePerSale)} />
                    <ResultItem label="Custos Variáveis Totais:" value={formatCurrency(resultados.totalVariableCosts)} />
                    <ResultItem label="Margem de Contribuição (R$):" value={formatCurrency(resultados.contributionMargin)} />
                    <ResultItem label="Margem de Contribuição (%):" value={`${resultados.contributionPercentage.toFixed(2)}%`} />
                </div>
                
                <div className="space-y-3">
                    <h3 className="text-md font-semibold text-zinc-300 border-b border-zinc-700 pb-2">CPA Máximo por ROI</h3>
                    <div className="grid grid-cols-1 gap-4">
                      <ResultCard title="ROI 1 (Break Even)" value={formatCurrency(resultados.cpaRoi1)} subtext="Investimento = Retorno" color="red" />
                      <ResultCard title="ROI 1.5" value={formatCurrency(resultados.cpaRoi1_5)} subtext="50% de lucro sobre o investido" color="yellow" />
                      <ResultCard title="ROI 2 (Ideal)" value={formatCurrency(resultados.cpaRoi2)} subtext="100% de lucro sobre o investido" color="green" />
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}