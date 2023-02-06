/**
 * Todo 
 * @param {counter} store count  
 * @param {categoryId} category id  
 * *API's created 
 */
let jsondata = "";
let category = "";
let arrayName // url api array name stored

let catId;
let CatQuestId;

let cat_questions;
let email;
let query;
let FeedbackRating;
let botBox = document.getElementById("Bot-Box")
let answer_list = document.getElementById("answer")
let reply_list = document.getElementById('cat-reply');
let question_list = document.getElementById('question-list');
let categories_List = document.getElementById('categories-list');

//url

let fetch_Category = "http://172.27.94.225:3000/category"
let FeedBackUrl = `http://172.27.94.225:3000/feedback`
let newQuery = "http://172.27.94.225:3000/NewQueries"

//scroll to bottom
const scrollToBottom = (elem) => {
    let el = document.querySelector(elem);
    el.scrollTop = el.scrollHeight;

}
const scrollToTop = (elem) => {
    // elem.scrollIntoView()
    let el = document.querySelector(elem);
    // el.scrollToBottom = el.scrollHeight;
    el.style.scroll = ` top: 0 `
    el.scrollTop = 0;
    console.log("scroll top invoked");
}


// get categories
const getCateg = async (url) => {
    let response = await fetch(url);
    let data = await response.json()
    return data;
}

// get questions 
const getCatQuestions = async (id) => {
    let response = await fetch(`http://172.27.94.225:3000/queries?categoryId=${id}`);
    let data = await response.json()
    return data;
}
//end

//counter Cat and queries  API

const getCounter = async (arrayName, id) => {
    let response = await fetch(`http://172.27.94.225:3000/${arrayName}/${id}`);
    let data = await response.json();
    let count = data['counter'];
    return count;
}

const addCounter = async (id, arrayName) => {
    // console.log(arrayName);
    let url = `http://172.27.94.225:3000/${arrayName}/${id}`

    let count = await getCounter(arrayName, id)
    let counter = Number(count);
    counter++;

    const postData = {
        counter: counter.toString(),
    };

    // console.log(JSON.stringify(postData));
    // Post Query API
    await fetch(url,
        {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(postData)
        })
    // const data = await res.json(); 1
}

const showMoreCat = (e) => {
    const hiddenItems = document.querySelectorAll('.hidden-item');
    hiddenItems.forEach(item => item.classList.toggle('hidden'));
    e.target.onclick = false;

    document.querySelector(".show-more-button").remove();
}

//getFeedback
const getFeedBack = async () => {
    let response = await fetch(`http://172.27.94.225:3000/feedback/1`);
    let data = await response.json();
    let rate = data['rating'];
    return rate;
}

//end
async function createFeedbackElem(answerText) {
    let newCat = document.createElement("a");
    newCat.href = "#";
    newCat.classList.add("list-group-item", "list-group-item-action", "answer-list-item");
    newCat.id = `answer - item - ${CatQuestId}`;
    newCat.innerHTML = `${answerText}`;
    newCat.setAttribute('data-id', `${CatQuestId}`);

    let ansDiv1 = document.createElement("div");
    ansDiv1.classList.add("list-group", "row", "answer-list");
    ansDiv1.id = "answer";
    ansDiv1.id = "question-list";
    ansDiv1.appendChild(newCat);

    let ansDiv2 = document.createElement("div");
    ansDiv2.appendChild(ansDiv1)

    let ansDiv3 = document.createElement("div");
    ansDiv3.classList.add("chatbox__messages");
    ansDiv3.appendChild(ansDiv2)

    botBox.appendChild(ansDiv3)

    // selectMenu()

    // answerTag();
}

//feedback'
const submitFeedback = async (e) => {
    let empIdValue = document.getElementById("queryText");
    //get rating value
    let eId = empIdValue.value;
    // console.log("empID", eId);
    // console.log("value of star", FeedbackRating);
    //get stored rating
    //check type
    // console.log("type check");

    const postRate = {
        rating: FeedbackRating.toString(),
        empId: eId.toString()
    };

    // Post Query API
    await fetch(FeedBackUrl,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(postRate)
        })
    // console.log("feedBack Submitted");

    //remove feedback elements

    let remEl = document.getElementById("feedback__elem");
    remEl.remove();

    createFeedbackElem("Thanks for sharing your feedback")
    createCatList();
}

