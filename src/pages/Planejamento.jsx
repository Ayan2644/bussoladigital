import { useState } from 'react';

export default function Planejamento() {
  const [meta, setMeta] = useState(10000);
  const [precoProduto, setPrecoProduto] = useState(3500);
  const [leadsPorVenda, setLeadsPorVenda] = useState(10);
  const [precoLead, setPrecoLead] = useState(8);

  const vendas = meta / precoProduto;
  const leads = vendas * leadsPorVenda;
  const investimento = leads * precoLead;
  const lucro = meta - investimento;
  const conversao = 1 / leadsPorVenda;

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white px-4 py-10 flex flex-col items-center">
      
      {/* LOGO DESTACADA */}
      <img
        src="/logo-legiao.png"
        alt="Logo Legião"
        className="w-60 mb-6 drop-shadow-[0_0_20px_rgba(0,140,255,0.4)] transition duration-300"
      />

      {/* TÍTULO */}
      <h1 className="text-4xl md:text-5xl font-extrabold text-center bg-gradient-to-r from-[#008CFF] via-white to-[#ED195C] text-transparent bg-clip-text animate-pulse">
        Planejamento Estratégico
      </h1>

      {/* DESCRIÇÃO */}
      <p className="text-zinc-400 text-sm md:text-base mt-3 text-center max-w-md">
        Faça sua projeção de vendas com base na meta, conversão e custo por lead.
      </p>

      {/* CONTEÚDO */}
      <div className="max-w-screen-lg w-full mt-10 grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Inputs */}
        <div className="space-y-6">
          <CardInput
            label="Quanto quer faturar?"
            value={meta}
            onChange={(val) => setMeta(Number(val))}
            min={1000}
            max={500000}
            step={1000}
            prefix="R$"
          />

          <CardInput
            label="Preço do produto"
            value={precoProduto}
            onChange={(val) => setPrecoProduto(Number(val))}
            min={0}
            max={20000}
            step={50}
            prefix="R$"
          />

          <CardInput
            label="A cada quantos leads sai uma venda?"
            value={leadsPorVenda}
            onChange={(val) => setLeadsPorVenda(Number(val))}
            min={1}
            max={100}
            step={1}
          />

          <CardInput
            label="Qual é o preço médio do lead?"
            value={precoLead}
            onChange={(val) => setPrecoLead(Number(val))}
            min={0}
            max={120}
            step={0.5}
            prefix="R$"
          />

          <div className="bg-[#101010] p-4 rounded-xl border border-zinc-800 text-cyan-400 text-center font-semibold">
            <strong>Taxa de Conversão:</strong> {(conversao * 100).toFixed(2)}%
          </div>
        </div>

        {/* Outputs */}
        <div className="space-y-4">
          <OutputCard title="💰 Lucro" value={`R$ ${lucro.toLocaleString(undefined, { minimumFractionDigits: 2 })}`} />
          <OutputCard title="Quantas vendas preciso fazer?" value={Math.ceil(vendas)} />
          <OutputCard title="Quantos leads preciso captar?" value={Math.ceil(leads)} />
          <OutputCard title="Quanto vou ter que investir?" value={`R$ ${investimento.toLocaleString(undefined, { minimumFractionDigits: 2 })}`} />
        </div>
      </div>
    </div>
  );
}

// COMPONENTE DE INPUT
function CardInput({ label, value, onChange, min, max, step, prefix }) {
  return (
    <div className="bg-[#161616] p-5 rounded-xl border border-zinc-800 shadow-md hover:shadow-[#008cff40] transition">
      <label className="text-sm text-zinc-400">{label}</label>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full accent-[#008CFF] mt-2"
      />
      <div className="text-right text-cyan-400 font-bold text-lg">
        {prefix && `${prefix} `}{Number(value).toLocaleString()}
      </div>
    </div>
  );
}

// COMPONENTE DE OUTPUT
function OutputCard({ title, value }) {
  return (
    <div className="bg-[#151515] p-5 rounded-xl border border-zinc-800 hover:shadow-lg transition">
      <h2 className="text-sm text-[#008CFF] mb-1 font-medium">{title}</h2>
      <p className="text-2xl font-bold text-white">{value}</p>
    </div>
  );
}
