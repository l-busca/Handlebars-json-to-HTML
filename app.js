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



