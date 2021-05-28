// const open = document.getElementById('getPopUpOne');
// const model_container = document.getElementById('modal-dialog');

// open.addEventListener('click',()=>{
//   model_container.classList.add('show');
// })

const toggleModal = () => {
  document.querySelector('.modalRes').classList.toggle('modalRes--hidden');
};

document.querySelector('#show-modal').addEventListener('click',toggleModal);