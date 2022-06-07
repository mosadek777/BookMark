var bookmarkName = document.getElementById("bookmark-name"),
    bookmarkURL = document.getElementById("bookmark-url"),
    bookmarkDisplayName = document.getElementById("bookmark-display-name"),
    addBtn = document.getElementById("add-btn"),
    emptyInputAlert = document.getElementById("empty-input-alert"),
    bookmarkCardContainer = document.getElementById("bookmark-card-container"),
    formInputs = document.getElementsByClassName("form-control"),
    searchInput = document.getElementById("search-input"),
    bookmarkCardHref = document.getElementById("bookmark-card-href"),
    bookmarkNameAlert = document.getElementById("bookmarkNameAlert"),
    bookmarkURLAlert = document.getElementById("bookmarkURLAlert"),
    bookmarkArray = [],
    currnetIndex;


//Get data from LocalStorage after refresh:
if(localStorage.getItem("bookmarkList") == null) {
    bookmarkArray = [];
} else {
    bookmarkArray = JSON.parse(localStorage.getItem("bookmarkList"));
    displayBookmark();
};

//Add Bookmark to Table & LocalStorage;:
addBtn.onclick = function() {

    if(bookmarkName.value == '' || bookmarkURL.value == '') {
        
        bookmarkCardHref.removeAttribute("href");
        emptyInputAlert.innerHTML = "Please fill in required data !";
    
    } else if(addBtn.innerHTML == "Add Bookmark") {
            bookmarkCardHref.setAttribute("href", "#bookmark-card");
            emptyInputAlert.innerHTML = "";
            addBookmark();
        
        } else { 
            bookmarkCardHref.setAttribute("href", "#bookmark-card");
            emptyInputAlert.innerHTML = "";
            submitEdit(currnetIndex);
    }
    
    localStorage.setItem("bookmarkList" , JSON.stringify(bookmarkArray));
    displayBookmark();
    resetForm();
};

//Add Bookmark to Array:
function addBookmark() {
    if(validateBookMarkName() == true && validateBookMarkURL() == true)
    {
        var bookmark =
        {
        name: bookmarkName.value,
        url : bookmarkURL.value
        }
        bookmarkArray.push(bookmark);
    }
};

//Display Bookmark Card Function:
function displayBookmark() {

    var bookmarkContainer = "";

    for(var i=0; i < bookmarkArray.length; i++)
    {
        bookmarkContainer += 
                `<div class="bookmark-card" id="bookmark-card">
                    <div class="bookmark-card-name float-left">
                        <h3 class="bookmark-display-name">${bookmarkArray[i].name}</h3>
                    </div>

                    <div class="card-btn float-right">
                        <button class="btn pink-btn">
                            <a href="https://${bookmarkArray[i].url}" target="_blank" class="visit-btn text-decoration-none">Visit</a> 
                        </button>
                        <button class="btn gray-btn" onclick="editBookmark(${i})">
                            <a class="edit-btn text-decoration-none" href="#to-top">Edit</a> 
                        </button>
                        <button class="btn black-btn" onclick="deleteBookmark(${i})">Delete</button>
                    </div>

                    <div class="clearfix"></div>
                </div>`
    }
    
    bookmarkCardContainer.innerHTML = bookmarkContainer;
};

//Reset Form After Adding:
function resetForm() {
    for(var i = 0; i < formInputs.length; i++)
    {
        formInputs[i].value = ''
    }

    bookmarkName.classList.remove("is-valid");
    bookmarkName.classList.remove("is-invalid");

    bookmarkURL.classList.remove("is-invalid");
    bookmarkURL.classList.remove("is-valid");
};

//Edit Bookmark Function:
function editBookmark(index) {

    addBtn.innerHTML = "Update Bookmark";
    bookmarkName.value = bookmarkArray[index].name;
    bookmarkURL.value = bookmarkArray[index].url;
    currnetIndex = index;
};

