/*  HomeworkManager.js:
   This is the base javascript code for the Homework Manager.  This sets up the View and ....
  
*/

require.config({
    paths: {
        "Backbone":             "/webwork2_files/js/lib/vendor/backbone",
        "backbone-validation":  "/webwork2_files/js/lib/vendor/backbone-validation",
        "jquery-ui":            "/webwork2_files/js/lib/vendor/jquery-ui",
        "underscore":           "/webwork2_files/js/lib/vendor/underscore/underscore",
        "jquery":               "/webwork2_files/js/lib/vendor/jquery/jquery",
        "bootstrap":            "/webwork2_files/js/lib/vendor/bootstrap/js/bootstrap",
        "util":                 "/webwork2_files/js/lib/webwork/util",
        "XDate":                "/webwork2_files/js/lib/vendor/xdate",
        "WebPage":              "/webwork2_files/js/lib/webwork/views/WebPage",
        "config":               "/webwork2_files/js/apps/config",
        "Closeable":            "/webwork2_files/js/lib/webwork/views/Closeable"
    },
    urlArgs: "bust=" +  (new Date()).getTime(),
    waitSeconds: 15,
    shim: {
        'jquery-ui': ['jquery'],
        'underscore': { exports: '_' },
        'Backbone': { deps: ['underscore', 'jquery'], exports: 'Backbone'},
        'bootstrap':['jquery'],
        'backbone-validation': ['Backbone'],
        'XDate':{ exports: 'XDate'},
        'config': ['XDate']
        }
});

