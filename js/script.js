const operacaoAnteriorText = document.querySelector('#operacao-anterior');
const operacaoAtualText = document.querySelector('#operacao-atual');
const buttons = document.querySelectorAll('#buttons-container button');

class Calculator {
    constructor(operacaoAnteriorText, operacaoAtualText) {
        this.operacaoAnteriorText = operacaoAnteriorText;
        this.operacaoAtualText = operacaoAtualText;
        this.operacaoAtual = "";
    }

    adicionarDigito(digito) {
        // Logica para evitar que a operação tenha mais de 1 ponto
        if (digito === "." && this.operacaoAtualText.innerText.includes(".")) {
            return;
        }

        this.operacaoAtual = digito;
        this.atualizarVisor();
    }

    operacoes(operacao) {
        if (this.operacaoAtualText.innerText === "" && operacao !== "C") {
            if (this.operacaoAnteriorText.innerText !== "") {
                this.mudarOperacao(operacao);
            }
            return
        }
        let operacaoValor;
        const anterior = +this.operacaoAnteriorText.innerText.split(" ")[0];
        const atual = +this.operacaoAtualText.innerText;

        switch (operacao) {
            case "+":
                operacaoValor = anterior + atual;
                this.atualizarVisor(operacaoValor, operacao, atual, anterior);
                break;
            case "-":
                operacaoValor = anterior - atual;
                this.atualizarVisor(operacaoValor, operacao, atual, anterior);
                break;
            case "*":
                operacaoValor = anterior * atual;
                this.atualizarVisor(operacaoValor, operacao, atual, anterior);
                break;
            case "/":
                operacaoValor = anterior / atual;
                this.atualizarVisor(operacaoValor, operacao, atual, anterior);
                break;
            case "DEL":
                this.operacaoDel();
                break;
            case "CE":
                this.operacaoLimparOperacao();
                break;
            case "C":
                this.operacaoLimparTudo();
                break;
            case "=":
                this.operacaoResultado();
                break;
            default:
                return;
        }
    }

    atualizarVisor(operacaoValor = null, operacao = null, atual = null, anterior = null) {

        if (operacaoValor === null) {

            this.operacaoAtualText.innerText += this.operacaoAtual;
        } else {
            // Checar se o valor é zero, se for, adicionar o valor atual
            if (anterior == 0) {
                operacaoValor = atual;
            }
            // Adicionar o valor atual ao anterior
            this.operacaoAnteriorText.innerText = `${operacaoValor} ${operacao}`
            this.operacaoAtualText.innerText = "";

        }
    }

    mudarOperacao(operacao) {
        const operacoesMatematicas = ["+", "-", "*", "/"];
        if (!operacoesMatematicas.includes(operacao)) {
            return;
        }

        this.operacaoAnteriorText.innerText = this.operacaoAnteriorText.innerText.slice(0, -1) + operacao;
    }

    operacaoDel(){
        this.operacaoAtualText.innerText = this.operacaoAtualText.innerText.slice(0,-1);
    }
    operacaoLimparOperacao(){
        this.operacaoAtualText.innerText = "";
    }
    operacaoLimparTudo(){
        this.operacaoAtualText.innerText = "";
        this.operacaoAnteriorText.innerText = "";
    }
    operacaoResultado(){
        const operacao = operacaoAnteriorText.innerText.split(" ")[1];
        this.operacoes(operacao);
    }
}

const calc = new Calculator(operacaoAnteriorText, operacaoAtualText);

// Logica que ativará os dados mediante o click do usuário
buttons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        const value = e.target.innerText;

        // Logica para identificar o que é numero e o que é operação
        if (+value >= 0 || value === ".") {
            calc.adicionarDigito(value);
        } else {
            calc.operacoes(value);
        }
    })
})
