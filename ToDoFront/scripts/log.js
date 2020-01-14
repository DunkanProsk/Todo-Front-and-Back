const inputLog = document.querySelector('#input-login');
const inputPas = document.querySelector('#input-password');
const buttLog = document.querySelector('#Log');

buttLog.addEventListener('click', () => {
    if (inputLog.value && inputPas.value) {
            axios.post('http://localhost:3000/login/', {
                login: inputLog.value,
                password: inputPas.value,
            }).then(response => {
                if(response.status === 200) {
                    document.querySelector("#input-login").value = "";
                    document.querySelector("#input-password").value = "";
                    getLog();
                    document.location.href = "index.html";
                }
            }).catch(err => {
                document.querySelector("#input-password").value = "";
                alert('Неверный пароль или логин!');
            });
    } else {
        alert('Пустой ввод!');
    }
});



