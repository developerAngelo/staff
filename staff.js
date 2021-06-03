
// createAcountViaEmail()
  

var storeLists = localStorage.getItem("storeList");
var options = [];
var ids = [];
var documentID = "";
var updateDocumentID = "";
var imgURL = "";
var rowIndexx = 999999;
var rowIndexUpdates = 99999;
var valueBtn = {storeNames: "", linkImage: ""}
var documentRefID = ""
var storeIDForBranch = "";
var hQIds = localStorage.getItem("idHQ");
var user = localStorage.getItem("usernames");
var pass = localStorage.getItem("passwords");
var cheStaff = []
var loa
var storeContainer = [];
var nestedString = "";
var idBranch = localStorage.getItem("idBranch");
var hqIDs = localStorage.getItem("idHQ");
var branchTitle = localStorage.getItem("titleBranch");
var selectedStaff = document.getElementById("storeStaff");
var storeValueName = ""
var storeValueID = ""
var editDocumentID = ""

// alert(options)
var selectedStores = ""
var selectedBranchs = ""


$('#table-store-msg').hide();
storeListed();
db.collection("CMSStaff").where("mainBranchID", "==", hQIds).get().then(function(querySnapshot) {
    querySnapshot.forEach(function(doc) {
      
        var content = ' ';
        var nameEmail = doc.data().email;
        var currentStore = doc.data().currentStoreID
        // var branchID = doc.data().
        // var userID = doc.data().userID;
        cheStaff.push(nameEmail);

        content += '<tr>';
        content += '<td class="image-staff" style="vertical-align:top">' + '<img src ="images/employeeStaff.png" alt="image"/>' + '</td>';
        content += '<td style="vertical-align:middle" class = "nameValue">' + nameEmail  + '</td>';
        content += '<td style="vertical-align:middle" class="btnStaff">' + ' <button  id= '+doc.id+' value= '+ nameEmail +' type = "button" onclick = "informationStaffs(this, this.value); " class="btn btn-primary btn-sm btnStore-sm" data-toggle="modal" data-target="#staff-Information"" ><i class="fa fa-info" aria-hidden="true"></i></button>' + '</td>';
        // content += '<td style="vertical-align:middle" class="btnStaff">' +  '<button  id= '+doc.id+' type = "button" class="btn btn-warning btn-sm btnStore-sm" data-target="#edit-staff" value = "'+ currentStore + '" onclick = "editAssignBranchStore(this, this.value);" data-toggle="modal" ><i class="fa fa-pencil" aria-hidden="true"></i></button>'+ '</td>';
        content += '<td style="vertical-align:middle" class="btnStaff">' +  '<button  id= '+doc.id+' type = "button" onclick = "documentIDs(this); " class="btn btn-danger btn-sm btnStore-sm" data-toggle="modal" data-target="#delete-staff" ><i class="fa fa-trash" aria-hidden="true"></i></button>'+ '</td>';
        // content += '<td style="vertical-align:middle" class="btnListStore">'+ '<button id= '+ storesIDs +' type= "button" onclick="pageRedirect();" class= "btn btn-info btn-sm btnStore-sm"><i class="fa fa-list" aria-hidden="true"></i></button>'  +'<td>';
        content += '</tr>';
        
        $('#ex-table-staff').append(content);
    
    });
    $('#loading').hide();
    // alert(cheEmpty.length);
    if (cheStaff.length === 0){
      $('#table-store-msg').show();
    }else{
      $('#table-store-msg').hide();
    }
});

 sendCustomEmailVerification();



$("#signOuts").bind("click", function() {
  signOut();
});

function signOut(){
  auth.signOut().then(() => {
      // console.log('user sign out');   
      localStorage.setItem("titleForHQ", "")
      window.location = "index.html";      
  })
}



function testingValue(){
  // var select = document.getElementById("selectBranchess");
  // alert(select.value)
}

var selectedStaff = document.getElementById("storeStaff");

function informationStaffs(documents, email){
  // var data = document.getElementById("emailStaffs").innerHTML
  document.getElementById("emailStaffs").innerText = email;
  var docRef = db.collection("CMSStaff").doc(documents.id);

  docRef.get().then(function(doc) {
      if (doc.exists) {
        // doc.data().currentBranchID
          var dateCreated = doc.data().staffCreated
          var pass = doc.data().password
          // console.log("date Created:", dateCreated.toDate())
          document.getElementById("passStaff").innerText = pass

          document.getElementById("dateStaffs").innerText = dateCreated.toDate().toISOString().slice(0,10);

          db.collection("CMSBranches").where("branchID", "==", doc.data().currentBranchID).get().then(function(queryBranches){
            queryBranches.forEach(function(doc){
              // console.log("Current Branch Name:", doc.data().branch);
              // console.log("Current Branch Location:", doc.data().location);
              document.getElementById("branchStaffs").innerText = doc.data().branch
              document.getElementById("locationStaffs").innerText = doc.data().location

              })
          })



      } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
      }
  }).catch(function(error) {
      console.log("Error getting document:", error);
  });
}



