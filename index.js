import antlr4 from "antlr4";
import markdownLexer from "./antlr/markdownLexer.js";
import markdownParser from "./antlr/markdownParser.js";
import markdownListener from "./antlr/markdownListener.js";


class CaseInsensitiveStream extends antlr4.InputStream {
  LA(offset) {
    const result = super.LA(offset);

    switch (result) {
    case 0:
    case antlr4.Token.EOF:
      return result;
    default:
      return String.fromCharCode(result)
      .toUpperCase()
      .charCodeAt(0);
    }
  }
}


let input = `
# your text to parse here
# sfddff

`
const chars = new  antlr4.InputStream(input);
const lexer = new markdownLexer(chars);
const tokens = new antlr4.CommonTokenStream(lexer);
const parser = new markdownParser(tokens);
// parser.buildParseTrees = true;
// console.log(parser.ruleNames)
const tree = parser.prog();

// function toMap(obj){
//   var target = {};
//   for(var key in obj) {
//       if (Object.prototype.hasOwnProperty.call(obj, key)) {
          
//           if (typeof obj[key] === 'object') {
//               target[key] = deepClone(obj[key]); 
//           }
//           else if (typeof obj[key] === 'function') {
//             target[key] = '';
//             // 
//           }
//           else {
//               target[key] = obj[key];
//           }
//       }
//   }
//   return target;
// }

function toJson(_ctx){
  
  var ctx = {
    ruleIndex: _ctx.ruleIndex,
    children: _ctx.children,
    invokingState: _ctx.invokingState,
    text: _ctx.getText()
  };

  if(ctx.children){
    console.log(ctx)
    // console.log(Object.keys(_ctx))
    // process.exit(0)
    ctx.children = ctx.children.map((ctx) => toJson(ctx) )
  }

  // Object.keys()

  return ctx
}

import fs from 'fs'



fs.writeFileSync('./a.json', JSON.stringify(toJson(tree)))

// console.log( tree.children );  

// console.log(tree)



// antlr4.tree.ParseTreeWalker.DEFAULT.walk(new markdownListener, tree);

class Visitor {
  visitProg(ctx) {
    // console.log(Object.keys(ctx));

    return this.visitChildren(ctx);
  }
  visitChildren(ctx) {
    if (!ctx) {
      return;
    }
    console.log(Object.keys(ctx), ctx.stat())


    // if (ctx.children) {
    //   return ctx.children.map((child) => {
    //     if (child.children && child.children.length != 0) {
    //       return child.accept(this);
    //     } else {
    //       return child.getText();
    //     }
    //   });
    // }
  }
}



// tree.accept(new Visitor());