//Submit Edit Function:
function submitEdit(currnetIndex) {

    bookmarkArray[currnetIndex].name = bookmarkName.value;
    bookmarkArray[currnetIndex].url = bookmarkURL.value;

    addBtn.innerHTML = "Add Bookmark";
};


//Delete Bookmark Function:
function deleteBookmark(index) {

    bookmarkArray.splice(index,1);
    localStorage.setItem("bookmarkList" , JSON.stringify(bookmarkArray));
    displayBookmark();
};

//Search BookmarkFunction:
searchInput.onkeyup = function() {
    var selectedBookmark = searchInput.value;

    var bookmarkContainer = "";

    for(var i=0; i < bookmarkArray.length; i++)
    {
        if(bookmarkArray[i].name.toLowerCase().includes(selectedBookmark.toLowerCase()))
        {
            bookmarkContainer += 
                `<div class="bookmark-card">
                    <div class="bookmark-card-name float-left">
                        <h3>${bookmarkArray[i].name}</h3>
                    </div>

                    <div class="card-btn float-right">
                        <button class="btn pink-btn">
                            <a href="https://${bookmarkArray[i].url}" target="_blank" class="visit-btn text-decoration-none">Visit</a> 
                        </button>
                        <button class="btn gray-btn">
                            <a class="edit-btn text-decoration-none" href="#to-top">Edit</a> 
                        </button>
                        <button class="btn black-btn" onclick="deleteBookmark(${i})">Delete</button>
                    </div>

                    <div class="clearfix"></div>
                </div>`
        
            } 
    }
    
    bookmarkCardContainer.innerHTML = bookmarkContainer;
};


//Validate Bookmark Name Function:
function validateBookMarkName() {
    var regex = /^[A-Z][a-z A-z 0-9]{3,9}$/;

    if(regex.test(bookmarkName.value) == true)
    {
        bookmarkName.classList.add("is-valid");
        bookmarkName.classList.remove("is-invalid");

        bookmarkNameAlert.classList.add("d-none");
        bookmarkNameAlert.classList.remove("d-block");

        addBtn.disabled = false;

        return true;
    
    } else {
        bookmarkName.classList.add("is-invalid");
        bookmarkName.classList.remove("is-valid");

        bookmarkNameAlert.classList.add("d-block");
        bookmarkNameAlert.classList.remove("d-none");

        addBtn.disabled = true;

        return false;
    };
};

//Check Duplicated Bookmark Name
function checkDuplicatedNames() {

    for(var i = 0; i < bookmarkArray.length; i++)
        {
          if(bookmarkName.value == bookmarkArray[i].name) 
          {
            bookmarkName.classList.add("is-invalid");
            bookmarkName.classList.remove("is-valid");

            bookmarkNameAlert.classList.add("d-block");
            bookmarkNameAlert.classList.remove("d-none");
  
            bookmarkNameAlert.innerHTML = "Bookmark Name Already Exists";
  
            addBtn.disabled = true;
          } 
        }
  };

bookmarkName.addEventListener("keyup", validateBookMarkName);
bookmarkName.addEventListener("blur", checkDuplicatedNames);


//Validate Bookmark URLFunction:
function validateBookMarkURL() {
    var regex = /^(www)\.[a-z0-9\-\.]+\.(com|net|org)$/i;

    if(regex.test(bookmarkURL.value) == true)
    {
        bookmarkURL.classList.add("is-valid");
        bookmarkURL.classList.remove("is-invalid");

        bookmarkURLAlert.classList.add("d-none");
        bookmarkURLAlert.classList.remove("d-block");

        addBtn.disabled = false;

        return true;
   
    } else {
        bookmarkURL.classList.add("is-invalid");
        bookmarkURL.classList.remove("is-valid");

        bookmarkURLAlert.classList.add("d-block");
        bookmarkURLAlert.classList.remove("d-none");

        addBtn.disabled = true;

        return false;
    }

};

