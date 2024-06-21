document.getElementById('processoForm').addEventListener('submit', function(event) {
    event.preventDefault(); 

    const token = sessionStorage.getItem("token")
    const numeroProcesso = document.getElementById('numeroProcesso').value;

    const div  = document.getElementById('message')
    const existingParag = div.querySelector('p')

    if (existingParag) existingParag.remove()

    const parag = document.createElement('p');
    parag.textContent = "Processando requisição... aguarde um momento."
    parag.setAttribute("style", "color: green;");
    div.appendChild(parag)

    // https://wb-backend-48ug.onrender.com/
    // http://localhost:8080/

    fetch('https://wb-backend-48ug.onrender.com/processos', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ numeroProcesso: numeroProcesso })
    })
    .then(response => {
        if (!response.ok) {
   
            if (existingParag) existingParag.remove()
    
            const parag = document.createElement('p')
            parag.textContent = "Não foi possível consultar o processo - Tente novamento mais tarde!"
            parag.setAttribute("style", "color: red;")
            div.appendChild(parag)

            throw new Error('A resposta da requisição não teve sucesso')
        }
        return response.json()
    })
    .then(data => {
        console.log('Success:', data)
        sessionStorage.setItem('data',  JSON.stringify(data))
        window.location.href = "listProcessos.html"

    })
    .catch((error) => {
        console.error('Error:', error)
    });
});