const tagEmpIdFb = () => {
    let div = document.createElement("div");
    div.classList.add("messages__item--operator");
    div.id = "tag-questions";
    div.innerHTML = "Kindly Share yout Employee Id ";

    let messageItem = document.createElement("div");
    messageItem.id = "tag-item";
    messageItem.appendChild(div);

    let message = document.createElement("div");
    message.classList.add("message");
    message.id = "query-msg-tag"
    message.appendChild(messageItem);
    let mainDiv = document.getElementById("feedback__elem");
    mainDiv.appendChild(message);
}

const removeElemFb = (e) => {
    let rate = parseInt(e.target.value)
    FeedbackRating = rate;
    //remove feedback elem
    let rem1 = document.getElementById("query-msg-tag");
    rem1.remove();
    let rem2 = document.getElementById("rate-Div");
    rem2.remove();
    //endRemove
    tagEmpIdFb();
    //Input for EmpID

    let mainDiv = document.getElementById("feedback__elem");
    //create input Element

    let div = document.createElement("div");
    div.classList.add("chatbox__footer");
    div.id = "write-empID";
    botBox.appendChild(div);

    let input = document.createElement("input");
    input.id = "queryText";
    input.required = true;
    input.setAttribute("type", "text");

    input.setAttribute("placeholder", "Provide Employee Id");

    let btn_Query = document.createElement("button");
    btn_Query.classList.add("btn", "btn-lg", "btn-block");
    btn_Query.setAttribute("type", "button");
    btn_Query.id = "next-btn";
    btn_Query.innerHTML = "send";
    div.appendChild(input);

    btn_Query.onclick = submitFeedback
    let cancelDiv = document.createElement('div');
    cancelDiv.id = "cancelDiv";
    cancelDiv.appendChild(btn_Query);
    div.appendChild(cancelDiv);
    mainDiv.appendChild(div)
    //endInput
    scrollToBottom('.Chat-container');

    //end
    // console.log("feedback element remove");
}

const feedBack = () => {
    let feedBackDiv = document.createElement("div")
    feedBackDiv.id = "feedback__elem"
    //feedback msg
    let div = document.createElement("div");
    div.classList.add("messages__item--operator");
    div.id = "feedback-tag";
    div.innerHTML = "Kindly share your feedback";

    let messageItem = document.createElement("div");
    messageItem.id = "tag-item";
    messageItem.appendChild(div);

    let message = document.createElement("div");
    message.classList.add("message");
    message.id = "query-msg-tag"
    message.appendChild(messageItem);
    //end

    feedBackDiv.appendChild(message);

    // feedBackDiv.classList.add("rate")
    let rateDiv = document.createElement("div")
    feedBackDiv.appendChild(rateDiv);
    rateDiv.classList.add("rate-Div")
    rateDiv.id = "rate-Div"

    let rateDiv1 = document.createElement("div")
    rateDiv1.classList.add("rate")
    rateDiv.appendChild(rateDiv1)

    for (i = 5; i >= 1; i--) {
        //input creation
        let inputFb = document.createElement("input")
        inputFb.setAttribute('type', 'radio');
        inputFb.id = `star${i}`
        inputFb.setAttribute('name', 'rate');
        inputFb.onclick = removeElemFb
        inputFb.value = `${i}`

        // label creation
        let labelFb = document.createElement("label")
        labelFb.setAttribute('for', `star${i}`);
        labelFb.setAttribute('title', "text");
        labelFb.innerHTML = `${i} star`
        rateDiv1.appendChild(inputFb)
        rateDiv1.appendChild(labelFb)
    }

    botBox.appendChild(feedBackDiv);
    scrollToBottom('.Chat-container');

}
//end
//create category list
const createCatList = async () => {

    category = await getCateg(fetch_Category)
    catTag()

    //category sort on counter
    // category.sort((a, b) => parseInt(b.counter) - parseInt(a.counter));
    category.sort((a, b) => a.name.localeCompare(b.name)) //sorted on basis of alphabetical order
    let catDiv1 = document.createElement("div");
    catDiv1.id = "categories-list";
    catDiv1.classList.add("list-group", "row", "categories-list");

    let count = 0

    category.map((cat) => {

        let newCat = document.createElement("a");
        newCat.href = "#";

        if (count < 4) {
            newCat.classList.add("list-group-item", "list-group-item-action", "categories-list-item");
        } else {
            newCat.classList.add("list-group-item", "list-group-item-action", "categories-list-item", "hidden-item", "hidden");
        }

        count = count + 1;
        newCat.id = `cat - item - ${cat.id}`;
        newCat.innerHTML = `${cat.name}`;
        newCat.onclick = anchorPressed
        newCat.setAttribute('data-id', `${cat.id}`);
        catDiv1.appendChild(newCat);
    })

    let showMore = document.createElement("a");
    showMore.classList.add("show-more-button", "list-group-item", "list-group-item-action", "categories-list-item");
    showMore.innerHTML = "Show More"
    showMore.href = "#";
    showMore.onclick = showMoreCat
    catDiv1.appendChild(showMore);


    let catDiv2 = document.createElement("div");
    catDiv2.appendChild(catDiv1);

    let catDiv3 = document.createElement("div");
    catDiv3.classList.add("chatbox__messages");
    catDiv3.id = "cat";
    catDiv3.appendChild(catDiv2);
    botBox.appendChild(catDiv3)
    scrollToBottom('.Chat-container');

}
//scroll on top of category

