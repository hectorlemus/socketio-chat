var socket = io.connect('', {'forceNew':true});
socket.on('messages', function(data){    
    render(data);
});

function render(data) {

    if(typeof(Storage) !== "undefined") {
                
        localStorage.setItem("mensajes", "holis");
        var x = localStorage.getItem("mensajes");
        console.log(x);
        
    } else {        
        console.log("Sorry, your browser does not support web storage..." );
    }
        
    console.log(data);
    
    var html = data.map( function(message, index){
        return(`
        <div class="message">
            <div class="nick">
                ${message.nickname}
            </div>            
            <p class="text">${message.text}</p>
        </div>
        `);
    }).join(' ');    

    document.getElementById('messages').innerHTML= html;
}

function addMesage(e) {

    if (login()) {
        if (document.getElementById('text').value == "") {
            return false;
        }

        var message = {
            nickname: "@"+document.getElementById('nickname').value,
            text: document.getElementById('text').value
        };
        
        document.getElementById('text').value = ""; 
        socket.emit ('add-message', message);        
    }    

    return false;
}

function login() {    
    var user = document.getElementById('nickname').value;    
    if (user !="") {        
        document.getElementById('text').style.display = 'inline-block';
        document.getElementById('nickname').style.display = 'none';
        return true;
    }    
    return false;
}