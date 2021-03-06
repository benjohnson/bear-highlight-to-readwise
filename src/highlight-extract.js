const fs = require("fs");
const path = require("path");

function main() {
  let files = fs
    .readdirSync("./notes", { withFileTypes: true })
    .filter(x => x.isFile())
    .map(x => x.name)
    .filter(x => path.extname(x) === ".md")

  let finalHighlights = [];

  for (let filePath of files) {
    let file = fs.readFileSync(path.join('./notes', filePath), 'utf-8');

    for (let highlight of getHighlights(file)) {
      finalHighlights.push({
        title: "Bear Notes",
        author: "Bear Notes",
        note: getTitle(file),
        text: highlight,
        source_type: "book"
      });
    }
  }

  fs.writeFileSync('./highlights.json', JSON.stringify(finalHighlights, null, 2));
}

function getTitle(file) {
  let firstLine = file.split("\n")[0];
  return firstLine.match(/# (.*)/)[1];
}

function getHighlights(file) {
  let matches = file.match(/::.*::/gm)
  if (!matches) { return [] }
  return matches.map(highlight => {
    return highlight.match(/::(.*)::/)[1];
  });
}

main();
