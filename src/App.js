import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [result, setResult] = useState(null);
  const [historico, setHistorico] = useState([]);

  // Carrega o histórico ao abrir o app
  useEffect(() => {
    const historicoSalvo = localStorage.getItem('historicoCalculadora');
    if (historicoSalvo) {
      setHistorico(JSON.parse(historicoSalvo));
    }
  }, []);

  // Salva o histórico sempre que ele mudar
  useEffect(() => {
    localStorage.setItem('historicoCalculadora', JSON.stringify(historico));
  }, [historico]);

  const calcular = (operacao) => {
    const n1 = parseFloat(num1);
    const n2 = parseFloat(num2);
    let calculoAtual = 0;
    let simbolo = operacao;

    if (operacao === '*') simbolo = 'x';

    switch (operacao) {
      case '+': calculoAtual = n1 + n2; break;
      case '-': calculoAtual = n1 - n2; break;
      case '*': calculoAtual = n1 * n2; break;
      case '/': 
        calculoAtual = n2 !== 0 ? n1 / n2 : "Erro"; 
        break;
      default: return;
    }

    setResult(calculoAtual);

    const novaEntrada = `${n1} ${simbolo} ${n2} = ${calculoAtual}`;
    setHistorico([novaEntrada, ...historico].slice(0, 5));
  };

  const limparTudo = () => {
    setNum1(0);
    setNum2(0);
    setResult(null);
    setHistorico([]);
  };

  const detectoEnter = (e) => {
    if (e.key === 'Enter') {
      calcular('+');
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h1>Calculadora Pro</h1>
        <p>Insira os valores para calcular</p>
        
        <div className="inputs">
          <input 
            type="number" 
            value={num1} 
            onChange={(e) => setNum1(e.target.value)} 
            onKeyDown={detectoEnter}
            placeholder="0"
          />
          <span className="plus">+</span>
          <input 
            type="number" 
            value={num2} 
            onChange={(e) => setNum2(e.target.value)} 
            onKeyDown={detectoEnter} 
            placeholder="0"
          />
        </div>

        <div className="botoes-grade">
          <button onClick={() => calcular('+')}>+</button>
          <button onClick={() => calcular('-')}>-</button>
          <button onClick={() => calcular('*')}>x</button>
          <button onClick={() => calcular('/')}>/</button>
        </div>

        {result !== null && (
          <div className="resultado-container">
            <span className="label-resultado">Resultado Atual</span>
            <div className={`resultado-valor ${
              typeof result === 'number' ? (result > 0 ? 'positivo' : result < 0 ? 'negativo' : 'zero') : 'zero'
            }`}>
              {result}
            </div>
          </div>
        )}

        {historico.length > 0 && (
          <div className="historico">
            <h3>Últimos Cálculos</h3>
            <ul>
              {historico.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
            <button className="btn-limpar" onClick={limparTudo}>Limpar Tudo</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;