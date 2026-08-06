const fs = require('fs');

const css = `
/* ══════════════════════════════════════════════════════
   CONTATO PAGE - GRID LAYOUT
══════════════════════════════════════════════════════ */
.contact-header {
  text-align: center;
  margin-bottom: 48px;
}
.contact-title {
  font-size: 2.5rem;
  font-weight: 800;
  color: var(--text-dark);
  margin-bottom: 16px;
  letter-spacing: -0.02em;
}
.contact-subtitle {
  font-size: 1.15rem;
  color: var(--text-muted);
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
}

.contact-layout {
  display: grid;
  grid-template-columns: 1fr;
  gap: 32px;
  margin-bottom: 64px;
}
@media (min-width: 992px) {
  .contact-layout {
    grid-template-columns: 1fr 1.3fr;
    gap: 40px;
  }
}

.contact-card {
  background: var(--white);
  padding: 40px;
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-sm);
  border: 1px solid rgba(15,23,42,.06);
}

.contact-info-list {
  display: flex;
  flex-direction: column;
  gap: 24px;
  margin-bottom: 40px;
}
.info-item {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  padding-bottom: 24px;
  border-bottom: 1px solid rgba(15,23,42,.06);
}
.info-item:last-child {
  border-bottom: none;
  padding-bottom: 0;
}
.info-icon {
  width: 48px; height: 48px;
  background: rgba(37,99,235,0.08);
  color: var(--primary);
  border-radius: 12px;
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0;
}
.info-icon.gold {
  background: rgba(245,158,11,0.1);
  color: var(--gold);
}
.info-content h4 {
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--text-dark);
  margin-bottom: 4px;
}
.info-content p {
  color: var(--text-muted);
  font-size: 0.9rem;
  margin-bottom: 4px;
}
.info-content a {
  color: var(--primary);
  font-weight: 600;
}

.policy-list {
  list-style: none;
  padding: 0;
}
.policy-list li {
  font-size: 0.95rem;
  color: var(--text-muted);
  margin-bottom: 12px;
  padding-left: 20px;
  position: relative;
}
.policy-list li::before {
  content: '•';
  position: absolute;
  left: 0;
  color: var(--primary);
  font-weight: bold;
}

/* Form Styles */
.form-group {
  margin-bottom: 24px;
}
.form-group label {
  display: block;
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--text-dark);
  margin-bottom: 8px;
}
.form-control {
  width: 100%;
  padding: 14px 16px;
  border: 1px solid rgba(15,23,42,.15);
  border-radius: var(--radius-md);
  font-size: 1rem;
  color: var(--text-dark);
  background: var(--bg-light);
  transition: border-color 0.2s, box-shadow 0.2s;
  font-family: inherit;
}
.form-control:focus {
  outline: none;
  border-color: var(--primary);
  box-shadow: 0 0 0 3px rgba(37,99,235,0.1);
  background: var(--white);
}
textarea.form-control {
  resize: vertical;
  min-height: 140px;
}
.checkbox-group {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  margin-bottom: 16px;
}
.checkbox-group input {
  margin-top: 4px;
}
.checkbox-group label {
  font-size: 0.9rem;
  color: var(--text-muted);
  margin: 0;
  font-weight: 400;
}
.btn-submit {
  width: 100%;
  padding: 16px;
  background: var(--primary);
  color: white;
  border: none;
  border-radius: var(--radius-md);
  font-size: 1.05rem;
  font-weight: 700;
  cursor: pointer;
  transition: background 0.2s, transform 0.2s;
  margin-top: 8px;
}
.btn-submit:hover {
  background: #1d4ed8;
  transform: translateY(-2px);
}
.form-footer {
  text-align: center;
  margin-top: 16px;
  font-size: 0.85rem;
  color: var(--text-muted);
}

/* FAQ Box */
.faq-box, .hours-box {
  background: var(--white);
  padding: 40px;
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-sm);
  border: 1px solid rgba(15,23,42,.06);
  margin-bottom: 32px;
}
.faq-title {
  font-size: 1.5rem;
  font-weight: 800;
  color: var(--text-dark);
  margin-bottom: 32px;
  text-align: center;
}
.faq-item {
  margin-bottom: 24px;
}
.faq-item:last-child {
  margin-bottom: 0;
}
.faq-item h5 {
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--text-dark);
  margin-bottom: 8px;
}
.faq-item p {
  color: var(--text-muted);
  line-height: 1.6;
}
.hours-content {
  text-align: center;
}
.hours-content p {
  font-size: 1.05rem;
  color: var(--text-dark);
  margin-bottom: 8px;
}
`;

