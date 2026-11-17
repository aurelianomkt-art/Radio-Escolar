import React, { useState } from "react";
import { LuCalendarDays, LuPencil } from "react-icons/lu";
import Player from "../components/Player";
import AgendaDia from "../components/AgendaDia";
import { hojeIso } from "../api";
import { Cabecalho, useApp } from "../ui";

export default function RadioEscolar() {
  const { painel, ir, trocarModo, config } = useApp();
  const [data, setData] = useState(hojeIso());
  const a = config?.agenda;
  return (
    <div>
      <Cabecalho titulo="Rádio Escolar">
        {painel?.modo !== "Escolar" && (
          <button className="btn primario grande" onClick={() => trocarModo("Escolar")}>
            Voltar ao Rádio Escolar
          </button>
        )}
        <button className="btn" onClick={() => ir("programacao")}>
          <LuPencil /> Editar programação
        </button>
      </Cabecalho>
      <div className="grade d2">
        <div className="grade" style={{ alignContent: "start" }}>
          <Player />
          <div className="cartao">
            <h2>Como a programação funciona</h2>
            <ul className="pequeno" style={{ lineHeight: 1.6, margin: 0, paddingLeft: "1.1rem" }}>
              <li><b>Trocas de professor:</b> uma música completa por horário, sem sobreposição (limite de duração opcional por evento).</li>
              <li><b>Recepção e recreio:</b> músicas em sequência até o horário final, com fade-out no limite (ou terminar a faixa, se configurado).</li>
              <li><b>Mesmo minuto:</b> o recreio prevalece sobre a sinalização (09:30 e 15:30). Nunca tocam duas músicas juntas.</li>
              <li><b>Computador desligado, suspenso ou relógio alterado:</b> horários perdidos <u>não</u> são tocados depois.</li>
              <li><b>Reinício durante recepção/recreio:</b> {a?.retomarJanelaAposReinicio ? "retoma a playlist da janela atual" : "não retoma automaticamente"} (configurável).</li>
              <li><b>Silenciar agora</b> bloqueia tudo até alguém tocar em Retomar.</li>
            </ul>
          </div>
        </div>
        <div className="cartao">
          <div className="flex" style={{ marginBottom: 10 }}>
            <h2 style={{ margin: 0 }}>
              <LuCalendarDays /> Agenda do dia
            </h2>
            <span className="espaco" />
            <input type="date" value={data} onChange={(e) => setData(e.target.value || hojeIso())} aria-label="Escolher dia" />
          </div>
          <AgendaDia data={data} />
        </div>
      </div>
    </div>
  );
}
