import antlr4 from "antlr4";
import markdownLexer from "./antlr/markdownLexer.js";
import markdownParser from "./antlr/markdownParser.js";
import markdownListener from "./antlr/markdownListener.js";

let input = "# your text to parse here\n"
input += "---"
const chars = new antlr4.InputStream(input);
const lexer = new markdownLexer(chars);
const tokens = new antlr4.CommonTokenStream(lexer);
const parser = new markdownParser(tokens);
parser.buildParseTrees = true;
// console.log(parser)

const tree = parser.prog();

 class Visitor {
    visitChildren(ctx) {
      if (!ctx) {
        return;
      }
  
      if (ctx.children) {
        return ctx.children.map(child => {
          if (child.children && child.children.length != 0) {
            return child.accept(this);
          } else {
            return child.getText();
          }
        });
      }
    }
  }
  
  tree.accept(new Visitor());

