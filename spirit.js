GREETINGS = [
    'Нажми ретурн и проходи',
    'Слишком много кликов',
    'Пришло время поговорить с интернетом',
    'Может быть help сможет тебе помочь',
    'Что ты сделал для российского сегмента в свои годы',
    'Не накликать бы беду',
    'Люди так много говорят. Что они спрашивают?',
    'The Matrix has you...'
];
var queries = [];
var tries = 0;
var tabsCount;
var allInput;
var currentQuery;
var currentInput;

function weDone() {
    $('#edward').slideDown(function () {
        chrome.storage.sync.set({'wedone': true});
        chrome.storage.sync.set({'allInput': allInput + currentInput});
        chrome.storage.sync.set({'nextTime': tabsCount + currentInput.length});
        chrome.tabs.update({url: 'https://yandex.ru/yandsearch?text=' + currentQuery, 'selected': true})
    });
}

function weGood(input) {
    chrome.storage.sync.set({'nextTime': tabsCount + input.length + Math.floor(Math.random()*42)});
    return input.length > 142
}

function getQueries() {
    queries = [];
    $.get('http://export.yandex.ru/last/last20x.xml', function(res) {
        $(res).find("item").each(function(){
            queries.push($(this).text());
        })
    })
}

chrome.storage.sync.get(function (data) {
    tabsCount = data.tabsCount || 0;
    allInput = data.allInput || '';
});

$(function () {
    getQueries();
    $('#terminal').terminal(function(input, term) {
        currentInput += input + ' ';
        if (input === "I'm feeling lucky") {
            weDone(currentInput)
        }
        if (tries === 0 && tabsCount) {
            term.echo('Я показал тебе чуть менее чем ' + tabsCount + ' интернетов')
        } else if (tries % 7 === 0) {
            term.echo('Иногда мне везет')
        } else if (input === 'help') {
            term.echo('Расскажи мне что-нибудь и что-нибудь расскажу тебе я')
        } else if (weGood(currentInput + input)) {
            weDone(currentInput)
        } else {
            term.echo(currentQuery + '?')
        }
        tries++;
    }, {
        greetings: GREETINGS[Math.floor(Math.random()*GREETINGS.length)],
        name: 'whatever',
        height: '50vh',
        prompt: 'ntsprt> '
    });
});

var c = document.getElementById("canvas");
var ctx = c.getContext("2d");

c.height = 420;
c.width = window.innerWidth;

var font_size = 10;

function draw()
{
	ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
	ctx.fillRect(0, 0, c.width, c.height);

	ctx.fillStyle = '#'+(Math.random()*0xFFFFFF<<0).toString(16);
	ctx.font = font_size + "px";

    var query = queries[Math.floor(Math.random()*queries.length)];
    currentQuery = query;
    ctx.fillText(query, Math.floor(Math.random()*c.width), Math.floor(Math.random()*c.height));
}

setInterval(draw, 88);