function storeListed(){

  db.collection("CMSBranches").where("mainID", "==", hQIds).get().then(function(querySnapshot) {
    querySnapshot.forEach(function(doc) {

        // var content = ' ';
        var name = doc.data().branch;
        var storesIDs = doc.data().branchID;
        var newStore = new storeInfo(name, storesIDs)
        storeContainer.push(newStore)
    });    

   for(var i = 0; i < storeContainer.length; i++){
      //  var opt = options[i];
       var el = document.createElement("option");
       el.textContent = storeContainer[i].storeName;
       el.value = storeContainer[i].storeID;
       selectedStaff.appendChild(el);
  }
});
    // alert(options.length)
}

function selectedValueStore(sel){
  // alert(sel.options[sel.selectedIndex].value);
  storeValueName = sel.options[sel.selectedIndex].text
  storeValueID = sel.options[sel.selectedIndex].value
}


//// change into..... some details like ID`s
function branchListed(){
  // alert(select.value)
  var select = document.getElementById("selectNumber");
  var selectBranches = document.getElementById("selectBranchess");
  // alert(select.value);
  db.collection("CMSBranches").where("mainID", "==", hqIDs).get().then(function(queryBranches){
    queryBranches.forEach(function(doc){
      var elOpt = document.createElement("option");
      elOpt.textContent = doc.branch
      selectBranches.appendChild(elOpt);
    })
  })
}

function validate(){
  var e = document.getElementById("selectNumber");
  var strUser = e.options[e.selectedIndex].value;
  // print(strUser)
  // var card = document.getElementById("selectNumber");
  // print(card.value)
//   if(card.selectedIndex == 0) {
//     alert('select one answer');
// }
// else {
//    var selectedText = card.options[card.selectedIndex].text;
//    alert(selectedText);
// }
}

function storeInfo (names, id) {
  this.storeName = names;
  this.storeID = id;
  function getName(){
      return this.storeName;
  }
}



function removeHighlighting(highlightedElements){
    highlightedElements.each(function(){
        var element = $(this);
        element.replaceWith(element.html());
    })
  }
  
  function addHighlighting(element, textToHighlight){
    var text = element.text();
    var highlightedText = '<em>' + textToHighlight + '</em>';
    var newText = text.replace(textToHighlight, highlightedText);
    
    element.html(newText);
  }

