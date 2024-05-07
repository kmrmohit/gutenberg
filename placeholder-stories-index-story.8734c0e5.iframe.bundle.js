"use strict";(globalThis.webpackChunkgutenberg=globalThis.webpackChunkgutenberg||[]).push([[1638],{"./packages/a11y/build-module/index.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{D:()=>speak});var build_module=__webpack_require__("./packages/i18n/build-module/index.js");function addContainer(ariaLive="polite"){const container=document.createElement("div");container.id=`a11y-speak-${ariaLive}`,container.className="a11y-speak-region",container.setAttribute("style","position: absolute;margin: -1px;padding: 0;height: 1px;width: 1px;overflow: hidden;clip: rect(1px, 1px, 1px, 1px);-webkit-clip-path: inset(50%);clip-path: inset(50%);border: 0;word-wrap: normal !important;"),container.setAttribute("aria-live",ariaLive),container.setAttribute("aria-relevant","additions text"),container.setAttribute("aria-atomic","true");const{body}=document;return body&&body.appendChild(container),container}let previousMessage="";function speak(message,ariaLive){!function clear(){const regions=document.getElementsByClassName("a11y-speak-region"),introText=document.getElementById("a11y-speak-intro-text");for(let i=0;i<regions.length;i++)regions[i].textContent="";introText&&introText.setAttribute("hidden","hidden")}(),message=function filterMessage(message){return message=message.replace(/<[^<>]+>/g," "),previousMessage===message&&(message+=" "),previousMessage=message,message}(message);const introText=document.getElementById("a11y-speak-intro-text"),containerAssertive=document.getElementById("a11y-speak-assertive"),containerPolite=document.getElementById("a11y-speak-polite");containerAssertive&&"assertive"===ariaLive?containerAssertive.textContent=message:containerPolite&&(containerPolite.textContent=message),introText&&introText.removeAttribute("hidden")}!function domReady(callback){"undefined"!=typeof document&&("complete"!==document.readyState&&"interactive"!==document.readyState?document.addEventListener("DOMContentLoaded",callback):callback())}((function setup(){const introText=document.getElementById("a11y-speak-intro-text"),containerAssertive=document.getElementById("a11y-speak-assertive"),containerPolite=document.getElementById("a11y-speak-polite");null===introText&&function addIntroText(){const introText=document.createElement("p");introText.id="a11y-speak-intro-text",introText.className="a11y-speak-intro-text",introText.textContent=(0,build_module.__)("Notifications"),introText.setAttribute("style","position: absolute;margin: -1px;padding: 0;height: 1px;width: 1px;overflow: hidden;clip: rect(1px, 1px, 1px, 1px);-webkit-clip-path: inset(50%);clip-path: inset(50%);border: 0;word-wrap: normal !important;"),introText.setAttribute("hidden","hidden");const{body}=document;return body&&body.appendChild(introText),introText}(),null===containerAssertive&&addContainer("assertive"),null===containerPolite&&addContainer("polite")}))},"./packages/compose/build-module/hooks/use-resize-observer/index.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>useResizeAware});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js");const extractSize=(entry,boxProp,sizeType)=>entry[boxProp]?entry[boxProp][0]?entry[boxProp][0][sizeType]:entry[boxProp][sizeType]:"contentBoxSize"===boxProp?entry.contentRect["inlineSize"===sizeType?"width":"height"]:void 0;function useResizeObserver(opts={}){const onResize=opts.onResize,onResizeRef=(0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(void 0);onResizeRef.current=onResize;const round=opts.round||Math.round,resizeObserverRef=(0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(),[size,setSize]=(0,react__WEBPACK_IMPORTED_MODULE_0__.useState)({width:void 0,height:void 0}),didUnmount=(0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(!1);(0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)((()=>(didUnmount.current=!1,()=>{didUnmount.current=!0})),[]);const previous=(0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)({width:void 0,height:void 0}),refCallback=function useResolvedElement(subscriber,refOrElement){const callbackRefElement=(0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null),lastReportRef=(0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null),cleanupRef=(0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(),callSubscriber=(0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)((()=>{let element=null;callbackRefElement.current?element=callbackRefElement.current:refOrElement&&(element=refOrElement instanceof HTMLElement?refOrElement:refOrElement.current),lastReportRef.current&&lastReportRef.current.element===element&&lastReportRef.current.reporter===callSubscriber||(cleanupRef.current&&(cleanupRef.current(),cleanupRef.current=null),lastReportRef.current={reporter:callSubscriber,element},element&&(cleanupRef.current=subscriber(element)))}),[refOrElement,subscriber]);return(0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)((()=>{callSubscriber()}),[callSubscriber]),(0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)((element=>{callbackRefElement.current=element,callSubscriber()}),[callSubscriber])}((0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)((element=>(resizeObserverRef.current&&resizeObserverRef.current.box===opts.box&&resizeObserverRef.current.round===round||(resizeObserverRef.current={box:opts.box,round,instance:new ResizeObserver((entries=>{const entry=entries[0];let boxProp="borderBoxSize";boxProp="border-box"===opts.box?"borderBoxSize":"device-pixel-content-box"===opts.box?"devicePixelContentBoxSize":"contentBoxSize";const reportedWidth=extractSize(entry,boxProp,"inlineSize"),reportedHeight=extractSize(entry,boxProp,"blockSize"),newWidth=reportedWidth?round(reportedWidth):void 0,newHeight=reportedHeight?round(reportedHeight):void 0;if(previous.current.width!==newWidth||previous.current.height!==newHeight){const newSize={width:newWidth,height:newHeight};previous.current.width=newWidth,previous.current.height=newHeight,onResizeRef.current?onResizeRef.current(newSize):didUnmount.current||setSize(newSize)}}))}),resizeObserverRef.current.instance.observe(element,{box:opts.box}),()=>{resizeObserverRef.current&&resizeObserverRef.current.instance.unobserve(element)})),[opts.box,round]),opts.ref);return(0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)((()=>({ref:refCallback,width:size.width,height:size.height})),[refCallback,size?size.width:null,size?size.height:null])}function useResizeAware(){const{ref,width,height}=useResizeObserver(),sizes=(0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)((()=>({width:null!=width?width:null,height:null!=height?height:null})),[width,height]);return[(0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div",{style:{position:"absolute",top:0,left:0,right:0,bottom:0,pointerEvents:"none",opacity:0,overflow:"hidden",zIndex:-1},"aria-hidden":"true",ref}),sizes]}},"./packages/icons/build-module/library/star-empty.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>__WEBPACK_DEFAULT_EXPORT__});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js"),_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./packages/primitives/build-module/svg/index.js");const __WEBPACK_DEFAULT_EXPORT__=(0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__.Wj,{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24"},(0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__.y$,{fillRule:"evenodd",d:"M9.706 8.646a.25.25 0 01-.188.137l-4.626.672a.25.25 0 00-.139.427l3.348 3.262a.25.25 0 01.072.222l-.79 4.607a.25.25 0 00.362.264l4.138-2.176a.25.25 0 01.233 0l4.137 2.175a.25.25 0 00.363-.263l-.79-4.607a.25.25 0 01.072-.222l3.347-3.262a.25.25 0 00-.139-.427l-4.626-.672a.25.25 0 01-.188-.137l-2.069-4.192a.25.25 0 00-.448 0L9.706 8.646zM12 7.39l-.948 1.921a1.75 1.75 0 01-1.317.957l-2.12.308 1.534 1.495c.412.402.6.982.503 1.55l-.362 2.11 1.896-.997a1.75 1.75 0 011.629 0l1.895.997-.362-2.11a1.75 1.75 0 01.504-1.55l1.533-1.495-2.12-.308a1.75 1.75 0 01-1.317-.957L12 7.39z",clipRule:"evenodd"}))},"./packages/icons/build-module/library/star-filled.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>__WEBPACK_DEFAULT_EXPORT__});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js"),_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./packages/primitives/build-module/svg/index.js");const __WEBPACK_DEFAULT_EXPORT__=(0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__.Wj,{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24"},(0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__.y$,{d:"M11.776 4.454a.25.25 0 01.448 0l2.069 4.192a.25.25 0 00.188.137l4.626.672a.25.25 0 01.139.426l-3.348 3.263a.25.25 0 00-.072.222l.79 4.607a.25.25 0 01-.362.263l-4.138-2.175a.25.25 0 00-.232 0l-4.138 2.175a.25.25 0 01-.363-.263l.79-4.607a.25.25 0 00-.071-.222L4.754 9.881a.25.25 0 01.139-.426l4.626-.672a.25.25 0 00.188-.137l2.069-4.192z"}))},"./packages/icons/build-module/library/styles.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>__WEBPACK_DEFAULT_EXPORT__});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js"),_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./packages/primitives/build-module/svg/index.js");const __WEBPACK_DEFAULT_EXPORT__=(0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__.Wj,{viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg"},(0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__.y$,{d:"M12 4c-4.4 0-8 3.6-8 8v.1c0 4.1 3.2 7.5 7.2 7.9h.8c4.4 0 8-3.6 8-8s-3.6-8-8-8zm0 15V5c3.9 0 7 3.1 7 7s-3.1 7-7 7z"}))},"./packages/icons/build-module/library/wordpress.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>__WEBPACK_DEFAULT_EXPORT__});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js"),_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./packages/primitives/build-module/svg/index.js");const __WEBPACK_DEFAULT_EXPORT__=(0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__.Wj,{xmlns:"http://www.w3.org/2000/svg",viewBox:"-2 -2 24 24"},(0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__.y$,{d:"M20 10c0-5.51-4.49-10-10-10C4.48 0 0 4.49 0 10c0 5.52 4.48 10 10 10 5.51 0 10-4.48 10-10zM7.78 15.37L4.37 6.22c.55-.02 1.17-.08 1.17-.08.5-.06.44-1.13-.06-1.11 0 0-1.45.11-2.37.11-.18 0-.37 0-.58-.01C4.12 2.69 6.87 1.11 10 1.11c2.33 0 4.45.87 6.05 2.34-.68-.11-1.65.39-1.65 1.58 0 .74.45 1.36.9 2.1.35.61.55 1.36.55 2.46 0 1.49-1.4 5-1.4 5l-3.03-8.37c.54-.02.82-.17.82-.17.5-.05.44-1.25-.06-1.22 0 0-1.44.12-2.38.12-.87 0-2.33-.12-2.33-.12-.5-.03-.56 1.2-.06 1.22l.92.08 1.26 3.41zM17.41 10c.24-.64.74-1.87.43-4.25.7 1.29 1.05 2.71 1.05 4.25 0 3.29-1.73 6.24-4.4 7.78.97-2.59 1.94-5.2 2.92-7.78zM6.1 18.09C3.12 16.65 1.11 13.53 1.11 10c0-1.3.23-2.48.72-3.59C3.25 10.3 4.67 14.2 6.1 18.09zm4.03-6.63l2.58 6.98c-.86.29-1.76.45-2.71.45-.79 0-1.57-.11-2.29-.33.81-2.38 1.62-4.74 2.42-7.1z"}))},"./packages/primitives/build-module/svg/index.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Cd:()=>Circle,G:()=>G,UL:()=>Rect,Wj:()=>SVG,x1:()=>Line,y$:()=>Path});var clsx__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/clsx/dist/clsx.mjs"),_wordpress_element__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js");const Circle=props=>(0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("circle",props),G=props=>(0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("g",props),Line=props=>(0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("line",props),Path=props=>(0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("path",props),Rect=props=>(0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("rect",props),SVG=(0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.forwardRef)((({className,isPressed,...props},ref)=>{const appliedProps={...props,className:(0,clsx__WEBPACK_IMPORTED_MODULE_1__.Z)(className,{"is-pressed":isPressed})||void 0,"aria-hidden":!0,focusable:!1};return(0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg",{...appliedProps,ref})}));SVG.displayName="SVG"},"./packages/components/src/icon/index.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>icon});var react=__webpack_require__("./node_modules/react/index.js"),svg=__webpack_require__("./packages/primitives/build-module/svg/index.js"),jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");function Dashicon({icon,className,size=20,style={},...extraProps}){const iconClass=["dashicon","dashicons","dashicons-"+icon,className].filter(Boolean).join(" "),styles={...20!=size?{fontSize:`${size}px`,width:`${size}px`,height:`${size}px`}:{},...style};return(0,jsx_runtime.jsx)("span",{className:iconClass,style:styles,...extraProps})}Dashicon.displayName="Dashicon";const dashicon=Dashicon;try{Dashicon.displayName="Dashicon",Dashicon.__docgenInfo={description:"",displayName:"Dashicon",props:{icon:{defaultValue:null,description:"The icon name",name:"icon",required:!0,type:{name:"enum",value:[{value:'"button"'},{value:'"html"'},{value:'"menu"'},{value:'"filter"'},{value:'"marker"'},{value:'"text"'},{value:'"hidden"'},{value:'"id"'},{value:'"yes"'},{value:'"no"'},{value:'"heading"'},{value:'"search"'},{value:'"email"'},{value:'"location"'},{value:'"move"'},{value:'"visibility"'},{value:'"download"'},{value:'"groups"'},{value:'"columns"'},{value:'"ellipsis"'},{value:'"sort"'},{value:'"admin-appearance"'},{value:'"admin-collapse"'},{value:'"admin-comments"'},{value:'"admin-customizer"'},{value:'"admin-generic"'},{value:'"admin-home"'},{value:'"admin-links"'},{value:'"admin-media"'},{value:'"admin-multisite"'},{value:'"admin-network"'},{value:'"admin-page"'},{value:'"admin-plugins"'},{value:'"admin-post"'},{value:'"admin-settings"'},{value:'"admin-site-alt"'},{value:'"admin-site-alt2"'},{value:'"admin-site-alt3"'},{value:'"admin-site"'},{value:'"admin-tools"'},{value:'"admin-users"'},{value:'"airplane"'},{value:'"album"'},{value:'"align-center"'},{value:'"align-full-width"'},{value:'"align-left"'},{value:'"align-none"'},{value:'"align-pull-left"'},{value:'"align-pull-right"'},{value:'"align-right"'},{value:'"align-wide"'},{value:'"amazon"'},{value:'"analytics"'},{value:'"archive"'},{value:'"arrow-down-alt"'},{value:'"arrow-down-alt2"'},{value:'"arrow-down"'},{value:'"arrow-left-alt"'},{value:'"arrow-left-alt2"'},{value:'"arrow-left"'},{value:'"arrow-right-alt"'},{value:'"arrow-right-alt2"'},{value:'"arrow-right"'},{value:'"arrow-up-alt"'},{value:'"arrow-up-alt2"'},{value:'"arrow-up"'},{value:'"arrow-up-duplicate"'},{value:'"art"'},{value:'"awards"'},{value:'"backup"'},{value:'"bank"'},{value:'"beer"'},{value:'"bell"'},{value:'"block-default"'},{value:'"book-alt"'},{value:'"book"'},{value:'"buddicons-activity"'},{value:'"buddicons-bbpress-logo"'},{value:'"buddicons-buddypress-logo"'},{value:'"buddicons-community"'},{value:'"buddicons-forums"'},{value:'"buddicons-friends"'},{value:'"buddicons-groups"'},{value:'"buddicons-pm"'},{value:'"buddicons-replies"'},{value:'"buddicons-topics"'},{value:'"buddicons-tracking"'},{value:'"building"'},{value:'"businessman"'},{value:'"businessperson"'},{value:'"businesswoman"'},{value:'"calculator"'},{value:'"camera-alt"'},{value:'"car"'},{value:'"calendar-alt"'},{value:'"calendar"'},{value:'"camera"'},{value:'"carrot"'},{value:'"cart"'},{value:'"category"'},{value:'"chart-area"'},{value:'"chart-bar"'},{value:'"chart-line"'},{value:'"chart-pie"'},{value:'"clipboard"'},{value:'"clock"'},{value:'"cloud-saved"'},{value:'"cloud-upload"'},{value:'"cloud"'},{value:'"code-standards"'},{value:'"coffee"'},{value:'"color-picker"'},{value:'"controls-back"'},{value:'"controls-forward"'},{value:'"controls-pause"'},{value:'"controls-play"'},{value:'"controls-repeat"'},{value:'"controls-skipback"'},{value:'"controls-skipforward"'},{value:'"controls-volumeoff"'},{value:'"controls-volumeon"'},{value:'"cover-image"'},{value:'"dashboard"'},{value:'"database"'},{value:'"database-add"'},{value:'"database-export"'},{value:'"database-import"'},{value:'"database-remove"'},{value:'"database-view"'},{value:'"desktop"'},{value:'"dismiss"'},{value:'"drumstick"'},{value:'"edit"'},{value:'"edit-large"'},{value:'"edit-page"'},{value:'"editor-aligncenter"'},{value:'"editor-alignleft"'},{value:'"editor-alignright"'},{value:'"editor-bold"'},{value:'"editor-break"'},{value:'"editor-code"'},{value:'"editor-code-duplicate"'},{value:'"editor-contract"'},{value:'"editor-customchar"'},{value:'"editor-expand"'},{value:'"editor-help"'},{value:'"editor-indent"'},{value:'"editor-insertmore"'},{value:'"editor-italic"'},{value:'"editor-justify"'},{value:'"editor-kitchensink"'},{value:'"editor-ltr"'},{value:'"editor-ol-rtl"'},{value:'"editor-ol"'},{value:'"editor-outdent"'},{value:'"editor-paragraph"'},{value:'"editor-paste-text"'},{value:'"editor-paste-word"'},{value:'"editor-quote"'},{value:'"editor-removeformatting"'},{value:'"editor-rtl"'},{value:'"editor-spellcheck"'},{value:'"editor-strikethrough"'},{value:'"editor-table"'},{value:'"editor-textcolor"'},{value:'"editor-ul"'},{value:'"editor-underline"'},{value:'"editor-unlink"'},{value:'"editor-video"'},{value:'"email-alt"'},{value:'"email-alt2"'},{value:'"embed-audio"'},{value:'"embed-generic"'},{value:'"embed-photo"'},{value:'"embed-post"'},{value:'"embed-video"'},{value:'"excerpt-view"'},{value:'"exit"'},{value:'"external"'},{value:'"facebook-alt"'},{value:'"facebook"'},{value:'"feedback"'},{value:'"flag"'},{value:'"food"'},{value:'"format-aside"'},{value:'"format-audio"'},{value:'"format-chat"'},{value:'"format-gallery"'},{value:'"format-image"'},{value:'"format-quote"'},{value:'"format-status"'},{value:'"format-video"'},{value:'"forms"'},{value:'"fullscreen-alt"'},{value:'"fullscreen-exit-alt"'},{value:'"games"'},{value:'"google"'},{value:'"googleplus"'},{value:'"grid-view"'},{value:'"hammer"'},{value:'"heart"'},{value:'"hourglass"'},{value:'"id-alt"'},{value:'"image-crop"'},{value:'"image-filter"'},{value:'"image-flip-horizontal"'},{value:'"image-flip-vertical"'},{value:'"image-rotate-left"'},{value:'"image-rotate-right"'},{value:'"image-rotate"'},{value:'"images-alt"'},{value:'"images-alt2"'},{value:'"index-card"'},{value:'"info-outline"'},{value:'"info"'},{value:'"insert-after"'},{value:'"insert-before"'},{value:'"insert"'},{value:'"instagram"'},{value:'"keyboard-hide"'},{value:'"laptop"'},{value:'"layout"'},{value:'"leftright"'},{value:'"lightbulb"'},{value:'"list-view"'},{value:'"linkedin"'},{value:'"location-alt"'},{value:'"lock-duplicate"'},{value:'"lock"'},{value:'"media-archive"'},{value:'"media-audio"'},{value:'"media-code"'},{value:'"media-default"'},{value:'"media-document"'},{value:'"media-interactive"'},{value:'"media-spreadsheet"'},{value:'"media-text"'},{value:'"media-video"'},{value:'"megaphone"'},{value:'"menu-alt"'},{value:'"menu-alt2"'},{value:'"menu-alt3"'},{value:'"money-alt"'},{value:'"microphone"'},{value:'"migrate"'},{value:'"minus"'},{value:'"money"'},{value:'"nametag"'},{value:'"networking"'},{value:'"no-alt"'},{value:'"open-folder"'},{value:'"palmtree"'},{value:'"paperclip"'},{value:'"performance"'},{value:'"pets"'},{value:'"pdf"'},{value:'"phone"'},{value:'"pinterest"'},{value:'"playlist-audio"'},{value:'"playlist-video"'},{value:'"plus-alt"'},{value:'"plus-light"'},{value:'"plus"'},{value:'"portfolio"'},{value:'"post-status"'},{value:'"pressthis"'},{value:'"products"'},{value:'"plugins-checked"'},{value:'"plus-alt2"'},{value:'"podio"'},{value:'"printer"'},{value:'"privacy"'},{value:'"randomize"'},{value:'"reddit"'},{value:'"redo"'},{value:'"remove"'},{value:'"rest-api"'},{value:'"rss"'},{value:'"saved"'},{value:'"schedule"'},{value:'"screenoptions"'},{value:'"share-alt"'},{value:'"share-alt2"'},{value:'"share"'},{value:'"shield-alt"'},{value:'"shield"'},{value:'"shortcode"'},{value:'"slides"'},{value:'"smartphone"'},{value:'"smiley"'},{value:'"sos"'},{value:'"star-empty"'},{value:'"star-filled"'},{value:'"star-half"'},{value:'"sticky"'},{value:'"store"'},{value:'"spotify"'},{value:'"superhero"'},{value:'"superhero-alt"'},{value:'"table-col-after"'},{value:'"table-col-before"'},{value:'"table-col-delete"'},{value:'"table-row-after"'},{value:'"table-row-before"'},{value:'"table-row-delete"'},{value:'"tablet"'},{value:'"tag"'},{value:'"tagcloud"'},{value:'"testimonial"'},{value:'"text-page"'},{value:'"thumbs-down"'},{value:'"thumbs-up"'},{value:'"tickets-alt"'},{value:'"tickets"'},{value:'"tide"'},{value:'"translation"'},{value:'"trash"'},{value:'"twitch"'},{value:'"twitter"'},{value:'"twitter-alt"'},{value:'"undo"'},{value:'"universal-access-alt"'},{value:'"universal-access"'},{value:'"unlock"'},{value:'"update-alt"'},{value:'"update"'},{value:'"upload"'},{value:'"vault"'},{value:'"video-alt"'},{value:'"video-alt2"'},{value:'"video-alt3"'},{value:'"warning"'},{value:'"welcome-add-page"'},{value:'"welcome-comments"'},{value:'"welcome-learn-more"'},{value:'"welcome-view-site"'},{value:'"welcome-widgets-menus"'},{value:'"welcome-write-blog"'},{value:'"whatsapp"'},{value:'"wordpress-alt"'},{value:'"wordpress"'},{value:'"xing"'},{value:'"yes-alt"'},{value:'"youtube"'}]}},size:{defaultValue:{value:"20"},description:"Size of the icon",name:"size",required:!1,type:{name:"number"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["packages/components/src/dashicon/index.tsx#Dashicon"]={docgenInfo:Dashicon.__docgenInfo,name:"Dashicon",path:"packages/components/src/dashicon/index.tsx#Dashicon"})}catch(__react_docgen_typescript_loader_error){}function Icon({icon=null,size="string"==typeof icon?20:24,...additionalProps}){if("string"==typeof icon)return(0,jsx_runtime.jsx)(dashicon,{icon,size,...additionalProps});if((0,react.isValidElement)(icon)&&dashicon===icon.type)return(0,react.cloneElement)(icon,{...additionalProps});if("function"==typeof icon)return(0,react.createElement)(icon,{size,...additionalProps});if(icon&&("svg"===icon.type||icon.type===svg.Wj)){const appliedProps={...icon.props,width:size,height:size,...additionalProps};return(0,jsx_runtime.jsx)(svg.Wj,{...appliedProps})}return(0,react.isValidElement)(icon)?(0,react.cloneElement)(icon,{size,...additionalProps}):icon}const icon=Icon;try{Icon.displayName="Icon",Icon.__docgenInfo={description:"",displayName:"Icon",props:{icon:{defaultValue:{value:"null"},description:"The icon to render. Supported values are: Dashicons (specified as\nstrings), functions, Component instances and `null`.",name:"icon",required:!1,type:{name:"IconType"}},size:{defaultValue:{value:"'string' === typeof icon ? 20 : 24"},description:"The size (width and height) of the icon.",name:"size",required:!1,type:{name:"number"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["packages/components/src/icon/index.tsx#Icon"]={docgenInfo:Icon.__docgenInfo,name:"Icon",path:"packages/components/src/icon/index.tsx#Icon"})}catch(__react_docgen_typescript_loader_error){}},"./packages/components/src/utils/space.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{D:()=>space});const GRID_BASE="4px";function space(value){if(void 0===value)return;if(!value)return"0";const asInt="number"==typeof value?value:Number(value);return"undefined"!=typeof window&&window.CSS?.supports?.("margin",value.toString())||Number.isNaN(asInt)?value.toString():`calc(${GRID_BASE} * ${value})`}},"./packages/components/src/placeholder/stories/index.story.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Default:()=>Default,default:()=>index_story});var star_empty=__webpack_require__("./packages/icons/build-module/library/star-empty.js"),star_filled=__webpack_require__("./packages/icons/build-module/library/star-filled.js"),styles=__webpack_require__("./packages/icons/build-module/library/styles.js"),wordpress=__webpack_require__("./packages/icons/build-module/library/wordpress.js"),react=__webpack_require__("./node_modules/react/index.js"),clsx=__webpack_require__("./node_modules/clsx/dist/clsx.mjs"),use_resize_observer=__webpack_require__("./packages/compose/build-module/hooks/use-resize-observer/index.js"),svg=__webpack_require__("./packages/primitives/build-module/svg/index.js"),build_module=__webpack_require__("./packages/a11y/build-module/index.js"),src_icon=__webpack_require__("./packages/components/src/icon/index.tsx"),jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");const PlaceholderIllustration=(0,jsx_runtime.jsx)(svg.Wj,{className:"components-placeholder__illustration",fill:"none",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 60 60",preserveAspectRatio:"none",children:(0,jsx_runtime.jsx)(svg.y$,{vectorEffect:"non-scaling-stroke",d:"M60 60 0 0"})});function Placeholder(props){const{icon,children,label,instructions,className,notices,preview,isColumnLayout,withIllustration,...additionalProps}=props,[resizeListener,{width}]=(0,use_resize_observer.Z)();let modifierClassNames;"number"==typeof width&&(modifierClassNames={"is-large":width>=480,"is-medium":width>=160&&width<480,"is-small":width<160});const classes=(0,clsx.Z)("components-placeholder",className,modifierClassNames,withIllustration?"has-illustration":null),fieldsetClasses=(0,clsx.Z)("components-placeholder__fieldset",{"is-column-layout":isColumnLayout});return(0,react.useEffect)((()=>{instructions&&(0,build_module.D)(instructions)}),[instructions]),(0,jsx_runtime.jsxs)("div",{...additionalProps,className:classes,children:[withIllustration?PlaceholderIllustration:null,resizeListener,notices,preview&&(0,jsx_runtime.jsx)("div",{className:"components-placeholder__preview",children:preview}),(0,jsx_runtime.jsxs)("div",{className:"components-placeholder__label",children:[(0,jsx_runtime.jsx)(src_icon.Z,{icon}),label]}),!!instructions&&(0,jsx_runtime.jsx)("div",{className:"components-placeholder__instructions",children:instructions}),(0,jsx_runtime.jsx)("div",{className:fieldsetClasses,children})]})}Placeholder.displayName="Placeholder";const placeholder=Placeholder;try{Placeholder.displayName="Placeholder",Placeholder.__docgenInfo={description:"Renders a placeholder. Normally used by blocks to render their empty state.\n\n```jsx\nimport { Placeholder } from '@wordpress/components';\nimport { more } from '@wordpress/icons';\n\nconst MyPlaceholder = () => <Placeholder icon={ more } label=\"Placeholder\" />;\n```",displayName:"Placeholder",props:{children:{defaultValue:null,description:"The children elements.",name:"children",required:!1,type:{name:"ReactNode"}},className:{defaultValue:null,description:"Class to set on the container div.",name:"className",required:!1,type:{name:"string"}},icon:{defaultValue:null,description:"If provided, renders an icon next to the label.",name:"icon",required:!1,type:{name:"IconType"}},instructions:{defaultValue:null,description:"Instructions of the placeholder.",name:"instructions",required:!1,type:{name:"string"}},isColumnLayout:{defaultValue:null,description:"Changes placeholder children layout from flex-row to flex-column.",name:"isColumnLayout",required:!1,type:{name:"boolean"}},label:{defaultValue:null,description:"Title of the placeholder.",name:"label",required:!1,type:{name:"string"}},notices:{defaultValue:null,description:"A rendered notices list",name:"notices",required:!1,type:{name:"ReactNode"}},preview:{defaultValue:null,description:"Preview to be rendered in the placeholder.",name:"preview",required:!1,type:{name:"ReactNode"}},withIllustration:{defaultValue:null,description:"Outputs a placeholder illustration.",name:"withIllustration",required:!1,type:{name:"boolean"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["packages/components/src/placeholder/index.tsx#Placeholder"]={docgenInfo:Placeholder.__docgenInfo,name:"Placeholder",path:"packages/components/src/placeholder/index.tsx#Placeholder"})}catch(__react_docgen_typescript_loader_error){}var text_control=__webpack_require__("./packages/components/src/text-control/index.tsx");const ICONS={starEmpty:star_empty.Z,starFilled:star_filled.Z,styles:styles.Z,wordpress:wordpress.Z},index_story={component:placeholder,title:"Components/Placeholder",argTypes:{children:{control:{type:null}},notices:{control:{type:null}},preview:{control:{type:null}},icon:{control:{type:"select"},options:Object.keys(ICONS),mapping:ICONS}},parameters:{sourceLink:"packages/components/src/placeholder",controls:{expanded:!0},docs:{canvas:{sourceState:"shown"}}}},Template=args=>{const[value,setValue]=(0,react.useState)("");return(0,jsx_runtime.jsx)(placeholder,{...args,children:(0,jsx_runtime.jsx)("div",{children:(0,jsx_runtime.jsx)(text_control.Z,{__nextHasNoMarginBottom:!0,label:"Sample Field",placeholder:"Enter something here",value,onChange:setValue})})})};Template.displayName="Template";const Default=Template.bind({});Default.args={icon:"wordpress",label:"My Placeholder Label",instructions:"Here are instructions you should follow"},Default.parameters={...Default.parameters,docs:{...Default.parameters?.docs,source:{originalSource:'args => {\n  const [value, setValue] = useState(\'\');\n  return <Placeholder {...args}>\n            <div>\n                <TextControl __nextHasNoMarginBottom label="Sample Field" placeholder="Enter something here" value={value} onChange={setValue} />\n            </div>\n        </Placeholder>;\n}',...Default.parameters?.docs?.source}}}}}]);