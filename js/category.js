let d = [];
$(document).ready(function () {


  $("#add-category").click(function () {
    const categoryName = $("#category-name").val();

    if (!(categoryName))
      return;

    var data =
    {
      name: categoryName,
      counter: 0
    }


    $.post("http://172.27.94.225:3000/category",
      data,
      function (data, status) {

        $('#category').modal("hide");
        $('td').remove();
        getAllCategory();
      });
  });
  getAllCategory();
  // FETCHING DATA FROM JSON FILE


});
function getAllCategory() {
  // alert("hiiii")
  $.getJSON("http://172.27.94.225:3000/category",
    function (data) {
      d = data;
      var category = '';

      // ITERATING THROUGH OBJECTS
      $.each(data, function (key, value) {

        //CONSTRUCTION OF ROWS HAVING
        // DATA FROM JSON OBJECT

        let index = key + 1;
        category += '<tr id=' + key + ' >';
        category += '<td >' +
          index + '</td>';

        category += '<td><a href="./queries.html?id=' + value.id + '" class="text-decoration-none"  id="text">' +
          value.name + '</a></td>';

        // category += '<td><a href="./index.html/'+value.id+'"><button type="button" class="btn btn-warning">Update</button></a></td>';
        category += '<td > <button type="button"  class="btn btn-outline-dark" data-bs-toggle="modal" data-bs-target="#myModal" onclick="updateCategory(this)" value=' +
          key + '>Change Name</button></td>';


        category += '<td><button type="button"  class="btn btn-outline-danger" onclick="deleteCategory(this)" value=' +
          key + '>Delete</button></td>';

        category += '</tr>';
      });

      //INSERTING ROWS INTO TABLE 
      $('td').remove();
      $('#table').append(category);
      category = '';

    });
}


function deleteCategory(it) {
  let text = "Are Your sure want to delete this category?";
  if (!confirm(text)) {
    return;
  } else {
    const i = it.value;
    id = d[i].id;
    deleteQueries(id)// required to delete queries

    $.ajax({
      url: `http://172.27.94.225:3000/category/${id}`,
      type: 'DELETE',
      success: function (result) {
        $('td').remove();
        getAllCategory()

      }
    });

  }
}

function deleteQueries(categoryId) {
  $.getJSON("http://172.27.94.225:3000/queries?categoryId=" + categoryId,
    function (data) {
      $.each(data, function (key, value) {
        $.ajax({
          url: `http://172.27.94.225:3000/queries/${value.id}`,
          type: 'DELETE',
          success: function (result) {

          }
        });

      });

    })



}

function updateCategory(it) {

  const i = it.value;

  $("#input").attr("value", d[i].name);

  $("#savebtn").click(function () {
    const categoryName = $("#input").val();


    var data = {
      name: categoryName

    }

    $.ajax({
      url: `http://172.27.94.225:3000/category/${d[i].id}`,
      type: 'PATCH',
      data: data,
      success: function (result) {
        console.log(result);
        window.location.reload();

      }
    });
  });
}

