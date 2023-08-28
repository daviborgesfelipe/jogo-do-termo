import { AvaliacaoLetra } from "./avaliar.js";

export class Termo {
  private tentativas: number;
  private palavraSecreta: string[];
  private palavras: string[];

  jogoAcabou: boolean;
  venceu: boolean;
  letrasDescobertas: AvaliacaoLetra[];
  resultado: string;

  constructor() {
    this.iniciarValores();
  }

  iniciarValores(): void {
    this.palavras = this.obterListaDePalavras();
    this.palavraSecreta = this.obterPalavraAleatoria();
    this.letrasDescobertas = this.palavraSecreta.map(p => AvaliacaoLetra.NaoExistente);
    this.tentativas = 5;
    this.jogoAcabou = false;
    this.venceu = false;
    this.resultado = "";
  }

  avaliarJogo(result: AvaliacaoLetra[]): boolean {
    if (result.filter(l => l != AvaliacaoLetra.Correta).length == 0) {
        this.venceu = true;
        this.jogoAcabou = true;
        this.resultado = "Parabens!! Você venceu!";
    }

    else if (this.tentativas == 0) {
        this.venceu = false;
        this.jogoAcabou = true;
        this.resultado = "Bora jogar de novo! A palavra era " + this.palavraSecreta.join('').toUpperCase();
    }

    return this.jogoAcabou;
  }

  avaliarJogada(palavra: string): AvaliacaoLetra[] {
    const avaliacoes: AvaliacaoLetra[] = new Array(palavra.length);
    
    for (let i = 0; i < palavra.length; i++) {
          if (palavra[i] == this.palavraSecreta[i])
              avaliacoes[i] = AvaliacaoLetra.Correta;
          else if (this.palavraSecreta.includes(palavra[i]))
              avaliacoes[i] = AvaliacaoLetra.PosicaoIncorreta;
          else
              avaliacoes[i] = AvaliacaoLetra.NaoExistente;
      }

      this.tentativas--;
      return avaliacoes;
  }

  obterResultado(): string {
    return this.resultado;
  }
  
  obterListaDePalavras(): string[] {
    const palavras: string[] = [
      "ABRIR",
      "AMIGO",
      "BEBER",
      "BOLDO",
      "CAIXA",
      "CASAL",
      "CORPO",
      "DEDOS",
      "DENTE",
      "DIZER",
      "ERROS",
      "FALAR",
      "FESTA",
      "FOGAO",
      "GANHO",
      "GIRAR",
      "GRITO",
      "HORAS",
      "JOGOS",
      "JULHO",
      "LIMAO",
      "LOUCO",
      "MACAS",
      "MAIOR",
      "MELAO",
      "MOLHO"
    ];
    return palavras;
  }
  
  obterPalavraAleatoria(): string[] {
      const indiceAletorio: number = Math.floor(Math.random() * this.palavras.length);
      return this.palavras[indiceAletorio].split('');
  }
}