const scrollToTopCat = () => {
    let icon = document.createElement("img");
    icon.id = "icon-detail-preview";
    icon.style.width = "20px";
    let path = "../../images/scrollTOpIcon.png"
    icon.setAttribute("src", path);

    icon.onclick = (e) => {
        console.log("scroll Top");
        let div = document.getElementById("categories-list");
        div.scrollIntoView();
        e.target.onclick = false;
        document.getElementById("scrollTopDiv").remove()
    }

    icon.style.cursor = "pointer";
    let iconDiv = document.createElement("div");
    iconDiv.id = "scrollTopDiv"
    iconDiv.appendChild(icon)

    botBox.appendChild(iconDiv);

    scrollToBottom(".Chat-container")
    console.log("into scroll top category");
}

//question list 

async function createCatQuesList(cat_question) {
    questionTag();

    let questDiv1 = document.createElement("div");
    questDiv1.classList.add("list-group", "row", "questions-list");
    questDiv1.id = "question-list";
    let countQuesElem = 0

    cat_question.map((cat) => {
        let newCat = document.createElement("a");
        newCat.href = "#";

        if (countQuesElem < 4) {
            newCat.classList.add("list-group-item", "list-group-item-action", "question-list-item");
        } else {
            newCat.classList.add("list-group-item", "list-group-item-action", "question-list-item", "hidden-item", "hidden");
        }
        countQuesElem = countQuesElem + 1;
        newCat.id = `question - item - ${cat.id}`;
        newCat.innerHTML = `${cat.question}`;
        newCat.onclick = answerList;
        newCat.setAttribute('data-id', `${cat.id}`);
        questDiv1.appendChild(newCat);
    })

    let showMore = document.createElement("a");
    showMore.classList.add("show-more-button", "list-group-item", "list-group-item-action", "question-list-item");
    showMore.innerHTML = "+more"
    showMore.href = "#";
    showMore.onclick = showMoreCat
    questDiv1.appendChild(showMore);

    // write query 
    let queryElem = document.createElement("a");
    queryElem.href = "#";
    queryElem.classList.add("list-group-item", "list-group-item-action", "question-list-item");
    queryElem.id = `cat-query-add`;
    queryElem.innerHTML = `Add your query`;
    questDiv1.appendChild(queryElem);

    queryElem.onclick = (e) => {
        let txt = document.getElementById("cat-query-add");
        if (txt) {
            let txtValue = txt.innerHTML;
            replyElem(txtValue);
        }
        queryWrite(e);
    }
    //end

    let questDiv2 = document.createElement("div");
    questDiv2.appendChild(questDiv1)

    let questDiv3 = document.createElement("div");
    questDiv3.classList.add("chatbox__messages");
    questDiv3.appendChild(questDiv2)
    botBox.appendChild(questDiv3)
    scrollToBottom('.Chat-container');

    scrollToTopCat()
}

