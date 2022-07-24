/*
 * Please see the included README.md file for license terms and conditions.
 */


// This file is a suggested starting place for your code.
// It is completely optional and not required.
// Note the reference that includes it in the index.html file.


/*jslint browser:true, devel:true, white:true, vars:true */
/*global $:false, intel:false app:false, dev:false, cordova:false */


// For improved debugging and maintenance of your app, it is highly
// recommended that you separate your JavaScript from your HTML files.
// Use the addEventListener() method to associate events with DOM elements.
// For example:

// var el ;
// el = document.getElementById("id_myButton") ;
// el.addEventListener("click", myEventHandler, false) ;



// The function below is an example of the best place to "start" your app.
// It calls the standard Cordova "hide splashscreen" function. You can add
// other code to it or add additional functions that are triggered by the same
// event. The app.Ready event used here is created by the init-dev.js file.
// It serves as a unifier for a variety of "ready" events. See the init-dev.js
// file for more details. If you prefer the Cordova deviceready event, you can
// use that in addition to, or instead of this event.

// NOTE: change "dev.LOG" in "init-dev.js" to "true" to enable some console.log
// messages that can help you debug Cordova app initialization issues.

function onAppReady() {
    if( navigator.splashscreen && navigator.splashscreen.hide ) {   // Cordova API detected
        navigator.splashscreen.hide() ;
    }
}
document.addEventListener("app.Ready", onAppReady, false) ;
//var ctx='http://127.0.0.1:8080/kjtwms/';
function ctx(){
    return localStorage.getItem("ctx_url")
}
function cleanPwd(){
    localStorage.removeItem("user_pwd");
}
$(function($) {
    if(!sessionStorage.getItem("user_id")&&$('title').html()!='login'&&$('title').html()!='设置'&&$('title').html()!='index'){
        $.Zebra_Dialog('请重新登录', 
            {
                'title':'提示',
                'onClose':function(caption) {
                    location.href = '../base/login.html';
                }
        });
    }
});
function checklogin(data){
    if(data=='otherlogin'){
        $.Zebra_Dialog('该账号已在其它地方登录', 
            {
                'title':'提示',
                'onClose':function(caption) {
                    location.href = '../base/login.html';
                }
        });
    }else if(data=='timeout'||data=='nologin'){
        $.Zebra_Dialog('请重新登录', 
            {
                'title':'提示',
                'onClose':function(caption) {
                    location.href = '../base/login.html';
                }
        });
    }
}
function logout(){
    $.post(ctx()+'user/logout',function(data) {
        logout_1();
    });
    setTimeout("logout_1()", 3000 );
}
function logout_1(){
	if(confirm("确定退出？")){
	    sessionStorage.clear();
	    navigator.app.exitApp();
    }
}
//======================日期format开始============================
function timestampformat(timestamp) {
	if (typeof(timestamp) == undefined||timestamp==null||timestamp=="") 
		return "";
	else
		return (new Date(timestamp)).format("yyyy-MM-dd hh:mm:ss");
} 

