const card = post => {
    return `
    <div class="card blue-grey darken-1 z-depth-4" id="post-${post._id}">
        <div class="card-content white-text">
            <span class="card-title">${post.title}</span>
            <p class="card-content card-paragraph" style="white-space: pre-line;">${post.content}</p>
            <small>${new Date(post.date).toLocaleDateString()}</small>
        </div>
        <div class="card-action" style="display: flex; justify-content: flex-end;">
            <button class="btn btn-small red edit-button">
                <i class="material-icons">edit</i>
            </button>
            <button class="btn btn-small red delete-button" style="margin-left: 10px;">
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

    static editPost(id, data) {
        return fetch(`${API_POSTS}/${id}`, {
            method: 'PUT',
            headers: API_HEADERS,
            body: JSON.stringify(data)
        }).then(response => response.json());
    }

    static removePost(id) {
        return fetch(`${API_POSTS}/${id}`, {
            method: 'DELETE',
            headers: API_HEADERS
        }).then(response => response.json());
    }
};

function main() {
    PostApi.fetch().then(backendPosts => {
        posts = backendPosts.concat();
        renderPosts(posts);
   
        document.querySelector('.create-post').addEventListener('click', onCreatePost);
    })
}

function renderPosts(_posts = []) {
    const $posts = document.querySelector('#posts');
    $posts.innerHTML = null;

    if(_posts.length > 0){
        $posts.innerHTML = _posts.map(post => card(post)).reverse().join(' ');   

        _posts.forEach(post => {
            const $post = document.querySelector(`#post-${post._id}`);

            if ($post) {
                
                $post.querySelector('.edit-button').addEventListener('click', onEditPost.bind({ id: post._id }));
                $post.querySelector('.delete-button').addEventListener('click', onDeletePost.bind({ id: post._id }));
            }
        });
    } else {
        $posts.innerHTML = `<div class="center">No Posts!</div>`;
    }
}

function onCreatePost() {
    const $title = document.querySelector('#title');
    const $content = document.querySelector('#content');

    //$title.value = '';
    //$content.value = '';

    const modal = M.Modal.init(document.querySelector('.modal'));
    const createHeader = document.querySelector('#modal-header');
    const createButton = document.querySelector('#modal-button-submit').cloneNode(true);
    const parent = document.querySelector('#modal-button-submit').parentNode;

    document.querySelector('#modal-button-submit').remove();
    parent.appendChild(createButton);   

    createHeader.textContent = 'New Post';
    createButton.textContent = 'Create Post';

    createButton.addEventListener('click', () => {
        if ($title.value && $content.value) {
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
            // M.updateTextFields();
        }
    });

    modal.open();
}


function onEditPost() {
    const $title = document.querySelector('#title');
    const $content = document.querySelector('#content');
    const $newTitle = document.querySelector('.card-title');
    const $newContent = document.querySelector('.card-paragraph');

    $title.value = '';
    $content.value = '';

    const modal = M.Modal.init(document.querySelector('.modal'));
    const updateHeader = document.querySelector('#modal-header');
    const updateButton = document.querySelector('#modal-button-submit').cloneNode(true);
    const parent = document.querySelector('#modal-button-submit').parentNode;

    document.querySelector('#modal-button-submit').remove();
    parent.appendChild(updateButton);

    updateHeader.textContent = '';
    updateButton.textContent = 'Update Post';

    updateButton.addEventListener('click', () => {
        if($title.value && $content.value) {
            PostApi.editPost(this.id, { title: $title.value, content: $content.value }).then(post => {
                const postIndex = posts.findIndex(post => post._id === this.id);
                posts[postIndex] = post;         

                renderPosts(posts);

                modal.close();
            });
        }
    });
    modal.open();
}


function onDeletePost() {
    const decition = confirm('Are you sure?'); 

    if (decition) {
        PostApi.removePost(this.id).then(() => {
            const postIndex = posts.findIndex(post => post._id === this.id);
            posts.splice(postIndex, 1);
            renderPosts(posts);     
        })
    }
}

window.onload = main;