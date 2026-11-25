document.addEventListener('DOMContentLoaded', () => {
  const tickerWrap = document.getElementById('market-ticker');
  if (!tickerWrap) return;

  const setFallback = () => {
    tickerWrap.textContent = '';
    const note = document.createElement('div');
    note.style.width = '100%';
    note.style.textAlign = 'center';
    note.style.padding = '0 16px';
    note.style.fontSize = '0.76rem';
    note.style.color = '#cbd5e1';
    note.textContent = 'Fazendo Dinheiro — Educação financeira informativa e gratuita';
    tickerWrap.appendChild(note);
  };

  const controller = typeof AbortController !== 'undefined' ? new AbortController() : null;
  const timeoutId = controller ? setTimeout(() => controller.abort(), 6000) : null;

  fetch('https://economia.awesomeapi.com.br/last/USD-BRL,EUR-BRL,BTC-BRL', controller ? { signal: controller.signal } : {})
    .then(response => {
      if (!response.ok) throw new Error('Ticker HTTP error');
      return response.json();
    })
    .then(data => {
      if (timeoutId) clearTimeout(timeoutId);
      if (!data || !data.USDBRL || !data.EURBRL || !data.BTCBRL) {
        setFallback();
        return;
      }

      const usdVal = parseFloat(data.USDBRL.bid);
      const usdPct = parseFloat(data.USDBRL.pctChange);
      const eurVal = parseFloat(data.EURBRL.bid);
      const eurPct = parseFloat(data.EURBRL.pctChange);
      const btcVal = parseFloat(data.BTCBRL.bid);
      const btcPct = parseFloat(data.BTCBRL.pctChange);

      if (![usdVal, usdPct, eurVal, eurPct, btcVal, btcPct].every(Number.isFinite)) {
        setFallback();
        return;
      }

      const entries = [
        { label: 'USD/BRL', value: `R$ ${usdVal.toFixed(2).replace('.', ',')}`, pct: usdPct },
        { label: 'EUR/BRL', value: `R$ ${eurVal.toFixed(2).replace('.', ',')}`, pct: eurPct },
        { label: 'BTC/BRL', value: btcVal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }), pct: btcPct },
        { label: 'Fonte', value: 'AwesomeAPI', pct: null }
      ];

      const move = document.createElement('div');
      move.className = 'ticker-move';

      [...entries, ...entries].forEach(item => {
        const div = document.createElement('div');
        div.className = 'ticker-item';

        const lbl = document.createElement('span');
        lbl.className = 'ticker-label';
        lbl.textContent = item.label;

        const val = document.createElement('span');
        val.className = 'ticker-value';
        val.textContent = item.value;

        div.appendChild(lbl);
        div.appendChild(val);

        if (item.pct !== null) {
          const chg = document.createElement('span');
          chg.className = item.pct >= 0 ? 'ticker-change positive' : 'ticker-change negative';
          const sign = item.pct > 0 ? '+' : '';
          chg.textContent = `(${sign}${item.pct.toFixed(2).replace('.', ',')}%)`;
          div.appendChild(chg);
        }

        move.appendChild(div);
      });

      tickerWrap.textContent = '';
      tickerWrap.appendChild(move);
    })
    .catch(() => {
      if (timeoutId) clearTimeout(timeoutId);
      setFallback();
    });
});
