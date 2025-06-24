// src/pages/Sonar.jsx

import { useState } from 'react'
import RadarSVG   from '../components/RadarSVG'
import Termometro from '../components/Termometro'

export default function Sonar() {
  // Estados dos inputs
  const [impressions, setImpressions] = useState('')
  const [clicks,      setClicks     ] = useState('')
  const [pageviews,   setPageviews  ] = useState('')
  const [checkouts,   setCheckouts  ] = useState('')
  const [purchases,   setPurchases  ] = useState('')
  const [adSpend,     setAdSpend    ] = useState('')
  const [avgOrder,    setAvgOrder   ] = useState('')

  // Resultado e performance normalizada
  const [results,     setResults     ] = useState(null)
  const [performance, setPerformance ] = useState(0)

  function handleSubmit(e) {
    e.preventDefault()
    // Converte inputs
    const I  = Number(impressions)
    const C  = Number(clicks)
    const PV = Number(pageviews)
    const CO = Number(checkouts)
    const P  = Number(purchases)
    const SP = Number(adSpend)
    const AO = Number(avgOrder)

    // Cálculo das métricas
    const ctr             = I  ? (C  / I ) * 100 : 0
    const conn            = C  ? (PV / C ) * 100 : 0
    const pconv           = PV ? (CO / PV) * 100 : 0
    const cconv           = CO ? (P  / CO) * 100 : 0
    const totalConversion = I  ? (P  / I ) * 100 : 0
    const cac             = P  ? SP / P         : 0
    const roas            = SP ? (P * AO) / SP  : 0
    const revenue         = P  * AO
    const profitPct       = SP ? ((revenue - SP) / SP) * 100 : 0

    // Thresholds da Bussola
    const T = {
      ctr:   [1,   2  ],
      conn:  [75,  90 ],
      pconv: [5,   10 ],
      cconv: [20,  40 ],
      roas:  [1.5, 2.5]
    }

    // Soma pontuações 0–2
    let sum = 0
    sum += ctr   >= T.ctr[1]   ? 2 : ctr   >= T.ctr[0]   ? 1 : 0
    sum += conn  >= T.conn[1]  ? 2 : conn  >= T.conn[0]  ? 1 : 0
    sum += pconv >= T.pconv[1] ? 2 : pconv >= T.pconv[0] ? 1 : 0
    sum += cconv >= T.cconv[1] ? 2 : cconv >= T.cconv[0] ? 1 : 0
    sum += roas  >= T.roas[1]  ? 2 : roas  >= T.roas[0]  ? 1 : 0

    // Normaliza performance em 0–2
    setPerformance(sum / 5)

    // Salva todos os resultados
    setResults({
      ctr,
      conn,
      pconv,
      cconv,
      totalConversion,
      cac,
      roas,
      purchases: P,
      revenue,
      profitPct
    })
  }

  // Texto e cor da caixa de status
  let statusMsg, statusClass
  if (performance < 1) {
    statusMsg   = 'MOMENTO DE OTIMIZAÇÃO! É necessário melhorar significativamente suas métricas antes de escalar.'
    statusClass = 'border-[var(--rosa-legiao)] text-[var(--rosa-legiao)]'
  } else if (performance < 2) {
    statusMsg   = 'QUASE LÁ! Estamos nos aproximando do momento ideal para escalar. Otimize os pontos indicados abaixo.'
    statusClass = 'border-[var(--rosa-legiao)] text-[var(--rosa-legiao)]'
  } else {
    statusMsg   = 'MOMENTO IDEAL PARA ESCALA! Suas métricas estão excelentes, hora de investir mais!'
    statusClass = 'border-[var(--azul-legiao)] text-[var(--azul-legiao)]'
  }

  return (
    <div className="space-y-8 px-6 py-8 max-w-4xl mx-auto">
      {/* 1) FORMULÁRIO */}
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-zinc-800 p-6 rounded-2xl shadow-lg"
      >
        {[ 
          ['Impressões',        impressions, setImpressions],
          ['Cliques',           clicks,      setClicks],
          ['Page Views',        pageviews,   setPageviews],
          ['Checkouts',         checkouts,   setCheckouts],
          ['Compras',           purchases,   setPurchases],
          ['Investimento (R$)', adSpend,     setAdSpend],
          ['Ticket Médio (R$)', avgOrder,    setAvgOrder]
        ].map(([label, val, setter]) => (
          <div key={label} className="flex flex-col">
            <label className="text-gray-300 mb-1">{label}</label>
            <input
              type="number"
              value={val}
              onChange={e => setter(e.target.value)}
              className="input"
              placeholder="0"
            />
          </div>
        ))}
        <button
          type="submit"
          className="col-span-full mt-4 py-3 rounded-xl bg-gradient-to-r from-[var(--azul-legiao)] to-[var(--rosa-legiao)] text-white font-semibold hover:opacity-90 transition"
        >
          Calcular Métricas
        </button>
      </form>

      {/* 2) SONAR + STATUS + MÉTRICAS */}
      {results && (
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Coluna do Sonar */}
          <div className="lg:w-1/2 flex flex-col items-center">
            {/* Caixa dinâmica de status */}
            <div className={`border-l-4 bg-zinc-800 p-4 rounded mb-4 ${statusClass}`}>
              <p className="font-semibold text-sm leading-snug">{statusMsg}</p>
            </div>

            {/* Radar vivo */}
            <RadarSVG performance={performance} />

            {/* Termômetros (você já tem seu componente Termometro) */}
          </div>

          {/* Coluna das Métricas Calculadas e Termômetros */}
          <div className="lg:w-1/2 space-y-6">
            {/* Métricas Calculadas */}
            <div className="bg-zinc-800 p-4 rounded-xl border border-zinc-700 space-y-2">
              <h3 className="text-center text-[var(--azul-legiao)] text-lg font-semibold">
                Métricas Calculadas
              </h3>
              {[
                ['CTR (Taxa de Cliques)',           `${results.ctr.toFixed(2)}%`],
                ['Connect Rate',                     `${results.conn.toFixed(2)}%`],
                ['Conversão da Página',             `${results.pconv.toFixed(2)}%`],
                ['Conversão do Checkout',           `${results.cconv.toFixed(2)}%`],
                ['Taxa de Conversão Total',          `${results.totalConversion.toFixed(2)}%`],
                ['CAC',                              `R$ ${results.cac.toFixed(2)}`],
                ['ROAS',                             results.roas.toFixed(2)],
                ['Número de Vendas',                 results.purchases],
                ['Lucro Bruto',                      `R$ ${results.revenue.toFixed(2)}`],
                ['Lucro (%)',                        `${results.profitPct.toFixed(2)}%`]
              ].map(([name, value]) => (
                <div key={name} className="flex justify-between items-center px-3 py-2 border border-zinc-700 rounded">
                  <span className="text-gray-200">{name}:</span>
                  <span className="text-[var(--azul-legiao)] font-semibold">{value}</span>
                </div>
              ))}
            </div>

            {/* Termômetros */}
            <div className="thermometer-container">
              <Termometro label="CTR"               value={results.ctr}  thresholds={{ bad: 1,  good: 2  }} unit="%" />
              <Termometro label="Connect Rate"      value={results.conn} thresholds={{ bad: 75, good: 90 }} unit="%" />
              <Termometro label="Conversão Página"  value={results.pconv} thresholds={{ bad: 5,  good: 10 }} unit="%" />
              <Termometro label="Conversão Checkout" value={results.cconv} thresholds={{ bad: 20, good: 40 }} unit="%" />
            </div>
          </div>
        </div>
      )}
    </div>
)
}