//Answer Element
async function createAnswerElem(answerText) {
    arrayName = `queries`
    addCounter(CatQuestId, arrayName);
    let newCat = document.createElement("a");
    newCat.href = "#";
    newCat.classList.add("list-group-item", "list-group-item-action", "answer-list-item");
    newCat.id = `answer - item - ${CatQuestId}`;
    newCat.innerHTML = `${answerText}`;
    newCat.setAttribute('data-id', `${CatQuestId}`);

    let ansDiv1 = document.createElement("div");
    ansDiv1.classList.add("list-group", "row", "answer-list");
    ansDiv1.id = "answer";
    ansDiv1.id = "question-list";
    ansDiv1.appendChild(newCat);

    let ansDiv2 = document.createElement("div");
    ansDiv2.appendChild(ansDiv1)

    let ansDiv3 = document.createElement("div");
    ansDiv3.classList.add("chatbox__messages");
    ansDiv3.appendChild(ansDiv2)

    botBox.appendChild(ansDiv3)

    // selectMenu()

    answerTag();
}

//query Post Feedback
const LastMessage = () => {

    let newCat = document.createElement("a");
    newCat.href = "#";
    newCat.innerHTML = "Thanks for writing to us. We will get back to you , In case if your query doesn't get answered please reach out to rheav@cybage.com";
    newCat.classList.add("list-group-item", "list-group-item-action", "resp-list-item");

    let div = document.createElement("div");
    div.id = "tag-questions";

    let messageItem = document.createElement("div");
    messageItem.id = "tag-item";
    div.appendChild(newCat)
    messageItem.appendChild(div);

    let message = document.createElement("div");
    message.classList.add("message");
    message.id = "last-msg-tag"
    message.appendChild(messageItem);
    botBox.appendChild(message);
    feedBack()
    // createCatList()
}

const postQuery = async (e) => {
    e.preventDefault();
    email = document.getElementById("queryText").value;
    let errorQuery = document.createElement("span");
    errorQuery.classList.add("error");
    errorQuery.id = "errorBody"
    let errorMsg = document.createElement("p");
    errorMsg.id = 'query_error'
    errorMsg.innerHTML = "Enter your email";
    //append error child 
    //end

    document.getElementById("queryText").after(errorQuery) // append element tag

    let check = email === "";

    if (!check) {

        // console.log("into send function if ");

        const postData = {
            query: query,
            email: email,
            status: "New"
        };
        // Post Query API
        // const res =
        await fetch(newQuery,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(postData)
            })
        // const data = await res.json(); 2

        e.target.onclick = false;

        let remQueryBox1 = document.getElementById("query-msg-tag")
        remQueryBox1.remove()
        let remQueryBox2 = document.getElementById("write-query")
        remQueryBox2.remove()
        email = "";

        LastMessage();

    }

}

const cancel = (e) => {

    document.getElementById("query-msg-tag").remove();
    document.getElementById("write-query").remove();
    createCatList();
}

