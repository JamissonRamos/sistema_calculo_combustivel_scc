import {read,create,excluir} from "../modules/banco_dados.js";

export async function crud(type, obj)
{
    switch (type) 
    {
        case 1: 

            const {gastoAual: gastoA, gastoDiario: gastoD, gastoMensal: gastoM, gastoSemanal: gastoS, inputMedia: media, inputPreco: preco} = obj

            let listaHistoricos = await read();
                        
            listaHistoricos.push( new DadosFrm  
                (
                    preco,
                    media,
                    gastoD, 
                    gastoS, 
                    gastoM, 
                    gastoA
                )
            );

            await create(listaHistoricos);

            break;

        case 2: 

            let arrayHistoricos =  await read();

            return arrayHistoricos

        case 3:

            await excluir(obj);

            console.log(obj)

            break;

        default:
        
            abrirCard(); 

            configCard(4);

            break;
    }
};

function DadosFrm(preco, media, gastoDiario, gastoSemanal, gastoMensal, gastoAual) 
{
    this.data = tratarData();
    this.preco = preco; // Number(preco.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'}));
    this.media = media;
    this.gastoDiario = gastoDiario; //.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
    this.gastoSemanal = gastoSemanal; //.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
    this.gastoMensal = gastoMensal; //.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
    this.gastoAual = gastoAual; //.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
};

function tratarData() 
{
    let data = new Date(),
        dia  = data.getDate().toString().padStart(2, '0'),
        mes  = (data.getMonth()+1).toString().padStart(2, '0'),
        ano  = data.getFullYear().toString().padStart(2, '0'),
		hora = data.getHours().toString().padStart(2, '0'),
		min  =  data.getMinutes(),
		sec = data.getSeconds()
    return `${dia}/${mes}/${ano} ${hora}:${min}:${sec}`;
}