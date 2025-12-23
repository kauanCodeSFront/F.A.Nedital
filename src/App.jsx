import { useState } from 'react'
import './App.css'

function App() {
  return (
    <main>
      <HeaderContent />
      <FormQuestion />
    </main>
  )
}

function HeaderContent() {
  return (
    <header>
      <h1>Edital F.A.N</h1>
    </header>
  )
}

function FormQuestion() {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setSuccess(false)

    const form = e.target

    const payload = {
      nome: form.nome.value,
      passaporte: form.passaporte.value,
      idade: form.idade.value,
      discord: form.discord.value,
      tempoCidade: form.tempoCidade.value,
      conhecimentos: form.conhecimentos.value,
      atendimento: form.atendimento.value,
      experiencia: form.experiencia.value,
      microfone: form.microfone.value,
      tempoDisponivel: form.tempoDisponivel.value,
      cnh: form.cnh.value,
      periodos: form.periodos.value,
    }

    try {
      await fetch("https://f-a-nedital.onrender.com/edital", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })

      setSuccess(true)
      form.reset()
    } catch (err) {
      console.error(err)
      alert("❌ Erro ao enviar o formulário")
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="form-container">
      <form onSubmit={handleSubmit} className="edital-form">

        <label>
          Nome do Personagem:
          <input name="nome" required />
        </label>

        <label>
          Idade:
          <input type="number" name="idade" required />
        </label>

        <label>
          Discord:
          <input name="discord" required />
        </label>

        <label>
          Tempo na cidade:
          <input name="tempoCidade" required />
        </label>

        <label>
          Conhecimentos:
          <input name="conhecimentos" required />
        </label>

        <label>
          Atendimento:
          <input name="atendimento" required />
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
          <input name="tempoDisponivel" />
        </label>

        <label>
          Períodos:
          <input name="periodos" />
        </label>

        <button type="submit" disabled={loading}>
          {loading ? "Enviando..." : "Enviar"}
        </button>

        {success && <p className="success-msg">✅ Formulário enviado com sucesso!</p>}
      </form>
    </section>
  )
}

export default App
