function converterMoeda(numero){
    let dinheiro = numero.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
    return dinheiro;
  }
  function formatarData(data){
    let ano = data.slice(0,4);
    let mes = data.slice(5, 7);
    let dia = data.slice(8, 10);
    let dataFormatada = `${dia}/${mes}/${ano}`;
    return dataFormatada
  }
  function formatarDataBanco(data){
    let novaData = data.split('/');
    let dia = novaData[0];
    let mes = novaData[1];
    let ano = novaData[2];
    let date = new Date(ano, mes-1, dia);
    return date.toISOString();
  }
  function getWeekDay(data){
    const date = new Date(data);
    const diaDaSemana = date.getDay();
  
    if(diaDaSemana === 0){
      return "Domingo";
    }
    else if(diaDaSemana === 1){
      return "Segunda";
    }
    else if(diaDaSemana === 2){
      return "Terça";
    }
    else if(diaDaSemana === 3){
      return "Quarta";
    }
    else if(diaDaSemana === 4){
      return "Quinta";
    }
    else if(diaDaSemana === 5){
      return "Sexta";
    }
    else if(diaDaSemana === 6){
      return "Sábado";
    }
  }
  function formatarDia(data){
    let novaData = data.split('/');
    let dia = novaData[0];
    let mes = novaData[1];
    let ano = novaData[2];
  
    let date = new Date(ano, mes-1, dia);
    let diaDaSemana = date.getDay();
  
    if(diaDaSemana === 0){
      return "Domingo";
    }
    else if(diaDaSemana === 1){
      return "Segunda";
    }
    else if(diaDaSemana === 2){
      return "Terça";
    }
    else if(diaDaSemana === 3){
      return "Quarta";
    }
    else if(diaDaSemana === 4){
      return "Quinta";
    }
    else if(diaDaSemana === 5){
      return "Sexta";
    }
    else if(diaDaSemana === 6){
      return "Sábado";
    }
  }
  function gerarEntrada(dados){
    let entrada = dados.filter((dado) => dado.type === 'credit');
    let somaEntrada = 0;
    for(let i = 0; i < entrada.length; i++){
      somaEntrada += Number(entrada[i].value);
    }
    return somaEntrada;
  }
  function gerarSaida(dados){
    let saida = dados.filter((dado) => dado.type === 'debit');
    let somaSaida = 0;
    for(let i = 0; i < saida.length; i++){
      somaSaida += Number(saida[i].value);
    }
    return somaSaida;
  }
  function gerarSaldo(dados){
    let somaEntrada = gerarEntrada(dados);
    let somaSaida = gerarSaida(dados);
    let saldo = somaEntrada - somaSaida;
    return saldo;  
  }

module.exports = {
    converterMoeda,
    formatarData,
    formatarDataBanco,
    getWeekDay,
    formatarDia,
    gerarEntrada,
    gerarSaida,
    gerarSaldo
}