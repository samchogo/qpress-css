# qpress

## Easy, Simple, Fast Web

* Uses standard CSS & pure javaScript(No jQuery or third party JavaScript library)
* Fully supports modern responsive UI
* Easy to learn, and easy to use
* Small code and fast working

## Get started
```css
<link rel="stylesheet" href="{Your path}/qp.css">
<script src="{Your path}/qp.js"></script>
```

## Customization
* Open qp.css file using any editing tools
* Modify the css variables at the top of the qp.css file
```css
/* ----------------------------
Vars
------------------------------*/
:root {
	/* ----------------------------
	Colors
	------------------------------*/
	/* font color */
	--font-color-body : #000;
	/* Main color */
	--main : #1258DC;
	--xxmain : #091834;
	--xmain : #0A337F;
	--mainx : #6395F2;
	--mainxx : #DEE9FC;
	/* Point color */
	--point : #236AB9;
	--xpoint : #133863;
	--pointx : #E1ECF9;
	/* Basic color */
	--red : #FE2712;
	--xred : #A70F01;
	--redx : #FFDEDB;
	/* -- */
	--green : #7FBD32;
	--xgreen : #496D1D;
	--greenx : #EEF8E3;
	/* -- */
	--blue : #0247FE;
	--xblue : #012998;
	--bluex : #DBE5FF;
	/* -- */
	--gray : #8F8F8F;
	--xgray : #595959;
	--grayx : #e6e6e6;
	/* -- */
	--yellow : #ffcc00;
	--xyellow : #cca300;
	--yellowx : #fff5cc;
	/* Inverse color */
	--main-inverse : #fff;
	--point-inverse : #fff;
	--red-inverse : #fff;
	--green-inverse : #fff;
	--blue-inverse : #fff;
	--gray-inverse : #fff;
	--yellow-inverse : #fff;
	--xxmain-inverse : var(--mainxx);
	--xmain-inverse : var(--mainxx);
	--mainx-inverse : var(--xxmain);
	--mainxx-inverse : var(--xxmain);
	--xpoint-inverse : var(--point-inverse);
	--pointx-inverse : var(--font-color-body);
	--xred-inverse : var(--red-inverse);
	--redx-inverse : var(--font-color-body);
	--xblue-inverse : var(--blue-inverse);
	--bluex-inverse : var(--font-color-body);
	--xgreen-inverse : var(--green-inverse);
	--greenx-inverse : var(--font-color-body);
	--xyellow-inverse : var(--yellow-inverse);
	--yellowx-inverse : var(--font-color-body);
	--xgray-inverse : var(--gray-inverse);
	--grayx-inverse : var(--font-color-body);
	/* shade & border color */
	--shade :#f1f2f4;
	--xshade : #e2e4e9;
	--border-color : #e2e6e9;
	/* ----------------------------
	Space & Layout
	------------------------------*/
	--container-width : 1200px;
	--layout-left : 25%;
	--layout-right : 25%;
	--space : 20px;
	/* default shape of box elements */
	--default-radius : 4px;
	/* ----------------------------
	Fonts
	------------------------------*/
	/* fonts */
	--font-size-body : 15px;
	--font-family-body : 'Segoe UI',Helvetica,Arial,sans-serif;
	--font-family-heading :'Segoe UI',Helvetica,Arial,sans-serif;
	/* ----------------------------
	Space setting
	------------------------------*/
	--space-2x : calc(var(--space) * 2);
	--space-3x : calc(var(--space) * 3);
	--space-4x : calc(var(--space)* 4);
	--space-5x : calc(var(--space) * 5);
	--space-6x : calc(var(--space) * 6);
	--space-7x : calc(var(--space) * 7);
	--space-8x : calc(var(--space)* 8);
	--space-9x : calc(var(--space) * 9);
	--space-half : calc(var(--space) / 2);
	--space-twothird : calc(var(--space)* 2/3);
}
```

## Documentats
[www.qpress.me]
