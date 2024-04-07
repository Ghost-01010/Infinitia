function isWithinDistance(x, y, d=80, xx=2140, yy=1395) {
    const distance = Math.sqrt((x - xx) ** 2 + (y - yy) ** 2);
    return distance <= d;
    }
    // Create an SVGPoint for future math
    let pt = new DOMPoint();
    let mult = 2;
    // Get point in global SVG space
    function cursorPoint(evt) {
        pt.x = evt.clientX;
        pt.y = evt.clientY;
        return pt.matrixTransform(svg.getScreenCTM().inverse());
    }
    let xx, yy = 0;
    function moveCircle(evt) {
        let loc = cursorPoint(evt);
        let mc = document.querySelector("#maskCircle");
        let mag0 = document.querySelector("#mag0");
        let mag1 = document.querySelector("#mag1");
        let mag2 = document.querySelector("#mag2");
        let mag3 = document.querySelector("#mag3");
        let bigImg = document.querySelector('#zoomUse');
        xx = loc.x - (mult * loc.x);
        yy = loc.y - (mult * loc.y);
        bigImg.setAttribute('transform', `translate(${xx} ${yy}) scale(${mult})`);
        mc.setAttribute("cx", loc.x);
        mc.setAttribute("cy", loc.y);
        mag0.setAttribute("cx", loc.x);
        mag0.setAttribute("cy", loc.y);
        mag0.setAttribute("transform", `rotate(45 ${loc.x} ${loc.y})`);
        mag1.setAttribute("cx", loc.x);
        mag1.setAttribute("cy", loc.y);
        let foundWaldo = isWithinDistance(loc.x, loc.y, 100/mult);
        foundWaldo ? mag0.setAttribute('stroke', '#afa') : mag0.setAttribute('stroke', '#111');
        foundWaldo ? mag1.setAttribute('stroke', 'url(#magnifyLensFound)') : mag1.setAttribute('stroke', 'url(#magnifyLens)');
        mag2.setAttribute("d", `M${loc.x + 171} ${loc.y + 171}l100 100`);
        mag3.setAttribute("d", `M${loc.x + 171} ${loc.y + 171}l100 100`);
    }
    
    let svg = document.querySelector(".ww");
    // hey.. hey! Listen.
    svg.addEventListener("mousemove", (evt) => {
            moveCircle(evt);
        }, false);
    svg.addEventListener("click", (evt) => {
            moveCircle(evt);
        }, false);
    svg.addEventListener("touch", (evt) => {
            moveCircle(evt);
        }, false);
    svg.addEventListener("touchmove", (evt) => {
            moveCircle(evt);
        }, false);
    
    // Function to handle zoom
    function handleZoom(event) {
        event.preventDefault();
    
        // Calculate the zoom factor based on the scroll wheel delta
        const zoomFactor = event.deltaY;
        if (zoomFactor >= 0) {
            mult += 0.5;
        } else {
            mult -= 0.5;
        }
    
        // Update the slider value
        zoomSlider.value = mult.toFixed(1);
    
        // Ensure the zoom level stays within the limits
        if (mult < 1.5) {
            mult = 2;
        } else if (mult > 10) {
            mult = 10;
        }
        moveCircle(event);
    }
    
    // Add wheel event listener to handle zoom
    svg.addEventListener("wheel", handleZoom);
    
    // Add event listener to slider
    const zoomSlider = document.getElementById('zoomSlider');
    
    zoomSlider.addEventListener('input', () => {
      mult = parseFloat(zoomSlider.value);
    });