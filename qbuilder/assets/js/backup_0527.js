
function initBuilder(config) {
    if(config['docId'] === null) return;
    if(config['src'] === null) return;
    if(config['builderPath'] === null) return;
    let doc = document.getElementById(config['docId']);
    let iframe = document.createElement('iframe');
    document.body.style.overflow = 'hidden';
    iframe.src = config['src'];
    iframe.style.width = '100%';
    iframe.style.border = 0;
    // add css, js
    let qpbcss = document.createElement('link');
    if(config['builderPath']) qpbcss.href = config['builderPath'] + "/assets/css/qbuilder.css";
    else qpbcss.href = "https://www.getqpress.com/builder/assets/css/qbuilder.css";
    qpbcss.rel = "stylesheet";
    qpbcss.type = "text/css";
    // End of css.js
    doc.appendChild(iframe);
    iframe.onload = function() {
        new Qbuilder(config,iframe);
        iframe.contentDocument.head.appendChild(qpbcss);
        iframe.style.height = window.innerHeight - doc.getBoundingClientRect().top + 'px';
    }
}

function Qbuilder(config, iframe){
    const qb = new Vars();
    qb.docId = config['docId'];
    const util = new Utils();
    const modal = new Modals();
    const addEvent = new AddEvents();
    const exec = new ChangeStyles();
    const coloring = new Colors();
    const block = new Blocks();
    const tool = new Tools();
    const template = new Templates();
    const alt = new Alerts();
    tool.genTools(); // create Tool
    util.btnOffAll();
    util.setGoogleFonts();
    modal.create(tool.btnBgImg, 'bgImg', '380px');
    modal.create(tool.btnBgColor, 'bgColor', '225px');
    modal.create(tool.btnTextColor, 'textColor', '225px');
    modal.create(tool.btnBorderColor, 'borderColor', '225px');
    modal.create(tool.btnSpace, 'space', '230px');
    modal.create(tool.btnShadow, 'shadow', '230px');
    modal.create(tool.btnFont, 'fontFamily', '300px');
    modal.create(tool.btnTextSize, 'textSize', '280px');
    modal.create(tool.btnHeading, 'heading', '280px');
    modal.create(tool.btnLink, 'link', '380px');
    modal.create(tool.btnBorder, 'border', '170px');
    modal.create(tool.btnAnimate, 'animate', '185px');
    modal.createCommon('commonImg');
    modal.createCommon('commonLink');
    modal.createCommon('commonBtn');
    modal.createCommon('commonCode');
    modal.createCommon('commonSlider');
    modal.createCommon('commonInput');
    modal.createCommon('commonDim');
    modal.createCommon('commonConfig');
    modal.createCommon('commonDivider');
    modal.createCommon('commonIcon');
    modal.createCommon('commonRes');
    modal.createCommon('commonCover');
    modal.createCommon('commonIframe');
    modal.createCommon('commonList');
    modal.createCommon('commonGrid');
    modal.createCommon('commonLine');
    template.genTemplatArea();
    template.live();
    alt.genAlert();
    // set event
    addEvent.window();
    addEvent.canvas();
    addEvent.toolbar();
    addEvent.tool();
    addEvent.tooltip();
    addEvent.hover();
    addEvent.modal();
    addEvent.template();
    block.liveGuideLine();
    util.saveAllToStorage('init');
    const pickers = coloring.genPicker();
    coloring.genReference();
    //return param ...
    this.block = block;
    this.util = util;
    if (typeof callbackLoading !== "undefined") {
        callbackLoading(block,util,addEvent,alt);
    }
    function Vars(){
        this.allowEdit = 'on';
        this.nowBlock = '';
        this.dragType = '';
        this.addType = ''; //insert inbox or below the box (inbox or below)
        this.addedBlock = ''
        this.hasGuideLine = false;
        this.dropZones = ['qp-section', 'qp-cover-content', 'qp-grid-cell','qp-tab-body-content'];
        this.ebClasses = ['qp-block', 'qp-section', 'qp-wrap', 'qp-content', 'qp-cover-content', 'qp-card-cell', 'qp-row'];
        this.notEbClasses = ['qp-divider','qp-cover','qb-addzone'];
        this.ebTags = ['DIV', 'P', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6','LI','UL','FIGURE','FIGCAPTION']
        this.nowDirect = '';
        this.nowTarget = ''; // 공통 설정창을 쓸 경우 임시 target(nowBlok, nowDirect 구분이 어려울 경우)
        this.directSelector = 'a, button, input, img, .qp-slide, .qp-divider, .qp-icon, .qp-cover, iframe';
        this.codeObj;
        this.codeMode = 'edit';
        this.docId, this.templateId, this.toolId;
        this.resMdClasses = ['as-md-w100', 'as-md-w50', 'as-md-w33', 'as-md-w25', 'as-md-none']
        this.resSmClasses = ['as-sm-w100', 'as-sm-w50', 'as-sm-w33', 'as-sm-w25', 'as-sm-none']
        this.listResLaClasses = ['as-la1', 'as-la2', 'as-la3', 'as-la4', 'as-la5', 'as-la6']
        this.listResMdClasses = ['as-md1', 'as-md2', 'as-md3', 'as-md4', 'as-md5', 'as-md6']
        this.listResSmClasses = ['as-sm1', 'as-sm2', 'as-sm3', 'as-sm4', 'as-sm5', 'as-sm6']
        this.lineStyleClasses = ['as-line-double', 'as-line-dotted', , 'as-line-dashed']
        this.verticalAlignClasses = ['as-top', 'as-middle', 'as-bottom']
        this.alignClasses = ['as-left', 'as-center', 'as-right', 'as-justify']
        this.shadowClasses = ['as-shadow', 'as-shadow-ribbon', 'as-shadow-bottom', 'as-shadow-tab', 'as-shadow-side']
        this.animateClasses = ['as-animate-zoom', 'as-animate-opacity', 'as-animate-left', 'as-animate-right', 'as-animate-up', 'as-animate-down']
        this.directinClasses = ['-','left','right','top','bottom','side','tab'];
        this.btnSizeClasses = ['as-btn-tiny', 'as-btn-small', 'as-btn-medium', 'as-btn-large', 'as-btn-xlarge', 'as-btn-xxlarge', 'as-btn-xxxlarge', 'as-btn-jumbo'];
        this.btnTypeClasses = ['qp-btn', 'qp-btn2'];
        this.fontSizeClasses = ['as-tiny','as-small','as-medium','as-large','as-xlarge','as-xxlarge','as-xxxlarge','as-jumbo'];
        this.borderClasses = ['as-border', 'as-border-left', 'as-border-right', 'as-border-top', 'as-border-bottom','as-border-side','as-border-tab'];
        this.paddingClasses = ['as-pd', 'as-pd-left', 'as-pd-right', 'as-pd-top', 'as-pd-bottom', 'as-pd-side', 'as-pd-tab', 'as-pd-large', 'as-pd-xlarge', 'as-pd-xxlarge', 'as-pd-jumbo', 'as-pd2', 'as-pd3', 'as-pd4', 'as-pd-none','as-fit'];
        this.marginClasses = ['as-mg', 'as-mg-left', 'as-mg-right', 'as-mg-top', 'as-mg-bottom', 'as-mg-side', 'as-mg-tab'];
        this.brClasses = ['as-br', 'as-br2', 'as-br3', 'as-br4', 'as-br-none']
        this.shapeClasses = ['as-rectangle', 'as-smooth', 'as-round', 'as-circle'];
        this.inputTypeClasses = ['qp-input', 'qp-input--line'];
        this.resMediumClasses = ['as-md-w100', 'as-md-w50', 'as-md-w33', 'as-md-w25', 'as-md-none'];
        this.resSmallClasses = ['as-sm-w100', 'as-sm-w50', 'as-sm-w33', 'as-sm-w25', 'as-sm-none'];
        this.colors = ['xmain', 'main', 'mainx', 'xpoint', 'point', 'pointx', 'xred', 'red', 'redx', 'xblue', 'blue', 'bluex', 'xgreen', 'green', 'greenx', 'xyellow', 'yellow', 'yellowx', 'xgray', 'gray', 'grayx','shade','black','white','parent'];
        this.bgColorClasses = ['as-xmain', 'as-main', 'as-mainx', 'as-xpoint', 'as-point', 'as-pointx', 'as-xred', 'as-red', 'as-redx', 'as-xblue', 'as-blue', 'as-bluex', 'as-xgreen', 'as-green', 'as-greenx', 'as-xyellow', 'as-yellow', 'as-yellowx', 'as-xgray', 'as-gray', 'as-grayx','as-shade','as-black','as-white','as-transparent'];

        this.textColorClasses = ['as-text-xmain', 'as-text-main', 'as-text-mainx', 'as-text-xpoint', 'as-text-point', 'as-text-pointx', 'as-text-xred', 'as-text-red', 'as-text-redx', 'as-text-xblue', 'as-text-blue', 'as-text-bluex', 'as-text-xgreen', 'as-text-green', 'as-text-greenx', 'as-text-xyellow', 'as-text-yellow', 'as-text-yellowx', 'as-text-xgray', 'as-text-gray', 'as-text-grayx','as-text-shade','as-text-black','as-text-white','as-text-transparent'];

        this.darks = ['as-dark', 'as-dark1', 'as-dark2', 'as-dark3', 'as-dark4', 'as-dark5', 'as-dark6', 'as-dark7', 'as-dark8', 'as-dark9'];
        this.colorCodes = ['#f9ebea','#f2d7d5','#e6b0aa','#d98880','#cd6155','#c0392b','#a93226','#922b21','#7b241c','#641e16','#fdedec','#fadbd8','#f5b7b1','#f1948a','#ec7063','#e74c3c','#cb4335','#b03a2e','#943126','#78281f','#f5eef8','#ebdef0','#d7bde2','#c39bd3','#af7ac5','#9b59b6','#884ea0','#76448a','#633974','#512e5f','#f4ecf7','#e8daef','#d2b4de','#bb8fce','#a569bd','#8e44ad','#7d3c98','#6c3483','#5b2c6f','#4a235a','#eaf2f8','#d4e6f1','#a9cce3','#7fb3d5','#5499c7','#2980b9','#2471a3','#1f618d','#1a5276','#154360','#ebf5fb','#d6eaf8','#aed6f1','#85c1e9','#5dade2','#3498db','#2e86c1','#2874a6','#21618c','#1b4f72','#e8f8f5','#d1f2eb','#a3e4d7','#76d7c4','#48c9b0','#1abc9c','#17a589','#148f77','#117864','#0e6251','#e8f6f3','#d0ece7','#a2d9ce','#73c6b6','#45b39d','#16a085','#138d75','#117a65','#0e6655','#0b5345','#e9f7ef','#d4efdf','#a9dfbf','#7dcea0','#52be80','#27ae60','#229954','#1e8449','#196f3d','#145a32','#eafaf1','#d5f5e3','#abebc6','#82e0aa','#58d68d','#2ecc71','#28b463','#239b56','#1d8348','#186a3b','#fef9e7','#fcf3cf','#f9e79f','#f7dc6f','#f4d03f','#f1c40f','#d4ac0d','#b7950b','#9a7d0a','#7d6608','#fef5e7','#fdebd0','#fad7a0','#f8c471','#f5b041','#f39c12','#d68910','#b9770e','#9c640c','#7e5109','#fdf2e9','#fae5d3','#f5cba7','#f0b27a','#eb984e','#e67e22','#ca6f1e','#af601a','#935116','#784212','#fbeee6','#f6ddcc','#edbb99','#e59866','#dc7633','#d35400','#ba4a00','#a04000','#873600','#6e2c00','#fdfefe','#fbfcfc','#f7f9f9','#f4f6f7','#f0f3f4','#ecf0f1','#d0d3d4','#b3b6b7','#979a9a','#7b7d7d','#f8f9f9','#f2f3f4','#e5e7e9','#d7dbdd','#cacfd2','#bdc3c7','#a6acaf','#909497','#797d7f','#626567','#f4f6f6','#eaeded','#d5dbdb','#bfc9ca','#aab7b8','#95a5a6','#839192','#717d7e','#5f6a6a','#4d5656','#f2f4f4','#e5e8e8','#ccd1d1','#b2babb','#99a3a4','#7f8c8d','#707b7c','#616a6b','#515a5a','#424949','#ebedef','#d6dbdf','#aeb6bf','#85929e','#5d6d7e','#34495e','#2e4053','#283747','#212f3c','#1b2631','#eaecee','#d5d8dc','#abb2b9','#808b96','#566573','#2c3e50','#273746','#212f3d','#1c2833','#17202a'];

        this.dropZone = '';
        this.mobileWidthClasses = ['as-md-w100', 'as-md-w50', 'as-md-none'];
        this.googleFonts = ['Roboto','Nanum Gothic','Sarabun','Noto Sans KR','Tangerine'];
        this.safeFonts = ['Georgia','Arial, Helvetica','Arial Black','Impact, Charcoal','Courier New'];
        this.googleFontSheet = '';
    }
    function Blocks() {
        let innerDoc = iframe.contentDocument || iframe.contentWindow.document;
        if(config['canvasId']) this.canvas = innerDoc.getElementById(config['canvasId']);
        else this.canvas = innerDoc.getElementsByTagName("BODY")[0];
        this.canvas.classList.add("qb-canvas-outline");
        // this.canvas.setAttribute("contentEditable",true);
        this.innerDoc = innerDoc;
        /* -------
         Create Toolbar
        ---------- */
        let bar = genToolbar();
        this.toolbar = bar.toolbar;
        this.toolbarTitle = bar.toolbarTitle;
        this.toolbarUtil = bar.toolbarUtil;
        this.toolbarBtnCell = bar.toolbarBtnCell;
        this.btnUp = bar.btnUp;
        this.btnDown = bar.btnDown;
        // this.btnFull= bar.btnFull;
        this.btnDim= bar.btnDim;
        this.btnCode= bar.btnCode;
        // this.btnPadding= bar.btnPadding;
        this.btnRes = bar.btnRes;
        // this.btnDrag = bar.btnDrag;
        // this.btnAdd = bar.btnAdd;
        this.btnMoveUp = bar.btnMoveUp;
        this.btnMoveDown = bar.btnMoveDown;
        this.btnClone = bar.btnClone;
        this.btnPlus = bar.btnPlus;
        this.btnDelete = bar.btnDelete;
        this.btnConfig = bar.btnConfig;
        this.btnAdd = bar.btnAdd;
        this.btnInbox = bar.btnInbox;
        function genToolbar(){
            var toolbar = document.createElement('div');
            toolbar.classList.add('qb-toolbar', 'no-editable');
            toolbar.contentEditable = false;
            //title area
            var toolbarTitle = document.createElement('span');
            toolbarTitle.classList.add('qb-toolbar-title');
            toolbarTitle.style.padding = "4px 12px 8px 12px";
            //Special
            var toolbarSpecial = document.createElement('span');
            //up, down area
            var toolbarUtil = document.createElement('span');
            // general tools
            var toolbarBtnCell = document.createElement('span');
            // Insert els
            var toolbarInsert = document.createElement('span');
            toolbarInsert.style.marginLeft = "1px";
            toolbarBtnCell.setAttribute('id','qbToolbarCell');
            // apend all el
            toolbar.appendChild(toolbarTitle);
            toolbar.appendChild(toolbarSpecial);
            toolbar.appendChild(toolbarBtnCell);
            toolbar.appendChild(toolbarUtil);
            toolbar.appendChild(toolbarInsert);
            /* --------------------
                Special buttons
            ------------------------ */
            // config button
            var btnConfig= document.createElement('button');
            btnConfig.classList.add('qp-btn','as-rect','as-btn-xgray','as-btn-tiny','no-editable');
            btnConfig.innerHTML = '<i class="fas fa-cog"></i>';
            toolbarSpecial.appendChild(btnConfig);
            // Responsive Button
            var btnRes = document.createElement('button');
            btnRes.classList.add('qp-btn','as-rect','as-btn-xgray','as-btn-tiny','no-editable');
            btnRes.innerHTML = '<i class="fas fa-mobile-alt"></i>';
            toolbarSpecial.appendChild(btnRes);
            // Plus button
            var btnPlus = document.createElement('button');
            btnPlus.classList.add('qp-btn','as-rect','as-btn-xgray','as-btn-tiny','no-editable');
            btnPlus.innerHTML = '<i class="far fa-plus-square"></i>';
            toolbarSpecial.appendChild(btnPlus);
            // Insert Button - add below
            // var btnAddBelow = document.createElement('button');
            // btnAddBelow.classList.add('qp-btn','as-rect','as-btn-xgray','as-btn-tiny','no-editable');
            // btnAddBelow.innerHTML = '<i class="fas fa-plus-square"></i>';
            // toolbarSpecial.appendChild(btnAddBelow);

            // add
            var btnAdd = document.createElement('button');
            btnAdd.classList.add('qp-btn','as-rect','as-btn-red','as-btn-tiny','no-editable');
            btnAdd.innerHTML = '<i class="fas fa-plus"></i>';
            toolbarInsert.appendChild(btnAdd);
            // inbox
            var btnInbox = document.createElement('button');
            btnInbox.classList.add('qp-btn','as-rect','as-btn-red','as-btn-tiny','no-editable');
            btnInbox.innerHTML = '<i class="fas fa-inbox"></i>';
            toolbarInsert.appendChild(btnInbox);
            /* --------------------
                General buttons
            ------------------------ */
            // dimension button
            var btnDim= document.createElement('button');
            btnDim.classList.add('qp-btn','as-rect','as-btn-gray','as-btn-tiny','no-editable');
            btnDim.innerHTML = '<i class="fas fa-expand"></i>';
            toolbarBtnCell.appendChild(btnDim);
            // code button
            var btnCode= document.createElement('button');
            btnCode.classList.add('qp-btn','as-rect','as-btn-gray','as-btn-tiny','no-editable');
            btnCode.innerHTML = '<i class="fas fa-code no-editable"></i>';
            toolbarBtnCell.appendChild(btnCode);
            // moveUp Button
            var btnMoveUp = document.createElement('button');
            btnMoveUp.classList.add('qp-btn','as-rect','as-btn-gray','as-btn-tiny','no-editable');
            btnMoveUp.innerHTML = '<i class="fas fa-angle-double-up"></i>';
            toolbarBtnCell.appendChild(btnMoveUp);
            // moveDown Button
            var btnMoveDown = document.createElement('button');
            btnMoveDown.classList.add('qp-btn','as-rect','as-btn-gray','as-btn-tiny','no-editable');
            btnMoveDown.innerHTML = '<i class="fas fa-angle-double-down"></i>';
            toolbarBtnCell.appendChild(btnMoveDown);
            // Clone button
            var btnClone = document.createElement('button');
            btnClone.classList.add('qp-btn','as-rect','as-btn-gray','as-btn-tiny','no-editable');
            btnClone.innerHTML = '<i class="far fa-copy no-editable"></i>';
            toolbarBtnCell.appendChild(btnClone);
            // Delete button
            var btnDelete = document.createElement('button');
            btnDelete.classList.add('qp-btn','as-rect','as-btn-gray','as-btn-tiny','no-editable');
            btnDelete.innerHTML = '<i class="fas fa-trash-alt no-editable"></i>';
            toolbarBtnCell.appendChild(btnDelete);
            /* --------------------
                selection
            ------------------------ */
            // up Button
            var btnUp = document.createElement('button');
            btnUp.classList.add('qp-btn','as-rect','as-btn-gray','as-btn-tiny','no-editable');
            btnUp.innerHTML = '<i class="fas fa-level-up-alt no-editable"></i>';
            btnUp.style.borderLeft ="1px solid #c4c4c4";
            toolbarUtil.appendChild(btnUp);
            // down Button
            var btnDown = document.createElement('button');
            btnDown.classList.add('qp-btn','as-rect','as-btn-gray','as-btn-tiny','no-editable');
            btnDown.innerHTML = '<i class="fas fa-level-down-alt no-editable"></i>';
            toolbarUtil.appendChild(btnDown);
            document.body.appendChild(toolbar);
            return{toolbar:toolbar, toolbarTitle: toolbarTitle, toolbarUtil: toolbarUtil,  toolbarBtnCell: toolbarBtnCell, btnUp:btnUp, btnDown:btnDown, btnDim:btnDim,btnConfig:btnConfig, btnCode:btnCode, btnRes:btnRes,btnMoveUp:btnMoveUp, btnMoveDown:btnMoveDown, btnClone:btnClone,btnPlus:btnPlus, btnDelete:btnDelete,btnAdd:btnAdd,btnInbox:btnInbox}
        }
        /* -------
         Live Editable Area on Click
        ---------- */
        this.liveEditor = function(el) {
            /** live editable */
            let target;
            if(this.findEditable(el) === null){
                this.cleanEditable(el);
                return;
            } else target = this.findEditable(el);
            // 현재 클릭한 영역이 활성화된 영역일 경우 중지
            if(target == qb.nowBlock) {
                return;
            }
            //기존 활성화된 영역 원복
            this.cleanEditable(target);
            target.contentEditable = "true";
            //편집 영역을 변수에 저장
            qb.nowBlock = target;
            //클릭된 영역 활성화
            target.classList.add("qb-selected");
            // if(target.parentNode) {
            //     if(target.parentNode.classList.contains("qp-block")) {
            //         target.parentNode.classList.add("qb-selected-wrap");
            //     } else {
            //         var wrap = innerDoc.getElementsByClassName("qb-selected-wrap");
            //         if(wrap.length > 0) wrap[0].classList.remove("qb-selected-wrap");
            //
            //     }
            // }
            // toolbar live
            this.toolbarReposition();
            util.btnOnAll();
            /** End of live editable */
        }
        this.onEditable = function(el) {
            if(this.findEditable(el)) {
                var target = this.findEditable(el);
                target.classList.add("qb-on-editable");
                // target.setAttribute("contentEditable",true);
            }
        }
        this.outEditable = function(el) {
            if(this.findEditable(el)) {
                var target = this.findEditable(el);
                target.classList.remove("qb-on-editable");
                // if(target != qb.nowBlock) target.removeAttribute("contentEditable");
            }
        }
        this.toolbarReposition = function(){
            if(qb.nowBlock && this.toolbar) {
                this.btnRes.style.display = 'none';
                this.btnConfig.style.display = 'none';
                this.btnPlus.style.display = 'none';
                if(this.isAddable(qb.nowBlock) == false) this.btnAdd.style.display = 'none';
                else this.btnAdd.style.display = 'inline-block';
                if(this.isInsertable(qb.nowBlock) == false) this.btnInbox.style.display = 'none';
                else this.btnInbox.style.display = 'inline-block';
                let rect = util.offset(qb.nowBlock);
                let top = rect.top;
                let left = rect.left;
                this.toolbar.style.display = 'block';
                let toolbarHeight = this.toolbar.offsetHeight;
                let toolbarTop = top - toolbarHeight - 2;
                let toolbarLeft = left - 2;

                // Tool area
                //let toolHeight = tool.toolArea.offsetHeight;
                let toolHeight = iframe.getBoundingClientRect().top;

                //let toolbarHeight = util.removePx(window.getComputedStyle(this.toolbar, null).getPropertyValue("height"));
                //상단 tool 보다 위치가 높으면 아래로 조정
                if(toolbarTop <= toolHeight) {
                    toolbarTop = toolHeight + 3;
                }
                // toolbar 위치 설정
                this.toolbar.style.top = toolbarTop + "px";
                this.toolbar.style.left = toolbarLeft + "px";

                //this.toolbarTitle.innerHTML = qb.nowBlock.tagName;
                //하단 화면을 벗어나면 숨김
                if(top > window.innerHeight - toolbarHeight) {
                    this.toolbar.style.display = "none";
                } else {
                    this.toolbar.style.display = "block";
                }

                //상단 화면을 벗어나면 숨김
                if(top < 0) {
                    console.log("top");
                    this.toolbar.style.display = "none";
                } else {
                    this.toolbar.style.display = "block";
                }
                var title = qb.nowBlock.tagName;

                if(qb.nowBlock.classList.contains('qp-grid-cell')) {
                    title = "Grid Cell";
                    this.btnRes.style.display = 'inline-block';
                }
                if(qb.nowBlock.classList.contains('qp-block')) {
                    title = "Block";
                }
                if(qb.nowBlock.classList.contains('qp-section')) {
                    title = "Section";
                    this.btnPlus.style.display = 'inline-block';
                }
                if(qb.nowBlock.classList.contains('qp-wrap')) {
                    title = "Wrap";
                    this.btnPlus.style.display = 'inline-block';
                }
                if(qb.nowBlock.classList.contains('qp-tab')) {
                    title = "Tab";
                }
                if(qb.nowBlock.classList.contains('qp-tab-header')) {
                    title = "Tab Header";
                }
                if(qb.nowBlock.classList.contains('qp-tab-body')) {
                    title = "Tab Body";
                }
                if(qb.nowBlock.classList.contains('qp-tab-body-content')) {
                    title = "Tab Content";
                }
                if(qb.nowBlock.classList.contains('qp-row')) {
                    title = "Row";
                }
                if(qb.nowBlock.classList.contains('qp-list')) {
                    title = "List";
                    this.btnConfig.style.display = 'inline-block';
                }
                if(qb.nowBlock.classList.contains('qp-grid')) {
                    title = "Grid";
                    this.btnConfig.style.display = 'inline-block';
                }
                if(qb.nowBlock.classList.contains('qp-cover-content')) {
                    title = "Cover Content";
                }
                if(qb.nowBlock.classList.contains('qp-card-cell')) {
                    title = "Card Cell";
                }
                if(qb.nowBlock.classList.contains('qp-card')) {
                    title = "Card";
                }
                if(qb.nowBlock.classList.contains('qp-line')) {
                    title = "Line";
                }
            }
            this.toolbarTitle.innerHTML = title;
        }
        this.toolbarOnDrag = function(){
            let vBlock = document.createElement('div');
            vBlock.classList.add('qbn-drag-wrap');
            vBlock.style.width = qb.nowBlock.clientWidth + 1 + 'px';
            if(this.toolbar.offsetTop == util.offset(this.canvas).top) {
                vBlock.style.height = qb.nowBlock.clientHeight - this.toolbar.clientHeight + 1 + 'px';
            } else vBlock.style.height = qb.nowBlock.clientHeight + 1 + 'px';
            vBlock.classList.add('qb-ondrag');
            this.toolbar.appendChild(vBlock);
            // vBlock.style.backgroundColor = '#fff';
            // vBlock.style.opacity = '0.5';
            // vBlock.style.border = '3px solid red';
            // vBlock.appendChild(qb.nowBlock.cloneNode(true));
            // qb.nowBlock.classList.add('qb-opacity-zero');
        }
        this.toolbarOnDrop = function(){
            let vBlock = this.toolbar.getElementsByClassName('qbn-drag-wrap')[0];
            if(vBlock) this.toolbar.removeChild(vBlock);
            if(qb.nowBlock) qb.nowBlock.classList.remove('qb-opacity-zero');
        }
        this.cleanEditable = function(target) {
            var x = block.canvas.querySelectorAll(".qb-selected, .qb-selected-wrap");
            var toolbar;
            for(var i = 0; i < x.length; i++){
                if(x[i] != target) {
                    x[i].removeAttribute('contentEditable');
                    x[i].classList.remove('qb-selected','qb-relative', 'qb-selected-wrap');
                    // if (x[i].removeEventListener) {
                    //     x[i].removeEventListener("keydown", function(e){
                    //         util.setEditOption(e);
                    //     });
                    // }
                }
            }
            toolbar = document.getElementsByClassName('qb-toolbar');
            for(var i = 0; i < toolbar.length; i++) {
                // toolbar[i].parentNode.removeChild(toolbar[i]);
                toolbar[i].style.display = 'none';
            }
            qb.nowBlock = '';
            util.btnOffAll();
        }
        this.isEditClick = function(target) {
            var status = true;
            if (typeof target === 'undefined') status = false;
            if(target.classList.contains('no-editable') === true) status = false;
            if(target.tagName == 'BUTTON'|| target.tagName == 'A' || target.tagName == 'SPAN' || target.tagName == 'I' || target.tagName == 'INPUT') status = false;
            return status;
        }
        this.findEditable = function(target) {
            if(target.tagName == 'BODY') return null;
            if(target == this.canvas) return null;
            while (target != this.canvas) {
                if(qb.ebTags.includes(target.tagName)) {
                    if(this.isValidBlock(target)) return target;
                }
                if(target.tagName == 'BODY') return null;
                target = target.parentNode;
                if (!target) return null;
            }
            if(target == this.canvas) return null;
            return target;
        }
        this.isValidBlock = function(el) {
            if(el.tagName == 'BODY') return false;
            if(el == this.canvas) return false;
            // if(el.className.match(/qp-section|qp-wrap|qp-grid-cell|qp-cover-content|qp-block|qp-grid|qp-list|qp-card|qp-card-cell/g)) return true;
            // else return false;

            if(getComputedStyle(el, null).position == 'absolute') return false;
            if(getComputedStyle(el, null).display == 'inline') return false;
            if(getComputedStyle(el, null).display == 'inline-block') return false;
            for(var i = 0; i < qb.notEbClasses.length; i++) {
                if(el.classList.contains(qb.notEbClasses[i])) {
                    return false;
                    break;
                }
            }
            return true;


        }
        this.deleteBlock = function() {
            // 삭제하는 block 내에 directbar가 있을 경우 남아 있는 문제 해결을 위해 문서내 모든 directbar 삭제
            var x = document.getElementsByClassName('qb-directbar');
            for(var i =0; i < x.length; i++) {
                x[i].parentNode.removeChild(x[i]);
            }
            qb.nowBlock.parentNode.removeChild(qb.nowBlock);
            // edtitBlock이 absolute 일 경우 toolbar가 editBlock 밖에 있으므로, 강제 삭제 조치함
            // if(util.currentStyle(qb.nowBlock, 'position') == 'absolute') this.canvas.removeChild(this.toolbar);

            this.cleanEditable();
            util.saveAllToStorage();
        }
        this.cloneBlock = function() {
            //Clone Block 생성
            var clone = qb.nowBlock.cloneNode(true);
            //var cloneToolbar = clone.getElementsByClassName('qb-toolbar')[0];
            clone.contentEditable = "false";
            clone.classList.remove('qb-selected','qb-relative');
            //clone.removeChild(cloneToolbar);
            // 주요 Event 적용
            this.initBlock(clone);
            // 다음 Block으로 삽입
            qb.nowBlock.parentNode.insertBefore(clone,qb.nowBlock.nextElementSibling);
            this.toolbarReposition();
            util.saveAllToStorage();
        }
        this.resetNowBlock = function(el) {
            el.classList.add("qb-selected");
            el.contentEditable = "true";
            qb.nowBlock = el;
            this.toolbarReposition();
            util.btnOnAll();
        }
        this.getDrop = function(e) {
            var zone = getDropZone(e.target);
            var target = getTarget(e.target);
            // margin 영역에 dragenter시 fromElement를 통해 target 설정
            // if(!target && e.fromElement) target = getTarget(e.fromElement);
            return{zone: zone,  target: target}
            function getTarget(el) {
                // let dropZone = getDropZone(el);
                if(!zone) return null;
                let c = zone.childNodes;
                for(var i = 0; i < c.length; i++){
                    if(util.isDescendant(c[i], el)) return  c[i];
                    if(c[i] == el) return c[i];
                }
                return null;
            }
            function getDropZone(el) {
                if(el.classList.contains('no-editable')) return null;
                if(el.tagName == "BODY") return null;
                if(el.tagName == "HTML") return null;
                while (isValidDropZone(el) == false) {
                    if(el.tagName == "BODY") return null;
                    if(el.tagName == "HTML") return null;
                    el = el.parentNode;
                    if (!el) {
                      return null;
                    }
                }
                return el;
            } // 내부에 drop 될수 있는 parent 구함
            // function isValidDropZone(el) {
            //     let result = false;
            //     for(var i = 0; i < qb.dropZones.length; i ++){
            //         if(el.classList.contains(qb.dropZones[i])) {
            //             if(util.currentStyle(el,'display') == 'block' || util.currentStyle(el,'display') == 'flex') {
            //                 result = true;
            //                 break;
            //             }
            //         }
            //     }
            //     if(el.classList.contains('qb-nodrop')) return false;
            //     // if(el.classList.contains('qp-block')) {
            //     //     if(qb.dragType == 'move') {
            //     //         if(qb.nowBlock && qb.nowBlock.classList.contains('qp-block')) result = false;
            //     //     } else if(qb.dragType == 'add') {
            //     //         if(qb.addedBlock && qb.addedBlock.classList.contains('qp-block')) result = false;
            //     //     }
            //     // }
            //     return result;
            //
            //     // if(el.classList.contains('no-editable')) return false;
            //     // let noTags = ['P', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'A', 'BUTTON', 'SPAN'];
            //     // let noDps = ['inline', 'inline-block'];
            //     // let noClasses = ['qp-row', 'qp-btn', 'qp-btn2', 'qp-icon', 'qp-divider', 'qp-cover','qp-tab','qp-tab-header'];
            //     // if(noTags.includes(el.tagName)) return false;
            //     // if(noDps.includes(util.currentStyle(el,'display'))) {
            //     //     return false;
            //     // }
            //     // for(var i = 0; i < noClasses.length; i ++){
            //     //     if(el.classList.contains(noClasses[i])) {
            //     //             return false;
            //     //         break;
            //     //     }
            //     // }
            //     // if(el.classList.contains('qp-block')) {
            //     //     if(qb.dragType == 'move') {
            //     //         if(qb.nowBlock && qb.nowBlock.classList.contains('qp-block')) return false;
            //     //     } else if(qb.dragType == 'add') {
            //     //         if(qb.addedBlock && qb.addedBlock.classList.contains('qp-block')) return false;
            //     //     }
            //     // }
            //     // return true;
            // } // 내부에 drop 될수 있는 parent의 정합성 체크
        }
        this.cleanDropZone = function(opt) {
            var x;
            if(opt == 'below') {
                x = this.canvas.getElementsByClassName('qb-dropzone-below');
                for(var i = x.length-1; i >=0 ; i--)  {
                    x[i].classList.remove('qb-dropzone-below')
                }
            } else if(opt == 'in') {
                x = this.canvas.getElementsByClassName('qb-dropzone-in');
                for(var i = x.length-1; i >=0 ; i--)  {
                    x[i].classList.remove('qb-dropzone-in')
                }
            } else {
                x = this.canvas.querySelectorAll('.qb-dropzone-below, .qb-dropzone-in');
                for(var i = x.length-1; i >=0 ; i--)  {
                    x[i].classList.remove('qb-dropzone-below', 'qb-dropzone-in')
                }
            }

        }
        this.resetIframe = function() {
            iframe.style.height = window.innerHeight - document.getElementById(config['docId']).getBoundingClientRect().top  + 'px';
        }
        this.liveGuideLine_old = function(el) {
            return;
            var ebEls = '';
            qb.ebTags.forEach(function(tagName,idx,arr){
                ebEls = ebEls + tagName;
                if(idx !== arr.length-1) ebEls = ebEls + ',';
            });
            if(el) {
                if(qb.hasGuideLine == false) return;
                if(this.isValidBlock(el)) {
                    // if(isValidDropZone(el)) el.classList.add('qb-guideline-dropzone');
                    // else el.classList.add('qb-guideline');
                    el.classList.add('qb-guideline');
                }
                var x = el.querySelectorAll(ebEls);
                for(var i = 0; i < x.length; i++) {
                    if(this.isValidBlock(x[i])) {
                        // if(isValidDropZone(x[i])) x[i].classList.add('qb-guideline-dropzone');
                        // else x[i].classList.add('qb-guideline');
                        x[i].classList.add('qb-guideline');
                    }
                }
            } else {
                var x = block.canvas.querySelectorAll(ebEls);
                for(var i = 0; i < x.length; i++) {
                    if(this.isValidBlock(x[i])) {
                        // if(isValidDropZone(x[i])) x[i].classList.add('qb-guideline-dropzone');
                        // else x[i].classList.add('qb-guideline');
                        x[i].classList.add('qb-guideline');
                    }
                }
                block.canvas.classList.add("qb-canvas-outline");
                qb.hasGuideLine = true;
            }
        }
        this.liveGuideLine = function(el) {
            var x = block.canvas.querySelectorAll(".qp-wrap, .qp-section, .qp-grid-cell");
            for(var i = 0; i < x.length; i++) {
                x[i].classList.add("qb-guideline");
            }
            block.canvas.classList.add("qb-canvas-outline");
            qb.hasGuideLine = true;
        }
        this.removeGuideLine = function() {
            var x = block.canvas.querySelectorAll(".qb-guideline");
            for(var i = 0; i < x.length; i++) {
                x[i].classList.remove("qb-guideline");
            }
            //
            // var ebEls = '';
            // qb.ebTags.forEach(function(tagName,idx,arr){
            //     ebEls = ebEls + tagName;
            //     if(idx !== arr.length-1) ebEls = ebEls + ',';
            // });
            // var x = block.canvas.querySelectorAll(ebEls);
            // for(var i = 0; i < x.length; i++) {
            //     x[i].classList.remove('qb-guideline');
            //     x[i].classList.remove('qb-guideline-dropzone');
            // }
            block.canvas.classList.remove('qb-canvas-outline');
            qb.hasGuideLine = false;
        }
        this.removeAllDirectbar = function() {
            var x = document.getElementsByClassName('qb-directbar');
            for(var i = 0; i < x.length; i ++) {
                x[i].parentNode.removeChild(x[i]);
            }
        }
        this.addNewBlock = function() {
            if(qb.nowBlock.classList.contains('qp-wrap')) addWrap();
            else if(qb.nowBlock.classList.contains('qp-section')) addSection();
            else if(qb.nowBlock.classList.contains('qp-block')) addBlock();
            function addWrap(){
                if(!qb.nowBlock.classList.contains('qp-wrap')) return;
                let el = document.createElement('div');
                el.classList.add('qp-wrap');
                let html = '<div class="qp-section"></div>'
                el.innerHTML = html;
                if(qb.nowBlock.classList.contains('qb-guideline')) {
                    el.classList.add('qb-guideline');
                    el.getElementsByClassName('qp-section')[0].classList.add('qb-guideline');
                }
                qb.nowBlock.parentNode.insertBefore(el,qb.nowBlock.nextElementSibling);
            }
            function addSection(){
                if(!qb.nowBlock.classList.contains('qp-section')) return;
                let el = document.createElement('div');
                el.classList.add('qp-section');
                if(qb.nowBlock.classList.contains('qb-guideline')) {
                    el.classList.add('qb-guideline');
                }
                qb.nowBlock.parentNode.insertBefore(el,qb.nowBlock.nextElementSibling);
            }
            function addBlock(){
                if(!qb.nowBlock.classList.contains('qp-block')) return;
                let el = document.createElement('div');
                el.classList.add('qp-block');
                let html = 'This block is a temporary block to separate the areas. Please add a new block and delete it.'
                el.innerHTML = html;
                if(qb.nowBlock.classList.contains('qb-guideline')) {
                    el.classList.add('qb-guideline');
                }
                qb.nowBlock.parentNode.insertBefore(el,qb.nowBlock.nextElementSibling);
            }
            block.toolbarReposition();
            util.saveAllToStorage();
        }
        this.moveDown = function() {
            let next = qb.nowBlock.nextElementSibling;
            if(next) {
                next.parentNode.insertBefore(qb.nowBlock,next.nextElementSibling);
                block.toolbarReposition();
                util.saveAllToStorage();
            }
        }
        this.moveUp = function() {
            let prev = qb.nowBlock.previousElementSibling;
            if(prev) {
                prev.parentNode.insertBefore(qb.nowBlock,prev);
                block.toolbarReposition();
                util.saveAllToStorage();
            }
        }
        this.initBlock = function(el) {
            addEvent.hover(el);
            qp.initSlide(el);
            // qp.initMasonry(el);
        }
        this.cleanDirectbar = function() {
            var x = document.getElementsByClassName('qb-directbar');
            for(var i = x.length-1; i >=0 ; i--) {
                x[i].parentNode.removeChild(x[i]);
            }
        }
        this.isDraggable = function(el) {
            if(!el) return false;
            if(el.classList.contains('qp-block')) return true;
            else return false;
        }
        this.isAddable = function(el) {
            if(!el) return false;
            if(el.parentNode.className.match(/qp-section|qp-wrap|qp-grid-cell|qp-card-cell|qp-cover-content|qp-tab-body-content|qp-box/g)) {
                return true;
            } else if(el.parentNode.tagName.match(/LI/g)) {

            } else {
                return false;
            }
        }
        this.isInsertable = function(el) {
            if(!el) return false;
            if(el.className.match(/qp-section|qp-wrap|qp-grid-cell|qp-card-cell|qp-cover-content|qp-tab-body-content|qp-box/g)) return true;
            else if(el.parentNode.className.match(/qp-list/g)){
                return true;
            } else {
                return false;
            }
        }
        function isValidDropZone(el) {
            let result = false;
            for(var i = 0; i < qb.dropZones.length; i ++){
                if(el.classList.contains(qb.dropZones[i])) {
                    if(util.currentStyle(el,'display') == 'block' || util.currentStyle(el,'display') == 'flex') {
                        result = true;
                        break;
                    }
                }
            }
            if(el.classList.contains('qb-nodrop')) return false;
            // if(el.classList.contains('qp-block')) {
            //     if(qb.dragType == 'move') {
            //         if(qb.nowBlock && qb.nowBlock.classList.contains('qp-block')) result = false;
            //     } else if(qb.dragType == 'add') {
            //         if(qb.addedBlock && qb.addedBlock.classList.contains('qp-block')) result = false;
            //     }
            // }
            return result;

            // if(el.classList.contains('no-editable')) return false;
            // let noTags = ['P', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'A', 'BUTTON', 'SPAN'];
            // let noDps = ['inline', 'inline-block'];
            // let noClasses = ['qp-row', 'qp-btn', 'qp-btn2', 'qp-icon', 'qp-divider', 'qp-cover','qp-tab','qp-tab-header'];
            // if(noTags.includes(el.tagName)) return false;
            // if(noDps.includes(util.currentStyle(el,'display'))) {
            //     return false;
            // }
            // for(var i = 0; i < noClasses.length; i ++){
            //     if(el.classList.contains(noClasses[i])) {
            //             return false;
            //         break;
            //     }
            // }
            // if(el.classList.contains('qp-block')) {
            //     if(qb.dragType == 'move') {
            //         if(qb.nowBlock && qb.nowBlock.classList.contains('qp-block')) return false;
            //     } else if(qb.dragType == 'add') {
            //         if(qb.addedBlock && qb.addedBlock.classList.contains('qp-block')) return false;
            //     }
            // }
            // return true;
        } //
        // function liveAddButton(el) {
        //     var btn = document.createElement("BUTTON");
        //     btn.classList.add("qp-btn","as-btn-tiny", "as-btn-main");
        //     btn.style.position="absolute";
        //     btn.style.left = "50%";
        //     btn.style.top = "100%";
        //     btn.style.zIndex = "999";
        //     btn.innerHTML = '<i class="fas fa-plus-circle"></i>';
        //     el.appendChild(btn);
        //     // btn.addEventListener("click", function(e){
        //     //     template.togglePanel();
        //     // });
        // }
    }
    function Tools() {
        // btn re view
        this.btnLiveTool = this.btnViewClear = document.createElement('span');
        this.btnLiveTool.classList.add('qb-btn-livetool','qp-btn','as-btn-gray', 'as-rect-top');
        this.btnLiveTool.innerHTML = '<i class="fas fa-angle-down"></i>';
        document.body.appendChild(this.btnLiveTool);
        /***********************
            define qpress Style classes
        ************************/
        let tool = document.createElement('div');
        tool.classList.add('as-border-bottom');
        this.toolArea = tool;
        let grid = document.createElement('div');
        grid.classList.add('qp-grid', 'qb-tool-grid');
        /***********************
            Control
        ************************/
        let cellControl = document.createElement('div');
        cellControl.classList.add('qp-grid-cell', 'as-cell-fit', 'as-border-right');
        grid.appendChild(cellControl);
        // view clear
        this.btnViewClear = document.createElement('span');
        this.btnViewClear.classList.add('qp-btn','as-btn-parent', 'as-btn-fit', 'qb-btn-border',  'qb-btn-tool', 'qb-btn-everon');
        this.btnViewClear.innerHTML = '<i class="far fa-eye"></i>';
        cellControl.appendChild(this.btnViewClear);
        // guideline
        // this.btnGuide = document.createElement('span');
        // this.btnGuide.classList.add('qp-btn','as-btn-parent', 'as-btn-fit', 'qb-btn-border',  'qb-btn-tool', 'qb-btn-everon');
        // this.btnGuide.innerHTML = '<i class="material-icons qb-icon-small">border_outer</i>';
        // cellControl.appendChild(this.btnGuide);
        // all code
        this.btnFullCode = document.createElement('span');
        this.btnFullCode.classList.add('qp-btn','as-btn-parent', 'as-btn-fit', 'qb-btn-border',  'qb-btn-tool', 'qb-btn-everon');
        this.btnFullCode.innerHTML = '<i class="fas fa-code"></i>';
        cellControl.appendChild(this.btnFullCode);
        // insert area
        this.btnInsertZone = document.createElement('span');
        this.btnInsertZone.classList.add('qp-btn','as-btn-parent', 'as-btn-fit', 'qb-btn-border',  'qb-btn-tool', 'qb-btn-everon');
        this.btnInsertZone.innerHTML = '<i class="far fa-plus-square"></i>';
        cellControl.appendChild(this.btnInsertZone);
        /***********************
            background Style
        ************************/
        let cellBg = document.createElement('div');
        cellBg.classList.add('qp-grid-cell', 'as-cell-fit', 'as-border-right');
        grid.appendChild(cellBg);
        // bg color
        this.btnBgColor = document.createElement('span');
        this.btnBgColor.classList.add('qp-btn','as-btn-parent', 'as-btn-fit', 'qb-btn-bgcolor', 'qb-btn-tool');
        this.btnBgColor.innerHTML = '<i class="fas fa-fill-drip">';
        cellBg.appendChild(this.btnBgColor);
        // bg image
        this.btnBgImg = document.createElement('span');
        this.btnBgImg.classList.add('qp-btn','as-btn-parent', 'as-btn-fit', 'qb-btn-bgcolor', 'qb-btn-tool');
        this.btnBgImg.innerHTML = '<i class="far fa-image"></i>';
        cellBg.appendChild(this.btnBgImg);
        // Space
        this.btnSpace = document.createElement('span');
        this.btnSpace.classList.add('qp-btn','as-btn-parent', 'as-btn-fit', 'qb-btn-border',  'qb-btn-tool');
        this.btnSpace.innerHTML = '<i class="fas fa-window-maximize"></i>';
        cellBg.appendChild(this.btnSpace);
        // shadow
        this.btnShadow = document.createElement('span');
        this.btnShadow.classList.add('qp-btn','as-btn-parent', 'as-btn-fit', 'qb-btn-bgcolor', 'qb-btn-tool');
        this.btnShadow.innerHTML = '<i class="far fa-square" style="text-shadow: 2px 2px gray;"></i>';
        cellBg.appendChild(this.btnShadow);
        /***********************
            Text Style
        ************************/
        var cellText = document.createElement('div');
        cellText.classList.add('qp-grid-cell', 'as-cell-fit', 'as-border-right');
        grid.appendChild(cellText);
        // text color
        this.btnTextColor = document.createElement('span');
        this.btnTextColor.classList.add('qp-btn','as-btn-parent', 'as-btn-fit', 'qb-btn-textcolor',  'qb-btn-tool');
        this.btnTextColor.innerHTML = '<i class="fas fa-palette"></i>';
        cellText.appendChild(this.btnTextColor);
        // Font family
        this.btnFont = document.createElement('span');
        this.btnFont.classList.add('qp-btn','as-btn-parent', 'as-btn-fit', 'qb-btn-textcolor',  'qb-btn-tool');
        this.btnFont.innerHTML = '<i class="fas fa-font"></i>';
        cellText.appendChild(this.btnFont);
        // text size
        this.btnTextSize = document.createElement('span');
        this.btnTextSize.classList.add('qp-btn','as-btn-parent', 'as-btn-fit', 'qb-btn-textcolor',  'qb-btn-tool');
        this.btnTextSize.innerHTML = '<i class="material-icons qb-icon-small">format_size</i>';
        cellText.appendChild(this.btnTextSize);
        // Heading
        this.btnHeading = document.createElement('span');
        this.btnHeading.classList.add('qp-btn','as-btn-parent', 'as-btn-fit', 'qb-btn-textcolor',  'qb-btn-tool');
        this.btnHeading.innerHTML = '<i class="fas fa-heading"></i>';
        cellText.appendChild(this.btnHeading);
        // qbCreateModalTextSize(this.btnTextSize, this.textSizeClasses);
        // Bold
        this.btnTextBold = document.createElement('span');
        this.btnTextBold.classList.add('qp-btn','as-btn-parent', 'as-btn-fit', 'qb-btn-textcolor',  'qb-btn-tool');
        this.btnTextBold.innerHTML = '<i class="fas fa-bold"></i>';
        cellText.appendChild(this.btnTextBold);
        // Italic
        this.btnTextItalic = document.createElement('span');
        this.btnTextItalic.classList.add('qp-btn','as-btn-parent', 'as-btn-fit', 'qb-btn-textcolor',  'qb-btn-tool');
        this.btnTextItalic.innerHTML = '<i class="fas fa-italic"></i>';
        cellText.appendChild(this.btnTextItalic);
        // underline
        this.btnTextUnderline = document.createElement('span');
        this.btnTextUnderline.classList.add('qp-btn','as-btn-parent', 'as-btn-fit', 'qb-btn-textcolor',  'qb-btn-tool');
        this.btnTextUnderline.innerHTML = '<i class="fas fa-underline"></i>';
        cellText.appendChild(this.btnTextUnderline);
        // align left
        this.btnTextLeft = document.createElement('span');
        this.btnTextLeft.classList.add('qp-btn','as-btn-parent', 'as-btn-fit', 'qb-btn-textcolor',  'qb-btn-tool');
        this.btnTextLeft.innerHTML = '<i class="fas fa-align-left"></i>';
        cellText.appendChild(this.btnTextLeft);
        // align center
        this.btnTextCenter = document.createElement('span');
        this.btnTextCenter.classList.add('qp-btn','as-btn-parent', 'as-btn-fit', 'qb-btn-textcolor',  'qb-btn-tool');
        this.btnTextCenter.innerHTML = '<i class="fas fa-align-center"></i>';
        cellText.appendChild(this.btnTextCenter);
        // align right
        this.btnTextRight = document.createElement('span');
        this.btnTextRight.classList.add('qp-btn','as-btn-parent', 'as-btn-fit', 'qb-btn-textcolor',  'qb-btn-tool');
        this.btnTextRight.innerHTML = '<i class="fas fa-align-right"></i>';
        cellText.appendChild(this.btnTextRight);
        // align right
        this.btnTextJustify = document.createElement('span');
        this.btnTextJustify.classList.add('qp-btn','as-btn-parent', 'as-btn-fit', 'qb-btn-textcolor',  'qb-btn-tool');
        this.btnTextJustify.innerHTML = '<i class="fas fa-align-justify"></i>';
        cellText.appendChild(this.btnTextJustify);
        // link
        this.btnLink = document.createElement('span');
        this.btnLink.classList.add('qp-btn','as-btn-parent', 'as-btn-fit',  'qb-btn-tool');
        this.btnLink.innerHTML = '<i class="fas fa-link"></i>';
        cellText.appendChild(this.btnLink);
        // qbCreateModalLink(this.btnLink, null);

        /***********************
            Border Style
        ************************/
        var cellBorder = document.createElement('div');
        cellBorder.classList.add('qp-grid-cell', 'as-cell-fit', 'as-border-right');
        grid.appendChild(cellBorder);
        // Border
        this.btnBorder = document.createElement('button');
        this.btnBorder.classList.add('qp-btn','as-btn-parent', 'as-btn-fit', 'qb-btn-border',  'qb-btn-tool');
        this.btnBorder.innerHTML = '<i class="far fa-square"></i>';
        cellBorder.appendChild(this.btnBorder);
        // qbCreateModalBorder(this.btnBorder, this.directinClasses);
        // Border color
        this.btnBorderColor = document.createElement('button');
        this.btnBorderColor.classList.add('qp-btn','as-btn-parent', 'as-btn-fit', 'qb-btn-bordercolor',  'qb-btn-tool');
        this.btnBorderColor.innerHTML = '<i class="fas fa-palette"></i>';
        cellBorder.appendChild(this.btnBorderColor);
        /***********************
            Extra
        ************************/
        var cellExt = document.createElement('div');
        cellExt.classList.add('qp-grid-cell', 'as-cell-fit', 'as-border-right');
        grid.appendChild(cellExt);
        // animation
        this.btnAnimate = document.createElement('span');
        this.btnAnimate.classList.add('qp-btn','as-btn-parent', 'as-btn-fit', 'qb-btn-border',  'qb-btn-tool');
        this.btnAnimate.innerHTML = '<i class="fas fa-star"></i>';
        cellExt.appendChild(this.btnAnimate);
        /***********************
            task
        ************************/
        var cellView = document.createElement('div');
        cellView.classList.add('qp-grid-cell', 'as-cell-fit');
        grid.appendChild(cellView);
        // undo
        this.btnUndo = document.createElement('span');
        this.btnUndo.classList.add('qp-btn','as-btn-parent', 'as-btn-fit', 'qb-btn-border',  'qb-btn-tool', 'qb-btn-everon');
        this.btnUndo.innerHTML = '<i class="fas fa-undo"></i>';
        cellView.appendChild(this.btnUndo);
        // redo
        this.btnRedo = document.createElement('span');
        this.btnRedo.classList.add('qp-btn','as-btn-parent', 'as-btn-fit', 'qb-btn-border',  'qb-btn-tool', 'qb-btn-everon');
        this.btnRedo.innerHTML = '<i class="fas fa-redo"></i>';
        cellView.appendChild(this.btnRedo);

        /***********************
            Document Config
        ************************/
        var cellDoc = document.createElement('div');
        cellDoc.classList.add('qp-grid-cell',  'as-right');
        cellDoc.setAttribute('id','configZone');
        grid.appendChild(cellDoc);
        // config
        this.btnConfig = document.createElement('span');
        this.btnConfig.classList.add('qp-btn','as-btn-parent', 'as-btn-fit', 'qb-btn-border',  'qb-btn-tool', 'qb-btn-everon');
        this.btnConfig.innerHTML = '<i class="fas fa-cog"></i>';
        cellDoc.appendChild(this.btnConfig);
        // Code
        this.btnAllCode = document.createElement('span');
        this.btnAllCode.classList.add('qp-btn','as-btn-parent', 'as-btn-fit', 'qb-btn-border',  'qb-btn-tool', 'qb-btn-everon', 'as-mg-right');
        this.btnAllCode.innerHTML = '<i class="fas fa-code"></i>';
        cellDoc.appendChild(this.btnAllCode);
        // Save
        // this.btnSave = document.createElement('span');
        // this.btnSave.classList.add('qp-btn','as-btn-parent', 'as-btn-fit', 'qb-btn-border',  'qb-btn-tool', 'qb-btn-everon');
        // this.btnSave.innerHTML = '<i class="fas fa-save"></i>';
        // cellDoc.appendChild(this.btnSave);
        // Download
        // this.btnDownload = document.createElement('span');
        // this.btnDownload.classList.add('qp-btn','as-btn-parent', 'as-btn-fit', 'qb-btn-border',  'qb-btn-tool', 'qb-btn-everon');
        // this.btnDownload.innerHTML = '<i class="fas fa-download"></i>';
        // cellDoc.appendChild(this.btnDownload);

        this.genTools = function() {
            tool.appendChild(grid);
            document.body.insertBefore(tool,document.body.firstChild);
        }
    }
    function Colors() {
        this.resetPalette = function(opt) {
            var reference = iframe.contentDocument.getElementById('colorReference');
            var realColors = reference.getElementsByTagName('span');
            var x;
            if(opt == 'bgColor') x = document.querySelectorAll('[data-opt="bgColor"][data-type="class"][data-set="basic"]');
            if(opt == 'textColor') x = document.querySelectorAll('[data-opt="textColor"][data-type="class"][data-set="basic"]');
            if(opt == 'borderColor') x = document.querySelectorAll('[data-opt="borderColor"][data-type="class"][data-set="basic"]');
            if(opt == 'btnColor') x = document.querySelectorAll('[data-type="btnColor"]');
            if(opt == 'dividerColor') x = document.querySelectorAll('[data-type="dividerColor"]');


            for(var i = 0; i < x.length; i++) {
                x[i].style.backgroundColor = window.getComputedStyle(realColors[i], null).backgroundColor;
                x[i].style.color = window.getComputedStyle(realColors[i], null).color;

            }
        }
        this.genReference = function() {
            var wrapper = document.createElement('div');
            wrapper.setAttribute('id','colorReference');
            wrapper.style.display="none";
            var html = '';
            for(var i = 0; i < qb.colors.length; i++){
                html = html + '<span data-name="'+qb.colors[i]+'" class="as-'+ qb.colors[i] +'">'+qb.colors[i]+'</span>'
            }
            wrapper.innerHTML = html;
            var innerDoc = iframe.contentDocument || iframe.contentWindow.document;
            innerDoc.getElementsByTagName('BODY')[0].appendChild(wrapper);
        }
        this.genPicker = function(){
            var pickers = [];
            var source = document.getElementsByClassName('qb-colorinput');
            for (var i = 0, len = source.length; i < len; ++i) {
                // document.querySelector('button[for='+source[i].id+']').style.background = source[i].value;
                pickers[i] = new CP(source[i]);
                pickers[i].on("change", function(color) {
                    color = "#" + color;
                    this.source.value = color;
                    // applyColor(this.source.value, this.source.id);
                });

                source[i].setAttribute("data-order",i);
                source[i].addEventListener("cut", function(e){
                    update(this.getAttribute("data-order"));
                });
                source[i].addEventListener("paste", function(e){
                    update(this.getAttribute("data-order"));
                });
                source[i].addEventListener("keyup", function(e){
                    update(this.getAttribute("data-order"));
                });
                source[i].addEventListener("input", function(e){
                    update(this.getAttribute("data-order"));
                });
            }
            function update(i) {
                var el = document.getElementsByClassName('qb-colorinput')[i];
                pickers[i].set(el.value).enter();
            }

            /* Eod pickr color */
            var applyColor = function (color, id) {
                var btn = document.querySelector('button[for='+id+']');
                btn.style.backgroundColor = color;
            }
            return pickers;
        }
        this.defautPalette = function(){
            var colorPanel = document.createElement('div');
            colorPanel.classList.add('qb-colorwrap-right');
            var html = '';
            var i;
            for(i = 0; i < qb.colorCodes.length; i++){
                html = html + '<div style="background-color:' + qb.colorCodes[i] +';" class="qb-colorpick qb-colorcell as-hover-bulge" data-type="code" data-value="'+ qb.colorCodes[i] +'"></div>';
            }
            colorPanel.innerHTML = html;
            return colorPanel;
        }
        this.classPalette = function(){
            var colorPanel = document.createElement('div');
            colorPanel.classList.add('qb-colorwrap-left');
            var html = '';
            var i;
            for(i = 0; i < qb.colors.length; i++){
                html = html + '<span data-type="class" data-value="'+ qb.colors[i] +'" class="qb-colorpick qb-colorcell-big as-hover-zoom as-' + qb.colors[i] + '">' + qb.colors[i] + '</span>';
            }
            colorPanel.innerHTML = html;
            return colorPanel;
        }
        // Make color picker modal
        this.modal = document.createElement('div');
        this.modal.classList.add('qb-tool-modal','as-border', 'as-white', 'as-pd');
        // Make qp-grid
        this.grid = document.createElement('div');
        this.grid.classList.add('qp-grid');
        this.grid.style.width = '370px';
        // Make qp-grid-cell
        this.gridLeft = document.createElement('div');
        this.gridLeft.classList.add('qp-grid-cell','as-left');
        this.gridLeft.width = "250px";
        this.gridRight = document.createElement('div');
        this.gridRight.classList.add('qp-grid-cell');
        this.inputForm = document.createElement('div');
        var inputHtml = '';
        inputHtml = inputHtml + '<div class="qp-line"></div>';
        inputHtml = inputHtml + '<input placeholder="#000000" class="qp-input qb-colorinput">';
        inputHtml = inputHtml + '<button class="qb-colorinputok qp-btn"><i class="fas fa-check"></i></button>';
        this.inputForm.innerHTML = inputHtml;
        // Append grid
        this.gridLeft.appendChild(this.classPalette());
        this.gridLeft.appendChild(this.inputForm);
        this.gridRight.appendChild(this.defautPalette());
        // Append modal
        this.modal.appendChild(this.grid);
        this.grid.appendChild(this.gridLeft);
        this.grid.appendChild(this.gridRight);
        this.on = function(el){
            var btn;
            if(!el) return;
            if(typeof el === 'string') {
                btn = document.getElementById(el);
                if(!this.btn) return;
            } else if(typeof el === 'object'){
                btn = el;
            } else {
                return;
            }
            var cloneModal = this.modal.cloneNode(true)
            btn.appendChild(cloneModal);
            btn.style.whiteSpace  = "normal";
        } //on
        this.cleanTextColorClass = function(el) {
            el.style.color = "";
            // var classes = this.colorClasses;
            var i;
            for(i = 0; i < qb.colors.length; i++) {
                var c = 'as-text-' + qb.colors[i];
                if(el.classList.contains(c)) el.classList.remove(c);
            }
        }
        this.cleanBgColorClass = function(el) {
            el.style.backgroundColor = "";

            for(var i = 0; i < qb.colors.length; i++) {
                var c = 'as-' + qb.colors[i];
                if(el.classList.contains(c)) el.classList.remove(c);
            }
            //dark
            if(el.classList.contains('as-dark')) el.classList.remove('as-dark');
            for(var i = 1; i < 10; i++) {
                var c = 'as-dark' + i;
                if(el.classList.contains(c)) el.classList.remove(c);
            }
        }
        this.cleanBorderColorClass = function(el) {
            el.style.borderColor  = "";
            // var classes = this.colorClasses;
            var i;
            for(i = 0; i < qb.colors.length; i++) {
                var c = 'as-border-' + qb.colors[i];
                if(el.classList.contains(c)) el.classList.remove(c);
            }
        }
    }
    function ChangeStyles(){
        this.changeConfig = function() {
            let css = document.getElementById('configCss').value;
            if(css) iframe.contentDocument.getElementById('qpcss').href = css;
            // change font
            let font = document.getElementById('configFontFamily').value;
            if(font) block.canvas.style.fontFamily = font;
            if(font == 'none') block.canvas.style.fontFamily = '';
            // change color
            let bgColor = document.getElementById('configBgColor').value;
            let textColor = document.getElementById('configTextColor').value;
            if(bgColor) block.canvas.style.backgroundColor = bgColor;
            else block.canvas.style.backgroundColor = "";
            if(textColor) block.canvas.style.color = textColor;
            else block.canvas.style.color = "";
            // change bg image
            let url = document.getElementById('configBgImgUrl').value;
            if(url) block.canvas.style.backgroundImage = "url(\'" + url + " \')";
            else block.canvas.style.backgroundImage = "";
            block.canvas.style.backgroundSize = document.getElementById('configBgImgSize').value;
            block.canvas.style.backgroundRepeat = document.getElementById('configBgImgRepeat').value;
            block.canvas.style.backgroundPosition = document.getElementById('configBgImgPosition').value;
            // end
            util.saveAllToStorage();
            qp.closeModal('commonConfig');

        }
        this.changeSpace = function(opt, className) {
            if(opt == 'pd'){
                qb.nowBlock.style.padding = '';
                let className = qp.getValueQradio('modalPd');
                this.addClass(qb.nowBlock,className,'padding');
            } else if(opt == 'br') {
                qb.nowBlock.style.marginBottom = '';
                let className = qp.getValueQradio('modalBr');
                this.addClass(qb.nowBlock,className,'br');
            }
            // if(opt == 'pd'){
            //     qb.nowBlock.style.padding = '';
            //     this.addClass(qb.nowBlock,className,'padding');
            // } else if(opt == 'br') {
            //     qb.nowBlock.style.marginBottom = '';
            //     this.addClass(qb.nowBlock,className,'br');
            // }
            util.saveAllToStorage();
            // modal.clean();
        }
        this.changeShadow = function() {
            let className = qp.getValueQradio('modalShadow');
            if(className == 'none') cleanShadowClass(qb.nowBlock);
            else {
                if(!util.currentStyle(qb.nowBlock,'backgroundColor') || util.currentStyle(qb.nowBlock,'backgroundColor') == '#000000') qb.nowBlock.classList.add('as-white');
                this.addClass(qb.nowBlock,className,'shadow');
            }
            util.saveAllToStorage();
            // modal.clean();
        }
        this.changeBtn = function() {
            // onclick Function
            if(document.getElementById('btnFunction').value) {
                qb.nowDirect.setAttribute("onClick", document.getElementById('btnFunction').value);
            }
            // Link
            if(document.getElementById('modalBtnLink').value) {
                if(qb.nowDirect.tagName == 'A') qb.nowDirect.href = document.getElementById('modalBtnLink').value;
            }
            // Text
            qb.nowDirect.innerHTML = document.getElementById('modalBtnText').value;
            //button type
            var btnType = document.getElementById('modalBtnType').value;
            if(btnType == 'none') qb.nowDirect.classList.remove('qp-btn', 'qp-btn2');
            if(btnType == 'qp-btn') {
                qb.nowDirect.classList.add('qp-btn');
                qb.nowDirect.classList.remove('qp-btn2');
            }
            if(btnType == 'qp-btn2') {
                qb.nowDirect.classList.remove('qp-btn');
                qb.nowDirect.classList.add('qp-btn2');
            }
            //button shape
            var btnShape = document.getElementById('modalBtnShape').value;
            if(btnShape) this.addClass(qb.nowDirect, btnShape, 'shape');
            //button size
            var btnSize = document.getElementById('modalBtnSize').value;
            if(btnSize) this.addClass(qb.nowDirect, btnSize, 'btnSize');
            //button colors
            var btnColor = qp.getValueQradio('modalBtnColor');
            if(!btnColor || btnColor == 'none') cleanBtnColorClass(qb.nowDirect);
            if(btnColor) this.addClass(qb.nowDirect, btnColor, 'btnColor');
            util.saveAllToStorage();
            qp.closeModal('commonBtn');
        }
        this.changeImg = function() {
            if(document.getElementById('imgUrl').value) qb.nowDirect.src = document.getElementById('imgUrl').value;
            if(document.getElementById('imgShape').value) {
                this.addClass(qb.nowDirect, document.getElementById('imgShape').value, 'shape');
            }
            //Link 처리
            if(document.getElementById('imgAddLink').checked == true) {
                if(qb.nowDirect.parentNode.tagName == 'A') {
                    qb.nowDirect.parentNode.href = document.getElementById('imgLinkUrl').value;
                    qb.nowDirect.parentNode.target = document.getElementById('imgLinkTarget').value
                } else {
                    //링크 적용한 새로운 el 생성
                    // hover 이벤트 재적용 해야 함
                    var el = document.createElement('a');
                    el.href = document.getElementById('imgLinkUrl').value;
                    el.target = document.getElementById('imgLinkTarget').value;
                    el.appendChild(qb.nowDirect.cloneNode(true));
                    qb.nowDirect.parentNode.replaceChild(el, qb.nowDirect);
                    qbAddEventImgs(el.getElementsByTagName('img')[0].parentNode);
                }
            } else {
                if(qb.nowDirect.parentNode.tagName == 'A') {
                    //링크 적용한 새로운 el 생성
                    var linkNode = qb.nowDirect.parentNode;
                    var el =  document.createElement('span');
                    el.innerHTML = linkNode.innerHTML;
                    linkNode.parentNode.replaceChild(el, linkNode);
                    qbAddEventImgs(el.getElementsByTagName('img')[0].parentNode);
                }
            }
            util.saveAllToStorage();
            qp.closeModal('commonImg');
        }
        this.changeBorderClass = function(e) {
            var className = e.target.getAttribute('data-value');
            this.addClass(qb.nowBlock, className, 'border');
            //색깔버튼 활성화
            util.btnOn(tool.btnBorderColor);
            document.getElementById('borderSizeSelect').disabled = false;
            // bordr none 이면 다시 비활성화
            if(className == 'as-border-none') {
                util.btnOff(tool.btnBorderColor);
                document.getElementById('borderSizeSelect').disabled = true;
            }
            // 지정된 두께가 있으면 유지
            qb.nowBlock.style.borderWidth = document.getElementById('borderSizeSelect').value;
            block.toolbarReposition();
            util.saveAllToStorage();
            // modal.clean();
        }
        this.changeBorderSize = function() {
            var borderSize = document.getElementById('borderSizeSelect').value;
            qb.nowBlock.style.borderWidth = borderSize;
            block.toolbarReposition();
            util.saveAllToStorage();
            modal.clean();
        }
        this.changeBgImg = function(){
            var url = document.getElementById('bgImgUrl').value;
            if(url) qb.nowBlock.style.backgroundImage = "url(\'" + url + " \')";
            else qb.nowBlock.style.backgroundImage = "";
            qb.nowBlock.style.backgroundSize = document.getElementById('bgImgSize').value;
            qb.nowBlock.style.backgroundRepeat = document.getElementById('bgImgRepeat').value;
            qb.nowBlock.style.backgroundPosition = document.getElementById('bgImgPosition').value;
            util.saveAllToStorage();
            modal.clean();
        }
        this.changeFontFamily = function(e) {
            let fontFamily = document.getElementById('selectFontFamily').value;
            if(fontFamily){
                if(fontFamily == 'none') fontFamily = null;
                if(iframe.contentWindow.getSelection().toString()) util.execCommand('fontFamily', fontFamily, null);
                else qb.nowBlock.style.fontFamily = fontFamily;
            }
            util.saveAllToStorage();
            // modal.clean();
        }
        this.changeFontFamilyNew = function(e) {
            let fontName = document.getElementById('inputNewFont').value;
            let optGroup = document.getElementById('optGoogleFont');
            if(!fontName) return;
            if(!util.isGoogleFont(fontName)) {
                document.getElementById('inputResult').innerHTML = '<span class="as-text-red">Invalid Font Name</span><br>';
                return;
            }
            if(qb.googleFonts.includes(fontName)) {
                document.getElementById('inputResult').innerHTML = '<span class="as-text-red">This font exists in the above select list</span><br>';
                return;
            } else {
                qb.googleFonts.push(fontName);
                let newOpt = document.createElement('option');
                newOpt.value = fontName;
                newOpt.innerHTML = fontName;
                optGroup.appendChild(newOpt);
                fontName = fontName.replace(/ /g, '+');
                let url = qb.googleFontSheet.href + '|' + fontName;
                qb.googleFontSheet.href = url;
                document.getElementById('inputResult').innerHTML = 'The font added successfully!! Select font on the above select list<br>';
            }
        }
        this.changeFontSizeClass = function(e) {
            var className = 'as-' + e.target.getAttribute('data-value');
            if(iframe.contentWindow.getSelection().toString()) util.execCommand('useClass', className, 'fontSize');
            else this.addClass(qb.nowBlock, className , 'fontSize');
            block.toolbarReposition();
            util.saveAllToStorage();
            // modal.clean();
        }
        this.changeFontSizePixel = function(){
            var fontSize = document.getElementById('selectFontSize').value;
            if(iframe.contentWindow.getSelection().toString()) util.execCommand('fontSize', fontSize, null);
            else  qb.nowBlock.style.fontSize = fontSize;
            block.toolbarReposition();
            util.saveAllToStorage();
            // modal.clean();
        }
        this.changeLineHeight = function(){
            let lineHeight = document.getElementById('inputLineHeight').value;
            if(iframe.contentWindow.getSelection().toString()) util.execCommand('lineHeight', lineHeight, null);
            else  qb.nowBlock.style.lineHeight = lineHeight;
            block.toolbarReposition();
            util.saveAllToStorage();
            // modal.clean();
        }
        this.changeColor = function(e){
            var type, value;
            if(util.getWrap(e.target, 'qb-colorinputok')) {
                type = 'input';
            } else {
                type = e.target.getAttribute('data-type');
                value = e.target.getAttribute('data-value');
            }

            var e = window.event;
            if(util.getWrap(e.target, "qb-btn-bgcolor")) {
                if(type == 'input')  {
                    type = 'code';
                    value = tool.btnBgColor.getElementsByClassName('qb-colorinput')[0].value;
                }
                if(iframe.contentWindow.getSelection().toString()) {
                    if(type == 'class') util.execCommand('useClass', 'as-' + value, 'backgroundColor');
                    else util.execCommand('backgroundColor', value, null);
                }
                else this.changeBgColor(type,value);
            }
            if(util.getWrap(e.target, "qb-btn-textcolor")) {
                if(type == 'input')  {
                    type = 'code';
                    value = tool.btnTextColor.getElementsByClassName('qb-colorinput')[0].value;
                }
                if(iframe.contentWindow.getSelection().toString()) {
                    if(type == 'class') util.execCommand('useClass', 'as-text-' + value, 'color');
                    else util.execCommand('color', value, null);
                }
                else  this.changeTextColor(type,value);
            }
            if(util.getWrap(e.target, "qb-btn-bordercolor")) {
                if(type == 'input')  {
                    type = 'code';
                    value = tool.btnBorderColor.getElementsByClassName('qb-colorinput')[0].value;
                }
                this.changeBorderColor(type,value);
            }
            modal.clean();
        }
        this.changeBorderColor = function(type, value) {
            if(type == 'code') qb.nowBlock.style.borderColor = value;
            else {
                var className = 'as-border-' + value;
                this.addClass(qb.nowBlock, className, 'borderColor');
            }
            util.saveAllToStorage();
        }
        this.changeBgColor = function(type, value) {
            if(type == 'code') qb.nowBlock.style.backgroundColor = value;
            else {
                coloring.cleanBgColorClass(qb.nowBlock);
                var className = 'as-' + value;
                qb.nowBlock.classList.add(className);
            }
            util.saveAllToStorage();
        }
        this.changeTextColor = function(type, value) {
            if(type == 'code') qb.nowBlock.style.color = value;
            else {
                coloring.cleanTextColorClass(qb.nowBlock);
                var className = 'as-text-' + value;
                qb.nowBlock.classList.add(className);
            }
            util.saveAllToStorage();
        }
        this.changeHeading = function(tagName) {
            if(!tagName) return;
            var validTags = ["H1", "H2", "H3", "H4", "H5", "H6"];
            if(!validTags.includes(tagName)) return;
            if(!validTags.includes(qb.nowBlock.tagName)) return;
            var newEl = document.createElement(tagName);
            newEl.innerHTML = qb.nowBlock.innerHTML;
            var style = qb.nowBlock.getAttribute("style");
            var classes = qb.nowBlock.getAttribute("class");
            if(style) newEl.setAttribute("style", style);
            if(classes) newEl.setAttribute("class",classes);
            qb.nowBlock.parentNode.replaceChild(newEl, qb.nowBlock);
            newEl.classList.add('qb-selected');
            newEl.contentEditable=true;
            qb.nowBlock = newEl;
            // Live Block
            block.liveGuideLine(newEl);
            block.toolbarReposition();
            // end live Block
            addEvent.hover(newEl); //hover 액션 추가

        }
        this.createLink = function(select) {
            //처음의 선택 영역 복구
            util.restoreSelection(tool.linkSel);
            var url = document.getElementById('linkUrl').value;
            var target = document.getElementById('linkTarget').value;
            util.execCommandLink(url, target);
            modal.clean();
            addEvent.hover(qb.nowBlock);
            util.saveAllToStorage();
        }
        this.changeCode = function(){
            var opt = document.getElementById('commonCode').getAttribute('data-opt');
            let code = qb.codeObj.getValue();
            if(qb.codeMode == 'copy') {
                util.copyStr(code);
                alert('The body html code is Copied')
                return;
            }
            code = util.stripScripts(code);
            let el = util.createElementFromHtml(code); // html을 node로 변환
            if(qb.nowBlock && opt == 'block') {
                qb.nowBlock.parentNode.replaceChild(el, qb.nowBlock);
                el.classList.add('qb-selected');
                el.contentEditable=true;
                qb.nowBlock = el;
                // Live Block
                block.liveGuideLine(el);
                block.toolbarReposition();
                // end live Block
                addEvent.hover(el); //hover 액션 추가
            }  else {
                block.canvas.innerHTML = code;
                // let innerDoc = iframe.contentDocument || iframe.contentWindow.document;
                // innerDoc.body.outerHTML = code;
                // // body의 outer까지 재생 했으므로 기존 body로 지정 되어 있는 block.cnavas를 재생된 body로 다시 지정
                // block.canvas = innerDoc.getElementsByTagName("BODY")[0];
                // 재생된 body에 다시 이벤트 적용
                qp.initEvents(block.canvas); // qp js 다시 적용
                addEvent.canvas();
                addEvent.hover(block.canvas); // directbar 다시 설정
                block.liveGuideLine(block.canvas);
            }
            util.saveAllToStorage();
            qp.closeModal('commonCode');

        }
        this.changeSlider = function() {
            let slides = qb.nowDirect.getElementsByClassName('qp-slide-item');
            let indicators = qb.nowDirect.getElementsByClassName('qp-slide-indicator');
            let nextCount = document.getElementById('cmdSliderNumber').value;
            let indicatorWrap = qb.nowDirect.getElementsByClassName('qp-slide-bottom')[0];
            if(slides.length < nextCount) {
                // slide setting
                let lastSlide = slides[slides.length-1];
                let cloneSlide = '';
                let indicator = '';
                let addCount = nextCount - slides.length;
                for(var i = 0; i < addCount; i++) {
                    qb.nowDirect.insertBefore(lastSlide.cloneNode(true),lastSlide.nextElementSibling);
                    indicator = document.createElement('span');
                    indicator.classList.add('qp-slide-indicator', 'as-indicator-dot');
                    indicator.setAttribute('data-slide-target', i + slides.length);
                    indicatorWrap.appendChild(indicator);
                }
            } else if(slides.length > nextCount)  {
                let targetSlide;
                let targetIndicator;
                let removeCount = slides.length - nextCount;
                for(var i = 0; i < removeCount; i++) {
                    targetSlide = slides[slides.length - i -1];
                    qb.nowDirect.removeChild(targetSlide);
                    targetIndicator = indicators[indicators.length - i -1];
                    targetIndicator.parentNode.removeChild(targetIndicator);
                }
            }

            // Indicator Type
            let inType = document.getElementById('cmdSliderIndicatorType').value;
            let x = qb.nowDirect.getElementsByClassName('qp-slide-indicator');
            for(var i = 0; i < x.length; i++){
                x[i].classList.remove('as-indicator-bar');
                x[i].classList.remove('as-indicator-dot');
                x[i].classList.add(inType);
            }
            if(document.getElementById('cmdSliderAuto').checked == true) {
                qb.nowDirect.setAttribute('data-slide-auto','auto');
            } else {
                qb.nowDirect.removeAttribute('data-slide-auto');
            }

            // Reset slider Events
            let newSlider = qb.nowDirect.cloneNode(true);
            qb.nowDirect.parentNode.replaceChild(newSlider, qb.nowDirect);
            qp.initSlide(newSlider);
            addEvent.hover(newSlider);
            util.saveAllToStorage();
            qp.closeModal('commonSlider');
        }
        this.changeInput = function() {
            let type = document.getElementById('modalInputType').value;
            let shape = document.getElementById('modalInputShape').value;
            if(!type) type = 'qp-input';
            qb.nowDirect.classList.remove('qp-input', 'qp-input--line');
            if(type != 'none') qb.nowDirect.classList.add(type);
            if(!shape) shape = 'as-rectangle';
            qb.nowDirect.classList.remove('as-rectangle', 'as-round', 'as-smooth');
            qb.nowDirect.classList.add(shape);

            //button colors
            let color = qp.getValueQradio('modalInputColor');
            if(color && color != 'none') {
                cleanBorderColorClass(qb.nowDirect);
                qb.nowDirect.classList.add(color);
            } else {
                cleanBorderColorClass(qb.nowDirect);
            }
            util.saveAllToStorage();
            qp.closeModal('commonInput');
        }
        this.changeDim = function() {
            let target = qb.nowTarget;
            let widthSelect = document.getElementById('cmdDimWidthSelect').value;
            let widthInput = document.getElementById('cmdDimWidthInput').value;
            let heightSelect = document.getElementById('cmdDimHeightSelect').value;
            let heightInput = document.getElementById('cmdDimHeightInput').value;
            if(widthInput.indexOf('px') < 0 && widthInput.indexOf('%') < 0 ) widthInput = widthInput + 'px';
            if(heightInput.indexOf('px') < 0 && heightInput.indexOf('%') < 0 ) heightInput = heightInput + 'px';
            if(widthSelect == 'auto') target.style.width = '';
            if(widthSelect == 'fixed' && widthInput) target.style.width = widthInput;
            if(heightSelect == 'auto') target.style.height = '';
            if(heightSelect == 'fixed' && heightInput) target.style.height = heightInput;
            // if(mobileWidth) {
            //     if(mobileWidth == 'none') cleanMobileWidthClass(target);
            //     else this.addClass(target,mobileWidth,'mobileWidth');
            // }
            // if(paddingClass) {
            //     if(paddingClass == 'none') {
            //         cleanPaddingClass(target);
            //     } else {
            //         this.addClass(target, paddingClass, 'padding');
            //     }
            // }
            if(document.getElementById('cmdDimPaddingPixelTop').value != '') {
                target.style.paddingTop = document.getElementById('cmdDimPaddingPixelTop').value + 'px';
            } else {
                target.style.paddingTop = '';
            }
            if(document.getElementById('cmdDimPaddingPixelRight').value != '') {
                target.style.paddingRight  = document.getElementById('cmdDimPaddingPixelRight').value + 'px';
            } else {
                target.style.paddingRight = '';
            }
            if(document.getElementById('cmdDimPaddingPixelBottom').value != '') {
                target.style.paddingBottom = document.getElementById('cmdDimPaddingPixelBottom').value + 'px';
            } else {
                target.style.paddingBottom = '';
            }
            if(document.getElementById('cmdDimPaddingPixelLeft').value != '') {
                target.style.paddingLeft = document.getElementById('cmdDimPaddingPixelLeft').value + 'px';
            } else {
                target.style.paddingLeft = '';
            }

            // if(marginClass) {
            //     if(marginClass == 'none') {
            //         cleanMarginClass(target);
            //     } else {
            //         this.addClass(target, marginClass, 'margin');
            //     }
            // }
            if(document.getElementById('cmdDimMarginPixelTop').value != '') {
                target.style.marginTop = document.getElementById('cmdDimMarginPixelTop').value + 'px';
            } else {
                target.style.marginTop = '';
            }
            if(document.getElementById('cmdDimMarginPixelRight').value != '') {
                target.style.marginRight = document.getElementById('cmdDimMarginPixelRight').value + 'px';
            } else {
                target.style.marginRight = '';
            }
            if(document.getElementById('cmdDimMarginPixelBottom').value != '') {
                target.style.marginBottom = document.getElementById('cmdDimMarginPixelBottom').value + 'px';
            } else {
                target.style.marginBottom = '';
            }
            if(document.getElementById('cmdDimMarginPixelLeft').value != '') {
                target.style.marginLeft = document.getElementById('cmdDimMarginPixelLeft').value + 'px';
            } else {
                target.style.marginLeft = '';
            }
            util.saveAllToStorage();
            qp.closeModal('commonDim');
        }
        this.changeIcon = function() {
            let icon = document.getElementById('modalIconIcon').value;
            let size = document.getElementById('modalIconSize').value;
            let color = qp.getValueQradio('modalIconColor');
            if(icon) qb.nowDirect.innerHTML = icon;
            if(size) this.addClass(qb.nowDirect, size, 'fontSize');
            if(color) this.addClass(qb.nowDirect, color, 'color');
            util.saveAllToStorage();
            qp.closeModal('commonIcon');
        }
        this.changeDivider = function() {
            let icon = document.getElementById('modalDividerIcon').value;
            let color = qp.getValueQradio('modalDividerColor');
            if(icon) qb.nowDirect.innerHTML = icon;
            if(color) this.addClass(qb.nowDirect, color, 'dividerColor');
            util.saveAllToStorage();
            qp.closeModal('commonDivider');
        }
        this.changeRes = function() {
            let medium = document.getElementById('modalResMedium').value;
            let small = document.getElementById('modalResSmall').value;
            if(medium) this.addClass(qb.nowTarget, medium, 'resMedium');
            if(small) this.addClass(qb.nowTarget, small, 'resSmall');
            util.saveAllToStorage();
            qp.closeModal('commonRes');
        }
        this.changeAnimate = function() {
            let animate = document.getElementById('animateClass').value;
            let nowAnimate = util.getCurrentClass(qb.nowBlock, 'animate');
            if(animate && animate != 'none') {
                if(nowAnimate) qb.nowBlock.classList.remove(nowAnimate);
                qb.nowBlock.classList.add('as-scroll-event', animate);
                qb.nowBlock.setAttribute('data-scroll-key','view');
                qb.nowBlock.setAttribute('data-scroll-class',animate);
            }
            if(animate == 'none') {
                if(nowAnimate) qb.nowBlock.classList.remove(nowAnimate);
                if(qb.nowBlock.classList.contains('as-scroll-event')) {
                    qb.nowBlock.classList.remove('as-scroll-event')
                    qb.nowBlock.removeAttribute('data-scroll-key');
                    qb.nowBlock.removeAttribute('data-scroll-class');
                }
            }
        }
        this.changeCover = function() {
            let imgUrl = document.getElementById('modalCoverImg').value;
            let align = document.getElementById('modalCoverAlign').value;
            let dark = document.getElementById('modalCoverDark').value;
            if(imgUrl) qb.nowDirect.style.backgroundImage = "url(\'" + imgUrl + " \')";
            if(align && align != 'none') this.addClass(qb.nowDirect, align, 'verticalAlign');
            if(dark) {
                if(dark == 'none') cleanDarkClass(qb.nowDirect);
                else this.addClass(qb.nowDirect, dark, 'dark');
            }
            util.saveAllToStorage();
            qp.closeModal('commonCover');
        }
        this.changeIframe = function() {
            let src = document.getElementById('modalIframeSrc').value;
            let scroll = document.getElementById('modalIframeScroll').value;
            if(src) qb.nowDirect.src = src;
            qb.nowDirect.style.overflow = scroll;
            util.saveAllToStorage();
            qp.closeModal('commonIframe');
        }
        this.changeList = function() {
            let la = document.getElementById('modalListLa').value;
            let md = document.getElementById('modalListMd').value;
            let sm = document.getElementById('modalListSm').value;
            this.addClass(qb.nowTarget, la, 'listResLa');
            this.addClass(qb.nowTarget, md, 'listResMd');
            this.addClass(qb.nowTarget, sm, 'listResSm');
            if(document.getElementById("modalListGap").checked == true) {
                qb.nowTarget.classList.add('as-list-gap');
            } else {
                qb.nowTarget.classList.remove('as-list-gap');
            }
            util.saveAllToStorage();
            qp.closeModal('commonList');
        }
        this.changeGrid = function() {
            if(document.getElementById("modalGridGap").checked == true) {
                qb.nowTarget.classList.add('as-grid-gap');
            } else {
                qb.nowTarget.classList.remove('as-grid-gap');
            }
            util.saveAllToStorage();
            qp.closeModal('commonGrid');
        }
        this.changeLine = function() {
            let style = document.getElementById('modalLineStyle').value;
            let color = qp.getValueQradio('modalLineColor');
            if(style) this.addClass(qb.nowDirect, style, 'line');
            if(color) this.addClass(qb.nowDirect, color, 'borderColor');
            util.saveAllToStorage();
            qp.closeModal('commonLine');
        }
              /*
            add class to the target element
            target : element, value : class name
        */
        this.addClass = function(target, className, property) {
            switch(property) {
                case 'fontSize':
                    cleanFontSizeClass(target);
                    break;
                case 'border' :
                    cleanBorderClass(target);
                    break;
                case 'borderColor' :
                    cleanBorderColorClass(target);
                    break;
                case 'shape' :
                    cleanShapeClass(target);
                    break;
                case 'padding' :
                    cleanPaddingClass(target);
                    break;
                case 'margin' :
                    cleanMarginClass(target);
                    break;
                case 'br' :
                    cleanBrClass(target);
                    break;
                case 'shadow' :
                    cleanShadowClass(target);
                    break;
                case 'color' :
                    cleanTextColorClass(target);
                    break;
                case 'backgroundColor' :
                    cleanBgColorClass(target);
                    break;
                case 'btnSize' :
                    cleanBtnSizeClass(target);
                    break;
                case 'btnColor' :
                    cleanBtnColorClass(target);
                    break;
                case 'dividerColor' :
                    cleanDividerColorClass(target);
                break;
                case 'resMedium' :
                    cleanResMediumClass(target);
                    break;
                case 'resSmall' :
                    cleanResSmallClass(target);
                    break;
                case 'verticalAlign' :
                    cleanVerticalAlignClass(target);
                    break;
                case 'align' :
                    cleanAlignClass(target);
                    break;
                case 'dark' :
                    cleanDarkClass(target);
                    break;
                case 'mibileWidth' :
                    cleanMobileWidthClass(target);
                    break;
                case 'listResLa' :
                    cleanListResLaClass(target);
                    break;
                case 'listResMd' :
                    cleanListResMdClass(target);
                    break;
                case 'listResSm' :
                    cleanListResSmClass(target);
                    break;
                case 'line' :
                    cleanLineClass(target);
                    break;
            }
            target.classList.add(className);
        }
        /******
         remove the same property class
         fontSize, border, Shape....
         *********/
        function cleanFontSizeClass(target) {
            target.style.fontSize = "";
            var classes = ['as-tiny','as-small','as-medium','as-large','as-xlarge','as-xxlarge','as-xxxlarge','as-jumbo'];
            classes.forEach(function(name) {
                if(target.classList.contains(name)) target.classList.remove(name);
            });
        }
        function cleanBorderClass(target) {
            target.style.border = "";
            var classes = ['side', 'tab', 'left', 'right', 'top', 'bottom', 'border'];
            classes.forEach(function(name) {
                var c = 'as-border-' + name;
                if(name == 'border') c = 'as-border';
                if(target.classList.contains(c)) target.classList.remove(c);
            });
        }
        function cleanBorderColorClass(target) {
            qb.colors.forEach(function(name) {
                let className = 'as-border-' + name;
                if(target.classList.contains(className)) target.classList.remove(className);
            });
        }
        function cleanShapeClass(target) {
            // el.style.border = "";
            var classes = ['as-round', 'as-smooth', 'as-rectangle', 'as-circle', 'as-round-left', 'as-round-right', 'as-smooth-left', 'as-smooth-right', 'as-rectangle-left', 'as-rectangle-right', 'as-circle-left', 'as-circle-right'];
            classes.forEach(function(name) {
                if(target.classList.contains(name)) target.classList.remove(name);
            });
        }
        function cleanPaddingClass(target) {
            // el.style.border = "";
            qb.paddingClasses.forEach(function(name) {
                if(target.classList.contains(name)) target.classList.remove(name);
            });
        }
        function cleanMarginClass(target) {
            // el.style.border = "";
            qb.marginClasses.forEach(function(name) {
                if(target.classList.contains(name)) target.classList.remove(name);
            });
        }
        function cleanBrClass(target) {
            // el.style.border = "";
            qb.brClasses.forEach(function(name) {
                if(target.classList.contains(name)) target.classList.remove(name);
            });
        }
        function cleanShadowClass(target) {
            // el.style.border = "";
            qb.shadowClasses.forEach(function(name) {
                if(target.classList.contains(name)) target.classList.remove(name);
            });
        }
        function cleanBtnSizeClass(target) {
            var classes = ['as-btn-tiny', 'as-btn-small', 'as-btn-medium', 'as-btn-large', 'as-btn-xlarge', 'as-btn-xxlarge', 'as-btn-xxxlarge', 'as-btn-jumbo'];
            classes.forEach(function(name) {
                if(target.classList.contains(name)) target.classList.remove(name);
            });
        }
        function cleanBtnColorClass(target) {
            qb.colors.forEach(function(name) {
                let className = 'as-btn-' + name;
                if(target.classList.contains(className)) target.classList.remove(className);
            });
        }
        function cleanDividerColorClass(target) {
            qb.colors.forEach(function(name) {
                let className = 'as-divider-' + name;
                if(target.classList.contains(className)) target.classList.remove(className);
            });
        }
        function cleanTextColorClass(target) {
            qb.colors.forEach(function(name) {
                let className = 'as-text-' + name;
                if(target.classList.contains(className)) target.classList.remove(className);
            });
        }
        function cleanResMediumClass(target) {
            qb.resMediumClasses.forEach(function(name) {
                if(target.classList.contains(name)) target.classList.remove(name);
            });
        }
        function cleanResSmallClass(target) {
            qb.resSmallClasses.forEach(function(name) {
                if(target.classList.contains(name)) target.classList.remove(name);
            });
        }
        function cleanVerticalAlignClass(target) {
            qb.verticalAlignClasses.forEach(function(name) {
                if(target.classList.contains(name)) target.classList.remove(name);
            });
        }
        function cleanAlignClass(target) {
            qb.alignClasses.forEach(function(name) {
                if(target.classList.contains(name)) target.classList.remove(name);
            });
        }
        function cleanDarkClass(target) {
            qb.darks.forEach(function(name) {
                if(target.classList.contains(name)) target.classList.remove(name);
            });
        }
        function cleanMobileWidthClass(target) {
            qb.mobileWidthClasses.forEach(function(name) {
                if(target.classList.contains(name)) target.classList.remove(name);
            });
        }
        function cleanListResLaClass(target) {
            qb.listResLaClasses.forEach(function(name) {
                if(target.classList.contains(name)) target.classList.remove(name);
            });
        }
        function cleanListResMdClass(target) {
            qb.listResMdClasses.forEach(function(name) {
                if(target.classList.contains(name)) target.classList.remove(name);
            });
        }
        function cleanListResSmClass(target) {
            qb.listResSmClasses.forEach(function(name) {
                if(target.classList.contains(name)) target.classList.remove(name);
            });
        }
        function cleanLineClass(target) {
            qb.lineStyleClasses.forEach(function(name) {
                if(target.classList.contains(name)) target.classList.remove(name);
            });
        }
    }
    function Modals() {
        this.create = function(target, key, width) {
            let html = this.html(key);
            let modal = document.createElement('div');
            modal.classList.add('qb-tool-modal','as-border', 'as-white', 'as-pd', 'as-left');
            modal.style.width = width;
            modal.innerHTML = html;
            target.appendChild(modal);
        }
        this.toggle = function(target) {
            // 다른 버튼 클릭 시 기존 활성화된 모달 지우기
            var modals = document.getElementsByClassName('qb-tool-modal');
            var i;
            for(i = 0; i < modals.length; i++) {
                if(modals[i].parentNode != target) modals[i].style.display = "none";
            }
            // modal on/off
            var el = target.getElementsByClassName('qb-tool-modal')[0];
            if(getComputedStyle(el, null).display == "block") el.style.display = "none";
            else el.style.display = "block";
        }
        this.clean = function(){
            var toolModals = document.getElementsByClassName('qb-tool-modal');
            var colorInput, pickerOrder;
            for(var i = 0; i < toolModals.length; i++) {
                toolModals[i].style.display = "none";
                colorInput = toolModals[i].getElementsByClassName('qb-colorinput');
                if(colorInput.length > 0) {
                    pickerOrder =colorInput[0].getAttribute('data-order');
                    pickers[pickerOrder].exit();
                }
            }
            // if(pickrBgColor.isOpen()) pickrBgColor.hide();
            // if(pickrTextColor.isOpen()) pickrTextColor.hide();
            // if(pickrBorderColor.isOpen()) pickrBorderColor.hide();
        }
        this.createCommon = function(key) {
            if(key == 'commonConfig') var id = 'commonConfig', title = 'Document Config', okId = 'cmdOkConfig';
            if(key == 'commonImg') var id = 'commonImg', title = 'Image Configurations', okId = 'cmdOkImg';
            if(key == 'commonLink') var id = 'commonLink', title = 'Edit Link', okId = 'cmdOkLink';
            if(key == 'commonBtn') var id = 'commonBtn', title = 'Button Styles', okId = 'cmdOkBtn';
            if(key == 'commonCode') var id = 'commonCode', title = 'Code', okId = 'cmdOkCode';
            if(key == 'commonSlider') var id = 'commonSlider', title = 'Slider', okId = 'cmdOkSlider';
            if(key == 'commonInput') var id = 'commonInput', title = 'Input', okId = 'cmdOkInput';
            if(key == 'commonDim') var id = 'commonDim', title = 'Dimension', okId = 'cmdOkDim';
            if(key == 'commonDivider') var id = 'commonDivider', title = 'Divider', okId = 'cmdOkDivider';
            if(key == 'commonIcon') var id = 'commonIcon', title = 'Icon', okId = 'cmdOkIcon';
            if(key == 'commonRes') var id = 'commonRes', title = 'Responsive', okId = 'cmdOkRes';
            if(key == 'commonCover') var id = 'commonCover', title = 'Cover', okId = 'cmdOkCover';
            if(key == 'commonIframe') var id = 'commonIframe', title = 'Iframe', okId = 'cmdOkIframe';
            if(key == 'commonList') var id = 'commonList', title = 'List', okId = 'cmdOkList';
            if(key == 'commonGrid') var id = 'commonGrid', title = 'Grid', okId = 'cmdOkGrid';
            if(key == 'commonLine') var id = 'commonLine', title = 'Line', okId = 'cmdOkLine';
            var okName = "Apply";
            var bodyHtml = this.html(key);
            var modal = document.createElement('div');
            modal.setAttribute("id", id);
            modal.classList.add('qp-wrap-modal');
            modal.style.zIndex = '99999999';
            var html =  '<div class="qp-modal"><div class="qp-modal-header">'+ title +'<button onclick="qp.closeModal(\'' + id +'\')" class="qp-btn as-rect as-topright"><i class="fas fa-times"></i></button></div><div class="qp-modal-body">'+ bodyHtml +'</div><div class="qp-modal-footer align-right"><button class="qp-btn as-main" id="'+ okId +'">'+okName+'</button> <button onclick="qp.closeModal(\'' + id +'\')" class="qp-btn as-gray">Close</button></div></div>';
            modal.innerHTML = html;
            document.body.appendChild(modal);

            // full window for code view
            if(key == 'commonCode') {
                let full = document.createElement('button');
                full.classList.add('qp-btn', 'as-rect', 'as-topright');
                full.innerHTML = '<i class="far fa-window-maximize"></i>';
                full.style.marginRight = '45px';
                full.setAttribute('id','btnCodeFull');
                modal.getElementsByClassName('qp-modal-header')[0].appendChild(full);
                full.addEventListener("click", function(e){
                    util.toggleCommonModalSize(id);
                });
            }
        }
        this.openCommon = function(id,target){
            if(id == 'commonImg'){
                var link = '', shape = '';
                document.getElementById('imgUrl').value = qb.nowDirect.src;
                if(qb.nowDirect.classList.contains('as-circle')) shape = 'as-circle';
                if(qb.nowDirect.classList.contains('as-smooth')) shape = 'as-smooth';
                if(qb.nowDirect.classList.contains('as-rectangle')) shape = 'as-rectangle';
                if(qb.nowDirect.classList.contains('as-round')) shape = 'as-round';
                document.getElementById('imgShape').value = shape;
                if(qb.nowDirect.parentNode.tagName == 'A') {
                    document.getElementById('imgAddLink').checked = true;
                    document.getElementById('imgLinkUrl').value = qb.nowDirect.parentNode.href;
                    document.getElementById('imgLinkTarget').value = qb.nowDirect.parentNode.target;
                } else {
                    document.getElementById('imgAddLink').checked = false;
                    document.getElementById('imgLinkUrl').value = '';
                    document.getElementById('imgLinkTarget').value = '';
                }
            }
            if(id == 'commonBtn'){
                document.getElementById('btnFunction').value= qb.nowDirect.getAttribute('onclick');
                if(qb.nowDirect.href) document.getElementById('modalBtnLink').value = qb.nowDirect.href;
                else document.getElementById('modalBtnLink').value ='';
                document.getElementById('modalBtnText').value = qb.nowDirect.innerHTML;
                // 현재 버튼이 가지고 있는 해당 속성의 Class 추출하여, 모달의 기본 값으로 전달
                var btnType = util.getCurrentClass(qb.nowDirect, 'btnType');
                var btnShape = util.getCurrentClass(qb.nowDirect, 'shape');
                var btnSize = util.getCurrentClass(qb.nowDirect, 'btnSize');
                var btnColor = util.getCurrentClass(qb.nowDirect, 'btnColor');
                if(btnType == null) btnType = 'none';
                if(btnShape == null) btnShape = '';
                if(btnSize == null) btnSize = '';
                if(btnColor == null) btnColor = 'none';
                document.getElementById('modalBtnType').value = btnType;
                document.getElementById('modalBtnShape').value = btnShape;
                document.getElementById('modalBtnSize').value = btnSize;
                //Qradio 기본 값 세팅 - qp.js
                qp.setValueQradio('modalBtnColor', btnColor, 'as-btn-large');
                coloring.resetPalette('btnColor');
            }
            if(id == 'commonSlider'){
                document.getElementById('cmdSliderNumber').value = qb.nowDirect.getElementsByClassName('qp-slide-item').length;
                let indicator = qb.nowDirect.getElementsByClassName('qp-slide-indicator')[0];
                if(indicator.classList.contains('as-indicator-dot')) document.getElementById('cmdSliderIndicatorType').value = 'as-indicator-dot';
                else document.getElementById('cmdSliderIndicatorType').value = 'as-indicator-bar';
                if(qb.nowDirect.getAttribute('data-slide-auto') == 'auto') document.getElementById('cmdSliderAuto').checked = true;
                else document.getElementById('cmdSliderAuto').checked = false;
            }
            if(id == 'commonInput'){
                let type = util.getCurrentClass(qb.nowDirect, 'inputType');
                let color = util.getCurrentClass(qb.nowDirect, 'borderColor');
                let shape = util.getCurrentClass(qb.nowDirect, 'shape');
                if(type == null) type = 'none';
                if(shape == null) shape = '';
                if(color == null) color = 'none';
                document.getElementById('modalInputType').value = type;
                document.getElementById('modalInputShape').value = shape;
                //Qradio 기본 값 세팅 - qp.js
                qp.setValueQradio('modalInputColor', color, 'qb-color-selected');
            }
            if(id == 'commonDim'){
                let target = qb.nowTarget;
                let nowWidth = target.style.width;
                let nowHeight = target.style.height;
                let mobileWidth = util.getCurrentClass(target,'mobileWidth');

                if(!nowWidth) {
                    document.getElementById('cmdDimWidthSelect').value = 'auto';
                    document.getElementById('cmdDimWidthInput').value = '';
                    document.getElementById('cmdDimWidthInput').disabled = true;
                } else {
                    document.getElementById('cmdDimWidthSelect').value = 'fixed';
                    document.getElementById('cmdDimWidthInput').value = util.removePx(nowWidth);
                    document.getElementById('cmdDimWidthInput').disabled = false;
                }
                if(!nowHeight) {
                    document.getElementById('cmdDimHeightSelect').value = 'auto';
                    document.getElementById('cmdDimHeightInput').value = '';
                    document.getElementById('cmdDimHeightInput').disabled = true;
                } else {
                    document.getElementById('cmdDimHeightSelect').value = 'fixed';
                    document.getElementById('cmdDimHeightInput').value = util.removePx(nowHeight);
                    document.getElementById('cmdDimHeightInput').disabled = false;
                }
                // if(!mobileWidth) document.getElementById('cmdDimWidthMobile').value = 'none';
                // else document.getElementById('cmdDimWidthMobile').value = mobileWidth;
                // if(target.classList.contains('as-md-none')) document.getElementById('cmdDimWidthMobile').value = 'as-md-none';

                // let paddingClass = util.getCurrentClass(target, 'padding');
                // let marginClass = util.getCurrentClass(target, 'margin');
                // if(paddingClass) document.getElementById('cmdDimPaddingClass').value = paddingClass;
                // else document.getElementById('cmdDimPaddingClass').value = '';

                document.getElementById('cmdDimPaddingPixelTop').value = util.removePx(target.style.paddingTop);
                document.getElementById('cmdDimPaddingPixelBottom').value = util.removePx(target.style.paddingBottom);
                document.getElementById('cmdDimPaddingPixelLeft').value = util.removePx(target.style.paddingLeft);
                document.getElementById('cmdDimPaddingPixelRight').value = util.removePx(target.style.paddingRight);

                // if(marginClass) document.getElementById('cmdDimMarginClass').value = marginClass;
                // else document.getElementById('cmdDimMarginClass').value = '';

                document.getElementById('cmdDimMarginPixelTop').value = util.removePx(target.style.marginTop);
                document.getElementById('cmdDimMarginPixelBottom').value = util.removePx(target.style.marginBottom);
                document.getElementById('cmdDimMarginPixelLeft').value = util.removePx(target.style.marginLeft);
                document.getElementById('cmdDimMarginPixelRight').value = util.removePx(target.style.marginRight);
            }
            if(id == 'commonConfig'){
                document.getElementById('configCssWarning').style.display = 'none';
                document.getElementById('configCss').value = iframe.contentDocument.getElementById('qpcss').href;
                document.getElementById('configFontFamily').value = getComputedStyle(block.canvas, null).fontFamily;
                if(!block.canvas.style.backgroundColor) document.getElementById('configBgColor').value = "";
                else document.getElementById('configBgColor').value = util.currentStyle(block.canvas, 'backgroundColor');
                if(!block.canvas.style.color) document.getElementById('configTextColor').value = "";
                else document.getElementById('configTextColor').value = util.currentStyle(block.canvas, 'color');
                var url = util.currentStyle(block.canvas, 'backgroundImage');
                document.getElementById('configBgImgUrl').value = url.slice(4, -1).replace(/"/g, "");
                document.getElementById('configBgImgSize').value = util.currentStyle(block.canvas, 'backgroundSize');
                document.getElementById('configBgImgRepeat').value = util.currentStyle(block.canvas, 'backgroundRepeat');
                document.getElementById('configBgImgPosition').value = util.currentStyle(block.canvas, 'backgroundPosition');
            }
            if(id == 'commonIcon'){
                document.getElementById('modalIconIcon').value = qb.nowDirect.innerHTML;
                let size = util.getCurrentClass(qb.nowDirect,'fontSize');
                if(size) document.getElementById('modalIconSize').value = size;
                else document.getElementById('modalIconSize').value = 'as-jumbo';
                let color = util.getCurrentClass(qb.nowDirect, 'color');
                if(color == null) color = 'none';
                //Qradio 기본 값 세팅 - qp.js
                qp.setValueQradio('modalIconColor', color, 'qb-color-selected');
            }
            if(id == 'commonDivider'){
                document.getElementById('modalDividerIcon').value = qb.nowDirect.innerHTML;
                let color = util.getCurrentClass(qb.nowDirect, 'dividerColor');
                if(color == null) color = 'none';
                //Qradio 기본 값 세팅 - qp.js
                qp.setValueQradio('modalDividerColor', color, 'as-btn-large');
                coloring.resetPalette('dividerColor');
            }
            if(id == 'commonRes'){
                var target = qb.nowTarget;
                var mdClass = util.getCurrentClass(target, 'resMd');
                var smClass = util.getCurrentClass(target, 'resSm');
                if(mdClass) document.getElementById('modalResMedium').value = mdClass;
                else document.getElementById('modalResMedium').value = '';
                if(smClass) document.getElementById('modalResSmall').value = smClass
                else document.getElementById('modalResSmall').value = '';
            }
            if(id == 'commonCover'){
                var bgUrl = qb.nowDirect.style.backgroundImage;
                if(bgUrl) bgUrl = bgUrl.slice(4, -1).replace(/"/g, "");
                var verticalAlign = util.getCurrentClass(qb.nowDirect, 'verticalAlign');
                var dark = util.getCurrentClass(qb.nowDirect, 'dark');
                if(!verticalAlign) verticalAlign = 'as-bottom';
                if(!dark) dark = 'none';
                if(dark == 'as-dark') dark = 'as-dark5';
                document.getElementById('modalCoverImg').value = bgUrl;
                document.getElementById('modalCoverAlign').value = verticalAlign;
                document.getElementById('modalCoverDark').value = dark;
            }
            if(id == 'commonIframe'){
                let src = qb.nowDirect.src;
                let scroll = qb.nowDirect.style.overflow;
                if(!scroll) scroll = 'auto';
                document.getElementById('modalIframeSrc').value = src;
                document.getElementById('modalIframeScroll').value = scroll;
            }
            if(id == 'commonList'){
                let la, md, sm;
                let target = qb.nowTarget;
                for(var i = 0; i < qb.listResLaClasses.length; i++) {
                    if(target.classList.contains(qb.listResLaClasses[i])) {
                        la = qb.listResLaClasses[i];
                        break;
                    }
                }
                for(var i = 0; i < qb.listResMdClasses.length; i++) {
                    if(target.classList.contains(qb.listResMdClasses[i])) {
                        md = qb.listResMdClasses[i];
                        break;
                    }
                }
                for(var i = 0; i < qb.listResSmClasses.length; i++) {
                    if(target.classList.contains(qb.listResSmClasses[i])) {
                        sm = qb.listResSmClasses[i];
                        break;
                    }
                }
                if(!la) la = 'as-la3';
                if(!md) md = 'as-md2';
                if(!sm) sm = 'as-sm1';
                document.getElementById('modalListLa').value = la;
                document.getElementById('modalListMd').value = md;
                document.getElementById('modalListSm').value = sm;

                if(target.classList.contains('as-list-gap')) document.getElementById('modalListGap').checked = true;
                else document.getElementById('modalListGap').checked = false;
            }
            if(id == 'commonGrid') {
                if(qb.nowTarget.classList.contains('as-grid-gap')) document.getElementById('modalGridGap').checked = true;
                else document.getElementById('modalGridGap').checked = false;
            }
            if(id == 'commonLine'){
                let style,color;
                for(var i = 0; i < qb.lineStyleClasses.length; i++) {
                    if(qb.nowDirect.classList.contains(qb.lineStyleClasses[i])) {
                        style = qb.lineStyleClasses[i];
                        break;
                    }
                }
                if(!style) style = 'as-line-solid';
                document.getElementById('modalLineStyle').value = style;
                color = util.getCurrentClass(qb.nowDirect, 'borderColor');
                if(color == null) color = 'none';
                //Qradio 기본 값 세팅 - qp.js
                qp.setValueQradio('modalLineColor', color, 'qb-color-selected');

            }
            if(id == 'commonCode') {
                if(qb.codeMode == 'copy') {
                    document.getElementById('cmdOkCode').innerHTML = 'COPY';
                } else {
                    document.getElementById('cmdOkCode').innerHTML = 'Apply';
                }
            }
            qp.openModal(id);
        }
        this.html = function(key){
            var html = '';
            if(key == 'bgImg') {
                html = html + '<div id="qb_bgImgForm">';
                html = html + '<input type="text" id="bgImgUrl" class="qp-input" placeholder="image url" style="width:280px">';
                if(config['useImgUploadBtn']) html = html + ' <button id="bgImgUploader" class="qp-btn as-btn-main as-large as-btn-tiny"><i class="far fa-file-image"></i></button>';
                html = html + '<s></s>';
                    html = html + '<select class="qp-input" id="bgImgSize">';
                    html = html + '<option value="cover"> cover </option> ';
                    html = html + '<option value="auto"> auto </option> ';
                    html = html + '<option value="contain"> contain </option> ';
                    html = html + '<option value="initial"> initial </option> ';
                html = html + '</select> ';
                    html = html + '<select class="qp-input" id="bgImgRepeat">';
                    html = html + '<option value="repeat"> repeat </option> ';
                    html = html + '<option value="repeat-x"> repeat-x </option> ';
                    html = html + '<option value="repeat-y"> repeat-y </option> ';
                    html = html + '<option value="no-repeat"> no-repeat </option> ';
                html = html + '</select> ';
                    html = html + '<select class="qp-input" id="bgImgPosition">';
                    html = html + '<option value="0% 0%"> left top </option> ';
                    html = html + '<option value="0% 50%"> left center </option> ';
                    html = html + '<option value="0% 100%"> left bottom </option> ';
                    html = html + '<option value="100% 0%"> right top </option> ';
                    html = html + '<option value="100% 50%"> right center </option> ';
                    html = html + '<option value="100% 100%"> right bottom </option> ';
                    html = html + '<option value="50% 0%"> center top </option> ';
                    html = html + '<option value="50% 50%"> center center </option> ';
                    html = html + '<option value="50% 100%"> center bottom </option> ';
                html = html + '</select> ';
                html = html + '<s></s>';
                html = html + '<button class="qp-btn" id="okBgImg">Apply</button>';
                html = html + '</div>';
            }
            if(key == 'bgColor') {
                html = util.getColorHtml('bgColor');
            }
            if(key == 'textColor') {
                html = util.getColorHtml('textColor');
            }
            if(key == 'borderColor') {
                html = util.getColorHtml('borderColor');
            }
            if(key == 'fontFamily') {
                html = html + '<label class="as-w100 as-bold">Current Font</label>';
                html = html + '<div class="as-shade as-pd as-mg-bottom" id="infoCurrentFont"></div>';
                html = html + '<label class="as-w100 as-bold">Change Font</label>'
                    + '<select class="qp-input" id="selectFontFamily">'
                        + '<option id="headOptionFontFamily" selected>Select Font</option>'
                        + '<option>-------------</option>'
                        + '<option value="none">None</option>'
                        + '<optgroup id="optGoogleFont" label="Google Fonts">';
                        qb.googleFonts.forEach(function(name){
                            html = html + '<option value="'+name+'">'+ name + '</option>';
                        });
                        html = html + '</optgroup>'
                        + '<optgroup label="Web Browser Fonts">';
                        qb.safeFonts.forEach(function(name){
                            html = html + '<option value="'+name+'">'+ name + '</option>';
                        });
                        html = html + '</optgroup>'
                    + '</select><s></s><div class="qp-line"></div>';
                html = html + '<label class="as-w100 as-bold">Add Google Font</label>'
                    + '<input type="text" id="inputNewFont" class="qp-input"> <button id="btnNewFont" class="qp-btn">Add</button><s></s>'
                    + '<p><span id="inputResult" class="as-text-blue"></span>Insert the exect font name and then will be added automatically</p>';
            }
            if(key == 'textSize') {
                html = html + '<label>Qpress text size Classes</label><div class="qp-row-btn">';
                qb.fontSizeClasses.forEach(function(name) {
                  var sizeName = name.replace('as-','');
                  html = html + '<button style="width:70px" data-value="'+ sizeName +'"" class="qb-fontsizclass qp-btn as-btn-fit">' + sizeName + '</button> ';
                });
                html = html + '</div><s></s>';
                html = html + '<div class="qp-grid">'
                        + '<div class="qp-grid-cell">'
                            + '<label class="as-w100">Text Size(pixel)</label>';
                            html = html + '<select id="selectFontSize" style="width:80px" class="qp-input">';
                            for(var i = 8; i < 51; i++){
                                html = html + '<option value="'+ i +'px"> '+ i +'px </option>';
                            }
                            html = html + '</select>';
                        html = html + '</div>'
                        + '<div class="qp-grid-cell">'
                            + '<label class="as-w100">Line Height</label>'
                            + '<input type="test" id="inputLineHeight" readonly class="qp-input"  maxlength="3" size="3" style="width:50px;margin-right:5px">'
                            + '<span id="btnLineHeightUp" class="as-pointer as-hover-text-blue" style="margin-right:5px;font-size:16px"><i class="fas fa-plus-circle"></i></span>'
                            + '<span id="btnLineHeightDown" class="as-pointer as-hover-text-blue" style="font-size:16px"><i class="fas fa-minus-circle"></i></span>'
                        + '</div>'
                + '</div>';
                // html = html + '<select id="fontSizeSelect" style="width:140px" class="qp-input">';
                // for(var i = 8; i < 51; i++){
                //     html = html + '<option value="'+ i +'px"> '+ i +'px </option>';
                // }
                // html = html + '</select>';
            }
            if(key == 'heading') {
                html = '<div id="selectHeading">'
                + '<h1 class="as-hover-text-main">Heading 1</h1>'
                + '<h2 class="as-hover-text-main">Heading 2</h2>'
                + '<h3 class="as-hover-text-main">Heading 3</h3>'
                + '<h4 class="as-hover-text-main">Heading 4</h4>'
                + '<h5 class="as-hover-text-main">Heading 5</h5>'
                + '<h6 class="as-hover-text-main">Heading 6</h6>'
                + '</div>'
            }
            if(key == 'link') {
                html = html + '<div id="linkForm">';
                html = html + '<input type="text" id="linkUrl" class="qp-input" placeholder="Link url" style="width:350px">';
                html = html + '<s></s>';
                html = html + '<select class="qp-input" id="linkTarget">';
                    html = html + '<option value=""> Window </option> ';
                    html = html + '<option value="_self"> Self </option> ';
                    html = html + '<option value="_blank"> New window </option> ';
                html = html + '</select> ';
                html = html + '<s></s>';
                html = html + '<button class="qp-btn" id="okLinkForm">Apply</button>';
                html = html + '</div>';
            }
            if(key == 'border') {
                html = html + '<div class="qp-row-btn">';
                html = html + '<button style="width:60px;outline:1px solid  #e2e6e9" class="qb-borderclass qp-btn as-btn-white" data-value="as-border-none">None</button>';
                qb.directinClasses.forEach(function(value) {
                  var borderClass = 'as-border-' + value;
                  if(value == '-') {
                      value = 'All';
                      borderClass = 'as-border';
                  }
                  html = html + '<button style="width:60px;outline:1px solid  #e2e6e9" data-value="'+ borderClass +'" class="qb-borderclass qp-btn as-btn-white ' + borderClass + ' as-border-main as-border-2px">' + value + '</button> ';
                });
                html = html + '</div> <br>';
                html = html + '<select id="borderSizeSelect" style="width:124px" class="qp-input"">';
                for(var i = 1; i < 20; i++){
                    html = html + '<option value="'+ i +'px"> '+ i +'px </option>';
                }
                html = html + '</select>';
            }
            if(key == 'space') {
                html = html + '<h6>Inner Space(Padding)</h6>'
                + '<div class="qp-qradio" id="modalPd">'
                    + '<input type="hidden" name="modalPd" value="" />'
                    + '<div class="qp-row as-br">'
                        + '<button value="as-pd" onclick="qp.checkQradio(this)" class="qp-btn as-btn-tiny  as-btn-gray"><i class="fas fa-plus-circle"></i> Default</button>'
                        + '<button value="as-pd2" onclick="qp.checkQradio(this)" class="qp-btn as-btn-tiny as-btn-gray"><i class="fas fa-plus-circle"></i> Double</button>'
                        + '<button value="as-pd3" onclick="qp.checkQradio(this)" class="qp-btn as-btn-tiny as-btn-gray"><i class="fas fa-plus-circle"></i> Triple</button>'
                        + '<button value="as-pd4" onclick="qp.checkQradio(this)" class="qp-btn as-btn-tiny as-btn-gray"><i class="fas fa-plus-circle"></i> quadruple</button>'
                        + '<button value="as-fit" onclick="qp.checkQradio(this)" class="qp-btn as-btn-tiny as-btn-grayx"><i class="fas fa-eraser"></i> None</button>'
                    + '</div>'
                + '</div>'
                    + '<div class="qp-line"></div>'
                    + '<h6>Bottom Space(Margin)</h6>'
                    + '<div class="qp-qradio" id="modalBr">'
                        + '<input type="hidden" name="modalBr" value="" />'
                        + '<div class="qp-row as-br">'
                            + '<button value="as-br" onclick="qp.checkQradio(this)" class="qp-btn as-btn-tiny  as-btn-gray"><i class="fas fa-plus-circle"></i> Default</button>'
                            + '<button value="as-br2" onclick="qp.checkQradio(this)" class="qp-btn as-btn-tiny as-btn-gray"><i class="fas fa-plus-circle"></i> Double</button>'
                            + '<button value="as-br3" onclick="qp.checkQradio(this)" class="qp-btn as-btn-tiny as-btn-gray"><i class="fas fa-plus-circle"></i> Triple</button>'
                            + '<button value="as-br4" onclick="qp.checkQradio(this)" class="qp-btn as-btn-tiny as-btn-gray"><i class="fas fa-plus-circle"></i> quadruple</button>'
                            + '<button value="as-br-none" onclick="qp.checkQradio(this)" class="qp-btn as-btn-tiny as-btn-grayx"><i class="fas fa-eraser"></i> None</button>'
                        + '</div>'
                    + '</div>'
            }
            if(key == 'shadow') {
                html = html + ''
                + '<div class="qp-qradio" id="modalShadow">'
                    + '<input type="hidden" name="modalShadow" value="" />'
                    + '<div class="qp-row as-br">'
                        + '<button value="as-shadow" onclick="qp.checkQradio(this)" class="qp-btn as-btn-tiny as-btn-gray">Normal</button>'
                        + '<button value="as-shadow-ribbon" onclick="qp.checkQradio(this)" class="qp-btn as-btn-tiny as-btn-gray">Ribbon</button>'
                        + '<button value="as-shadow-bottom" onclick="qp.checkQradio(this)" class="qp-btn as-btn-tiny as-btn-gray">Bottom</button>'
                        + '<button value="as-shadow-tab" onclick="qp.checkQradio(this)" class="qp-btn as-btn-tiny as-btn-gray">Top & Bottom</button>'
                        + '<button value="as-shadow-side" onclick="qp.checkQradio(this)" class="qp-btn as-btn-tiny as-btn-gray">Side</button>'
                        + '<button value="none" onclick="qp.checkQradio(this)" class="qp-btn as-btn-tiny as-btn-grayx"><i class="fas fa-eraser"></i> None</button>'
                    + '</div>'
                + '</div>'
                + '<div>You must set the background color before using shadow effects.</div>'
            }
            if(key == 'animate') {
                html = html + '<h6>Animation</h6>'
                    + '<select id="animateClass" class="qp-input as-br">'
                        + '<option value="">Select animation</option>'
                        + '<option value="as-animate-zoom">Zoom</option>'
                        + '<option value="as-animate-opacity">Opacity</option>'
                        + '<option value="as-animate-up">Up</option>'
                        + '<option value="as-animate-down">Down</option>'
                        + '<option value="as-animate-right">Left to right</option>'
                        + '<option value="as-animate-left">Right to left</option>'
                        + '<option value="none">None</option>'
                    + '</select>';
            }
            if(key == 'commonImg') {
                html = html + '<input type="text" id="imgUrl" class="qp-input as-w80 as-mg-bottom" placeholder="Image URL">';
                if(config['useImgUploadBtn']) html = html + ' <button id="imgUploader" class="qp-btn as-btn-main as-large as-btn-tiny"><i class="far fa-file-image"></i></button>';
                html = html + '<select class="qp-input" id="imgShape">';
                    html = html + '<option value=""> Shape </option> ';
                    html = html + '<option value="as-circle"> circle </option> ';
                    html = html + '<option value="as-round"> round </option> ';
                    html = html + '<option value="as-smooth"> smooth </option> ';
                    html = html + '<option value="as-rectangle"> rectangle </option> ';
                html = html + '</select><s></s>';
                html = html + '<input type="checkbox" class="qp-input" id="imgAddLink"> link <s></s>';
                html = html + '<input type="text"  id="imgLinkUrl" class="qp-input as-w100 as-mg-bottom" placeholder="Link URL">';
                html = html + '<select class="qp-input" id="imgLinkTarget">';
                    html = html + '<option value=""> Window </option> ';
                    html = html + '<option value="_self"> Self </option> ';
                    html = html + '<option value="_blank"> New window </option> ';    html = html + '</select>';
            }
            if(key == 'commonBtn') {
                html = html + '<label>Function on click</label><input type="text" id="btnFunction" class="qp-input as-w100" placeholder="onClick Function"><s></s>'
                 + '<label>Link URL(for A tag only)</label><input type="text" id="modalBtnLink" class="qp-input as-w100" placeholder="Href"><s></s>'
                 + '<label>Text</label><input type="text" id="modalBtnText" class="qp-input as-w100"><s></s>'
                 + '<label class="as-w100">Style & Shape</label>'
                 + '<select id="modalBtnType" class="qp-input">'
                     + '<option value="">Button Type</option>'
                     + '<option value="none">none</option> '
                     + '<option value="qp-btn">normal</option> '
                     + '<option value="qp-btn2">outline</option> '
                 + '</select> '
                 + '<select id="modalBtnShape" class="qp-input">'
                     + '<option value="">Button Shape</option>'
                     + '<option value="as-rectangle">Rectangle</option> '
                     + '<option value="as-smooth">Smooth</option> '
                     + '<option value="as-round">Round</option> '
                     + '<option value="as-circle">Circle</option> '
                 + '</select> '
                 + '<select id="modalBtnSize" class="qp-input">'
                     + '<option value="">Button Size</option>'
                     + '<option value="as-btn-tiny">Tiny</option> '
                     + '<option value="as-btn-small">Small</option> '
                     + '<option value="as-btn-medium">Medium</option> '
                     + '<option value="as-btn-large">Large</option> '
                     + '<option value="as-btn-xlarge">xLarge</option> '
                     + '<option value="as-btn-xxlarge">xxLarge</option> '
                     + '<option value="as-btn-xxxlarge">xxxLarge</option> '
                     + '<option value="as-btn-jumbo">Jumbo</option> '
                 + '</select><s></s><labe>Button Color</label>'
                 + '<div class="qp-qradio" id="modalBtnColor">'
                 + '<input type="hidden" value="" />'
                 + '<div class="qp-row-btn"><button class="qp-btn as-btn-fit as-btn-parent" value="none" onClick="qp.checkQradio(this, \'as-btn-large\')">None</button>';
                 qb.colors.forEach(function(name) {
                     var btnColor = 'as-btn-' + name;
                     // html = html + '<button class="qp-btn as-btn-fit as-btn-parent as-text-'+ name +'" value="'+ btnColor +'" onClick="qp.checkQradio(this, \'qb-color-selected\')"> <i class="fas fa-circle"></i> <span class="as-text-gray">'+ name +'</span></button>';
                     html = html + '<button data-type="btnColor" class="qp-btn as-btn-fit as-btn-'+ name +'" value="'+ btnColor +'" onClick="qp.checkQradio(this, \'as-btn-large\')"> '+ name +'</button>';
                 });
                     html = html + '</div>'
                 + '</div>'
            }
            if(key == 'commonCode') {
                //let str = '<span style="color:red">test</span>';
                html = '';
            }
            if(key == 'commonSlider') {
                html = html + '<label class="as-block">Slide Number</label>'
                html = html + '<select class="qp-input" id="cmdSliderNumber">';
                for(var i = 2; i < 11; i++){
                    html = html + '<option value="'+ i +'"> '+ i +' slide </option>';
                }
                html = html  + '</select><s></s>';
                html = html + '<label class="as-block">Indicator Type</label>'
                html = html + '<select class="qp-input" id="cmdSliderIndicatorType">'
                                + '<option value="as-indicator-dot">dot</option><option value="as-indicator-bar">bar</option>'
                html = html  + '</select><s></s>';
                html = html + '<input type="checkbox" class="qp-input" id="cmdSliderAuto"> Auto Start <s></s>';
            }
            if(key == 'commonInput') {
                html = html + '<select id="modalInputType" class="qp-input">'
                    + '<option value="">Input Style</option>'
                    + '<option value="none">None</option> '
                    + '<option value="qp-input">Normal</option> '
                    + '<option value="qp-input--line">Underline</option> '
                    + '</select> ';
                html = html + '<select id="modalInputShape" class="qp-input">'
                    + '<option value="">Input Shape</option>'
                    + '<option value="as-rectangle">rectangle</option> '
                    + '<option value="as-smooth">smooth</option> '
                    + '<option value="as-round">round</option> '
                    + '</select> ';
                html = html + '<s></s><label>Input Color</label><div class="qp-qradio" id="modalInputColor">'
                    + '<input type="hidden" value="" />'
                    + '<div class="qp-row-btn"><button class="qp-btn as-btn-fit as-btn-parent as-text-black" value="none" onClick="qp.checkQradio(this, \'qb-color-selected\')">None</button>';
                    qb.colors.forEach(function(name) {
                        var inputColor = 'as-border-' + name;
                        html = html + '<button class="qp-btn as-btn-fit as-btn-parent as-text-'+ name +'" value="'+ inputColor +'" onClick="qp.checkQradio(this, \'qb-color-selected\')"> <i class="fas fa-circle"></i> <span class="as-text-gray">'+ name +'</span></button>';
                    });
                    html = html + '</div>'
                + '</div>';
            }
            if(key == 'commonDim') {
                html = html + '<div class="qbn-dim">';
                html = html + '<div class="qp-grid as-grid-fit">'
                        + '<div class="qp-grid-cell">'
                            + '<h6 class="as-bold">Width</h6>'
                            + '<div class="qp-row as-fit">'
                                + '<select id="cmdDimWidthSelect" class="qp-input as-shade">'
                                   + '<option value="auto">Auto</option>'
                                   + '<option value="fixed">fixed</option>'
                                + '</select>'
                                + '<input type="text" id="cmdDimWidthInput" class="qp-input" style="width:80px">'
                            + '</div>'
                        + '</div>'
                        // + '<div class="qp-grid-cell as-pd-left">'
                        //     +  '<h6>Mobile Width</h6>'
                        //     + '<div class="qp-row as-fit">'
                        //        + '<select id="cmdDimWidthMobile" class="qp-input" style="height:38px">'
                        //            + '<option value="none">No set</option>'
                        //            + '<option value="as-md-w100">100%</option>'
                        //            + '<option value="as-md-w50">50%</option>'
                        //            + '<option value="as-md-none">Hide</option>'
                        //        + '</select>'
                        //     + '</div>'
                        // + '</div>'
                        + '<div class="qp-grid-cell as-pd-left">'
                            +  '<h6 class="as-bold">Height</h6>'
                            + '<div class="qp-row as-fit">'
                               + '<select id="cmdDimHeightSelect" class="qp-input as-shade">'
                                   + '<option value="auto">Auto</option>'
                                   + '<option value="fixed">Fixed</option>'
                               + '</select>'
                               + '<input type="text" id="cmdDimHeightInput" class="qp-input" style="width:80px">'
                            + '</div>'
                        + '</div>'
                    + '</div><s></s>'
                    + '<p>The fixed value must be a number(pixel)</p>'
                    + '<div class="qp-line"></div>';
                html = html + '<h6 class="as-bold">Padding</h6>'
                    // + '<select id="cmdDimPaddingClass" class="qp-input">'
                    //     + '<option value="">Padding Class</option>'
                    //     + '<option value="none">None</option>'
                    //     + '<option value="as-pd">All</option>'
                    //     + '<option value="as-pd-left">Left</option>'
                    //     + '<option value="as-pd-right">Right</option>'
                    //     + '<option value="as-pd-side">Side</option>'
                    //     + '<option value="as-pd-top">Top</option>'
                    //     + '<option value="as-pd-bottom">Bottom</option>'
                    //     + '<option value="as-pd-tab">Top/Bottom</option>'
                    //     + '<option value="as-pd-large">Large</option>'
                    //     + '<option value="as-pd-xlarge">xLarge</option>'
                    //     + '<option value="as-pd-xxlarge">xxLarge</option>'
                    //     + '<option value="as-pd-jumbo">Jumbo</option>'
                    // + '</select> <s></s>'
                    // + '<label>Add Padding pixel(Optional)</label>'
                    + '<div class="qp-row as-fit">'
                        + '<label>Top</label>'
                        + '<input type="text" id="cmdDimPaddingPixelTop" class="qp-input" style="width:40px">'
                        + '<label>Right</label>'
                        + '<input type="text" id="cmdDimPaddingPixelRight" class="qp-input" style="width:40px">'
                        + '<label>Bottom</label>'
                        + '<input type="text" id="cmdDimPaddingPixelBottom" class="qp-input" style="width:40px">'
                        + '<label>Left</label>'
                        + '<input type="text"  id="cmdDimPaddingPixelLeft"class="qp-input" style="width:40px">'
                    + '</div><s></s><p>The value must be a number(pixel)</p>';
                    html = html +  '<div class="qp-line"></div><h6 class="as-bold">Margin</h6>'
                        // + '<select id="cmdDimMarginClass" class="qp-input">'
                        //     + '<option value="">Margin Class</option>'
                        //     + '<option value="none">None</option>'
                        //     + '<option value="as-mg">All</option>'
                        //     + '<option value="as-mg-left">Left</option>'
                        //     + '<option value="as-mg-right">Right</option>'
                        //     + '<option value="as-mg-side">Side</option>'
                        //     + '<option value="as-mg-top">Top</option>'
                        //     + '<option value="as-mg-bottom">Bottom</option>'
                        //     + '<option value="as-mg-tab">Top/Bottom</option>'
                        // + '</select> <s></s>'
                        // + '<label>Add Margin pixel(Optional)</label>'
                        + '<div class="qp-row as-fit">'
                            + '<label>Top</label>'
                            + '<input type="text" id="cmdDimMarginPixelTop" class="qp-input" style="width:40px">'
                            + '<label>Right</label>'
                            + '<input type="text" id="cmdDimMarginPixelRight" class="qp-input" style="width:40px">'
                            + '<label>Bottom</label>'
                            + '<input type="text" id="cmdDimMarginPixelBottom" class="qp-input" style="width:40px">'
                            + '<label>Left</label>'
                            + '<input type="text"  id="cmdDimMarginPixelLeft" class="qp-input" style="width:40px">'
                        + '</div><s></s><p>The value must be a number(pixel)</p>';
                html = html + '</div>'; // class= qbn-dim
            }
            if(key == 'commonConfig') {
                html = html + '<label class="as-w100 as-bold">Change qp.css</label>'
                    + '<input type="text" id="configCss" class="qp-input as-br" style="width:100%">'
                    + '<p id="configCssWarning" class="as-hidden"></p>'
                    + '<p>Use absolute path with <mark>https://</mark></p>'
                    + '<div class="qp-line"></div>'
                    + '<label class="as-w100 as-bold">Change Body Font</label>'
                    + '<input type="text" id="configFontFamily" class="qp-input as-br" placeholder="Font family" style="width:100%">'
                    + '<div class="qp-line"></div>'
                    // + '<select class="qp-input" id="configSelectFont">'
                    //     + '<option value="" selected>Select Font</option>'
                    //     + '<option value="">-------------</option>'
                    //     + '<option value="none">None</option>'
                    //     + '<optgroup label="Google Fonts">';
                    //     qb.googleFonts.forEach(function(name){
                    //         html = html + '<option value="'+name+'">'+ name + '</option>';
                    //     });
                    //     html = html + '</optgroup>'
                    //     + '<optgroup label="Web Browser Fonts">';
                    //     qb.safeFonts.forEach(function(name){
                    //         html = html + '<option value="'+name+'">'+ name + '</option>';
                    //     });
                    //     html = html + '</optgroup>'
                    // + '</select><s></s><div class="qp-line"></div>'
                    + '<label class="as-w100 as-bold">Body Color</label>'
                    + '<input type="text" id="configBgColor" class="qp-input" placeholder="Background" style="width:100px">'
                    + ' <input type="text" id="configTextColor" class="qp-input" placeholder="Text Color" style="width:100px">'
                    // + ' <button class="qp-btn as-btn-parent" id="configColor"><i class="fas fa-palette"></i></button>'
                    + '<p class="as-mg-top">Only Hex Color code (e.g. #000000)</p>'
                    + '<div class="qp-line"></div>'
                    + '<label class="as-w100 as-bold">Background Image</label>'
                    + '<input type="text" id="configBgImgUrl" class="qp-input" placeholder="image url" style="width:100%">'
                    + '<s></s>'
                        + '<select class="qp-input" id="configBgImgSize">'
                        + '<option value="cover"> cover </option> '
                        + '<option value="auto"> auto </option> '
                        + '<option value="contain"> contain </option> '
                        + '<option value="initial"> initial </option> '
                    + '</select> '
                        + '<select class="qp-input" id="configBgImgRepeat">'
                        + '<option value="repeat"> repeat </option> '
                        + '<option value="repeat-x"> repeat-x </option> '
                        + '<option value="repeat-y"> repeat-y </option> '
                        + '<option value="no-repeat"> no-repeat </option> '
                    + '</select> '
                        + '<select class="qp-input" id="configBgImgPosition">'
                        + '<option value="0% 0%"> left top </option> '
                        + '<option value="0% 50%"> left center </option> '
                        + '<option value="0% 100%"> left bottom </option> '
                        + '<option value="100% 0%"> right top </option> '
                        + '<option value="100% 50%"> right center </option> '
                        + '<option value="100% 100%"> right bottom </option> '
                        + '<option value="50% 0%"> center top </option> '
                        + '<option value="50% 50%"> center center </option> '
                        + '<option value="50% 100%"> center bottom </option> '
                    + '</select> '
                    + '<s></s>';

            }
            if(key == 'commonDivider') {
                html = html + '<label class="as-w100 as-bold">Divider Icon</label>'
                        + '<input type="text" id="modalDividerIcon" class="qp-input as-w100 as-br">'
                        + '<label class="as-w100 as-bold">Color</label>'
                        + '<div class="qp-qradio" id="modalDividerColor">'
                            + '<input type="hidden" value="" />'
                            + '<div class="qp-row-btn"><button class="qp-btn as-btn-fit as-btn-parent as-text-black" value="none" onClick="qp.checkQradio(this, \'qb-color-selected\')">None</button>';
                            qb.colors.forEach(function(name) {
                                var dividerColor = 'as-divider-' + name;
                                // html = html + '<button class="qp-btn as-btn-fit as-btn-parent as-text-'+ name +'" value="'+ dividerColor +'" onClick="qp.checkQradio(this, \'qb-color-selected\')"> <i class="fas fa-circle"></i> <span class="as-text-gray">'+ name +'</span></button>';
                                html = html + '<button data-type="dividerColor" class="qp-btn as-btn-fit as-btn-'+ name +'" value="'+ dividerColor +'" onClick="qp.checkQradio(this, \'as-btn-large\')"> '+ name +'</button>';
                            });
                                html = html + '</div>'
                        + '</div>';
            }
            if(key == 'commonIcon') {
                html = html + '<label class="as-w100 as-bold">Icon</label>'
                        + '<input type="text" id="modalIconIcon" class="qp-input as-w100 as-br">'
                        + '<label class="as-w100 as-bold">Icon Size</label>'
                        + '<select id="modalIconSize" class="qp-input as-br">'
                            + '<option value="as-jumbo">jumbo</option> '
                            + '<option value="as-xxxlarge">xxxlarge</option> '
                            + '<option value="as-xxxlarge">xxxlarge</option> '
                            + '<option value="as-xxlarge">xxlarge</option> '
                            + '<option value="as-xlarge">xlarge</option> '
                            + '<option value="as-large">large</option> '
                            + '<option value="as-medium">medium</option> '
                            + '<option value="as-small">small</option> '
                            + '<option value="as-tiny">tiny</option> '
                        + '</select> '
                        + '<label class="as-w100 as-bold">Color</label>'
                        + '<div class="qp-qradio" id="modalIconColor">'
                            + '<input type="hidden" value="" />'
                            + '<div class="qp-row-btn"><button class="qp-btn as-btn-fit as-btn-parent as-text-black" value="none" onClick="qp.checkQradio(this, \'qb-color-selected\')">None</button>';
                            qb.colors.forEach(function(name) {
                                var iconColor = 'as-text-' + name;
                                html = html + '<button class="qp-btn as-btn-fit as-btn-parent as-text-'+ name +'" value="'+ iconColor +'" onClick="qp.checkQradio(this, \'qb-color-selected\')"> <i class="fas fa-circle"></i> <span class="as-text-gray">'+ name +'</span></button>';
                            });
                                html = html + '</div>'
                        + '</div>';
            }
            if(key == 'commonRes') {
                html = html + '<label class="as-w100 as-bold">Medium Device (768px)</label>'
                        + '<select id="modalResMedium" class="qp-input as-br">'
                            + '<option value="">No set</option> '
                            + '<option value="as-md-w100">Full(100%)</option> '
                            + '<option value="as-md-w50">Half(50%)</option> '
                            + '<option value="as-md-w33">1/3(30%)</option> '
                            + '<option value="as-md-w25">1/4(25%)</option> '
                            + '<option value="as-md-none">Hide</option> '
                        + '</select> '
                        + '<label class="as-w100 as-bold">Small Device (576px)</label>'
                        + '<select id="modalResSmall" class="qp-input as-br">'
                            + '<option value="">No set</option> '
                            + '<option value="as-sm-w100">Full(100%)</option> '
                            + '<option value="as-sm-w50">Half(50%)</option> '
                            + '<option value="as-sm-w33">1/3(30%)</option> '
                            + '<option value="as-sm-w25">1/4(25%)</option> '
                            + '<option value="as-sm-none">Hide</option> '
                        + '</select> ';
            }
            if(key == 'commonCover') {
                html = html + '<label class="as-w100">Background Image Url</label>'
                        + '<input type="text" id="modalCoverImg" class="qp-input as-w90">';
                        if(config['useImgUploadBtn']) html = html + ' <button id="coverImgUploader" class="qp-btn as-btn-main as-large as-btn-tiny"><i class="far fa-file-image"></i></button>';
                        html = html + '<s></s><label class="as-w100">Vertical Align of Content</label>'
                        + '<select id="modalCoverAlign" class="qp-input as-br">'
                            + '<option value="as-bottom">Bottom</option> '
                            + '<option value="as-top">Top</option> '
                            + '<option value="as-middle">Middle</option> '
                        + '</select> '
                        + '<label class="as-w100">Darken</label>'
                        + '<select id="modalCoverDark" class="qp-input as-br">'
                            + '<option value="none">No set</option> '
                            + '<option value="as-dark1">Level 1</option>'
                            + '<option value="as-dark2">Level 2</option>'
                            + '<option value="as-dark3">Level 3</option>'
                            + '<option value="as-dark4">Level 4</option>'
                            + '<option value="as-dark5">Level 5</option>'
                            + '<option value="as-dark6">Level 6</option>'
                            + '<option value="as-dark7">Level 7</option>'
                            + '<option value="as-dark8">Level 8</option>'
                            + '<option value="as-dark9">Level 9</option>'
                        + '</select> ';
            }
            if(key == 'commonIframe') {
                html = html + '<label class="as-w100">Source</label>'
                        + '<input type="text" id="modalIframeSrc" class="qp-input as-w100 as-br">'
                        + '<label class="as-w100">Scroll</label>'
                        + '<select id="modalIframeScroll" class="qp-input as-br">'
                            + '<option value="auto">auto</option> '
                            + '<option value="scroll">scroll</option> '
                            + '<option value="hidden">hidden</option> '
                        + '</select> ';
            }
            if(key == 'commonGrid') {
                html = html + '<label class="as-w100 as-bold">Space</label>'
                + '<input type="checkbox" id="modalGridGap" name="modalGridGap"> Add gap between cellls';
            }
            if(key == 'commonList') {
                html = html + '<label class="as-w100 as-bold">Responsive Items</label>'
                        + '<div class="qp-grid as-grid-fit as-center">'
                            + '<div class="qp-grid-cell as-mg-right">'
                                + '<label>Large</label><br>'
                                + '<select id="modalListLa" class="qp-input as-br">'
                                    + '<option value="as-la6">6 items</option> '
                                    + '<option value="as-la5">5 items</option> '
                                    + '<option value="as-la4">4 items</option> '
                                    + '<option value="as-la3">3 items</option> '
                                    + '<option value="as-la2">2 items</option> '
                                + '</select> '
                            + '</div>'
                            + '<div class="qp-grid-cell as-mg-right">'
                                + '<label>Medium</label><br>'
                                + '<select id="modalListMd" class="qp-input as-br">'
                                    + '<option value="as-md6">6 items</option> '
                                    + '<option value="as-md5">5 items</option> '
                                    + '<option value="as-md4">4 items</option> '
                                    + '<option value="as-md3">3 items</option> '
                                    + '<option value="as-md2">2 items</option> '
                                    + '<option value="as-md1">1 items</option> '
                                + '</select> '
                            + '</div>'
                            + '<div class="qp-grid-cell">'
                                + '<label>Small</label><br>'
                                + '<select id="modalListSm" class="qp-input as-br">'
                                    + '<option value="as-sm6">6 items</option> '
                                    + '<option value="as-sm5">5 items</option> '
                                    + '<option value="as-sm4">4 items</option> '
                                    + '<option value="as-sm3">3 items</option> '
                                    + '<option value="as-sm2">2 items</option> '
                                    + '<option value="as-sm1">1 items</option> '
                                + '</select> '
                            + '</div>'
                        + '</div>'
                        + '<div class="qp-line"></div>'
                        + '<label class="as-w100 as-bold">Space</label>'
                        + '<input type="checkbox" id="modalListGap" name="modalListGap"> Add gap between items';
            }
            if(key == 'commonLine') {
                html = html + '<label class="as-w100 as-bold">Line Style</label>'
                        + '<select id="modalLineStyle" class="qp-input as-br">'
                            + '<option value="as-line-solid">Normal</option> '
                            + '<option value="as-line-dotted">Dotted</option> '
                            + '<option value="as-line-double">Double</option> '
                            + '<option value="as-line-dashed">Dashed</option> '
                        + '</select>'
                        + '<div class="qp-line"></div>'
                        + '<label class="as-w100 as-bold">Line Color</label>'
                        + '<div class="qp-qradio" id="modalLineColor">'
                        + '<input type="hidden" value="" />'
                        + '<div class="qp-row-btn"><button class="qp-btn as-btn-fit as-btn-parent as-text-black" value="none" onClick="qp.checkQradio(this, \'qb-color-selected\')">None</button>';
                        qb.colors.forEach(function(name) {
                            var lineColor = 'as-border-' + name;
                            html = html + '<button class="qp-btn as-btn-fit as-btn-parent as-text-'+ name +'" value="'+ lineColor +'" onClick="qp.checkQradio(this, \'qb-color-selected\')"> <i class="fas fa-circle"></i> <span class="as-text-gray">'+ name +'</span></button>';
                        });
                            html = html + '</div>'
                        + '</div>';
            }
            return html;
        }
    }
    function AddEvents(){
        this.window = function() {
            // 비 모달 영역 클릭 시 모달 닫기
            // Edit 영역 없을 경우 툴 disable
            window.onclick = function(e) {
                if(util.getWrap(e.target, 'qb-tool-modal')) {
                    if(util.getWrap(e.target, 'qb-btn-tool')) {
                        return;
                    }
                    modal.clean();
                }
                if(!qb.nowBlock) util.btnOffAll();
            }
            // 창 크기 조정 시 툴바 위치 재조정
            window.addEventListener("resize", function(e){
                block.toolbarReposition();
                block.resetIframe();
            });
            // 스크롤 시 툴바 위치 재조정
            iframe.contentWindow.addEventListener("scroll", function(e){
                block.toolbarReposition();
                //direct bar 제거(UI 방해)
                block.removeAllDirectbar();
            });
        }
        this.canvas = function() {
            block.canvas.style.setProperty('pointer-events', 'auto');
            block.canvas.onclick = function(e) {
                modal.clean();
                template.closePanel();
                if(!qb.nowBlock) util.btnOffAll();
            }
            block.canvas.addEventListener("click", function(e){
                if(qb.allowEdit == 'on'){
                    block.liveEditor(e.target);
                    if(qb.nowBlock) {
                        // 초기 활성화 시 일부 버튼 비활성화
                        if(util.currentBorderWidth(qb.nowBlock) == null) util.btnOff(tool.btnBorderColor);
                        var validTags = ["H1", "H2", "H3", "H4", "H5", "H6"];
                        if(!validTags.includes(qb.nowBlock.tagName)) util.btnOff(tool.btnHeading);
                    }
                }
            });
            block.canvas.addEventListener("mouseover", function(e){
                if(qb.allowEdit == 'on'){
                    block.onEditable(e.target);
                }
            });
            block.canvas.addEventListener("mouseout", function(e){
                if(qb.allowEdit == 'on'){
                    block.outEditable(e.target);
                }
            });
            block.canvas.onkeydown = function(e) {
                util.setEditOption(e);
            }
            // block.canvas.addEventListener("dragover", function( e ) {
            //     e.preventDefault();
            // }, false);
            // block.canvas.addEventListener("dragenter", function(e){
            //     if(qb.allowEdit == 'on') {
            //         let drop = block.getDrop(e);
            //         block.cleanDropZone();
            //         if(drop.target) {
            //             if(drop.target == qb.nowBlock && qb.dragType == 'move') return;
            //             drop.target.classList.add('qb-dropzone-below');
            //             // drop.target.addEventListener('dragleave',cleanBelow(e),false)
            //         } else {
            //             if(drop.zone) {
            //                 if(util.isEmptyEl(drop.zone))  {
            //                     drop.zone.classList.add('qb-dropzone-in');
            //                     // drop.target.addEventListener('dragleave',cleanIn,false);
            //                 }
            //             }
            //         }
            //     }
            // });
            // block.canvas.addEventListener("drop", function(e){
            //     if(qb.allowEdit == 'on') {
            //         let drop = block.getDrop(e);
            //         block.cleanDropZone();
            //         // if(drop.target) drop.target.classList.remove('qb-dropzone-below');
            //         // if(drop.zone) drop.zone.classList.remove('qb-dropzone-in');
            //         if(qb.dragType == 'move') {
            //             if(drop.target && drop.zone) drop.target.parentNode.insertBefore(qb.nowBlock,drop.target.nextElementSibling);
            //             else if(!drop.target && drop.zone) {
            //                 if(util.isEmptyEl(drop.zone))  drop.zone.appendChild(qb.nowBlock);
            //             }
            //             qb.nowBlock.setAttribute('draggable', false);
            //         } else {
            //             if(drop.target && drop.zone) drop.target.parentNode.insertBefore(qb.addedBlock,drop.target.nextElementSibling);
            //             else if(!drop.target && drop.zone) {
            //                 if(util.isEmptyEl(drop.zone))  drop.zone.appendChild(qb.addedBlock);
            //             }
            //             block.initBlock(qb.addedBlock);
            //             qb.addedBlock = '';
            //             template.togglePanel();
            //             block.liveGuideLine();
            //         }
            //         block.toolbarOnDrop();
            //         block.toolbarReposition();
            //         util.saveAllToStorage();
            //     }
            // });
        }
        this.hover = function(el) {
            let x;
            if(el) {
                if(getDirectType(el).name) addDirectEvents(el);
                x = el.querySelectorAll(qb.directSelector);
            }
            else x = block.canvas.querySelectorAll(qb.directSelector);
            for(let i = 0; i < x.length; i++) {
                addDirectEvents(x[i]);
            }
            function addDirectEvents(el) {
                el.addEventListener("mouseover", function(e){
                    createDirect(this);
                });
                el.addEventListener("mouseout", function(e){
                    // 현재 활성화된 Directbar가 없으면 중지
                    if(!getNowDirect(this)) return;
                    if(!e.relatedTarget) return;
                    // 마우스가 window 화면을 벗어나(tag == html) e.relatedTarget이 없을 경우 발생하는 오류 방지
                    if(e.relatedTarget.tagName == 'HTML' && e.y > 0) return;
                    if(getNowDirect(this) == util.getWrap(e.relatedTarget, 'qb-directbar-wrapper')) return;
                    removeDirect(this);
                });
            }
            function createDirect(el) {
                if(qb.allowEdit == 'off') return;
                let directType = getDirectType(el);
                if(!directType) return;
                //이미 해당 directbar가 존재하면 새로 만들지 않음
                if(document.querySelectorAll('[data-direct-name='+directType.name+']')[0]) return;
                //이미 동일 Type의 bar가 존재하면 wrapper를 새로 만들지 않음
                let wrapper;
                let exist = document.querySelectorAll('[data-direct='+directType.type+']');
                if(exist.length > 0) {
                    wrapper = exist[0];
                } else {
                    wrapper = document.createElement('div');
                    wrapper.setAttribute('data-direct',directType.type);
                    wrapper.classList.add('qb-directbar-wrapper');
                }
                let direct = getDirectEl(el); // direct object
                direct.bar.setAttribute('data-direct-name',directType.name);
                document.body.appendChild(wrapper);
                wrapper.appendChild(direct.bar);
                //마우스가 direct bar 위에 있다가 이탈할 경우 remove
                // if(directType == 'bottom') {
                //     direct.bar.addEventListener("mouseleave", function(e){
                //         removeDirect(el);
                //     });
                // }
                wrapper.addEventListener("mouseleave", function(e){
                    removeDirect(el);
                });
                //각 버튼에 이벤트 추가
                direct.btnDim.addEventListener("click", function(e){
                    qb.nowTarget = el;
                    modal.openCommon('commonDim');
                });
                direct.btnModify.addEventListener("click", function(e){
                    qb.nowDirect = el;
                    if(el.tagName == 'A' || el.tagName == 'BUTTON') modal.openCommon('commonBtn');
                    else if(el.tagName == 'INPUT') modal.openCommon('commonInput');
                    else if(el.tagName == 'IMG') modal.openCommon('commonImg');
                    else if(el.tagName == 'IFRAME') {
                        block.resetNowBlock(el);
                        modal.openCommon('commonIframe');
                    }
                    else {
                        if(el.classList.contains('qp-slide')) modal.openCommon('commonSlider');
                        if(el.classList.contains('qp-divider')) modal.openCommon('commonDivider');
                        if(el.classList.contains('qp-icon')) modal.openCommon('commonIcon');
                        if(el.classList.contains('qp-cover')) modal.openCommon('commonCover');
                        if(el.classList.contains('qp-list')) modal.openCommon('commonList');
                        if(el.classList.contains('qp-line')) modal.openCommon('commonLine');
                    }
                });
                direct.btnDelete.addEventListener("click", function(e){
                    el.parentNode.removeChild(el);
                    block.cleanEditable();
                    qb.nowDirect = '';
                    removeDirect(el);
                    util.saveAllToStorage();
                });
                direct.btnClone.addEventListener("click", function(e){
                    //Clone 생성
                    let clone = el.cloneNode(true);
                    //addDirectEvents(clone);
                    el.parentNode.insertBefore(clone,el.nextElementSibling);
                    block.initBlock(clone);
                    util.saveAllToStorage();
                    //this.toolbarReposition();
                });
                direct.btnRes.addEventListener("click", function(e){
                    qb.nowTarget = el;
                    modal.openCommon('commonRes');
                });

                if(el.classList.contains('qp-divider')) {
                    direct.title.innerHTML = '<span class="qb-direct-title">Divider</span>';
                    direct.btnDim.style.display = 'none';
                }

                if(el.classList.contains('qp-icon')) {
                    direct.title.innerHTML = '<span class="qb-direct-title">Icon</span>';
                    direct.btnDim.style.display = 'none';
                }

                if(el.classList.contains('qp-cover')) {
                    direct.title.innerHTML = '<span class="qb-direct-title">Cover</span>';
                    direct.btnClone.style.display = 'none';
                }
                if(el.classList.contains('qp-grid-cell')) {
                    direct.title.innerHTML = '<span class="qb-direct-title">Grid Cell </span>';
                    direct.btnRes.style.display = 'inline-block';
                    direct.btnModify.style.display = 'none';
                    direct.btnDim.style.display = 'none';
                }
                if(el.classList.contains('qp-list')) {
                    direct.title.innerHTML = '<span class="qb-direct-title">List</span>';
                    direct.btnDim.style.display = 'none';
                }
                if(el.classList.contains('qp-line')) {
                    direct.title.innerHTML = '<span class="qb-direct-title">Line</span>';
                    direct.btnDim.style.display = 'none';
                }
                if(el.classList.contains('qp-slide')) {
                    direct.title.innerHTML = '<span class="qb-direct-title">Slider</span>';
                    direct.btnClone.style.display = 'none';
                    direct.btnDelete.style.display = 'none';
                }

                if(el.tagName == 'IFRAME') {
                    direct.title.innerHTML = '<span class="qb-direct-title">Iframe</span>';
                    direct.btnClone.style.display = 'none';
                    direct.btnDelete.style.display = 'none';
                }

                if(el.tagName == 'IMG') {
                    direct.title.innerHTML = '<span class="qb-direct-title">IMG</span>';
                }

                if(el.tagName == 'A' || el.tagName == 'BUTTON') {
                    direct.title.innerHTML = '<span class="qb-direct-title">BTN</span>';
                }

                //directbar position
                // direct.bar.style.top = getDirectPosition(el, direct.bar).top + 'px';
                // direct.bar.style.left = getDirectPosition(el, direct.bar).left + 'px';
                wrapper.style.top = getDirectPosition(el, wrapper).top + 'px';
                wrapper.style.left = getDirectPosition(el, wrapper).left + 'px';
            }
            function removeDirect(el) {
                if(qb.allowEdit == 'off') return;
                let directType = getDirectType(el);
                if(!directType) return;
                //현재 el의 type에 해당하는 bar 모두 제거(이론적으로는 1개만 존재)
                let x = document.querySelectorAll('[data-direct='+directType.type+']');
                for(var i = 0; i < x.length; i++) {
                    x[i].parentNode.removeChild(x[i]);
                }
            }
            function getDirectType(el) {
                let type = null;
                let name = null;
                switch(el.tagName) {
                    case 'A':
                        type = 'bottom';
                        name = 'a';
                        break;
                    case 'BUTTON':
                        type = 'bottom';
                        name = 'button';
                        break;
                    case 'INPUT':
                        type = 'bottom';
                        name = 'input';
                        break;
                    case 'IMG':
                        type = 'middle';
                        name = 'img';
                        break;
                    case 'IFRAME':
                        type = 'top';
                        name = 'iframe';
                        break;
                    default:
                        type = null;
                }
                if(el.classList.contains('qp-slide')) {
                    type = 'top';
                    name = 'slide';
                }
                if(el.classList.contains('qp-icon')) {
                    type = 'bottom';
                    name = 'icon';
                }
                if(el.classList.contains('qp-divider')) {
                    type = 'bottom';
                    name = 'divider';
                }
                if(el.classList.contains('qp-cover')) {
                    type = 'topRight';
                    name = 'cover';
                }
                // if(el.classList.contains('qp-grid-cell')) {
                //     type = 'topRightOut';
                //     name = 'cell';
                // }
                if(el.classList.contains('qp-list')) {
                    type = 'topRightOut';
                    name = 'list';
                }
                if(el.classList.contains('qp-line')) {
                    type = 'top';
                    name = 'line';
                }
                return{type:type, name: name}
            }
            function getDirectPosition(el,directBar) {
                let type = getDirectType(el).type;
                let top = 0;
                let bottom = 0;
                let left = util.offset(el).left + (el.offsetWidth / 2) - (directBar.offsetWidth / 2);
                if(type == 'bottom') {
                    top = util.offset(el).top + el.offsetHeight;
                } else if(type == 'middle') {
                    top = util.offset(el).top + Number(el.offsetHeight) / 2 - (directBar.offsetHeight / 2);
                } else if(type == 'top') {
                    top = util.offset(el).top;
                } else if(type == 'topRight') {
                    top = util.offset(el).top + 10;
                    left = util.offset(el).left + el.offsetWidth - directBar.offsetWidth - 20;
                } else if(type == 'topRightOut') {
                    top = util.offset(el).top - directBar.offsetHeight;
                    left = util.offset(el).left + el.offsetWidth - directBar.offsetWidth;
                } else {
                    return;
                }
                // 화면 하단에 있을 경우, window 밑으로 directbar가 생길 경우 스크롤바가 생기는 문제 해결을 위해, 위치 조정
                bottom = top + directBar.offsetHeight;
                if(bottom > window.innerHeight) top = window.innerHeight - directBar.offsetHeight;
                // 결과 반환
                return{top: top,  left: left}
            }
            function getDirectEl(el) {
                let directType = getDirectType(el);
                let directBar = document.createElement('div');
                // directBar.setAttribute('data-direct',directType);
                directBar.classList.add('qb-directbar','as-xgray', 'as-smooth');
                // TITLE
                let title = document.createElement('span');
                title.innerHTML = '';
                directBar.appendChild(title);
                // dimension button
                let btnDim= document.createElement('button');
                btnDim.classList.add('qp-btn','as-btn-parent','as-btn-fit','no-editable');
                btnDim.innerHTML = '<i class="fas fa-expand"></i>';
                directBar.appendChild(btnDim);
                // modify button
                let btnModify = document.createElement('button');
                btnModify.classList.add('qp-btn','as-btn-parent','as-btn-fit','no-editable');
                btnModify.innerHTML = '<i class="fas fa-wrench"></i>';
                directBar.appendChild(btnModify);
                // responsive
                let btnRes = document.createElement('button');
                btnRes.classList.add('qp-btn','as-btn-parent','as-btn-fit','no-editable');
                btnRes.style.display = 'none';
                btnRes.innerHTML = '<i class="fas fa-mobile-alt"></i>';
                directBar.appendChild(btnRes);
                // Clone button
                let btnClone = document.createElement('button');
                btnClone.classList.add('qp-btn','as-btn-parent','as-btn-fit','no-editable');
                btnClone.innerHTML = '<i class="far fa-copy no-editable"></i>';
                directBar.appendChild(btnClone);
                // Delete button
                let btnDelete = document.createElement('button');
                btnDelete.classList.add('qp-btn','as-btn-parent','as-btn-fit','no-editable');
                btnDelete.innerHTML = '<i class="fas fa-trash-alt no-editable"></i>';
                directBar.appendChild(btnDelete);
                return{title:title, btnDim: btnDim, bar: directBar,  btnModify: btnModify, btnRes:btnRes, btnClone:btnClone, btnDelete:btnDelete}
            }
            function getNowDirect(el) {
                let directType = getDirectType(el);
                let thisDirect = document.querySelectorAll('[data-direct='+directType.type+']')[0]
                if(thisDirect) return thisDirect;
                else return null;
            }
        }
        this.toolbar = function() {
            // directbar가 Live 된상태에서 toolbar로 마우스가 이동할 경우, directbar가 없어지지 않는 문제 해결
            block.toolbar.addEventListener("mouseover", function(e){
                let x = document.querySelectorAll('[data-direct]');
                for(var i = 0; i < x.length; i++) {
                    x[i].parentNode.removeChild(x[i]);
                }
            });
            // Add
            block.btnPlus.addEventListener("click", function(e){
                block.addNewBlock();
            });
            // move Down
            block.btnMoveDown.addEventListener("click", function(e){
                block.moveDown();
            });
            // move Up
            block.btnMoveUp.addEventListener("click", function(e){
                block.moveUp();
            });
            // dimension
            block.btnDim.addEventListener("click", function(e){
                qb.nowTarget = qb.nowBlock;
                modal.openCommon('commonDim');
            });
            // config
            block.btnConfig.addEventListener("click", function(e){
                qb.nowTarget = qb.nowBlock;
                if(qb.nowBlock.classList.contains("qp-list")) modal.openCommon('commonList');
                if(qb.nowBlock.classList.contains("qp-grid")) modal.openCommon('commonGrid');
            });

            // responsive
            block.btnRes.addEventListener("click", function(e){
                qb.nowTarget = qb.nowBlock;
                modal.openCommon('commonRes');
            });
            //Code 버튼 클릭
            block.btnCode.addEventListener("click", function(e){
                qb.codeMode = 'edit';
                genCode(qb.nowBlock, 'block');
            });
            //level up
            block.btnUp.addEventListener("click", function(e){
                let parent = block.findEditable(qb.nowBlock.parentNode);
                if(parent) {
                    if(parent == block.canvas) return;
                    if(parent.tagName == 'BODY') return;
                    block.cleanEditable();
                    block.resetNowBlock(parent);
                }
            });
            //level down
            block.btnDown.addEventListener("click", function(e){
                let childs = qb.nowBlock.childNodes;
                let child;
                for(var i = 0; i < childs.length; i++) {
                    if(childs[i].nodeType != Node.TEXT_NODE) {
                        child = block.findEditable(childs[i]);
                        if(child) {
                            block.cleanEditable();
                            block.resetNowBlock(child);
                            break;
                        }

                    }
                }
            });
            // block.btnFull.addEventListener("click", function(e){
            //     if(qb.nowBlock.classList.contains('as-w100')) {
            //         qb.nowBlock.classList.remove('as-w100');
            //     } else {
            //         qb.nowBlock.classList.add('as-w100');
            //     }
            //     block.toolbarReposition();
            // });
            //Toolbar 삭제 버튼 클릭
            block.btnDelete.addEventListener("click", function(e){
                block.deleteBlock();
            });
            //Toolbar clone 버튼 클릭
            block.btnClone.addEventListener("click", function(e){
                if(util.currentStyle(qb.nowBlock,'position') == 'absolute') {
                    alert('This block has the absolute position, can not duplicate the absolute position block');
                } else {
                    block.cloneBlock();
                }
                // block.cloneBlock();
            });
            block.btnAdd.addEventListener("click", function(e){
                qb.insType = "add";
                template.togglePanel();
            });
            block.btnInbox.addEventListener("click", function(e){
                qb.insType = "inbox";
                template.togglePanel();
            });
            // Drag & Drop
            // block.btnDrag.addEventListener("mousedown", function(e){
            //     if(util.currentStyle(qb.nowBlock,'position') == 'absolute') {
            //         alert('This block has the absolute position, can not drag the absolute position block');
            //     } else {
            //         qb.dragType = "move";
            //         block.toolbar.setAttribute('draggable', true);
            //     }
            // });
            // block.btnDrag.addEventListener("mouseup", function(e){
            //     block.toolbar.setAttribute('draggable', false);
            //     block.cleanDropZone();
            // });
            // block.toolbar.addEventListener("dragstart", function( e ) {
            //     block.toolbarOnDrag();
            // }, false);
            // block.toolbar.addEventListener("dragend", function( e ) {
            //     block.cleanDropZone();
            //     block.toolbarOnDrop();
            // }, false);
        }
        this.tool = function() {
            // View Clear
            tool.btnViewClear.addEventListener("click", function(e){
                block.canvas.removeAttribute("contentEditable");
                if(qb.nowBlock) block.cleanEditable(null);
                block.cleanDirectbar();
                if(qb.allowEdit == 'on'){
                    qb.allowEdit = 'off';
                    // tool.btnViewClear.classList.add('as-main');
                    tool.toolArea.style.display = 'none';
                    tool.btnLiveTool.style.display = 'block';
                    template.closePanel();
                    document.getElementById('btnTemplate').style.display='none';
                    block.removeGuideLine();
                    block.resetIframe();
                } else {
                    qb.allowEdit = 'on';
                    tool.btnViewClear.classList.remove('as-main');
                }

            });
            // tool.btnGuide.addEventListener("click", function(e){
            //     if(qb.hasGuideLine) block.removeGuideLine();
            //     else block.liveGuideLine();
            //
            // });
            tool.btnLiveTool.addEventListener("click", function(e){
                qb.allowEdit = 'on';
                block.canvas.setAttribute("contentEditable",true);
                tool.toolArea.style.display = 'block';
                tool.btnLiveTool.style.display = 'none';
                // document.getElementById('btnTemplate').style.display='block';
                block.resetIframe();
                block.liveGuideLine();
            });
            tool.btnFullCode.addEventListener("click", function(e){
                qb.codeMode = 'edit';
                genCode(block.canvas, 'canvas');
            });
            tool.btnInsertZone.addEventListener("click", function(e){
                modal.clean();
                let wrap = document.createElement('div');
                wrap.classList.add('qp-wrap');
                wrap.innerHTML = '<div class="qp-section"><p>Section</p></div>';
                block.canvas.insertBefore(wrap, block.canvas.firstChild);
                // iframe.contentWindow.scrollTo(0, iframe.contentWindow.document.body.scrollHeight);
                // template.togglePanel();
                block.liveGuideLine();
            });
            // document config
            tool.btnConfig.addEventListener("click", function(e){
                modal.clean();
                modal.openCommon('commonConfig');
            });
            tool.btnAllCode.addEventListener("click", function(e){
                modal.clean();
                block.cleanEditable();
                if(util.getWrap(e.target, 'qb-tool-modal')) return;
                qb.codeMode = 'copy';
                genCode(block.canvas);
            });


            //background color
            tool.btnBgColor.addEventListener("click", function(e){
                if(util.getWrap(e.target, 'qb-tool-modal')) return;
                //현재설정된 값을 폼에 전달
                document.getElementById('colorInput_bgColor').value = util.currentStyle(qb.nowBlock, 'backgroundColor');
                document.getElementById('colorInputOk_bgColor').style.backgroundColor = '#f1f2f4';
                coloring.resetPalette('bgColor');
                // 모달 오픈
                modal.toggle(tool.btnBgColor);
            });
            //background backgroundImage
            tool.btnBgImg.addEventListener("click", function(e){
                if(util.getWrap(e.target, 'qb-tool-modal')) return;
                var url = util.currentStyle(qb.nowBlock, 'backgroundImage');
                document.getElementById('bgImgUrl').value = url.slice(4, -1).replace(/"/g, "");
                document.getElementById('bgImgSize').value = util.currentStyle(qb.nowBlock, 'backgroundSize');
                document.getElementById('bgImgRepeat').value = util.currentStyle(qb.nowBlock, 'backgroundRepeat');
                document.getElementById('bgImgPosition').value = util.currentStyle(qb.nowBlock, 'backgroundPosition');
                modal.toggle(tool.btnBgImg);
            });
            // Padding / Margin
            tool.btnSpace.addEventListener("click", function(e){
                if(util.getWrap(e.target, 'qb-tool-modal')) return;
                var pd = util.getCurrentClass(qb.nowBlock,'padding');
                var br = util.getCurrentClass(qb.nowBlock,'br');
                qp.setValueQradio('modalPd', pd);
                qp.setValueQradio('modalBr', br);
                modal.toggle(tool.btnSpace);
            });
            // shadow
            tool.btnShadow.addEventListener("click", function(e){
                if(util.getWrap(e.target, 'qb-tool-modal')) return;
                var shadowClass = util.getCurrentClass(qb.nowBlock,'shadow');
                if(!shadowClass) shadowClass = 'none';
                // var br = util.getCurrentClass(qb.nowBlock,'br');
                qp.setValueQradio('modalShadow', shadowClass);
                // qp.setValueQradio('modalBr', br);
                modal.toggle(tool.btnShadow);
            });
            // font family
            tool.btnFont.addEventListener("click", function(e){
                if(util.getWrap(e.target, 'qb-tool-modal')) return;
                let currentFont = util.currentStyle(qb.nowBlock, 'fontFamily');
                if(currentFont) currentFont = currentFont.replace(/["']/g, "");
                document.getElementById('infoCurrentFont').innerHTML = currentFont;
                if(qb.googleFonts.includes(currentFont) || qb.safeFonts.includes(currentFont)) {
                    document.getElementById('selectFontFamily').value = currentFont;
                } else {
                    document.getElementById('headOptionFontFamily').selected = true;
                }
                document.getElementById('inputResult').innerHTML = '';
                modal.toggle(tool.btnFont);
            });
            // text color
            tool.btnTextColor.addEventListener("click", function(e){
                if(util.getWrap(e.target, 'qb-tool-modal')) return;
                //현재설정된 값을 폼에 전달
                tool.btnTextColor.getElementsByClassName('qb-colorinput')[0].value = util.currentStyle(qb.nowBlock, 'color');
                coloring.resetPalette('textColor');
                modal.toggle(tool.btnTextColor);
            });
            // text size & Line Height
            tool.btnTextSize.addEventListener("click", function(e){
                if(util.getWrap(e.target, 'qb-tool-modal')) return;
                let lineHeight = util.removePx(util.currentStyle(qb.nowBlock, 'lineHeight'));
                //leneHeight = Number(lineHeight);
                let fontSize = util.removePx(util.currentStyle(qb.nowBlock, 'fontSize'));
                //fontSize = Number(fontSize);

                // 비율로 계산 줄간격 나누기 글크기
                let lineHeightRatio = Number(lineHeight) / Number(fontSize);
                lineHeightRatio = parseFloat(lineHeightRatio).toFixed(1)

                document.getElementById('selectFontSize').value = fontSize + 'px';
                document.getElementById('inputLineHeight').value = lineHeightRatio;
                modal.toggle(tool.btnTextSize);
            });
            // Heading
            tool.btnHeading.addEventListener("click", function(e){
                if(util.getWrap(e.target, 'qb-tool-modal')) return;
                modal.toggle(tool.btnHeading);
            });
            // text Bold
            tool.btnTextBold.addEventListener("click", function(e){
                modal.clean(); // 다른 버튼 클릭 시 기존 활성화된 모달 지우기
                if(iframe.contentWindow.getSelection().toString()) {
                    util.execCommand('bold', null, null);
                } else {
                    util.toggleStyle(qb.nowBlock, 'bold');
                }
                util.saveAllToStorage();
            });
            // text Italic
            tool.btnTextItalic.addEventListener("click", function(e){
                modal.clean(); // 다른 버튼 클릭 시 기존 활성화된 모달 지우기
                if(iframe.contentWindow.getSelection().toString()) {
                    util.execCommand('italic', null, null);
                } else {
                    util.toggleStyle(qb.nowBlock, 'italic');
                }
                util.saveAllToStorage();
            });
            // text underline
            tool.btnTextUnderline.addEventListener("click", function(e){
                modal.clean(); // 다른 버튼 클릭 시 기존 활성화된 모달 지우기
                if(iframe.contentWindow.getSelection().toString()) {
                    util.execCommand('underline', null, null);
                } else {
                    util.toggleStyle(qb.nowBlock, 'underline');
                }
                util.saveAllToStorage();
            });
            // text right
            tool.btnTextRight.addEventListener("click", function(e){
                modal.clean(); // 다른 버튼 클릭 시 기존 활성화된 모달 지우기
                util.toggleStyle(qb.nowBlock, 'right');
                exec.addClass(qb.nowBlock, 'as-right', 'align');
                util.saveAllToStorage();
            });
            // text left
            tool.btnTextLeft.addEventListener("click", function(e){
                modal.clean(); // 다른 버튼 클릭 시 기존 활성화된 모달 지우기
                util.toggleStyle(qb.nowBlock, 'left');
                exec.addClass(qb.nowBlock, 'as-left', 'align');
                util.saveAllToStorage();
            });
            // text Center
            tool.btnTextCenter.addEventListener("click", function(e){
                modal.clean(); // 다른 버튼 클릭 시 기존 활성화된 모달 지우기
                util.toggleStyle(qb.nowBlock, 'center');
                exec.addClass(qb.nowBlock, 'as-center', 'align');
                util.saveAllToStorage();
            });
            // text justify
            tool.btnTextJustify.addEventListener("click", function(e){
                modal.clean(); // 다른 버튼 클릭 시 기존 활성화된 모달 지우기
                util.toggleStyle(qb.nowBlock, 'justify');
                exec.addClass(qb.nowBlock, 'as-justify', 'align');
                util.saveAllToStorage();
            });
            // text link
            tool.btnLink.addEventListener("click", function(e){
                if(util.getWrap(e.target, 'qb-tool-modal')) return;
                if(iframe.contentWindow.getSelection().toString()) {
                    // 모달의 url 입력시 선택 포커스를 상실하기 때문에 현재 선택 영역을 저장해 놓음
                    tool.linkSel = util.saveSelection();
                    document.getElementById('linkUrl').value = '';
                    document.getElementById('linkTarget').value = '';
                    modal.toggle(tool.btnLink);
                }
            });
            // border
            tool.btnBorder.addEventListener("click", function(e){
                if(util.getWrap(e.target, 'qb-tool-modal')) return;
                var current = util.currentBorderWidth(qb.nowBlock);
                if(current == null) {
                    document.getElementById('borderSizeSelect').disabled = true;
                    document.getElementById('borderSizeSelect').value = '1px';
                } else {
                    document.getElementById('borderSizeSelect').disabled = false;
                    document.getElementById('borderSizeSelect').value = current;
                }
                modal.toggle(tool.btnBorder);
            });
            // border color
            tool.btnBorderColor.addEventListener("click", function(e){
                if(util.getWrap(e.target, 'qb-tool-modal')) return;
                tool.btnBorderColor.getElementsByClassName('qb-colorinput')[0].value = util.currentStyle(qb.nowBlock, 'borderColor');
                coloring.resetPalette('borderColor');
                modal.toggle(tool.btnBorderColor);
            });
            tool.btnAnimate.addEventListener("click", function(e){
                if(util.getWrap(e.target, 'qb-tool-modal')) return;
                let nowAnimate = util.getCurrentClass(qb.nowBlock,'animate');
                if(nowAnimate) document.getElementById('animateClass').value = nowAnimate
                else document.getElementById('animateClass').value = '';
                modal.toggle(tool.btnAnimate);
            });
            tool.btnUndo.addEventListener("click", function(e){
                modal.clean();
                util.undo();
            });
            tool.btnRedo.addEventListener("click", function(e){
                modal.clean();
                util.redo();
            });
        }
        this.tooltip = function() {
            addTooltipEvent(tool.btnShadow,'Cover Shadow');
            addTooltipEvent(tool.btnSpace,'Padding & Margin');
            addTooltipEvent(tool.btnViewClear,'Preview');
            // addTooltipEvent(tool.btnGuide,'Show Guideline');
            addTooltipEvent(tool.btnFullCode,'Edit Full Code');
            addTooltipEvent(tool.btnInsertZone,'Create Edit Zone');
            addTooltipEvent(tool.btnBgColor,'Background Color');
            addTooltipEvent(tool.btnBgImg,'Background Image');
            addTooltipEvent(tool.btnTextColor,'Text Color');
            addTooltipEvent(tool.btnTextSize,'Text Size');
            addTooltipEvent(tool.btnFont,'Font Family');
            addTooltipEvent(tool.btnBorder,'Border');
            addTooltipEvent(tool.btnBorderColor,'Border Color');
            addTooltipEvent(tool.btnAnimate,'Animation');
            //toolbar
            addTooltipEvent(block.btnRes,'Responsive Option');
            addTooltipEvent(block.btnCode,'Edit Code');
            addTooltipEvent(block.btnClone,'Clone');
            addTooltipEvent(block.btnPlus,'Add Empty Element');
            addTooltipEvent(block.btnDelete,'Delete');
            addTooltipEvent(block.btnDim,'Dimension & Margin');
            addTooltipEvent(block.btnUp,'Select Parent Elemnent');
            addTooltipEvent(block.btnDown,'Select Child Elemnent');
            // addTooltipEvent(block.btnFull,'Full width');
            // addTooltipEvent(block.btnAdd,'Add Empth Element');
            addTooltipEvent(block.btnMoveUp,'Move Up');
            addTooltipEvent(block.btnMoveDown,'Move Down');

            addTooltipEvent(block.btnAdd,'Add an element under this element');
            addTooltipEvent(block.btnInbox,'Insert an element in this element');
            function addTooltipEvent(el, txt) {
                el.addEventListener("mouseover", function(e){
                    if(util.getWrap(e.target, 'qb-tool-modal')) return;
                    liveTooltip(this,txt);
                });
                el.addEventListener("mouseout", function(e){
                    removeTooltip(this);
                });
                el.addEventListener("mousedown", function(e){
                    removeTooltip(this);
                });
            }
            function liveTooltip(el, txt){
                let box = document.createElement('span');
                box.classList.add('qb-tooltip');
                box.innerHTML = txt;
                box.style.opacity = 1;
                box.style.marginTop = '10px';
                el.appendChild(box);
            }
            function removeTooltip(el){
                let tooltip = el.getElementsByClassName('qb-tooltip')[0];
                if(tooltip) el.removeChild(tooltip);
            }
        }
        this.modal = function() {
            // document config
            document.getElementById('cmdOkConfig').addEventListener("click", function(e){
                var cssFile = document.getElementById('configCss').value;
                var warning = document.getElementById('configCssWarning');
                if(cssFile) {
                    if(cssFile.substring(0, 8) != 'https://') {
                        warning.innerHTML = 'The url is must be HTTPS url';
                        warning.style.display = "block";
                        warning.style.color = "red";
                        return;
                    }
                    if(cssFile.includes('.css') == false) {
                        warning.innerHTML = 'Invalid css file(url)';
                        warning.style.display = "block";
                        warning.style.color = "red";
                        return;
                    }
                }
                exec.changeConfig();
            });
            // bg color 처리
            var colorPicks = document.getElementsByClassName('qb-colorpick');
            for(var i = 0; i < colorPicks.length; i++){
                colorPicks[i].addEventListener("click", function(e){
                    exec.changeColor(e);
                });
            }
            var colorInputs = document.getElementsByClassName('qb-colorinputok');
            for(var i = 0; i < colorInputs.length; i++){
                colorInputs[i].addEventListener("click", function(e){
                    exec.changeColor(e);
                });
            }
            // bg image 처리
            document.getElementById('okBgImg').addEventListener("click", function(e){
                exec.changeBgImg();
            });
            // space 처리
            var x = document.getElementById('modalPd').getElementsByTagName('BUTTON');
            for(var i = 0; i < x.length; i++) {
                x[i].addEventListener("click", function(e){
                    exec.changeSpace('pd');
                });
            }

            var x = document.getElementById('modalBr').getElementsByTagName('BUTTON');
            for(var i = 0; i < x.length; i++) {
                x[i].addEventListener("click", function(e){
                    exec.changeSpace('br');
                });
            }

            // shadow 처리
            var x = document.getElementById('modalShadow').getElementsByTagName('BUTTON');
            for(var i = 0; i < x.length; i++) {
                x[i].addEventListener("click", function(e){
                    exec.changeShadow();
                });
            }
            // font family
            document.getElementById('selectFontFamily').addEventListener("change", function(e){
                exec.changeFontFamily();
            });
            document.getElementById('btnNewFont').addEventListener("click", function(e){
                exec.changeFontFamilyNew();
            });
            // font size 처리
            var fontSizeClasses = document.getElementsByClassName('qb-fontsizclass');
            for(var i = 0; i < fontSizeClasses.length; i++){
                fontSizeClasses[i].addEventListener("click", function(e){
                    exec.changeFontSizeClass(e);
                });
            }
            document.getElementById('selectFontSize').addEventListener("change", function(e){
                exec.changeFontSizePixel();
            });
            // heading
            document.getElementById('selectHeading').addEventListener("click", function(e){
                exec.changeHeading(e.target.tagName);
            });

            // line Height
            document.getElementById('btnLineHeightUp').addEventListener("click", function(e){
                document.getElementById('inputLineHeight').value = Number(document.getElementById('inputLineHeight').value) + 0.1;
                exec.changeLineHeight();
            });
            document.getElementById('btnLineHeightDown').addEventListener("click", function(e){
                document.getElementById('inputLineHeight').value = Number(document.getElementById('inputLineHeight').value) - 0.1;
                exec.changeLineHeight();
            });
            // link okLinkForm
            document.getElementById('okLinkForm').addEventListener("click", function(e){
                exec.createLink();
            });
            // border class 처리
            var borderclasses = document.getElementsByClassName('qb-borderclass');
            for(var i = 0; i < borderclasses.length; i++){
                borderclasses[i].addEventListener("click", function(e){
                    exec.changeBorderClass(e);
                });
            }
            // border pixel
            document.getElementById('borderSizeSelect').addEventListener("change", function(e){
                exec.changeBorderSize();
            });
            // space
            // document.getElementById('okSpace').addEventListener("click", function(e){
            //     exec.changeSpace();
            // });
            // common modal img
            document.getElementById('cmdOkImg').addEventListener("click", function(e){
                exec.changeImg();
            });
            // common modal Link
            document.getElementById('cmdOkLink').addEventListener("click", function(e){
                exec.changeLink();
            });
            // common modal img
            document.getElementById('cmdOkBtn').addEventListener("click", function(e){
                exec.changeBtn();
            });
            document.getElementById('cmdOkCode').addEventListener("click", function(e){
                exec.changeCode();
            });
            document.getElementById('cmdOkSlider').addEventListener("click", function(e){
                exec.changeSlider();
            });
            document.getElementById('cmdOkInput').addEventListener("click", function(e){
                exec.changeInput();
            });
            document.getElementById('cmdOkDim').addEventListener("click", function(e){
                exec.changeDim();
            });

            document.getElementById('cmdOkIcon').addEventListener("click", function(e){
                exec.changeIcon();
            });
            document.getElementById('cmdOkDivider').addEventListener("click", function(e){
                exec.changeDivider();
            });
            document.getElementById('cmdOkRes').addEventListener("click", function(e){
                exec.changeRes();
            });
            document.getElementById('cmdOkCover').addEventListener("click", function(e){
                exec.changeCover();
            });
            //animate
            document.getElementById('animateClass').addEventListener("change", function(e){
                exec.changeAnimate();
            });
            //iframe
            document.getElementById('cmdOkIframe').addEventListener("click", function(e){
                exec.changeIframe();
            });

            //List
            document.getElementById('cmdOkList').addEventListener("click", function(e){
                exec.changeList();
            });
            //Grid
            document.getElementById('cmdOkGrid').addEventListener("click", function(e){
                exec.changeGrid();
            });
            //Line
            document.getElementById('cmdOkLine').addEventListener("click", function(e){
                exec.changeLine();
            });


            // Ext
            document.getElementById('cmdDimWidthSelect').addEventListener("change", function(e){
                if(this.value == 'fixed') document.getElementById('cmdDimWidthInput').disabled = false;
                else {
                    document.getElementById('cmdDimWidthInput').disabled = true;
                    document.getElementById('cmdDimWidthInput').value = '';
                }
            });
            document.getElementById('cmdDimHeightSelect').addEventListener("change", function(e){
                if(this.value == 'fixed') document.getElementById('cmdDimHeightInput').disabled = false;
                else {
                    document.getElementById('cmdDimHeightInput').disabled = true;
                    document.getElementById('cmdDimHeightInput').value = '';
                }
            });
            // config
            // document.getElementById('configColor').addEventListener("click", function(e){
            //     modal.toggle(this);
            // });

        }
        this.template = function() {
            document.getElementById('btnTemplate').addEventListener("click", function(e){
                template.togglePanel();
            });
        }
        function genCode(el,opt) {
            if(!opt) opt = 'block';
            let cloneNowBlock = el.cloneNode(true);
            // cloneNowBlock.removeAttribute("contentEditable");
            // cloneNowBlock.classList.remove('qb-selected', 'qb-relative', 'qb-guideline', 'qb-guideline-dropzone');
            util.cleanCode(cloneNowBlock);
            let html;
            if(opt == 'canvas') html = cloneNowBlock.innerHTML;
            else html = cloneNowBlock.outerHTML;
            html = html_beautify(html);
            // html = html.replace(/[\u00A0-\u9999<>\&]/gim, function(i) {
            //    return '&#'+i.charCodeAt(0)+';';
            // });
            //ace js
            let wrapper = document.createElement("div");
            wrapper.setAttribute('id','editCode');
            wrapper.classList.add('qb-code-ace');
            //wrapper.innerHTML = html;
            let view = document.getElementById('commonCode').getElementsByClassName('qp-modal-body')[0];
            view.innerHTML= '';
            view.appendChild(wrapper);
            wrapper.style.fontSize = '14px';
            qb.codeObj = ace.edit(wrapper);
            qb.codeObj.session.setMode("ace/mode/html");
            qb.codeObj.session.setValue(html);
            qb.codeObj.session.setUseWrapMode(true);
            qb.codeObj.getSession().setUseWorker(false);
            util.initCommonModal('commonCode');
            document.getElementById('commonCode').setAttribute("data-opt",opt);
            modal.openCommon('commonCode');
        }
    }
    function Utils() {
        this.stripScripts = function(str) {
            var div = document.createElement('div');
            div.innerHTML = str;
            var scripts = div.getElementsByTagName('script');
            var i = scripts.length;
            while (i--) {
              scripts[i].parentNode.removeChild(scripts[i]);
            }
            return div.innerHTML;
        }
        this.copyStr = function(str) {
           // Create new element
           var el = document.createElement('textarea');
           // Set value (string to be copied)
           el.value = str;
           // Set non-editable to avoid focus and move outside of view
           el.setAttribute('readonly', '');
           el.style = {position: 'absolute', left: '-9999px'};
           document.body.appendChild(el);
           // Select text inside element
           el.select();
           // Copy text to clipboard
           document.execCommand('copy');
           // Remove temporary element
           document.body.removeChild(el);
        }
        this.cleanCode = function(el) {
            // remove Editable
            el.removeAttribute("contentEditable");
            // remove Guideline
            el.classList.remove('qb-selected', 'qb-relative', 'qb-guideline', 'qb-guideline-dropzone');
            var x = el.querySelectorAll('.qb-selected, .qb-relative, .qb-guideline, .qb-guideline-dropzone');
            for(var i = 0; i < x.length; i++) {
                x[i].classList.remove('qb-selected', 'qb-relative', 'qb-guideline', 'qb-guideline-dropzone');
            }

            var c = el.querySelectorAll('*[contentEditable]');
            for(var i = 0; i < c.length; i++) {
                c[i].removeAttribute("contentEditable");
            }

            var cr = el.querySelector('#colorReference');
            if(cr) {
                cr.parentNode.removeChild(cr);
            }
        }
        this.isEmptyEl = function(el) {
            for(var i = 0; i < el.childNodes.length; i++) {
                if(el.childNodes[i].nodeType != 3) return false;
            }
            return true;
        }
        this.getColorHtml = function(opt) {
            let html = '';
            // opt = bgColor, textColor, borderColor
            if(!opt) return null;
            for(var i = 0; i < qb.colors.length; i++){
                html = html + '<span data-opt="'+opt+'" data-type="class" data-set="basic" data-value="'+ qb.colors[i] +'" class="qb-colorpick qb-colorcell-big as-hover-zoom as-' + qb.colors[i] + '">' + qb.colors[i] + '</span>';
            }
            if(opt == 'bgColor') {
                for(var i = 1; i < 9; i++){
                    html = html + '<span data-opt="'+opt+'" data-type="class" data-value="dark'+ i +'" class="qb-colorpick qb-colorcell-big as-hover-zoom as-dark' + i + '">darken' + i + '</span>';
                }
            }
            html = html + '<div class="qp-line"></div>'
            + '<input id="colorInput_'+opt+'" value="" class="qp-input qb-colorinput">'
            + '<button id="colorInputOk_'+opt+'" for="colorInput_'+opt+'" class="qb-colorinputok qp-btn"><i class="fas fa-check"></i></button>';
            return html;
        }
        this.toggleCommonModalSize = function(id) {
            if(document.getElementById(id).getAttribute('data-window') != 'full') {
                this.maxmizeCommonModal(id);
                // wrapper.style.paddingTop = '0px';
                // wrapper.style.paddingLeft = '0px';
                // wrapper.style.paddingRight = '0px';
                // wrapper.getElementsByClassName('qp-modal')[0].style.maxWidth = '100%';
                // // 모달의 heaer와 footer의 두께와 내부 padding(40px)공간을 뺀 높이 산출
                // let height = window.innerHeight - wrapper.getElementsByClassName('qp-modal-header')[0].clientHeight - wrapper.getElementsByClassName('qp-modal-footer')[0].clientHeight - 40;
                // wrapper.getElementsByClassName('qp-modal')[0].style.height = '100%';
                // wrapper.getElementsByClassName('qb-code-ace')[0].style.height = height + 'px';
                // //wrapper.getElementsByClassName('ace_content')[0].style.height = height + 'px';
                // qb.codeObj.resize();
                // // change BUTTON
                // let btn = document.getElementById('btnCodeFull');
                // btn.innerHTML = '<i class="far fa-window-restore"></i>';
                // wrapper.setAttribute('data-window','full');
            } else {
                this.initCommonModal(id);
                // wrapper.style.paddingTop = '100px';
                // wrapper.style.paddingLeft = '20px';
                // wrapper.style.paddingRight = '20px';
                // wrapper.getElementsByClassName('qp-modal')[0].style.maxWidth = '750px';
                // wrapper.getElementsByClassName('qp-modal')[0].style.height = '';
                // let height = 400;
                // wrapper.getElementsByClassName('qb-code-ace')[0].style.height = height + 'px';
                // // change BUTTON
                // let btn = document.getElementById('btnCodeFull');
                // btn.innerHTML = '<i class="far fa-window-maximize"></i>';
                // wrapper.setAttribute('data-window','small');
            }

        }
        this.initCommonModal = function(id){
            let wrapper = document.getElementById(id);
            wrapper.style.paddingTop = '100px';
            wrapper.style.paddingLeft = '20px';
            wrapper.style.paddingRight = '20px';
            wrapper.getElementsByClassName('qp-modal')[0].style.maxWidth = '750px';
            wrapper.getElementsByClassName('qp-modal')[0].style.height = '';
            let height = 400;
            wrapper.getElementsByClassName('qb-code-ace')[0].style.height = height + 'px';
            // change BUTTON
            let btn = document.getElementById('btnCodeFull');
            btn.innerHTML = '<i class="far fa-window-maximize"></i>';
            wrapper.setAttribute('data-window','small');
        }
        this.maxmizeCommonModal = function(id){
            let wrapper = document.getElementById(id);
            wrapper.style.paddingTop = '0px';
            wrapper.style.paddingLeft = '0px';
            wrapper.style.paddingRight = '0px';
            wrapper.getElementsByClassName('qp-modal')[0].style.maxWidth = '100%';
            // 모달의 heaer와 footer의 두께와 내부 padding(40px)공간을 뺀 높이 산출
            let height = window.innerHeight - wrapper.getElementsByClassName('qp-modal-header')[0].clientHeight - wrapper.getElementsByClassName('qp-modal-footer')[0].clientHeight - 40;
            wrapper.getElementsByClassName('qp-modal')[0].style.height = '100%';
            wrapper.getElementsByClassName('qb-code-ace')[0].style.height = height + 'px';
            //wrapper.getElementsByClassName('ace_content')[0].style.height = height + 'px';
            qb.codeObj.resize();
            // change BUTTON
            let btn = document.getElementById('btnCodeFull');
            btn.innerHTML = '<i class="far fa-window-restore"></i>';
            wrapper.setAttribute('data-window','full');

        }
        this.clearLocalStorage = function() {
            localStorage.clear();
        }
        this.saveAllToStorage = function(opt) {
            if (typeof(Storage) !== "undefined") {
              // let innerDoc = iframe.contentDocument || iframe.contentWindow.document;
              // let content = innerDoc.body.cloneNode(true).outerHTML;
              let content = block.canvas.cloneNode(true).innerHTML;
              // let x = content.getElementsByClassName("qb-selected");
              // for(var i = 0; i < x.length; i++){
              //     if(x[i] != target) {
              //         // toolbar = x[i].getElementsByClassName('qb-toolbar')[0];
              //         // if(toolbar) x[i].removeChild(toolbar);
              //         x[i].contentEditable = "false";
              //         x[i].classList.remove('qb-selected','qb-relative');
              //     }
              // }
              let index = localStorage.getItem("taskIndex");
              if(opt == 'init') index = 0;
              let removeIndex;
              let maxIndex;
              index = Number(index) + 1;
              if(index > 3) removeIndex = index - 3; // 저장은 3단계만 허용
              localStorage.setItem("taskIndex", index); // 현재 index 지정
              localStorage.setItem("maxIndex", index); // 향후 redo 등을 위한 max 저장
              localStorage.setItem(index, content);
              if(removeIndex) localStorage.removeItem(removeIndex);
              this.onOffDo(index);
            }
        }
        this.onOffDo = function(nowIndex) {
            if(!nowIndex) nowIndex = localStorage.getItem('maxIndex');

            if(hasUndo()) this.btnOn(tool.btnUndo);
            else this.btnOff(tool.btnUndo);

            if(hasRedo()) this.btnOn(tool.btnRedo);
            else this.btnOff(tool.btnRedo);

            function hasUndo(){
                let lastIndex = Number(nowIndex) - 1;
                let content = localStorage.getItem(lastIndex);
                if(content) return true;
                else return false;
            }
            function hasRedo(){
                if(!nowIndex) nowIndex = localStorage.getItem('maxIndex');
                let nextIndex = Number(nowIndex) + 1;
                let content = localStorage.getItem(nextIndex);
                if(content) return true;
                else return false;
            }
        }
        this.undo = function() {
            if (typeof(Storage) !== "undefined") {
                let nowIndex = localStorage.getItem("taskIndex");
                let lastIndex = Number(nowIndex) - 1;
                if(lastIndex > 0) {
                    let content = localStorage.getItem(lastIndex);
                    if(content) {
                        // let innerDoc = iframe.contentDocument || iframe.contentWindow.document;
                        // innerDoc.body.outerHTML = content;
                        block.canvas.innerHTML = content;
                        localStorage.setItem("taskIndex",lastIndex);
                        // body의 outer까지 재생 했으므로 기존 body로 지정 되어 있는 block.cnavas를 재생된 body로 다시 지정
                        // canvas id가 있으면 해당 영역을 canvas 로 지정
                        let innerDoc = iframe.contentDocument || iframe.contentWindow.document;
                        if(config['canvasId']) block.canvas = innerDoc.getElementById(config['canvasId']);
                        else block.canvas = innerDoc.getElementsByTagName("BODY")[0];
                        // 재생된 body에 다시 이벤트 적용
                        qp.initEvents(block.canvas); // qp js 다시 적용
                        addEvent.canvas();
                        addEvent.hover(block.canvas); // directbar 다시 설정
                        block.cleanEditable();
                        this.onOffDo(lastIndex);
                    }
                }
            }
        }
        this.redo = function() {
            if (typeof(Storage) !== "undefined") {
                let nowIndex = localStorage.getItem("taskIndex");
                let maxIndex = localStorage.getItem("maxIndex");
                if(Number(maxIndex) > Number(nowIndex)) {
                    let nextIndex = Number(nowIndex) + 1;
                    let content = localStorage.getItem(nextIndex);
                    if(content) {
                        // let innerDoc = iframe.contentDocument || iframe.contentWindow.document;
                        // innerDoc.body.outerHTML = content;
                        block.canvas.innerHTML = content;
                        localStorage.setItem("taskIndex",nextIndex);
                        // body의 outer까지 재생 했으므로 기존 body로 지정 되어 있는 block.cnavas를 재생된 body로 다시 지정
                        // canvas id가 있으면 해당 영역을 canvas 로 지정
                        let innerDoc = iframe.contentDocument || iframe.contentWindow.document;
                        if(config['canvasId']) block.canvas = innerDoc.getElementById(config['canvasId']);
                        else block.canvas = innerDoc.getElementsByTagName("BODY")[0];
                        // 재생된 body에 다시 이벤트 적용
                        qp.initEvents(block.canvas); // qp js 다시 적용
                        addEvent.canvas();
                        addEvent.hover(block.canvas); // Event 다시 설정
                        block.cleanEditable();
                        this.onOffDo(nextIndex);
                    }
                }
            }
        }
        this.setGoogleFonts = function (){
            let url = 'https://fonts.googleapis.com/css?family=';
            let sheets = iframe.contentDocument.getElementsByTagName('link');
            let googleUrl = null;
            // 구글 폰트 link 찾아서 global 변수에 링크 저장
            for(var i =0; i < sheets.length; i++) {
                if(this.extractHostname(sheets[i].href) == 'fonts.googleapis.com') {
                    googleUrl = sheets[i].href;
                    qb.googleFontSheet = sheets[i];
                }
            }
            // 구글 폰트 link가 있으면, 내장 폰트와 mixing
            if(googleUrl) {
                let family = googleUrl.split('family=')[1];
                if(family) {
                    family.split('|').forEach(function(name){
                        name = name.replace('+', ' ');
                        if(!qb.googleFonts.includes(name)) qb.googleFonts.push(name);
                    });
                }
                qb.googleFonts.forEach(function(name,idx,arr) {
                    name = name.replace(/ /g, '+');
                    url = url + name;
                    if(idx !== arr.length-1) url =url + '|';
                });
                qb.googleFontSheet.href = url;
                // 구글 폰트 link가 없으면 새로 생성
            } else {
                qb.googleFonts.forEach(function(name,idx,arr) {
                    name = name.replace(/ /g, '+');
                    url = url + name;
                    if(idx !== arr.length-1) url =url + '|';
                });
                let css = document.createElement('link');
                css.href = url;
                css.rel = "stylesheet";
                iframe.contentDocument.head.appendChild(css);
                qb.googleFontSheet = css;
            }
        }
        this.extractHostname = function(url) {
            if(!url) return null;
            var hostname;
            //find & remove protocol (http, ftp, etc.) and get hostname
            if (url.indexOf("//") > -1) {
                hostname = url.split('/')[2];
            }
            else {
                hostname = url.split('/')[0];
            }
            //find & remove port number
            hostname = hostname.split(':')[0];
            //find & remove "?"
            hostname = hostname.split('?')[0];
            return hostname;
        }
        this.setEditOption = function (e){
            var isShift = !!window.event.shiftKey
            if(e.keyCode == 13) {
                if(isShift) this.insertHtmlAt('<br>');
                else this.insertHtmlAt('<br><br>');
                e.preventDefault();
            }
        }
        this.isGoogleFont = function(fontName) {
            let list = this.httpGet('https://www.googleapis.com/webfonts/v1/webfonts?key=AIzaSyA_gElSbNqIhD3_lQ_cRS5R3w_xV0usXAk');
            let obj = JSON.parse(list);
            let result = false;
            obj.items.forEach(function(name){
                if(fontName == name.family) result = true;
            });
            return result;
        }
        this.httpGet = function(url) {
            if(!url) return null;
            var xmlHttp = new XMLHttpRequest();
            xmlHttp.open( "GET", url, false ); // false for synchronous request
            xmlHttp.send( null );
            return xmlHttp.responseText;
        }
        this.getWrap = function(el, wrapClass){
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
        this.getWrapTag = function(el, tagName){
            if(!tagName) return null;
            if(!el) return null;
            while (el.tagName != tagName) {
                if (el.tagName == "BODY") {
                    return null;
                }
                el = el.parentNode;
                if (!el || el.tagName == "BODY") {
                    return null;
                }
            }  return el;
        }
        this.btnOff = function(btn) {
            //btn.disabled = true;
            btn.style.pointerEvents = "none";
            btn.style.opacity = "0.5";
            btn.style.cursor = "default";
        }
        this.btnOn = function(btn) {
            //btn.disabled = false;
            btn.style.pointerEvents = "auto";
            btn.style.opacity = "1";
            btn.style.cursor = "pointer";
        }
        this.btnOffAll = function() {
            var btns = tool.toolArea.getElementsByClassName('qp-btn');
            for(var i = 0; i < btns.length; i++) {
                if(btns[i].classList.contains('qb-btn-everon') == false) this.btnOff(btns[i]);
            }
        }
        this.btnOnAll = function() {
            var btns = tool.toolArea.getElementsByClassName('qp-btn');
            for(var i = 0; i < btns.length; i++) {
                if(btns[i].classList.contains('qb-btn-everon') == false) this.btnOn(btns[i]);
            }
        }
        // Style 결과 값에 px 이 붙어 있을 경우 제거해줌(null 일 경우 null 반환)
        this.removePx = function(px) {
            var result = null;
            if(px){
                result = px.replace('px','')
            }
            return result;
        }
        this.saveSelection = function() {
            if (window.getSelection) {
                var sel = iframe.contentWindow.getSelection();
                if (sel.getRangeAt && sel.rangeCount) {
                    return sel.getRangeAt(0);
                }
            } else if (document.selection && document.selection.createRange) {
                return document.selection.createRange();
            }
            return null;
        }
        this.restoreSelection = function(range) {
            if (range) {
                if (window.getSelection) {
                    var sel = iframe.contentWindow.getSelection();
                    sel.removeAllRanges();
                    sel.addRange(range);
                } else if (document.selection && range.select) {
                    range.select();
                }
            }
        }
        this.isDescendant = function(parent, child) {
             var node = child.parentNode;
             while (node != null) {
                 if (node == parent) {
                     return true;
                 }
                 node = node.parentNode;
             }
             return false;
        }
        this.currentStyle = function(target, property){
            var styleObj = window.getComputedStyle(target, null);
            var result = styleObj[property];
            if(result) {
                if(property == 'backgroundColor' || property == 'color' || property == 'borderColor') result = this.rgbToHex(result);
            }
            return result;
        }
        this.rgbToHex = function(rgb) {
            rgb = rgb.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);
            return (rgb && rgb.length === 4) ? "#" +
             ("0" + parseInt(rgb[1],10).toString(16)).slice(-2) +
             ("0" + parseInt(rgb[2],10).toString(16)).slice(-2) +
             ("0" + parseInt(rgb[3],10).toString(16)).slice(-2) : '';
        }
        //Return the class name if target has the class of property, else return null
        this.getCurrentClass = function(target, property) {
            if(!target && !property) return;
            var result = null;
            if(property == 'shadow') {
                // var classes = ['as-pd', 'as-pd-left', 'as-pd-right', 'as-pd-top', 'as-pd-bottom', 'as-pd-side', 'as-pd-tab', 'as-pd-large', 'as-pd-xlarge', 'as-pd-xxlarge', 'as-pd-jumbo'];
                qb.shadowClasses.forEach(function(name) {
                    if(target.classList.contains(name)) result = name;
                });
            }
            if(property == 'br') {
                // var classes = ['as-pd', 'as-pd-left', 'as-pd-right', 'as-pd-top', 'as-pd-bottom', 'as-pd-side', 'as-pd-tab', 'as-pd-large', 'as-pd-xlarge', 'as-pd-xxlarge', 'as-pd-jumbo'];
                qb.brClasses.forEach(function(name) {
                    if(target.classList.contains(name)) result = name;
                });
            }
            if(property == 'padding') {
                // var classes = ['as-pd', 'as-pd-left', 'as-pd-right', 'as-pd-top', 'as-pd-bottom', 'as-pd-side', 'as-pd-tab', 'as-pd-large', 'as-pd-xlarge', 'as-pd-xxlarge', 'as-pd-jumbo'];
                qb.paddingClasses.forEach(function(name) {
                    if(target.classList.contains(name)) result = name;
                });
            }
            if(property == 'margin') {
                // var classes = ['as-mg', 'as-mg-left', 'as-mg-right', 'as-mg-top', 'as-mg-bottom', 'as-mg-side', 'as-mg-tab'];
                qb.marginClasses.forEach(function(name) {
                    if(target.classList.contains(name)) result = name;
                });
            }
            if(property == 'fontSize') {
                qb.fontSizeClasses.forEach(function(name) {
                    if(target.classList.contains(name)) result = name;
                });
            }
            if(property == 'btnSize') {
                qb.btnSizeClasses.forEach(function(name) {
                    if(target.classList.contains(name)) result = name;
                });
            }
            if(property == 'btnType') {
                qb.btnTypeClasses.forEach(function(name) {
                    if(target.classList.contains(name)) result = name;
                });
            }
            if(property == 'bgColor') {
                qb.colors.forEach(function(name) {
                    let className = 'as-' + name;
                    if(target.classList.contains(className)) result = className;
                });
            }
            if(property == 'dark') {
                qb.darks.forEach(function(name) {
                    if(target.classList.contains(name)) result = name;
                });
            }
            if(property == 'btnColor') {
                qb.colors.forEach(function(name) {
                    let className = 'as-btn-' + name;
                    if(target.classList.contains(className)) result = className;
                });
            }
            if(property == 'dividerColor') {
                qb.colors.forEach(function(name) {
                    let className = 'as-divider-' + name;
                    if(target.classList.contains(className)) result = className;
                });
            }
            if(property == 'color') {
                qb.colors.forEach(function(name) {
                    let className = 'as-text-' + name;
                    if(target.classList.contains(className)) result = className;
                });
            }
            if(property == 'fontColor') {
                qb.colors.forEach(function(name) {
                    let className = 'as-text-' + name;
                    if(target.classList.contains(className)) result = className;
                });
            }
            if(property == 'textColor') {
                qb.colors.forEach(function(name) {
                    let className = 'as-text-' + name;
                    if(target.classList.contains(className)) result = className;
                });
            }
            if(property == 'shape') {
                qb.shapeClasses.forEach(function(name) {
                    if(target.classList.contains(name)) result = name;
                });
            }
            if(property == 'inputType') {
                qb.inputTypeClasses.forEach(function(name) {
                    if(target.classList.contains(name)) result = name;
                });
            }
            if(property == 'borderColor') {
                qb.colors.forEach(function(name) {
                    let borderColor = 'as-border-' + name;
                    if(target.classList.contains(borderColor)) result = borderColor;
                });
            }
            if(property == 'mobileWidth') {
                qb.mobileWidthClasses.forEach(function(name) {
                    if(target.classList.contains(name)) result = name;
                });
            }
            if(property == 'resMd') {
                qb.resMdClasses.forEach(function(name) {
                    if(target.classList.contains(name)) result = name;
                });
            }
            if(property == 'resSm') {
                qb.resSmClasses.forEach(function(name) {
                    if(target.classList.contains(name)) result = name;
                });
            }
            if(property == 'animate') {
                qb.animateClasses.forEach(function(name) {
                    if(target.classList.contains(name)) result = name;
                });
            }
            if(property == 'verticalAlign') {
                qb.verticalAlignClasses.forEach(function(name) {
                    if(target.classList.contains(name)) result = name;
                });
            }
            if(property == 'align') {
                qb.alignClasses.forEach(function(name) {
                    if(target.classList.contains(name)) result = name;
                });
            }
            return result;
        }
        this.currentBorderWidth = function(target){
            var width = null;
            if(this.currentStyle(target, 'borderLeftWidth') != '0px') width = this.currentStyle(target, 'borderLeftWidth');
            if(this.currentStyle(target, 'borderRightWidth') != '0px') width = this.currentStyle(target, 'borderRightWidth');
            if(this.currentStyle(target, 'borderTopWidth') != '0px') width = this.currentStyle(target, 'borderTopWidth');
            if(this.currentStyle(target, 'borderBottomWidth') != '0px') width = this.currentStyle(target, 'borderBottomWidth');
            return width;
        }
        this.toggleStyle = function(el,sn,value) {
            if(sn == "bold") {
                if(el.style.fontWeight == "bold") el.style.fontWeight = "normal";
                else el.style.fontWeight = "bold";
            } else if(sn == "italic") {
                if(el.style.fontStyle == "italic") el.style.fontStyle = "normal";
                else el.style.fontStyle = "italic";
            } else if(sn == "underline") {
                if(el.style.textDecoration  == "underline") el.style.textDecoration  = "none";
                else el.style.textDecoration  = "underline";
            } else if(sn == "right") {
                if(el.style.textAlign != "right") el.style.textAlign  = "right";
            } else if(sn == "left") {
                if(el.style.textAlign != "left") el.style.textAlign  = "left";
            } else if(sn == "center") {
                if(el.style.textAlign != "center") el.style.textAlign  = "center";
            } else if(sn == "justify") {
                if(el.style.textAlign != "justify") el.style.textAlign  = "justify";
            } else if(sn == "backgroundColor") {
                el.style.backgroundColor = value;
            } else if(sn == "color") {
                el.style.color = value;
            } else if(sn == "fontSize") {
                el.style.fontSize = value;
            } else if(sn == "lineHeight") {
                el.style.lineHeight = value;
            } else if(sn == "fontFamily") {
                el.style.fontFamily = value;
            }
        }
        this.offsetRelative = function(el){
            var childPos = el.getBoundingClientRect();
            var parentPos = el.parentNode.getBoundingClientRect();
            return{top: childPos.top - parentPos.top,  left: childPos.left - parentPos.left, width:childPos.right - childPos.left, height:childPos.bottom - childPos.top}
        }
        this.offset = function(el) {
            var rect = el.getBoundingClientRect(),
            scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
            scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            var iframeRect = iframe.getBoundingClientRect();
            return { top: rect.top + iframeRect.top, left: rect.left + scrollLeft }
        }
        this.execCommand = function(commandName, value, opt) {
            var sel = iframe.contentWindow.getSelection();
            var selParent = sel.getRangeAt(0).commonAncestorContainer;
            var selCon = sel.getRangeAt(0).cloneContents();
            var selChilds = sel.getRangeAt(0).cloneContents().childNodes;
            var html = "";
            for(var i = 0; i < selChilds.length; i++) {
                if(selChilds[i].nodeType === 1) {
                    if(commandName == 'useClass') {
                        // if(opt == 'textcolor') qbTextColorPicker.cleanTextColorClass(selChilds[i]);
                        // else if(opt == 'bgcolor') qbBgColorPicker.cleanBgColorClass(selChilds[i]);
                        // else if(opt == 'textsize') qbCleanTextSizeClass(selChilds[i]);
                        // selChilds[i].classList.add(value);
                        exec.addClass(selChilds[i], value, opt);
                    } else this.toggleStyle(selChilds[i], commandName, value);
                    html = html + selChilds[i].outerHTML;
                } else if(selChilds[i].nodeType == 3) {
                    var wrapper = document.createElement('span');
                    wrapper.innerHTML = selChilds[i].nodeValue;
                    wrapper.style.fontWeight = selParent.parentNode.style.fontWeight;
                    wrapper.style.fontStyle = selParent.parentNode.style.fontStyle;
                    wrapper.style.textDecoration = selParent.parentNode.style.textDecoration;
                    if(commandName == 'useClass') wrapper.classList.add(value);
                    else this.toggleStyle(wrapper, commandName, value);
                    html = html + wrapper.outerHTML;
                }
            }
            this.replaceSelection(html, true);
        }
        this.execCommandLink = function(url,targetWindow) {
            var sel = iframe.contentWindow.getSelection();
            var selParent = sel.getRangeAt(0).commonAncestorContainer;
            var selCon = sel.getRangeAt(0).cloneContents();
            var selChilds = sel.getRangeAt(0).cloneContents().childNodes;
            var html = "";
            for(var i = 0; i < selChilds.length; i++) {
                if(selChilds[i].nodeType === 1) {
                    if(selChilds[i].tagName == 'A') {
                        selChilds[i].href = url;
                        selChilds[i].target = targetWindow;
                        html = html + selChilds[i].outerHTML;
                    } else {
                        var wrapper = document.createElement('a');
                        wrapper.innerHTML = selChilds[i].nodeValue;
                        wrapper.href = url;
                        wrapper.target = targetWindow;
                        html = html + wrapper.outerHTML;
                    }
                } else if(selChilds[i].nodeType == 3) {
                    var wrapper = document.createElement('a');
                    wrapper.innerHTML = selChilds[i].nodeValue;
                    wrapper.href = url;
                    wrapper.target = targetWindow;
                    html = html + wrapper.outerHTML;
                }
            }
            this.replaceSelection(html, true);
        }
        this.replaceSelection = function(html, selectInserted) {
            var sel, range, fragment;
            sel = iframe.contentWindow.getSelection();
            // Test that the Selection object contains at least one Range
            if (sel.getRangeAt && sel.rangeCount) {
                // Get the first Range (only Firefox supports more than one)
                range = iframe.contentWindow.getSelection().getRangeAt(0);
                range.deleteContents();

                // Create a DocumentFragment to insert and populate it with HTML
                // Need to test for the existence of range.createContextualFragment
                // because it's non-standard and IE 9 does not support it
                if (range.createContextualFragment) {
                    fragment = range.createContextualFragment(html);
                } else {
                    // In IE 9 we need to use innerHTML of a temporary element
                    var div = document.createElement("div"), child;
                    div.innerHTML = html;
                    fragment = document.createDocumentFragment();
                    while ( (child = div.firstChild) ) {
                        fragment.appendChild(child);
                    }
                }
                var firstInsertedNode = fragment.firstChild;
                var lastInsertedNode = fragment.lastChild;
                range.insertNode(fragment);
                if (selectInserted) {
                    if (firstInsertedNode) {
                        range.setStartBefore(firstInsertedNode);
                        range.setEndAfter(lastInsertedNode);
                    }
                    sel.removeAllRanges();
                    sel.addRange(range);
                }
            }
        }
        this.insertHtmlAt = function(html) {
            var sel, range;
            if (window.getSelection) {
                // IE9 and non-IE
                sel = iframe.contentWindow.getSelection();
                if (sel.getRangeAt && sel.rangeCount) {
                    range = sel.getRangeAt(0);
                    range.deleteContents();

                    // Range.createContextualFragment() would be useful here but is
                    // only relatively recently standardized and is not supported in
                    // some browsers (IE9, for one)
                    var el = document.createElement("div");
                    el.innerHTML = html;
                    var frag = document.createDocumentFragment(), node, lastNode;
                    while ( (node = el.firstChild) ) {
                        lastNode = frag.appendChild(node);
                    }
                    range.insertNode(frag);

                    // Preserve the selection
                    if (lastNode) {
                        range = range.cloneRange();
                        range.setStartAfter(lastNode);
                        range.collapse(true);
                        sel.removeAllRanges();
                        sel.addRange(range);
                    }
                }
            } else if (document.selection && document.selection.type != "Control") {
                // IE < 9
                document.selection.createRange().pasteHTML(html);
            }
        }
        this.createElementFromHtml = function(htmlString) {
            var div = document.createElement('div');
            div.innerHTML = htmlString.trim();
            // Change this to div.childNodes to support multiple top-level nodes
            return div.firstChild;
        }
        this.htmlEntities = function(html) {
            return String(html).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
        }
        this.decodeHtmlEntity = function(str) {
          return str.replace(/&#(\d+);/g, function(match, dec) {
            return String.fromCharCode(dec);
          });
        };
        this.encodeHtmlEntity = function(str) {
          var buf = [];
          for (var i=str.length-1;i>=0;i--) {
            buf.unshift(['&#', str[i].charCodeAt(), ';'].join(''));
          }
          return buf.join('');
        };
        this.encodeHtml = function(string) {
            // URL-encode some more characters to avoid issues when using permalink URLs in Markdown
            return encodeURIComponent(string).replace(/['()_*]/g, function(character) {
                return '%' + character.charCodeAt().toString(16);
            });
        }
        //check the element has specefic class(or array)
        this.hasClass = function(el, className){
            let result = false;
            if(Array.isArray(className)) {
                className.forEach(function(name) {
                    if(el.classList.contains(name)) result = true;
                });
            } else {
                if(el.classList.contains(className)) return true;
            }
            return result;
        }
    }
    function Templates() {
        // var templatePath = "https://www.getqpress.com/builder";
        var templatePath = config['builderPath'];
        this.genTemplatArea = function() {
            let btnTemp = document.createElement('button');
            btnTemp.classList.add('qb-btn-template','qp-btn', 'as-btn-gray', 'as-rect-right');
            btnTemp.innerHTML = '<i class="fas fa-angle-left"></i>';
            btnTemp.setAttribute('id','btnTemplate');
            btnTemp.style.display = "none";
            document.body.appendChild(btnTemp);

            let panel = document.createElement('div');
            panel.classList.add('qb-panel-template','as-shade', 'as-border-left', 'as-pd');
            panel.setAttribute('id','panelTemplate');
            panel.style.top = document.getElementById(config['docId']).getBoundingClientRect().top + 'px';
            panel.style.height = window.innerHeight - document.getElementById(config['docId']).getBoundingClientRect().top + "px";
            document.body.appendChild(panel);
        }
        this.togglePanel = function() {
          let panel = document.getElementById('panelTemplate');
          let btn = document.getElementById('btnTemplate');
          if(panel.style.display == "block") {
            panel.style.display = "none";
            btn.style.display = "none";
            btn.style.right="0px";
            btn.innerHTML ="<i class='fas fa-angle-left'></i>";
          } else {
            panel.style.display = "block";
            btn.style.display = "block";
            btn.style.right="250px";
            btn.innerHTML ="<i class='fas fa-angle-right'></i>";
          }
        }
        this.closePanel = function() {
          let panel = document.getElementById('panelTemplate');
          let btn = document.getElementById('btnTemplate');
          if(panel.style.display == "block") {
            panel.style.display = "none";
            btn.style.right="0px";
            btn.innerHTML ="<i class='fas fa-angle-left'></i>";
          }
        }
        var tempDpZone = document.createElement('div');
        this.live = function() {
            let tempArea = document.getElementById('panelTemplate');
            let btnAddWrap = document.createElement('button');
            btnAddWrap.classList.add('qp-btn', 'as-btn-parent', 'as-w100','as-br');
            btnAddWrap.innerHTML = '<i class="fas fa-plus"></i> Inert Drop Zone';
            tempArea.appendChild(btnAddWrap);
            btnAddWrap.addEventListener("click", function(e){
                let wrap = document.createElement('div');
                wrap.classList.add('qp-wrap');
                wrap.innerHTML = '<div class="qp-section"><p>Section</p></div>';
                block.canvas.insertBefore(wrap, block.canvas.firstChild);
                // iframe.contentWindow.scrollTo(0, iframe.contentWindow.document.body.scrollHeight);
                // template.togglePanel();
                block.liveGuideLine();
            });
            let select = document.createElement('SELECT');
            select.classList.add('qp-input', 'as-w100', 'as-mg-bottom');
            let option = '<option value="common">Common</option>'
                          + '<option value="components">Components</option>'
                          + '';
            select.innerHTML = option;
            tempArea.appendChild(select);
            // let dpZone = document.createElement('div');
            // dpZone.setAttribute('id','tempDpZone');
            tempArea.appendChild(tempDpZone);
            loadXML(config['builderPath'] + '/template/common.xml');
            select.addEventListener("change", function(e){
                let xmlFile = templatePath  + '/template/' + e.target.value + '.xml';
                loadXML(xmlFile);
            });
        }
        function loadXML(xmlFile) {
          var xhttp = new XMLHttpRequest();
          xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                displayTemplates(this);
            }
          };
          xhttp.open("GET", xmlFile, true);
          xhttp.send();
        }
        function displayTemplates(xml) {
           tempDpZone.innerHTML = '';
          var i;
          var xmlDoc = xml.responseXML;
          var x = xmlDoc.getElementsByTagName("TEMPLATE");
          var html = '', title = '', idx = '', tempBtn;
          for (i = 0; i <x.length; i++) {
                title = x[i].getElementsByTagName("TITLE")[0].childNodes[0].nodeValue;
                idx = x[i].getElementsByTagName("IDX")[0].childNodes[0].nodeValue;
                html = x[i].getElementsByTagName("HTML")[0].childNodes[0].nodeValue;
                // if(thumb.childNodes.length > 0) tempBtn = '<img src="'+ thumb.childNodes[0].nodeValue +'" data-title="'+title+'">';
                // else tempBtn = '<button class="qp-btn as-w100" data-title="'+title+'">'+ title +'</button>';
                tempBtn = '<div class="qp-div as-hover-main as-white as-border as-pointer" data-idx="'+idx+'" style="padding:10px 5px 5px 5px">'
                + '<div class="as-center as-text-small" style="margin-bottom:5px">'+ title +'</div>'
                + '<img src="' + templatePath + '/template/images/'+idx+'.png" style="width:100%">'
                + '</div>';
                tempBtn = util.createElementFromHtml(tempBtn);
                // tempBtn.style.marginBottom = '15px';
                // html 저장
                // Check browser support
                if (typeof(Storage) !== "undefined") {
                // Store
                    localStorage.setItem(idx, html);
                // Retrieve
                } else {
                    console.log('no storage');
                }
              // tempBtn.setAttribute('data-value',html);
              tempDpZone.appendChild(tempBtn);
              tempBtn.addEventListener("click", function(e){
                  if(!qb.nowBlock) {
                      //console.log("You must select edit area");
                      alt.live('You must select edit area','as-red');
                      return;
                  }
                  let tempIdx = e.target.parentNode.getAttribute('data-idx');
                  let addedHtml = localStorage.getItem(tempIdx);
                  if(!addedHtml) return;
                  qb.addedBlock = util.createElementFromHtml(addedHtml);

                  if(qb.insType == "inbox") qb.nowBlock.appendChild(qb.addedBlock);
                  else if(qb.insType == "add") qb.nowBlock.parentNode.insertBefore(qb.addedBlock,qb.nowBlock.nextElementSibling);

                  // var insTarget = qb.nowBlock;
                  // var insMode = "below";
                  // if(qb.nowBlock.className.match(/qp-section|qp-wrap|qp-grid-cell|qp-cover-content/g)) {
                  //     insMode = "inbox";
                  // } else if(qb.nowBlock.parentNode.classList.contains("qp-block")) {
                  //     insTarget = qb.nowBlock.parentNode;
                  //     insMode = "below";
                  // }
                  // if(insMode == "inbox") insTarget.appendChild(qb.addedBlock);
                  // else if(insMode == "below") insTarget.parentNode.insertBefore(qb.addedBlock,insTarget.nextElementSibling);

                  // if(qb.nowBlock.className.match(/qp-section|qp-wrap|qp-grid-cell|qp-cover-content/g)) qb.nowBlock.appendChild(qb.addedBlock);
                  // else if(qb.nowBlock.parentNode.clasName)
                  //else qb.nowBlock.parentNode.insertBefore(qb.addedBlock,qb.nowBlock.nextElementSibling);
                  block.initBlock(qb.addedBlock);
                  qb.addedBlock = '';
                  template.togglePanel();
                  block.liveGuideLine();
                  block.toolbarOnDrop();
                  block.toolbarReposition();
                  util.saveAllToStorage();
              });
          }
        }
    }
    function Alerts() {
        this.genAlert = function() {
            var msg = "Message";
            var wrapper = document.createElement("DIV");
            wrapper.classList.add("qp-alert","as-hidden","as-absolute");
            wrapper.setAttribute("id","qbAlert");
            wrapper.style.top = "300px";
            wrapper.style.right = "100px";
            wrapper.style.width = "400px";
            wrapper.style.zIndex  = "9999";
            wrapper.innerHTML = msg;
            document.body.appendChild(wrapper);
        }
        this.live = function(msg,color) {
            if(!color) color = "as-main";
            var qbAlert = document.getElementById('qbAlert');
            qbAlert.classList.add(color);
            if(msg) qbAlert.innerHTML = msg;
            qp.fadeIn('qbAlert','fast');
            setTimeout(function(){ qp.fadeOut('qbAlert'); }, 800);
        }
    }
}
