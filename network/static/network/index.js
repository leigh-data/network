document.addEventListener('DOMContentLoaded', (event) => {
  const postCards = document.getElementsByClassName('post-card');
  const csrftoken = () => Cookies.get('csrftoken');

  const editFormHandler = e => {
    e.preventDefault();
    
    const form = e.target;
    const postId = form.dataset.postId;
    const editToggle = form.parentNode.parentNode.getElementsByClassName('edit-toggle')[0];
    const displayContent = form.parentNode.parentNode.getElementsByClassName('card-text')[0];
    const contentInput = form.elements.namedItem("content");
    const content = contentInput.value;
    const data = JSON.stringify({ content });
    
    fetch(`/api/posts/${postId}/`, {
      method: 'POST',
      headers: {
        'X-CSRFToken': csrftoken(),
        'Content-Type': 'application/json;charset=UTF-8',
      },
      body: data,
    })
    .then((res) => res.json())
    .then(data => {
      contentInput.value = data.content;
      displayContent.innerHTML = data.content;
      editToggle.click();
    })
    .catch((err) => {
      console.error(err);
    });
  };

  const editToggleButtonHandler = e => {
    const card = e.target.parentNode.parentNode;
    const content = card.getElementsByClassName('card-content')[0];
    const form = card.getElementsByClassName('card-form')[0];

    form.classList.toggle('hide');
    content.classList.toggle('hide');
  };

  const likeButtonHandler = e => {
    const likeButton = e.target;
    const liked = likeButton.classList.contains('liked');
    const likes = likeButton.parentNode;
    const likeCount = likes.getElementsByClassName('like-count')[0];
    const postId = likes.dataset.postId;
    
    const data = JSON.stringify({ liked })

    fetch(`/api/likes/${postId}/`, {
      method: 'POST',
      headers: {
        'X-CSRFToken': csrftoken(),
        'Content-Type': 'application/json;charset=UTF-8',
      },
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        likeCount.innerHTML = data.count;
        likeButton.classList.toggle('liked');
      })
      .catch((err) => {
        console.error(err);
      });
  }
  
  for(let i = 0; i < postCards.length; i++) {
    let postEditForm = postCards[i].getElementsByTagName('form')[0];
    let editToggleButton = postCards[i].getElementsByClassName('edit-toggle')[0];
    let likeButton = postCards[i].getElementsByClassName('like-button')[0];
    
    if (editToggleButton) {
      editToggleButton.addEventListener('click', editToggleButtonHandler);
    }

    if (postEditForm) {
      postEditForm.addEventListener('submit', editFormHandler);
    }

    if(likeButton) {
      likeButton.addEventListener('click', likeButtonHandler);
    }
  }
});
