let delBtn = document.getElementsByClassName('btn');

for(let i = 0; i < delBtn.length; i++){
  delBtn[i].addEventListener('click', function(e) {
    let answer = confirm('Are you sure to delete');

    if(answer){
      let btn = e.target; 
      let id = btn.getAttribute('data-id');
      
      fetch('/delete', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({id: id}),          
      })
      .then(res => res.json())
      .then(json => {
          let row = btn.closest('tr');
          row.style.transition = '0.8s';
          row.style.opacity = 0;
          setTimeout(function() {
            row.remove()
          }, 800)            
      })
      .catch(err => {
        alert('Something went wrong')
      })
    }
  });
}
