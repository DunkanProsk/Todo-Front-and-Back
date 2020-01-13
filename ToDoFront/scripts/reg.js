const buttReg = document.querySelector('#addBtn');

let registr = () => {
    buttReg.addEventListener('click', (e) => {
        let impValueLog = () => {return document.getElementById('input-field').value};
        let inpValuePas = () => {return document.getElementById('input-field2').value};
        let inpValuePasConf = () => {return document.getElementById('input-field3').value};

        if(chekValue(impValueLog())){
            if(chekValue(inpValuePas())){
                if(chekValue(inpValuePasConf())){
                    if(inpValuePas() === inpValuePasConf()) {
                        axios.post('http://localhost:3000/registration/', {
                            login: impValueLog(),
                            password: inpValuePasConf()
                        }).then(response => {
                            console.log('Successfully');
                        });
                    } else {alert('Passwords do not match')}
                } else {alert('error')}
            } else {alert('error')}
        } else {alert('error')}

    });
};

let chekValue = (value) => {
    if(value !== null && value !== '') {
        return true;
    } else {
        alert('incorrect input');
        return false;
    }
};

registr();