let IPA_result = "";
var inited = false;

function update_result () {
  if (!inited) return;
  let c_w = (get_IPA_tBox()+" ").split(" ");
  if (lang_opt[lang].splitmode == 1){
    c_w = (get_IPA_tBox()+" ").split("");
  }

  set_IPA_tBox ("loading....");

  get_IPA_DB ((obj)=>{

    
    let str = "";

    for (var i = 0; i < c_w.length; i++) {

      let word = c_w[i];

      preprocess_eng(word,(t_word)=>{

        if ( word != "") {
          if(typeof obj[t_word] != "undefined"){

            let ipa = obj[t_word];
            ipa = ipa.slice(1,-1)
			
			ipa = "/"+ipa+"/"
            if (document.getElementById("wf_c_words").checked) {

                str += "( " + word + " : " + ipa + " ) ";

              }else  str += ipa + " ";

          }else str += word + " ";

          set_IPA_tBox (str);

        }
      });
    }

  });
}

var jsonCache = null

function get_IPA_DB (s) {
    if (jsonCache == null){
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                var myObj = JSON.parse(this.responseText);
                jsonCache = myObj
                return s(myObj);
            }
        };



        xmlhttp.open("GET", data_file, true);
        xmlhttp.send();
    } else {
        s(jsonCache)
    }
}

function get_IPA_tBox () {
  return document.getElementById("cWords_tBox").value
}

function set_IPA_tBox (v = IPA_result) {
  document.getElementById("IPA_tBox").value = v;
}

function preprocess_eng (x,callback){
  x = x.replace(/A/g, "a");
  x = x.replace(/B/g, "b");
  x = x.replace(/C/g, "c");
  x = x.replace(/D/g, "d");
  x = x.replace(/E/g, "e");
  x = x.replace(/F/g, "f");
  x = x.replace(/G/g, "g");
  x = x.replace(/H/g, "h");
  x = x.replace(/I/g, "i");
  x = x.replace(/J/g, "j");
  x = x.replace(/K/g, "k");
  x = x.replace(/L/g, "l");
  x = x.replace(/M/g, "m");
  x = x.replace(/N/g, "n");
  x = x.replace(/O/g, "o");
  x = x.replace(/P/g, "p");
  x = x.replace(/Q/g, "q");
  x = x.replace(/R/g, "r");
  x = x.replace(/S/g, "s");
  x = x.replace(/T/g, "t");
  x = x.replace(/U/g, "u");
  x = x.replace(/V/g, "v");
  x = x.replace(/W/g, "w");
  x = x.replace(/X/g, "x");
  x = x.replace(/Y/g, "y");
  x = x.replace(/Z/g, "z");
  x = x.replace(/\./g, "");
  x = x.replace(/\,/g, "");
  x = x.replace(/\n/g, "");
  callback(x);
}

function init(dataf){
    window.data_file = dataf;
    window.inited = true;
    update_result();
}