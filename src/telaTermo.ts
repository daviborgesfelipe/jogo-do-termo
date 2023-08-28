import { Termo } from "./termo.js";
import { AvaliacaoLetra } from "./avaliar.js";

class telaTermo {

    pnlTermo: HTMLDivElement;
    pnlTeclado: HTMLDivElement;
    btnEnter: HTMLButtonElement;
    lbNotificacao: HTMLParagraphElement;
    
    botoesClicados: HTMLButtonElement[];

    linha: number;
    coluna: number;
    termo: Termo;

    constructor() {
        this.termo = new Termo();
        this.registrarElementos();
        this.registrarEventos();
        this.linha = 0;
        this.coluna = 0;
        this.botoesClicados = [];
    }

    registrarElementos(): void {
        this.pnlTermo = document.getElementById('pnlTermo') as HTMLDivElement;
        this.pnlTeclado = document.getElementById('pnlTeclado') as HTMLDivElement;
        this.btnEnter = document.getElementById('btnEnter') as HTMLButtonElement;
        this.lbNotificacao = document.getElementById('lbNotificacao') as HTMLParagraphElement;
    }

    registrarEventos(): void {
        this.pnlTeclado.childNodes.forEach(b => {
            const botao = b as HTMLButtonElement;
            if (botao.id != "btnEnter") {
                botao.addEventListener('click', (sender) => this.atualizarJogo(sender));
            }
        });

        this.btnEnter.addEventListener('click', () => this.avaliarPalavra());
    }

    atualizarJogo(sender: MouseEvent): void {
        const botao: HTMLButtonElement = sender.target as HTMLButtonElement;
        if (this.linha == 5) {
            return;
        }

        this.botoesClicados.push(botao);

        const lista = document.querySelectorAll(".letra");
        const letra: HTMLDivElement =
            lista[this.coluna * 5 + this.linha] as HTMLDivElement;

        letra.textContent = botao.textContent;

        this.linha++;
    }

    avaliarPalavra(): void {
        if (this.termo.jogoAcabou) {
            this.resetarJogo();
            return;
        }

        if (this.linha != 5) {
            return;
        }

        let palavra: string = "";

        const lista = document.querySelectorAll(".letra");

        for (let i = this.coluna * 5; i < this.coluna * 5 + 5; i++) {
            palavra += (lista[i] as HTMLDivElement).textContent;
        }

        const resultado: AvaliacaoLetra[] = this.termo.avaliarJogada(palavra);

        this.atualizarCorTabela(resultado);

        this.coluna++;
        this.linha = 0;

        this.verificarResultado(resultado);
    }

    atualizarCorTabela(resultado: AvaliacaoLetra[]) {
        const lista = document.querySelectorAll(".letra");

        let j = 0;
        for (let i = this.coluna * 5; i < this.coluna * 5 + 5; i++) {
            const celula = lista[i] as HTMLDivElement;

            if (resultado[j] == AvaliacaoLetra.Correta) {
                celula.style.backgroundColor = "#22dd55";
            }

            else if (resultado[j] == AvaliacaoLetra.PosicaoIncorreta) {
                celula.style.backgroundColor = "#eded00";
            }

            else {
                celula.style.backgroundColor = "#5e5e5e";
                this.botoesClicados[j].disabled = true;
            }
            j++;
        }

        this.botoesClicados = [];
    }

    verificarResultado(resultado: AvaliacaoLetra[]): void {
        this.termo.avaliarJogo(resultado); // Chame a função para atualizar os valores
        
        if (this.termo.jogoAcabou) {
            const resultado = this.termo.obterResultado();
    
            this.lbNotificacao.style.display = "inline";
            this.lbNotificacao.textContent = resultado;
    
            if (this.termo.venceu) {
                this.lbNotificacao.className = "notificacao-acerto";
            } else {
                this.lbNotificacao.className = "notificacao-erro";
            }
    
            this.pnlTeclado.childNodes.forEach(b => {
                const botao = b as HTMLButtonElement;
                if (botao.id != "btnEnter") {
                    botao.disabled = true;
                }
            });
        }
    }

    resetarJogo(): void {
        this.linha = 0;
        this.coluna = 0;
        this.termo.iniciarValores();

        this.pnlTeclado.childNodes.forEach(b => {
            const botao = b as HTMLButtonElement;
            botao.disabled = false;
        });

        const lista = document.querySelectorAll(".letra");

        for (let i = 0; i < lista.length; i++) {
            const celula = lista[i] as HTMLDivElement;
            celula.textContent = "";
            celula.style.backgroundColor = "#bebebe";
        }

        this.lbNotificacao.style.display = "none";
        this.botoesClicados = [];
    }
}

window.addEventListener('load', () => new telaTermo());