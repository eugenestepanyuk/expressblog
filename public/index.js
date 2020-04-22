const card = post => {
    return `
    <div class="card blue-grey darken-1 z-depth-4">
        <div class="card-content white-text">
            <span class="card-title">${post.title}</span>
            <p class="card-content" style="white-space: pre-line;">${post.content}</p>
            <small>${new Date(post.date).toLocaleDateString()}</small>
        </div>
        <div class="card-action" style="display: flex; justify-content: flex-end;">
            <button class="btn btn-small red js-edit" data-id="${post._id}">
                <i class="material-icons">edit</i>
            </button>
            <button class="btn btn-small red js-remove" data-id="${post._id}" style="margin-left: 10px;">
                <i class="material-icons">delete</i>
            </button>
        </div>
    </div>`
};

const API_POSTS = '/api/posts';
const API_HEADERS = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
};
let posts = [];
let modal;

class PostApi {
    static fetch() {
        return fetch(API_POSTS, {
            method: 'GET'
        }).then(response => response.json())
    }

    static createPost(post) {
        return fetch(API_POSTS, {
            method: 'POST',
            body: JSON.stringify(post),
            headers: API_HEADERS
        }).then(response => response.json())
    }

    static editPost(id) {
        return fetch(`${API_POSTS}/${id}`, {
            method: 'PUT',
            headers: API_HEADERS
        }).then(response => response.json());
    }

    static removePost(id) {
        return fetch(`${API_POSTS}/${id}`, {
            method: 'DELETE',
            headers: API_HEADERS
        }).then(response => response.json());
    }
};

document.addEventListener('DOMContentLoaded', () => {
    PostApi.fetch().then(backendPosts => {
        posts = backendPosts.concat();
        renderPosts(posts);
    })

    modal = M.Modal.init(document.querySelector('.modal'));
   
    document.querySelector('#createPost').addEventListener('click', onCreatePost);
    document.querySelector('#posts').addEventListener('click', onEditPost);
    document.querySelector('#posts').addEventListener('click', onDeletePost);
})

function renderPosts(_posts = []) {
    const $posts = document.querySelector('#posts');
    if(_posts.length > 0){
        $posts.innerHTML = _posts.map(post => card(post)).reverse().join(' ');   
    } else {
        $posts.innerHTML = `<div class="center">No Posts!</div>`
    }
}

function onCreatePost() {
    const $title = document.querySelector('#title');
    const $content = document.querySelector('#content');

    if($title.value && $content.value) {
        const newPost = {
            title: $title.value,
            content: $content.value
        }
        PostApi.createPost(newPost).then(post => {
            posts.push(post);
            renderPosts(posts);
        });
        modal.close();
        $title.value = '';
        $content.value = '';
        M.updateTextFields();
    }
}

function onEditPost(event) {
    const $titleCard = document.querySelector('.card-title');
    const $contentCard = document.querySelector('.card-content');
    
    if(event.target.classList.contains('js-edit')) {
        const id = event.target.getAttribute('data-id'); 
        PostApi.editPost(id).then(() => {
            const postIndex = posts.findIndex(post => post._id === id);
            
            renderPosts(posts);              
        })        
    }
}

function onDeletePost(event) {
    if(event.target.classList.contains('js-remove')) {
        const decition = confirm('Are you sure?');        
        if(decition) {
            const id = event.target.getAttribute('data-id'); 
            PostApi.removePost(id).then(() => {
                const postIndex = posts.findIndex(post => post._id === id);
                posts.splice(postIndex, 1);
                renderPosts(posts);              
            })
        }
    }
}