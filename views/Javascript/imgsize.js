var img=document.querySelector("#upload");
img.onchange=function(){
    if(this.files[0].size>35000000)
    {alert("File should be smaller than 35MB");
    this.value="";}

};