$("#search_id").on("keyup", function() {
    var value = $(this).val();
    
    removeHighlighting($("table tr em"));
  
    $("table tr").each(function(index) {
        if (index !== 0) {
            $row = $(this);
            
            var $tdElement = $row.find("td:eq(1)");
            var id = $tdElement.text();
            var matchedIndex = id.indexOf(value);
            
            if (matchedIndex != 0) {
                $row.hide();
            }
            else {
                addHighlighting($tdElement, value);
                $row.show();
            }
        }
    });
  });


  function documentIDs(e){

    rowIndexx = e.parentElement.parentElement.rowIndex

    var e = window.event,
    btn = e.target || e.srcElement;
    documentID = btn.id

  }

  function registerStaffUsers(){
    var emailSfaff = document.getElementById("staff_id").value;

    if (storeValueName == "" || emailSfaff == ""){
      alert("field must not be empty")
       $('#modalConfirmEmailss').modal('show');

    }else{
      $('#modalConfirmEmailss').modal('hide')
      $('#close-Staff').click();
      // createAcountViaEmail()
      createAcountViaEmail()
    }
   
  }

  function removingDataInManager(){
    // alert(documentID)
    document.getElementById("ex-table-staff").deleteRow(rowIndexx);
    db.collection("CMSStaff").doc(documentID).delete().then(function() {
      console.log("Document successfully deleted!");
  }).catch(function(error) {
      console.error("Error removing document: ", error);
  });
  
  }

  
  function addManagerInfirestore(){
    
    if (!document.getElementById("staff_id").value)
    {
        alert("emtpy field")
    }else{
        createAcountViaEmail();
    }       
  }

  var HQtitles = localStorage.getItem("titleForHQ");


  function createAcountViaEmail(){

  
    
   
  }

  function insertInDataTable(docRefID){ //Insert New Data in TableView Cell
    var staffEmails = document.getElementById("staff_id").value;
  ``
    var newRow = document.getElementById('ex-table-staff').insertRow(1);
    var cell1   = newRow.insertCell();
    cell1.setAttribute("class","image-staff");

     var image = document.createElement("img");
     image.setAttribute('src', 'images/employeeStaff.png');
     cell1.appendChild(image);
   
  
    var cell2   = newRow.insertCell(-1);
    cell2.setAttribute("style", "vertical-align:middle");
    var cell2Text  = document.createTextNode(staffEmails);
  
    cell2.appendChild(cell2Text);
    
    var infoCell = newRow.insertCell(-1);
    infoCell.setAttribute("style", "vertical-align:middle");
    infoCell.setAttribute("class", "btnStaff");


    var info = document.createElement("BUTTON");
    info.setAttribute("class", "btn btn-primary  btn-sm btnStore-sm fa fa-info");
    info.setAttribute("data-toggle", "modal");
    info.setAttribute("data-target", "#staff-Information");
    info.setAttribute("id", docRefID);
    info.setAttribute("onclick", "informationStaffs(this, this.value);");
    info.setAttribute("value", staffEmails);
    infoCell.appendChild(info);

  
    var cell4 = newRow.insertCell(-1)
    cell4.setAttribute("style", "vertical-align:middle");
    // cell4.setAttribute("class", "btnListStore");
    cell4.setAttribute("class", "btnStaff");


    var buttonDelete = document.createElement("BUTTON");
    buttonDelete.setAttribute("class", "btn btn-danger btn-sm btnStore-sm fa fa-trash");
    buttonDelete.setAttribute("data-toggle", "modal");
    buttonDelete.setAttribute("data-target", "#delete-staff");
    buttonDelete.setAttribute("id", docRefID);
    buttonDelete.setAttribute("onclick", "documentIDs(this)");


    cell4.appendChild(buttonDelete);
    $('#table-store-msg').hide();

     storeValueName = ""
     storeValueID = "" 
     staffEmails = ""
     selectedStaff.value = "Select Store"
     
     document.getElementById('blur-background').style.display="none"; 
     $('#staff-message').modal('show');

  }

  function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  function sendCustomEmailVerification(){
    const actionCodeSettings = {
      // URL you want to redirect back to. The domain (www.example.com) for
      // this URL must be whitelisted in the Firebase Console.
      url: 'https://ortech.page.link/userSignIn',
      // This must be true for email link sign-in.
      handleCodeInApp: true,
      iOS: {
        bundleId: 'com.example.ios',
      },
      android: {
        packageName: 'com.example.android',
        installApp: false,
        minimumVersion: '12',
      },
      // FDL custom domain.
      dynamicLinkDomain: 'ortech.page.link',
    };

     const useremail = "rhuet.transit@gmail.com"

     const admin = require('firebase-admin');
     admin.auth().generateSignInWithEmailLink(useremail, actionCodeSettings)
        .then((link) => {
    // Construct sign-in with email link template, embed the link and
    // send using custom SMTP server.
    console.log(link)
    return sendSignInEmail(usremail, displayName, link);
  })
  .catch((error) => { 
    // Some error occurred.
    console.log("Error :" + error)
  });

  } 

 



  
    //  firebase.auth().sendSignInLinkToEmail(useremail, actionCodeSettings)
    //   .then((link) => {
    //     Email.send({
    //       Host: "smtp.gmail.com",
    //       Username : "shopAppStaff@gmail.com",
    //       Password : "shopapp312",
    //       To : useremail,
    //       From : "shopAppStaff@gmail.com",
    //       Subject : storeValueName,
    //       Body : link,
    //       }).then(
    //         // message => alert("メールを確認してください")
    //         console.log("Email Sent", link)
    //       );
    //   })
    //   .catch((error) => {
    //     console.log("Error send link: " + error)
    //   })





 




















// function sendEmails() {
// 	Email.send({
// 	Host: "smtp.gmail.com",
// 	Username : "botinvite123@gmail.com",
// 	Password : "basahannabasa123",
// 	To : 'acero.angelo777@gmail.com',
// 	From : "botinvite123@gmail.com",
// 	Subject : "subjext",
// 	Body : "testings",
// 	}).then(
// 		message => alert("mail sent successfullys")
// 	);
// }

  //    const admin = require('firebase-admin')
  //    admin.auth().generateSignInWithEmailLink(useremail, actionCodeSettings)
  //       .then((link) => {
  //   // Construct sign-in with email link template, embed the link and
  //   // send using custom SMTP server.
  //   console.log(link)
  //   return sendSignInEmail(usremail, displayName, link);
  // })
  // .catch((error) => { 
  //   // Some error occurred.
  //   console.log("Error :" + error)
  // });