bookmarkURL.addEventListener("keyup" , validateBookMarkURL);









// <html><head>
//     <title>Bookmark</title>
//     <meta charset="UTF-8">
//     <meta name="viewport" content="width=device-width; initial-scale=1.0">
//     <link rel="icon" href="images/icon.png">
//     <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
//     <link rel="stylesheet" href="css/all.min.css">
//     <link rel="stylesheet" href="css/bootstrap.min.css">
//     <link rel="stylesheet" href="css/main.css"></head>

//   <body data-new-gr-c-s-check-loaded="14.1062.0" data-gr-ext-installed="" cz-shortcut-listen="true">
//     <!-- Start Form -->
//     <section class="bookmark-form" id="to-top">
//       <div class="container">
//         <div class="form-container d-flex justify-content-center">
//           <div class="form w-50 py-5 my-5">
//             <div class="form-head text-center mb-5">
//               <h1>Bookmarker</h1>
//               <p>Bookmark your favorite sites</p>
//             </div>

//             <div class="form-group">
//               <label>Site Name</label> <span class="text-danger"> * </span>
//               <input type="text" id="bookmark-name" class="form-control" placeholder=" &nbsp; Bookmark Name" style="font-family: FontAwesome">
//               <div id="bookmarkNameAlert" class="alert alert-danger d-none">
//                 BookmarkName must start with capital letter, contains 4:10 characters
//               </div>
//             </div>

//             <div class="form-group">
//               <label>Site URL</label> <span class="text-danger"> * </span>
//               <input type="text" id="bookmark-url" class="form-control" placeholder=" &nbsp; Bookmark URL" style="font-family: FontAwesome">
//               <div id="bookmarkURLAlert" class="alert alert-danger d-none">
//                 Bookmark URL must start with: (www.), then any char and ends with (.com, .org or .net)
//               </div>
//             </div>

//             <div class="form-group text-center mt-5">
//               <p id="empty-input-alert" class="text-danger">Please fill in required data !</p>
//               <a class="text-decoration-none" id="bookmark-card-href">
//                 <button class="btn pink-btn" id="add-btn">Add Bookmark</button>
//               </a>
//             </div>
//           </div>
//         </div>

//         <div class="to-down-arrow">
//           <a href="#to-down" class="text-decoration-none text-white">
//             <i class="fas fa-chevron-down"></i>
//           </a>
//         </div>

//       </div>
//     </section>
//     <!-- End Form -->

//     <!-- Start Table -->
//     <section class="display-table pt-5 pb-3" id="to-down">
//       <div class="container">
//         <div class="bookmark-container d-flex justify-content-center">
//           <div class="display-table-body w-50">

//             <div class="form-group mt-3 mb-5">
//               <input type="text" id="search-input" class="form-control" placeholder=" &nbsp; Search" style="font-family: FontAwesome">
//             </div>

//             <div id="bookmark-card-container"></div>

//           </div>
//         </div>
//       </div>
//     </section>
//     <!-- End Table -->

//     <!--Start Footrt -->
//     <footer>
//       <div class="container">
//         <div class="footer-content text-center">
//           <hr>
//           <p> CopyRight © 2019 Bookmarker</p>
//         </div>
//       </div>
//     </footer>
//     <!--End Footrt -->

//     <!-- To Top Arrow -->
//     <div class="to-top-arrow">
//       <a href="#to-top" class="text-decoration-none text-white">
//         <i class="fas fa-chevron-up"></i>
//       </a>
//     </div>

//     <script src="js/jquery-3.5.1.slim.min.js"></script>
//     <script src="js/popper.min.js"></script>
//     <script src="js/bootstrap.min.js"></script>
//     <script src="js/main.js"></script>
  

// </body><grammarly-desktop-integration data-grammarly-shadow-root="true"></grammarly-desktop-integration></html>