const queryWrite = (e) => {
    // remove feedback

    queryTag();

    let feedBack = document.getElementById("feedback-mesg")
    if (feedBack) {
        feedBack.remove();
    }

    let div = document.createElement("div");
    div.classList.add("chatbox__footer");
    div.id = "write-query";
    botBox.appendChild(div);

    let input = document.createElement("input");
    input.id = "queryText";
    input.required = true;
    input.setAttribute("type", "text");

    input.setAttribute("placeholder", "write your query");

    let btn_Query = document.createElement("button");
    btn_Query.classList.add("btn", "btn-lg", "btn-block");
    btn_Query.setAttribute("type", "button");
    btn_Query.id = "next-btn"
    btn_Query.innerHTML = "next";
    div.appendChild(input);

    let cancelDiv = document.createElement('div');

    let cancelBtn = document.createElement("button");
    cancelBtn.classList.add("btn", "btn-lg", "btn-block");
    cancelBtn.setAttribute("type", "button");
    cancelDiv.id = "cancelDiv";
    cancelBtn.innerHTML = "cancel";
    cancelDiv.appendChild(btn_Query);
    cancelDiv.appendChild(cancelBtn);
    div.appendChild(cancelDiv);

    e.target.onclick = false;

    btn_Query.onclick = () => {
        // error message
        let errorQuery = document.createElement("span");
        errorQuery.classList.add("error");
        errorQuery.id = "errorBody"
        let errorMsg = document.createElement("p");
        errorMsg.id = 'query_error'
        errorMsg.innerHTML = "Enter your query";
        //append error child 
        //end
        let input = document.getElementById("queryText");

        input.after(errorQuery) // append element tag

        query = input.value;
        let check = query === ""
        if (!check) {
            input.value = ""


            let btnDel = document.getElementById("next-btn");
            btnDel.remove();
            input.setAttribute("placeholder", "add your email");

            let send = document.createElement("button");
            send.classList.add("btn", "btn-lg", "btn-block");
            send.setAttribute("type", "button");
            send.innerHTML = "send";
            send.onclick = postQuery;
            cancelDiv.appendChild(send);
            scrollToBottom('.Chat-container');
        }

    }

    cancelBtn.onclick = cancel
    scrollToBottom('.Chat-container');

}

const feedbackMenu = async () => {
    //create menu button 
    let data = goToMenu();
    let feedback_no_query = document.createElement("button");
    feedback_no_query.classList.add("btn", "btn-primary", "btn-sm", "btn");
    feedback_no_query.id = `feedback - btn - query`;
    feedback_no_query.innerHTML = "send us Query";
    data.appendChild(feedback_no_query);

    feedback_no_query.onclick = queryWrite;
    scrollToBottom('.Chat-container');
}
//end

// create tag elements
const questionTag = () => {
    let div = document.createElement("div");
    div.classList.add("messages__item--operator");
    div.id = "tag-questions";
    div.innerHTML = "Select from below Query";

    let messageItem = document.createElement("div");
    messageItem.id = "tag-item";
    messageItem.appendChild(div);

    let message = document.createElement("div");
    message.classList.add("message");
    message.appendChild(messageItem);

    botBox.appendChild(message);
}

const queryTag = () => {
    let div = document.createElement("div");
    div.classList.add("messages__item--operator");
    div.id = "tag-questions";
    div.innerHTML = "Write your query to us";

    let messageItem = document.createElement("div");
    messageItem.id = "tag-item";
    messageItem.appendChild(div);

    let message = document.createElement("div");
    message.classList.add("message");
    message.id = "query-msg-tag"
    message.appendChild(messageItem);

    botBox.appendChild(message);
}

const catTag = () => {
    let div = document.createElement("div");
    div.classList.add("messages__item--operator");
    div.id = "tag-questions";
    div.innerHTML = "Please choose your query from below Category";

    let messageItem = document.createElement("div");
    messageItem.id = "tag-item";
    messageItem.appendChild(div);

    let message = document.createElement("div");
    message.classList.add("message");
    message.appendChild(messageItem);

    botBox.appendChild(message);
}

const goToMenu = () => {

    let feedback_no_menu = document.createElement("button");
    feedback_no_menu.classList.add("btn", "btn-primary", "btn-sm", "btn");
    feedback_no_menu.id = `feedback - btn - select - menu`;
    feedback_no_menu.innerHTML = "Go to Menu";

    let div2 = document.createElement("div");
    div2.classList.add("feedback");
    div2.id = "feedback-btn";
    div2.appendChild(feedback_no_menu);

    //reused 1
    let messageItem = document.createElement("div");
    messageItem.id = "tag-item";

    messageItem.appendChild(div2);

    let message = document.createElement("div");
    message.classList.add("message");
    message.id = "feedback-mesg";
    message.appendChild(messageItem);
    botBox.appendChild(message);
    //reused end 1

    feedback_no_menu.onclick = () => {
        let feedBack = document.getElementById("feedback-mesg")
        feedBack.remove()
        createCatList();
    }

    return div2;
}

