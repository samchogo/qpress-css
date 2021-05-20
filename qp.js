/* Version : 1.4  */
var qp = new Qpress();
window.addEventListener('load', function() {
    qp.initEvents();
});
window.addEventListener('resize', function() {
    qp.smartHeight();
    qp.responsive();
});
window.addEventListener('scroll', function() {
    qp.scrollEvent();
    qp.animateCss();
    qp.repositionDropdown();
});
window.addEventListener('click', function(e) {
    qp.closeAllDropdowns(e);
    qp.closeResMenu(e);
});
function Qpress() {
    this.brPoint = {
        la : 1200,
        md : 768,
        sm : 576
    }
    this.initEvents = function(el){
        this.scrollEvent(el);
        this.initMasonry(el);
        this.initDropdownClick(el);
        this.initSlide(el);
        this.initMdMenu(el);
        this.setBrowserType(el);
        this.smartHeight();
        this.initSwipe();
        this.initSwiper(); // for swiper.js
        this.initAppForm();
        this.initNav();
        this.animateCss(el);
        qp.responsive();
    }
    /* ----------------------
        General Functions
    ------------------------- */
    /* smooth scrroll to element */
    this.gotoId = function(id,unit) {
        var target = document.getElementById(id);
        var from = document.documentElement.scrollTop;
        unit = 0;
        scrollAnimate(document.scrollingElement || document.documentElement, "scrollTop", unit, from, target.offsetTop, 1000, true);
    }
    this.gotoTop = function() {
        var from = document.documentElement.scrollTop;
        var unit = 0;
        scrollAnimate(document.scrollingElement || document.documentElement, "scrollTop", unit, from, 0, 500, true);
    }
    this.gotoLink = function(url,target) {
        if(!url) return;
        if(target == "_blank") window.open(url,'_blank');
        else window.location.href=url;
    }
    /* show & hide */
    this.show = function(id){
        if(!id) return;
        var el = document.getElementById(id);
        if(!el) return;
        // cleanSlideDownWrapper(el);
        el.style.display="block";
    }
    this.hide = function(id){
        if(!id) return;
        var el = document.getElementById(id);
        if(!el) return;
        // cleanSlideDownWrapper(el);
        el.style.display="none";
    }
    this.toggle = function(id){
        if(!id) return;
        var el = document.getElementById(id);
        if(!el) return;
        var elStyle = window.getComputedStyle(el);
        if(elStyle.display == "none") {
            this.show(id);
        } else {
            this.hide(id);
        }
    }
    /* fade in & out */
    this.fadeIn = function(id,speed,el) {
        if(!id && !el) return;
        if(id) el = document.getElementById(id);
        if(!el) return;
        var trans = "all 0.5s ease-in-out";
        if(speed == "fast") trans = "all 0.2s ease-in-out";
        else if(speed == "slow") trans = "all 1.2s ease-in-out";
        el.style.transition = trans;
        el.style.opacity = 0;
        el.style.display="block";
        setTimeout(function() {
            el.style.opacity = 1;
        }, 10);
    }
    this.fadeOut = function(id,speed,el) {
        if(!id && !el) return;
        if(id) el = document.getElementById(id);
        if(!el) return;
        var trans = "all 0.5s ease-in-out";
        if(speed == "fast") trans = "all 0.2s ease-in-out";
        else if(speed == "slow") trans = "all 1.2s ease-in-out";
        el.style.transition = trans;
        setTimeout(function() {
            el.style.opacity = 0;
        }, 10);
        setTimeout(function() {
            el.style.display="none";
            el.style.opacity = 1;
        }, 500);
    }
    this.fadeToggle = function(id,speed) {
        if(!id) return;
        var el = document.getElementById(id);
        if(!el) return;
        var elStyle = window.getComputedStyle(el);
        if(elStyle.display == "none") this.fadeIn(id,speed);
        else this.fadeOut(id,speed);
    }
    this.slideDown = function(id,speed){
        if(!id) return;
        var el = document.getElementById(id);
        if(!el) return;
        if(el.style.display == "block") return;
        //speed
        var trans = "all 0.5s ease-in-out";
        if(speed == "fast") trans = "all 0.2s ease-in-out";
        else if(speed == "slow") trans = "all 0.8s ease-in-out";
        // make wrapper
        var wrapper = document.createElement("div");
        el.parentNode.insertBefore(wrapper,el.nextElementSibling);
        wrapper.appendChild(el);
        //execution
        execDown(wrapper,el,trans);
        //remove Wrapper
        wrapper.addEventListener("webkitTransitionEnd", cleanDown);  // Code for Safari 3.1 to 6.0
        wrapper.addEventListener("transitionend", cleanDown);        // Standard syntax
        function execDown(wrapper, el, trans) {
            wrapper.setAttribute("data-slide-status", "onDown")
            wrapper.style['transition'] = trans;
            wrapper.style['overflow'] = "hidden";
            wrapper.style.maxHeight = "0";
            el.style.display = "block";
            wrapper.style.maxHeight = el.clientHeight + 20 + 'px';
        }
    }
    this.slideUp = function(id,speed) {
        var wrapper;
        if(!id) return;
        var el = document.getElementById(id);
        if(!el) return;
        // set speed
        var trans = "all 0.5s ease-in-out";
        if(speed == "fast") trans = "all 0.2s ease-in-out";
        else if(speed == "slow") trans = "all 0.8s ease-in-out";
        // make wrapper
        var wrapper = document.createElement("div");
        el.parentNode.insertBefore(wrapper,el.nextElementSibling);
        wrapper.appendChild(el);
        //execution
        wrapper.setAttribute("data-slide-status", "onUp");
        wrapper.style['transition'] = trans;
        wrapper.style['overflow'] = "hidden";
        wrapper.style.maxHeight = el.offsetHeight + 'px';
        setTimeout(function() {
            wrapper.style.maxHeight = "0px";
        }, 20);
        //remove Wrapper
        wrapper.addEventListener("webkitTransitionEnd", cleanUp);  // Code for Safari 3.1 to 6.0
        wrapper.addEventListener("transitionend", cleanUp);        // Standard syntax
    }
    this.slideToggle = function(id,speed){
        if(!id) return;
        var el = document.getElementById(id);
        if(!el) return;
        if(el.parentNode.getAttribute("data-slide-status") == "onDown") {
            this.slideUp(id,speed);
        } else if(el.parentNode.getAttribute("data-slide-status") == "onUp") {
            this.slideDown(id,speed);
        } else {
            if(window.getComputedStyle(el).display == 'none') this.slideDown(id,speed);
            else this.slideUp(id,speed);
        }
    }
    /* ----------------------
        Smart Height
    ------------------------- */
    this.smartHeight = function(el) {
        var width, height, ratio, clientWidth, x, i;
        if(el) x = el.getElementsByClassName("as-ratio");
        else x = document.getElementsByClassName("as-ratio");
        clientWidth = document.documentElement.clientWidth;
        for(i = 0; i < x.length; i++){
            width = x[i].getBoundingClientRect().right - x[i].getBoundingClientRect().left;
            if(x[i].getAttribute("data-ratio")){
                ratio = x[i].getAttribute("data-ratio");
                ratio = ratio / 100;
                height = width * ratio;
                height = height + "px";
                x[i].style.height = height;
            }
            if(clientWidth < 768 && x[i].getAttribute("data-md-ratio"))  {
                ratio = x[i].getAttribute("data-md-ratio");
                ratio = ratio / 100;
                height = width * ratio;
                height = height + "px";
                x[i].style.height = height;
            }
        }
    }
    /* ----------------------
        Scroll Events
    ------------------------- */
    this.scrollEvent = function(el){
        var scrollkey, scrollClass, x, i, c;
        if(el) x = el.getElementsByClassName("as-scroll-event");
        else x = document.getElementsByClassName("as-scroll-event");
        for(i = 0; i < x.length; i++) {
            scrollKey = x[i].getAttribute("data-scroll-key");
            scrollClass = x[i].getAttribute("data-scroll-class");
            scrollClass = scrollClass.replace(/ /g,'');
            scrollClass = scrollClass.split(",");
            if(!x[i].getAttribute("data-scroll-key")) return;
            if(x[i].getAttribute("data-scroll-key") == "view") {
              addClassInView(x[i],scrollClass);
              //if(x[i].classList.contains(scrollClass) == false) addClassInView(x[i],scrollClass);
            } else {
              addClassInPixel(x[i],scrollClass,scrollKey);
            }
        }
    }
    /* ----------------------
        Masonry
    ------------------------- */
    this.initMasonry = function(el) {
        var x,i;
        if(el) {
            if(el.classList.contains('as-list-masonry')) setMasonry(el);
            else  x = el.getElementsByClassName('as-list-masonry');
        } else {
            x = document.getElementsByClassName('as-list-masonry');
        }
        if(x.length > 0) {
            for(var i = 0; i < x.length; i++){
                setMasonry(x[i]);
            }
        }
        function setMasonry(el) {
            var totalRows = getMasonryRows(el);
            if(totalRows === null) totalRows = 3;
            if(el.getElementsByTagName('li').length < 1) return;
            for(var i = 0; i < el.getElementsByTagName('li').length; i++){
              el.getElementsByTagName('li')[i].setAttribute('data-order', i);
            }

            for(var i = 0; i < totalRows; i++){
              var wrap = document.createElement('div');
              wrap.className = 'qp-list-wrap';
              el.appendChild(wrap);
            }
            var itemCol = 0;
            var second = 0;
            var listHeight = [];
            for(var i = 0; i < el.getElementsByTagName('li').length; i++){
              document.getElementsByClassName('qp-list-wrap')[itemCol].appendChild(el.getElementsByTagName('li')[0]);
              listHeight[itemCol] = document.getElementsByClassName('qp-list-wrap')[itemCol].offsetHeight;
              //console.log(document.getElementsByClassName('qp-list-wrap')[itemCol].offsetHeight);
              if(itemCol < totalRows - 1 && second == 0){
                itemCol++;
              } else {
                second = 1;
                itemCol = listHeight.indexOf(Math.min.apply(null, listHeight));
              }

            }
        }
        function resetMasonary() {
            var x = document.getElementsByClassName('as-list-masonry');
            for(var i = 0; i < x.length; i++){
                resortMasonry(x[i]);
            }
        }
        function resortMasonry(el) {
            var totalRows = getMasonryRows(el);
            if(totalRows === null) totalRows = 3;
            //init li order
            var liArr = el.getElementsByTagName("li");
            if(liArr.length < 1) return;
            var lis = [];
            for (var i = 0; i < liArr.length; ++i) {
                lis.push(liArr[i]);
            }
            lis.sort(function(a, b) {
                return a.dataset.order.localeCompare(b.dataset.order);
            });
            //End of init li order
            var itemCol = 0;
            for(var k = 0; k < lis.length; k++) {
                el.getElementsByClassName('qp-list-wrap')[itemCol].appendChild(lis[k]);
                if(itemCol < totalRows - 1) itemCol++;
                else itemCol = 0;
            }
        }
        function getMasonryRows(el){
            var totalRows = 4;
            if(el.classList.contains("as-xl1")) {
                totalRows = 1;
            } else if(el.classList.contains("as-xl2")) {
                totalRows = 2;
            } else if(el.classList.contains("as-xl3")) {
                totalRows = 3;
            } else if(el.classList.contains("as-xl4")) {
                totalRows = 4;
            } else if(el.classList.contains("as-xl5")) {
                totalRows = 5;
            } else if(el.classList.contains("as-xl6")) {
                totalRows = 6;
            } else if(el.classList.contains("as-xl7")) {
                totalRows = 7;
            } else if(el.classList.contains("as-xl8")) {
                totalRows = 8;
            }
            if(document.documentElement.clientWidth < 1200) {
                totalRows = 3;
                if(el.classList.contains("as-la1")) {
                    totalRows = 1;
                } else if(el.classList.contains("as-la2")) {
                    totalRows = 2;
                } else if(el.classList.contains("as-la3")) {
                    totalRows = 3;
                } else if(el.classList.contains("as-la4")) {
                    totalRows = 4;
                } else if(el.classList.contains("as-la5")) {
                    totalRows = 5;
                } else if(el.classList.contains("as-la6")) {
                    totalRows = 6;
                }
            }
            if(document.documentElement.clientWidth < 768) {
                totalRows = 2;
                if(el.classList.contains("as-md1")) {
                    totalRows = 1;
                } else if(el.classList.contains("as-md2")) {
                    totalRows = 2;
                } else if(el.classList.contains("as-md3")) {
                    totalRows = 3;
                } else if(el.classList.contains("as-md4")) {
                    totalRows = 4;
                } else if(el.classList.contains("as-md5")) {
                    totalRows = 5;
                } else if(el.classList.contains("as-md6")) {
                    totalRows = 6;
                }
            }
            if(document.documentElement.clientWidth < 576) {
                totalRows = 1;
                if(el.classList.contains("as-sm1")) {
                    totalRows = 1;
                } else if(el.classList.contains("as-sm2")) {
                    totalRows = 2;
                } else if(el.classList.contains("as-sm3")) {
                    totalRows = 3;
                } else if(el.classList.contains("as-sm4")) {
                    totalRows = 4;
                } else if(el.classList.contains("as-sm5")) {
                    totalRows = 5;
                } else if(el.classList.contains("as-sm6")) {
                    totalRows = 6;
                }
            }
            return totalRows;
        }
    }
    /* ----------------------
        Tab
    ------------------------- */
    this.openTab = function() {
    	var e = window.event;
        var btn = findWrap(e.target, 'qp-btn');
        var tab = findWrap(e.target, 'qp-tab');
        var tabHeader = tab.getElementsByClassName("qp-tab-header")[0];
        var tabBody = tab.getElementsByClassName("qp-tab-body")[0];
        var order = 0;
        if(!btn || !tab || !tabHeader || !tabBody) return;
        var x = tabHeader.getElementsByClassName("qp-btn");
    	for(var i = 0; i < x.length; i++){
    		if(x[i] == btn) order = i;
            x[i].classList.remove('as-tab-on')
    	}
        //live content
        var c = tabBody.getElementsByClassName("qp-tab-body-content");
    	for(var i = 0; i < c.length; i++){
            c[i].style.display = "none";
    		if(i == order) {
                c[i].style.display = "block";
            }
    	}
        btn.classList.add('as-tab-on');
    }
    /* ----------------------
        Modal
    ------------------------- */
    this.openModal = function(id){
        //document.body.classList.add('as-noscroll');
        document.documentElement.classList.add('as-noscroll');
        var el = document.getElementById(id);
        var opt;
        el.style.display = "block";

        /* Heihg optimize */
        var winHeight = window.innerHeight;
        var modal = el.querySelector('.qp-modal');
        var header = el.querySelector('.qp-modal-header');
        var body = el.querySelector('.qp-modal-body');
        var footer = el.querySelector('.qp-modal-footer');
        if(!modal || !body) return;
        var modalHeight = modal.offsetHeight + 30;
        var gap = 50;
        if(header) gap += Number(header.offsetHeight);
        if(footer) gap += Number(footer.offsetHeight);
        if(modalHeight > winHeight) body.style.height = winHeight - Number(gap) + 'px';

        el.addEventListener("mousedown", function(e) {
            if(e.target.className == "qp-wrap-modal") {
                opt = 'yes';
            } else {
                opt = null;
            }
        }, false);
        el.addEventListener("click", function(e) {
            if(e.target.className == "qp-wrap-modal") {
                if(opt == 'yes') {
                    qp.closeModal(id);
                    el.removeEventListener("click", function(){});
                    el.removeEventListener("mousedown", function(){});
                }
            }
        }, false);
    }
    this.closeModal = function(id){
        document.documentElement.classList.remove('as-noscroll');
        var el = document.getElementById(id);
        el.style.display = "none";
    }
    /* ----------------------
        Side
    ------------------------- */
    this.openSide = function(id) {
        var content = document.getElementById(id);
        content = content.cloneNode(true);
        content = content.innerHTML;
        var wrapper = document.createElement('DIV');
        var inner = document.createElement('DIV');
        var closer = document.createElement('SPAN');
        wrapper.classList.add('as-md-only');
        wrapper.style.position = 'fixed';
        wrapper.style.top = '0';
        wrapper.style.left = '0';
        wrapper.style.width = '100%';
        wrapper.style.height = '100%';
        wrapper.style.zIndex = '9999';
        inner.style.position = 'absolute';
        inner.style.height = '100%';
        inner.style.width = window.innerWidth - 97 + 'px';
        inner.style.paddingLeft = '20px';
        inner.style.paddingTop = '20px';
        inner.style.left = '100%';
        inner.innerHTML = content;
        inner.style.backgroundColor = '#ffffff';

        // 닫기 버튼
        closer.innerHTML = '&times;';
        closer.classList.add('as-absolute','as-text-black','as-pointer','as-large');
        closer.style.top='20px';
        closer.style.right = '20px';
        closer.addEventListener('click',function(){
            //removeMenu(this);
            moveOut(inner);
        });

        wrapper.addEventListener('click',function(){
            var e = e || window.event;
            if(e.target !== wrapper) return;
            moveOut(inner);
        });

        inner.appendChild(closer);
        wrapper.appendChild(inner);
        document.body.appendChild(wrapper);
        moveIn(inner);
        function removeSide(el){
            var wrap;
            if(el.classList.contains('qp-nav-md')) wrap = el;
            else wrap = el.parentNode;
            if(wrap.classList.contains('qp-nav-md') == false) return;
            var inner = wrap.getElementsByClassName('qp-nav-md-inner')[0];
            moveOut(inner);
            //wrap.parentNode.removeChild(wrap);
        }
        function moveOut(el) {
          var wrapper = el.parentNode;
          wrapper.style.backgroundColor = 'rgba(0,0,0,0)';
          var pos = 100;
          var ops = 0.3;
          var id = setInterval(frame, .5);
          var win = window.innerWidth;
          function frame() {
            if (pos > win) {
              clearInterval(id);
              wrapper.parentNode.removeChild(wrapper);
            } else {
              pos = pos + 3;
              if(ops > 0) ops = ops - .005;
              el.style.left = pos + 'px';
              wrapper.style.backgroundColor = 'rgba(0,0,0,'+ops+')';
            }
          }
        }
        function moveIn(el) {
          var wrapper = el.parentNode;
          var win = window.innerWidth;
          var pos = win;
          var ops = 0;
          var id = setInterval(frame, 1);
          var win = window.innerWidth;
          function frame() {
            if (pos <= 100) {
              clearInterval(id);
              //wrapper.style.backgroundColor = 'rgba(0,0,0,0.5)';
            } else {
              pos = pos - 4;
              if(ops < 0.3) ops = ops + .005;
              el.style.left = pos + 'px';
              wrapper.style.backgroundColor = 'rgba(0,0,0,'+ops+')';
              //wrapper.style.opacity = ops;
            }
          }
        }
    }
    /* ----------------------
        Dropdown
    ------------------------- */
    this.initDropdownClick = function(el) {
        var x, i;
        if(el) x = el.getElementsByClassName("qp-dropdown2");
    	else x = document.getElementsByClassName("qp-dropdown2");
    	for(i = 0; i < x.length; i++) {
            x[i].addEventListener("click", function(e){
                e.stopPropagation();
                qp.closeAllDropdowns(e);
                openDropdown(e);
            });
    	}
        function openDropdown(e) {
            var dropzone = findWrap(e.target, "qp-dropdown2");
            if(dropzone) {
                var dpContents = dropzone.getElementsByClassName("qp-dropdown-content")[0];
                if(dpContents.style.display == "block") {
                    dpContents.style.display = "none";
                } else {
                   dpContents.style.display = "block";
                   dpContents.style.position = "fixed";
                   qp.repositionDropdown();
                }
            }
        }
    }
    this.repositionDropdown = function() {
        var content = document.querySelectorAll('.qp-dropdown-content[style*="display: block"]')[0];
        if(!content) return;
        var wrapper = findWrap(content, "qp-dropdown2");
        if(!wrapper) return;
        content.style.minWidth = wrapper.offsetWidth + "px";
        content.style.top = wrapper.getBoundingClientRect().top + wrapper.offsetHeight +  'px';
        content.style.left = wrapper.getBoundingClientRect().left + 'px';
        var gap = content.getBoundingClientRect().right - window.innerWidth;
        if(gap > 0) {
            content.style.marginLeft = - gap + 'px';
        }
    }
    this.closeAllDropdowns = function(e){
        if(!e.target) return;
        var x = document.getElementsByClassName("qp-dropdown-content");
        if(x.length < 1) return;
        // if(findWrap(e.target, "qp-dropdown2")) return;
        for (var i = 0; i < x.length; i++) {
          if (x[i].style.display == "block") {
            x[i].style.display = "none";
          }
        }
    }
    this.closeResMenu = function(e){
        if(!e.target || e.target.tagName == "HTML") return;
        var x = document.getElementsByClassName("as-nav-responsive");
        if(x.length < 1) return;
        if(findWrap(e.target, "as-nav-responsive")) return;
        if(findWrap(e.target, "qp-md-menu")) return;
        for (var i = 0; i < x.length; i++) {
            x[i].getElementsByTagName("UL")[0].classList.remove("as-md-block");
          // if (x[i].getElementsByTagName("UL")[0].style.display == "block") {
          //   x[i].getElementsByTagName("UL")[0].style.display = "none";
          // }
        }
    }
    /* ----------------------
        Slide show
    ------------------------- */
    this.initSlide = function(el) {
        if(el) {
            if(el.classList.contains("qp-slide")) {
                addSlideEvents(el);
            } else {
                var x = el.getElementsByClassName("qp-slide");
            }
        } else {
            var x = document.getElementsByClassName("qp-slide");
        }
        var left = [];
        var right = [];
        if(x) {
            for(var i = 0; i < x.length; i++) {
                addSlideEvents(x[i])
            }
        }
        function addSlideEvents(el) {
            // add event for draging
            el.addEventListener('mousedown', function(e) {
                dragSlide(this,e);
            }, false);
            // add event for swiping
            el.addEventListener('touchstart', function(e) {
                swipeSlide(this,e);
            }, false);
            el.getElementsByClassName("qp-slide-left")[0].addEventListener('click', function() {
                clickSlide(this, "toRight");
            }, false);
            el.getElementsByClassName("qp-slide-right")[0].addEventListener('click', function() {
                clickSlide(this, "toLeft");
            }, false);
            if(el.getAttribute("data-slide-auto")) {
                autoSlide(el);
            }
            // indicators
            var indicators = el.getElementsByClassName("qp-slide-indicator");
            var d = 0;
            for(d = 0; d < indicators.length; d++) {
                if(d === 0) {
                    indicators[d].classList.add("as-indicator-on");
                }
                indicators[d].setAttribute('data-slide-target', d);
                indicators[d].addEventListener('click', function() {
                    gotoSlide(this);
                }, false);
            }
        }
        function autoSlide(el) {
            var direction = "toLeft";
            var intervalId = setInterval(autoSlideMove, 3000, el, direction);
            el.setAttribute("data-slide-autoId", intervalId);
        }
        function autoSlideMove(el, direction) {
            var slider = new SetSlide(el, direction);
            if(slider.itemCount < 2) return; // if slide item < 2 stop
            if(direction == "toRight" && slider.prev === null) return; // go to right and no prev -> stop
            if(direction == "toLeft"  && slider.next === null) return; // go to left and no next -> stop
            setTimeout(function() { //delay some time, to prevent double click...
                slider.moveSlide(direction);
            }, 10);
        }
        function checkAutoSlide(el){
            var slide = findSlide(el);
            var intervalId = slide.getAttribute("data-slide-autoId");
            if(intervalId) clearInterval(intervalId);
        }
        function swipeSlide(el,e) {
            //console.log('sw:' + e.target.className);
            checkAutoSlide(el); // stop auto moving if this has the option
            if(e.target.className.match(/qp-slide-left|qp-slide-right|qp-btn|qp-slide-indicator|qp-slide-bottom/g)) {
               return;
            } else {
                var upKey = 1; // mouseup working
                var slider = new SetSlide(el, null);
                if(slider.itemCount < 2) return; // if slide item < 2 stop
                var nowX = 0, movedX = 0, nowY =0, movedY = 0;
                nowX = e.changedTouches[0].screenX;
                nowY = e.changedTouches[0].screenY;
                slider.current.ontouchmove = function(event) { // Do whenever mouse move
                    e = event || window.event;
                    movedX = nowX - e.changedTouches[0].screenX;
                    nowX = e.changedTouches[0].screenX;
                    movedY = nowY - e.changedTouches[0].screenY;
                    //nowY = e.changedTouches[0].screenY;
                    if(movedX < 0 && slider.prev === null) return;
                    if(movedX > 0 && slider.next === null) return;
                    if(Math.abs(movedY) > 10) return; // if the touch action is scroll down or up
                    //console.log(movedY);
                    slider.dragSlide(movedX);
                    return false;
                }
                document.ontouchend = function(event) {
                    if(upKey) {
                        slider.current.onmousemove = null;
                        var direction;
                        if(Math.abs(slider.current.offsetLeft) > 10) {
                            if(slider.current.offsetLeft > 0) {
                                direction = "toRight";
                            } else {
                                direction = "toLeft";
                            }
                        } else {
                            direction = "none";
                        }
                        slider.moveSlide(direction);
                        upKey = 0; //init mouseup working
                    } // if(upkey)
                } //document.onmouseup
            } // else
        }
        function clickSlide(el, direction) {
            checkAutoSlide(el); // stop auto moving if this has the option
            var slider = new SetSlide(el, direction);
            if(slider.itemCount < 2) return; // if slide item < 2 stop
            if(direction == "toRight" && slider.prev === null) return; // go to right and no prev -> stop
            if(direction == "toLeft"  && slider.next === null) return; // go to left and no next -> stop
            setTimeout(function() { //delay some time, to prevent double click...
                slider.moveSlide(direction);
            }, 10);
        }
        function gotoSlide(el) {
            checkAutoSlide(el); // stop auto moving if this has the option
            var direction;
            var slideInfo = new GetSlide(el);
            var target = el.getAttribute("data-slide-target");
            if(slideInfo.currentNum < target) direction = "toLeft";
            else if(slideInfo.currentNum > target) direction = "toRight";
            else direction = "none";
            var slider = new SetSlide(el, direction);
            if(slider.itemCount < 2) return; // if slide item < 2 stop
            if(direction == "toRight" && slider.prev === null) return; // go to right and no prev -> stop
            if(direction == "toLeft"  && slider.next === null) return; // go to left and no next -> stop
            setTimeout(function() { //delay some time, to prevent double click...
                slider.moveSlide(direction);
            }, 10);
        }
        /* Mouse click & drag function */
        function dragSlide(el,e) {
            checkAutoSlide(el); // stop auto moving if this has the option
            if(findWrap(e.target, 'qp-slide-left')) return;
            if(findWrap(e.target, 'qp-slide-right')) return;
            if(e.target.className.match(/qp-slide-left|qp-slide-right|qp-btn|qp-slide-indicator|qp-slide-bottom/g)) {
               return;
            } else {
                var upKey = 1; // mouseup working
                var slider = new SetSlide(el, null);
                if(!slider) return;
                if(slider.itemCount < 2) return; // if slide item < 2 stop
                var nowX = 0, movedX = 0;
                nowX = window.event.clientX;
                if(!slider.current) return;
                slider.current.onmousemove = function(event) { // Do whenever mouse move
                    e = event || window.event;
                    movedX = nowX - e.clientX;
                    nowX = e.clientX;
                    // console.log(slider.slide.offsetLeft + '-' + e.clientX);
                    // if(e.clientX < slider.slide.offsetLeft) return;
                    if(movedX < 0 && slider.prev === null) return;
                    if(movedX > 0 && slider.next === null) return;
                    slider.dragSlide(movedX);
                    return false;
                }
                slider.current.onmouseout = function(event) {
                    execSlide();
                };
                slider.current.onmouseup = function(event) {
                    execSlide();
                } //document.onmouseup
                function execSlide() {
                    if(upKey) {
                        slider.current.onmousemove = null;
                        var direction;
                        if(Math.abs(slider.current.offsetLeft) > 10) {
                            if(slider.current.offsetLeft > 0) {
                                direction = "toRight";
                            } else {
                                direction = "toLeft";
                            }
                        } else {
                            direction = "none";
                        }
                        slider.moveSlide(direction);
                        upKey = 0; //init mouseup working
                    } // if(upkey)
                }
            } // else
        }
        // Core class
        function GetSlide(el) {
            var slide = findSlide(el);
            var current, next, prev;
            var x = slide.getElementsByClassName("qp-slide-item");
            var xi = slide.getElementsByClassName("qp-slide-indicator");
            if(x.length > 1) {
                for(i = 0; i < x.length; i++) {
                    if(x[i].offsetLeft === 0) {
                        current = i;
                        next = i + 1;
                        prev = i - 1;
                        if(next == x.length) next = 0;
                        if(prev < 0) prev = x.length - 1;
                    }
                    if(x[i].classList.contains("as-transition")) x[i].classList.remove("as-transition");
                 }
            } else {
                throw "Not enough slide items";
            }
            if(xi.length > 0 && x.length != xi.length) throw "The numbers of indicator dont match2";
            //if click indicators
            if(el.classList.contains("qp-slide-indicator")) {
                var target = el.getAttribute("data-slide-target");
                if(target > current) next = target;
                else if(target < current) prev = target;
            }
            this.slide = slide;
            this.itemCount = x.length;
            this.indicatorCount = xi.length;
            this.currentNum = current;
            this.nextNum = next;
            this.prevNum = prev;
            this.itemArr = x;
            this.indicatorArr = xi;
        }
        // extended class
        function SetSlide(el, direction) {
            GetSlide.apply(this,arguments);
            this.current = this.itemArr[this.currentNum];
            this.next = this.itemArr[this.nextNum];
            this.prev = this.itemArr[this.prevNum];
            if(this.indicatorArr.length > 0) {
                this.currentIndicator = this.indicatorArr[this.currentNum];
                this.nextIndicator = this.indicatorArr[this.nextNum];
                this.prevIndicator = this.indicatorArr[this.prevNum];
            }
            if(this.nextNum == this.prevNum) {
                if(direction == "toLeft") this.prev = null;
                if(direction == "toRight") this.next = null;
            }
            if(direction === null) { // if drag or swipe
                if(this.itemCount === 2 && this.currentNum === 0) this.prev = null;
                if(this.itemCount === 2 && this.currentNum === 1) this.next = null;
            }
            if(this.next) this.next.style.left = "100%";
            if(this.prev) this.prev.style.left = "-100%";
        }
        SetSlide.prototype.dragSlide = function(movedX) {
            if(this.current) this.current.style.left = (this.current.offsetLeft - movedX) + "px";
            if(this.next) this.next.style.left = (this.next.offsetLeft - movedX) + "px";
            if(this.prev) this.prev.style.left = (this.prev.offsetLeft - movedX) + "px";
            return false;
        }
        SetSlide.prototype.moveSlide = function(direction) {
            if(this.currentIndicator) {
                if(this.currentIndicator.classList.contains("as-indicator-on")) this.currentIndicator.classList.remove("as-indicator-on");
            }
            if(direction == "toRight") {
                if(this.prev) {
                    this.prev.classList.add("as-transition");
                    this.prev.style.left = 0;
                }
                if(this.current) {
                    this.current.classList.add("as-transition");
                    this.current.style.left = "100%";
                }
                if(this.prevIndicator) this.prevIndicator.classList.add("as-indicator-on");
                    //this.next.style.left = "100%";
            } else if(direction == "toLeft") {
                if(this.next) {
                    this.next.classList.add("as-transition");
                    this.next.style.left = 0;
                }
                if(this.current) {
                    this.current.classList.add("as-transition");
                    this.current.style.left = "-100%";
                }
                if(this.nextIndicator) this.nextIndicator.classList.add("as-indicator-on");
                //this.prev.style.left = "100%";
            } else {
                if(this.next) this.next.style.left = "100%";
                if(this.current) this.current.style.left = 0;
                if(this.currentIndicator) this.currentIndicator.classList.add("as-indicator-on");
                if(this.prev) this.prev.style.left = "-100%";
            }
        }
        function findSlide(el){
          while (el.classList.contains("qp-slide") === false) {
              el = el.parentNode;
              if (!el) {
                  return null;
              }
          }  return el;
        }
    }
    /* ----------------------
        MD navigation
    ------------------------- */
    this.initMdMenu = function(el) {
        var btn;
        if(el) btn = el.getElementsByClassName('qp-md-menu')[0];
        else btn = document.getElementsByClassName('qp-md-menu')[0];
        if(btn) {
            btn.addEventListener("click",function(){
                openMdNav();
            });
        }
        function openMdNav(){
            var nav = document.getElementsByClassName('as-nav-responsive')[0];
            if(!nav) return;
            var menu = nav.getElementsByTagName('UL')[0];
            if(!menu) return;
            menu.classList.add("as-animate-left");
            //menu.style.display = "block";
            menu.className += " as-md-block";
            var closeBtn = document.createElement('Button');
            closeBtn.classList.add("qp-btn","as-btn-parent", "as-absolute");
            closeBtn.setAttribute("id","btnMdNavClose");
            closeBtn.className += " as-md-only";
            closeBtn.innerHTML = "X";
            closeBtn.style.top = "5px";
            closeBtn.style.left = "20px";
            closeBtn.style.zIndex = "99999";
            menu.appendChild(closeBtn);
            closeBtn.addEventListener("click",closeMdNav);
        }
        function closeMdNav(){
            var nav = document.getElementsByClassName('as-nav-responsive')[0];
            if(!nav) return;
            var menu = nav.getElementsByTagName('UL')[0];
            if(!menu) return;
            //menu.style.display = "none";
            menu.classList.remove('as-md-block');
            var closeBtn = document.getElementById('btnMdNavClose');
            if(closeBtn) closeBtn.parentNode.removeChild(closeBtn);
        }
    }
    /* ----------------------
        qp-image
    ------------------------- */
    this.initImage = function() {
        var img, width, height, contents, caption;
        var x = document.getElementsByClassName("qp-image");
        if(!x) return;
        for(var i = 0; i < x.length; i++) {
            img = x[i].getElementsByTagName("IMG")[0]
            contents = x[i].getElementsByClassName("qp-image-inside")[0];
            caption = x[i].getElementsByClassName("qp-image-caption")[0];
            if(contents) {
                contents.style.width = img.offsetWidth + "px";
                contents.style.height = img.offsetHeight + "px";
            }
            if(caption) caption.style.width = img.offsetWidth + "px";
        }
    }
    /* ----------------------
        etc, utils show
    ------------------------- */
    this.setBrowserType = function(el) {
        var ieVersion, body;
    	ieVersion = getIeVersion();
        if(el) body = el.getElementsByTagName("body")[0];
    	else body = document.getElementsByTagName("body")[0];
    	if(body && ieVersion > 0 && ieVersion < 10) {
    		body.className += "qp-ie9";
    	}
    }
    /* ----------------------
        Input, Form
    ------------------------- */
    this.checkQradio = function(el,activeClass){
        if(el == null) return;
        if(!el.value) el.value = el.getAttribute('value');
        var wrapper, btns, activeClass;
        if(!activeClass) activeClass = 'as-main';
        wrapper = getWrapClass(el, 'qp-qradio');
        if(wrapper == null) return;
        wrapper.getElementsByTagName('INPUT')[0].value = el.value;
        btns = wrapper.querySelectorAll('BUTTON, .qp-qradio-btn');
        for(var i = 0; i < btns.length; i++) {
            if(btns[i].classList.contains(activeClass)) btns[i].classList.remove(activeClass);
        }
        el.classList.add(activeClass);
    }
    this.setValueQradio = function(id, value, activeClass) {
        // if(value == null) return;
        if(activeClass == null) var activeClass = 'as-main';
        var wrapper = document.getElementById(id);
        wrapper.getElementsByTagName('INPUT')[0].value = value;
        var btns = wrapper.querySelectorAll('BUTTON, .qp-qradio-btn');
        for(var i = 0; i < btns.length; i++) {
            if(btns[i].classList.contains(activeClass)) btns[i].classList.remove(activeClass);
            if(btns[i].value == value) btns[i].classList.add(activeClass);
        }
    }
    this.getValueQradio = function(id) {
        if(id == null) return;
        var wrapper = document.getElementById(id);
        if(wrapper == null || wrapper == 'undefined') return;
        return wrapper.getElementsByTagName('INPUT')[0].value;
    }
    this.initSwipe = function() {
        var x = document.getElementsByClassName('qp-swipe');
        for(var i = 0; i < x.length; i ++) {
            addSwipeEvent(x[i]);
        }
        function addSwipeEvent(el) {
            var target = el.getElementsByClassName('qp-inner')[0];
            if(!target) return;
            target.addEventListener('touchstart', function(e) {
                moveEl(this,e);
            }, false);
            function moveEl(target,e){
                var nowX = e.changedTouches[0].screenX;
                var maxX = target.offsetWidth - target.parentNode.offsetWidth;
                if(target.parentNode.getAttribute('data-swipe-right')) maxX = maxX + Number(target.parentNode.getAttribute('data-swipe-right'));
                var nowLeft, nowRight;
                target.addEventListener("touchmove", function(event){
                    // console.log(window.getComputedStyle(this, "").getPropertyValue("left"));
                    // return;
                    nowLeft = parseInt(window.getComputedStyle(this, "").getPropertyValue("left"), 10);
                    nowRight = parseInt(window.getComputedStyle(this, "").getPropertyValue("right"), 10);
                    //console.log(nowLeft)
                    e = event || window.event;
                    movedX = nowX - e.changedTouches[0].screenX;
                    nowX = e.changedTouches[0].screenX;
                    if(movedX > 0) {
                        //console.log('왼쪽으로');
                        if(nowLeft < - (maxX)) return;
                        this.style.left = nowLeft + -5 + 'px';
                    } else {
                        if(nowLeft > 0) return;
                        this.style.left = nowLeft + 5 + 'px';
                        //console.log(this.style.left );
                    }
                    return false;
                });
            }
        }
    }
    this.swiperObj = [];
    this.initSwiper = function() {
        if(this.swiperObj.length > 0) {
            for(var i = 0; i < this.swiperObj.length; i++) {
                this.swiperObj[i].destroy(); // method of swiper js
            }
        }
        //swiper.js
        let effect, arrow, bullet, pagination, perview, block, auto, gap, color, arrowColor, bulletColor;
        let x = document.getElementsByClassName('swiper-container');
        for(var i = 0; i < x.length; i++) {
            block = x[i].parentNode;
            effect = block.getAttribute('data-effect');
            arrow = block.getAttribute('data-arrow');
            bullet = block.getAttribute('data-bullet');
            perView = block.getAttribute('data-perview');
            perViewMd = block.getAttribute('data-perview-md');
            perViewSm = block.getAttribute('data-perview-sm');
            auto = block.getAttribute('data-auto');
            gap = block.getAttribute('data-gap');
            color = block.getAttribute('data-color');
            bulletColor = 'as-white';
            arrowColor = 'as-text-white';
            if(color) {
                arrowColor = 'as-text-' + color;
                bulletColor = 'as-' + color;
            }
            if(!perView) perView =1;
            if(!perViewMd) perViewMd =1;
            if(!perViewSm) perViewSm =1;

            var config = [];
            if(gap) config.spaceBetween = 20;
            if(auto) {
                config.autoplay = true;
                // builder editing mode일때 작동 중지
                var canvas = document.getElementById('canvas');
                if(canvas) {
                    if(canvas.getAttribute('data-mode') == 'edit') config.autoplay = false;
                }
            }
            if(effect) config.effect = effect;
            if(arrow == 'yes') {
                x[i].getElementsByClassName('swiper-button-next')[0].style.display = 'block';
                x[i].getElementsByClassName('swiper-button-prev')[0].style.display = 'block';
                config.navigation = {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                }

                let nextBtn = x[i].getElementsByClassName('swiper-button-next')[0];
                let prevBtn = x[i].getElementsByClassName('swiper-button-prev')[0];
                if(nextBtn && prevBtn) {
                    nextBtn.firstChild.classList.add(arrowColor);
                    prevBtn.firstChild.classList.add(arrowColor);
                }

            } else {
                x[i].getElementsByClassName('swiper-button-next')[0].style.display = 'none';
                x[i].getElementsByClassName('swiper-button-prev')[0].style.display = 'none';
            }
            if(bullet == 'yes') {
                config.pagination = {
                    el:'.swiper-pagination',
                    clickable: true,
                    bulletActiveClass : bulletColor + ' as-opacity-none',
                }
            } else {
                x[i].querySelector('.swiper-pagination').style.display = 'none';
            }
            config.slidesPerView = perViewSm;
            config.breakpoints = {
                600: {
                  slidesPerView: perViewMd,
                },
                1200: {
                  slidesPerView: perView,
                },
            }

            this.swiperObj[i] = new Swiper(x[i], config);


            // if(arrow == 'yes') {
            //     console.log(arrow);
            //     this.swiperObj[i].navigation.nextEl = '.swiper-button-next';
            //     this.swiperObj[i].navigation.prevEl = '.swiper-button-prev';
            // }
        }
    }
    this.initAppForm = function() {
        var x = document.getElementsByClassName('app-form-simple');
        for(var i = 0; i < x.length; i++) {
            var t = x[i].getElementsByClassName('qp-input');
            for(var k = 0; k < t.length; k++) {
                if(t[k].value) t[k].classList.add('has-value');
                t[k].addEventListener('change',function(e){
                    if(this.value) this.classList.add('has-value');
                    else this.classList.remove('has-value');
                });
            }
        }
    }
    this.initNav = function(el) {
        if(el) var x = el.getElementsByClassName('qp-nav-bars');
        else var x = document.getElementsByClassName('qp-nav-bars');
        for(var i = 0; i < x.length; i++) {
            x[i].addEventListener('click',function(){
                liveMenu(this);
            });
        }
        function liveMenu(menu) {
            var nav = menu.parentNode;
            if(nav.classList.contains('qp-nav') == false) return;
            var clone = nav.cloneNode(true);
            var cloneBtn = clone.getElementsByClassName('qp-nav-bars')[0];
            cloneBtn.parentNode.removeChild(cloneBtn);
            var content = clone.innerHTML;
            var wrap = document.createElement('DIV');
            var inner = document.createElement('DIV');
            var closer = document.createElement('SPAN');
            // 닫기 버튼
            closer.innerHTML = '&times;';
            closer.classList.add('as-absolute','as-text-black','as-pointer','as-large');
            closer.style.top='20px';
            closer.style.right = '20px';
            closer.addEventListener('click',function(){
                removeMenu(this);
            });
            // 내부 컨텐츠
            inner.classList.add('qp-nav-md-inner','as-white','as-border-left');
            inner.style.position = 'absolute';
            inner.style.height = '100%';
            inner.style.width = '100%';
            inner.style.paddingLeft = '20px';
            inner.style.paddingTop = '40px';
            inner.style.left = '100%';
            inner.innerHTML = content;

            // wrapper
            wrap.classList.add('as-fixed','qp-nav-md');
            wrap.style.width = '100%';
            wrap.style.height = '100%';
            wrap.style.top = 0;
            wrap.style.right = 0;
            wrap.style.paddingLeft = '100px';
            wrap.style.zIndex = '9';
            wrap.style.setProperty('pointer-events', 'auto');
            wrap.addEventListener('click',function(){
                var e = e || window.event;
                if(e.target !== wrap) return;
                removeMenu(wrap);
            });

            wrap.appendChild(inner);
            wrap.appendChild(closer);
            document.getElementsByTagName('BODY')[0].appendChild(wrap);
            moveIn(inner);
        }
        function removeMenu(el){
            var wrap;
            if(el.classList.contains('qp-nav-md')) wrap = el;
            else wrap = el.parentNode;
            if(wrap.classList.contains('qp-nav-md') == false) return;
            var inner = wrap.getElementsByClassName('qp-nav-md-inner')[0];
            moveOut(inner);
            //wrap.parentNode.removeChild(wrap);
        }
        function moveOut(el) {
          var wrapper = el.parentNode;
          wrapper.style.backgroundColor = 'rgba(0,0,0,0)';
          var pos = 100;
          var ops = 0.3;
          var id = setInterval(frame, .5);
          var win = window.innerWidth;
          function frame() {
            if (pos > win) {
              clearInterval(id);
              wrapper.parentNode.removeChild(wrapper);
            } else {
              pos = pos + 3;
              if(ops > 0) ops = ops - .005;
              el.style.left = pos + 'px';
              wrapper.style.backgroundColor = 'rgba(0,0,0,'+ops+')';
            }
          }
        }
        function moveIn(el) {
          var wrapper = el.parentNode;
          var win = window.innerWidth;
          var pos = win;
          var ops = 0;
          var id = setInterval(frame, 1);
          var win = window.innerWidth;
          function frame() {
            if (pos < 100) {
              clearInterval(id);
              //wrapper.style.backgroundColor = 'rgba(0,0,0,0.5)';
            } else {
              pos = pos - 3;
              if(ops < 0.3) ops = ops + .005;
              el.style.left = pos + 'px';
              wrapper.style.backgroundColor = 'rgba(0,0,0,'+ops+')';
              //wrapper.style.opacity = ops;
            }
          }
        }
    }
    this.animateCss = function(el) {
        if(el) var x = el.getElementsByClassName("animate__animated");
        else var x = document.getElementsByClassName("animate__animated");
        var animateClass;
        for(i = 0; i < x.length; i++) {
            animateClass = x[i].getAttribute("data-animate-class");
            if(isInViewport(x[i])) {
                 if(x[i].classList.contains(animateClass) == false) {
                     x[i].classList.add(animateClass);
                 }
            }
            if(isBelowViewport(x[i])) x[i].classList.remove(animateClass);
        }

    }
    this.responsive = function(el = null) {
        fontSize(el);
        lineHeight(el);

        function fontSize(el = null){
            var sizes;
            if(el) {
                sizes = el.getAttribute('data-fontsize');
                if(sizes) el.style.fontSize = getSize(sizes);
                return;
            }
            var x = document.querySelectorAll('[data-fontsize]');
            for(var i =0; i < x.length; i++) {
                sizes = x[i].getAttribute('data-fontsize');
                x[i].style.fontSize = getSize(sizes);
            }
        }
        function lineHeight(el = null){
            var sizes;
            if(el) {
                sizes = el.getAttribute('data-lineheight');
                if(sizes) el.style.lineHeight = getSize(sizes);
                return;
            }
            var x = document.querySelectorAll('[data-lineheight]');
            for(var i =0; i < x.length; i++) {
                sizes = x[i].getAttribute('data-lineheight');
                x[i].style.lineHeight = getSize(sizes);
            }
        }
        function getSize(str) {
            var farr = str.split(',');
            if(farr.length == 1) return farr[0];
            if(farr.length == 2) {
                if(window.innerWidth < qp.brPoint.la) return farr[1];
                else return farr[0];
            }
            if(farr.length == 3) {
                if(window.innerWidth < qp.brPoint.md) return farr[2];
                else if(window.innerWidth < qp.brPoint.la) return farr[1];
                else return farr[0];
            }
            if(farr.length == 4) {
                if(window.innerWidth < qp.brPoint.sm) return farr[3];
                else if(window.innerWidth < qp.brPoint.md) return farr[2];
                else if(window.innerWidth < qp.brPoint.la) return farr[1];
                else return farr[0];
            }
            return null;
        }
    }
    /* ----------------------
        Inner Functions
    ------------------------- */
    function cleanDown() {
        this.parentNode.insertBefore(this.firstChild,this.nextElementSibling);
        this.parentNode.removeChild(this);
        console.log("end");
    }
    function cleanUp() {
        this.firstChild.style.display = "none";
        this.parentNode.insertBefore(this.firstChild,this.nextElementSibling);
        this.parentNode.removeChild(this);
    }
    function cleanSlideDownWrapper(el) {
        var parent = el.parentNode;
        if(parent.getAttribute("data-slide-status") == "onDown"){
            parent.parentNode.insertBefore(parent.firstChild,parent.nextElementSibling);
            parent.parentNode.removeChild(parent);
            return "down";
        }
        if(parent.getAttribute("data-slide-status") == "onUp") {
            parent.parentNode.insertBefore(parent.firstChild,parent.nextElementSibling);
            parent.parentNode.removeChild(parent);
            return "up";
        }
        return null;
    }
    function getHeight(el) {
        var el_style      = window.getComputedStyle(el),
            el_display    = el_style.display,
            el_position   = el_style.position,
            el_visibility = el_style.visibility,
            el_max_height = el_style.maxHeight.replace('px', '').replace('%', ''),
            wanted_height = 0;
        // if its not hidden we just return normal height
        if(el_display !== 'none' && el_max_height !== '0') {
            return el.offsetHeight;
        }
        // the element is hidden so:
        // making the el block so we can meassure its height but still be hidden
        el.style.position   = 'absolute';
        el.style.visibility = 'hidden';
        el.style.display    = 'block';
        wanted_height     = el.offsetHeight;
        // reverting to the original values
        el.style.display    = el_display;
        el.style.position   = el_position;
        el.style.visibility = el_visibility;
        return wanted_height;
    }
    function getIeVersion () {
    	 var word;
    	 var agent = navigator.userAgent.toLowerCase();
    	 // IE old version ( IE 10 or Lower )
    	 if ( navigator.appName == "Microsoft Internet Explorer" ) word = "msie ";
    	 // IE 11
    	 else if ( agent.search( "trident" ) > -1 ) word = "trident/.*rv:";
    	 // Microsoft Edge
    	 else if ( agent.search( "edge/" ) > -1 ) word = "edge/";
    	 //  If it's not IE or Edge
    	 else return -1;
    	 var reg = new RegExp( word + "([0-9]{1,})(\\.{0,}[0-9]{0,1})" );
    	 if (  reg.exec( agent ) != null  ) return parseFloat( RegExp.$1 + RegExp.$2 );
    	 return -1;
    }
    function setBrowserType(el) {
        var ieVersion, body;
    	ieVersion = getIeVersion();
        if(el) body = el.getElementsByTagName("body")[0];
    	else body = document.getElementsByTagName("body")[0];
    	if(ieVersion > 0 && ieVersion < 10) {
    		body.className += "qp-ie9";
    	}
    }
    function scrollAnimate(elem, style, unit, from, to, time, prop) {
        if (!elem) {
            return;
        }
        var start = new Date().getTime(),
            timer = setInterval(function () {
                var step = Math.min(1, (new Date().getTime() - start) / time);
                if (prop) {
                    elem[style] = (from + step * (to - from))+unit;
                } else {
                    elem.style[style] = (from + step * (to - from))+unit;
                }
                if (step === 1) {
                    clearInterval(timer);
                }
            }, 10);
        if (prop) {
              elem[style] = from+unit;
        } else {
              elem.style[style] = from+unit;
        }
    }
    function addClassInView(el,classes) {
        if(isInViewport(el)) {
            for(var i = 0; i < classes.length; i++) {
                if(el.classList.contains(classes[i]) == false) el.classList.add(classes[i]);
            }
            el.style.opacity = '1';
        }

        if(isBelowViewport(el)) {
            for(var i = 0; i < classes.length; i++) {
                el.classList.remove(classes[i]);
            }
            el.style.opacity = '0';
        }
    }
    function addClassInPixel(el,classes,pixel) {
        if(window.pageYOffset > pixel) {
            for(var i = 0; i < classes.length; i++) {
                el.classList.add(classes[i]);
            }
        } else {
            for(var i = 0; i < classes.length; i++) {
                el.classList.remove(classes[i]);
            }
        }
    }
    function isInViewport(el) {
      var rect = el.getBoundingClientRect();
      var html = document.documentElement;
      var rectHeight = rect.bottom - rect.top;
      var realBottom =  rect.top + (rectHeight/3);
      //console.log('clientHeight:'+ html.clientHeight + '//' + 'rect.top:' + rect.top + '//' + 'rect.bottom:' + rect.bottom);
      //if(rect.top <= html.clientHeight && rect.bottom >= 0 && rect.left >= 0) {
      // if(rect.top <= html.clientHeight &&  rect.left >= 0) {
      if(rect.top <= html.clientHeight) {
        return true;
      } else  {
            return false;
      }
    }
    function isBelowViewport(el) {
      var rect = el.getBoundingClientRect();
      var html = document.documentElement;
      var point = html.clientHeight + 100;
      if(rect.top > point) return true;
      return false;
    }
    function findWrap(el, wrap){
      while (el.classList.contains(wrap) === false) {
          if (el.tagName == "BODY") {
              return null;
          }
          el = el.parentNode;
          if (!el || el.tagName == "BODY") {
              return null;
          }
      }  return el;
    }
    function getWrapClass(el, wrapClass){
        if(!wrapClass) return null;
        if(!el) return null;
        while (el.classList.contains(wrapClass) === false) {
            if (el.tagName == "BODY") {
                return null;
            }
            el = el.parentNode;
            if (!el || el.tagName == "BODY") {
                return null;
            }
        }  return el;
    }
}
