function runFunction(e){
    window.location.reload();
}

fetch("https://restcountries.com/v3/all")
.then(function(data){
    return data.json();
})
.then(function(jsonData){
    row=document.getElementsByClassName("row")[0];
    
    jsonData.forEach(function(item,index){

        //column element
        var col=document.createElement("div");
        col.setAttribute("class","col-lg-4 col-sm-12");

        //card element
        var card=document.createElement("div");
        card.setAttribute("class","card");
        card.style.width="18rem";
        card.style.textAlign="center";
        card.style.marginTop="50px";
        
       
        var titlediv=document.createElement("div");
        titlediv.setAttribute("class","title-div");
        titlediv.style.backgroundColor="black";
        titlediv.style.padding="10px";
        
        //card title
        var title=document.createElement("h5");
        title.setAttribute("class","card-title");
        title.innerText=item.name.official;
        title.style.color="white";
        titlediv.appendChild(title);

        //card image
        var image=document.createElement("img");
        image.setAttribute("src",item.flags[1]);
        image.setAttribute("class","card-img-top");
        image.style.paddingTop="20px";

        //card body
        var cardBody=document.createElement("div");
        cardBody.setAttribute("class","card-body");


        //card text
        var cardText=document.createElement("p");
        cardText.setAttribute("class","card-text");
        cardText.innerHTML="<p>Capital: "+item.capital[0]+"<br>Region: "+item.region+"<br>Country Code: "+item.cca2+"</p>";
        cardText.style.color="white";

        //card button
        var bttn=document.createElement("button");
        bttn.setAttribute("type","button");
        bttn.setAttribute("class","btn btn-outline-primary");
        bttn.setAttribute("data-bs-toggle","modal");
        var x="#modal"+index;
        bttn.setAttribute("data-bs-target",x);
        bttn.innerText="Click for Weather";
        bttn.style.color="white";


        //Modal
        var modal=document.createElement("div");
        modal.setAttribute("class","modal");
        var y="modal"+index;
        modal.setAttribute("id",y);
        modal.setAttribute("tableindex","-1");
        modal.setAttribute("aria-hidden","true");
        
        var modalDialog=document.createElement("div");       //modal dialog
        modalDialog.setAttribute("class","modal-dialog modal-dialog-centered");

        var modalContent=document.createElement("div");      //modal content
        modalContent.setAttribute("class","modal-content");
        
        var modalHeader=document.createElement("div");       //modal header
        modalHeader.setAttribute("class","modal-header");
        
        var modalTitle=document.createElement("h5");        //modal title
        modalTitle.setAttribute("class","modal-title");

        var modalbtn=document.createElement("button");      //modal close X button
        modalbtn.setAttribute("type","button");
        modalbtn.setAttribute("class","btn-close");
        modalbtn.setAttribute("data-bs-dismiss","modal");
        modalbtn.setAttribute("aria-label","Close");

        modalHeader.appendChild(modalTitle);                
        modalHeader.appendChild(modalbtn);

        var modalBody=document.createElement("div");        //modal body
        modalBody.setAttribute("class","modal-body");

        var bodyText=document.createElement("p");           //modal body Text

        modalBody.appendChild(bodyText);

        var modalFooter=document.createElement("div");      //modal footer
        modalFooter.setAttribute("class","modal-footer");
        
        var footerbtn=document.createElement("button");     //modal footer close button
        footerbtn.setAttribute("type","button");
        footerbtn.setAttribute("class","btn btn-secondary");
        footerbtn.setAttribute("data-bs-dismiss","modal");
        footerbtn.innerText="Close";

        modalFooter.appendChild(footerbtn);
        modalContent.appendChild(modalHeader);
        modalContent.appendChild(modalBody);
        modalContent.appendChild(modalFooter);

        modalDialog.appendChild(modalContent);
        modal.appendChild(modalDialog);
        modalHeader.style.textAlign="center";
        //Modal - End

        //appending everything to the parent row element 
        cardBody.appendChild(cardText);
        cardBody.appendChild(bttn);
        cardBody.appendChild(modal);

        card.appendChild(titlediv);
        card.appendChild(image);
        card.appendChild(cardBody);

        col.appendChild(card);
        row.appendChild(col);

        bttn.onclick = function(){
            fetch("https://api.openweathermap.org/data/2.5/weather?q="+item.capital[0]+"&appid=76e2ae3c30b69101e2f25e68c88f1e93")
            .then(function(data2){
                return data2.json();
            })
            .then(function(fdata){
                
                //updating the name and weather inside the modal div
                modalTitle.innerText=item.name.official;
                bodyText.innerHTML="<p>Temp: "+fdata.main.temp+"&#176;F<br>"+"Feels like: "+fdata.main.feels_like+"&#176;F<br>"+"Max Temp: "+fdata.main.temp_max+"&#176;F<br>"+"Min Temp: "+fdata.main.temp_min+"&#176;F</p>";
                bodyText.style.fontFamily="Arial"
            }).catch(function(err){
                vonsole.log(err);
            })
        }
    })
})
.catch(function(err){
    console.log(err);
})
