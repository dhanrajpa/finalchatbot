let d = [];
var categoryId = 0;
$(document).ready(function () {

    categoryId = location.search.split('id=')[1];

    $("#add-question").click(function () {
        const question = $("#question").val();
        const answer = $("#answer").val();
        if (!(question && answer))
            return;

        const data =
        {
            categoryId: categoryId,
            question: question,
            answer: answer,
            counter: 0
        }

        $.post("http://172.27.94.225:3000/queries",
            data,
            function (data, status) {

                $("#myModal").modal("hide");
                $('td').remove();
                getAllQueries(categoryId)
            });
    });


    getAllQueries(categoryId)

});

function getAllQueries() {
    // FETCHING DATA FROM JSON FILE
    $.getJSON("http://172.27.94.225:3000/queries",
        function (data) {
            d = data;
            var queries = '';
            let index = 0;
            // ITERATING THROUGH OBJECTS
            $.each(data, function (key, value) {

                //CONSTRUCTION OF ROWS HAVING
                // DATA FROM JSON OBJECT

                if (value.categoryId == categoryId) {

                    queries += '<tr>';
                    queries += '<td>' +
                        (++index) + '</td>';

                    queries += '<td><b>' + value.question + '</b><br/><b>Ans</b>: ' + value.answer + '<br/><br/></td>';
                    queries += '<td><div class="dropdown dropstart"><button class="btn btn-outline-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">Select Action</button><ul class="dropdown-menu " aria-labelledby="dropdownMenuButton1"><li><button type="button" class="btn btn-link text-dark text-decoration-none btn-sm" onclick="updateQuestion(this)" value=' + key + ' data-bs-toggle="modal" data-bs-target="#myModal2"> <b>Change Question</b></button></li><li><button type="button" class="btn btn-link text-dark text-decoration-none btn-sm" onclick="updateAnswer(this)" value=' + key + '  data-bs-toggle="modal" data-bs-target="#myModal2"><b>Change Answer</b></button></li><li><button type="button"  class="btn btn-link text-dark text-decoration-none btn-sm" onclick="deleteQuestion(this)" value=' + key + '><b>Delete Question</b></button></li></ul></div></td>';


                    queries += '</tr><br/>';

                }
            });

            //INSERTING ROWS INTO TABLE 
            $('#table').append(queries);
        });

}
function deleteQuestion(it) {

    let text = "Are Your sure want to delete this category?";
    if (!confirm(text)) {
        return
    } else {
        const i = it.value;
        id = d[i].id;
        $.ajax({
            url: `http://172.27.94.225:3000/queries/${id}`,
            type: 'DELETE',
            success: function (result) {
                $("td").remove();
                getAllQueries(categoryId)

            }
        });
    }
}



function updateQuestion(it) {
    $("#change").text("Change Question");
    const i = it.value;
    $("#input2").empty();
    $("#input2").append(d[i].question);
    $("#savebtn2").click(function () {
        const question = $("#input2").val();

        var data = {
            id: d[i].id,
            categoryId: d[i].categoryId,
            question: question,
            answer: d[i].answer,
            counter: d[i].counter
        }


        $.ajax({
            url: `http://172.27.94.225:3000/queries/${data.id}`,
            type: 'PUT',
            data: data,
            success: function (result) {
                window.location.reload();
            }
        });
    });
}


function updateAnswer(it) {
    $("#change").text("Change Answer");
    const i = it.value;
    $("#input2").empty();
    $("#input2").append(d[i].answer);
    $("#savebtn2").click(function () {
        const answer = $("#input2").val();

        var data = {
            id: d[i].id,
            categoryId: d[i].categoryId,
            question: d[i].question,
            answer: answer,
            counter: d[i].counter
        }

        $.ajax({
            url: `http://172.27.94.225:3000/queries/${data.id}`,
            type: 'PUT',
            data: data,
            success: function (result) {
                window.location.reload();
            }
        });
    });
}