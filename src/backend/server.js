import express from "express";
import cors from "cors";
import fetch from "node-fetch"; // npm install node-fetch

const app = express();
const PORT = process.env.PORT || 3001;
const WEBHOOK_URL = "https://discord.com/api/webhooks/1452451371574890568/J3YypH0AIyu2KHPt77yHH7jzuXhlbX8nz38GPpzVuP95b9bTIBPtBncT11anoy4hvfkg";

app.use(cors());
app.use(express.json());

app.post("/edital", async (req, res) => {
    const data = req.body;

    try {
        await fetch(WEBHOOK_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                content: "<@&1408516269581271071>", // menção ao cargo
                embeds: [
                    {
                        title: "📋 Novo envio de formulário F.A.N",
                        color: 0x255F38, // verde
                        fields: [
                            { name: "Nome", value: data.nome || "Não informado" },
                            { name: "Idade IRL", value: data.idade || "Não informado", inline: true },
                            { name: "Discord", value: data.discord || "Não informado", inline: true },
                            { name: "Tempo na cidade", value: data.tempoCidade || "Não informado" },
                            { name: "Conhecimentos", value: data.conhecimentos || "Não informado" },
                            { name: "Atendimento", value: data.atendimento || "Não informado" },
                            { name: "Experiência", value: data.experiencia || "Não informado" },
                            { name: "Microfone", value: data.microfone || "Não informado" },
                            { name: "Disponibilidade", value: data.tempoDisponivel || "Não informado" },
                            { name: "CNH", value: data.cnh || "Não informado" },
                            { name: "Períodos", value: data.periodos || "Não informado" },
                        ],
                    },
                ],
            }),
        });

        res.status(200).json({ message: "Formulário enviado com sucesso!" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Erro ao enviar para a webhook." });
    }

});


app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
