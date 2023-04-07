import constant from '../Constants';

export const requestSignUp = (id, pw, name, phNum, email) => {
    console.log("Sending signup request");

    let result = true;

    fetch(constant.BASEURL + 'join/signup', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            id: id,
            password: pw,
            name: name,
            phone_number: phNum,
            email: email
        })
    })
    .then((response) => {
        console.log(response);
        if (response.status == 200){
            console.log("Go Next Page");
            return response.json();
        }  
        else {
            console.log(response.status);
        }
    })
    .then((data) => {
        console.log(data);
    })
    .catch((error) => {
        console.error(error);
        result = false;
    });
    return result;
};

export const requestIdCheck = (id) => {
    let result = false;
    fetch(constant.BASEURL + 'join/checkId', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: id,
        })
    })
    .then((response) => {
        // console.log(response);
        if (response.status == 200){
            return response.json();
        }
        else {
            console.log(response.status);
        }
    })
    .then((data) => {
        if (data.data != null){
            console.log("Bad ID");
            result = false;        
        }
        else if (data.data === null){
            console.log("GOOD ID");
            result = true;
        }
        console.log(data.message);
    });
    return result;
};

