const input = document.querySelector('#input-field');
const list = document.querySelector('#list');
const butt = document.querySelector('#addBtn');
const clear = document.querySelector('#clearbtn');

let todoList = [];

axios.get('http://localhost:3000/').then(response => {
    todoList = response.data;
    render();
});

let render = () => {
    list.innerHTML = '';

    todoList.forEach((item, index) => {
        let li = document.createElement('li');
        let div = document.createElement('div');
        let closebtn = document.createElement('button');
        let editbtn = document.createElement('button');
        let editInput = document.createElement('input');
        let editEnterbtn = document.createElement('button');
        let editClosebtn = document.createElement('button');

        list.append(li);
        li.innerText = item.name;
        li.setAttribute('id', 'li');
        li.setAttribute('data-id', index);
        li.addEventListener('click', (e) => {
            if(e.target.tagName === 'LI') {
                let i = event.target.dataset.id;
                if (todoList[i].checked === true) {
                    axios.post('http://localhost:3000/update/' + todoList[i]._id, {
                        name: todoList[i].name,
                        checked: false
                    }).then(response => {
                        todoList = response.data;
                        render();
                    });
                } else {
                    axios.post('http://localhost:3000/update/' + todoList[i]._id, {
                        name: todoList[i].name,
                        checked: true
                    }).then(response => {
                        todoList = response.data;
                        render();
                    });
                }
            }
        });

        li.append(div);
        div.append(closebtn);
        closebtn.textContent = 'X';
        closebtn.setAttribute('class', 'close');
        closebtn.setAttribute('data-idd', index);
        closebtn.addEventListener('click', (e) => {
            let i = event.target.dataset.idd;
            axios.post('http://localhost:3000/delete/' + todoList[i]._id).then(response => {
                todoList = response.data;
                render();
            });
        });

        div.append(editbtn);
        editbtn.textContent = 'edit';
        editbtn.setAttribute('class', 'edit');
        editbtn.setAttribute('data-idedit', index);
        editbtn.addEventListener('click', (e) => {
            e.stopImmediatePropagation();
            closebtn.setAttribute('style', 'display: none');
            editbtn.setAttribute( 'style', 'display: none');

            div.append(editEnterbtn);
            editEnterbtn.textContent = 'enter';
            editEnterbtn.setAttribute('class', 'editEnt');
            editEnterbtn.setAttribute('data-idedit', index);
            editEnterbtn.addEventListener('click', (e) => {
                let impValue = () => {
                    let impValue = document.getElementById('input-field-2').value;
                    return impValue;
                };

                if((impValue() !== '') && (impValue() !== null)) {
                    axios.post('http://localhost:3000/update/' + todoList[i]._id, {
                        name: impValue(),
                        checked: todoList[i].checked
                    }).then(response => {
                        todoList = response.data;
                        render();
                    });
                } else {
                    alert('empty line!');
                };
                render();
            });

            div.append(editClosebtn);
            editClosebtn.textContent = 'X';
            editClosebtn.setAttribute('class', 'close');
            editClosebtn.setAttribute('data-idd', index);
            editClosebtn.addEventListener('click', (e) => {
                render();
            });

            let i = event.target.dataset.idedit;
            li.append(editInput);
            editInput.setAttribute('class', 'input-field-2');
            editInput.setAttribute('id', 'input-field-2');
            editInput.setAttribute('size','10');
            editInput.setAttribute('text-align','left');
            editInput.setAttribute('maxlength','12');
            editInput.setAttribute('value', todoList[i].name);
            editInput.addEventListener('keyup', (e) => {
                if(e.key === 'Enter') {
                    if(e.target.value !== '' && e.target.value !== null) {
                        axios.post('http://localhost:3000/update/' + todoList[i]._id, {
                            name: e.target.value,
                            checked: todoList[i].checked
                        }).then(response => {
                            todoList = response.data;
                            render();
                        });
                    } else {
                        alert('empty line!');
                    };
                    render();
                };
            });
        });

        if (todoList[index].checked === true) {
            li.classList.toggle('checked');
        };
    });
};

input.addEventListener('keyup', (enter) => {
    if(enter.key === 'Enter') {
        if(enter.target.value !== '') {
            axios.post('http://localhost:3000/create', {
                name: enter.target.value,
                checked: false
            }).then(response => {
                todoList = response.data;
                render();
            });
        } else {
            alert('empty line!');
        };
        render();
        document.querySelector("#input-field").value = "";
    };
});

butt.addEventListener('click', (mouse) => {
    let impValue = () => {
        let impValue = document.getElementById('input-field').value;
        return impValue;
    };
    if(impValue() !== '') {
        axios.post('http://localhost:3000/create', {
            name: impValue(),
            checked: false
        }).then(response => {
            todoList = response.data;
            render();
        });
    } else {
        alert('empty line!');
    }
    render();

    document.querySelector("#input-field").value = "";
});

clear.addEventListener('click',(cl) => {
    axios.post('http://localhost:3000/deleteall').then(response => {
        todoList = response.data;
        render();
    });
    localStorage.clear();
});

render();
