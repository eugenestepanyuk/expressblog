const API_POSTS = '/api/users';
let users = [];

class PostUser {
    static fetch() {
        return fetch(API_POSTS, {
            method: 'GET'
        }).then(response => response.json())
    }
}

function getUser() {
    const $email = document.querySelector('#email');
    const $password = document.querySelector('#password');
    const loginBtn = document.querySelector('.login-btn');

    loginBtn.addEventListener('click', () => {
        if ($email.value && $password.value) {
            const user = {
                email: $email.value,
                password: $password.value
            }

            PostApi.fetch().then(backUsers => {
                users = backUsers.concat();
            })
        }
    });
}