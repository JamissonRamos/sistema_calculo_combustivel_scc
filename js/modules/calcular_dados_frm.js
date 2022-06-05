
export async function receberDadosFrm(inputMedia, inputPreco, inputQuilometrosDia, inputDiasSemana)
{
    let resulDiario = valoresCal(1,inputQuilometrosDia,inputMedia,inputPreco);
    let resulSemanal = valoresCal(2,inputQuilometrosDia,inputMedia,inputPreco,inputDiasSemana);
    let resulMensal = valoresCal(3,inputQuilometrosDia,inputMedia,inputPreco,inputDiasSemana);
    let resulAnual = valoresCal(4,inputQuilometrosDia,inputMedia,inputPreco);

    let arrayDadosCalculados = await new ObjDadosCalculados(inputPreco, inputMedia, resulDiario, resulSemanal, resulMensal, resulAnual);
    
    //console.log(arrayDadosCalculados);
  
    return arrayDadosCalculados;

};

function valoresCal(typeCalculo,  mediaCarro, valorGasolina , qtdKmDia, diaSeman) 
{
    let resultadoCalculo = 0 

    switch (typeCalculo)
    {
        case 1: //calcularDiario
            
            resultadoCalculo = (valorGasolina / mediaCarro) * qtdKmDia;
            // console.log((valorGasolina / mediaCarro) * qtdKmDia)
            break;

        case 2: //calcularSemanal
            resultadoCalculo = (valorGasolina / mediaCarro) * qtdKmDia * diaSeman;
            // console.log(((valorGasolina / mediaCarro) * qtdKmDia) * diaSeman)
            break;

        case 3: //calcularMensal
            resultadoCalculo = (valorGasolina / mediaCarro) * qtdKmDia * 30;
            // console.log(((valorGasolina / mediaCarro) * qtdKmDia) * 30)
            break;

        case 4: //calcularAnual
            resultadoCalculo = (valorGasolina / mediaCarro) * qtdKmDia * 365;
            // console.log(((valorGasolina / mediaCarro) * qtdKmDia) * 365)
            break;

        default:
            break;
    }

    return resultadoCalculo
}

function ObjDadosCalculados(inputPreco, inputMedia, resulDiario, resulSemanal, resulMensal, resulAnual) 
{
    this.inputPreco =  inputPreco;
    this.inputMedia = inputMedia;
    this.gastoDiario = resulDiario;
    this.gastoSemanal = resulSemanal;
    this.gastoMensal = resulMensal;
    this.gastoAual = resulAnual;
};