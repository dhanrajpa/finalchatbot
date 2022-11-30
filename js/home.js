let d1 = [];
const fetchQuetion = async () => {

  console.log("fetch queries");
  $.getJSON(
    "http://172.27.94.225:3000/NewQueries",

    function (data) {
      var queries = "";
      d1 = data;
      console.log(d1);
      //iterating through objects
      $.each(data, function (key, value) {
        //construction of rows
        //having rows from the json object
        console.log(value);
        queries += "<tbody><tr>";
        queries += "<td>" + (key + 1) + "</td>";
        queries += "<td>" + value.query + "</td>";
        queries += "<td>" + value.email + "</td>";
        queries +=
          "<td>" +
          '<button type="button" id="btn"  class="btn btn-danger ml-4" onclick="deleteQuery(this)" value=' +
          key +
          ">Delete</button>" +
          "</td>";
        queries += "<tr></tbody>";
      });
      //inserting rows into the table
      $("#table1").append(queries);
    }
  );
};

$(document).ready(function () {
  //fetching data from json file
  fetchQuetion();
});

//delete functionality

async function deleteQuery(it) {
  let text = "Are Your sure want to delete this Query?";
  if (!confirm(text)) {
    return;
  } else {
    const i = it.value;
    console.log(i);
    id = d1[i].id;
    await $.ajax({
      url: `http://172.27.94.225:3000/NewQueries/${id}`,
      type: "DELETE",
      success: function (result) {

        $("td").remove();
      },
    });
  }
  await fetchQuetion();
}

