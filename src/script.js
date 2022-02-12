$(function () {
    /**
     * Init classes variables
     */
    const talentos = new Talentos();
    let status = new Status();
    let attrTotal = 0;
    let attrExtra = 0;

    /**
     * Initial tab state
     */
    $('#talent-tab').hide();
    
    /**
     * Carrega a lista de talentos
     */
    fetch('./res/talentos.json').then(response => response.text()).then(response => {
        talentos.setList(JSON.parse(response)); 
        
        initTalentoSelectize($('.selectize-talento'));

        $('#add-talent').prop('disabled', false);
    });

    /**
     * trigger default state
     */
    showSummary(0);
    resetStatus();

    /**
     * Intialize selectize component de sumario
     */
    $('.selectize').selectize({ create: false, sortField: 'text' });

    /**
     * set dynamic height to fit attributes and talents card
     */
    $('#talent-tab').css('height', $('#attr-tab').height());

    /**
     * Trigger status calculation
     */
    $('body').on('change', '.form-atributos input', function () {   
        calculateStatus();

        attrTotal = 0;
        $('.form-atributos input.attr-value').each(function () {
            attrTotal += parseInt($(this).val() || 0);
        });

        attrExtra = parseInt($('#attrExtra').val())
    });

    /**
     * Trigger talent calculation
     */
    $('body').on('change', '.talent-item select', function () {       
        calculateTalents();
        updateUiTalentsCount();

        const selectedTalentos = $('.talent-item .selectize-talento', '#talents').toArray().reduce((value, item) => value + Math.min($(item).val() || 0, 1), 0);
        const itemsCount = $('#talents').find('.talent-item').length;

        if (selectedTalentos >= itemsCount) {
            $('#add-talent').trigger('click');
        }
    });

    /**
     * Show selected summary
     */
    $('body').on('change', '#select-summary', function () {
        showSummary(this.value);
    });

    /**
     * Shows talents tab
     */
     $('body').on('click', '#toggle-attribute', function () {
        $('.attribute-tab').toggle();

        $('#attr-tab-title').text($('#attr-tab-title').text().trim() == 'Atributos' ? 'Talentos' : 'Atributos');
        $(this).text($(this).text().trim() == 'Próximo' ? 'Anterior' : 'Próximo');
    });

    /**
     * Adiciona um novo talento
     */
    $('body').on('click', '#add-talent', function () {
        const item = $('.static-talent').clone();
        const itemsCount = $('#talents').find('.talent-item').length + 1;

        const removeIcon = $('<i class="fas fa-times fa-fw text-danger item-remove" role="button">');

        item.removeClass('static-talent');
        item.find('label').html(`<span class="text">Talento ${itemsCount}:</span>`).attr('for', `talento-${itemsCount}:`).append(removeIcon);
        item.find('select').attr('name', `talento-${itemsCount}:`);
        item.find('.selectize-control').remove();

        $('#talents').append(item);
        
        initTalentoSelectize(item.find('select'));
        updateUiTalentsCount();
    });

    /**
     * Remove um talento
     */
     $('body').on('click', '#talents .item-remove', function () {
        $(this).closest('.talent-item').remove();

        // reseta os names
        $('.talent-item').each(function (index) {
            $(this).find('label').find('.text').text(`Talento ${index + 1}:`).attr('for', `talento-${index + 1}:`);
            $(this).find('select').attr('name', `talento-${index + 1}:`);
        });

        updateUiTalentsCount();
    });

    /*
     * Filter status list
     */
     $('body').on('change', '.filter-status', function () {
        filterStatus();
    });

    /**
     * Reset status state
     */
    $('body').on('click', '#reset-status', function () {
        if ($('.talent-item').length > 1) {
            if (confirm('Desejá mesmo resetar? Todos os talentos serão removidos.')) {
                status = new Status();
                resetStatus();
            }
        } else {
            status = new Status();
            resetStatus();
        }
    });

    /**
     * Remove focus
     */
    $('body').on('click', 'button', function () {
        this.blur();
    });

    /**
     * Remove focus
     */
     $('body').on('change', 'select', function () {
        this.blur();
    });

    /**
     * Calcula a quantidade estimada de pontos da personagem
     */
    $('body').on('change', '.personagem, .form-atributos input', function () {
        let pontos = 10;
        let talentos = 3;

        const nivel = parseInt($('#nivel').val() || 0);
        const possuiCla = $('#possuiCla').val() || 'sim';

        if (possuiCla == 'nao') {
            pontos += 5;
        }

        if (nivel != undefined && nivel != null && (nivel + '').trim().length > 0 && !isNaN(nivel)) {
            pontos += Math.min(nivel, 40) + Math.max(0, Math.floor((nivel - 40) / 2));
            talentos += Math.min(nivel, 40) + Math.max(0, Math.floor((nivel - 40) / 2));

            if (nivel >= 50) {
                talentos += 5;
            } else if (nivel >= 40) {
                talentos += 4;
            } else if (nivel >= 25) {
                talentos += 3;
            } else if (nivel >= 15) {
                talentos += 2;
            } else if (nivel >= 5) {
                talentos += 1;
            }
        }

        if (status && status.ninjutsu >= 3) {
            talentos += 1;
        }
        if (status && status.ninjutsu >= 10) {
            talentos += 1;
        }
        if (status && status.genjutsu >= 10) {
            talentos += 1;
        }
        if (status && status.taijutsu >= 10) {
            talentos += 1;
        }        

        // cap max values
        talentos = Math.min(talentos, 57);
        pontos = Math.max(0, (pontos - attrTotal) + attrExtra);

        const talentsValue = $('#talentPoints').data('value') || 0;

        $('#attrPoints').val(pontos);
        $('#talentPoints').val(`${talentsValue}/${talentos}`).data('max', talentos);

        const countAttrPoints = $('#attrPoints').val() || 10;

        // set current alowed max attr
        if (countAttrPoints > 10) {
            $('.form-atributos input').not('#attrExtra').attr('max', 10);
        } else {
            $('.form-atributos input').each(function() {
                $(this).attr('max', countAttrPoints > 0 ? this.value + countAttrPoints : this.value);
            });
        }
    });

    /**
     * Initialize talent selectize component
     */
    function initTalentoSelectize(element) {
        element.selectize({
            create: false,
            sortField: 'text',
            options: talentos.list,
            multiple: false,
            labelField: 'name',
            valueField: 'value',
            searchField: 'name',
        }).promise().done(function () {
            element[0].selectize.setValue('0');
        });
    }

    /**
     * Toggle summary attribute content
     */
    function toggleAttributesTable(isEmpty) {
        if (isEmpty) {
            $('.summary-content .empty-content').show();
            $('.summary-content .summary-table').hide();
        } else {
            $('.summary-content .empty-content').hide();
            $('.summary-content .summary-table').show();
        }
    }

    /**
     * Display selecte summary
     */
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

    /**
     * Calculate selected talents on UI
     */
    function updateUiTalentsCount() {
        const maxTalentos = $('#talentPoints').data('max');
        const selectedTalentos = $('.talent-item .selectize-talento', '#talents').toArray().reduce((value, item) => value + Math.min($(item).val() || 0, 1), 0);

        if (selectedTalentos > maxTalentos) {
            $('#talentPoints').val(`${maxTalentos}/${maxTalentos} (+${selectedTalentos - maxTalentos})`).data('value', maxTalentos);
        } else {
            $('#talentPoints').val(`${selectedTalentos}/${maxTalentos}`).data('value', selectedTalentos);
        }
    }

    /**
     * Filter displayed status list
     */
    function filterStatus() {
        $('.empty-filter-result').hide();

        const categoria = $('#group-categorias').val();
        const atributo = $('#group-atributos').val();

        if (categoria == 0 || categoria == undefined || categoria == null || (categoria + '').trim().length == 0) {
            $('.group-filter').show();
        } else {
            $('.group-filter').hide();

            if (categoria == 1) {
                $('.group-basico').show();
            } else if (categoria == 2) {
                $('.group-ninjutsu').show();
            } else if (categoria == 3) {
                $('.group-genjutsu').show();
            } else if (categoria == 4) {
                $('.group-taijutsu').show();
            } else if (categoria == 5) {
                $('.group-outros').show();
            } else if (categoria == 6) {
                $('.group-bukijutsu').show();
            }
        }

        if (atributo == 0 || atributo == undefined || atributo == null || (atributo + '').trim().length == 0) {
            $('.attr-filter').show();
        } else {
            $('.attr-filter').hide();

            if (atributo == 1) {
                $('.attr-ninjutsu').show();
            } else if (atributo == 2) {
                $('.attr-genjutsu').show();
            } else if (atributo == 3) {
                $('.attr-taijutsu').show();
            } else if (atributo == 4) {
                $('.attr-forca').show();
            } else if (atributo == 5) {
                $('.attr-destreza').show();
            } else if (atributo == 6) {
                $('.attr-inteligencia').show();
            } else if (atributo == 7) {
                $('.attr-atencao').show();
            } else if (atributo == 8) {
                $('.attr-constituicao').show();
            } else if (atributo == 9) {
                $('.attr-carisma').show();
            }

            $('.group-filter:visible').each(function () {
                if ($(this).find('.attr-filter:visible').length == 0) {
                    $(this).hide();
                }
            });
        }

        if ($('.group-filter:visible').length == 0) {
            $('.empty-filter-result').show();
        }
    }

    /**
     * Reset status state on UI
     */
    function resetStatus() {
        $('#ninjutsu').val(status.ninjutsu);
        $('#destreza').val(status.destreza);
        $('#genjutsu').val(status.genjutsu);
        $('#constituicao').val(status.constituicao);
        $('#taijutsu').val(status.taijutsu);
        $('#atencao').val(status.atencao);
        $('#forca').val(status.forca);
        $('#inteligencia').val(status.inteligencia);
        $('#carisma').val(status.carisma);

        $('#nivel').val('0').trigger('change');
        $('#possuiCla').val('sim').trigger('change');
        $('#attrPoints').val('10');
        $('select.filter-status').val('0').trigger('change');

        $('.talent-item:not(.static-talent)').remove();

        if ($('.selectize-talento')[0].selectize != undefined) {
            $('.selectize-talento')[0].selectize.setValue('0');
        }

        calculateStatus();
        calculateTalents();
        updateUiTalentsCount();
    }

    /**
     * Calculate status and update UI
     */
    function calculateStatus() {
        // set attributes into status handler
        status.ninjutsu = $('#ninjutsu').val() || 0;
        status.destreza = $('#destreza').val() || 0;
        status.genjutsu = $('#genjutsu').val() || 0;
        status.constituicao = $('#constituicao').val() || 0;
        status.taijutsu = $('#taijutsu').val() || 0;
        status.atencao = $('#atencao').val() || 0;
        status.forca = $('#forca').val() || 0;
        status.inteligencia = $('#inteligencia').val() || 0;
        status.carisma = $('#carisma').val() || 0;

        status.calculate();

        updateAttributesForm();
    }

    /**
     * Calculate talents and update UI
     */
    function calculateTalents() {
        status.initTalents();

        $('.talent-item select').each(function () {
            talentos.addAttributes(status, $(this).val());
        });

        status.calculate();

        updateAttributesForm();
    }

    /**
     * Update UI with status attributes
     */
    function updateAttributesForm() {
        // set status values on ui
        $('#hp').val((status.hp + status.chakra) / 2);
        $('#stamina').val(status.stamina);
        $('#saudeMental').val(status.saudeMental);
        $('#vontade').val(status.vontade);
        $('#ninjutsuAlcance').val(status.ninjutsuAlcance + 'm');
        $('#ninjutsuVelocidade').val(status.ninjutsuVelocidade + 'm/s');
        $('#ninjutsuConjuracao').val(status.ninjutsuConjuracao + 's');
        $('#ninjutsuSelos').val(status.ninjutsuSelos  + 's');
        $('#ninjutsuDano').val(status.ninjutsuDano);
        $('#genjutsuAlcance').val(status.genjutsuAlcance  + 'm');
        $('#genjutsuVelocidade').val(status.genjutsuVelocidade  + 'm/s');
        $('#genjutsuPrecisao').val(status.genjutsuPrecisao);
        $('#genjutsuPercepcao').val(status.genjutsuPercepcao);
        $('#danoFisico').val(status.danoFisico);
        $('#danoArmas').val(status.danoArmas);
        $('#arremessoVelocidade').val(status.arremessoVelocidade + 'm/s');
        $('#arremessoPrecisao').val(status.arremessoPrecisao + 'm');
        $('#defesaFisica').val(status.defesaFisica  + '%');
        $('#capacidadeCarga').val(status.capacidadeCarga);
        $('#velocidadePersonagem').val(status.velocidadePersonagem + 'm/s');
        $('#velocidadeGolpe').val(status.velocidadeGolpe + 'm/s');
        $('#velocidadeSaque').val(status.velocidadeSaque + 'm/s');
        $('#reflexos').val(status.reflexos + 'm/s');
        $('#percepcaoMovimento').val(status.percepcaoMovimento + 'm/s');
        $('#percepcaoMentira').val(status.percepcaoMentira);
        $('#armadilhaCriacao').val(status.armadilhaCriacao);
        $('#armadilhaVelocidade').val(status.armadilhaVelocidade + 's');
        $('#armadilhaPercepcao').val(status.armadilhaPercepcao);
        $('#persuasao').val(status.persuasao);
    }

    /**
     * Insert Ninjutsu table on UI
     */
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

    /**
     * Insert Genjutsu table on UI
     */
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

    /**
     * Insert Taijutsu table on UI
     */
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

    /**
     * Insert Forca table on UI
     */
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

    /**
     * Insert Destreza table on UI
     */
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

    /**
     * Insert Inteligência table on UI
     */
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

    /**
     * Insert Atencao table on UI
     */
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

    /**
     * Insert Carisma table on UI
     */
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