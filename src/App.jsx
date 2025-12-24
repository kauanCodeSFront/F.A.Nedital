import { useState } from 'react';
import './App.css';
import f22 from './assets/f22.jpg';

function App() {
  return (
    <main>
      <HeaderHero />
      <FormQuestion />
    </main>
  );
}

function HeaderHero() {
  return (
    <header className="hero">
      <div className="hero-overlay">
        <h1>Edital F.A.N</h1>
        <p>Vagas Abertas</p>
        <button className="hero-btn">Inscreva-se</button>
      </div>
    </header>
  );
}

function FormQuestion() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);

    const form = e.target;

    const payload = {
      nome: form.nome.value,
      idade: form.idade.value,
      discord: form.discord.value,
      tempoCidade: form.tempoCidade.value,
      conhecimentos: form.conhecimentos.value,
      atendimento: form.atendimento.value,
      experiencia: form.experiencia.value,
      microfone: form.microfone.value,
      tempoDisponivel: form.tempoDisponivel?.value,
      cnh: form.cnh?.value,
      periodos: form.periodos?.value,
    };

    try {
      await fetch("https://f-a-nedital.onrender.com/edital", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      setSuccess(true);
      form.reset();
    } catch (err) {
      console.error(err);
      alert("❌ Erro ao enviar o formulário");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="form-container">
      <form onSubmit={handleSubmit} className="edital-form">
        <label>
          Nome do Personagem:
          <input name="nome" required className="input" />
        </label>
        <label>
          Idade:
          <input type="number" name="idade" className="input" required />
        </label>
        <label>
          Discord:
          <input name="discord" className="input" required />
        </label>
        <label>
          Tempo na cidade:
          <input name="tempoCidade" className="input" required />
        </label>
        <label>
          Conhecimentos:
          <input name="conhecimentos" className="input" required />
        </label>
        <label>
          Atendimento:
          <input name="atendimento" className="input" required />
        </label>
        <label>
          Experiência:
          <textarea name="experiencia" rows={4} required />
        </label>
        <fieldset>
          <legend>Microfone</legend>
          <label><input type="radio" name="microfone" value="Bom" required /> Bom</label>
          <label><input type="radio" name="microfone" value="Ruim" /> Ruim</label>
          <label><input type="radio" name="microfone" value="Sem" /> Sem</label>
        </fieldset>
        <label>
          Tempo disponível:
          <input name="tempoDisponivel" className="input" />
        </label>
        <label>
          Períodos:
          <input name="periodos" className="input" />
        </label>
        <button type="submit" disabled={loading}>
          {loading ? "Enviando..." : "Enviar"}
        </button>
        {success && <p className="success-msg">✅ Formulário enviado com sucesso!</p>}
      </form>
    </section>
  );
}

export default App;
