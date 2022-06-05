# sistema_calculo_combustivel_scc
 Sistema calculo de combustiveis (scc) vai calcular a media e valores de quanto um veiculo gasta durante um perido, diario, semanal, mensal, anual


# index.css

# Elementos HTML

## body
<p>
    Foi feito essas definições para que o conteúdo 'container' ele ficasse centralizado na pagina, ate por que o 'container' ele tem um tamanho máximo de 1440px quando a tela for maio o 'container ficara centralizado, a tela no tamanho meno ou igual a 1440px vai deixa o conteúdo 'container' com o tamanho total da tela. Como também todo conteúdo que não for dentro do elemento 'container' ele vai fica centralizado, como o elemento de msg box, como os modais, como a tabela.
</p>

    body
    {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

- display => Para deixa o elemento 'container' centralizado 


# Responsividade

## @media screen and (max-width: 375px)

<h2>.container</h2>
<p>
    nesse ponto vamos tratar os elemento mais raiz para fica com responsividade, '.contaner' vai deixa a tela com os scroll ativos e hábitos para tela 
</p>

     .container
    {   
        border: 1px solid blue;
        
        width: 100vw;   
        height: 100vh;

        overflow: scroll;

        padding: .5em;
    }

- width & height => vai definir tamanho da tela para abri o scroll
- overflow => vai abrir o scroll 'x' e 'y' da tela.
- padding => vai dar um espaçamento dentro do 'container' para que o scroll 'x' mostre corretamente os componentes do html.