require(['Backbone', 
    'underscore',
    'WebPage',
    'bootstrap'
    ], 
function(Backbone, _,WebPage){
    var HomeworkEditorView = WebPage.extend({
        initialize: function() {
            this.constructor.__super__.initialize.apply(this, {el: this.el});
            this.render();
        },
        render: function (){
         
          
            
        },
        events: {"click #build-script": "buildScript"},
        buildScript: function (){
            
            
            var tmp = _.template($("#pg-template").text());
        
                
            var inputProblemDiscription = $("#ProblemDiscription-input").val();
            var inputProblemStatement = $("#ProblemStatement-input").val();
            var inputAuthor = $("#Author-input").val();
            var inputInstitution = $("#Institution-input").val();
            var inputTitleText1 = $("#TitleText1-input").val();
            var inputEditionText1 = $("#EditionText1-input").val();
            var inputAuthorText1 = $("#AuthorText1-input").val();
            var inputSection1 = $("#Section1-input").val();
            var inputProblem1 = $("#Problem1-input").val();
            var inputAnswer = $("#Answer-input").val();
            var inputExtraMultipleChoice = $("#ExtraMultipleChoice-input").val();
            var ExtraChoiceArray = inputExtraMultipleChoice.split(",");
           
            ExtraChoiceString = ExtraChoiceArray.join('","');         
            var inputLastChoice = $("#LastChoice-input").val();
            var LastChoiceString = "";
            if ($("#LastChoiceCheckBox").prop("checked")){
                LastChoiceString = "$mc->makeLast(\""+inputLastChoice+"\");"
                };
            var inputVariableList = $("#VariableList-input").val();
            var VariableListArray = inputVariableList.split(",");
            var VariableListString = "Context()->variables->are(";
            VariableListString = VariableListArray.join('=>\"Real\",\n');
            var inputProblemSolution = $("#ProblemSolution-input").val();
            
            console.log(inputAuthor);
            
            var answer_type = $("#answerType-select option:selected").val(); 
             var _setupSection = '';
             var _textSection = '';
             var _answerSection = '';
           if (answer_type == "Number") {
			_setupSection = "Context(\"Numeric\");\n \n$answer = Compute(\" ".concat(inputAnswer).concat("\");");
                        _textSection = "Context()->texStrings;\nBEGIN_TEXT \n ".concat(inputProblemStatement).concat("$BR $BR\nAnswer:\\{ans_rule(55)\\} \\{AnswerFormatHelp(\"numbers\")\\}\n\nEND_TEXT\nContext()->normalStrings;");
                        _answerSection = "ANS($answer->cmp);";
                } else if (answer_type == "Number With Units") {
			_setupSection = "Context(\"Numeric\");\n \n$answer = NumberWithUnits(\" ".concat(inputAnswer).concat("\");");
                        _textSection = "Context()->texStrings;\nBEGIN_TEXT \n ".concat(inputProblemStatement).concat("$BR $BR\nAnswer:\\{ans_rule(55)\\} \\{AnswerFormatHelp(\"numbers\")\\}\n\nEND_TEXT\nContext()->normalStrings;");
                        _answerSection = "ANS($answer->cmp);";
                } else if (answer_type == "String") {
			_setupSection = "";
                        _textSection = "";
                        _answerSection = "";
                } else if (answer_type == "Formula") {
			_setupSection = "Context(\"Numeric\");\nContext()->variables->are("+VariableListString+"=>\"Real\");"+" \n$answer = Compute(\" ".concat(inputAnswer).concat("\");");
                        _textSection = "Context()->texStrings;\nBEGIN_TEXT \n ".concat(inputProblemStatement).concat("$BR $BR\nAnswer:\\{ans_rule(55)\\} \\{AnswerFormatHelp(\"formulas\")\\}\n\nEND_TEXT\nContext()->normalStrings;");
                        _answerSection = "ANS($answer->cmp);";
                } else if (answer_type == "Formula with Units") {
			_setupSection = "Context(\"Numeric\");\nContext()->variables->are("+VariableListString+"=>\"Real\");"+" \n$answer = FormulaWithUnits(\" ".concat(inputAnswer).concat("\");");
                        _textSection = "Context()->texStrings;\nBEGIN_TEXT \n ".concat(inputProblemStatement).concat("$BR $BR\nAnswer:\\{ans_rule(55)\\} \\{AnswerFormatHelp(\"formulas\")\\}\n\nEND_TEXT\nContext()->normalStrings;");
                        _answerSection = "ANS($answer->cmp);";
                } else if (answer_type == "Interval") {
			_setupSection = "Context(\"Interval\");\n \n$answer = Compute(\" ".concat(inputAnswer).concat("\");");
                        _textSection = "Context()->texStrings;\nBEGIN_TEXT \n ".concat(inputProblemStatement).concat("$BR $BR\nAnswer:\\{ans_rule(55)\\} \\{AnswerFormatHelp(\"interval\")\\}\n\nEND_TEXT\nContext()->normalStrings;");
                        _answerSection = "ANS($answer->cmp);";
                } else if (answer_type == "Inequality-Only") {
			_setupSection = "Context(\"Inequalities-Only\");\n \n$answer = Compute(\" ".concat(inputAnswer).concat("\");");
                        _textSection = "Context()->texStrings;\nBEGIN_TEXT \n ".concat(inputProblemStatement).concat("$BR $BR\nAnswer:\\{ans_rule(55)\\} \\{AnswerFormatHelp(\"inequalities\")\\}$BR\n\nNote:  Use NONE for the empty set.\nEND_TEXT\nContext()->normalStrings;");
                        _answerSection = "ANS($answer->cmp);";
                } else if (answer_type == "Interval or Inequality") {
			_setupSection = "Context(\"Inequalities\");\n \n$answer = Compute(\" ".concat(inputAnswer).concat("\");");
                        _textSection = "Context()->texStrings;\nBEGIN_TEXT \n ".concat(inputProblemStatement).concat("$BR $BR\nAnswer:\\{ans_rule(55)\\} \\{AnswerFormatHelp(\"inequalities\")\\}$BR\n\nNote:  Use NONE or {} for the empty set.\nEND_TEXT\nContext()->normalStrings;");
                        _answerSection = "ANS($answer->cmp);";
                } else if (answer_type == "Comma Seperated List of Values") {
			_setupSection = "Context(\"Numeric\");\n \n$answer = List(\" ".concat(inputAnswer).concat("\");");
                        _textSection = "Context()->texStrings;\nBEGIN_TEXT \n ".concat(inputProblemStatement).concat("$BR $BR\nAnswer:\\{ans_rule(55)\\} \\{AnswerFormatHelp(\"numbers\")\\}\n$BR\nEnter answers as a comma separated list.\nEND_TEXT\nContext()->normalStrings;");
                        _answerSection = "ANS($answer->cmp);";
                } else if (answer_type == "Multiple Choice") {
			_setupSection = "$mc = new_multiple_choice();\n$mc->qa(\"".concat(inputProblemStatement).concat("\",\"").concat(inputAnswer).concat("\");\n$mc->extra(\"").concat(ExtraChoiceString).concat("\");\n").concat(LastChoiceString);
                        _textSection = "Context()->texStrings;\nBEGIN_TEXT \n\\{$mc->print_q()\\}\n$BR\n\\{$mc->print_a()\\}\nEND_TEXT\nContext()->normalStrings;";
                        _answerSection = "ANS(radio_cmp($mc->correct_ans()));";
                }
                
            $("#pg-code").val(tmp({ProblemDiscription:inputProblemDiscription,
                                  DBsubject:$("#DBsubject-select option:selected").val(),
                                  DBchapter:$("#DBchapter-select option:selected").val(),
                                  Author:inputAuthor,
                                  Institution:inputInstitution,
                                  TitleText1:inputTitleText1,
                                  EditionText1:inputEditionText1,
                                  AuthorText1:inputAuthorText1,
                                  Section1:inputSection1,
                                  Problem1:inputProblem1,
                                  ProblemStatement:inputProblemStatement,
                                  SetupSection:_setupSection,
                                  TextSection:_textSection,
                                  AnswerSection:_answerSection,
                                  ProblemSolution:inputProblemSolution
                                  }));
            
            });

    new HomeworkEditorView({el: $("div#mainDiv")});
});