fs.appendFileSync('css/style.css', '\n' + css);

let html = fs.readFileSync('contato.html', 'utf8');
const mainRegex = /(<main[^>]*>)([\s\S]*?)(<\/main>)/i;

const mainContent = `
  <section class="section">
    <div class="container" style="max-width: 1100px;">
      
      <div class="contact-header">
        <h1 class="contact-title">Entre em Contato</h1>
        <p class="contact-subtitle">Estamos aqui para ajudar! Entre em contato conosco para dúvidas, sugestões ou parcerias.</p>
      </div>

      <div class="contact-layout">
        
        <!-- Left Column: Contact Info -->
        <div class="contact-card">
          <h3 style="font-size: 1.5rem; font-weight: 800; color: var(--text-dark); margin-bottom: 32px;">Informações de Contato</h3>
          
          <div class="contact-info-list">
            
            <div class="info-item">
              <div class="info-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M4 7l8 5.333L20 7M4 17h16c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2H4C2.9 2 2 2.9 2 4v10c0 1.1.9 2 2 2z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
              </div>
              <div class="info-content">
                <h4>E-mail</h4>
                <a href="mailto:contato@dinheironu.com.br">contato@dinheironu.com.br</a>
                <p>Resposta em até 24 horas</p>
              </div>
            </div>
            
            <div class="info-item">
              <div class="info-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M9 9h6M9 13h4" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
              </div>
              <div class="info-content">
                <h4>Suporte Técnico</h4>
                <a href="mailto:suporte@dinheironu.com.br">suporte@dinheironu.com.br</a>
                <p>Para problemas com calculadoras</p>
              </div>
            </div>
            
            <div class="info-item">
              <div class="info-icon gold">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><line x1="7" y1="7" x2="7.01" y2="7" stroke="currentColor" stroke-width="3" stroke-linecap="round"/></svg>
              </div>
              <div class="info-content">
                <h4>Parcerias</h4>
                <a href="mailto:parcerias@dinheironu.com.br">parcerias@dinheironu.com.br</a>
                <p>Para colaborações e negócios</p>
              </div>
            </div>
            
            <div class="info-item">
              <div class="info-icon" style="background: rgba(16,185,129,0.1); color: var(--green);">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><rect x="3" y="11" width="18" height="11" rx="2" stroke="currentColor" stroke-width="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
              </div>
              <div class="info-content">
                <h4>Privacidade</h4>
                <a href="mailto:privacidade@dinheironu.com.br">privacidade@dinheironu.com.br</a>
                <p>Dúvidas sobre LGPD e dados</p>
              </div>
            </div>

          </div>
          
          <h4 style="font-size: 1.1rem; font-weight: 700; color: var(--text-dark); margin-bottom: 16px;">Política de Resposta</h4>
          <ul class="policy-list">
            <li><strong>E-mails gerais:</strong> Resposta em até 24 horas úteis</li>
            <li><strong>Suporte técnico:</strong> Resposta em até 48 horas úteis</li>
            <li><strong>Parcerias:</strong> Análise e resposta em até 72 horas úteis</li>
            <li><strong>Fins de semana:</strong> Respostas na segunda-feira seguinte</li>
          </ul>
        </div>

        <!-- Right Column: Form -->
        <div class="contact-card">
          <h3 style="font-size: 1.5rem; font-weight: 800; color: var(--text-dark); margin-bottom: 8px;">Formulário de Contato</h3>
          <p style="color: var(--text-muted); margin-bottom: 32px; font-size: 0.95rem;">Preencha o formulário abaixo e entraremos em contato o mais breve possível.</p>
          
          <form action="#" method="POST" id="contact-form">
            <div class="form-group">
              <label for="name">Nome Completo *</label>
              <input type="text" id="name" name="name" class="form-control" placeholder="Seu nome completo" required>
            </div>
            
            <div class="form-group">
              <label for="email">E-mail *</label>
              <input type="email" id="email" name="email" class="form-control" placeholder="seu@email.com" required>
            </div>
            
            <div class="form-group">
              <label for="subject">Assunto *</label>
              <select id="subject" name="subject" class="form-control" required>
                <option value="" disabled selected>Selecione um assunto</option>
                <option value="duvida">Dúvida Financeira</option>
                <option value="sugestao">Sugestão de Melhoria</option>
                <option value="bug">Problema Técnico/Bug</option>
                <option value="parceria">Proposta de Parceria</option>
                <option value="outro">Outro</option>
              </select>
            </div>
            
            <div class="form-group">
              <label for="message">Mensagem *</label>
              <textarea id="message" name="message" class="form-control" placeholder="Descreva sua dúvida, sugestão ou solicitação..." required></textarea>
            </div>
            
            <div class="checkbox-group">
              <input type="checkbox" id="newsletter" name="newsletter" checked>
              <label for="newsletter">Desejo receber dicas financeiras semanais por e-mail (opcional)</label>
            </div>
            
            <div class="checkbox-group">
              <input type="checkbox" id="privacy" name="privacy" required>
              <label for="privacy">Concordo com a <a href="privacidade.html" style="color: var(--primary); text-decoration: underline;">Política de Privacidade</a> *</label>
            </div>
            
            <button type="submit" class="btn-submit">Enviar Mensagem</button>
            <p class="form-footer">* Campos obrigatórios.<br>Seus dados serão tratados conforme nossa <a href="privacidade.html" style="color: var(--primary);">Política de Privacidade</a>.</p>
          </form>
        </div>

      </div>

      <!-- FAQ Section -->
      <div class="faq-box">
        <h3 class="faq-title">Perguntas Frequentes</h3>
        
        <div class="faq-item">
          <h5>Como posso sugerir um novo artigo?</h5>
          <p>Use o formulário acima selecionando "Sugestão de Melhoria" ou envie um e-mail para <a href="mailto:contato@dinheironu.com.br" style="color: var(--primary);">contato@dinheironu.com.br</a> com sua ideia. Adoramos receber pautas dos nossos leitores!</p>
        </div>
        
        <div class="faq-item">
          <h5>As ferramentas são realmente gratuitas?</h5>
          <p>Sim! Todas as nossas ferramentas, calculadoras e simuladores são 100% gratuitos e sempre serão. O acesso à educação financeira deve ser livre.</p>
        </div>
        
        <div class="faq-item">
          <h5>Posso usar o conteúdo em meu site?</h5>
          <p>Para uso educacional e não comercial, sim, desde que você inclua um link claro e direto para a página original como fonte. Para uso comercial, entre em contato conosco e consulte nossos <a href="termos.html" style="color: var(--primary);">Termos de Uso</a>.</p>
        </div>
        
        <div class="faq-item">
          <h5>Como cancelar a assinatura da newsletter?</h5>
          <p>Basta clicar no link "Cancelar Inscrição" localizado no rodapé de qualquer e-mail que enviamos. A remoção é automática e imediata.</p>
        </div>
      </div>
      
      <!-- Hours Box -->
      <div class="hours-box">
        <h3 class="faq-title" style="margin-bottom: 24px;">Horário de Atendimento</h3>
        <div class="hours-content">
          <p><strong>Segunda a Sexta:</strong> 9h às 18h (horário de Brasília)</p>
          <p><strong>Fins de semana e feriados:</strong> Respostas na segunda-feira seguinte</p>
        </div>
      </div>

    </div>
  </section>
`;

let newHtml = html.replace(mainRegex, `$1\n${mainContent}\n$3`);
fs.writeFileSync('contato.html', newHtml);
console.log("contato.html updated successfully with complex form layout.");
