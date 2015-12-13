// By:       Dylan Boates
//           with heavy copying from, I mean use of as a Pattern, Christopher Buchholz
var Clock = Clock || (function() {
    'use strict';

    var version = '0.0.1',
        lastUpdate = 1447948979,
    	schemaVersion = 0.1,
		
    getCleanImgsrc = function (imgsrc) {
        log(imgsrc);
        var parts = imgsrc.match(/(.*\/images\/.*)(thumb|max|med)(.*)$/);
        if(parts) {
            log("part 1 "+parts[1]+" part 2 "+parts[2]+" part 3 "+parts[3]);
            return parts[1]+'thumb'+parts[3];
        }
        return;
    },
    setImg = function (o,nextSide,allSides) {
        log(decodeURIComponent(allSides[nextSide]));
        var nextURL = getCleanImgsrc(decodeURIComponent(allSides[nextSide]));
        log(nextURL);
        o.set({
            currentSide: nextSide,
            imgsrc: nextURL
        });
        return nextURL;
    },
	setImgUrl = function (o, nextSide, nextURL) {
		o.set({
			currentSide: nextSide,
			imgsrc: getCleanImgsrc(nextURL)
		});		
	},
	isInt = function (value) {
		return !(value === undefined) &&  !isNaN(value) && parseInt(Number(value),10) === value && !isNaN(parseInt(value, 10)) && value >= 0;
	},
    updateImage = function(obj,prev) {
		var msg, allSides=[],  nextSide, nextURL, flipimg, setimg, incrementimg,
		nextURL='BLANK';

        log(obj.get("bar3_value"));
		if (allSides === undefined || allSides.length === 0  ) {
            log("Getting sides.");
			allSides = obj.get("sides").split("|");
		}
        log("Got "+allSides.length+" sides.");
		if ( allSides.length > 1) {
			nextSide = obj.get("bar3_value") ;
					
			if (nextSide >= allSides.length || nextSide === undefined || nextSide === "") {
				nextSide = 0;
			} 
            
            if (nextURL === 'BLANK') {
                log("Setting Img.");
    			nextURL = setImg(obj,nextSide,allSides);
			}

            log("Setting URL.");
			setImgUrl(obj,nextSide,nextURL);
		}
	},
	checkInstall = function() {
		log('-=> Clock v'+version+' <=-  ['+(new Date(lastUpdate*1000))+']');
	},

	registerEventHandlers = function() {
        on('change:graphic',updateImage);
	};

	return {
		CheckInstall: checkInstall,
		RegisterEventHandlers: registerEventHandlers
	};
}());

on("ready",function(){
	'use strict';

	Clock.CheckInstall();
	Clock.RegisterEventHandlers();
});