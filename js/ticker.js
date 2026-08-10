document.addEventListener('DOMContentLoaded', () => {
  const tickerWrap = document.getElementById('market-ticker');
  if (!tickerWrap) return;

  fetch('https://economia.awesomeapi.com.br/last/USD-BRL,EUR-BRL,BTC-BRL')
    .then(response => response.json())
    .then(data => {
      const usd = parseFloat(data.USDBRL.bid).toFixed(2).replace('.', ',');
      const usdPct = data.USDBRL.pctChange;
      const usdColor = usdPct >= 0 ? 'text-green' : 'text-red';

      const eur = parseFloat(data.EURBRL.bid).toFixed(2).replace('.', ',');
      const eurPct = data.EURBRL.pctChange;
      const eurColor = eurPct >= 0 ? 'text-green' : 'text-red';

      const btc = parseFloat(data.BTCBRL.bid).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
      const btcPct = data.BTCBRL.pctChange;
      const btcColor = btcPct >= 0 ? 'text-green' : 'text-red';

      const tickerContent = `
        <div class="ticker-move">
          <div class="ticker-item">USD: R$ ${usd} <span class="${usdColor}">(${usdPct}%)</span></div>
          <div class="ticker-item">EUR: R$ ${eur} <span class="${eurColor}">(${eurPct}%)</span></div>
          <div class="ticker-item">BTC: ${btc} <span class="${btcColor}">(${btcPct}%)</span></div>
          <div class="ticker-item">USD: R$ ${usd} <span class="${usdColor}">(${usdPct}%)</span></div>
          <div class="ticker-item">EUR: R$ ${eur} <span class="${eurColor}">(${eurPct}%)</span></div>
          <div class="ticker-item">BTC: ${btc} <span class="${btcColor}">(${btcPct}%)</span></div>
        </div>
      `;
      tickerWrap.innerHTML = tickerContent;
    })
    .catch(error => console.error('Erro ao buscar cotações:', error));
});
