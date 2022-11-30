const getCateg = async () => {
    let response = await fetch(`http://172.27.94.225:3000/category`);
    let category = await response.json();

    let newArr = category.sort((a, b) => {
        if (a.counter > b.counter) return -1;
        return 1;
    });

    let x = ``;

    for (let i = 0; i < 3; i++) {
        x += `<div
        class="col-sm-6 card text-white bg-dark height-200 margin-card-top-bottom"
      >
        <div class="card-header">
        
          <h2>${newArr[i].counter}</h2>
        </div>
        <div class="card-body">
        <h5>${newArr[i].name}</h5>

          
        </div>
      </div>&emsp;`;
    }

    document.getElementById("mydiv11").innerHTML = x;

};
getCateg();

