const handlebars = require('handlebars');
const fs = require('fs');

const dir = './jsonFiles';
const target = './htmlFiles';

function importJson(dir) {
    const jsonFiles =[];
    

    const files = fs.readdirSync(dir);
    files.forEach(file => {
        let rawdata = fs.readFileSync(dir+"/"+file);
        jsonFiles.push({nom:file,json:JSON.parse(rawdata)});
    });
    return jsonFiles;

}

const htmlHeader = "<!DOCTYPE html><html><head><meta charset='utf-8'><title>Test</title></head>";

const htmlContents = [];

let source = "<p>Hello, my name is {{person.name}}, I'm {{person.age}}. I am from {{person.country}}. I can do " +
             "{{person.tasks.length}} tasks:</p>" +
             "<ul>{{#each person.tasks}}<li>{{this}}</li>{{/each}}</ul>";
let template = handlebars.compile(source);

const jsonFiles = importJson(dir);


jsonFiles.forEach(file => {
    //htmlContents.push({nom:(file.nom).split(".")[0]+".html",content:htmlHeader+"<body>"+template(file.json)+"</body>"});
    fs.appendFile(target+"/"+(file.nom).split(".")[0]+".html", htmlHeader+"<body>"+template(file.json)+"</body>", function (err) {
        if (err) throw err;
        console.log('Saved!');
    });

});

console.log(htmlContents);



/*
Les problèmes que y'avait c'était fs.readdir qui est en async est du coup la suite marchait pas
car enfaite fallait mettre tout dans le callback en mode "quand t'as recup les fichiers fait ça en attendant moi je fais d'autres trucs"
sauf que la tout le programme depend de ça donc on aurait tout eu dans le callback donc autant mettre en dehors
donc a chaque fois que y'a ça truc (req, callback_param => { balbal on m'apelle quand on a fini de recup les trucs ça depend des promises ?}) donc on en voit souvent
au final j'ai mis readdirSync mais plus rien marchait c'est pcq fallait enlever le callback et juste mettre la ligne du coup
*/


