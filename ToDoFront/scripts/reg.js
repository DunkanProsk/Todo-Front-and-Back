const buttReg = document.querySelector('#addBtn');
const loginField = document.getElementById('input-login');
const passField = document.getElementById('input-pass');
const confirmPassField = document.getElementById('input-confirm');

buttReg.addEventListener('click', () => {
    if (loginField.value && passField.value && confirmPassField.value) {
        if(passField.value === confirmPassField.value) {
            axios.post('http://localhost:3000/registration/', {
                login: loginField.value,
                password: passField.value,
            }).then(response => {
                if(response.status === 200) {
                    document.querySelector("#input-login").value = "";
                    document.querySelector("#input-pass").value = "";
                    document.querySelector("#input-confirm").value = "";
                    alert('Регистрация успешна!');
                    document.location.href = "login.html";
                }
            }).catch(err => {
                document.querySelector("#input-login").value = "";
                document.querySelector("#input-pass").value = "";
                document.querySelector("#input-confirm").value = "";
                alert('Пользователь существует!');
            });
        } else {
            alert('Пароли не совпадают!');
        }
    } else {
        alert('Пустой ввод!');
    }
});
