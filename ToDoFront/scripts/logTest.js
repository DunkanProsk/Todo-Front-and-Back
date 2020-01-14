let loginIn = false;
let getLog = () => {
    if(loginIn) return loginIn = false;
    return loginIn = true;
};