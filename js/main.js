var typed = new Typed(".element", {
  strings: ["Book Marker", ""],
  typeSpeed: 200,
  backSpeed: 100,
  loop: true,

  loopCount: Infinity,
});

var siteName = document.getElementById(`siteName`);
var siteUrl = document.getElementById(`siteUrl`);
var submitBtn = document.getElementById(`submitBtn`);
var sites = [];
var siteAlert = document.getElementById(`siteAlert`);
var bookmarkURLAlert = document.getElementById(`bookmarkURLAlert`);
var inputsAlert = document.getElementById(`inputsAlert`);
var formInputs = document.getElementsByClassName(`form-control`);
var currentIndex = 0;

if (JSON.parse(localStorage.getItem("sitesNames")) != null) {
  sites = JSON.parse(localStorage.getItem("sitesNames"));
  displayData();
}








submitBtn.onclick = function () {
  if(validation()&&checkUrl()&& checkName()){




  if (submitBtn.innerHTML == "Add BookMarker") {
    addSite();
  } else {
    updateSite();
  }
  displayData();
  clearInputs();
  inputsAlert.classList.add("d-none");
}
else{
  inputsAlert.classList.remove("d-none");
  submitBtn.disabled ="false"
}

};







function addSite() {
  var site = {
    name: siteName.value,
    url: siteUrl.value,
  };
  sites.push(site);
  localStorage.setItem(`sitesNames`, JSON.stringify(sites));
}

function displayData() {
  var bookMarkItems = ``;
  for (var i = 0; i < sites.length; i++) {
    bookMarkItems += `
          <div class=" position-relative bookMark-div  border d-flex  flex-md-row flex-column justify-content-between  align-items-center" >
          <div class="mx-2">
              <h3>${sites[i].name}</h3>
          </div>
          <div class="ps-sm-5">
              <i class="fa-solid fa-trash fs-2    btn  btn-danger far fa-trash-alt" onclick="deleteSite(${i})"></i>
              <i class="fa-solid fa-pen-to-square fs-2     btn btn-primary  far fa-edit" onclick="getSiteData(${i})"></i>
              <a href="${sites[i].url}" target="_blank"><i class="fa-solid fa-arrow-up-right-from-square me-2   fs-2   btn btn-success"></i></a>
          </div>
      </div>
          
          
          `;
  }
  document.getElementById(`bookMarkData`).innerHTML = bookMarkItems;
}

function clearInputs() {
  for (var i = 0; i < formInputs.length; i++) {
    formInputs[i].value = ``;
  }
}

function deleteSite(index) {
  sites.splice(index, 1);
  displayData();
  localStorage.setItem(`sitesNames`, JSON.stringify(sites));
}

function getSiteData(index) {
  siteName.value = sites[index].name;
  siteUrl.value = sites[index].url;
  submitBtn.innerHTML = "update";
  currentIndex = index;
}

function updateSite() {
  var site = {
    name: siteName.value,
    url: siteUrl.value,
  };
  sites[currentIndex] = site;
  displayData();
  localStorage.setItem(`sitesNames`, JSON.stringify(sites));
  submitBtn.innerHTML = `Add BookMarker`;
}




var siteRegex = /^[A-Z][a-z]{2,8}$/;

function checkName(){
  if(siteRegex.test(siteName.value))
  {
      return true;
  }else{
      return false
  }
}







siteName.onkeyup = function () {
 
  if (!siteRegex.test(siteName.value)) {
   
    siteName.classList.add(`is-invalid`);
    siteName.classList.remove(`is-valid`);
    siteAlert.classList.add(`d-block`);
    siteAlert.classList.remove(`d-none`);
    submitBtn.disabled = true;
    // return false;
  } else {
    
    siteName.classList.remove(`is-invalid`);
    siteName.classList.add(`is-valid`);
    siteAlert.classList.add(`d-none`);
    siteAlert.classList.remove(`d-block`);
    inputsAlert.classList.add("d-none");
    submitBtn.disabled=false;
    // return true;
  }
};




function checkUrl(){
  if(urlRegex.test(siteUrl.value))
  {
      return true;
  }else{
      return false
  }
}





var urlRegex =/^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/


siteUrl.onkeyup = function () {
 
  if (!urlRegex.test(siteUrl.value)) {
    siteUrl.classList.add(`is-invalid`);
    siteUrl.classList.remove(`is-valid`);
    bookmarkURLAlert.classList.remove(`d-none`);
    bookmarkURLAlert.classList.add(`d-block`);
    inputsAlert.classList.add("d-none");
    submitBtn.disabled = true;
    // return false;
  } else {
   
    siteUrl.classList.add(`is-valid`);
    siteUrl.classList.remove(`is-invalid`);
    bookmarkURLAlert.classList.remove(`d-block`);
    bookmarkURLAlert.classList.add(`d-none`);
    submitBtn.disabled = false;
    // return true;
  }
};







function validation(){
  if(siteName.value !== "" && siteUrl.value !=="")
  {
      return true;
  }else{
      return false;
  }
}


