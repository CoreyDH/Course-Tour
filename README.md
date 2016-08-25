# Course Tour

### Features ###
- Carousel like interface between holes, and images
- Optional multi images/video for each hole
- FCK based hole description
- Single page viewing
- Easy implementation
- Mobile responsive

### Future Features ###
- Layout selection

### Dependencies ###
- jQuery
- Bootstrap
- Flexslider 2

### Implementation ###
```javascript
$('#selector').coursetour();
```

### Options ###
<b>holes</b> (default: 18) <i>integer</i> - Number of holes that will be generated and displayed.

<b>info</b> (default: true) <i>boolean</i> - Display information panel, holds stats and descriptions.

<b>infoPos</b> (default: 'right') <i>'right', 'left'</i> - Side panel sits on.

<b>infoColWidth</b> (default: 4) <i>integer</i> - Info panel column width based on bootstrap grid.

<b>media</b> (default: 4) <i>integer</i> - Display media panel, holds images and videos.

<b>mediaPos</b> (default: right) <i>right, left</i> - Side panel sits on.

<b>mediaColWidth</b> (default: 4) <i>integer</i> - Media panel column width based on bootstrap grid.

<b>videos</b> (default: false) <i>object</i> - Load any youtube links via object with hole# for keys, and array for value.

Example:
```javascript
$('#selector').coursetour({
  videos: {
    hole1: ['ytlink1', 'ytlink2', 'ytid'],
    hole2: ['ytlink1', 'ytlink2', 'ytid'],
    hole6: ['ytlink1', 'ytlink2', 'ytid'],
  }
});
```

<b>images</b> (default: true) <i>boolean</i> - Display images.

<b>imagesPath</b> (default: 'images/coursetour') <i>string</i> - Path to the image folder, will read folders inside and relate to hole # in ascending order.  

File structure should be
```
pathFolder
|-hole1
|-hole2
|-hole3
|-etc..
```
<b>smoothHeight</b> (default: false) <i>boolean</i> - Flexslider smoothHeight feature.

<b>description</b> (default: true) <i>boolean</i> - Display descriptions.

<b>stats</b> (default: true) <i>boolean</i> - Display stats.

<b>loader</b> (default: true) <i>boolean</i> - Display load screen.

<b>ajaxInfo</b> (default: false) <i>boolean</i> - Retrieve description and stats information with AJAX rather than through the DOM tree.

<b>infoPath</b> (default: '.') <i>string</i> - Description/Stats directory, needed if ajaxInfo is set to true

<b>carouselSpeed</b> (default: 350) <i>integer</i> - Transition speed of the wrapper carousel.
