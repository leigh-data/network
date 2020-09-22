document.addEventListener('DOMContentLoaded', (event) => {
  const postCards = document.getElementsByClassName('post-card');
  const csrftoken = () => Cookies.get('csrftoken');

  const editFormHandler = e => {
    e.preventDefault();
    
    const form = e.target;
    const postId = form.dataset.postId;
    const editToggle = form.parentNode.parentNode.getElementsByClassName('edit-toggle')[0];
    const displayContent = form.parentNode.parentNode.getElementsByClassName('card-text')[0];
    const content = form.elements.namedItem("content").value;
    const data = JSON.stringify({'content': content});
    
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
      // successful update actions: update display panel and display it
      content.innerHTML = data.content;
      displayContent.innerHTML = data.content;
      editToggle.click();
    })
    .catch((err) => console.log(err));
  };

  const editToggleButtonHandler = e => {
    const card = e.target.parentNode.parentNode;
    const content = card.getElementsByClassName('card-content')[0];
    const form = card.getElementsByClassName('card-form')[0];

    form.classList.toggle('hide');
    content.classList.toggle('hide');
  };
  
  for(let i = 0; i < postCards.length; i++) {
    let postEditForm = postCards[i].getElementsByTagName('form')[0];
    let editToggleButton = postCards[i].getElementsByClassName('edit-toggle')[0];
    
    if (editToggleButton) {
      editToggleButton.addEventListener('click', editToggleButtonHandler);
    }

    if (postEditForm) {
      postEditForm.addEventListener('submit', editFormHandler);
    }
  }
});
