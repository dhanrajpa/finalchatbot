const getFeedBackQuestions = async () => {

    let responseFB = await fetch(`http://172.27.94.225:3000/feedback`);
    let responseCat = await fetch(`http://172.27.94.225:3000/category`);

    let data = await responseFB.json()
    let data1 = await responseCat.json()
    let a = []
    let result;

    for (i = 0; i < data1.length; i++) {
        //avg creation 
        let count = 0

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

    


    // return console.log(result);
}

getFeedBackQuestions();

