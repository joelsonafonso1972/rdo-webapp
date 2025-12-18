import { useState } from "react";

// Lista de funções utilizadas em obra eletromecânica
const funcoesPadrao = [
  "Supervisor Mecânico",
  "Encarregado Mecânico",
  "Mecânico",
  "Ajudante",
  "Montador Mecânico",
  "Montador de Andaime",
  "Encarregado de Andaime",
  "Caldeireiro",
  "Soldador",
  "Ajudante de Soldador",
  "Montador Industrial",
  "Rigger",
  "Sinaleiro",
  "Operador de Guindaste",
  "Operador PTA",
  "Operador de Manipulador",
  "Operador de Empilhadeira",
  "Eletricista",
  "Eletricista Força e Controle",
  "Técnica de Meio Ambiente",
  "ASG / Serviços Gerais"
];

export default function App() {
  const [data, setData] = useState("");
  const [local, setLocal] = useState("");
  const [fiscal, setFiscal] = useState("");
  const [clima, setClima] = useState("Estável");

  const [frentes, setFrentes] = useState<any[]>([]);
  const [novaFrente, setNovaFrente] = useState("");

  const adicionarFrente = () => {
    if (!novaFrente) return;
    setFrentes([...frentes, { nome: novaFrente, funcoes: [], fotos: [] }]);
    setNovaFrente("");
  };

  const adicionarFuncao = (i: number) => {
    const novo = [...frentes];
    novo[i].funcoes.push({ funcao: "", quantidade: 0, atividades: "" });
    setFrentes(novo);
  };

  const atualizarFuncao = (iFrente: number, iFuncao: number, campo: string, valor: any) => {
    const novo = [...frentes];
    novo[iFrente].funcoes[iFuncao][campo] = valor;
    setFrentes(novo);
  };

  const removerFuncao = (iFrente: number, iFuncao: number) => {
    const novo = [...frentes];
    novo[iFrente].funcoes.splice(iFuncao, 1);
    setFrentes(novo);
  };

  const adicionarFotos = (iFrente: number, arquivos: any) => {
    const novo = [...frentes];
    const imagens = Array.from(arquivos).map((arq: any) => ({
      url: URL.createObjectURL(arq)
    }));
    novo[iFrente].fotos.push(...imagens);
    setFrentes(novo);
  };

  return (
    <div style={{ padding: 20, maxWidth: 900, margin: "auto" }}>
      <h1>RDO – Montagem Mecânica</h1>

      <h2>Dados Gerais</h2>
      <input type="date" value={data} onChange={(e) => setData(e.target.value)} style={{ display: "block", marginBottom: 10 }} />
      <input type="text" placeholder="Local" value={local} onChange={(e) => setLocal(e.target.value)} style={{ display: "block", marginBottom: 10 }} />
      <input type="text" placeholder="Fiscal" value={fiscal} onChange={(e) => setFiscal(e.target.value)} style={{ display: "block", marginBottom: 10 }} />

      <label>Clima: </label>
      <select value={clima} onChange={(e) => setClima(e.target.value)} style={{ marginLeft: 10 }}>
        <option>Estável</option>
        <option>Chuva</option>
        <option>Nublado</option>
        <option>Alerta Vermelho</option>
      </select>

      <hr style={{ margin: "20px 0" }} />

      <h2>Frentes de Trabalho</h2>
      <input type="text" placeholder="Nome da frente" value={novaFrente} onChange={(e) => setNovaFrente(e.target.value)} />
      <button onClick={adicionarFrente} style={{ marginLeft: 10 }}>Adicionar Frente</button>

      {frentes.map((frente, i) => (
        <div key={i} style={{ background: "#fff", padding: 15, marginTop: 15, borderRadius: 6, border: "1px solid #ccc" }}>
          <h3>{frente.nome}</h3>

          <button onClick={() => adicionarFuncao(i)}>Adicionar Função</button>

          {frente.funcoes.map((func, j) => (
            <div key={j} style={{ background: "#f7f7f7", padding: 10, marginTop: 10, borderRadius: 6 }}>
              <select value={func.funcao} onChange={(e) => atualizarFuncao(i, j, "funcao", e.target.value)} style={{ display: "block", marginBottom: 10 }}>
                <option value="">Selecione a função</option>
                {funcoesPadrao.map((f, index) => (
                  <option key={index} value={f}>{f}</option>
                ))}
              </select>

              <input type="number" placeholder="Quantidade" value={func.quantidade} onChange={(e) => atualizarFuncao(i, j, "quantidade", Number(e.target.value))} style={{ display: "block", marginBottom: 10 }} />

              <textarea placeholder="Atividades" value={func.atividades} onChange={(e) => atualizarFuncao(i, j, "atividades", e.target.value)} style={{ width: "100%", height: 60 }} />

              <button onClick={() => removerFuncao(i, j)} style={{ marginTop: 5, background: "red", color: "white", padding: 5 }}>Remover</button>
            </div>
          ))}

          <h4>Fotos</h4>
          <input type="file" multiple accept="image/*" onChange={(e) => adicionarFotos(i, e.target.files)} />

          <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: 10 }}>
            {frente.fotos.map((foto: any, k: number) => (
              <img key={k} src={foto.url} style={{ width: 120, height: 120, objectFit: "cover", borderRadius: 6 }} />
            ))}
          </div>
        </div>
      ))}

      <hr style={{ margin: "20px 0" }} />

      <h2>Resumo do RDO</h2>
      <p><strong>Data:</strong> {data}</p>
      <p><strong>Local:</strong> {local}</p>
      <p><strong>Fiscal:</strong> {fiscal}</p>
      <p><strong>Clima:</strong> {clima}</p>

      {frentes.map((frente, i) => (
        <div key={i} style={{ marginTop: 20 }}>
          <h3>{frente.nome}</h3>
          {frente.funcoes.map((f, j) => (
            <p key={j}>{f.funcao} — {f.quantidade} pessoas — {f.atividades}</p>
          ))}
        </div>
      ))}
    </div>
  );
}
