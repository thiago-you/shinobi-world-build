$(function () {
    showSummary(0);

    $('#constituicao', '#ninjustu').val(0).trigger('change');

    $("#select-summary").selectize({
        create: false,
        sortField: "text",
    });

    $('body').on('click', '#toggle-attribute', function () {
        this.blur();
    });

    $('#ninjutsu').on('change', function () {
        const value = this.value * 2;

        $('#poder').val(10 + value);
    });

    $('body').on('change', '#constituicao', function () {
        calculate(this.value, $('#forca').val());
    });

    $('body').on('change', '#forca', function () {
        calculate($('#constituicao').val(), this.value);
    });

    $("body").on('change', '#select-summary', function () {
        showSummary(this.value);
    });

    function toggleAttributesTable(isEmpty) {
        if (isEmpty) {
            $('.summary-content .empty-content').show();
            $('.summary-content .summary-table').hide();
        } else {
            $('.summary-content .empty-content').hide();
            $('.summary-content .summary-table').show();
        }
    }

    function showSummary(value) {
        if (value == undefined || value == null || (value + '').trim().length == 0 || value < 0 || value > 8) {
            toggleAttributesTable(true);
        } else {
            if (value == 0) {
                tableNinjutsu($('.summary-content .summary-table table'), $('.summary-content .summary-table .summary-info'));
            } else if (value == 1) {
                tableGenjutsu($('.summary-content .summary-table table'), $('.summary-content .summary-table .summary-info'));
            } else if (value == 2) {
                tableTaijutsu($('.summary-content .summary-table table'), $('.summary-content .summary-table .summary-info'));
            } else if (value == 3) {
                tableForca($('.summary-content .summary-table table'), $('.summary-content .summary-table .summary-info'));
            } else if (value == 4) {
                tableDestreza($('.summary-content .summary-table table'), $('.summary-content .summary-table .summary-info'));
            } else if (value == 5) {
                tableInteligencia($('.summary-content .summary-table table'), $('.summary-content .summary-table .summary-info'));
            } else if (value == 6) {
                tableAtencao($('.summary-content .summary-table table'), $('.summary-content .summary-table .summary-info'));
            } else if (value == 7) {
                tableAtencao($('.summary-content .summary-table table'), $('.summary-content .summary-table .summary-info'));
            } else if (value == 8) {
                tableCarisma($('.summary-content .summary-table table'), $('.summary-content .summary-table .summary-info'));
            }

            toggleAttributesTable();
        }
    }

    function calculate(constituicao, forca) {
        let hp = -10;
        let stamina = -1;
        let sanidade = -10;
        let defesa = -5;

        if (constituicao == undefined || constituicao.length == 0 || constituicao <= 0) {
            hp = -10;
            stamina = -1;
            sanidade = -10;
            defesa = -5;
        } else if (constituicao == 1) {
            hp = 20;
            stamina = 1;
            sanidade = 10;
            defesa = 1;
        } else if (constituicao == 2) {
            hp = 40;
            stamina = 1;
            sanidade = 20;
            defesa = 2;
        } else if (constituicao == 3) {
            hp = 60;
            stamina = 2;
            sanidade = 30;
            defesa = 3;
        } else if (constituicao == 4) {
            hp = 80;
            stamina = 2;
            sanidade = 40;
            defesa = 4;
        } else if (constituicao == 5) {
            hp = 100;
            stamina = 2;
            sanidade = 50;
            defesa = 5;
        } else if (constituicao == 6) {
            hp = 120;
            stamina = 3;
            sanidade = 60;
            defesa = 6;
        } else if (constituicao == 7) {
            hp = 140;
            stamina = 3;
            sanidade = 70;
            defesa = 7;
        } else if (constituicao == 8) {
            hp = 160;
            stamina = 4;
            sanidade = 80;
            defesa = 8;
        } else if (constituicao == 9) {
            hp = 180;
            stamina = 4;
            sanidade = 90;
            defesa = 9;
        } else if (constituicao >= 10) {
            hp = 200;
            stamina = 5;
            sanidade = 100;
            defesa = 10;
        }

        if (forca == undefined || forca.length == 0 || forca <= 0) {
            defesa += -1;
        } else if (forca == 1) {
            defesa += 1;
        } else if (forca == 2) {
            defesa += 2;
        } else if (forca == 3) {
            defesa += 3;
        } else if (forca == 4) {
            defesa += 4;
        } else if (forca == 5) {
            defesa += 5;
        } else if (forca == 6) {
            defesa += 6;
        } else if (forca == 7) {
            defesa += 7;
        } else if (forca == 8) {
            defesa += 8;
        } else if (forca == 9) {
            defesa += 9;
        } else if (forca >= 10) {
            defesa += 10;
        }

        $('#hp').val(100 + hp);
        $('#stamina').val(2 + stamina);
        $('#sanidade').val(100 + sanidade);
        $('#defesa').val(2 + defesa);
    }

    function tableNinjutsu($table, $info) {
        const $thead = $table.find('thead').first('tr');
        const $tbody = $table.find('tbody');

        // clear table
        $thead.empty();
        $tbody.empty();
        $info.empty();

        // set table hader
        $thead.append('<th>Ponto</th>');
        $thead.append('<th>Alcance</th>');
        $thead.append('<th>Dano</th>');
        $thead.append('<th>Velocidade</th>');

        // set table rows
        $tbody.append('<tr>').append('<td>00</td><td>-05</td><td>-05</td><td>-05</td>');
        $tbody.append('<tr>').append('<td>01</td><td>1</td><td>02</td><td>00</td>');
        $tbody.append('<tr>').append('<td>02</td><td>2</td><td>05</td><td>00</td>');
        $tbody.append('<tr>').append('<td>03</td><td>3</td><td>06</td><td>01</td>');
        $tbody.append('<tr>').append('<td>04</td><td>4</td><td>08</td><td>02</td>');
        $tbody.append('<tr>').append('<td>05</td><td>5</td><td>10</td><td>03</td>');
        $tbody.append('<tr>').append('<td>06</td><td>6</td><td>12</td><td>04</td>');
        $tbody.append('<tr>').append('<td>07</td><td>7</td><td>14</td><td>05</td>');
        $tbody.append('<tr>').append('<td>08</td><td>8</td><td>16</td><td>06</td>');
        $tbody.append('<tr>').append('<td>09</td><td>9</td><td>18</td><td>07</td>');
        $tbody.append('<tr>').append('<td>10</td><td>10</td><td>20</td><td>08</td>');

        // set summary info
        $info.html('');
    }

    function tableGenjutsu($table, $info) {
        const $thead = $table.find('thead').first('tr');
        const $tbody = $table.find('tbody');

        // clear table
        $thead.empty();
        $tbody.empty();
        $info.empty();

        // set table hader
        $thead.append('<th>Ponto</th>');
        $thead.append('<th>Alcance</th>');
        $thead.append('<th>Dano</th>');
        $thead.append('<th>Velocidade</th>');
        $thead.append('<th>Saída de Genjutsu</th>');

        // set table rows
        $tbody.append('<tr>').append('<td>00</td><td>-01</td><td>-01</td><td>-01</td><td>-01</td>');
        $tbody.append('<tr>').append('<td>01</td><td>01</td><td>01</td><td>04</td><td>01</td>');
        $tbody.append('<tr>').append('<td>02</td><td>01</td><td>01</td><td>06</td><td>01</td>');
        $tbody.append('<tr>').append('<td>03</td><td>02</td><td>02</td><td>08</td><td>02</td>');
        $tbody.append('<tr>').append('<td>04</td><td>02</td><td>02</td><td>10</td><td>02</td>');
        $tbody.append('<tr>').append('<td>05</td><td>02</td><td>02</td><td>12</td><td>02</td>');
        $tbody.append('<tr>').append('<td>06</td><td>03</td><td>03</td><td>14</td><td>03</td>');
        $tbody.append('<tr>').append('<td>07</td><td>03</td><td>03</td><td>16</td><td>03</td>');
        $tbody.append('<tr>').append('<td>08</td><td>04</td><td>04</td><td>18</td><td>04</td>');
        $tbody.append('<tr>').append('<td>09</td><td>04</td><td>04</td><td>22</td><td>04</td>');
        $tbody.append('<tr>').append('<td>10</td><td>05</td><td>05</td><td>24</td><td>05</td>');

        // set summary info
        $info.html(`
            <strong>Força</strong>: A força representa o potencial físico e a musculatura do personagem. Este atributo é muito importante para os personagens que utilizam a força física para realizarem seus golpes e também para aqueles personagens que precisam arremessar armamentos e carregar grandes quantidades de peso.
        `);
    }

    function tableTaijutsu($table, $info) {
        const $thead = $table.find('thead').first('tr');
        const $tbody = $table.find('tbody');

        // clear table
        $thead.empty();
        $tbody.empty();
        $info.empty();

        // set table hader
        $thead.append('<th>Ponto</th>');
        $thead.append('<th>Dano</th>');

        // set table rows
        $tbody.append('<tr>').append('<td>00</td><td>-05</td>');
        $tbody.append('<tr>').append('<td>01</td><td>02</td>');
        $tbody.append('<tr>').append('<td>02</td><td>04</td>');
        $tbody.append('<tr>').append('<td>03</td><td>06</td>');
        $tbody.append('<tr>').append('<td>04</td><td>08</td>');
        $tbody.append('<tr>').append('<td>05</td><td>10</td>');
        $tbody.append('<tr>').append('<td>06</td><td>12</td>');
        $tbody.append('<tr>').append('<td>07</td><td>14</td>');
        $tbody.append('<tr>').append('<td>08</td><td>16</td>');
        $tbody.append('<tr>').append('<td>09</td><td>18</td>');
        $tbody.append('<tr>').append('<td>10</td><td>20</td>');

        // set summary info
        $info.html('');
    }

    function tableForca($table, $info) {
        const $thead = $table.find('thead').first('tr');
        const $tbody = $table.find('tbody');

        // clear table
        $thead.empty();
        $tbody.empty();
        $info.empty();

        // set table hader
        $thead.append('<th>Ponto</th>');
        $thead.append('<th>Dano Básico</th>');
        $thead.append('<th>Carga</th>');
        $thead.append('<th>Defesa</th>');

        // set table rows
        $tbody.append('<tr>').append('<td>00</td><td>-01</td><td>-01</td><td>-01</td>');
        $tbody.append('<tr>').append('<td>01</td><td>01</td><td>05</td><td>01</td>');
        $tbody.append('<tr>').append('<td>02</td><td>02</td><td>10</td><td>02</td>');
        $tbody.append('<tr>').append('<td>03</td><td>03</td><td>10</td><td>03</td>');
        $tbody.append('<tr>').append('<td>04</td><td>04</td><td>15</td><td>04</td>');
        $tbody.append('<tr>').append('<td>05</td><td>05</td><td>30</td><td>05</td>');
        $tbody.append('<tr>').append('<td>06</td><td>06</td><td>25</td><td>06</td>');
        $tbody.append('<tr>').append('<td>07</td><td>07</td><td>30</td><td>07</td>');
        $tbody.append('<tr>').append('<td>08</td><td>08</td><td>35</td><td>08</td>');
        $tbody.append('<tr>').append('<td>09</td><td>09</td><td>35</td><td>09</td>');
        $tbody.append('<tr>').append('<td>10</td><td>10</td><td>40</td><td>10</td>');

        // set summary info
        $info.html('<strong>Força:</strong> A força representa o potencial físico e a musculatura do personagem. Este atributo é muito importante para os personagens que utilizam a força física para realizarem seus golpes e também para aqueles personagens que precisam arremessar armamentos e carregar grandes quantidades de peso.');
    }

    function tableDestreza($table, $info) {
        const $thead = $table.find('thead').first('tr');
        const $tbody = $table.find('tbody');

        // clear table
        $thead.empty();
        $tbody.empty();
        $info.empty();

        // set table hader
        $thead.append('<th>Ponto</th>');
        $thead.append('<th>Velocidade</th>');
        $thead.append('<th>Furtividade</th>');
        $thead.append('<th>Saque</th>');

        // set table rows
        $tbody.append('<tr>').append('<td>00</td><td>-01</td><td>-01</td><td>01</td>');
        $tbody.append('<tr>').append('<td>01</td><td>01</td><td>01</td><td>01</td>');
        $tbody.append('<tr>').append('<td>02</td><td>01</td><td>02</td><td>-0.25</td>');
        $tbody.append('<tr>').append('<td>03</td><td>02</td><td>03</td><td>-0.25</td>');
        $tbody.append('<tr>').append('<td>04</td><td>02</td><td>04</td><td>-0.25</td>');
        $tbody.append('<tr>').append('<td>05</td><td>03</td><td>05</td><td>-0.50</td>');
        $tbody.append('<tr>').append('<td>06</td><td>04</td><td>06</td><td>-0.50</td>');
        $tbody.append('<tr>').append('<td>07</td><td>05</td><td>07</td><td>-0.50</td>');
        $tbody.append('<tr>').append('<td>08</td><td>06</td><td>08</td><td>-0.75</td>');
        $tbody.append('<tr>').append('<td>09</td><td>07</td><td>09</td><td>-0.75</td>');
        $tbody.append('<tr>').append('<td>10</td><td>08</td><td>10</td><td>-01</td>');

        // set summary info
        $info.html('A destreza indica a coordenação motora, a agilidade, os reflexos, a furtividade e o equilíbrio do personagem. Este atributo é importante para os personagens que fazem uso de seus corpos para se deslocar ou para se esquivar, para aqueles que utilizam armamentos ou que desejam ser rápidos em suas ações.');
    }

    function tableInteligencia($table, $info) {
        const $thead = $table.find('thead').first('tr');
        const $tbody = $table.find('tbody');

        // clear table
        $thead.empty();
        $tbody.empty();
        $info.empty();

        // set table hader
        $thead.append('<th>Ponto</th>');
        $thead.append('<th>Persuasão e Percepção de Mentiras</th>');
        $thead.append('<th>Sanidade</th>');
        $thead.append('<th>Ocultação de Armadilhas</th>');

        // set table rows
        $tbody.append('<tr>').append('<td>00</td><td>-01</td><td>-10</td><td>-01</td>');
        $tbody.append('<tr>').append('<td>01</td><td>00</td><td>10</td><td>00</td>');
        $tbody.append('<tr>').append('<td>02</td><td>01</td><td>20</td><td>01</td>');
        $tbody.append('<tr>').append('<td>03</td><td>01</td><td>30</td><td>01</td>');
        $tbody.append('<tr>').append('<td>04</td><td>02</td><td>40</td><td>01</td>');
        $tbody.append('<tr>').append('<td>05</td><td>02</td><td>50</td><td>02</td>');
        $tbody.append('<tr>').append('<td>06</td><td>03</td><td>60</td><td>02</td>');
        $tbody.append('<tr>').append('<td>07</td><td>03</td><td>70</td><td>02</td>');
        $tbody.append('<tr>').append('<td>08</td><td>04</td><td>80</td><td>03</td>');
        $tbody.append('<tr>').append('<td>09</td><td>04</td><td>90</td><td>03</td>');
        $tbody.append('<tr>').append('<td>10</td><td>05</td><td>100</td><td>04</td>');

        // set summary info
        $info.html(`
            A inteligência determina a facilidade que seu personagem tem para aprender e raciocinar. Este atributo é importante para os usuários de ninjutsus e genjutsus que desejam aprender maiores quantidades de técnicas, para os personagens que desejam adquirir conhecimentos diversos e se tornarem bons estrategistas.
        `);
    }

    function tableAtencao($table, $info) {
        const $thead = $table.find('thead').first('tr');
        const $tbody = $table.find('tbody');

        // clear table
        $thead.empty();
        $tbody.empty();
        $info.empty();

        // set table hader
        $thead.append('<th>Ponto</th>');
        $thead.append('<th>Percepção de Movimento</th>');
        $thead.append('<th>Percepção de Ilusão</th>');
        $thead.append('<th>Saída de Genjutsu</th>');
        $thead.append('<th>Persuasão e Percepção de Mentiras</th>');
        $thead.append('<th>Percepção de Armadilha</th>');
        $thead.append('<th>Percepção de Velocidade</th>');

        // set table rows
        $tbody.append('<tr>').append('<td>00</td><td>-01</td><td>-01</td><td>-01</td><td>-01</td><td>-01</td><td>-01</td>');
        $tbody.append('<tr>').append('<td>01</td><td>01</td><td>00</td><td>00</td><td>00</td><td>01</td><td>01</td>');
        $tbody.append('<tr>').append('<td>02</td><td>02</td><td>01</td><td>01</td><td>01</td><td>00</td><td>-01</td>');
        $tbody.append('<tr>').append('<td>03</td><td>03</td><td>01</td><td>01</td><td>01</td><td>00</td><td>-01</td>');
        $tbody.append('<tr>').append('<td>04</td><td>04</td><td>02</td><td>02</td><td>02</td><td>01</td><td>-01</td>');
        $tbody.append('<tr>').append('<td>05</td><td>05</td><td>02</td><td>02</td><td>02</td><td>01</td><td>-01</td>');
        $tbody.append('<tr>').append('<td>06</td><td>06</td><td>03</td><td>03</td><td>03</td><td>01</td><td>-01</td>');
        $tbody.append('<tr>').append('<td>07</td><td>07</td><td>03</td><td>03</td><td>04</td><td>02</td><td>-01</td>');
        $tbody.append('<tr>').append('<td>08</td><td>08</td><td>04</td><td>04</td><td>05</td><td>02</td><td>-01</td>');
        $tbody.append('<tr>').append('<td>09</td><td>09</td><td>04</td><td>04</td><td>06</td><td>02</td><td>-01</td>');
        $tbody.append('<tr>').append('<td>10</td><td>10</td><td>05</td><td>05</td><td>07</td><td>03</td><td>-01</td>');

        // set summary info
        $info.html(`
            importante para os personagens que desejam ter maiores reservas de vida, chakra e também para aqueles que desejam resistir mais tempo sob estresse físico e psicológico.
            <br>
            <strong>Observação importante:</strong> Os talentos da árvore de reservas aumentadas que recuperam chakra e HP não irão recuperar sua porcentagem com base no valor máximo do personagem, mas sim com base no valor atual.
            <br><br>
            <strong>Ex.:</strong> Se o personagem tem 300 pontos de chakra e possui 10% de recuperação, se ele gastar 100 pontos de chakra, ficará com 200/300 no contador. Neste caso, ele vai recuperar 20 pontos, o equivalente a 10% do chakra atual.
            Além disso, a recuperação deve ser aplicada antes de descontar o chakra usado no referido post. Portanto, se o personagem estiver com 200 de chakra, possuir uma reserva de 300 pontos e usar um jutsu de rank A, ele irá recuperar 20 pontos – se possuir os dois talentos de recuperação – e depois irá descontar os 60 pontos da técnica usada.
            Colocando em números: 200/300 + 20 (recuperação de chakra) - 60 = 160CH
        `);
    }

    function tableCarisma($table, $info) {
        const $thead = $table.find('thead').first('tr');
        const $tbody = $table.find('tbody');

        // clear table
        $thead.empty();
        $tbody.empty();
        $info.empty();

        // set table hader
        $thead.append('<th>Ponto</th>');
        $thead.append('<th>Persuasão e Percepção de Mentiras</th>');

        // set table rows
        $tbody.append('<tr>').append('<td>00</td><td>-01</td>');
        $tbody.append('<tr>').append('<td>01</td><td>00</td>');
        $tbody.append('<tr>').append('<td>02</td><td>01</td>');
        $tbody.append('<tr>').append('<td>03</td><td>01</td>');
        $tbody.append('<tr>').append('<td>04</td><td>02</td>');
        $tbody.append('<tr>').append('<td>05</td><td>02</td>');
        $tbody.append('<tr>').append('<td>06</td><td>03</td>');
        $tbody.append('<tr>').append('<td>07</td><td>04</td>');
        $tbody.append('<tr>').append('<td>08</td><td>05</td>');
        $tbody.append('<tr>').append('<td>09</td><td>06</td>');
        $tbody.append('<tr>').append('<td>10</td><td>07</td>');

        // set summary info
        $info.html(`
            O carisma representa a capacidade de persuasão, magnetismo pessoal, liderança e habilidade de influenciar os outros. Este atributo é importante para caçadores infiltrados, espiões, comerciantes ou interrogadores que precisam “ler” seus alvos.
        `);
    }
});