const API_POSTS = '/api/users';
const API_HEADERS = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
};
let users = [];

class PostUser {
    static createUser(user) {
        return fetch(API_POSTS, {
            method: 'POST',
            body: JSON.stringify(user),
            headers: API_HEADERS
        }).then(response => response.json())
    }
}

function onCreateUser() {
    const $email = document.querySelector('#email');
    const $password = document.querySelector('#password');
    const $confirmPassword = document.querySelector('#confirmPassword');
    const signtupBtn = document.querySelector('.signup-btn');

    signtupBtn.addEventListener('click', () => {
        if ($email.value && $password.value && $confirmPassword.value) {
            const newUser = {
                email: $email.value,
                password: $password.value,
                confirmPassword: $confirmPassword.value
            }

            PostUser.createUser(newUser).then(user => {
                users.push(user);
            });

            //alert('User with such mail is already registered');
            //alert('Registration successful');
            $email.value = $password.value = $confirmPassword.value ='';
        }
    });
}

window.onload = onCreateUser;