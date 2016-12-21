var greetings = 'Добро пожаловать...';
var queries = [];
var tries = 0;
var tabsCount;
var allInput;
var currentQuery;
var currentInput = '';

var Twit = require('twit');



function weDone() {
    $('#edward').slideDown(function () {
        chrome.storage.sync.set({'wedone': true});
        chrome.storage.sync.set({'allInput': allInput + currentInput});
        chrome.storage.sync.set({'nextTime': tabsCount + currentInput.length + Math.floor(Math.random()*42)});
        chrome.tabs.update({url: 'https://yandex.ru/yandsearch?text=' + currentQuery, 'selected': true})
    });
}

function weGood(input) {
    return input.length > 10 + Math.floor(Math.random()*142)
}

function getQueries() {
    $.get('http://export.yandex.ru/last/last20x.xml', function(res) {
        queries = [];
        $(res).find("item").each(function(){
            queries.push($(this).text());
        })
    })
}

chrome.storage.sync.get(function (data) {
    tabsCount = data.tabsCount || 0;
    allInput = data.allInput || '';
    if (tabsCount) {greetings += ' снова.'}
});

$(function () {
    getQueries();
    $('#terminal').terminal(function(input, term) {
        if (input === "I'm feeling lucky") {
            weDone(currentInput)
        } else if (input === '') {
            term.echo('У меня много вопросов')
        } else if (tries && tries % 7 === 0) {
            term.echo('Иногда мне везет')
        } else if (input === 'help') {
            term.echo('Тебе нужно что-то придумать, что бы выбраться отсюда')
        } else if (weGood(currentInput + input)) {
            weDone(currentInput)
        } else {
            term.echo(currentQuery + '?');
        }
        tries++;
        currentInput += ' ' + input;
    }, {
        greetings: greetings,
        name: 'whatever',
        height: '50vh',
        prompt: 'net@interface$ '
    });
});

var c = document.getElementById("canvas");
var ctx = c.getContext("2d");

c.height = 420;
c.width = window.innerWidth;

function draw() {
    if (!queries.length) {return}
    var font_size = Math.floor(Math.random()*13 + 8);
	ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
	ctx.fillRect(0, 0, c.width, c.height);

	ctx.fillStyle = '#fff';
	ctx.font = font_size + "px Arial";
    var queryIndex = Math.floor(Math.random()*queries.length);
    var query = queries[queryIndex];
    var offset = query.length*font_size;
    currentQuery = query;
    queryIndex === 42 && getQueries();

    ctx.fillText(query, Math.floor(Math.random()*(c.width + offset)) - offset, Math.floor(Math.random()*c.height));
}

setInterval(draw, 42);



