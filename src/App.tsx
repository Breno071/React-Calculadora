import { useState } from "react";

function App() {
  const [calc, setCalc] = useState("");
  const [result, setResult] = useState("");

  const operadores = ["+", "-", "*", "/", "."];

  const updateCalc = (val: string) => {
    if(
      (operadores.includes(val) && calc === '') ||
      (operadores.includes(val) && operadores.includes(calc[calc.length - 1]))
      ){
        return;
      }
      setCalc(calc + val);
      if(!operadores.includes(val)){
        setResult(eval(calc + val).toString());
      }
  }

  const deletarUltimoDigito = () => {
    if(calc === '') return;
    const value = calc.slice(0, calc.length - 1);
    setCalc(value);
    if(value === ''){
      return setResult('');
    }
    if (operadores.includes(value.slice(-1))) {
      setResult(eval(value.toString().slice(0,-1)));  
    }
    else{
      setResult(eval(value.toString()));  
    }
    
    if (operadores.includes(value.slice(-1))) {
      setResult(eval(value.toString().slice(0,-1)));  
    }
    else{
      setResult(eval(value.toString()));  
    }
  }

  const calcular = () => {
    if(operadores.includes(calc[calc.length - 1])){
      return;
    }
    setCalc(eval(calc).toString());
  }

  const criarDigitos = () => {
    const digitos = [];
    for (let i = 1; i < 10; i++) {
      digitos.push(
        <button 
        onClick={() => updateCalc(i.toString())} 
        key={i}>
          {i}
          </button>
      );
    }
    return digitos;
  }

  return (
    <div className="App">
      <div className='calculadora'>
        <div className='display'>
          {result ? <span>({result})</span> : ''}&nbsp;
          {calc || "0"} 
        </div>
        <div className='operadores'>
          <button onClick={() => updateCalc("/")}>/</button>
          <button onClick={() => updateCalc("*")}>*</button>
          <button onClick={() => updateCalc("+")}>+</button>
          <button onClick={() => updateCalc("-")}>-</button>
          <button onClick={deletarUltimoDigito}>DEL</button>
        </div>

        <div className='digitos'>
          {criarDigitos()}
        <button onClick={() => updateCalc('0')}>0</button>
        <button onClick={() => updateCalc('.')}>.</button>
        <button onClick={calcular}>=</button>
        </div>
      </div>
    </div>
  );
}

export default App;
