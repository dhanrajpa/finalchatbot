let d1 = [];
const fetchQuestion = async () => {
  $.getJSON(
    "http://172.27.94.225:3000/NewQueries",

    function (data) {
      var queries = "";
      d1 = data;

      //iterating through objects
      $.each(data, function (key, value) {
        //construction of rows
        //having rows from the json object

        queries += "<tbody><tr>";
        queries += "<td>" + (key + 1) + "</td>";
        queries += "<td>" + value.categoryName + "</td>";
        queries += "<td>" + value.query + "</td>";
        queries += "<td>" + value.email + "</td>";
        queries += "<td>" + value.status + "</td>";

        if (value.status != "Resolved") {
          queries +=
            '<td><div class="btn-group dropright"><button class="btn btn-outline-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">Select Action</button><ul class="dropdown-menu " aria-labelledby="dropdownMenuButton1"><li><button type="button" class="btn btn-link text-dark text-decoration-none btn-sm" onclick="Progress(this)" value=' +
            key +
            ' data-bs-toggle="modal" data-bs-target="#myModal2"> <b>In Process</b></button></li><li><button type="button" class="btn btn-link text-dark text-decoration-none btn-sm" onclick="Ongoing(this)" value=' +
            key +
            '  data-bs-toggle="modal" data-bs-target="#myModal2"><b>Resolved</b></button></li><li><button type="button"  class="btn btn-link text-dark text-decoration-none btn-sm" onclick="deleteQuery(this)" value=' +
            key +
            "><b>Delete</b></button></li></ul></div></td>";
        }
      });
      //inserting rows into the table
      $("#table1").append(queries);
    }
  );
};

$(document).ready(function () {
  //fetching data from json file
  fetchQuestion();
  $("");
});

//delete functionality

async function deleteQuery(it) {
  let text = "Are Your sure want to delete this Query?";
  if (!confirm(text)) {
    return;
  } else {
    const i = it.value;

    id = d1[i].id;
    await $.ajax({
      url: `http://172.27.94.225:3000/NewQueries/${id}`,
      type: "DELETE",
      success: function () {
        $("td").remove();
        alert("Status Updated");
      },
      error: function () {
        alert("Status Updated Failed");
      },
    });
  }
  await fetchQuestion();
}

async function Progress(it) {
  const status = "In Progress";
  const message = "Are Your sure want to change status to in Progress?";
  if (!confirm(message)) {
    return;
  } else {
    const i = it.value;
    id = d1[i].id;
    query = d1[i].query;
    userEmail = d1[i].email;
    await $.ajax({
      url: `http://172.27.94.225:3000/NewQueries/${id}`,
      type: "PUT",
      dataType: "JSON",
      data: {
        query: query,
        email: userEmail,
        status: status,
      },
      success: function (result) {
        $("td").remove();
        alert("status Updated");
      },
      error: function () {
        alert("Status Update Failed");
      },
    });
  }
  await fetchQuestion();
}

async function Ongoing(it) {
  const status = "Resolved";
  const message = "Are Your sure want to change status to Resolved?";
  if (!confirm(message)) {
    return;
  } else {
    const i = it.value;
    id = d1[i].id;
    query = d1[i].query;
    userEmail = d1[i].email;
    await $.ajax({
      url: `http://172.27.94.225:3000/NewQueries/${id}`,
      type: "PUT",
      dataType: "JSON",
      data: {
        query: query,
        email: userEmail,
        status: status,
      },
      success: function (result) {
        $("td").remove();
        alert("status Updated");
      },
      error: function () {
        alert("Status Update Failed");
      },
    });
  }
  await fetchQuestion();
}
