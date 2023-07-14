function addComp(token) {
    document.getElementById("right_pan").submit();
  }
  const addBtn = document.getElementById('add_cmp_btn');
  const delBtns = [...document.getElementsByClassName('badge btn btn-danger rounded-pill')];
  const delLength = delBtns.length;

  for(i=0; i < delLength; i++){
  delBtns[i].style.display = 'none';
  }
  
  addBtn.addEventListener('click', function() {
    if (delBtns[0].style.display === 'none') {
        for(i=0; i < delLength; i++){
            delBtns[i].style.display = 'block';
        }
    } else {
        for(i=0; i < delLength; i++){
            delBtns[i].style.display = 'none';
        }
    }
  });