function dateformat(timestamp) {
	if (typeof(timestamp) == undefined||timestamp==null||timestamp=="") 
		return "";
    else
		return (new Date(timestamp)).format("yyyy-MM-dd");
}
Date.prototype.format = function(format) {
    var o = {
        "M+": this.getMonth() + 1,
        // month
        "d+": this.getDate(),
        // day
        "h+": this.getHours(),
        // hour
        "m+": this.getMinutes(),
        // minute
        "s+": this.getSeconds(),
        // second
        "q+": Math.floor((this.getMonth() + 3) / 3),
        // quarter
        "S": this.getMilliseconds()
        // millisecond
    };
    if (/(y+)/.test(format) || /(Y+)/.test(format)) {
        format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    for (var k in o) {
        if (new RegExp("(" + k + ")").test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
        }
    }
    return format;
};
//======================日期format结束============================
//======================datetimepicker移动开始============================
var v_datetimepicker_left;
var v_datetimepicker_top;
        function movedatediv(id){
            v_datetimepicker_left=$('#'+id).offset().left+"px";
            v_datetimepicker_top=$('#'+id).offset().top+40+"px";
        $(".datetimepicker").animate({left:v_datetimepicker_left,top:v_datetimepicker_top},100); 
            $(".datetimepicker").click(function(){ 
              $(".datetimepicker").animate({left:v_datetimepicker_left,top:v_datetimepicker_top},100);    
            });

        }
//======================datetimepicker移动结束============================
//======================alert开始============================
    function my_alert(msg){
        new $.Zebra_Dialog(msg, {'title': '提示'});
    }
    function my_error(msg){
        new $.Zebra_Dialog(msg, {'type':'error','title': '错误'});
    }
    function my_confirm(msg,function_name){
         $.Zebra_Dialog(msg, {
            'type':     'question',
            'title':    '请确认',
            'buttons':  ['确定', '取消'],
            'onClose':  function(caption) {
                if(caption == '确定'){
                    eval(function_name+"()"); 
                }
            }
        });
    }
//======================alert结束============================
//============================翻页按钮开始======================
		function btnctrl(){
                                    if(document.getElementById("pagenospan").innerHTML=='1'||$('#pagenospan').html()=='0'){
            $("#previousbtn").addClass("disabled"); 
		}else{
			$("#previousbtn").removeClass("disabled"); 
		}
		   if(document.getElementById("pagenospan").innerHTML==document.getElementById("totalpagenospan").innerHTML){
            $("#nextbtn").addClass("disabled"); 
		}else{
            $("#nextbtn").removeClass("disabled"); 
		}
		if(document.getElementById("pagenospan").innerHTML==''){
            $("#nextbtn").addClass("disabled"); 
            $("#previousbtn").addClass("disabled"); 
		}
	}
    function success_tip_play(){
         var myaudio=document.getElementById("myaudio");
         myaudio.volume=1;
         myaudio.play();
    }
//============================翻页按钮结束======================
/*Messenger.options = {
    extraClasses: 'messenger-fixed messenger-on-top',
    theme: 'flat'
}
function  my_alert(msg){
    Messenger().post({
      message: msg,
      type: 'info',
      hideAfter: 1
    });	
}*/
//===========================声音播放开始==================================
        // Audio player
        //
        var my_media = null;
        var mediaTimer = null;

        // Play audio
        //
        function playAudio(src) {
            // Create Media object from src
            if(my_media!= null){  
			    my_media.stop();  
			    my_media.release();  
			    my_media = null ;  
			  }
            my_media =new Media(src, onSuccess, onError);

            // Play audio
            my_media.play();
            // Update my_media position every second
            if (mediaTimer == null) {
                mediaTimer = setInterval(function() {
                    // get my_media position
                    my_media.getCurrentPosition(
                        // success callback
                        function(position) {
                            if (position > -1) {
                                setAudioPosition((position) + " sec");
                            }
                        },
                        // error callback
                        function(e) {
                            console.log("Error getting pos=" + e);
                            setAudioPosition("Error: " + e);
                        }
                    );
                }, 1000);
            }
        }

        // Pause audio
        // 
        function pauseAudio() {
            if (my_media) {
                my_media.pause();
            }
        }

        // Stop audio
        // 
        function stopAudio() {
            if (my_media) {
                my_media.stop();
            }
            clearInterval(mediaTimer);
            mediaTimer = null;
        }
        // onSuccess Callback
        //
        function onSuccess() {
            console.log("playAudio():Audio Success");
        }

        // onError Callback 
        //
        function onError(error) {
            console.log('code: '    + error.code    + '\n' + 
                  'message: ' + error.message + '\n');
        }
        // Set audio position
        // 
        function setAudioPosition(position) {
            document.getElementById('audio_position').innerHTML = position;
        }
        function playSuccessAudio(){
        	playAudio('file:///android_asset/www/audio/success.mp3');
        }
        function playErrorAudio(){
        	playAudio('file:///android_asset/www/audio/error.wav');
        }
//=================================声音播放结束===========================================