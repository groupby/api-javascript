/// <reference path="../typings/main.d.ts" />
"use strict";
var ts = require("typescript");
var fs = require("fs");

const OUTPUT = "build/types.json";

/** Generate documention for all classes in a set of .ts files */
function generateDocumentation(fileNames, options) {
  // Build a program using the set of root file names in fileNames
  var program = ts.createProgram(fileNames, options);
  // Get the checker, we will use it to find more about classes
  var checker = program.getTypeChecker();
  var output = [];

  // Visit every sourceFile in the program
  var files = program.getSourceFiles();
  for (var i = 0; i < files.length; i++) {
    var sourceFile = files[i];
    // Walk the tree to search for classes
    ts.forEachChild(sourceFile, visit);
  }

  // print out the doc
  fs.writeFileSync(OUTPUT, JSON.stringify(output, undefined, 4));
  return;

  /** visit nodes finding exported classes */
  function visit(node) {
    // Only consider exported nodes
    if (!isNodeExported(node)) return;

    if (node.kind === ts.SyntaxKind.ClassDeclaration) {
      // This is a top level class, get its symbol
      var symbol = checker.getSymbolAtLocation(node.name);
      output.push(serializeClass(symbol));
    } else if (node.kind === ts.SyntaxKind.ModuleDeclaration) {
      // This is a namespace, visit its children
      ts.forEachChild(node, visit);
    }
  }

  /** Serialize a symbol into a json object */
  function serializeSymbol(symbol) {
    return {
      name: symbol.getName(),
      type: checker.typeToString(checker.getTypeOfSymbolAtLocation(symbol, symbol.valueDeclaration))
    };
  }

  /** Serialize a class symbol infomration */
  function serializeClass(symbol) {
    var details = serializeSymbol(symbol);
    // Get the construct signatures
    var constructorType = checker.getTypeOfSymbolAtLocation(symbol, symbol.valueDeclaration);
    var members = constructorType.getProperties()[0]['parent']['members'];
    details.members = Object.keys(members)
      .reduce(function(collection, key) {
        return collection.concat(serializeSymbol(members[key]));
      }, []);
    return details;
  }

  /** True if this is visible outside this file, false otherwise */
  function isNodeExported(node) {
    return (node.flags & ts.NodeFlags.Export) !== 0 || (node.parent && node.parent.kind === ts.SyntaxKind.SourceFile);
  }
}
generateDocumentation(process.argv.slice(2), {
  target: ts.ScriptTarget.ES5,
  module: ts.ModuleKind.CommonJS
});
