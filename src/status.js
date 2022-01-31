class Status {
    constructor() {
        // user status
        this.hp = 100;
        this.chakra = 100;
        this.saudeMental = 100;
        this.stamina = 2;
        this.vontade = 5;
        this.ninjutsuAlcance = 2;
        this.ninjutsuVelocidade = 0;
        this.ninjutsuConjuracao = 15;
        this.ninjutsuSelos = 3;
        this.ninjutsuDano = 0;
        this.genjutsuAlcance = 2;
        this.genjutsuVelocidade = 0;
        this.genjutsuPrecisao = 0;
        this.genjutsuPercepcao = 0;
        this.danoFisico = 0;
        this.danoArmas = 0;
        this.arremessoVelocidade = 4;
        this.arremessoPrecisao = 5;
        this.defesaFisica = 0;
        this.capacidadeCarga = 20;
        this.velocidadePersonagem = 4;
        this.velocidadeGolpe = 2;
        this.velocidadeSaque = 0;
        this.reflexos = 2;
        this.percepcaoMovimento = 6;
        this.percepcaoMentira = 0;
        this.armadilhaCriacao = 0;
        this.armadilhaVelocidade = 20;
        this.armadilhaPercepcao = 0;
        this.persuasao = 0;

        // status attributes
        this.ninjutsu = 0;
        this.destreza = 0;
        this.genjutsu = 0;
        this.constituicao = 0;
        this.taijutsu = 0;
        this.atencao = 0;
        this.forca = 0;
        this.inteligencia = 0;
        this.carisma = 0;
    }

    calculate() {
        this.#validateAttributes();

        this.hp = 100 + (this.constituicao * 20);
        this.chakra = 100 + (this.constituicao * 20);
        this.saudeMental = 100 + (this.inteligencia * 20);
        this.stamina = 2 + this.constituicao;
        this.vontade = 5 + (this.carisma / 2);
        this.ninjutsuAlcance = 2 + (this.ninjutsu * 5);
        this.ninjutsuVelocidade = 0 + (this.ninjutsu * 2);
        this.ninjutsuConjuracao = 15 - this.ninjutsu;
        this.ninjutsuSelos = 3;
        this.ninjutsuDano = 0 + (this.ninjutsu * 2) + (this.atencao * 2);
        this.genjutsuAlcance = 2 + (this.genjutsu * 2);
        this.genjutsuVelocidade = 0 + (this.genjutsu * 2);
        this.genjutsuPrecisao = 0 + (this.genjutsu / 2) + (this.carisma / 2);
        this.genjutsuPercepcao = 0 + ((this.genjutsu + this.inteligencia + this.atencao) / 2);
        this.danoFisico = 0 + (this.taijutsu * 2) + (this.forca * 2);
        this.danoArmas = 0 + (this.taijutsu * 2) + (this.forca * 2);
        this.arremessoVelocidade = 4 + (this.forca * 2) + (this.destreza * 2);
        this.arremessoPrecisao = 5 + (this.taijutsu * 2) + (this.destreza * 2);
        this.defesaFisica = 0 + this.constituicao + this.forca;
        this.capacidadeCarga = 20 + (this.forca * 5);
        this.velocidadePersonagem = 4 + (this.destreza * 2);
        this.velocidadeGolpe = 2 + this.taijutsu + this.destreza;
        this.velocidadeSaque = 0 - (this.destreza * 0.1);
        this.reflexos = 2 + this.atencao + this.destreza;
        this.percepcaoMovimento = 6 + (this.atencao * 2);
        this.percepcaoMentira = 0 + ((this.inteligencia + this.atencao) / 2);
        this.armadilhaCriacao = 0 + ((this.inteligencia) / 3);
        this.armadilhaVelocidade = 20 - this.inteligencia;
        this.armadilhaPercepcao = 0 + this.atencao;
        this.persuasao = 0 + this.carisma + (this.inteligencia * 2);

        this.#clenupAtrributes();
    }

    #clenupAtrributes() {
        this.hp = this.#validateAttributeType(this.hp, 100);
        this.chakra = this.#validateAttributeType(this.chakra, 100);
        this.saudeMental = this.#validateAttributeType(this.saudeMental, 100);
        this.stamina = this.#validateAttributeType(this.stamina, 2);
        this.vontade = this.#validateAttributeType(this.vontade, 5);
        this.ninjutsuAlcance = this.#validateAttributeType(this.ninjutsuAlcance, 2);
        this.ninjutsuVelocidade = this.#validateAttributeType(this.ninjutsuVelocidade, 0);
        this.ninjutsuConjuracao = this.#validateAttributeType(this.ninjutsuConjuracao, 15);
        this.ninjutsuSelos = this.#validateAttributeType(this.ninjutsuSelos, 3);
        this.ninjutsuDano = this.#validateAttributeType(this.ninjutsuDano, 0);
        this.genjutsuAlcance = this.#validateAttributeType(this.genjutsuAlcance, 2);
        this.genjutsuVelocidade = this.#validateAttributeType(this.genjutsuVelocidade, 0);
        this.genjutsuPrecisao = this.#validateAttributeType(this.genjutsuPrecisao, 0);
        this.genjutsuPercepcao = this.#validateAttributeType(this.genjutsuPercepcao, 0);
        this.danoFisico = this.#validateAttributeType(this.danoFisico, 0);
        this.danoArmas = this.#validateAttributeType(this.danoArmas, 0);
        this.arremessoVelocidade = this.#validateAttributeType(this.arremessoVelocidade, 4);
        this.arremessoPrecisao = this.#validateAttributeType(this.arremessoPrecisao, 5);
        this.defesaFisica = this.#validateAttributeType(this.defesaFisica, 0);
        this.capacidadeCarga = this.#validateAttributeType(this.capacidadeCarga, 20);
        this.velocidadePersonagem = this.#validateAttributeType(this.velocidadePersonagem, 4);
        this.velocidadeGolpe = this.#validateAttributeType(this.velocidadeGolpe, 2);
        this.velocidadeSaque = this.#validateAttributeType(this.velocidadeSaque, 0);
        this.reflexos = this.#validateAttributeType(this.reflexos, 2);
        this.percepcaoMovimento = this.#validateAttributeType(this.percepcaoMovimento, 6);
        this.percepcaoMentira = this.#validateAttributeType(this.percepcaoMentira, 0);
        this.armadilhaCriacao = this.#validateAttributeType(this.armadilhaCriacao, 0);
        this.armadilhaVelocidade = this.#validateAttributeType(this.armadilhaVelocidade, 20);
        this.armadilhaPercepcao = this.#validateAttributeType(this.armadilhaPercepcao, 0);
        this.persuasao = this.#validateAttributeType(this.persuasao, 0);
    }

    #validateAttributes() {
        // check for valid attribute type
        this.ninjutsu = this.#validateAttributeType(this.ninjutsu);
        this.destreza = this.#validateAttributeType(this.destreza);
        this.genjutsu = this.#validateAttributeType(this.genjutsu);
        this.constituicao = this.#validateAttributeType(this.constituicao);
        this.taijutsu = this.#validateAttributeType(this.taijutsu);
        this.atencao = this.#validateAttributeType(this.atencao);
        this.forca = this.#validateAttributeType(this.forca);
        this.inteligencia = this.#validateAttributeType(this.inteligencia);
        this.carisma = this.#validateAttributeType(this.carisma);

        // check for valid attribute range
        this.ninjutsu = this.#validateAttributeRange(this.ninjutsu, 10);
        this.genjutsu = this.#validateAttributeRange(this.genjutsu, 10);
        this.taijutsu = this.#validateAttributeRange(this.taijutsu, 10);
        this.destreza = this.#validateAttributeRange(this.destreza);
        this.constituicao = this.#validateAttributeRange(this.constituicao);
        this.atencao = this.#validateAttributeRange(this.atencao);
        this.forca = this.#validateAttributeRange(this.forca);
        this.inteligencia = this.#validateAttributeRange(this.inteligencia);
        this.carisma = this.#validateAttributeRange(this.carisma);
    }

    #validateAttributeType(value, defaultValue = 0) {
        if (value == undefined || value == null || isNaN(value) || (value + '').trim().length == 0) {
            return parseInt(defaultValue);
        }

        return parseInt(value);
    }

    #validateAttributeRange(value, maxValue = 50) {
        if (value < 0) {
            return 0;
        }   

        if (value > maxValue) {
            return maxValue;
        }

        return value;
    }
}