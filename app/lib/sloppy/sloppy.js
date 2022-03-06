/* Domino uses sloppy-mode features (in particular, `with`) for a few
 * minor things.  This file encapsulates all the sloppiness; every
 * other module should be strict. */
/* jshint strict: false */
/* jshint evil: true */
/* jshint -W085 */
module.exports = {
  Window_run: function _run(code, file) {
    // if (file) code += '\n//@ sourceURL=' + file;
    // with(this) eval(code);
  },
  EventHandlerBuilder_build: function build() {
    // try {
    //   with(this.document.defaultView || Object.create(null))
    //     with(this.document)
    //       with(this.form)
    //         with(this.element)
    //           return eval("(function(event){" + this.body + "})");
    // }
    // catch (err) {
    //   return function() { throw err; };
    // }
  },
};

// this is to fix an Error when building the app
// #20 2.269 ✘ [ERROR] With statements cannot be used with the "esm" output format due to strict mode
// #20 2.269
// #20 2.269     node_modules/domino/lib/sloppy.js:10:4:
// #20 2.269       10 │     with(this) eval(code);
// #20 2.269          ╵     ~~~~
