function scrollToSection(id){
    const section = document.getElementById(id);
    if(section){
        section.scrollIntoView({behavior: 'smooth'});
    }
}

function goToPage(url){
    window.location.href = url;
}