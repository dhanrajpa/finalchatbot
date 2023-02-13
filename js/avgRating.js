const getFeedBackQuestions = async () => {

    let responseFB = await fetch(`http://172.27.94.225:3000/feedback`);
    let responseCat = await fetch(`http://172.27.94.225:3000/category`);

    let data = await responseFB.json()
    let data1 = await responseCat.json()
    let a = []
    let result;

    for (i = 0; i < data1.length; i++) {
        //avg creation 
        let count = 0;
        result =
            data.filter((d) => {
                return d.categoryName == data1[i].name
            })

        total = 0;
        count = result.length;
        result.map((d) => {
            total = total + parseInt(d.rating)
        })

        let avgRate = total / count;
        console.log(result[1]);

        if (result.length) {
            obj = {
                avgRating: parseFloat(avgRate.toFixed(2)),
                catName: result[0].categoryName,
                catId: data1[i].id
            }
            a.push(obj)
        } else {
            console.log("empty category name");
        }
        console.log("total=>", total, "count=>", count, "avg=>", total / count);
    }
    //end Onject creation avg rating



    console.table(a)

    let Div = document.getElementById("Table-Data");
    Div.classList.add("container")
    let table = document.createElement('table')
    table.id = "table";
    table.classList.add("table", "table-striped");
    Div.appendChild(table)

    let tbody = document.createElement("tbody")
    table.appendChild(tbody);

    let row = document.createElement("tr");
    row.classList.add("thead", "table-dark")
    tbody.appendChild(row);

    let head1 = document.createElement("th");
    head1.innerHTML = "Sr .No"
    row.appendChild(head1)

    let head2 = document.createElement("th");
    head2.innerHTML = "Category"
    row.appendChild(head2)

    let head3 = document.createElement("th");
    head3.innerHTML = "Avgerage Rating"
    row.appendChild(head3)



    a.map((data, key) => {

        //table element creation
        let row1 = document.createElement("tr");
        tbody.appendChild(row1)


        let td1 = document.createElement("td");
        td1.innerHTML = `${key + 1}`


        let td2 = document.createElement("td");
        td2.innerHTML = `${data.catName}`

        let td3 = document.createElement("td");
        td3.innerHTML = `${data.avgRating}`

        row1.appendChild(td1)
        row1.appendChild(td2)
        row1.appendChild(td3)








    })




    // return console.log(result);
}

getFeedBackQuestions();

