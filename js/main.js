import {addcl,remcl} from "./modules/animacoes.js";
import {ValidatorCampos} from "./modules/validacao_campo.js";
import {receberDadosFrm} from "./modules/calcular_dados_frm.js";
import {abrirCard, configCard} from "./modules/msgbox.js";

//#region Variáveis 

//recebe todos os inputs do frm
const inputs = document.querySelectorAll(".campo");

let inputMedia              = 0;
let inputPreco              = 0;
let inputQuilometrosDia     = 0;
let inputDiasSemana         = 0;

//Inicia a minha chamada da função
let validator = new ValidatorCampos();

//#region =*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*

//#region Funções

function modal(id) 
{

    switch (id) 
    {
        case 1: //Btn Meus Históricos
            idDivModal.classList.toggle("active");
            idDivTebelaHistorico.classList.toggle("active");

            break;

        case 2: //Btn Mostra Cálculos
            idDivModal.classList.toggle("active");
    
            idDivResposta.classList.toggle("active");

            break;

        case 3: //Mostra modal Sem Registo
            idDivModal.classList.toggle("active");
    
            idDivSemRegistro.classList.toggle("active");

            break;
    
        default:
            break;
    };

    
}

function dadosPegoForm() 
{
    const frm = document.forms.idFormCadastro;

    const {media, preco, quilometros_dia, dias_semana} = frm;

    inputMedia =  parseFloat(media.value);
    inputPreco = parseFloat(preco.value);        
    inputQuilometrosDia =  parseFloat(quilometros_dia.value);
    inputDiasSemana =  parseFloat(dias_semana.value);        
}

// function mostraModal(preco, media, valorDiario, valorSemanal, valorMensal, valorAnual)
function mostraModal(obj)
{
    console.log(obj)

    const {gastoAual, gastoDiario, gastoMensal, gastoSemanal, inputMedia, inputPreco} = obj
    
    idSpanGatoD.textContent = gastoDiario.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})  ;
    idSpanGatoS.textContent = gastoSemanal.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})  ;
    idSpanGatoM.textContent = gastoMensal.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})  ;
    idSpanGatoA.textContent = gastoAual.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})  ;

    // arrayValoresCalculados.push
    // (
    //     preco.toFixed(2),
    //     media,
    //     valorDiario.toFixed(2),
    //     valorSemanal.toFixed(2),
    //     valorMensal.toFixed(2),
    //     valorAnual.toFixed(2) 
    // )
}


//#endregion =*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*

//#region Eventos do html 

//Fica verificando os eventos de focus e blur, quando o input recebe foco e perde o foco
inputs.forEach(input => 
{
	input.addEventListener("focus", addcl);

	input.addEventListener("blur", remcl);
});

//Botão que fica responsável por fazer cálculos dos dados informados
btnCalcular.addEventListener('click', async (event) =>
{   
    //console.log('clicou no btn');

    event.preventDefault(); 
    
    //mandando o meu form para ser valiado
    validator.validate(idFormCadastro);
    
    let erro = document.querySelectorAll('form .e');

    if(erro.length === 0)
    {
        dadosPegoForm(idFormCadastro);

        mostraModal (await receberDadosFrm(inputMedia, inputPreco, inputQuilometrosDia, inputDiasSemana));

        modal(2);

        //atualizarForm(1);
    };   
});

idBtnDescartaHistorico.addEventListener("click", ()  => 
{ 
    abrirCard(); 
    
    configCard(2);
    
    setTimeout(() =>
    {
        modal(2);

        //Depois que fechar os modal atualizar o frm
        //setTimeout(() => { atualizarForm(2);}, 900);
        
    }, 5400);
});

//#endregion =*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*