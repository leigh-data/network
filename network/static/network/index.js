document.addEventListener('DOMContentLoaded', (event) => {
  const postCards = document.getElementsByClassName('post-card');
  const profileHeader = document.getElementsByClassName('profile-header')[0]
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

  const followButtonHandler = e => {
    const followButton = e.target;
    const follows = profileHeader.getElementsByClassName('follows')[0];
    const following = profileHeader.getElementsByClassName('following')[0];
    const followingUser = followButton.classList.contains('following-user')
    const username = followButton.dataset.userName;
    const data = JSON.stringify({'following-user': followingUser});

    fetch(`/${username}/`, {
      method: 'POST',
      headers: {
        'X-CSRFToken': csrftoken(),
        'Content-Type': 'application/json;charset=UTF-8',
      },
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        // change classes and styles on success
        follows.innerHTML = `Follows: ${data.follows}`;
        following.innerHTML = `Following: ${data.following}`;
        followButton.classList.toggle('following-user');
        followButton.classList.toggle('btn-danger');
        followButton.classList.toggle('btn-primary');
        
        // Set the button display text based on 'following-user' class
        if (followButton.classList.contains('following-user')) followButton.innerHTML = 'Unfollow';
        else followButton.innerHTML = 'Follow'
      })
      .catch((err) => {
        console.error(err);
      });
  }
  
  // Add event handler for Follow button, if one exists
  if (profileHeader) {
    const followButton = profileHeader.getElementsByClassName('btn')[0];
    if (followButton) followButton.addEventListener('click', followButtonHandler);
  }

  // Add event handlers for the cards
  for(let i = 0; i < postCards.length; i++) {
    let postEditForm = postCards[i].getElementsByTagName('form')[0];
    let editToggleButton = postCards[i].getElementsByClassName('edit-toggle')[0];
    let likeButton = postCards[i].getElementsByClassName('like-button')[0];
    
    // editToggleButton, postEditForm, and likeButton may not exist
    if (editToggleButton) {
      editToggleButton.addEventListener('click', editToggleButtonHandler);
    }

    if (postEditForm) {
      postEditForm.addEventListener('submit', editFormHandler);
    }

    if (likeButton) {
      likeButton.addEventListener('click', likeButtonHandler);
    }
  }
});
