cooking.moveMe = function(e) {
    e.preventDefault();
    var orig = e.originalEvent;
    var top = parseInt(orig.changedTouches[0].pageY);     
    var left = parseInt(orig.changedTouches[0].pageX);

    var topStop = this.getAttribute('topStop'); 
    var minTopStop = 0.98 * parseInt(topStop);
    var maxTopStop = 1.02 * parseInt(topStop);

    var leftStop = this.getAttribute('leftStop'); 
    var minLeftStop = 0.98 * parseInt(leftStop);
    var maxLeftStop = 1.02 * parseInt(leftStop);
    
    $(this).css({
      top: top + 'px',
      left: left + 'px'
    });
    console.log(left);
    console.log(minLeftStop);
    if(top > minTopStop && top < maxTopStop && left > minLeftStop && left < maxLeftStop) {
        alert('bingo');
    }
};

cooking.displayLevel = function(recipe,step){ 
    document.getElementById('instruction').innerHTML = recipe.steps[step].instruction;

    tools = recipe.steps[step].tools;
    var toolElement;
    for (var i=0, len=tools.length; i<len; ++i ){
        // tool
        toolEl = document.createElement('img');
        toolEl.setAttribute('src', tools[i].image);
        toolEl.setAttribute('class', 'tool');
        toolEl.setAttribute('id',tools[i].id);
        toolEl.style.top = tools[i].start.y + '%';  
        toolEl.style.left = tools[i].start.x + '%';  
        toolEl.style.width = tools[i].size.x + "%" ;  
        toolEl.style.height = tools[i].size.y + '%';
        toolEl.setAttribute('topStop',(tools[i].stop.y / 100 * window.innerHeight) + 'px');  
        toolEl.setAttribute('leftStop',(tools[i].stop.x / 100 * window.innerWidth) + 'px');  
        toolEl.addEventListener('click',cooking.moveMe);  
        document.body.appendChild(toolEl);

        // target for tool
        toolEl = document.createElement('div');
        toolEl.setAttribute('class', 'toolTarget');
        toolEl.setAttribute('id',tools[i].id + "Target");
        toolEl.style.top = tools[i].stop.y + '%';  
        toolEl.style.left = tools[i].stop.x + '%';  
        toolEl.style.width = tools[i].size.x + "%" ;  
        toolEl.style.height = tools[i].size.y + '%';  
        document.body.appendChild(toolEl);
    }

    $(".tool").bind("touchstart touchmove", cooking.moveMe);
}

cooking.gameStart = (function(){ 
    cooking.displayLevel(cooking.recipe1,0);
})();
