import {addcl,remcl} from "./modules/animacoes.js";
import {ValidatorCampos} from "./modules/validacao_campo.js";
import {receberDadosFrm} from "./modules/calcular_dados_frm.js";
import {abrirCard, configCard} from "./modules/msgbox.js";
import {crud} from "./modules/crud.js";

//#region Variáveis 

//recebe todos os inputs do frm
const inputs = document.querySelectorAll(".campo");

let inputMedia              = 0;
let inputPreco              = 0;
let inputQuilometrosDia     = 0;
let inputDiasSemana         = 0;

//Inicia a minha chamada da função
let validator = new ValidatorCampos();

//Vai receber obj dos dados a ser salvo depois de ser mostrado
let objValoresCalculados = {}

//#region =*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*

//#region Funções

//Função para fazer o frm submit, atualizado a tela 
function atualizarForm(type)
{
    switch (type) 
    {
        case 1:
            document.getElementById('idFormCadastro').reset();
            
            break;
            
        case 2:
            
            document.getElementById('idFormCadastro').submit();
            break;
    
        default:
            break;
    }
}

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
    const {gastoAual, gastoDiario, gastoMensal, gastoSemanal, inputMedia, inputPreco} = obj
    
    idSpanGatoD.textContent = gastoDiario.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})  ;
    idSpanGatoS.textContent = gastoSemanal.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})  ;
    idSpanGatoM.textContent = gastoMensal.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})  ;
    idSpanGatoA.textContent = gastoAual.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})  ;

    objValoresCalculados = obj
}

//Para gerar os dados da tabela 
//Função que vai carregar os dados na tabela de históricos 
function tratandoDadosHistorico(obj) 
{
    console.log(obj)
    
    idTbodyHistorico.innerHTML = ` `

    obj.forEach((item, indice) => { criarTemplete(item, indice) });
}

//Criando o templete da tabela para ser mostrado
function criarTemplete(obj, indice) 
{
    idTbodyHistorico.innerHTML +=
    `
        <tr>
            <td> ${obj.data} </td>
            <td> ${Number(obj.preco).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})} </td>
            <td> ${obj.media} </td>
            <td> ${Number(obj.gastoDiario).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})} </td>
            <td> ${Number(obj.gastoSemanal).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})} </td>
            <td> ${Number(obj.gastoMensal).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})} </td>
            <td> ${Number(obj.gastoAual).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})} </td>
            <td class="td_button"> 
                <button class="icone fas fa-trash-alt " onclick="excluirRegistro(${indice})"> </button> 
            </td>
        </tr>
    
    `
}

async function excluirRegistro(indiceRegistro) 
{
    let arrayHistoricos = await crud(2)

    console.log(arrayHistoricos)

    //Excluir itens da lista
    arrayHistoricos.splice(indiceRegistro, 1)

    console.log(arrayHistoricos)

    await crud(3, arrayHistoricos);

    tratandoDadosHistorico(arrayHistoricos)
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

idBtnSalvaHistorico.addEventListener("click", () => 
{     
    crud(1, objValoresCalculados);
    
    //Fechar os modal de cálculos
    setTimeout(() =>
    {
        modal(2);

        atualizarForm(2);

    }, 5400);
});

idBtnDescartaHistorico.addEventListener("click", ()  => 
{ 
    abrirCard(); 
    
    configCard(2);
    
    setTimeout(() =>
    {
        modal(2);

        //Depois que fechar os modal atualizar o frm
        setTimeout(() => { atualizarForm(2);}, 900);
        
    }, 5400);
});

idButtonHistorico.addEventListener("click", async ()  => 
{
    let arrayHistoricos = await crud(2)

    console.log(arrayHistoricos)
    
    if(arrayHistoricos.length > 0 )
    {
        tratandoDadosHistorico(arrayHistoricos);

        modal(1);

    } else modal(3);    
});

/* Fechar tabela */
idCloseListaHistorico.addEventListener("click", () => { modal(1) });

idSpanCloseSemRegistro.addEventListener("click", () => { modal(3) });

idButtonLimparHistorico.addEventListener("click", () =>
{
    localStorage.clear(); 
    
    modal(1);
})


//#endregion =*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*


window.excluirRegistro=excluirRegistro;