//variables
var appState ="dashboard", i = 1;
var owner_name, problem, phone_number, pet_name, pet_age, animal_type;
var image1, image2, image_type
var next, previous
var dashboard_img, upload_imgs, start_button_img;
var bg, call;

function preload(){
  //loading the images
  start_button_img = loadImage("loadcases.png");
  dashboard_img = loadImage("dashboard.png")
  bg = loadImage("cases_bg.png")
}

function setup(){
  //creating canvas
  canvas = createCanvas(250, 400);

  //initializing the firebase
  database = firebase.database();

  //creating the buttons
  next = createButton('next');
  previous = createButton('previous');
  call = createButton('Call');

  //setting the positions for the buttons
  next.position(10,200);
  previous.position(10,225);

  //hiding the buttons
  call.hide();
  next.hide();
  previous.hide();
}

function draw(){
  // to draw a background
  background(dashboard_img)

  //to give the pop-up effect when the mouse is above the button
  if (mouseX>75&&mouseY>100&&mouseX<175&&mouseY<200&&appState ==="dashboard"){
    image(start_button_img,75-2.5,100-2.5,105,105);
  }else if (appState === "dashboard"){
    image(start_button_img,75,100,100,100);
  }

  //to show the cases when the button is pressed
  if (appState === "show cases"){
    show_cases();
  }
}

function mousePressed(){
  // to change the appState when the button is pressed(image is pressed)
  if (mouseX>75&&mouseY>100&&mouseX<175&&mouseY<200){
    appState = "show cases"
  } 

  //clearing the console
  console.clear();
}

function show_cases(){
  // to change the background.
  background(bg)
  
  // to get the submited information form the database.
  var path = "doctor submitions/"+ i + "/owner_name";
  var ngoRef = database.ref(path);
  ngoRef.on("value", (data) => {
    owner_name = data.val();
  });
  
  var path = "doctor submitions/"+ i + "/problem";
  var ngoRef = database.ref(path);
  ngoRef.on("value", (data) => {
    problem = data.val();
  });
  
  var path = "doctor submitions/"+ i + "/pet_age";
  var ngoRef = database.ref(path);
  ngoRef.on("value", (data) => {
    pet_age = data.val();
  });
  
  var path = "doctor submitions/"+ i + "/phone_number";
  var ngoRef = database.ref(path);
  ngoRef.on("value", (data) => {
    phone_number = data.val();
  });
  
  var path = "doctor submitions/"+ i + "/animal_type";
  var ngoRef = database.ref(path);
  ngoRef.on("value", (data) => {
    animal_type = data.val();
  });
  
  var path = "doctor submitions/"+ i + "/pet_name";
  var ngoRef = database.ref(path);
  ngoRef.on("value", (data) => {
    pet_name = data.val();
  });
  
  var path = "doctor submitions/"+ i + "/image1";
  var ngoRef = database.ref(path);
  ngoRef.on("value", (data) => {
    image1 = data.val();
  });
  
  var path = "doctor submitions/"+ i + "/image2";
  var ngoRef = database.ref(path);
  ngoRef.on("value", (data) => {
    image2 = data.val();
  });

  var path = "doctor submitions/"+ i + "/type";
  var ngoRef = database.ref(path);
  ngoRef.on("value", (data) => {
    image_type = data.val();
  });

  var path = "doctor_count";
  var ngoRef = database.ref(path);
  ngoRef.on("value", (data) => {
    submited_no = data.val();
  });

  //showing the next and the previous buttons
  next.show();
  previous.show();

  //positioning the buttons
  previous.position(20,370)
  next.position(125,370)

  // sizing the buttons
  previous.size(105,18)
  next.size(109,18)

  // showing the above retrived data
  fill ("black");
  textStyle(BOLD);
  text("Owner's Name: "+owner_name,25,70);
  text("Phone Number: "+phone_number,25,90);
  text("Problem / Issue: " +problem,25,110);
  text("Animal Type: "+animal_type,25,192);
  text("Name Of The Pet: "+pet_name,25,215);
  text("Pet's Age: "+pet_age,25,235);

  // to show the next case if the next button is pressed
  // if the case exists
  next.mousePressed(()=>{
    if (i<submited_no){
      i++;
    }
  })

  // to show the previous case if the previous button is pressed
  // if the case exists
  previous.mousePressed(()=>{
    if (i>1){
      i--
    }
  })  

  if (image1 !== undefined && image_type !== undefined ){
    // to create a blank image before the next one
    upload_imgs = createImg("data:image/png;base64,iVBORw0KGgoAA"+"AANSUhEUgAAAGQAAABkCAYAAABw4pVUAAABa0lEQVR4Xu3VwQkAMAzDwHb/oV3oFPdQJhASJnfbTscYuAVhWnyQglg9CoL1KEhBNAMYTz+kIJgBDKeFFAQzgOG0kIJgBjCcFlIQzACG00IKghnAcFpIQTADGE4LKQhmAMNpIQXBDGA4LaQgmAEMp4UUBDOA4bSQgmAGMJwWUhDMAIbTQgqCGcBwWkhBMAMYTgspCGYAw2khBcEMYDgtpCCYAQynhRQEM4DhtJCCYAYwnBZSEMwAhtNCCoIZwHBaSEEwAxhOCykIZgDDaSEFwQxgOC2kIJgBDKeFFAQzgOG0kIJgBjCcFlIQzACG00IKghnAcFpIQTADGE4LKQhmAMNpIQXBDGA4LaQgmAEMp4UUBDOA4bSQgmAGMJwWUhDMAIbTQgqCGcBwWkhBMAMYTgspCGYAw2khBcEMYDgtpCCYAQynhRQEM4DhtJCCYAYwnBZSEMwAhtNCCoIZwHBaSEEwAxhOCykIZgDDeaY+juTosfx4AAAAAElFTkSuQmCC",'')
    upload_imgs.position(200,200)
    upload_imgs.size(160,100)
    upload_imgs.position (125-(upload_imgs.width/2)+2.5,260)

    //showing the inmage which the user has sent
    upload_imgs = createImg("data:image/"+image_type+";base64,"+image1+image2,'');
    upload_imgs.position(200,200)
    upload_imgs.size(160,100)
    upload_imgs.position (125-(upload_imgs.width/2)+2.5,260)
  }

  //position-ing the call 
  call.position(200,80)

  // to show the hidden button
  call.show();

  // resizing the call-button 
  call.size(35,18)

  // to open the call.html file on a tab
  // call-when the button is pressed
  call.mousePressed(()=>{
    window.open('call.html')
    storeItem('phno', phone_number);
  })
}