const answerTag = () => {

    let div1 = document.createElement("div");
    div1.classList.add("messages__item--operator");
    div1.id = "tag-feedback";
    div1.innerHTML = "Is Query resolved?";

    let div2 = document.createElement("div");
    div2.classList.add("feedback");
    div2.id = "feedback-btn";

    let feedback_btn_yes = document.createElement("button");
    feedback_btn_yes.classList.add("btn", "btn-primary", "btn-sm", "btn");
    feedback_btn_yes.id = `feedback - btn - yes`
    feedback_btn_yes.innerHTML = "yes";

    let feedback_btn_No = document.createElement("button");
    feedback_btn_No.classList.add("btn", "btn-primary", "btn-sm", "btn");
    feedback_btn_No.id = `feedback - btn - No`;
    feedback_btn_No.innerHTML = "No";
    div2.appendChild(feedback_btn_yes);
    div2.appendChild(feedback_btn_No);

    //reused 1
    let messageItem = document.createElement("div");
    messageItem.id = "tag-item";

    messageItem.appendChild(div1);
    messageItem.appendChild(div2);

    let message = document.createElement("div");
    message.classList.add("message");
    message.id = "feedback-mesg";
    message.appendChild(messageItem);

    botBox.appendChild(message);
    // end 1 

    feedback_btn_yes.onclick = (e) => {

        let menuRemove = document.getElementById("feedback-mesg");
        menuRemove.remove();
        replyElem(feedback_btn_yes.innerHTML)
        // createCatList()
        feedBack()
        e.target.onclick = false;
    }

    feedback_btn_No.onclick = (e) => {
        let menuRemove = document.getElementById("feedback-mesg");
        menuRemove.remove();
        replyElem(feedback_btn_No.innerHTML);
        feedbackMenu();
        e.target.onclick = false;
    }
    scrollToBottom('.Chat-container');
}
//end

// reply element created
const replyElem = (text) => {

    let showMoreElem = document.querySelector(".show-more-button")

    if (showMoreElem) {
        showMoreElem.remove();
    }

    let newReply = document.createElement("a");
    newReply.href = "#";
    newReply.id = "mesg-reply";
    newReply.classList.add("list-group-item", "list-group-item-action", "reply-list-item");
    newReply.innerHTML = text;

    let replyDiv = document.createElement("div");
    replyDiv.classList.add("list-group", "row", "cat-reply");
    replyDiv.appendChild(newReply);

    let replyDiv2 = document.createElement("div");
    replyDiv2.classList.add("reply__messages__box");  //"col-8", deleted
    replyDiv2.appendChild(replyDiv);

    let replyDiv3 = document.createElement("div");
    replyDiv3.classList.add("reply__messages");
    replyDiv.id = "cat-replyy";
    replyDiv3.appendChild(replyDiv2);

    botBox.appendChild(replyDiv3)
}

//response question List
const anchorPressed = async (e) => {
    let text = e.target.innerHTML; // Get innerText of Clicked Element;
    catId = e.currentTarget.getAttribute('data-id');
    arrayName = `category`;

    addCounter(catId, arrayName)
    replyElem(text);

    // disable category menu
    let menuDisable = document.getElementById('mesg-reply');

    // if (menuDisable) {
    //     let anchors = document.getElementsByClassName("categories-list-item");
    //     for (let anchor of anchors) {
    //         anchor.onclick = false;
    //     }
    // }
    //end

    //categories question**********************
    cat_questions = await getCatQuestions(catId);
    createCatQuesList(cat_questions);
    scrollToBottom('.Chat-container');

}

//response answer
const answerList = async (e) => {

    // let tagQuesId = e.target.id; // Get ID of Clicked Element;
    let text = e.target.innerHTML; // Get innerText of Clicked Element;

    CatQuestId = e.currentTarget.getAttribute('data-id');

    replyElem(text);
    let menuDisable = document.getElementById('mesg-reply');
    let questions = document.getElementsByClassName("question-list-item");

    // disable questionList menu
    if (menuDisable) {
        for (let anchor of questions) {
            anchor.onclick = false;
        }
    }
    //end
    //categories question answer**********************
    const replyAnswer = cat_questions.filter((i) => {
        return i.id == CatQuestId;
    });
    let ans = replyAnswer[0].answer
    createAnswerElem(ans)
}

async function main() {

    createCatList();
}

main();

