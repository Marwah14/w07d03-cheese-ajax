$(document).ready(()=>{
  console.log('JQ Connected!');

  // fetchCheeses function
  // GET http://localhost:3000/cheeses
  const fetchCheeses = () => {
    const url = 'http://localhost:3000/cheeses';
    fetch(url)
      .then(response => response.json())
      .then(data => handleCheeseData(data))
      .catch(error => console.log(error))
  }

  // handle cheese data
  const handleCheeseData = (data) =>{
    data.forEach(renderCheese)
  }

  // render cheese
  // create div (container)
  // create h2 - name
  // create p - origin, color, stink level
  // append to cheese-list

  const renderCheese = (cheese) =>{
    const $container = $('<div>').appendTo($('.cheese-list'));
    const $h2 = $('<h2>').text(cheese.name).appendTo($container);
    const $origin = $('<p>').text(cheese.origin).appendTo($container);
    const $color = $('<p>').text(cheese.color).appendTo($container);
    const $stink = $('<p>').text(cheese.stink_level).appendTo($container);
    const $delete = $('<button>').text('Delete').appendTo($container);
    $delete.click(()=> deleteCheese(cheese.id));

    const $edit = $('<button>').text('Edit').appendTo($container)
    $edit.click(()=>{ renderEdit(cheese) });

  }

  fetchCheeses();


  // create function that has a parameter of a cheese's id
  // that will make a DELETE request to 'http://localhost:3000/cheeses/:id
  const deleteCheese = (id) => {
    const url = `http://localhost:3000/cheeses/${id}`
    fetch(url, {
      method: 'DELETE',
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(response => response.json())
    .then(data => {
      $('.cheese-list').empty();
      fetchCheeses();
    })
    .catch(error => console.log(error))
  }

  //create function called renderNew that hides the 
  // cheese list and shows the `.new-cheese` form

  const renderNew = () => {
    $('.cheese-list').hide();
    $('.new-cheese').show();
  }

  const renderCheeses = () => {
    $('.cheese-list').show();
    $('.new-cheese').hide();
  }

  $('#showNew').click(renderNew);
  $('#showList').click(renderCheeses);

  // on click of #create-cheese button
  // get values of inputs
  // make a fetch request to POST 'http://localhost:3000/cheeses'
  // with a body containing the values gotten from those inputs

  const newCheeseInputs = () => {
    return {
      name: $('#name').val(),
      origin: $('#origin').val(),
      color: $('#color').val(),
      stink_level: $('#stink_level').val()
    }
  }

  const createCheese = () => {
    const url = 'http://localhost:3000/cheeses';
    const cheese = newCheeseInputs();
    console.log(cheese)

    fetch(url, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(cheese)
    })
    .then(response => response.json())
    .then(data => {
      renderCheese(data);
      renderCheeses();
    })
    .catch(error => console.log(error))

  }

  $('#create-cheese').click(createCheese);

  // make a function that takes a cheese as its parameter
  // that sets the values of #name_edit, #origin_edit #color_edit 
  // #stink_level_edit based off of the given cheese. Then hide
  // the list of cheeses and show the .edit-cheese div

  const renderEdit = (cheese) => {
    $('#name_edit').val(cheese.name);
    $('#origin_edit').val(cheese.origin);
    $('#color_edit').val(cheese.color);
    $('#stink_level_edit').val(cheese.stink_level);
    $('.cheese-list').hide();
    $('.edit-cheese').show();
    $('#edit-cheese').off().click(()=>{
      editCheese(cheese);
    })
  }

  // create a function that will return an object with each
  // of the edit input values

  const editCheeseInputs = () => {
    return {
      name: $('#name_edit').val(),
      origin: $('#origin_edit').val(),
      color: $('#color_edit').val(),
      stink_level: $('#stink_level_edit').val()
    }
  }

  // create a function that takes a cheese as its parameter
  // and takes the edit cheese input values and makes a PUT
  // request to 'http://localhost:3000/cheeses/:id' with a body
  // of the cheese input values

  const editCheese = (cheese) => {
    const url = `http://localhost:3000/cheeses/${cheese.id}`;
    const cheeseInputs = editCheeseInputs();

    fetch(url, {
      method: 'PUT',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(cheeseInputs)
    })
    .then(response => response.json())
    .then(data => {
      $('.cheese-list').empty().show();
      $('.edit-cheese').hide();
      fetchCheeses();
    })
    .catch(error => console.log(error))
  }

})