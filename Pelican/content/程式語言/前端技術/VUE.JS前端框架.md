---
title: VUE.JS前端框架
date: 2022-03-28 11:36
modified: 2022-03-28 11:36
tags: 標籤
category: 前端程式
slug: VUE.JS前端框架
summary: 預覽標題
image: /images/default_preview_image.jpg
status: draft
---

[TOC]

![[VUE.js 前端框架.pdf]]




            



![投影片1](clip_image002.png)

範例專案 使用 VS2015建置啟動 各範例路徑如下：

http://localhost:22540/Home/shoppingcar

http://localhost:22540/Home/Model

http://localhost:22540/Home/MyselfModel

http://localhost:22540/Home/vueref

http://localhost:22540/Home/Vuelidate

  

投影片2

![](clip_image004.png)

參考網址： https://juejin.im/post/5b2f0769e51d45589f46949e

在MVVM的架構下，View層和Model層並沒有直接聯繫，而是通過ViewModel層進行交互。ViewModel層通過雙向資料綁定將View層和Model層連接了起來，使得View層和Model層的同步工作完全是自動的。因此開發者只需關注業務邏輯，無需手動操作DOM，複雜的資料狀態維護交給MVVM統一來管理

  

投影片3

![](clip_image006.png)

Jquery透過DOM的操作，邏輯與寫法簡單易懂，但是也因為業務邏輯跟View可能綁再一起，造成日後維護困難，由現在的AIO付款選擇頁面就可以瞭解

由範例可以看到 M V VM 

Model: 就是 message 的資料 “Hello VUE.js”

View:Html

VIewModel: 就是串聯資料與Html的VUE.js

View 的畫面中有 雙大括號 {{ message }} 是最基本的文字內插方法他會自動將我們雙向綁定的資料即時顯示出來

  

投影片4

![](clip_image008.png)

Vue會把資料跟樣板綁在一起，使得開發者不需要自己做雜事，只需宣告好資料、要放在哪。  
也因此，Vue執行了一連串工作，包含在原始資料加料、建立Vue Instance、編譯樣板、綁定資料等，隨著資料新增修改，週而復始直到刪除，稱為生命週期(Lifecycle)。

  

投影片5

![](clip_image010.png)

做這些工作的時機點前後，提供你客製化的空間，稱為Hook

這裡有個mounted Hook ，在這裡信用卡有用了許多，再後續資料的傳遞時再說明。

  

投影片6

![](clip_image012.png)

這裡到了最後，會把實例作銷毀，清理它与其它实例的连接，解绑它的全部指令及事件监听器。

所以要注意的一點是，如果有另外使用了Jquery的事件綁定，如果寫在Vue之前，會把Jquery的事件也一起解除綁定了，再設計給的頁面中，

有個_action.js 因為裡面用了Jquery，所以要把這個Js放在最後

  

投影片7

![](clip_image014.png)

透過建置函數Vue 就可以建立一個Vue的根實例，並啟用Vue應用

變數vm 就代表了這個Vue實例

首先第一個選項el 可以是HTMLElement 也可以是CSS選擇器

  

投影片8

![](clip_image016.png)

_Vue.js_ _的各種指令（__Directives__）更加方便我們去資料驅動_ _DOM__，例如_ _v-bind__、__v-on__、__v-model__、__v-if__、__v-for__、__v-once_ _等內建指令，這些指令的職責就是當表示式改變時將某些行為應用到_ _DOM_ _上，儘量不去操作增刪改_ _DOM__。通過了解如何去自定義指令，可以想象內建指令是如何完成的。_

  

投影片9

![](clip_image018.png)

特別注意 v-else-if v-else 的順序，就跟C#的 if else if else 的情況

  

投影片10

![](clip_image020.png)

V-show 具有類似的功能，不過v-show 是簡單的CSS屬性切換，就是 display:none;

  

投影片11

![](clip_image022.png)

：Class樣式可以跟 普通Class 共存，這樣就可以達成 多樣式複合 

iconClass 在JS裡面是一個Object的定義或是可以用Array

  

投影片12

![](clip_image024.png)

  

投影片13

![](clip_image026.png)

V-show 具有類似的功能，不過v-show 是簡單的CSS屬性切換，就是 display:none;

  

投影片14

![](clip_image028.png)

  

投影片15

![](clip_image030.png)

購物車 http://localhost:22540/Home/shoppingcar

  

投影片16

![](clip_image032.png)

元件，Vue的元件有分全域註冊跟局部註冊，目前看到這個方式是做全域註冊，等等會介紹信用卡的元件，都是使用局部註冊

以上的JS語法，就是元件的架構，一一介紹一下

Template: 要注意的是，Html的上下開始結尾，都要用<div></div>的方式

  

投影片17

![](clip_image034.png)

  

投影片18

![](clip_image036.png)

  

投影片19

![](clip_image038.png)

  

投影片20

![](clip_image040.png)

子元件用 $emit() 來觸發事件 父元件用 $on() 來監聽子元件的事件

$emit() 方法的第一個參數是自訂事件的名稱，後面的參數都是要傳遞的資料，可以不填或填寫多個

這裡要提到一個概念：bus

Bus 的概念是說 用一個 vus bus = new Vue(); 就是一個中央匯流排的概念，透過一個空的bus 來串聯父元件與子元件的溝通

  

投影片21

![](clip_image042.png)

剛剛說道單向資料流程：父元件資料變化時會傳遞給子元件，但反過來不行

從剛剛的元件通訊是使用了 

子元件用 $emit() 來觸發事件 父元件用 $on() 來監聽子元件的事件

所以v-model的本質上也是使用了$emit() 來達成雙向綁定的功能

  

投影片22

![](clip_image044.png)

這裡父級傳送 參數用 分號的用意是 使用指令 v-bind 來動態綁定props的值當父元件的資料變化時，也會傳遞給子元件

http://localhost:22540/Home/Model

http://localhost:22540/Home/MyselfModel

  

投影片23

![](clip_image046.png)

https://blog.johnsonlu.org/vue-refs/

1.想要取得 DOM Element 的資訊時（例如寬度）

2.想要從 父元件 取得 子元件 的資料時

官方說明

https://cn.vuejs.org/v2/api/#ref

實際Demo  
  
http://localhost:22540/Home/vueref

  

投影片24

![](clip_image048.png)

  

投影片25

![](clip_image050.png)

  

投影片26

![](clip_image052.png)

$ v model 代表當前的驗證狀態

$v.CCHolder.$model CCHolder 就是自己定義的驗證名稱

CCHolder 內的驗證，required (是否必填) ccHolderReg(是否符合中文) 皆回傳Boolean

Demo : http://localhost:22540/Home/Vuelidate

  

投影片27

![](clip_image054.png)

  

投影片28

![](clip_image056.png)

  

投影片29

![](clip_image058.png)