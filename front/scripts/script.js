
$(()=>{
    const url = 'http://localhost:8000/messages/';
    let container = $('<div>');
    let getMessages = ()=>{
        $.ajax({

            method: 'GET',
            url: url,
        }).then(response => {

            $('body').append(container);

            for(let i = 0; i<response.length; i++){
                let div = $('<div id="mess">');
                let p = $('<p>').text(response[i].author);
                let b = $('<b>').text(response[i].message);

                div.append(p, b);
                container.append(div);
            }
        } );
    };

    getMessages();

    $('#send').on('click', () =>{

        let data = {
            message: $('#message').val(),
            author: $('#name').val()
        };

        $.ajax({
            headers: {
                "Content-Type":"application/json",
                "Accept":"application/json"
            },
            method: 'POST',
            url: url,
            data: JSON.stringify(data)
        }).then((response) =>{
            let div = $('<div id="mess">');
            let p = $('<p>').text(response.author);
            let b = $('<b>').text(response.message);

            div.append(p, b);
            container.append(div);
        })
    });



});
